import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { CheckCircle2, MessageCircle, ArrowLeft, ShieldCheck, Phone } from 'lucide-react';
import { generateStudentInquiryLink } from '../../lib/leadsService';

export default function ThankYouPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col justify-center items-center px-4 py-16 relative">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-8 text-center shadow-2xl space-y-6">
        
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            Instituto Emanuel Chiclayo
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-cinzel">
            ¡Tu Solicitud ha sido Registrada!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Nuestro equipo de Admisión te responderá por WhatsApp para enviarte el Plan de Estudios detallado y la escala de cuotas promocionales.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href={generateStudentInquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/50"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Chatear ahora mismo por WhatsApp</span>
          </a>

          <button
            onClick={() => navigate('/')}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </button>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Titulación a Nombre de la Nación • Código Modular N° 1739887</span>
        </div>

      </div>
    </div>
  );
}
