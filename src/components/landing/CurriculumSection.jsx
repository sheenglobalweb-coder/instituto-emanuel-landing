import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, Award, Sparkles, BookOpen } from 'lucide-react';

export default function CurriculumSection() {
  const [activeCycle, setActiveCycle] = useState(1);

  const cycles = [
    {
      num: 1,
      name: 'I Ciclo',
      creditos: 20,
      courses: [
        { name: 'Introducción a la Prótesis Dental', cred: 2, type: 'Especialidad' },
        { name: 'Primeros Auxilios', cred: 2, type: 'General' },
        { name: 'Materiales Dentales', cred: 4, type: 'Especialidad' },
        { name: 'Morfología Dental', cred: 2, type: 'Especialidad' },
        { name: 'Oclusión', cred: 4, type: 'Especialidad' },
        { name: 'Anatomía y Fisiología Bucodentaria', cred: 4, type: 'Especialidad' },
        { name: 'Comunicación Efectiva', cred: 2, type: 'Empleabilidad' }
      ]
    },
    {
      num: 2,
      name: 'II Ciclo',
      creditos: 17,
      courses: [
        { name: 'Química Aplicada a la Prótesis Dental', cred: 4, type: 'Especialidad' },
        { name: 'Prótesis Dental Removible', cred: 3, type: 'Especialidad' },
        { name: 'Diseño de Prótesis Dental', cred: 3, type: 'Especialidad' },
        { name: 'Trabajo Comunitario', cred: 2, type: 'Empleabilidad' },
        { name: 'Tecnologías de la Información', cred: 5, type: 'Empleabilidad' }
      ]
    },
    {
      num: 3,
      name: 'III Ciclo',
      creditos: 18,
      courses: [
        { name: 'Prótesis Parcial Removible Base Acrílica', cred: 4, type: 'Especialidad' },
        { name: 'Prótesis Parcial Removible Base Metálica', cred: 4, type: 'Especialidad' },
        { name: 'Procedimiento de Laboratorio Prótesis Parcial Base Acrílica', cred: 4, type: 'Taller' },
        { name: 'Procedimiento Prótesis Parcial Removible Base Metálica', cred: 4, type: 'Taller' },
        { name: 'Inglés', cred: 2, type: 'Empleabilidad' }
      ]
    },
    {
      num: 4,
      name: 'IV Ciclo',
      creditos: 18,
      courses: [
        { name: 'Puentes Dentales', cred: 2, type: 'Especialidad' },
        { name: 'Introducción a la Ortodoncia', cred: 4, type: 'Especialidad' },
        { name: 'Obtención de Modelos para Ortodoncia', cred: 4, type: 'Taller' },
        { name: 'Retenedores Intra y Extracoronarios', cred: 4, type: 'Especialidad' },
        { name: 'Ética y Responsabilidad Social', cred: 4, type: 'Empleabilidad' }
      ]
    },
    {
      num: 5,
      name: 'V Ciclo',
      creditos: 17,
      courses: [
        { name: 'Confección Aparatos de Ortodoncia Fija y Semifija', cred: 5, type: 'Taller' },
        { name: 'Confección Aparatos de Ortodoncia Funcional', cred: 5, type: 'Taller' },
        { name: 'Confección Aparatos de Ortodoncia Removible', cred: 5, type: 'Taller' },
        { name: 'Investigación e Innovación Prótesis Dental', cred: 2, type: 'Investigación' }
      ]
    },
    {
      num: 6,
      name: 'VI Ciclo',
      creditos: 21,
      courses: [
        { name: 'Procedimiento de Laboratorio Prótesis Total Monoplano', cred: 2, type: 'Taller' },
        { name: 'Procedimiento de Laboratorio Prótesis Total Poliplano', cred: 5, type: 'Taller' },
        { name: 'Procesos de Prensado de Prótesis Dental', cred: 5, type: 'Taller' },
        { name: 'Trabajo de Aplicación Profesional', cred: 4, type: 'Titulación' },
        { name: 'Solución de Problemas en la Empresa', cred: 5, type: 'Empleabilidad' }
      ]
    }
  ];

  const currentCycleData = cycles.find(c => c.num === activeCycle) || cycles[0];

  return (
    <section id="malla-curricular" className="py-10 md:py-14 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 mb-3 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Plan de Estudios Oficial MINEDU • 100% Acceso Libre</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f1c3f] tracking-tight mb-3">
              Malla Curricular de Prótesis Dental
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Formación estructurada en <strong>6 ciclos académicos (3 años)</strong>, 31 asignaturas especializadas y 111 créditos oficiales reconocidos por el Ministerio de Educación (Código Modular N° 1739887).
            </p>
          </div>

          {/* Botón de Descarga Directa del Brochure Oficial */}
          <div className="shrink-0">
            <a
              href="/brochure-emanuel.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00A3E0] hover:bg-[#0092c8] text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Plan de Estudios (Brochure PDF)</span>
            </a>
          </div>
        </div>

        {/* Resumen de Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <span className="text-xs text-slate-500 block mb-0.5 font-medium">Duración</span>
            <span className="text-lg sm:text-xl font-extrabold text-[#0f1c3f] font-cinzel">3 AÑOS / 6 CICLOS</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <span className="text-xs text-slate-500 block mb-0.5 font-medium">Asignaturas Totales</span>
            <span className="text-lg sm:text-xl font-extrabold text-amber-600 font-cinzel">31 MATERIAS</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <span className="text-xs text-slate-500 block mb-0.5 font-medium">Créditos Oficiales</span>
            <span className="text-lg sm:text-xl font-extrabold text-emerald-600 font-cinzel">111 CRÉDITOS</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <span className="text-xs text-slate-500 block mb-0.5 font-medium">Resolución Ministerial</span>
            <span className="text-xs sm:text-sm font-bold text-blue-900 block mt-1">Cód. Modular 1739887</span>
          </div>
        </div>

        {/* Selector de Ciclos (Todos los 6 ciclos 100% navegables y activos) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {cycles.map((c) => {
            const isCurrent = activeCycle === c.num;

            return (
              <button
                key={c.num}
                type="button"
                onClick={() => setActiveCycle(c.num)}
                className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#0f1c3f] text-white shadow-md shadow-blue-950/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{c.name}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                  isCurrent ? 'bg-amber-400 text-slate-950 font-extrabold' : 'bg-slate-100 text-slate-600 font-semibold'
                }`}>
                  {c.creditos} crd.
                </span>
              </button>
            );
          })}
        </div>

        {/* Desglose de Cursos del Ciclo Seleccionado */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider block">
                Detalle Curricular Oficial
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f1c3f]">
                Asignaturas del {currentCycleData.name} ({currentCycleData.creditos} Créditos)
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Formación teórico-práctica con talleres especializados
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {currentCycleData.courses.map((course, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100/70 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {course.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                      {course.type}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="inline-flex items-center px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    {course.cred} crd.
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Banner inferior de Descarga Directa */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-amber-50 border border-blue-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <FileText className="w-8 h-8 text-[#00A3E0] shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#0f1c3f]">
                  Plan de Estudios Oficial Completo (I al VI Ciclo)
                </p>
                <p className="text-xs text-slate-600">
                  Descarga inmediata del brochure y sílabo curricular en PDF emitido por el Instituto Emanuel (Código Modular N° 1739887).
                </p>
              </div>
            </div>

            <a
              href="/brochure-emanuel.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00A3E0] hover:bg-[#0092c8] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shrink-0 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Plan de Estudios (PDF)</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
