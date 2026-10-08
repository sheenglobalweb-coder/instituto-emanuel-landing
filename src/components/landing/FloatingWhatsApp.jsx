import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { generateStudentInquiryLink } from '../../lib/leadsService';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Interactive Tooltip bubble */}
      {showTooltip && (
        <div className="bg-slate-900 border border-amber-500/40 text-slate-100 p-3 rounded-2xl shadow-2xl max-w-[240px] text-xs relative animate-bounce">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-full p-0.5 border border-slate-700"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">Admisión en Línea</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            ¿Tienes dudas sobre vacantes o cuotas? Chatea ahora mismo con secretaría.
          </p>
        </div>
      )}

      {/* Floating button */}
      <a
        href={generateStudentInquiryLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-950/50 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/40 animate-ping pointer-events-none group-hover:hidden" />
        <MessageCircle className="w-8 h-8 fill-white" />
      </a>
    </div>
  );
}
