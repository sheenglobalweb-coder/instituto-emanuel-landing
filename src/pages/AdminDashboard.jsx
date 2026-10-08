import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import {
  fetchAllLeads,
  updateLead,
  deleteLead,
  exportLeadsToCSV,
  generateWhatsAppContactLink
} from '../lib/leadsService';
import AdminUsersModal from '../components/admin/AdminUsersModal';
import {
  Search,
  Calendar,
  Plus,
  Download,
  Trash2,
  Phone,
  MessageCircle,
  MoreHorizontal,
  Copy,
  Check,
  LogOut,
  ArrowUpDown,
  X,
  AlertCircle,
  Building2,
  Laptop,
  Clock,
  Edit2,
  CheckCircle2,
  Folder,
  RefreshCw,
  Loader2,
  Users
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    currentUser,
    isSuperAdmin,
    isAdminBasico,
    users,
    addUser,
    revokeUser,
    setSessionUser,
    logout
  } = useAuth();
  const { navigate } = useRouter();

  // Authentication State
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Users Management Modal State
  const [showUsersModal, setShowUsersModal] = useState(false);

  // Data & Realtime State
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('hace un momento');

  // Tab State
  const [activeTab, setActiveTab] = useState('todos'); // 'todos' | 'nuevos' | 'seguimiento' | 'matriculados'

  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('30days'); // '30days' | 'today' | 'month' | 'all'

  // Sorting State
  const [sortField, setSortField] = useState('fecha');
  const [sortDirection, setSortDirection] = useState('desc');

  // Selection State
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Modals & Popovers
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [actionMenuLeadId, setActionMenuLeadId] = useState(null);
  const [copiedDni, setCopiedDni] = useState(null);

  // New lead form state
  const [createForm, setCreateForm] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    celular: '',
    modalidad: 'Semipresencial',
    carrera_interes: 'Prótesis Dental (Carrera Técnica 3 años)',
    utm_source: 'manual_admin',
    utm_campaign: 'gestion_interna',
    notas: ''
  });
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [createError, setCreateError] = useState('');

  // 1. Proteger ruta con supabase.auth.getSession()
  useEffect(() => {
    let isMounted = true;

    async function verifySession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session && !currentUser) {
          navigate('/admin/login');
          return;
        }

        if (session?.user && (!currentUser || !currentUser.email)) {
          let role = 'admin_basico';
          let nombreCompleto = session.user.email?.split('@')[0] || 'Administrador';

          try {
            const { data: adminUser } = await supabase
              .from('admin_users')
              .select('*')
              .or(`id.eq.${session.user.id},username.eq.${nombreCompleto}`)
              .maybeSingle();

            if (adminUser?.role) {
              role = adminUser.role;
              nombreCompleto = adminUser.nombre_completo || adminUser.username || nombreCompleto;
            } else if (session.user.email?.toLowerCase().includes('admin')) {
              role = 'super_admin';
            }
          } catch (e) {
            if (session.user.email?.toLowerCase().includes('admin')) {
              role = 'super_admin';
            }
          }

          if (isMounted && setSessionUser) {
            setSessionUser({
              id: session.user.id,
              email: session.user.email,
              nombre_completo: nombreCompleto,
              role: role
            });
          }
        }
      } catch (err) {
        if (!currentUser) {
          navigate('/admin/login');
          return;
        }
      } finally {
        if (isMounted) setCheckingAuth(false);
      }
    }

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  // 2. Cargar prospectos iniciales
  const loadLeadsData = async () => {
    setLoading(true);
    try {
      const res = await fetchAllLeads();
      setLeads(res.leads);
      setLastUpdated('hace un momento');
    } catch (err) {
      console.error('Error cargando prospectos:', err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Suscripción en Tiempo Real con Supabase Realtime
  useEffect(() => {
    loadLeadsData();

    const channel = supabase
      .channel('leads-realtime-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          setLastUpdated('hace un momento');
          if (payload.eventType === 'INSERT') {
            setLeads((prev) => {
              const exists = prev.some(
                (l) => l.id === payload.new.id || (l.dni && l.dni === payload.new.dni)
              );
              if (exists) {
                return prev.map((l) =>
                  l.id === payload.new.id || l.dni === payload.new.dni ? payload.new : l
                );
              }
              return [payload.new, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            setLeads((prev) =>
              prev.map((l) => (l.id === payload.new.id ? { ...l, ...payload.new } : l))
            );
          } else if (payload.eventType === 'DELETE') {
            setLeads((prev) => prev.filter((l) => l.id !== payload.old.id));
            setSelectedIds((prev) => {
              const next = new Set(prev);
              next.delete(payload.old.id);
              return next;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Timer para actualizar texto relativo de tiempo
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated('hace un momento');
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Cerrar menú de 3 puntos al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => setActionMenuLeadId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // 4. Conteo de prospectos para las pestañas
  const counts = useMemo(() => {
    let nuevos = 0;
    let seguimiento = 0;
    let matriculados = 0;

    leads.forEach((l) => {
      const s = (l.estado || '').toLowerCase();
      if (s === 'nuevo') nuevos++;
      else if (s === 'contactado' || s === 'interesado' || s === 'en seguimiento') seguimiento++;
      else if (s === 'matriculado') matriculados++;
    });

    return {
      todos: leads.length,
      nuevos,
      seguimiento,
      matriculados
    };
  }, [leads]);

  // 5. Filtrado por Pestaña, Búsqueda y Fecha
  const filteredLeads = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return leads.filter((lead) => {
      const state = (lead.estado || '').toLowerCase();

      // Pestaña
      if (activeTab === 'nuevos' && state !== 'nuevo') return false;
      if (activeTab === 'seguimiento' && !['contactado', 'interesado', 'en seguimiento'].includes(state)) return false;
      if (activeTab === 'matriculados' && state !== 'matriculado') return false;

      // Filtro de Fecha
      const leadDate = new Date(lead.created_at);
      if (dateFilter === 'today') {
        if ((lead.created_at || '').slice(0, 10) !== todayStr) return false;
      } else if (dateFilter === '30days') {
        if (leadDate < thirtyDaysAgo) return false;
      } else if (dateFilter === 'month') {
        if (leadDate.getMonth() !== currentMonth || leadDate.getFullYear() !== currentYear) return false;
      }

      // Búsqueda textual
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const full = `${lead.nombres} ${lead.apellidos} ${lead.dni} ${lead.celular} ${lead.utm_source || ''} ${lead.utm_campaign || ''} ${lead.carrera_interes || ''}`.toLowerCase();
        if (!full.includes(query)) return false;
      }

      return true;
    });
  }, [leads, activeTab, dateFilter, searchTerm]);

  // 6. Ordenamiento de Columnas
  const sortedLeads = useMemo(() => {
    const list = [...filteredLeads];
    list.sort((a, b) => {
      let valA, valB;

      switch (sortField) {
        case 'postulante':
          valA = `${a.nombres} ${a.apellidos}`.toLowerCase();
          valB = `${b.nombres} ${b.apellidos}`.toLowerCase();
          break;
        case 'estado':
          valA = (a.estado || '').toLowerCase();
          valB = (b.estado || '').toLowerCase();
          break;
        case 'origen':
          valA = `${a.utm_source || ''} ${a.utm_campaign || ''}`.toLowerCase();
          valB = `${b.utm_source || ''} ${b.utm_campaign || ''}`.toLowerCase();
          break;
        case 'fecha':
        default:
          valA = new Date(a.created_at || 0).getTime();
          valB = new Date(b.created_at || 0).getTime();
          break;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [filteredLeads, sortField, sortDirection]);

  // Manejo de orden
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 7. Toggle Interruptor ON/OFF (Act. - Atendido)
  const handleToggleAtendido = async (lead) => {
    const currentStatus = (lead.estado || '').toLowerCase();
    const isAtendido = currentStatus !== 'nuevo';
    const nextStatus = isAtendido ? 'nuevo' : 'contactado';

    // Optimista
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, estado: nextStatus } : l))
    );

    try {
      await supabase.from('leads').update({ estado: nextStatus }).eq('id', lead.id);
    } catch (e) {
      console.warn('Nota Supabase update:', e);
    }
    await updateLead(lead.id, { estado: nextStatus });
  };

  // 8. Cambio rápido de Estado
  const handleUpdateStatus = async (id, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, estado: newStatus } : l))
    );

    try {
      await supabase.from('leads').update({ estado: newStatus }).eq('id', id);
    } catch (e) {
      console.warn('Nota Supabase update:', e);
    }
    await updateLead(id, { estado: newStatus });
  };

  // 9. Manejo de Selección de Filas
  const handleToggleSelectAll = () => {
    if (selectedIds.size === sortedLeads.length && sortedLeads.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedLeads.map((l) => l.id)));
    }
  };

  const handleToggleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // 10. Descartar / Eliminar Seleccionados (Super Admin)
  const handleDeleteSelected = async () => {
    if (!isSuperAdmin) {
      alert('Solo los usuarios con rol Super Admin pueden descartar prospectos.');
      return;
    }

    if (selectedIds.size === 0) return;

    const confirmMsg = `¿Deseas descartar/eliminar permanentemente los ${selectedIds.size} prospectos seleccionados?`;
    if (!window.confirm(confirmMsg)) return;

    const idsToDelete = Array.from(selectedIds);
    setLeads((prev) => prev.filter((l) => !selectedIds.has(l.id)));
    setSelectedIds(new Set());

    for (const id of idsToDelete) {
      try {
        await supabase.from('leads').delete().eq('id', id);
      } catch (e) {}
      await deleteLead(id);
    }
  };

  // 11. Eliminar individual (Super Admin)
  const handleDeleteSingle = async (id) => {
    if (!isSuperAdmin) {
      alert('Acción restringida a Super Admin.');
      return;
    }
    if (!window.confirm('¿Eliminar este prospecto permanentemente?')) return;

    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

    try {
      await supabase.from('leads').delete().eq('id', id);
    } catch (e) {}
    await deleteLead(id);
  };

  // 12. Exportar CSV
  const handleExportCSV = () => {
    const listToExport = selectedIds.size > 0
      ? leads.filter((l) => selectedIds.has(l.id))
      : sortedLeads;
    exportLeadsToCSV(listToExport, 'postulantes_instituto_emanuel');
  };

  // 13. Copiar DNI
  const handleCopyDni = (dni, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(dni);
    setCopiedDni(dni);
    setTimeout(() => setCopiedDni(null), 2000);
  };

  // 14. Crear Lead Manual
  const handleCreateLead = async (e) => {
    e.preventDefault();
    setCreateError('');

    if (!createForm.nombres.trim() || !createForm.apellidos.trim()) {
      setCreateError('Por favor ingresa nombres y apellidos completos.');
      return;
    }
    if (!/^\d{8}$/.test(createForm.dni.trim())) {
      setCreateError('El DNI debe tener 8 dígitos numéricos.');
      return;
    }
    if (!/^9\d{8}$/.test(createForm.celular.trim())) {
      setCreateError('El celular debe tener 9 dígitos y comenzar con 9.');
      return;
    }

    setCreateSubmitting(true);

    try {
      const newLeadPayload = {
        nombres: createForm.nombres.trim(),
        apellidos: createForm.apellidos.trim(),
        dni: createForm.dni.trim(),
        celular: createForm.celular.trim(),
        modalidad: createForm.modalidad,
        carrera_interes: createForm.carrera_interes,
        utm_source: createForm.utm_source,
        utm_campaign: createForm.utm_campaign,
        estado: 'nuevo',
        notas: createForm.notas || 'Ingreso manual por mesa de admisión'
      };

      // Inserción en Supabase
      try {
        const { data, error } = await supabase
          .from('leads')
          .insert([newLeadPayload])
          .select();
        if (data && data.length > 0) {
          newLeadPayload.id = data[0].id;
        }
      } catch (sbErr) {
        console.warn('Nota Supabase manual insert:', sbErr);
      }

      // Registro local y actualización de estado
      newLeadPayload.id = newLeadPayload.id || `lead-${Date.now()}`;
      newLeadPayload.created_at = new Date().toISOString();
      setLeads((prev) => [newLeadPayload, ...prev]);

      setShowCreateModal(false);
      setCreateForm({
        nombres: '',
        apellidos: '',
        dni: '',
        celular: '',
        modalidad: 'Semipresencial',
        carrera_interes: 'Prótesis Dental (Carrera Técnica 3 años)',
        utm_source: 'manual_admin',
        utm_campaign: 'gestion_interna',
        notas: ''
      });
    } catch (err) {
      setCreateError('Ocurrió un error al guardar el prospecto.');
    } finally {
      setCreateSubmitting(false);
    }
  };

  // Badge de Estado estilo Punto
  const renderStatusBadge = (lead) => {
    const s = (lead.estado || '').toLowerCase();
    let dotColor = 'bg-blue-600';
    let textColor = 'text-blue-700';
    let bgColor = 'bg-blue-50 border-blue-200';
    let label = 'Nuevo';

    if (s === 'contactado') {
      dotColor = 'bg-amber-500';
      textColor = 'text-amber-800';
      bgColor = 'bg-amber-50 border-amber-200';
      label = 'Contactado';
    } else if (s === 'interesado' || s === 'en seguimiento') {
      dotColor = 'bg-purple-600';
      textColor = 'text-purple-800';
      bgColor = 'bg-purple-50 border-purple-200';
      label = 'En seguimiento';
    } else if (s === 'matriculado') {
      dotColor = 'bg-emerald-600';
      textColor = 'text-emerald-800 font-bold';
      bgColor = 'bg-emerald-50 border-emerald-300';
      label = 'Matriculado';
    } else if (s === 'descartado' || s === 'no interesado') {
      dotColor = 'bg-slate-400';
      textColor = 'text-slate-600';
      bgColor = 'bg-slate-100 border-slate-200';
      label = 'Descartado';
    }

    return (
      <div className="relative inline-block">
        <select
          value={s}
          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
          className={`appearance-none pl-5 pr-5 py-0.5 rounded-full text-[11px] font-semibold border cursor-pointer focus:outline-none transition-colors ${bgColor} ${textColor}`}
        >
          <option value="nuevo">● Nuevo</option>
          <option value="contactado">● Contactado</option>
          <option value="interesado">● En seguimiento</option>
          <option value="matriculado">● Matriculado</option>
          <option value="descartado">● Descartado</option>
        </select>
        <span
          className={`absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none ${dotColor}`}
        />
      </div>
    );
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center text-slate-600">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Verificando permisos institucionales...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* 1. BARRA DE NAVEGACIÓN Y PESTAÑAS SUPERIORES */}
      <header className="bg-slate-100/80 backdrop-blur border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        
        {/* Fila Superior: Marca e Info de Sesión */}
        <div className="max-w-[1750px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo_3d.png"
              alt="Instituto Emanuel"
              className="h-8 w-auto object-contain cursor-pointer"
              onClick={() => navigate('/')}
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-sm font-bold text-[#0f1c3f] tracking-wide">
                  INSTITUTO EMANUEL
                </span>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-1.5 py-0.2 rounded uppercase">
                  Panel de Admisión
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Panel de Prospectos • Código Modular N° 1739887
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Indicador en tiempo real */}
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Última actualización: {lastUpdated}</span>
            </div>

            {/* Control de Visibilidad: Si es Super Admin, botón 👥 Gestionar Accesos */}
            {isSuperAdmin && (
              <button
                type="button"
                onClick={() => setShowUsersModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-md border border-slate-300 transition-all shadow-2xs text-xs active:scale-[0.98]"
              >
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>👥 Gestionar Accesos</span>
              </button>
            )}

            {/* Perfil */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="text-right leading-tight hidden sm:block">
                <span className="font-semibold text-slate-800 text-xs block">
                  {currentUser?.nombre_completo || currentUser?.email || 'Administrador'}
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${isSuperAdmin ? 'text-amber-600' : 'text-blue-600'}`}>
                  {isSuperAdmin ? '★ Super Admin' : 'Admin Básico'}
                </span>
              </div>

              {/* Botón Cerrar Sesión */}
              <button
                onClick={logout}
                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md border border-slate-200 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Fila de Pestañas Estilo Píldora/Carpeta */}
        <div className="max-w-[1750px] mx-auto px-4 sm:px-6 pt-1 flex items-center gap-1 overflow-x-auto text-xs">
          
          {/* Pestaña: Todos */}
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-3.5 py-2 font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'todos'
                ? 'border-blue-600 text-blue-700 bg-white rounded-t-md shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-md'
            }`}
          >
            <Folder className="w-3.5 h-3.5 text-slate-500" />
            <span>Todos los prospectos</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'todos' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {counts.todos}
            </span>
          </button>

          {/* Pestaña: Nuevos */}
          <button
            onClick={() => setActiveTab('nuevos')}
            className={`px-3.5 py-2 font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'nuevos'
                ? 'border-blue-600 text-blue-700 bg-white rounded-t-md shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-md'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Nuevos</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'nuevos' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {counts.nuevos}
            </span>
          </button>

          {/* Pestaña: En seguimiento */}
          <button
            onClick={() => setActiveTab('seguimiento')}
            className={`px-3.5 py-2 font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'seguimiento'
                ? 'border-amber-500 text-amber-800 bg-white rounded-t-md shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-md'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>En seguimiento</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'seguimiento' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {counts.seguimiento}
            </span>
          </button>

          {/* Pestaña: Matriculados */}
          <button
            onClick={() => setActiveTab('matriculados')}
            className={`px-3.5 py-2 font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'matriculados'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-md shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-t-md'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Matriculados</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === 'matriculados' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {counts.matriculados}
            </span>
          </button>

        </div>
      </header>

      {/* 2. ÁREA PRINCIPAL DATA GRID */}
      <main className="max-w-[1750px] w-full mx-auto px-4 sm:px-6 py-4 flex-1 flex flex-col">
        
        {/* Contenedor estilo Hoja de Cálculo */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs flex-1 flex flex-col overflow-hidden">
          
          {/* BARRA DE BÚSQUEDA Y FILTROS DE FECHA */}
          <div className="p-3 bg-white border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Input de Búsqueda Horizontal */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, DNI, celular o campaña..."
                className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-500 rounded-md pl-9 pr-8 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-2xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Selector de Fecha Flotante a la Derecha */}
            <div className="flex items-center gap-2">
              <div className="relative inline-flex items-center">
                <Calendar className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-8 pr-7 py-1.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-700 cursor-pointer focus:outline-none focus:border-blue-500 transition-colors shadow-2xs"
                >
                  <option value="30days">Últimos 30 días</option>
                  <option value="today">Hoy</option>
                  <option value="month">Este mes</option>
                  <option value="all">Histórico completo</option>
                </select>
              </div>

              <button
                onClick={loadLeadsData}
                className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                title="Actualizar tabla"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* BARRA DE ACCIONES RÁPIDAS (TOOLBAR) */}
          <div className="px-3 py-2 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            
            {/* Botones a la Izquierda */}
            <div className="flex items-center gap-2">
              {/* Botón Primario: + Crear Lead */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md text-xs transition-all shadow-2xs active:scale-[0.98]"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Crear Lead</span>
              </button>

              {/* Botón Secundario: Exportar CSV (Oculto para admin_basico) */}
              {!isAdminBasico && (
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-medium rounded-md border border-slate-300 transition-colors shadow-2xs"
                  title="Descargar datos en formato CSV"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Exportar CSV</span>
                </button>
              )}

              {/* Botón Secundario: Descartar seleccionados (Visible y activo únicamente para super_admin) */}
              {isSuperAdmin && (
                <button
                  onClick={handleDeleteSelected}
                  disabled={selectedIds.size === 0}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors shadow-2xs ${
                    selectedIds.size > 0
                      ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-300 cursor-pointer'
                      : 'bg-white text-slate-300 border-slate-200 cursor-not-allowed opacity-60'
                  }`}
                  title="Descartar prospectos seleccionados"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>
                    Descartar seleccionados {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}
                  </span>
                </button>
              )}
            </div>

            {/* Contador de Selección / Estado a la Derecha */}
            <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2">
              {selectedIds.size > 0 && (
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-semibold">
                  {selectedIds.size} de {sortedLeads.length} seleccionados
                </span>
              )}
              <span>Mostrando {sortedLeads.length} filas</span>
            </div>
          </div>

          {/* TABLA DE DATOS COMPACTA (DATA GRID) */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              
              {/* Encabezados compactos con texto en gris oscuro */}
              <thead className="text-[11px] font-semibold uppercase text-slate-600 bg-slate-50 border-y border-slate-200 sticky top-0 z-10 select-none">
                <tr>
                  {/* [ ] Checkbox Global */}
                  <th className="py-2.5 px-3 w-8 text-center border-r border-slate-200/60">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === sortedLeads.length && sortedLeads.length > 0}
                      onChange={handleToggleSelectAll}
                      className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                    />
                  </th>

                  {/* Act. (Toggle Switch) */}
                  <th className="py-2.5 px-3 w-14 text-center border-r border-slate-200/60 font-semibold" title="Atendido / Activo en gestión">
                    Act.
                  </th>

                  {/* Postulante ↑↓ */}
                  <th
                    onClick={() => handleSort('postulante')}
                    className="py-2.5 px-3 cursor-pointer hover:bg-slate-100/70 border-r border-slate-200/60 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Postulante</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>

                  {/* Estado / Entrega ↑↓ */}
                  <th
                    onClick={() => handleSort('estado')}
                    className="py-2.5 px-3 cursor-pointer hover:bg-slate-100/70 border-r border-slate-200/60 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Estado / Entrega</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>

                  {/* Contacto Directo */}
                  <th className="py-2.5 px-3 border-r border-slate-200/60">
                    Contacto Directo
                  </th>

                  {/* Programa / Modalidad */}
                  <th className="py-2.5 px-3 border-r border-slate-200/60">
                    Programa / Modalidad
                  </th>

                  {/* Campaña / Origen ↑↓ */}
                  <th
                    onClick={() => handleSort('origen')}
                    className="py-2.5 px-3 cursor-pointer hover:bg-slate-100/70 border-r border-slate-200/60 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Campaña / Origen</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>

                  {/* Fecha / Registro ↑↓ */}
                  <th
                    onClick={() => handleSort('fecha')}
                    className="py-2.5 px-3 cursor-pointer hover:bg-slate-100/70 border-r border-slate-200/60 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span>Fecha / Registro</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>

                  {/* Acciones */}
                  <th className="py-2.5 px-3 text-center w-12">
                    Acc.
                  </th>
                </tr>
              </thead>

              {/* Cuerpo de la Tabla */}
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {sortedLeads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle className="w-7 h-7 text-slate-300" />
                        <span className="font-semibold text-slate-600">No se encontraron prospectos</span>
                        <p className="text-[11px] text-slate-400 max-w-sm">
                          Prueba cambiando el término de búsqueda o seleccionando otro rango de fechas.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedLeads.map((lead) => {
                    const isSelected = selectedIds.has(lead.id);
                    const isAtendido = (lead.estado || '').toLowerCase() !== 'nuevo';
                    const isPrb = `${lead.nombres} ${lead.apellidos} ${lead.carrera_interes || ''}`.includes('_prb');
                    const cleanName = `${lead.nombres} ${lead.apellidos}`.replace(/_prb/g, '');
                    const waLink = generateWhatsAppContactLink(lead);
                    const isSemi = (lead.modalidad || '').toLowerCase().includes('semi');

                    // Fecha legible: DD/MM/AAAA HH:mm
                    const d = new Date(lead.created_at);
                    const formattedDate = !isNaN(d)
                      ? `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
                      : 'N/A';

                    return (
                      <tr
                        key={lead.id}
                        className={`transition-colors text-xs border-b border-slate-100 ${
                          isSelected ? 'bg-blue-50/50' : 'hover:bg-slate-50/80'
                        }`}
                      >
                        {/* Checkbox por fila */}
                        <td className="py-2.5 px-3 text-center border-r border-slate-100">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleToggleSelectRow(lead.id, e)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                          />
                        </td>

                        {/* Act. Toggle Switch Estilo Interruptor */}
                        <td className="py-2.5 px-3 text-center border-r border-slate-100">
                          <button
                            type="button"
                            onClick={() => handleToggleAtendido(lead)}
                            className={`w-7 h-4 flex items-center rounded-full p-0.5 transition-colors focus:outline-none mx-auto ${
                              isAtendido ? 'bg-emerald-600' : 'bg-slate-300'
                            }`}
                            title={isAtendido ? 'Atendido (ON) - clic para marcar como Nuevo' : 'Sin Atender (OFF) - clic para marcar como Contactado'}
                          >
                            <span
                              className={`bg-white w-3 h-3 rounded-full shadow-xs transform transition-transform ${
                                isAtendido ? 'translate-x-3' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </td>

                        {/* Postulante (Nombre, DNI y Etiqueta _prb) */}
                        <td className="py-2.5 px-3 border-r border-slate-100">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-slate-900 leading-snug">
                              {cleanName}
                            </span>
                            {isPrb && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-100 text-amber-800 border border-amber-300 uppercase">
                                _prb
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono mt-0.5">
                            <span>DNI: {lead.dni}</span>
                            <button
                              onClick={(e) => handleCopyDni(lead.dni, e)}
                              className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
                              title="Copiar DNI"
                            >
                              {copiedDni === lead.dni ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          {lead.notas && (
                            <div className="text-[10px] text-slate-400 italic line-clamp-1 mt-0.5">
                              {lead.notas}
                            </div>
                          )}
                        </td>

                        {/* Estado / Entrega (Badge estilo Punto) */}
                        <td className="py-2.5 px-3 border-r border-slate-100">
                          {renderStatusBadge(lead)}
                        </td>

                        {/* Contacto Directo (Llamada + WhatsApp 1 clic) */}
                        <td className="py-2.5 px-3 border-r border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-slate-700 text-xs font-medium">
                              +51 {lead.celular}
                            </span>
                            
                            {/* WhatsApp 1 Clic */}
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[10px] transition-colors shadow-2xs"
                              title="Abrir chat de WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3 fill-white" />
                              <span>WA</span>
                            </a>

                            {/* Llamada Directa */}
                            <a
                              href={`tel:+51${lead.celular}`}
                              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                              title={`Llamar a +51 ${lead.celular}`}
                            >
                              <Phone className="w-3 h-3" />
                            </a>
                          </div>
                        </td>

                        {/* Programa / Modalidad */}
                        <td className="py-2.5 px-3 border-r border-slate-100 max-w-[210px]">
                          <div className="font-medium text-slate-900 truncate" title={lead.carrera_interes}>
                            {(lead.carrera_interes || 'Prótesis Dental').replace(/_prb/g, '')}
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.2 rounded mt-0.5 border ${
                              isSemi
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            {isSemi ? <Building2 className="w-2.5 h-2.5" /> : <Laptop className="w-2.5 h-2.5" />}
                            <span>{lead.modalidad || 'Semipresencial'}</span>
                          </span>
                        </td>

                        {/* Campaña / Origen */}
                        <td className="py-2.5 px-3 border-r border-slate-100">
                          <span className="font-semibold text-slate-700 capitalize text-[11px] block">
                            {lead.utm_source || 'directo'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono block truncate max-w-[130px]" title={lead.utm_campaign}>
                            {lead.utm_campaign || 'organico'}
                          </span>
                        </td>

                        {/* Fecha / Registro (DD/MM/AAAA HH:mm) */}
                        <td className="py-2.5 px-3 border-r border-slate-100 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                          {formattedDate}
                        </td>

                        {/* Acciones */}
                        <td className="py-2.5 px-3 text-center relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionMenuLeadId(actionMenuLeadId === lead.id ? null : lead.id);
                            }}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            title="Opciones"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {/* Menú Flotante de Acciones */}
                          {actionMenuLeadId === lead.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-3 top-8 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-30 py-1 text-left text-xs divide-y divide-slate-100"
                            >
                              <button
                                onClick={() => {
                                  setActionMenuLeadId(null);
                                  setEditingLead(lead);
                                }}
                                className="w-full px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                                <span>Editar / Notas</span>
                              </button>

                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setActionMenuLeadId(null)}
                                className="w-full px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-emerald-700"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Abrir WhatsApp</span>
                              </a>

                              {isSuperAdmin && (
                                <button
                                  onClick={() => {
                                    setActionMenuLeadId(null);
                                    handleDeleteSingle(lead.id);
                                  }}
                                  className="w-full px-3 py-1.5 hover:bg-red-50 flex items-center gap-2 text-red-600"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Eliminar Lead</span>
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PIE DE TABLA: RESUMEN FIJO */}
          <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
            <div className="font-medium">
              Resultados: <strong className="text-slate-900">{sortedLeads.length}</strong> prospectos encontrados
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
              <span>● {counts.nuevos} Nuevos</span>
              <span>● {counts.seguimiento} En Seguimiento</span>
              <span>● {counts.matriculados} Matriculados</span>
              <span className="hidden md:inline">| Total Base: {leads.length}</span>
            </div>
          </div>

        </div>

      </main>

      {/* MODAL: CREAR LEAD MANUAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  +
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Crear Nuevo Lead</h3>
                  <p className="text-[11px] text-slate-500">Ingreso manual de postulante para seguimiento de admisión</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {createError && (
              <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{createError}</span>
              </div>
            )}

            <form onSubmit={handleCreateLead} className="space-y-3.5 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nombres *</label>
                  <input
                    type="text"
                    required
                    value={createForm.nombres}
                    onChange={(e) => setCreateForm({ ...createForm, nombres: e.target.value })}
                    placeholder="Ej. Carlos"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Apellidos *</label>
                  <input
                    type="text"
                    required
                    value={createForm.apellidos}
                    onChange={(e) => setCreateForm({ ...createForm, apellidos: e.target.value })}
                    placeholder="Ej. Mendoza"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">DNI (8 dígitos) *</label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={createForm.dni}
                    onChange={(e) => setCreateForm({ ...createForm, dni: e.target.value.replace(/\D/g, '') })}
                    placeholder="74829103"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-800 font-mono focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Celular (9 dígitos) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={9}
                    value={createForm.celular}
                    onChange={(e) => setCreateForm({ ...createForm, celular: e.target.value.replace(/\D/g, '') })}
                    placeholder="978456123"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-800 font-mono focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Modalidad</label>
                  <select
                    value={createForm.modalidad}
                    onChange={(e) => setCreateForm({ ...createForm, modalidad: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Semipresencial">Semipresencial (Chiclayo)</option>
                    <option value="100% Virtual">100% Virtual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Campaña / Origen</label>
                  <input
                    type="text"
                    value={createForm.utm_source}
                    onChange={(e) => setCreateForm({ ...createForm, utm_source: e.target.value })}
                    placeholder="manual_admin"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Programa Académico</label>
                <select
                  value={createForm.carrera_interes}
                  onChange={(e) => setCreateForm({ ...createForm, carrera_interes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-600"
                >
                  <option value="Prótesis Dental (Carrera Técnica 3 años)">Prótesis Dental (Carrera Técnica 3 años)</option>
                  <option value="Auxiliar en Prótesis Dental">Auxiliar en Prótesis Dental</option>
                  <option value="Especialización en Zirconio Dental">Especialización en Zirconio Dental</option>
                  <option value="Farmacología Dental">Farmacología Dental</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notas / Observaciones</label>
                <textarea
                  rows={2}
                  value={createForm.notas}
                  onChange={(e) => setCreateForm({ ...createForm, notas: e.target.value })}
                  placeholder="Detalles de la consulta o procedencia..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium rounded-md text-xs transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={createSubmitting}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md text-xs transition-colors shadow-2xs flex items-center gap-1.5 disabled:opacity-70"
                >
                  {createSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <span>Guardar Prospecto</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR LEAD O AGREGAR NOTAS */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Editar Prospecto #{editingLead.id.toString().slice(-6)}
              </h3>
              <button
                onClick={() => setEditingLead(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLeads((prev) =>
                  prev.map((l) => (l.id === editingLead.id ? { ...l, ...editingLead } : l))
                );
                try {
                  await supabase.from('leads').update(editingLead).eq('id', editingLead.id);
                } catch (err) {}
                await updateLead(editingLead.id, editingLead);
                setEditingLead(null);
              }}
              className="space-y-3.5 mt-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nombres</label>
                  <input
                    type="text"
                    value={editingLead.nombres}
                    onChange={(e) => setEditingLead({ ...editingLead, nombres: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Apellidos</label>
                  <input
                    type="text"
                    value={editingLead.apellidos}
                    onChange={(e) => setEditingLead({ ...editingLead, apellidos: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">DNI</label>
                  <input
                    type="text"
                    value={editingLead.dni}
                    onChange={(e) => setEditingLead({ ...editingLead, dni: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Celular</label>
                  <input
                    type="text"
                    value={editingLead.celular}
                    onChange={(e) => setEditingLead({ ...editingLead, celular: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Observaciones / Notas</label>
                <textarea
                  rows={3}
                  value={editingLead.notas || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, notas: e.target.value })}
                  placeholder="Añadir notas de la llamada..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-100 rounded-md font-medium text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-2xs"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GESTIÓN DE ADMINISTRADORES (EXCLUSIVO SUPER ADMIN) */}
      {isSuperAdmin && (
        <AdminUsersModal
          isOpen={showUsersModal}
          onClose={() => setShowUsersModal(false)}
          users={users}
          onAddUser={addUser}
          onRevokeUser={revokeUser}
          currentUserId={currentUser?.id}
        />
      )}

    </div>
  );
}
