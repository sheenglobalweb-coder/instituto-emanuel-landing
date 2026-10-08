import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Save, AlertCircle, Shield } from 'lucide-react';

export default function AdminEditModal({ lead, onClose, onSave }) {
  const { isSuperAdmin } = useAuth();
  
  const [formData, setFormData] = useState({
    nombres: lead?.nombres || '',
    apellidos: lead?.apellidos || '',
    dni: lead?.dni || '',
    celular: lead?.celular || '',
    modalidad: lead?.modalidad || 'Semipresencial',
    carrera_interes: lead?.carrera_interes || 'Prótesis Dental (3 Años)',
    estado: lead?.estado || 'Nuevo',
    notas: lead?.notas || ''
  });

  if (!lead) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(lead.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">
              {isSuperAdmin ? 'Editar Prospecto' : 'Gestionar Seguimiento y Notas'}
            </h3>
            <span className="text-xs text-slate-400">
              ID: {lead.id} • DNI: {lead.dni}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuperAdmin && (
          <div className="mt-4 p-3 bg-blue-950/40 border border-blue-900 rounded-xl text-blue-300 text-xs flex items-center gap-2">
            <Shield className="w-4 h-4 shrink-0" />
            <span>Como Admin Básico puedes actualizar el estado y registrar observaciones de la llamada.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Nombres</label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Apellidos</label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">DNI</label>
              <input
                type="text"
                maxLength={8}
                disabled={!isSuperAdmin}
                value={formData.dni}
                onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono disabled:opacity-60 disabled:cursor-not-allowed"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Celular</label>
              <input
                type="tel"
                maxLength={9}
                disabled={!isSuperAdmin}
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono disabled:opacity-60 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Modalidad</label>
              <select
                disabled={!isSuperAdmin}
                value={formData.modalidad}
                onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-60"
              >
                <option value="Semipresencial">Semipresencial</option>
                <option value="100% Virtual">100% Virtual</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Estado Admisión</label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold"
              >
                <option value="Nuevo">Nuevo</option>
                <option value="En Seguimiento">En Seguimiento</option>
                <option value="Contactado">Contactado</option>
                <option value="Matriculado">Matriculado</option>
                <option value="No Interesado">No Interesado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Programa</label>
            <input
              type="text"
              disabled={!isSuperAdmin}
              value={formData.carrera_interes}
              onChange={(e) => setFormData({ ...formData, carrera_interes: e.target.value })}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Notas u Observaciones de Admisión
            </label>
            <textarea
              rows={3}
              value={formData.notas}
              onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
              placeholder="Ej. Interesado en horario de sábados. Se acordó llamarle mañana a las 4pm para coordinar matrícula..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
