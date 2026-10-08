import React, { useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import CurriculumSection from '../components/landing/CurriculumSection';
import WhatsAppFloat from '../components/landing/WhatsAppFloat';
import Footer from '../components/landing/Footer';
import {
  CheckCircle2,
  MessageCircle,
  Download,
  ArrowLeft,
  Sparkles,
  Award,
  ShieldCheck,
  Unlock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateStudentInquiryLink } from '../lib/leadsService';

export default function ThankYouPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    // Fire celebratory confetti on page load
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.3 }
      });
    } catch {}

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Banner de Éxito y Desbloqueo */}
      <div className="bg-emerald-700 text-white text-xs sm:text-sm py-2.5 px-4 text-center font-bold flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span>¡Postulación Exitosa! Tu plan de estudios completo ha sido 100% desbloqueado.</span>
      </div>

      {/* Hero de Agradecimiento */}
      <header className="bg-gradient-to-b from-slate-50 to-white py-10 md:py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="max-w-3xl mx-auto space-y-5">
          
          {/* Badge y Logo */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/logo_3d.png" alt="Instituto Emanuel" className="h-12 w-auto object-contain" />
            <div className="text-left">
              <span className="font-cinzel text-base font-bold text-[#0f1c3f] block leading-tight">INSTITUTO EMANUEL</span>
              <span className="text-[10px] text-slate-500 font-semibold">Chiclayo • Cód. 1739887</span>
            </div>
          </div>

          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 border-2 border-emerald-300 flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/10">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
              <Unlock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Acceso VIP Concedido</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f1c3f] tracking-tight">
              ¡Registro Exitoso! Tu postulación ha sido recibida
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Un asesor de admisión de Chiclayo se contactará a la brevedad para brindarte tu constancia de vacante, facilidades de pago y resolver todas tus consultas.
            </p>
          </div>

          {/* Botón Principal (Descarga PDF) y Botón Secundario (WhatsApp) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 max-w-lg mx-auto">
            <a
              href="/brochure-emanuel.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#0f1c3f] hover:bg-[#152a5e] text-white font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-indigo-950/20 active:scale-[0.99]"
            >
              <Download className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Descargar Malla en PDF</span>
            </a>

            <a
              href={`https://wa.me/51974123456?text=${encodeURIComponent('Hola, acabo de registrarme en la web y deseo información inmediata sobre la carrera de Prótesis Dental.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-emerald-600/25 active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>Atención por WhatsApp</span>
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la página principal</span>
            </button>
          </div>

          </div>
        </div>
      </header>

      {/* Visor de la Malla Curricular en Modo 100% Libre y Desbloqueado */}
      <main>
        <CurriculumSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float */}
      <WhatsAppFloat />

    </div>
  );
}
