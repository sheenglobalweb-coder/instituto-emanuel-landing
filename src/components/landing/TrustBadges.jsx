import React from 'react';
import { MapPin, Award, Microscope, ShieldCheck, CheckCircle2, Users, GraduationCap, HeartHandshake, Sparkles } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: MapPin,
      title: 'Sede Física Central en Chiclayo',
      desc: 'Calle Justicia 182, Urb. Túpac Amaru (Chiclayo, Lambayeque). Ubicación estratégica de fácil acceso para todos tus talleres prácticos y clases presenciales.',
      highlight: 'Sede Propia Institucional'
    },
    {
      icon: Award,
      title: 'Título a Nombre de la Nación',
      desc: 'Carrera Profesional Técnica de 3 años respaldada por el Ministerio de Educación con Código Modular Oficial MINEDU N° 1739887.',
      highlight: 'Validez Legal en Todo el Perú'
    },
    {
      icon: Microscope,
      title: 'Laboratorios y Equipos de Última Generación',
      desc: 'Mesas de trabajo ergonómicas, hornos de cerámica, articuladores y tecnología protésica digital para tu entrenamiento práctico real.',
      highlight: 'Equipamiento Profesional'
    }
  ];

  const communityActivities = [
    {
      icon: HeartHandshake,
      title: 'Charla de Salud Bucal en el Colegio Virgen del Carmen',
      location: 'Chiclayo, Lambayeque',
      tag: 'Proyección Social Comunitaria',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      desc: 'Jornadas preventivas de higiene oral, despistaje y educación bucodental dirigidas a estudiantes escolares en Chiclayo, donde nuestros futuros técnicos demuestran su vocación de servicio y aplicación práctica de conocimientos.'
    },
    {
      icon: GraduationCap,
      title: 'Ceremonias de Entrega de Certificados y Graduación Técnica',
      location: 'Auditorio Institucional Chiclayo',
      tag: 'Titulación Oficial MINEDU',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      desc: 'Solemne entrega de certificaciones modulares progresivas y títulos profesionales técnicos a Nombre de la Nación (Código Modular 1739887), respaldando el éxito y la inserción laboral de nuestros egresados en clínicas y laboratorios.'
    }
  ];

  return (
    <section id="nosotros" className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Principal */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Garantías y Respaldo Institucional</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f1c3f] tracking-tight mb-4">
            ¿Por qué Elegir el Instituto Emanuel?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Formamos profesionales técnicos con respaldo oficial del MINEDU, infraestructura moderna y activa presencia social y formativa en la región Lambayeque.
          </p>
        </div>

        {/* 3 Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-2xl bg-[#0f1c3f] text-amber-400 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full border border-emerald-200">
                      {b.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0f1c3f] mb-3">
                    {b.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Garantía de calidad académica</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bloque de Respaldo Institucional y Actividades de Campo */}
        <div className="max-w-6xl mx-auto pt-6 border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 mb-2 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Evidencia y Actividades de Campo</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f1c3f]">
              Compromiso Formativo y Comunitario en Chiclayo
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Nuestros alumnos participan en actividades prácticas reales que fortalecen su formación ética y técnica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {communityActivities.map((act, aIdx) => {
              const Icon = act.icon;
              return (
                <div
                  key={aIdx}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    <span className="absolute top-3 left-3 bg-blue-900/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-400/40">
                      {act.tag}
                    </span>

                    <span className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5 drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{act.location}</span>
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-base font-extrabold text-[#0f1c3f] leading-snug">
                          {act.title}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                        {act.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Respaldo y Validación Institucional Emanuel</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
