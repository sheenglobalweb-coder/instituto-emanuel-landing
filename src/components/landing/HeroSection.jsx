import React from 'react';
import LeadForm from './LeadForm';
import { Clock, GraduationCap, Award, FileDown, Check } from 'lucide-react';

export default function HeroSection({ onLeadSuccess }) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen h-auto py-10 lg:py-0 lg:h-[calc(100vh-4rem)] lg:min-h-[640px] flex flex-col justify-between overflow-hidden"
    >
      {/* 1. Capa de Fondo e Imagen fija */}
      <img
        src="/hero-laboratorio.jpg"
        alt="Laboratorio de Prótesis Dental - Instituto Emanuel"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* 2. Overlay celeste ligero */}
      <div className="absolute inset-0 z-[1] backdrop-blur-[2px] bg-gradient-to-r from-sky-950/75 via-sky-900/35 to-transparent pointer-events-none" />

      {/* 3. Contenedor Central (Texto 60% + Formulario 40%) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 flex-1 flex items-center py-4 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 w-full">
          
          {/* Columna Izquierda: 60% Propuesta de Valor */}
          <div className="w-full lg:w-[60%] space-y-3.5 text-left">
            
            {/* Insignia superior compacta con borde celeste */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00A3E0] bg-[#00A3E0]/15 text-[#00A3E0] text-xs font-bold tracking-wider uppercase backdrop-blur-sm shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#00A3E0] animate-pulse" />
              <span>INSTITUTO EMANUEL • CHICLAYO</span>
            </div>

            {/* Título H1 imponente con alto contraste y sombra tipográfica */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-5xl font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              Carrera Profesional de{' '}
              <span className="text-sky-300 font-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                Prótesis Dental
              </span>
            </h1>

            {/* Subtítulo conciso con sombra tipográfica */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-xl font-normal leading-relaxed drop-shadow-sm">
              Estudia con horarios flexibles en modalidad semipresencial y obtén tu Título a Nombre de la Nación.
            </p>

            {/* Acceso rápido a descarga de brochure (Botón de alto contraste estilo institucional) */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <a
                href="/brochure-emanuel.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-[#00A3E0] hover:bg-[#008ec2] shadow-lg shadow-sky-500/30 transition-all transform hover:-translate-y-0.5 border border-sky-300/40"
              >
                <FileDown className="w-4 h-4 text-white" />
                <span>Descargar Plan de Estudios (Brochure PDF)</span>
              </a>
            </div>

            {/* Badges de confianza y convenios a nivel nacional */}
            <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="text-xs text-sky-100 flex items-center gap-1.5 font-medium drop-shadow-sm">
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Código Modular N° 1739887</span>
              </div>

              <div className="text-xs text-sky-100 flex items-center gap-1.5 font-medium drop-shadow-sm">
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Talleres 100% Prácticos</span>
              </div>

              <div className="text-xs text-sky-100 flex items-center gap-1.5 font-medium drop-shadow-sm">
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#00A3E0]/30 text-sky-300 shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Convenios a nivel nacional para prácticas semipresenciales</span>
              </div>
            </div>

          </div>

          {/* Columna Derecha: 40% Tarjeta Compacta con LeadForm (no supera 460px) */}
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-4 lg:p-5 rounded-2xl shadow-2xl border border-white/20 max-h-[460px]">
              <LeadForm onSuccess={onLeadSuccess} compact={true} />
            </div>
          </div>

        </div>
      </div>

      {/* 4. Barra Celeste Inferior (3 Pilares Destacados) */}
      <div className="relative z-10 w-full bg-[#00A3E0] text-white py-3 shrink-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-center items-center font-bold tracking-wide uppercase text-xs lg:text-sm">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 shrink-0 text-white/95" />
            <span>DURACIÓN: 3 AÑOS</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:border-x md:border-white/30 md:px-4">
            <GraduationCap className="w-4 h-4 shrink-0 text-white/95" />
            <span>MODALIDAD: SEMIPRESENCIAL</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 shrink-0 text-white/95" />
            <span>TÍTULO: A NOMBRE DE LA NACIÓN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
