import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { Shield, Lock, User, AlertCircle, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useAuth();
  const { navigate } = useRouter();
  
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin2026');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const res = login(username, password);
    if (!res.success) {
      setError(res.error);
    }
  };

  const handleQuickFill = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/15 blur-[100px] pointer-events-none rounded-full" />

      {/* Back to landing */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-xl bg-slate-900/60 border border-slate-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la Landing Page</span>
      </button>

      <div className="w-full max-w-md bg-slate-900/95 border-2 border-amber-500/30 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
        
        {/* Logo and header */}
        <div className="text-center mb-6">
          <img
            src="/logo_3d.png"
            alt="Instituto Emanuel"
            className="h-16 w-auto mx-auto object-contain mb-3 drop-shadow-md"
          />
          <h2 className="text-2xl font-bold text-white font-cinzel">
            INSTITUTO EMANUEL
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-1 uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Panel de Gestión de Admisión</span>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-950/70 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Usuario Institucional
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin o secretaria"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99]"
          >
            Ingresar al Panel
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center space-y-2.5">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
            Accesos de Prueba Disponibles:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickFill('admin', 'admin2026')}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors text-left"
            >
              <strong className="text-amber-400 block text-[11px]">Super Admin</strong>
              <span className="text-[10px] text-slate-400 font-mono">admin / admin2026</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('secretaria', 'secretaria2026')}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors text-left"
            >
              <strong className="text-blue-400 block text-[11px]">Admin Básico</strong>
              <span className="text-[10px] text-slate-400 font-mono">secretaria / secretaria2026</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
