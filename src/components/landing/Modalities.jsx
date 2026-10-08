import React from 'react';
import { Building2, Laptop, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function Modalities() {
  const handleScrollToForm = () => {
    const formElem = document.getElementById('formulario');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="modalidades" className="py-10 md:py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200/80 mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Flexibilidad Académica</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f1c3f] tracking-tight mb-4">
            Modalidades de Estudio Diseñadas para tu Ritmo
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Elige la modalidad que mejor se adapte a tu horario y lugar de residencia sin comprometer la rigurosidad ni la titulación oficial de la carrera.
          </p>
        </div>

        {/* Tarjetas de Modalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* 1. Semipresencial */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3.5 rounded-2xl bg-[#0f1c3f] text-amber-300 shadow-md">
                  <Building2 className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-800 border border-amber-300 px-3 py-1 rounded-full">
                  Más Elegida
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f1c3f] mb-3">
                Modalidad Semipresencial
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                <strong className="text-slate-900">Teoría flexible + prácticas intensivas en talleres propios de Chiclayo.</strong> Combina el aprendizaje en aula virtual con el dominio técnico directo sobre modelos y biomateriales dentales.
              </p>

              <div className="space-y-3 pt-2 border-t border-slate-200/60">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Clases teóricas virtuales con horarios adaptables.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Talleres prácticos con instrumental odontológico profesional en sede Chiclayo.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Ideal para estudiantes de Chiclayo, Lambayeque y regiones del norte.</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={handleScrollToForm}
                className="w-full py-3 px-4 rounded-xl bg-[#0f1c3f] hover:bg-[#152a5e] text-white font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                Postular a Semipresencial
              </button>
            </div>
          </div>

          {/* 2. 100% Virtual */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3.5 rounded-2xl bg-blue-600 text-white shadow-md">
                  <Laptop className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full">
                  100% Remoto
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f1c3f] mb-3">
                Modalidad 100% Virtual
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                <strong className="text-slate-900">Acceso a campus online para contenidos teóricos y actualización profesional.</strong> Diseñada para quienes trabajan o residen en cualquier ciudad del Perú y requieren autonomía total de tiempo.
              </p>

              <div className="space-y-3 pt-2 border-t border-slate-200/60">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Campus virtual disponible las 24 horas del día con videoclases HD.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Demostraciones clínicas paso a paso y tutoría personalizada.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Avanza sin barreras de distancia desde cualquier punto del país.</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={handleScrollToForm}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                Postular a 100% Virtual
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
