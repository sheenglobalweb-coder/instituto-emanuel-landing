import React, { useState } from 'react';
import { Award, BookOpen, Layers, CheckCircle, Download, FileText, ChevronRight, Sparkles } from 'lucide-react';

export default function CareerDentalSection() {
  const [activeModule, setActiveModule] = useState(0);

  const modules = [
    {
      num: 'Módulo I',
      title: 'Prótesis Parciales Removibles y Fundamentos de Laboratorio',
      ciclos: 'Ciclos I y II (Año 1)',
      cert: 'Certificación Oficial: Auxiliar Técnico en Confección de Prótesis Removibles',
      description: 'Aprende los fundamentos anatómicos, bioseguridad, materiales dentales, modelos de trabajo y elaboración de prótesis acrílicas y parciales removibles.',
      subjects: [
        'Anatomía y Morfología Dental Aplicada',
        'Biomateriales Odontológicos y Vaciado de Modelos',
        'Oclusión y Manejo de Articuladores Dentales',
        'Elaboración de Prótesis Removibles Acrílicas',
        'Diseño y Paralelizado de Prótesis Parcial Metálica',
        'Bioseguridad y Organización del Laboratorio Dental'
      ]
    },
    {
      num: 'Módulo II',
      title: 'Prótesis Fija, Cerámica Odontológica y Metalistería',
      ciclos: 'Ciclos III y IV (Año 2)',
      cert: 'Certificación Oficial: Especialista Técnico en Prótesis Fijas y Metal-Cerámica',
      description: 'Domina las técnicas de colado de aleaciones dentales, confección de coronas, puentes, carillas y la estratificación artística de cerámica dental.',
      subjects: [
        'Técnicas de Encerado de Diagnóstico y Patrones',
        'Colado Odontológico y Ajuste de Estructuras Metálicas',
        'Estratificación de Cerámica Dental y Porcelanas',
        'Confección de Coronas Metal-Porcelana y Libres de Metal',
        'Carillas Estéticas e Incrustaciones (Inlay / Onlay)',
        'Control de Calidad y Terminación Protésica'
      ]
    },
    {
      num: 'Módulo III',
      title: 'Prótesis Totales, Flujo Digital CAD/CAM y Rehabilitación Integral',
      ciclos: 'Ciclos V y VI (Año 3)',
      cert: 'Titulación Oficial MINEDU: Profesional Técnico en Prótesis Dental',
      description: 'Desarrolla prótesis totales con enfilado estético de alta precisión, iniciación en diseño digital CAD/CAM 3D, zirconio y gestión de tu propio laboratorio.',
      subjects: [
        'Prótesis Totales y Enfilado Dentario Oclusal',
        'Acrilizado y Caracterización de Encinas Protésicas',
        'Flujo Digital en Odontología y Software CAD/CAM',
        'Diseño de Estructuras en Zirconio y Disilicato',
        'Prótesis Dental sobre Implantes Odontológicos',
        'Administración y Apertura de Laboratorio Dental Propio'
      ]
    }
  ];

  return (
    <section id="carrera" className="py-16 sm:py-24 bg-[#080d1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-3 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Programa Bandera de 3 Años</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Carrera Profesional Técnica en <span className="gold-gradient-text">Prótesis Dental</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Diseñada bajo los lineamientos del Ministerio de Educación (MINEDU) para formar especialistas altamente solicitados por odontólogos, clínicas y centros protésicos.
          </p>
        </div>

        {/* Career Details Cards Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Duración Oficial</span>
            <span className="text-lg sm:text-xl font-bold text-white font-cinzel">3 Años (6 Ciclos)</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Grado Obtenido</span>
            <span className="text-lg sm:text-xl font-bold text-amber-400 font-cinzel">Profesional Técnico</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Validez Legal</span>
            <span className="text-lg sm:text-xl font-bold text-white font-cinzel">A Nombre de la Nación</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Código Modular</span>
            <span className="text-lg sm:text-xl font-bold text-emerald-400 font-cinzel">N° 1739887</span>
          </div>
        </div>

        {/* Interactive Curriculum (Malla Curricular) */}
        <div id="malla" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Malla Curricular por Módulos Formativos</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Avanza ciclo a ciclo adquiriendo destrezas prácticas certificadas por el MINEDU.
              </p>
            </div>
            
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Solicitar Malla Completa (PDF)</span>
            </a>
          </div>

          {/* Module Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {modules.map((m, idx) => (
              <button
                key={m.num}
                onClick={() => setActiveModule(idx)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  activeModule === idx
                    ? 'bg-amber-500/15 border-amber-400 shadow-md'
                    : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold uppercase tracking-wider ${activeModule === idx ? 'text-amber-400' : 'text-slate-400'}`}>
                    {m.num}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {m.ciclos}
                  </span>
                </div>
                <h4 className={`text-sm font-semibold line-clamp-1 ${activeModule === idx ? 'text-white' : 'text-slate-300'}`}>
                  {m.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Active Module Details */}
          <div className="p-6 rounded-2xl bg-[#0b1329] border border-blue-900/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  {modules[activeModule].num} • {modules[activeModule].ciclos}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  {modules[activeModule].title}
                </h4>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{modules[activeModule].cert}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              {modules[activeModule].description}
            </p>

            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Cursos y Talleres Clave de este Módulo:
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {modules[activeModule].subjects.map((sub, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-200 font-medium">{sub}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
