import React from 'react';
import { CheckCircle2, MessageCircle, X, ArrowRight, ShieldCheck, Download, Award } from 'lucide-react';
import { generateStudentInquiryLink } from '../../lib/leadsService';

export default function ThankYouModal({ lead, onClose }) {
  if (!lead) return null;

  const whatsappHref = `https://wa.me/51974123456?text=${encodeURIComponent(
    `¡Hola Instituto Emanuel! Acabo de registrarme en su web. Mi nombre es ${lead.nombres} ${lead.apellidos} (DNI ${lead.dni}). Deseo información inmediata sobre la carrera de ${lead.carrera_interes} en modalidad ${lead.modalidad}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            ¡Registro Exitoso!
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            ¡Gracias, {lead.nombres}!
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Hemos recibido correctamente tu solicitud para{' '}
            <strong className="text-amber-300">{lead.carrera_interes}</strong> en modalidad{' '}
            <strong className="text-amber-300">{lead.modalidad}</strong>.
          </p>
        </div>

        {/* Lead Summary Ticket */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-left text-xs space-y-2">
          <div className="flex justify-between text-slate-400">
            <span>DNI Registrado:</span>
            <span className="font-mono text-white font-semibold">{lead.dni}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Celular de Contacto:</span>
            <span className="font-mono text-white font-semibold">+51 {lead.celular}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Sede Institucional:</span>
            <span className="text-white font-semibold">Chiclayo, Lambayeque</span>
          </div>
        </div>

        {/* WhatsApp Fast Conversion Call To Action */}
        <div className="space-y-3 pt-1">
          <p className="text-xs text-slate-300 font-medium">
            ¿Deseas asegurar tu vacante o recibir el plan de estudios ahora mismo sin esperar?
          </p>
          
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/40"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Hablar de Inmediato con Asesor por WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
          >
            Continuar navegando en el sitio
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Instituto Superior Emanuel • Titulación a Nombre de la Nación</span>
        </div>

      </div>
    </div>
  );
}
