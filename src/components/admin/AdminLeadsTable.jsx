import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { generateWhatsAppContactLink } from '../../lib/leadsService';
import {
  MessageCircle,
  Phone,
  Edit2,
  Trash2,
  Copy,
  Check,
  Building2,
  Laptop,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function AdminLeadsTable({
  leads,
  onUpdateStatus,
  onEditLead,
  onDeleteLead
}) {
  const { isSuperAdmin } = useAuth();
  const [copiedDni, setCopiedDni] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleCopyDni = (dni) => {
    navigator.clipboard.writeText(dni);
    setCopiedDni(dni);
    setTimeout(() => setCopiedDni(null), 2000);
  };

  const getStatusBadge = (estado) => {
    const s = (estado || '').toLowerCase();
    switch (s) {
      case 'nuevo':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'contactado':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'interesado':
      case 'en seguimiento':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'matriculado':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold';
      case 'descartado':
      case 'no interesado':
        return 'bg-slate-700/40 text-slate-400 border-slate-600/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  if (leads.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
        <div className="p-3 bg-slate-800 w-fit rounded-full mx-auto text-slate-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h4 className="text-base font-bold text-white">No se encontraron prospectos</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          No hay registros que coincidan con los filtros seleccionados o el término de búsqueda actual.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          {/* Table Header */}
          <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Postulante</th>
              <th className="py-3.5 px-4 font-semibold">DNI</th>
              <th className="py-3.5 px-4 font-semibold">Contacto Rápido (1 Clic)</th>
              <th className="py-3.5 px-4 font-semibold">Programa y Modalidad</th>
              <th className="py-3.5 px-4 font-semibold">Estado Admisión</th>
              <th className="py-3.5 px-4 font-semibold">Origen / UTM</th>
              <th className="py-3.5 px-4 font-semibold text-right">Acciones</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-800/70 text-slate-200">
            {leads.map((lead) => {
              const waLink = generateWhatsAppContactLink(lead);
              const isSemi = (lead.modalidad || '').includes('Semi');

              return (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Postulante */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white text-sm">
                      {lead.nombres} {lead.apellidos}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{new Date(lead.created_at).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </div>
                    {lead.notas && (
                      <div className="text-[10px] text-amber-300/80 italic mt-1 line-clamp-1 max-w-[200px]">
                        📝 {lead.notas}
                      </div>
                    )}
                  </td>

                  {/* DNI */}
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <span>{lead.dni}</span>
                      <button
                        onClick={() => handleCopyDni(lead.dni)}
                        className="text-slate-500 hover:text-amber-400 p-1 rounded transition-colors"
                        title="Copiar DNI"
                      >
                        {copiedDni === lead.dni ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Contacto & WhatsApp 1 Clic */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      {/* WhatsApp 1-Click Button */}
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95"
                        title="Abrir chat de WhatsApp con plantilla personalizada"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp</span>
                      </a>

                      {/* Phone Call */}
                      <a
                        href={`tel:+51${lead.celular}`}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                        title={`Llamar al +51 ${lead.celular}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400 mt-1 block">
                      +51 {lead.celular}
                    </span>
                  </td>

                  {/* Programa y Modalidad */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-white block max-w-[220px]">
                      {lead.carrera_interes}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full border ${
                      isSemi
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                        : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                    }`}>
                      {isSemi ? <Building2 className="w-3 h-3" /> : <Laptop className="w-3 h-3" />}
                      <span>{lead.modalidad}</span>
                    </span>
                  </td>

                  {/* Estado Dropdown */}
                  <td className="py-3.5 px-4">
                    <select
                      value={(lead.estado || 'nuevo').toLowerCase()}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                      className={`text-[11px] font-semibold rounded-xl px-2.5 py-1 border focus:outline-none cursor-pointer ${getStatusBadge(
                        lead.estado
                      )}`}
                    >
                      <option value="nuevo" className="bg-slate-900 text-blue-300">Nuevo</option>
                      <option value="contactado" className="bg-slate-900 text-purple-300">Contactado</option>
                      <option value="interesado" className="bg-slate-900 text-amber-300">Interesado / En Seguimiento</option>
                      <option value="matriculado" className="bg-slate-900 text-emerald-300">★ Matriculado</option>
                      <option value="descartado" className="bg-slate-900 text-slate-400">Descartado</option>
                    </select>
                  </td>

                  {/* UTM Source */}
                  <td className="py-3.5 px-4 text-slate-400">
                    <span className="capitalize font-medium text-slate-300 block">
                      {lead.utm_source || 'Directo'}
                    </span>
                    {lead.utm_campaign && (
                      <span className="text-[10px] text-slate-500 font-mono block line-clamp-1">
                        {lead.utm_campaign}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Edit Button (Available to all for notes, or full edit for Super Admin) */}
                      <button
                        onClick={() => onEditLead(lead)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                        title={isSuperAdmin ? 'Editar datos o notas' : 'Ver y agregar notas'}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button (Restricted to Super Admin) */}
                      {isSuperAdmin && (
                        <>
                          {deleteConfirmId === lead.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  onDeleteLead(lead.id);
                                  setDeleteConfirmId(null);
                                }}
                                className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(lead.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                              title="Eliminar registro"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
