import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: '¿El título emitido por el Instituto Emanuel tiene valor oficial del MINEDU?',
      a: 'Sí, totalmente oficial. El Instituto de Educación Superior Tecnológico Privado Emanuel cuenta con Código Modular N° 1739887 otorgado por el Ministerio de Educación del Perú. Al culminar el plan de 3 años obtienes el Título de Profesional Técnico en Prótesis Dental a Nombre de la Nación, válido para trabajar en el sector público, privado o continuar estudios de convalidación universitaria.'
    },
    {
      q: '¿Cómo son los horarios de los talleres si elijo la modalidad semipresencial?',
      a: 'La teoría se lleva de manera virtual para brindarte máxima comodidad y los talleres prácticos se concentran en nuestra sede de Chiclayo en horarios adaptados para personas que trabajan (incluyendo turnos en fines de semana). Esto permite que estudiantes de Chiclayo, Lambayeque, Ferreñafe, Piura, Trujillo y Cajamarca puedan formarse sin descuidar sus actividades.'
    },
    {
      q: '¿Cuáles son los requisitos de matrícula para este periodo 2026?',
      a: 'Los requisitos son muy sencillos: 1) Copia simple de tu DNI vigente; 2) Certificado de estudios secundarios concluidos (o constancia digital MINEDU); 3) Ficha de matrícula institucional; y 4) Primer abono de matrícula (disponible con facilidades de fraccionamiento).'
    },
    {
      q: '¿Tengo que comprar todos los materiales dentales desde el primer ciclo?',
      a: 'No. El requerimiento de insumos es estrictamente progresivo de acuerdo con el avance temático. Además, el Instituto Emanuel pone a disposición de sus estudiantes el equipamiento de taller: articuladores dentales, micromotores, recortadoras, paralelómetros y hornos de colado y cerámica.'
    },
    {
      q: '¿Puedo empezar a trabajar antes de graduarme de los 3 años?',
      a: '¡Por supuesto! Ese es uno de los mayores diferenciales de Emanuel. Al culminar con éxito el Ciclo II (1er año) obtienes tu Certificación Modular Oficial como Auxiliar de Laboratorio Protésico, lo que te permite generar ingresos económicos inmediatos mientras continúas tus estudios.'
    },
    {
      q: '¿Qué facilidades de pago ofrecen si cuento con presupuesto ajustado?',
      a: 'Contamos con convenios de matrícula fraccionada (dividiendo la inscripción en dos partes) y cuotas mensuales fijas congeladas durante todo el ciclo sin cobros imprevistos. También brindamos descuentos por pronto pago para las primeras vacantes reservadas.'
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#080d1a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-3 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Despeja tus Dudas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
            Preguntas Frecuentes
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Conoce todos los detalles sobre titulación, dinámica de clases, turnos de práctica y requisitos.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-slate-900/90 border-amber-500/50 shadow-lg'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-semibold ${isOpen ? 'text-amber-300' : 'text-white'}`}>
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-amber-500/20 text-amber-400' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA within FAQ */}
        <div className="mt-10 p-6 rounded-2xl bg-blue-950/40 border border-blue-900/60 text-center">
          <p className="text-xs sm:text-sm text-slate-300 mb-3">
            ¿Tienes alguna consulta específica sobre tu situación académica o convalidaciones?
          </p>
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300"
          >
            <span>Conversa con un asesor de admisiones del instituto &rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}
