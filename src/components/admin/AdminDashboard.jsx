import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from './AdminNavbar';
import AdminKpiCards from './AdminKpiCards';
import AdminFilters from './AdminFilters';
import AdminLeadsTable from './AdminLeadsTable';
import AdminEditModal from './AdminEditModal';
import AdminSqlHelperModal from './AdminSqlHelperModal';
import {
  fetchAllLeads,
  updateLead,
  deleteLead,
  exportLeadsToExcel,
  exportLeadsToCSV
} from '../../lib/leadsService';

export default function AdminDashboard() {
  const { isSuperAdmin } = useAuth();
  
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [modalidadFilter, setModalidadFilter] = useState('all');
  const [carreraFilter, setCarreraFilter] = useState('all');
  const [estadoFilter, setEstadoFilter] = useState('all');

  // Modals State
  const [editingLead, setEditingLead] = useState(null);
  const [showSqlModal, setShowSqlModal] = useState(false);

  // Load leads
  const loadLeadsData = async () => {
    setLoading(true);
    try {
      const res = await fetchAllLeads();
      setLeads(res.leads);
      setIsOnline(res.isOnline);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeadsData();
  }, []);

  // Filter computation
  const filteredLeads = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return leads.filter((lead) => {
      // 1. Text search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const full = `${lead.nombres} ${lead.apellidos} ${lead.dni} ${lead.celular}`.toLowerCase();
        if (!full.includes(query)) return false;
      }

      // 2. Date filter
      if (dateFilter !== 'all') {
        const leadDate = new Date(lead.created_at);
        if (dateFilter === 'today') {
          if ((lead.created_at || '').slice(0, 10) !== todayStr) return false;
        } else if (dateFilter === 'week') {
          if (leadDate < oneWeekAgo) return false;
        } else if (dateFilter === 'month') {
          if (leadDate < oneMonthAgo) return false;
        }
      }

      // 3. Modalidad filter
      if (modalidadFilter !== 'all') {
        if (!lead.modalidad?.toLowerCase().includes(modalidadFilter.toLowerCase())) {
          return false;
        }
      }

      // 4. Carrera filter
      if (carreraFilter !== 'all') {
        if (!lead.carrera_interes?.toLowerCase().includes(carreraFilter.toLowerCase())) {
          return false;
        }
      }

      // 5. Estado filter
      if (estadoFilter !== 'all') {
        if (lead.estado !== estadoFilter) return false;
      }

      return true;
    });
  }, [leads, searchTerm, dateFilter, modalidadFilter, carreraFilter, estadoFilter]);

  // Status quick update
  const handleUpdateStatus = async (id, newStatus) => {
    const updated = await updateLead(id, { estado: newStatus });
    setLeads(updated);
  };

  // Full edit save
  const handleSaveEdit = async (id, updates) => {
    const updated = await updateLead(id, updates);
    setLeads(updated);
  };

  // Delete lead (Super Admin)
  const handleDeleteLead = async (id) => {
    const updated = await deleteLead(id);
    setLeads(updated);
  };

  // Exports
  const handleExportExcel = () => {
    exportLeadsToExcel(filteredLeads, 'postulantes_instituto_emanuel');
  };

  const handleExportCSV = () => {
    exportLeadsToCSV(filteredLeads, 'postulantes_instituto_emanuel');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setDateFilter('all');
    setModalidadFilter('all');
    setCarreraFilter('all');
    setEstadoFilter('all');
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 pb-16">
      {/* Top Navbar */}
      <AdminNavbar
        onOpenSqlModal={() => setShowSqlModal(true)}
        isOnline={isOnline}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Summary Cards */}
        <AdminKpiCards leads={leads} />

        {/* Filter Controls & Search */}
        <AdminFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          modalidadFilter={modalidadFilter}
          setModalidadFilter={setModalidadFilter}
          carreraFilter={carreraFilter}
          setCarreraFilter={setCarreraFilter}
          estadoFilter={estadoFilter}
          setEstadoFilter={setEstadoFilter}
          onResetFilters={handleResetFilters}
          onExportExcel={handleExportExcel}
          onExportCSV={handleExportCSV}
          onRefresh={loadLeadsData}
          totalFiltered={filteredLeads.length}
          totalAll={leads.length}
        />

        {/* Main Leads Table */}
        <AdminLeadsTable
          leads={filteredLeads}
          onUpdateStatus={handleUpdateStatus}
          onEditLead={(lead) => setEditingLead(lead)}
          onDeleteLead={handleDeleteLead}
        />
      </main>

      {/* Edit Modal */}
      {editingLead && (
        <AdminEditModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Supabase SQL Helper Modal */}
      {showSqlModal && (
        <AdminSqlHelperModal
          onClose={() => setShowSqlModal(false)}
        />
      )}
    </div>
  );
}
