import React from 'react';
import { Users, UserPlus, PhoneCall, CheckCircle, TrendingUp, Laptop, Building2 } from 'lucide-react';

export default function AdminKpiCards({ leads }) {
  const total = leads.length;

  const todayStr = new Date().toISOString().slice(0, 10);
  const leadsToday = leads.filter(l => (l.created_at || '').slice(0, 10) === todayStr).length;

  const contactados = leads.filter(l => {
    const s = (l.estado || '').toLowerCase();
    return s === 'contactado' || s === 'en seguimiento' || s === 'interesado';
  }).length;
  const matriculados = leads.filter(l => (l.estado || '').toLowerCase() === 'matriculado').length;
  const conversionRate = total > 0 ? ((matriculados / total) * 100).toFixed(1) : 0;

  const semipresenciales = leads.filter(l => (l.modalidad || '').includes('Semipresencial')).length;
  const virtuales = leads.filter(l => (l.modalidad || '').includes('Virtual')).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
      
      {/* 1. Total Leads */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold">Total Postulantes</span>
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-cinzel">{total}</span>
          <p className="text-[11px] text-slate-400 mt-0.5">Base acumulada</p>
        </div>
      </div>

      {/* 2. Today's Leads */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold">Nuevos Hoy</span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <UserPlus className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-cinzel">{leadsToday}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded">
              Llamadas del día
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Para gestión inmediata</p>
        </div>
      </div>

      {/* 3. Contacted Leads */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold">En Seguimiento</span>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <PhoneCall className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-cinzel">{contactados}</span>
          <p className="text-[11px] text-slate-400 mt-0.5">Contactados por secretaría</p>
        </div>
      </div>

      {/* 4. Enrolled Students */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold">Matriculados</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-cinzel">{matriculados}</span>
          <p className="text-[11px] text-slate-400 mt-0.5">Vacantes confirmadas</p>
        </div>
      </div>

      {/* 5. Conversion Rate & Modality Mix */}
      <div className="col-span-2 lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold">Efectividad Cierre</span>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-cinzel">{conversionRate}%</span>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-amber-400" /> {semipresenciales} Semi
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Laptop className="w-3 h-3 text-blue-400" /> {virtuales} Virt
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
