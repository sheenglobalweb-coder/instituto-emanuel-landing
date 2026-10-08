import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { Shield, Lock, Mail, AlertCircle, ArrowLeft, Loader2, Sparkles, UserCheck } from 'lucide-react';

export default function AdminLogin() {
  const { setSessionUser, login: localLogin } = useAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    try {
      // 1. Ejecución de autenticación oficial con Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword
      });

      if (authError) {
        // En caso de que las credenciales no existan aún en Supabase Auth o falle la red,
        // intentamos autenticar con las cuentas locales institucionales de respaldo
        const fallbackRes = localLogin(cleanEmail.replace('@emanuel.edu.pe', ''), cleanPassword);
        if (fallbackRes && fallbackRes.success) {
          navigate('/admin');
          return;
        }

        // Si tampoco coincide localmente, mostramos el error de Supabase
        setError(authError.message === 'Invalid login credentials' 
          ? 'Credenciales inválidas. Verifique su correo y contraseña institucional.' 
          : authError.message
        );
      } else if (data?.session) {
        // Consultar rol en la tabla admin_users si existe
        let role = 'admin_basico';
        let nombreCompleto = cleanEmail.split('@')[0];

        try {
          const { data: adminData } = await supabase
            .from('admin_users')
            .select('*')
            .or(`id.eq.${data.session.user.id},username.eq.${nombreCompleto}`)
            .maybeSingle();

          if (adminData && adminData.role) {
            role = adminData.role;
            nombreCompleto = adminData.nombre_completo || adminData.username || nombreCompleto;
          } else if (cleanEmail.toLowerCase().includes('admin')) {
            role = 'super_admin';
          }
        } catch (roleErr) {
          console.warn('Consulta a admin_users:', roleErr);
          if (cleanEmail.toLowerCase().includes('admin')) {
            role = 'super_admin';
          }
        }

        if (setSessionUser) {
          setSessionUser({
            id: data.session.user.id,
            email: data.session.user.email,
            nombre_completo: nombreCompleto,
            role: role
          });
        }

        // Redirección automática a /admin
        navigate('/admin');
      }
    } catch (err) {
      console.error('Error en autenticación:', err);
      // Fallback a autenticación de respaldo
      const fallbackRes = localLogin(cleanEmail.replace('@emanuel.edu.pe', ''), cleanPassword);
      if (fallbackRes && fallbackRes.success) {
        navigate('/admin');
        return;
      }
      setError('Ocurrió un error al conectar con el servidor de autenticación.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-amber-400 selection:text-slate-950">
      {/* Resplandor decorativo de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Botón de retorno al inicio */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la Página Principal</span>
      </button>

      <div className="w-full max-w-md bg-slate-900/95 border-2 border-amber-500/30 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
        
        {/* Cabecera institucional */}
        <div className="text-center mb-6">
          <img
            src="/logo_3d.png"
            alt="Instituto Emanuel"
            className="h-16 w-auto mx-auto object-contain mb-3 drop-shadow-md"
          />
          <h2 className="text-2xl font-bold text-white font-cinzel tracking-wide">
            INSTITUTO EMANUEL
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-1 uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Panel de Gestión de Admisión</span>
          </div>
        </div>

        {/* Notificación de Error */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-950/70 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Correo Institucional
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@emanuel.edu.pe"
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
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
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Autenticando...</span>
              </>
            ) : (
              <span>Ingresar al Panel Administrativo</span>
            )}
          </button>
        </form>

        {/* Accesos Rápidos de Prueba */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center space-y-2.5">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
            Credenciales de Prueba Disponibles:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemo('admin@emanuel.edu.pe', 'admin2026')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-500/40 transition-all text-left"
            >
              <strong className="text-amber-400 block text-[11px] font-bold">Super Admin</strong>
              <span className="text-[10px] text-slate-400 font-mono block truncate">admin@emanuel.edu.pe</span>
              <span className="text-[9px] text-slate-500 font-mono">Clave: admin2026</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('secretaria@emanuel.edu.pe', 'secretaria2026')}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-blue-500/40 transition-all text-left"
            >
              <strong className="text-blue-400 block text-[11px] font-bold">Admin Básico</strong>
              <span className="text-[10px] text-slate-400 font-mono block truncate">secretaria@emanuel.edu.pe</span>
              <span className="text-[9px] text-slate-500 font-mono">Clave: secretaria2026</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
