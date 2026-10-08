import React from 'react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 h-14 sm:h-16 flex items-center px-4 sm:px-6 shadow-sm shrink-0">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Logo y Texto Institucional a la izquierda */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src="/logo_3d.png"
            alt="Instituto Emanuel"
            className="h-9 sm:h-10 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-cinzel text-base sm:text-lg font-extrabold text-[#0f1c3f] tracking-wide leading-tight group-hover:text-[#00A3E0] transition-colors">
              INSTITUTO EMANUEL
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-normal">
              R.M. Código Modular N° 1739887
            </span>
          </div>
        </a>

        {/* Enlaces de navegación institucional y anclajes */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs lg:text-sm font-semibold text-slate-700">
          <a href="#hero" className="hover:text-[#00A3E0] transition-colors">
            Inicio
          </a>
          <a href="#cursos" className="hover:text-[#00A3E0] transition-colors">
            Cursos
          </a>
          <a href="#malla-curricular" className="hover:text-[#00A3E0] transition-colors">
            Malla Curricular
          </a>
          <a href="#modalidades" className="hover:text-[#00A3E0] transition-colors">
            Modalidades
          </a>
          <a href="#nosotros" className="hover:text-[#00A3E0] transition-colors">
            Nosotros
          </a>
          <a
            href="#formulario"
            className="px-3.5 py-1.5 rounded-lg bg-[#00A3E0] hover:bg-[#0092c8] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow"
          >
            Postular Ahora
          </a>
        </nav>

        {/* Botón rápido para móvil */}
        <div className="md:hidden">
          <a
            href="#formulario"
            className="px-3 py-1.5 rounded-lg bg-[#00A3E0] text-white font-bold text-[11px] uppercase tracking-wider shadow-sm"
          >
            Postular
          </a>
        </div>

      </div>
    </header>
  );
}
