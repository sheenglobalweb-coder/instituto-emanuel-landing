import React, { useState } from 'react';
import TopBanner from './TopBanner';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ModalitiesSection from './ModalitiesSection';
import CareerDentalSection from './CareerDentalSection';
import ModularCertificationsSection from './ModularCertificationsSection';
import CoursesCatalogSection from './CoursesCatalogSection';
import LaborFieldSection from './LaborFieldSection';
import SocialProofGallerySection from './SocialProofGallerySection';
import PaymentPlansSection from './PaymentPlansSection';
import FAQSection from './FAQSection';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import ThankYouModal from './ThankYouModal';

export default function LandingPage() {
  const [registeredLead, setRegisteredLead] = useState(null);

  const handleLeadSuccess = (lead) => {
    setRegisteredLead(lead);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Urgency Banner */}
      <TopBanner />

      {/* 2. Top Navigation */}
      <Navbar />

      {/* 3. Hero Section with Mobile-First Floating Lead Form */}
      <HeroSection onLeadSuccess={handleLeadSuccess} />

      {/* 4. Switch of Modalities (Semipresencial vs Virtual) */}
      <ModalitiesSection />

      {/* 5. Career Detail & Interactive Curriculum (Malla Curricular) */}
      <CareerDentalSection />

      {/* 6. Modular Certifications & Early ROI */}
      <ModularCertificationsSection />

      {/* 7. Catalog of Courses & Continuous Education */}
      <CoursesCatalogSection />

      {/* 8. Career Field & Market Employability */}
      <LaborFieldSection />

      {/* 9. Practical Workshops, Social Proof & Testimonials */}
      <SocialProofGallerySection />

      {/* 10. Payment Plans & Financial Ease */}
      <PaymentPlansSection />

      {/* 11. FAQ Accordion */}
      <FAQSection />

      {/* Institutional Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Post-Registration Thank You Modal */}
      {registeredLead && (
        <ThankYouModal
          lead={registeredLead}
          onClose={() => setRegisteredLead(null)}
        />
      )}
    </div>
  );
}
