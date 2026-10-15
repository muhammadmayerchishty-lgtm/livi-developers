import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import { PageLoader } from './components/PageLoader';
import { Header } from './components/Header';
import { ScrollToTop } from './components/ScrollToTop';
import { DarkFooter } from './components/DarkFooter';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AiPropertyAssistant } from './components/AiPropertyAssistant';
import { SavedDrawer } from './components/SavedDrawer';
import { SavedPropertiesProvider } from './context/SavedPropertiesContext';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';

// Pages
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function AnimatedRoutes({
  onOpenConsultationModal,
}: {
  onOpenConsultationModal: (subject?: string) => void;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route
            path="/"
            element={<HomePage onOpenConsultationModal={onOpenConsultationModal} />}
          />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:slug" element={<PropertyDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Catch-all 404 */}
          <Route path="*" element={<PropertiesPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationSubject, setConsultationSubject] = useState('VIP Consultation');

  const handleOpenConsultationModal = (subject = 'Private Villa Consultation') => {
    setConsultationSubject(subject);
    setIsConsultationModalOpen(true);
  };

  return (
    <SavedPropertiesProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0E1214] text-[#F2EFE9] selection:bg-[#C9A66B] selection:text-[#0E1214] flex flex-col justify-between">
          {/* Scroll To Top on route change */}
          <ScrollToTop />

          {/* Page Load Reveal Animation */}
          <PageLoader />

          {/* Sticky Header with Navigation & Saved Drawer Trigger */}
          <Header onOpenContactModal={() => handleOpenConsultationModal('VIP Concierge Request')} />

          {/* Main Routed Page Views with AnimatePresence transitions */}
          <main className="flex-1">
            <AnimatedRoutes onOpenConsultationModal={handleOpenConsultationModal} />
          </main>

          {/* Dark Footer */}
          <DarkFooter onOpenConsultation={() => handleOpenConsultationModal('VIP Private Briefing')} />

          {/* Persistent Floating WhatsApp Concierge */}
          <FloatingWhatsApp />

          {/* AI Property Assistant Floating Widget (Demo assistant) */}
          <AiPropertyAssistant />

          {/* Saved Residences Slide-Out Drawer */}
          <SavedDrawer />

          {/* Global Schedule Visit / Consultation Dialog */}
          <ScheduleVisitModal
            isOpen={isConsultationModalOpen}
            onClose={() => setIsConsultationModalOpen(false)}
            propertyTitle={consultationSubject}
          />
        </div>
      </BrowserRouter>
    </SavedPropertiesProvider>
  );
}
