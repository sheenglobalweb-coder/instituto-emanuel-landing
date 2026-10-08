import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { Shield, LogOut, ExternalLink, Database, Sparkles, UserCheck } from 'lucide-react';

export default function AdminNavbar({ onOpenSqlModal, isOnline }) {
  const { currentUser, logout, isSuperAdmin } = useAuth();
  const { navigate } = useRouter();

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Section Title */}
          <div className="flex items-center gap-3">
            <img
              src="/logo_3d.png"
              alt="Instituto Emanuel"
              className="h-10 sm:h-12 w-auto object-contain cursor-pointer"
              onClick={() => navigate('/')}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-base sm:text-lg font-bold text-white">
                  EMANUEL
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Panel Admisión
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">
                Gestión en tiempo real de postulantes a Prótesis Dental y Cursos
              </p>
            </div>
          </div>

          {/* User profile & actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Database Sync Indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
              <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
              <span>{isOnline ? 'Supabase Conectado' : 'Modo Seguro Activo'}</span>
            </div>

            {/* SQL Helper Modal (Super Admin) */}
            {isSuperAdmin && (
              <button
                onClick={onOpenSqlModal}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/60 text-xs font-medium transition-colors"
                title="Configuración de base de datos Supabase"
              >
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">SQL Supabase</span>
              </button>
            )}

            {/* User details badge */}
            <div className="flex items-center gap-2 pl-2 sm:border-l sm:border-slate-800">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold text-white block leading-tight">
                  {currentUser?.nombre_completo || currentUser?.username}
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${isSuperAdmin ? 'text-amber-400' : 'text-blue-400'}`}>
                  {isSuperAdmin ? '★ Super Admin' : 'Admin Básico (Secretaría)'}
                </span>
              </div>

              {/* View Landing */}
              <button
                onClick={() => navigate('/')}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
                title="Ver Landing Page pública"
              >
                <ExternalLink className="w-4 h-4" />
              </button>

              {/* Logout button */}
              <button
                onClick={logout}
                className="p-2 text-red-400 hover:text-red-300 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
