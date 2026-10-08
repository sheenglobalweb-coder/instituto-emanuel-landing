import React from 'react';
import { useRouter } from './context/RouterContext';
import LandingPage from './pages/LandingPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const { currentPath } = useRouter();

  if (currentPath === '/admin/login') {
    return <AdminLogin />;
  }

  if (currentPath === '/admin') {
    return <AdminDashboard />;
  }

  if (currentPath === '/gracias') {
    return <ThankYouPage />;
  }

  return <LandingPage />;
}
