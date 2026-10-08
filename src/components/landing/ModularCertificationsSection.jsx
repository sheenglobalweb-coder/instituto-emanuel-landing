import React from 'react';
import { Award, Briefcase, CheckCircle2, ChevronRight, TrendingUp } from 'lucide-react';

export default function ModularCertificationsSection() {
  const certs = [
    {
      level: 'Al culminar Ciclo II (1er Año)',
      title: 'Auxiliar Técnico en Prótesis Removibles',
      badge: 'Inserción Laboral Temprana',
      skills: [
        'Confección de modelos de estudio y de trabajo',
        'Elaboración de prótesis acrílicas y retenedores',
        'Asistencia operativa en laboratorios dentales'
      ],
      impact: 'Comienza a trabajar como auxiliar y asistente de laboratorio desde el primer año.'
    },
    {
      level: 'Al culminar Ciclo IV (2do Año)',
      title: 'Especialista Técnico en Prótesis Fijas y Cerámica',
      badge: 'Alta Demanda en Clínicas',
      skills: [
        'Modelado, colado y pulido de coronas y puentes',
        'Estratificación de cerámica dental y caracterización',
        'Confección de incrustaciones estéticas y provisionales'
      ],
      impact: 'Ingresos superiores trabajando directamente para odontólogos en rehabilitación estética.'
    },
    {
      level: 'Al culminar Ciclo VI (3er Año)',
      title: 'Técnico Especialista en Prótesis Integral y CAD/CAM',
      badge: 'Grado Superior + Titulación',
      skills: [
        'Prótesis totales balanceadas y sobre implantes',
        'Diseño digital odontológico y tecnología CAD/CAM',
        'Gestión empresarial y apertura de laboratorio propio'
      ],
      impact: 'Título a Nombre de la Nación (MINEDU) y capacidad para abrir tu propio laboratorio dental.'
    }
  ];

  return (
    <section id="certificaciones" className="py-16 sm:py-20 bg-[#0a1226] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 mb-3 uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Retorno de Inversión Inmediato</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Trabaja y Genera Ingresos <span className="gold-gradient-text">Antes de Egresar</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            No necesitas esperar 3 años para ingresar al mercado laboral. Nuestro plan de estudios otorga{' '}
            <strong className="text-amber-300">certificaciones modulares oficiales</strong> al término de cada año de estudio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((c, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {c.level}
                  </span>
                  <Award className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {c.title}
                </h3>

                <p className="text-xs text-emerald-400 font-semibold mb-4 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{c.badge}</span>
                </p>

                <div className="space-y-2 mb-6 border-t border-slate-800 pt-4">
                  {c.skills.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 italic bg-slate-950/40 p-3 rounded-xl">
                &ldquo;{c.impact}&rdquo;
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
