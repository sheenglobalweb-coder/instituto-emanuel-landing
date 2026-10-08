import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

const USERS_STORAGE_KEY = 'emanuel_auth_users_v1';
const CURRENT_USER_KEY = 'emanuel_current_user_v1';

// Default system accounts as specified in the administrative requirements
const INITIAL_USERS = [
  {
    id: 'u-1',
    username: 'admin',
    email: 'admin@emanuel.edu.pe',
    nombre_completo: 'Dirección General Emanuel',
    role: 'super_admin', // Super Admin
    password: 'admin2026',
    estado: 'Activo'
  },
  {
    id: 'u-2',
    username: 'secretaria',
    email: 'secretaria@emanuel.edu.pe',
    nombre_completo: 'Secretaría de Admisión Emanuel',
    role: 'admin_basico', // Admin Básico
    password: 'secretaria2026',
    estado: 'Activo'
  }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
        return INITIAL_USERS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_USERS;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  // Check Supabase session on mount
  useEffect(() => {
    async function initSupabaseSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && !currentUser) {
          let role = 'admin_basico';
          let nombreCompleto = session.user.email?.split('@')[0] || 'Administrador';
          
          try {
            const { data: adminData } = await supabase
              .from('admin_users')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (adminData && adminData.role) {
              role = adminData.role;
              nombreCompleto = adminData.nombre_completo || adminData.username || nombreCompleto;
            } else if (session.user.email?.toLowerCase().includes('admin')) {
              role = 'super_admin';
            }
          } catch {}

          setCurrentUser({
            id: session.user.id,
            email: session.user.email,
            nombre_completo: nombreCompleto,
            role: role
          });
        }
      } catch (err) {
        console.warn('Error reading Supabase session:', err);
      }
    }

    initSupabaseSession();

    // Listen to Supabase auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = (identifier, password) => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    const matched = users.find(
      u => (u.username?.toLowerCase() === cleanId || u.email?.toLowerCase() === cleanId) && u.password === cleanPass
    );

    if (matched) {
      if (matched.estado === 'Inactivo') {
        return {
          success: false,
          error: 'Acceso revocado. Esta cuenta se encuentra inactiva. Contacte a la Dirección General.'
        };
      }
      const { password, ...safeUser } = matched;
      setCurrentUser(safeUser);
      return { success: true, user: safeUser };
    }

    return {
      success: false,
      error: 'Usuario o contraseña incorrectos. Verifique sus credenciales institucionales.'
    };
  };

  const setSessionUser = (userObj) => {
    setCurrentUser(userObj);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    setCurrentUser(null);
  };

  const addUser = (newUser) => {
    const userItem = {
      id: 'u-' + Date.now(),
      estado: 'Activo',
      ...newUser
    };
    const updated = [...users, userItem];
    setUsers(updated);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, user: userItem };
  };

  const revokeUser = (id) => {
    const updated = users.map(u => {
      if (u.id === id) {
        const nextState = u.estado === 'Activo' ? 'Inactivo' : 'Activo';
        return { ...u, estado: nextState };
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  };

  const deleteUser = (id) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  };

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isAdminBasico = currentUser?.role === 'admin_basico';
  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isAuthenticated,
        isSuperAdmin,
        isAdminBasico,
        login,
        logout,
        setSessionUser,
        addUser,
        revokeUser,
        deleteUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
