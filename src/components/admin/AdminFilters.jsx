import React from 'react';
import { Search, Filter, Calendar, FileSpreadsheet, Download, RefreshCw, X } from 'lucide-react';

export default function AdminFilters({
  searchTerm,
  setSearchTerm,
  dateFilter,
  setDateFilter,
  modalidadFilter,
  setModalidadFilter,
  carreraFilter,
  setCarreraFilter,
  estadoFilter,
  setEstadoFilter,
  onResetFilters,
  onExportExcel,
  onExportCSV,
  onRefresh,
  totalFiltered,
  totalAll
}) {
  const hasActiveFilters = searchTerm || dateFilter !== 'all' || modalidadFilter !== 'all' || carreraFilter !== 'all' || estadoFilter !== 'all';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-md space-y-4">
      
      {/* Search and Top Export Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Live Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por Nombres, DNI o Celular..."
            className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Buttons: Refresh, Excel, CSV */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shrink-0"
            title="Actualizar datos"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={onExportExcel}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold border border-emerald-600 transition-all shadow-sm shrink-0"
            title="Descargar lista filtrada en Microsoft Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar Excel ({totalFiltered})</span>
          </button>

          <button
            onClick={onExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors shrink-0"
            title="Exportar a formato CSV"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Selectors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        
        {/* Temporal Range */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Periodo / Fecha
          </label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">Todo el histórico</option>
            <option value="today">Hoy (Llamadas del día)</option>
            <option value="week">Esta semana (Últimos 7 días)</option>
            <option value="month">Este mes</option>
          </select>
        </div>

        {/* Modalidad */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Modalidad de Estudio
          </label>
          <select
            value={modalidadFilter}
            onChange={(e) => setModalidadFilter(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">Todas las modalidades</option>
            <option value="Semipresencial">Semipresencial (Chiclayo)</option>
            <option value="Virtual">100% Virtual</option>
          </select>
        </div>

        {/* Carrera / Programa */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Programa Académico
          </label>
          <select
            value={carreraFilter}
            onChange={(e) => setCarreraFilter(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">Todos los programas</option>
            <option value="Prótesis Dental">Prótesis Dental (3 Años)</option>
            <option value="Zirconio">Zirconio y CAD/CAM</option>
            <option value="Auxiliar">Auxiliar de Laboratorio</option>
            <option value="Farmacología">Farmacología Odontológica</option>
            <option value="Gestión">Gestión y Finanzas</option>
          </select>
        </div>

        {/* Estado del Lead */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
            Estado de Admisión
          </label>
          <select
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">Todos los estados</option>
            <option value="nuevo">Nuevo</option>
            <option value="contactado">Contactado</option>
            <option value="interesado">Interesado / En Seguimiento</option>
            <option value="matriculado">Matriculado</option>
            <option value="descartado">Descartado</option>
          </select>
        </div>

      </div>

      {/* Active Filter Counter & Reset */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
          <span className="text-amber-400 font-medium">
            Mostrando {totalFiltered} de {totalAll} prospectos registrados
          </span>
          <button
            onClick={onResetFilters}
            className="text-slate-400 hover:text-white underline text-[11px]"
          >
            Limpiar todos los filtros
          </button>
        </div>
      )}

    </div>
  );
}
