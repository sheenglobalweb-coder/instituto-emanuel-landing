import React from 'react';
import { CreditCard, ShieldCheck, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function PaymentPlansSection() {
  const benefits = [
    {
      title: 'Matrícula Fraccionada',
      desc: 'Inicia tus estudios realizando un primer abono accesible y completa el resto de tu matrícula en cuotas cómodas sin recargo.'
    },
    {
      title: 'Cuotas Mensuales Fijas',
      desc: 'Tu mensualidad se mantiene congelada durante todo el año académico. Sin cobros sorpresa ni tarifas ocultas.'
    },
    {
      title: 'Descuento por Pronto Pago',
      desc: 'Accede a un descuento promocional especial si te inscribes dentro de las fechas tempranas de la convocatoria 2026.'
    },
    {
      title: 'Múltiples Medios de Pago',
      desc: 'Paga de forma fácil y segura mediante Yape, Plin, transferencias BCP, BBVA, Interbank o depósito en ventanilla/agente.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#0a1226] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-blue-950/70 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Accesibilidad Económica</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
                Estudia sin Barreras: <span className="gold-gradient-text">Planes y Facilidades a tu Medida</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Queremos que cumplas tu meta de titularte como profesional técnico. Diseñamos facilidades de pago para que la inversión económica no frene tu vocación y futuro profesional.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="mt-1 p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{b.title}</h4>
                      <p className="text-xs text-slate-400 leading-snug">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Campaña de Matrícula 2026
              </span>
              
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Consulta tu Escala de Cuotas Personalizada
              </h3>

              <p className="text-xs text-slate-300">
                Habla directamente con un asesor financiero del instituto para estructurar tu cronograma de pagos según tu presupuesto.
              </p>

              <div className="pt-2">
                <a
                  href="#formulario"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20"
                >
                  <span>Solicitar Tabla de Cuotas</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Asesoría gratuita y sin compromiso de inscripción</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
