import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
  X,
  UserPlus,
  Shield,
  ShieldAlert,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Mail,
  User,
  Power
} from 'lucide-react';

export default function AdminUsersModal({
  isOpen,
  onClose,
  users,
  onAddUser,
  onRevokeUser,
  currentUserId
}) {
  const [form, setForm] = useState({
    nombre_completo: '',
    email: '',
    password: '',
    role: 'admin_basico'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [supabaseUsers, setSupabaseUsers] = useState([]);

  // Cargar usuarios desde la tabla admin_users de Supabase
  useEffect(() => {
    if (!isOpen) return;

    async function loadAdminUsers() {
      try {
        const { data, error: sbError } = await supabase
          .from('admin_users')
          .select('*');

        if (!sbError && data) {
          setSupabaseUsers(data);
        }
      } catch (err) {
        console.warn('Error cargando admin_users desde Supabase:', err);
      }
    }

    loadAdminUsers();
  }, [isOpen]);

  // Combinar usuarios locales y de Supabase
  const combinedUsers = React.useMemo(() => {
    const map = new Map();
    // 1. Agregar usuarios locales
    users.forEach((u) => {
      const key = (u.email || u.username || u.id).toLowerCase();
      map.set(key, { ...u });
    });
    // 2. Mezclar con los de Supabase
    supabaseUsers.forEach((su) => {
      const key = (su.email || su.username || su.id).toLowerCase();
      const existing = map.get(key) || {};
      map.set(key, {
        ...existing,
        id: su.id || existing.id,
        nombre_completo: su.nombre_completo || existing.nombre_completo || 'Usuario Supabase',
        email: su.email || existing.email,
        role: su.role || existing.role || 'admin_basico',
        estado: su.estado || existing.estado || 'Activo'
      });
    });
    return Array.from(map.values());
  }, [users, supabaseUsers]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!form.nombre_completo.trim()) {
      setError('Ingresa el nombre completo del administrador.');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setError('Ingresa un correo electrónico institucional válido.');
      return;
    }
    if (!form.password.trim() || form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Verificar si ya existe
    const exists = combinedUsers.some(
      (u) => (u.email || '').toLowerCase() === form.email.trim().toLowerCase()
    );
    if (exists) {
      setError('Ya existe un usuario registrado con este correo electrónico.');
      return;
    }

    setSubmitting(true);

    try {
      const newUserPayload = {
        nombre_completo: form.nombre_completo.trim(),
        email: form.email.trim().toLowerCase(),
        username: form.email.trim().split('@')[0].toLowerCase(),
        password: form.password.trim(),
        role: form.role,
        estado: 'Activo'
      };

      // 1. Registrar en la tabla admin_users de Supabase
      try {
        const { error: insertError } = await supabase
          .from('admin_users')
          .insert([
            {
              nombre_completo: newUserPayload.nombre_completo,
              email: newUserPayload.email,
              username: newUserPayload.username,
              role: newUserPayload.role,
              estado: 'Activo'
            }
          ]);
        if (insertError) {
          console.warn('Nota de inserción en admin_users:', insertError.message);
        }
      } catch (sbErr) {
        console.warn('Nota conexión Supabase:', sbErr);
      }

      // 2. Intentar crear usuario en Supabase Auth
      try {
        await supabase.auth.signUp({
          email: newUserPayload.email,
          password: newUserPayload.password
        });
      } catch (authErr) {
        console.warn('Nota Supabase Auth signUp:', authErr);
      }

      // 3. Registrar en AuthContext para disponibilidad inmediata
      onAddUser(newUserPayload);

      setSuccessMsg(`Usuario ${newUserPayload.nombre_completo} registrado exitosamente.`);
      setForm({
        nombre_completo: '',
        email: '',
        password: '',
        role: 'admin_basico'
      });
    } catch (err) {
      console.error('Error registrando usuario:', err);
      setError('Ocurrió un error al procesar el registro.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRevokeToggle = async (user) => {
    if (user.id === currentUserId) {
      alert('No puedes revocar el acceso de tu propia cuenta activa.');
      return;
    }

    const nextState = user.estado === 'Activo' ? 'Inactivo' : 'Activo';
    const actionText = nextState === 'Inactivo' ? 'revocar el acceso de' : 'reactivar el acceso a';

    if (!window.confirm(`¿Estás seguro de que deseas ${actionText} ${user.nombre_completo || user.email}?`)) {
      return;
    }

    // Actualizar en Supabase si es posible
    try {
      await supabase
        .from('admin_users')
        .update({ estado: nextState })
        .eq('email', user.email);
    } catch (sbErr) {}

    // Actualizar localmente
    onRevokeUser(user.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-800">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Gestión de Administradores y Accesos
              </h3>
              <p className="text-xs text-slate-500">
                Control de roles y credenciales para el panel de admisión (Exclusivo Super Admin)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Two Sections */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Mensajes de Estado */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SECCIÓN 1: FORMULARIO DE REGISTRO */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
              <UserPlus className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                Registrar Nuevo Administrador
              </h4>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Nombre Completo */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      required
                      value={form.nombre_completo}
                      onChange={(e) => setForm({ ...form, nombre_completo: e.target.value })}
                      placeholder="Ej. Mg. Carlos Salazar"
                      className="w-full bg-white border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Correo Electrónico */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="usuario@emanuel.edu.pe"
                      className="w-full bg-white border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="password"
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full bg-white border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Selector de Rol */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Rol en el Sistema *
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-800 cursor-pointer focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="admin_basico">Admin Básico (Secretaría / Gestión de Leads)</option>
                    <option value="super_admin">Super Admin (Acceso Total y Eliminación)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md shadow-2xs transition-colors active:scale-[0.98] disabled:opacity-75"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Guardando en Supabase...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Guardar Usuario</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* SECCIÓN 2: TABLA DE ADMINISTRADORES EXISTENTES */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Administradores del Sistema ({combinedUsers.length})</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">
                Sincronizado con tabla admin_users
              </span>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Nombre</th>
                    <th className="py-2.5 px-3">Correo</th>
                    <th className="py-2.5 px-3">Rol</th>
                    <th className="py-2.5 px-3">Estado</th>
                    <th className="py-2.5 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {combinedUsers.map((u) => {
                    const isSelf = u.id === currentUserId;
                    const isSuper = u.role === 'super_admin';
                    const isActive = u.estado !== 'Inactivo';

                    return (
                      <tr key={u.id || u.email} className="hover:bg-slate-50/70 transition-colors">
                        {/* Nombre */}
                        <td className="py-2.5 px-3 font-semibold text-slate-900">
                          {u.nombre_completo || u.username}
                          {isSelf && (
                            <span className="ml-1.5 text-[9px] font-bold text-blue-600 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                              TÚ
                            </span>
                          )}
                        </td>

                        {/* Correo */}
                        <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                          {u.email || `${u.username}@emanuel.edu.pe`}
                        </td>

                        {/* Rol (Badge azul para Super Admin, badge gris para Básico) */}
                        <td className="py-2.5 px-3">
                          {isSuper ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                              <Shield className="w-3 h-3 text-blue-600" />
                              <span>Super Admin</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              <span>Admin Básico</span>
                            </span>
                          )}
                        </td>

                        {/* Estado (Activo / Inactivo) */}
                        <td className="py-2.5 px-3">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Activo</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              <span>Inactivo</span>
                            </span>
                          )}
                        </td>

                        {/* Acción para Revocar Acceso */}
                        <td className="py-2.5 px-3 text-right">
                          <button
                            type="button"
                            disabled={isSelf}
                            onClick={() => handleRevokeToggle(u)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors border shadow-2xs ${
                              isSelf
                                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                                : isActive
                                ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                            }`}
                            title={isSelf ? 'No puedes revocar tu propio acceso' : ''}
                          >
                            <Power className="w-3 h-3" />
                            <span>{isActive ? 'Revocar Acceso' : 'Reactivar'}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            Los usuarios creados pueden ingresar directamente en <span className="font-mono">/admin/login</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-md transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
