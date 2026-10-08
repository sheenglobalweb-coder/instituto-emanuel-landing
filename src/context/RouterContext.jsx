import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext();

export function RouterProvider({ children }) {
  const getInitialPath = () => {
    if (typeof window === 'undefined') return '/';
    // If using hash routing or clean path
    const hash = window.location.hash.replace('#', '').replace(/\/+$/, '');
    if (hash === '/admin/login') return '/admin/login';
    if (hash === '/admin') return '/admin';
    if (hash === '/gracias') return '/gracias';

    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    if (path === '/admin/login') return '/admin/login';
    if (path === '/admin') return '/admin';
    if (path === '/gracias') return '/gracias';
    return '/';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path) => {
    try {
      window.history.pushState({}, '', path);
    } catch {
      window.location.hash = '#' + path;
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
