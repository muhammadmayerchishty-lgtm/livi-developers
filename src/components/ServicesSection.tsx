import React from 'react';
import { motion } from 'framer-motion';
import { SafeImage } from './SafeImage';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SERVICE_IMAGES } from '../data/images';

interface ServicesSectionProps {
  onInquireService?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onInquireService }) => {
  const services = [
    {
      number: '01',
      title: 'Property Showcase',
      kicker: 'Curated Architectural Representation',
      description:
        'Cinematic 3D visualizations, aerial drone photogrammetry, and private physical salon tours presenting Lahore’s most coveted residential properties to high-net-worth investors.',
      image: SERVICE_IMAGES.propertyShowcase,
      highlights: [
        'High-Resolution Spatial Walkthroughs',
        'Private VIP Salon Presentations',
        'International Expatriate Portals',
      ],
    },
    {
      number: '02',
      title: 'Site Planning',
      kicker: 'Topography & Master-Planned Land Layout',
      description:
        'Rigorous pre-construction site feasibility, cardinal solar exposure studies, seismic zone modeling, and municipal DHA/LDA master-plan alignment for 1 to 4-Kanal plots.',
      image: SERVICE_IMAGES.sitePlanning,
      highlights: [
        'Topographic & Soil Core Boring Analysis',
        'Passive Microclimate Shading Studies',
        'Guaranteed DHA & LDA Regulatory Expeditions',
      ],
    },
    {
      number: '03',
      title: 'Building Design',
      kicker: 'Cantilever & Brutalist Engineering',
      description:
        'Turnkey architectural blueprints combining monolithic concrete forms, post-tensioned cantilevered wings, and German Schüco structural glazing tailored for Lahore’s climate.',
      image: SERVICE_IMAGES.buildingDesign,
      highlights: [
        'Post-Tensioned Monolithic Slab Engineering',
        'Double-Height Glass Curtain Wall Specifications',
        'Integrated Clean Solar Microgrid Schematics',
      ],
    },
    {
      number: '04',
      title: 'Space Planning',
      kicker: 'Interior Volume & Biophilic Flow',
      description:
        'Transforming raw floor plates into serene tactile sanctuaries. Bookmatched Italian marble, custom concealed teak millwork, bespoke Boffi kitchens, and reflection water courts.',
      image: SERVICE_IMAGES.spacePlanning,
      highlights: [
        'Italian Calacatta & Travertine Bookmatching',
        'Acoustically Tuned Private Screening Salons',
        'Indoor Water Reflections & Bonsai Courtyards',
      ],
    },
  ];

  return (
    <section id="services" className="py-28 bg-[#12171A] text-[#F2EFE9] relative border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#C9A66B]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
              <span>INTEGRATED ARCHITECTURAL EXPERTISE</span>
              <span aria-hidden="true">·</span>
              <span>LIVI SERVICES</span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#F2EFE9]">
              OUR SERVICES
            </h2>
          </div>
          <p className="text-sm text-[#9AA3A8] max-w-md leading-relaxed">
            From initial site acquisition and structural civil engineering to bespoke interior millwork, our in-house team oversees every phase with uncompromising precision.
          </p>
        </motion.div>

        {/* 4 Numbered Cards Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-[#161C1F] border border-white/[0.08] hover:border-[#C9A66B]/50 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#101416]">
                  <SafeImage
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161C1F] via-[#161C1F]/40 to-transparent" />

                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-[#0E1214]/85 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-xs font-mono font-bold text-[#C9A66B]">
                    {service.number}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <span className="text-[11px] font-syne uppercase tracking-[0.25em] text-[#C9A66B] block mb-1">
                    {service.kicker}
                  </span>
                  <h3 className="font-syne font-bold text-2xl text-[#F2EFE9] tracking-wide group-hover:text-[#C9A66B] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#9AA3A8] mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#9AA3A8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between">
                <span className="text-xs text-[#9AA3A8] font-mono">
                  LIVI STUDIO / PHASE {service.number}
                </span>
                <button
                  onClick={() => onInquireService?.(service.title)}
                  className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider text-[#C9A66B] group-hover:text-[#F2EFE9] transition-colors cursor-pointer py-2"
                >
                  <span>Inquire Capability</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
