import React, { useState } from 'react';
import { Laptop, Building2, Check, Clock, Calendar, Sparkles, ArrowRight } from 'lucide-react';

export default function ModalitiesSection() {
  const [activeTab, setActiveTab] = useState('semipresencial');

  return (
    <section id="modalidades" className="py-16 sm:py-20 bg-[#0a1226] border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-900/50 text-blue-300 border border-blue-700/50 mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Flexibilidad de Estudio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Elige la Modalidad que se Adapta a tu Rutina
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            En el Instituto Emanuel combinamos la tecnología de nuestra aula virtual con el rigor práctico 
            de nuestros talleres en Chiclayo, asegurando una formación de máxima calidad ministerial.
          </p>
        </div>

        {/* Tab Selector Switch */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-700 max-w-md w-full">
            <button
              onClick={() => setActiveTab('semipresencial')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'semipresencial'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>Semipresencial (Chiclayo)</span>
            </button>
            <button
              onClick={() => setActiveTab('virtual')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'virtual'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4 shrink-0" />
              <span>100% Virtual</span>
            </button>
          </div>
        </div>

        {/* Dynamic Modality Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {activeTab === 'semipresencial' ? (
            <>
              <div className="lg:col-span-7 bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Recomendado</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Modalidad Semipresencial</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  La experiencia completa para dominar el arte del protésico dental. Llevas las materias teóricas de manera virtual y asistes a talleres intensivos de práctica en nuestra sede institucional de Chiclayo.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-sm text-white block">Teoría Online 100% Flexible:</strong>
                      <span className="text-xs text-slate-400">Acceso a clases virtuales en vivo o grabadas en campus institucional 24/7.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-sm text-white block">Prácticas Presenciales en Taller Chiclayo:</strong>
                      <span className="text-xs text-slate-400">Entrenamiento con instrumental profesional, articuladores y hornos de cerámica.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-sm text-white block">Horarios Adaptados a Quienes Trabajan:</strong>
                      <span className="text-xs text-slate-400">Turnos de taller en fines de semana o bloques concentrados para alumnos de provincias.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href="#formulario"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
                  >
                    <span>Postular a Modalidad Semipresencial</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-900/60 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Cronograma de Prácticas</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Sábados intensivos o turnos programados en sede Chiclayo (Lambayeque). Asistencia guiada por odontólogos y maestros protésicos certificados.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-medium">Requisitos mínimos:</span>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li>Secundaria completa certificada.</li>
                    <li>Disponibilidad para talleres en Chiclayo.</li>
                    <li>Dispositivo con acceso a internet.</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="lg:col-span-7 bg-slate-900/80 border border-blue-500/30 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Máxima Flexibilidad</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Modalidad 100% Virtual</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Diseñada para postulantes de todo el Perú que buscan avanzar a su propio ritmo sin necesidad de traslados continuos, con material multimedia de alta definición y acompañamiento académico constante.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-sm text-white block">Campus Virtual 24 Horas al Día:</strong>
                      <span className="text-xs text-slate-400">Revisa lecciones grabadas, manuales protésicos y evaluaciones cuando tú decidas.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-sm text-white block">Demostraciones en Video HD y Casos Reales:</strong>
                      <span className="text-xs text-slate-400">Grabaciones de modelado, encerado y flujo digital CAD/CAM paso a paso.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-sm text-white block">Tutoría y Asesoría Personalizada:</strong>
                      <span className="text-xs text-slate-400">Consultas directas con los profesores vía chat institucional y sesiones en vivo.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href="#formulario"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
                  >
                    <span>Postular a Modalidad Virtual</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-900/60 space-y-3">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Estudia desde Cualquier Ciudad</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Ideal para técnicos auxiliares en ejercicio, personas de otras regiones de Lambayeque, Piura, Trujillo, Lima o el interior que buscan su titulación oficial MINEDU.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-medium">Requisitos mínimos:</span>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li>Secundaria completa certificada.</li>
                    <li>Computadora o tablet con conexión estable.</li>
                    <li>Compromiso y autonomía en el aprendizaje.</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
