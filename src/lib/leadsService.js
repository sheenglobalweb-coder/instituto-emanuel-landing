import { supabase } from './supabase';
import { getUtmParameters } from '../utils/utm';
import * as XLSX from 'xlsx';

const STORAGE_KEY = 'emanuel_leads_v1';
const WHATSAPP_INSTITUTIONAL = '51974123456'; // Default institutional WhatsApp

// Sample realistic leads for initial demo/testing in Chiclayo & Lambayeque
const INITIAL_DEMO_LEADS = [
  {
    id: 'demo-1',
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 min ago
    nombres: 'Carlos Andrés',
    apellidos: 'Mendoza Silva',
    dni: '74829103',
    celular: '978456123',
    modalidad: 'Semipresencial',
    carrera_interes: 'Prótesis Dental (3 Años)',
    utm_source: 'facebook',
    utm_campaign: 'admision_2026_chiclayo',
    estado: 'Nuevo',
    notas: 'Interesado en turno fines de semana para prácticas en taller Chiclayo.'
  },
  {
    id: 'demo-2',
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    nombres: 'Lucía Fernanda',
    apellidos: 'Gómez Farroñay',
    dni: '76192840',
    celular: '965123987',
    modalidad: '100% Virtual',
    carrera_interes: 'Prótesis Dental (3 Años)',
    utm_source: 'tiktok',
    utm_campaign: 'campana_jovenes_norte',
    estado: 'En Seguimiento',
    notas: 'Trabaja como asistente dental en Ferreñafe. Desea titulación oficial.'
  },
  {
    id: 'demo-3',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    nombres: 'Brayan Alexis',
    apellidos: 'Chávez Quiroz',
    dni: '73928174',
    celular: '984567231',
    modalidad: 'Semipresencial',
    carrera_interes: 'Especialización en Zirconio Dental y Cad/Cam',
    utm_source: 'instagram',
    utm_campaign: 'cursos_especializacion_2026',
    estado: 'Contactado',
    notas: 'Llamado por secretaría. Consultó por facilidades de pago en cuotas.'
  },
  {
    id: 'demo-4',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    nombres: 'Valeria Nicole',
    apellidos: 'Torres Villegas',
    dni: '75819203',
    celular: '991234876',
    modalidad: 'Semipresencial',
    carrera_interes: 'Prótesis Dental (3 Años)',
    utm_source: 'google',
    utm_campaign: 'busqueda_institutos_chiclayo',
    estado: 'Matriculado',
    notas: 'Matrícula confirmada con beneficio de inscripción temprana. Ciclo I 2026.'
  },
  {
    id: 'demo-5',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    nombres: 'Jorge Luis',
    apellidos: 'Santisteban Huamán',
    dni: '71092834',
    celular: '952341789',
    modalidad: '100% Virtual',
    carrera_interes: 'Auxiliar de Clínica y Laboratorio Protésico',
    utm_source: 'facebook',
    utm_campaign: 'admision_2026_chiclayo',
    estado: 'Contactado',
    notas: 'Envió WhatsApp solicitando temario en PDF de las certificaciones modulares.'
  }
];

// Helper to get local leads
export function getLocalLeads() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
      return INITIAL_DEMO_LEADS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading local leads:', e);
    return INITIAL_DEMO_LEADS;
  }
}

// Helper to save local leads
export function saveLocalLeads(leads) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error('Error saving local leads:', e);
  }
}

// Extract UTM parameters from current URL
export function getURLUtmParams() {
  if (typeof window === 'undefined') return {};
  const utm = getUtmParameters();
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: utm.utm_source,
    utm_medium: params.get('utm_medium') || 'web',
    utm_campaign: utm.utm_campaign || 'organico_instituto_emanuel',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || ''
  };
}

// Save a new lead from landing page
export async function registerLead(leadData) {
  const utms = getURLUtmParams();
  
  const newLead = {
    id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    created_at: new Date().toISOString(),
    nombres: leadData.nombres.trim(),
    apellidos: leadData.apellidos.trim(),
    dni: leadData.dni.trim(),
    celular: leadData.celular.trim(),
    modalidad: leadData.modalidad || 'Semipresencial',
    carrera_interes: leadData.carrera_interes || 'Prótesis Dental (3 Años)',
    utm_source: leadData.utm_source || utms.utm_source,
    utm_campaign: leadData.utm_campaign || utms.utm_campaign,
    estado: 'Nuevo',
    notas: leadData.notas || 'Postulante registrado vía Landing Page'
  };

  // 1. Always save in localStorage first for 100% guarantee & instant reactivity
  const localLeads = getLocalLeads();
  // Check for duplicate by DNI within same day
  const existingIndex = localLeads.findIndex(l => l.dni === newLead.dni);
  if (existingIndex !== -1) {
    // Update existing lead instead of crashing
    localLeads[existingIndex] = {
      ...localLeads[existingIndex],
      ...newLead,
      id: localLeads[existingIndex].id,
      notas: `Reinscrito el ${new Date().toLocaleDateString('es-PE')}. ` + (localLeads[existingIndex].notas || '')
    };
  } else {
    localLeads.unshift(newLead);
  }
  saveLocalLeads(localLeads);

  // 2. Attempt to save to Supabase
  let supabaseSuccess = false;
  let supabaseError = null;

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          nombres: newLead.nombres,
          apellidos: newLead.apellidos,
          dni: newLead.dni,
          celular: newLead.celular,
          modalidad: newLead.modalidad,
          carrera_interes: newLead.carrera_interes,
          utm_source: newLead.utm_source,
          utm_campaign: newLead.utm_campaign,
          estado: newLead.estado
        }
      ])
      .select();

    if (error) {
      console.warn('Supabase insert notice (RLS or connection):', error.message);
      supabaseError = error.message;
    } else {
      supabaseSuccess = true;
      if (data && data.length > 0) {
        newLead.id = data[0].id || newLead.id;
      }
    }
  } catch (err) {
    console.warn('Supabase offline or network error, cached locally:', err);
    supabaseError = err.message;
  }

  return {
    success: true,
    lead: newLead,
    supabaseSuccess,
    supabaseError
  };
}

