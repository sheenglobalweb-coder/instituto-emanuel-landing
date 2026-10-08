import React, { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import CoursesGrid from '../components/landing/CoursesGrid';
import CurriculumSection from '../components/landing/CurriculumSection';
import CommunityProof from '../components/landing/CommunityProof';
import Footer from '../components/landing/Footer';
import WhatsAppFloat from '../components/landing/WhatsAppFloat';
import ThankYouModal from '../components/landing/ThankYouModal';

export default function LandingPage() {
  const [registeredLead, setRegisteredLead] = useState(null);

  const handleLeadSuccess = (lead) => {
    setRegisteredLead(lead);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 overflow-x-hidden overflow-y-auto">
      {/* 1. Navbar (h-14 lg:h-16 / 4rem) */}
      <Navbar />

      {/* 2. HeroSection (100% viewport en PC: lg:h-[calc(100vh-4rem)]) */}
      <HeroSection onLeadSuccess={handleLeadSuccess} />

      {/* 3. Catálogo de Especialidades y Formación Continua */}
      <CoursesGrid />

      {/* 4. Malla Curricular Oficial MINEDU (6 Ciclos, 100% libre) */}
      <CurriculumSection />

      {/* 5. Respaldo Institucional y Actividades Comunitarias */}
      <CommunityProof />

      {/* 6. Footer Oficial Institucional */}
      <Footer />

      {/* Botón flotante WhatsApp */}
      <WhatsAppFloat />

      {/* Modal post-registro */}
      {registeredLead && (
        <ThankYouModal
          lead={registeredLead}
          onClose={() => setRegisteredLead(null)}
        />
      )}
    </div>
  );
}
