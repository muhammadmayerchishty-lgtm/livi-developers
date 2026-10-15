import React from 'react';
import { Hero } from '../components/Hero';
import { ScrollWalkthrough } from '../components/ScrollWalkthrough';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { HousePlanSection } from '../components/HousePlanSection';
import { VillaViewer3D } from '../components/VillaViewer3D';
import { ServicesSection } from '../components/ServicesSection';
import { About } from '../components/About';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Gallery } from '../components/Gallery';
import { Contact } from '../components/Contact';
import { useSEO } from '../hooks/useSEO';

interface HomePageProps {
  onOpenConsultationModal: (subject?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultationModal }) => {
  useSEO({
    title: 'A New Standard of Modern Living — Lahore',
    description: 'Luxury 3D animated real estate showcase for LIVI DEVELOPERS featuring premium villas, houses, penthouses, and plots in Lahore, Pakistan.',
  });

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. 3D Hero Layer & Search Bar */}
      <Hero
        onExploreClick={() => handleScrollTo('featured-properties')}
        onTalkToAgentClick={() => onOpenConsultationModal('Direct Agent Consultation')}
      />

      {/* 2. Pinned GSAP Scroll Walkthrough */}
      <ScrollWalkthrough />

      {/* 3. Featured Properties Carousel */}
      <div id="featured-properties">
        <FeaturedProperties
          onScheduleViewing={(propertyTitle) =>
            onOpenConsultationModal(`Private Viewing: ${propertyTitle}`)
          }
        />
      </div>

      {/* 4. House Plan Schematics & Blueprint */}
      <HousePlanSection />

      {/* 5. 3D Virtual Villa Interactive Spatial Walkthrough */}
      <VillaViewer3D />

      {/* 6. Integrated Services Cards */}
      <ServicesSection
        onInquireService={(serviceTitle) =>
          onOpenConsultationModal(`Service Inquiry: ${serviceTitle}`)
        }
      />

      {/* 7. About LIVI Ethos & Pillars */}
      <About />

      {/* 8. Why Choose Us */}
      <WhyChooseUs />

      {/* 9. Architectural Photography Gallery */}
      <Gallery />

      {/* 10. Contact Briefing Form */}
      <Contact initialSubject="General Private Consultation" />
    </>
  );
};
