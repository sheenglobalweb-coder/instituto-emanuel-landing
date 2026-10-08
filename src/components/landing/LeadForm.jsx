import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { getUtmParameters } from '../../utils/utm';
import { registerLead } from '../../lib/leadsService';
import { useRouter } from '../../context/RouterContext';
import {
  Sparkles,
  ArrowRight,
  Loader2,
  ShieldCheck,
  AlertCircle,
  Building2,
  Laptop,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LeadForm({
  onSuccess,
  compact = false,
  defaultProgram = 'Prótesis Dental (Carrera Técnica 3 años)',
  defaultModalidad = 'Semipresencial'
}) {
  const { navigate } = useRouter();

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    celular: '',
    modalidad: defaultModalidad,
    carrera_interes: defaultProgram
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const programs = [
    'Prótesis Dental (Carrera Técnica 3 años)',
    'Auxiliar en Prótesis Dental',
    'Farmacología Odontológica',
    'Zirconio Dental',
    'Finanzas y Costos en Consultorios Dentales',
    'Microsoft Excel'
  ];

  // Escuchar selección remota de curso desde las tarjetas de CoursesGrid
  useEffect(() => {
    const handleSelectCourse = (e) => {
      if (e.detail && typeof e.detail === 'string') {
        const found = programs.find(p => 
          p.toLowerCase().includes(e.detail.toLowerCase()) || 
          e.detail.toLowerCase().includes(p.toLowerCase())
        );
        if (found) {
          setFormData(prev => ({ ...prev, carrera_interes: found }));
        } else {
          setFormData(prev => ({ ...prev, carrera_interes: e.detail }));
        }
      }
    };
    window.addEventListener('select-course', handleSelectCourse);
    return () => window.removeEventListener('select-course', handleSelectCourse);
  }, []);

  const validate = () => {
    const errs = {};

    if (!formData.nombres.trim() || formData.nombres.trim().length < 2) {
      errs.nombres = 'Ingresa tus nombres completos';
    }

    if (!formData.apellidos.trim() || formData.apellidos.trim().length < 2) {
      errs.apellidos = 'Ingresa tus apellidos completos';
    }

    if (!/^\d{8}$/.test(formData.dni.trim())) {
      errs.dni = 'El DNI debe tener 8 dígitos numéricos';
    }

    if (!/^9\d{8}$/.test(formData.celular.trim())) {
      errs.celular = 'El celular debe tener 9 dígitos y empezar con 9';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const utm = getUtmParameters();

      const leadPayload = {
        nombres: `${formData.nombres.trim()}_prb`,
        apellidos: `${formData.apellidos.trim()}_prb`,
        dni: formData.dni.trim(),
        celular: formData.celular.trim(),
        modalidad: formData.modalidad,
        carrera_interes: `${formData.carrera_interes}_prb`,
        utm_source: utm.utm_source,
        utm_campaign: utm.utm_campaign,
        estado: 'nuevo'
      };

      // 1. Guardar en Supabase (leads)
      try {
        const { error } = await supabase
          .from('leads')
          .insert([leadPayload]);

        if (error) {
          console.warn('Nota de inserción en Supabase:', error.message);
        }
      } catch (sbErr) {
        console.warn('Error de conexión a Supabase:', sbErr);
      }

      // 2. Respaldo local y reactividad en el panel de administración
      await registerLead(leadPayload);

      // Efecto festivo de confeti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      if (onSuccess) {
        onSuccess(leadPayload);
      }

      // Redirigir a /gracias
      setTimeout(() => {
        navigate('/gracias');
      }, 350);

    } catch (err) {
      console.error('Error al registrar prospecto:', err);
      setServerError('Hubo un inconveniente al procesar tu solicitud. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="formulario"
      className={
        compact
          ? "w-full text-slate-800 relative"
          : "bg-white rounded-xl shadow-xl p-4 lg:p-5 border border-slate-100 text-slate-800 relative transition-all"
      }
    >
      {/* Badge de Urgencia */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-500/15 text-amber-700 border border-amber-400/40 uppercase tracking-wide">
          <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
          <span>Admisión 2026 • Vacantes Limitadas</span>
        </div>
      </div>

      {/* Título de Admisión Directa */}
      <h3 className="font-extrabold text-[#0f1c3f] tracking-tight text-base sm:text-lg lg:text-xl mb-0.5">
        Postula ahora y asegura tu vacante 2026
      </h3>
      <p className="text-slate-500 leading-tight text-[11px] sm:text-xs mb-2">
        Inicia tu proceso de admisión y recibe orientación personalizada por WhatsApp en minutos.
      </p>

      {/* Alerta de Error de Servidor */}
      {serverError && (
        <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2" noValidate>
        {/* Nombres y Apellidos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
              Nombres completos *
            </label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
              placeholder="Ej. Juan Carlos"
              className={`w-full bg-slate-50 border ${
                errors.nombres ? 'border-red-500 ring-1 ring-red-400 bg-red-50/40' : 'border-slate-200 focus:border-[#0f1c3f] focus:bg-white'
              } rounded-lg py-1.5 px-3 text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm`}
            />
            {errors.nombres && (
              <span className="text-[10px] text-red-600 font-medium mt-0.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 inline shrink-0" /> {errors.nombres}
              </span>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
              Apellidos completos *
            </label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
              placeholder="Ej. Mendoza Silva"
              className={`w-full bg-slate-50 border ${
                errors.apellidos ? 'border-red-500 ring-1 ring-red-400 bg-red-50/40' : 'border-slate-200 focus:border-[#0f1c3f] focus:bg-white'
              } rounded-lg py-1.5 px-3 text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm`}
            />
            {errors.apellidos && (
              <span className="text-[10px] text-red-600 font-medium mt-0.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 inline shrink-0" /> {errors.apellidos}
              </span>
            )}
          </div>
        </div>

        {/* DNI y Teléfono Celular */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
              DNI (8 dígitos) *
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              name="dni"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value.replace(/\D/g, '') })}
              placeholder="Ej. 74819203"
              className={`w-full bg-slate-50 border ${
                errors.dni ? 'border-red-500 ring-1 ring-red-400 bg-red-50/40' : 'border-slate-200 focus:border-[#0f1c3f] focus:bg-white'
              } rounded-lg py-1.5 px-3 text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-mono transition-all shadow-sm`}
            />
            {errors.dni && (
              <span className="text-[10px] text-red-600 font-medium mt-0.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 inline shrink-0" /> {errors.dni}
              </span>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
              Teléfono celular *
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1.5 text-xs text-slate-500 font-mono font-semibold">+51</span>
              <input
                type="tel"
                inputMode="tel"
                maxLength={9}
                name="celular"
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value.replace(/\D/g, '') })}
                placeholder="987654321"
                className={`w-full bg-slate-50 border pl-10 pr-3 py-1.5 text-xs md:text-sm text-slate-900 placeholder-slate-400 ${
                  errors.celular ? 'border-red-500 ring-1 ring-red-400 bg-red-50/40' : 'border-slate-200 focus:border-[#0f1c3f] focus:bg-white'
                } rounded-lg focus:outline-none font-mono transition-all shadow-sm`}
              />
            </div>
            {errors.celular && (
              <span className="text-[10px] text-red-600 font-medium mt-0.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 inline shrink-0" /> {errors.celular}
              </span>
            )}
          </div>
        </div>

        {/* Modalidad de Estudio */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
            Modalidad de estudio *
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, modalidad: 'Semipresencial' })}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                formData.modalidad === 'Semipresencial'
                  ? 'bg-[#0f1c3f] text-amber-300 border-[#0f1c3f] shadow-xs shadow-blue-950/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Semipresencial</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, modalidad: '100% Virtual' })}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                formData.modalidad === '100% Virtual'
                  ? 'bg-[#0f1c3f] text-blue-300 border-[#0f1c3f] shadow-xs shadow-blue-950/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>100% Virtual</span>
            </button>
          </div>
        </div>

        {/* Carrera / Programa de Interés */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
            Carrera / Programa de interés *
          </label>
          <div className="relative">
            <select
              value={formData.carrera_interes}
              onChange={(e) => setFormData({ ...formData, carrera_interes: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#0f1c3f] focus:bg-white rounded-lg py-1.5 px-3 text-xs md:text-sm text-slate-800 font-medium focus:outline-none transition-all shadow-sm appearance-none cursor-pointer"
            >
              {programs.map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Botón de Envío Principal */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-1.5 py-2.5 px-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl shadow-md shadow-amber-500/25 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Guardando postulación...</span>
            </>
          ) : (
            <>
              <span>¡POSTULAR AHORA Y ASEGURAR VACANTE!</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-0.5 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Tus datos están protegidos • Respuesta rápida por WhatsApp</span>
        </div>
      </form>
    </div>
  );
}