// Fetch all leads for admin panel
export async function fetchAllLeads() {
  const local = getLocalLeads();

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      // Merge supabase leads with local leads without duplicates
      const mergedMap = new Map();
      
      // Add local first
      local.forEach(item => mergedMap.set(item.dni || item.id, item));
      
      // Override/merge with Supabase
      data.forEach(item => {
        const key = item.dni || item.id;
        const existing = mergedMap.get(key) || {};
        mergedMap.set(key, { ...existing, ...item });
      });

      const combined = Array.from(mergedMap.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      saveLocalLeads(combined);
      return { leads: combined, source: 'supabase_and_local', isOnline: true };
    }
  } catch (err) {
    console.warn('Error fetching from Supabase, using local:', err);
  }

  return { leads: local, source: 'local', isOnline: false };
}

// Update lead status or data
export async function updateLead(id, updates) {
  const local = getLocalLeads();
  const index = local.findIndex(l => l.id === id);
  if (index !== -1) {
    local[index] = { ...local[index], ...updates, updated_at: new Date().toISOString() };
    saveLocalLeads(local);
  }

  try {
    await supabase.from('leads').update(updates).eq('id', id);
  } catch (e) {
    console.warn('Supabase update skipped:', e);
  }

  return local;
}

// Delete lead
export async function deleteLead(id) {
  const local = getLocalLeads().filter(l => l.id !== id);
  saveLocalLeads(local);

  try {
    await supabase.from('leads').delete().eq('id', id);
  } catch (e) {
    console.warn('Supabase delete skipped:', e);
  }

  return local;
}

// Generate direct 1-click WhatsApp URL for candidate contact
export function generateWhatsAppContactLink(lead) {
  const cleanPhone = (lead.celular || '').replace(/\D/g, '');
  const phone = cleanPhone.startsWith('51') ? cleanPhone : `51${cleanPhone}`;
  
  const message = `¡Hola ${lead.nombres}! Te saluda el equipo de Admisión del *Instituto Superior Emanuel de Chiclayo*. 🎓\n\n` +
    `Recibimos tu solicitud de información para la carrera técnica de *${lead.carrera_interes || 'Prótesis Dental'}* ` +
    `en modalidad *${lead.modalidad || 'Semipresencial'}*.\n\n` +
    `¿Tienes disponibilidad para coordinar una llamada o compartirte la Malla Curricular y la promoción de matrícula 2026?`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Generate institutional WhatsApp link for student inquiry
export function generateStudentInquiryLink(programa = 'Prótesis Dental (3 Años)', modalidad = 'Semipresencial') {
  const message = `¡Hola Instituto Emanuel de Chiclayo! Deseo información sobre la carrera de *${programa}* ` +
    `en modalidad *${modalidad}*, costos de matrícula 2026 y facilidades de pago.`;
  return `https://wa.me/${WHATSAPP_INSTITUTIONAL}?text=${encodeURIComponent(message)}`;
}

// Export to Microsoft Excel (.xlsx) using SheetJS
export function exportLeadsToExcel(leads, filename = 'postulantes_instituto_emanuel') {
  const rows = leads.map((l, index) => ({
    '#': index + 1,
    'Fecha de Registro': new Date(l.created_at).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }),
    'Nombres': l.nombres,
    'Apellidos': l.apellidos,
    'DNI': l.dni,
    'Celular': l.celular,
    'Modalidad': l.modalidad,
    'Programa / Especialidad': l.carrera_interes,
    'Estado Admisión': l.estado,
    'Fuente Publicitaria': l.utm_source || 'Directo',
    'Campaña': l.utm_campaign || 'N/A',
    'Observaciones / Notas': l.notas || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  
  // Set nice column widths
  worksheet['!cols'] = [
    { wch: 4 },  // #
    { wch: 18 }, // Fecha
    { wch: 18 }, // Nombres
    { wch: 20 }, // Apellidos
    { wch: 11 }, // DNI
    { wch: 12 }, // Celular
    { wch: 16 }, // Modalidad
    { wch: 32 }, // Programa
    { wch: 15 }, // Estado
    { wch: 16 }, // Fuente
    { wch: 24 }, // Campaña
    { wch: 40 }  // Notas
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Prospectos Emanuel');
  
  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `${filename}_${today}.xlsx`);
}

// Export to CSV with UTF-8 BOM
export function exportLeadsToCSV(leads, filename = 'postulantes_instituto_emanuel') {
  const headers = ['#', 'Fecha', 'Nombres', 'Apellidos', 'DNI', 'Celular', 'Modalidad', 'Programa', 'Estado', 'Fuente', 'Campana', 'Notas'];
  
  const escapeCsv = (val) => {
    const s = String(val ?? '').replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = leads.map((l, index) => [
    index + 1,
    new Date(l.created_at).toLocaleString('es-PE'),
    l.nombres,
    l.apellidos,
    l.dni,
    l.celular,
    l.modalidad,
    l.carrera_interes,
    l.estado,
    l.utm_source || 'directo',
    l.utm_campaign || '',
    l.notas || ''
  ].map(escapeCsv).join(','));

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
