import React from 'react';
import { BookOpen, Clock, Award, ArrowRight, MessageCircle } from 'lucide-react';
import { generateStudentInquiryLink } from '../../lib/leadsService';

export default function CoursesCatalogSection() {
  const courses = [
    {
      title: 'Especialización en Zirconio Dental y CAD/CAM',
      duration: '3 Meses (Intensivo)',
      level: 'Avanzado / Digital',
      desc: 'Capacítate en el estándar de oro de la odontología moderna: diseño digital 3D (exocad), fresado de estructuras, maquillaje y sinterizado de zirconio multicapa.',
      highlights: ['Diseño digital 3D', 'Sinterizado y estratificación', 'Certificado de especialización']
    },
    {
      title: 'Auxiliar de Clínica y Laboratorio Protésico',
      duration: '4 Meses',
      level: 'Inicial / Asistencial',
      desc: 'Aprende los protocolos indispensables de vaciado de modelos, duplicado, articulación en oclusores, bioseguridad y confección de provisionales acrílicos.',
      highlights: ['Prácticas directas', 'Manejo de materiales', 'Rápida salida laboral']
    },
    {
      title: 'Farmacología Odontológica y Protocolos Clínicos',
      duration: '2 Meses',
      level: 'Actualización en Salud',
      desc: 'Actualización esencial en fármacos odontológicos, antiinflamatorios, antimicrobianos, manejo de emergencias y normativas del MINSA en salud bucal.',
      highlights: ['Casos clínicos reales', 'Docentes odontólogos', 'Certificación institucional']
    },
    {
      title: 'Gestión, Finanzas y Marketing para Laboratorios',
      duration: '2 Meses',
      level: 'Emprendimiento Dental',
      desc: 'Aprende a costear trabajos protésicos, presupuestos, fijación de precios, formalización tributaria y estrategias para captar más odontólogos clientes.',
      highlights: ['Plantillas de costeo', 'Estrategia comercial B2B', 'Plan de negocio']
    }
  ];

  return (
    <section id="cursos" className="py-16 sm:py-24 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-900/40 text-blue-300 border border-blue-500/30 mb-3 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Formación Continua y Actualización</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Cursos Cortos y Especializaciones
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Programas intensivos de corta duración diseñados para actualizar a técnicos, bachilleres y odontólogos en las técnicas más demandadas del mercado.
            </p>
          </div>

          <a
            href="#formulario"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 group shrink-0"
          >
            <span>Ver requisitos de inscripción</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((c, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{c.duration}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-blue-300 font-semibold border border-slate-700">
                    {c.level}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2.5 group-hover:text-amber-300 transition-colors">
                  {c.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {c.desc}
                </p>

                <div className="space-y-1.5 mb-5 border-t border-slate-800 pt-3">
                  {c.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <a
                  href={`#formulario`}
                  className="flex-1 py-2 px-3 text-center bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Postular
                </a>
                <a
                  href={generateStudentInquiryLink(c.title, 'Virtual / Semipresencial')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-xl transition-colors"
                  title="Consultar por WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
