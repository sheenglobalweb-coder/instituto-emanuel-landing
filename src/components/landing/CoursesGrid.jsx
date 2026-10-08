import React from 'react';
import { BookOpen, ArrowRight, Award, Clock, Sparkles, Laptop, Building2, CheckCircle2 } from 'lucide-react';

export default function CoursesGrid() {
  const courses = [
    {
      title: 'Auxiliar en Prótesis Dental',
      formValue: 'Auxiliar en Prótesis Dental',
      badges: [
        { text: 'Semipresencial', type: 'semi' },
        { text: '100% Virtual', type: 'virtual' }
      ],
      duration: '4 Meses',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Instrumental y modelos de laboratorio dental',
      desc: 'Formación práctica en vaciado de impresiones, preparación de cubetas individuales, confección de modelos anatómicos y articulación de prótesis acrílicas.',
      highlights: ['Vaciado de modelos anatómicos', 'Cubetas y placas base', 'Certificación Oficial']
    },
    {
      title: 'Farmacología Odontológica',
      formValue: 'Farmacología Odontológica',
      badges: [
        { text: 'Especialización', type: 'special' }
      ],
      duration: '2 Meses',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Farmacología y protocolos clínicos odontológicos',
      desc: 'Actualización en biomateriales, anestésicos locales, analgésicos, antimicrobianos y protocolos de bioseguridad en el consultorio dental.',
      highlights: ['Farmacología aplicada', 'Interacciones y dosificación', 'Protocolos clínicos de urgencia']
    },
    {
      title: 'Zirconio Dental',
      formValue: 'Zirconio Dental',
      badges: [
        { text: 'Tecnología CAD/CAM', type: 'tech' }
      ],
      duration: '3 Meses',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Fresado y coronas de zirconio de alta estética',
      desc: 'Flujo digital integral con software exocad, fresado de óxido de zirconio multicapa, sinterización de alta densidad y caracterización estética.',
      highlights: ['Diseño digital 3D exocad', 'Fresado y sinterizado de coronas', 'Estratificación y maquillaje']
    },
    {
      title: 'Finanzas y Costos en Consultorios Dentales',
      formValue: 'Finanzas y Costos en Consultorios Dentales',
      badges: [
        { text: 'Gestión', type: 'management' }
      ],
      duration: '2 Meses',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Administración médica y presupuestos dentales',
      desc: 'Optimización de presupuestos, costos por hora sillón, cálculo de márgenes en tratamientos y estrategias de rentabilidad para consultorios y laboratorios.',
      highlights: ['Costos de materiales e insumos', 'Punto de equilibrio de clínica', 'Fijación de precios rentables']
    },
    {
      title: 'Microsoft Excel Aplicado',
      formValue: 'Microsoft Excel',
      badges: [
        { text: 'Herramientas Digitales', type: 'digital' }
      ],
      duration: '2 Meses',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Hojas de cálculo analíticas y control de inventarios',
      desc: 'Dominio de fórmulas avanzadas, tablas dinámicas, control de inventario de instrumental dental y reportes financieros automatizados para centros odontológicos.',
      highlights: ['Tablas y gráficos dinámicos', 'Control de stock e inventarios', 'Automatización de presupuestos']
    }
  ];

  const handleConsultCourse = (formValue) => {
    // 1. Emitir evento para el estado de React en LeadForm
    window.dispatchEvent(new CustomEvent('select-course', { detail: formValue }));

    // 2. Desplazar suavemente al formulario
    const formElem = document.getElementById('formulario');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });

      // 3. Forzar selección en el elemento DOM select
      const selectElem = formElem.querySelector('select');
      if (selectElem) {
        for (let i = 0; i < selectElem.options.length; i++) {
          if (
            selectElem.options[i].value.toLowerCase().includes(formValue.toLowerCase()) ||
            formValue.toLowerCase().includes(selectElem.options[i].value.toLowerCase())
          ) {
            selectElem.selectedIndex = i;
            selectElem.dispatchEvent(new Event('change', { bubbles: true }));
            break;
          }
        }
        selectElem.focus();
      }
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'semi':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'virtual':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'special':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'tech':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      case 'management':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'digital':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <section id="cursos" className="py-10 md:py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-800 border border-amber-300 mb-3 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Formación Continua y Especialización</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f1c3f] tracking-tight mb-3">
            Programas y Especialidades de Formación Continua
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Especialízate en las técnicas y herramientas tecnológicas de mayor demanda laboral en clínicas odontológicas, laboratorios de prótesis y gestión de salud.
          </p>
        </div>

        {/* Grilla de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Imagen Destacada del Curso */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badges Superpuestos */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {course.badges.map((b, bIdx) => (
                      <span
                        key={bIdx}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-xs ${getBadgeStyle(
                          b.type
                        )}`}
                      >
                        {b.text}
                      </span>
                    ))}
                  </div>

                  {/* Duración */}
                  <div className="absolute bottom-2.5 right-3 bg-black/70 backdrop-blur text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-[#0f1c3f] mb-2 group-hover:text-amber-600 transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {course.desc}
                  </p>

                  {/* Puntos Destacados */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    {course.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de Acción: Solicitar Información */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleConsultCourse(course.formValue)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-[#0f1c3f] text-[#0f1c3f] hover:text-white font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-[#0f1c3f] group-hover:text-white shadow-2xs"
                >
                  <span>Solicitar Información</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
