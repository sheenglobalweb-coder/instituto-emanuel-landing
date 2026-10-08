import React, { useState } from 'react';
import { X, Copy, Check, Database, Terminal, ShieldAlert } from 'lucide-react';
import { SUPABASE_URL } from '../../lib/supabase';

export default function AdminSqlHelperModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const sqlScript = `-- 1. Crear tabla leads (prospectos) si no existe
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    dni VARCHAR(15) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    modalidad TEXT DEFAULT 'Semipresencial',
    carrera_interes TEXT DEFAULT 'Prótesis Dental (3 Años)',
    utm_source TEXT DEFAULT 'directo',
    utm_campaign TEXT,
    estado TEXT DEFAULT 'Nuevo'
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. Crear políticas RLS públicas para inserción y lectura
DROP POLICY IF EXISTS "Permitir insercion anonima" ON public.leads;
CREATE POLICY "Permitir insercion anonima" 
ON public.leads FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura para panel" ON public.leads;
CREATE POLICY "Permitir lectura para panel" 
ON public.leads FOR SELECT 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS "Permitir actualizacion para panel" ON public.leads;
CREATE POLICY "Permitir actualizacion para panel" 
ON public.leads FOR UPDATE 
TO anon, authenticated 
USING (true);

DROP POLICY IF EXISTS "Permitir eliminacion para panel" ON public.leads;
CREATE POLICY "Permitir eliminacion para panel" 
ON public.leads FOR DELETE 
TO anon, authenticated 
USING (true);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Sincronización Cloud Supabase
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {SUPABASE_URL}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="py-4 space-y-3 overflow-y-auto">
          <p className="text-xs text-slate-300 leading-relaxed">
            El sistema cuenta con persistencia híbrida (almacenamiento local reactivo + sincronización en la nube con Supabase).
            Para que la base de datos de Supabase permita el registro directo sin bloqueos de RLS, ejecuta este script en el{' '}
            <strong className="text-amber-300">SQL Editor</strong> de tu proyecto Supabase:
          </p>

          <div className="relative">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 border-t border-x border-slate-800 rounded-t-xl text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-400" /> script_setup_leads.sql
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar SQL'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-b-xl text-[11px] text-slate-300 font-mono overflow-x-auto leading-relaxed max-h-60">
              {sqlScript}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Tabla: <code className="text-amber-300">public.leads</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}
