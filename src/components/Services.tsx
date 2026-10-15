import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Compass, Key, Cpu, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const servicesList = [
    {
      id: 'turnkey-construction',
      icon: Hammer,
      title: 'Turnkey Architectural Construction',
      tagline: 'End-to-End Civil & Structural Execution',
      description:
        'Full bespoke residential execution from seismic structural engineering, deep pile foundations, and cantilevered post-tensioned slabs to flawless monolithic finishes.',
      deliverables: [
        'Seismic Zone 2B Reinforced Concrete Engineering',
        'Schüco / Reynaers High-Thermal Glazing Systems',
        '14-Month Guaranteed Delivery Milestone Matrix',
        'Daily Drone & High-Res Client Portal Updates',
      ],
    },
    {
      id: 'interior-design',
      icon: Compass,
      title: 'Bespoke Interior Architecture',
      tagline: 'Italian Millwork & Lighting Design',
      description:
        'Transforming spatial envelopes into tactile sanctuaries. Direct import of Calacatta Gold marble, Poliform and Boffi custom cabinetry, and museum-grade Lutron warm dimming.',
      deliverables: [
        'Bookmatched Italian & Spanish Marble Slabs',
        'Custom Concealed Flush Doors & Teak Louvers',
        'Dornbracht & Gessi Architectural Bathroom Fixtures',
        'Acoustically Tuned Private Screening Theaters',
      ],
    },
    {
      id: 'land-acquisition',
      icon: Key,
      title: 'Prime Land Acquisition & Title Escrow',
      tagline: 'Off-Market DHA & Gulberg Plots',
      description:
        'Unlocking non-public prime real estate across DHA Phase 6, Raya Golf Enclave, Model Town, and Gulberg III. 100% legal clearance and DHA transfer security.',
      deliverables: [
        'Pre-Purchase Soil & Environmental Feasibility',
        '100% Guaranteed Clear Title & Direct Escrow',
        'Topographic & Sunlight Cardinal Modeling',
        'LDA / DHA Master Plan Approval Expedition',
      ],
    },
    {
      id: 'smart-energy',
      icon: Cpu,
      title: 'Smart Automation & Energy Resilience',
      tagline: 'Zero-Interruption Microgrid Engineering',
      description:
        'Engineered for extreme reliability in Pakistan. Seamless hybrid solar systems with industrial lithium energy storage, smart VRF climate zones, and whole-estate automation.',
      deliverables: [
        'Tier-1 25kW–50kW Bifacial Solar Architecture',
        'Tesla / BYD Commercial Grade Battery Storage',
        'Control4 / Crestron Unified Touch & Mobile OS',
        'Multi-Stage Reverse Osmosis & UV Water Purification',
      ],
    },
  ];

  return (
    <section id="services" className="py-28 bg-[#12171A] text-[#F2EFE9] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
              <span>CAPABILITIES & EXPERTISE</span>
              <span aria-hidden="true">·</span>
              <span>LIVI SERVICES</span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#F2EFE9]">
              BESPOKE DEVELOPMENT SUITE
            </h2>
          </div>
          <p className="text-sm text-[#9AA3A8] max-w-md">
            Whether constructing a new private villa from foundation to key handover, or acquiring high-yielding DHA plots, our integrated team oversees every detail.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#161C1F] border border-white/[0.08] hover:border-[#C9A66B]/50 p-8 sm:p-10 rounded-sm transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-sm bg-[#C9A66B]/10 border border-[#C9A66B]/30 flex items-center justify-center text-[#C9A66B] group-hover:bg-[#C9A66B] group-hover:text-[#0E1214] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-[#9AA3A8]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F2EFE9] tracking-wide group-hover:text-[#C9A66B] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-syne uppercase tracking-wider text-[#C9A66B] mt-1 mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-[#9AA3A8] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Deliverables */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-[#9AA3A8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-[#9AA3A8] font-inter">
                    Direct Liaison with Chief Engineer
                  </span>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-syne font-semibold uppercase tracking-wider text-[#C9A66B] hover:text-[#F2EFE9] transition-colors cursor-pointer"
                  >
                    <span>Inquire Service</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
