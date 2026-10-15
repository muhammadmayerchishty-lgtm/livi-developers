import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Scale, Check, Award, FileCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      number: '01',
      title: 'Verified Listings',
      subtitle: 'Zero-Dispute Escrow Protocol',
      description:
        'Every plot, villa, and penthouse in our portfolio undergoes exhaustive legal title due diligence through direct DHA and LDA registry verification prior to presentation.',
      points: [
        '100% Clear Title Verification by In-House Counsel',
        'Official DHA Transfer Escrow Assurance',
        'Direct Non-Encumbrance Certified Documentation',
      ],
    },
    {
      icon: Compass,
      number: '02',
      title: 'Local Expertise',
      subtitle: 'Unrivaled Lahore Market Intelligence',
      description:
        'Decades of boots-on-the-ground experience in DHA Phase 6 & 8, Gulberg III, and Raya Golf Enclaves, unlocking exclusive off-market parcels before public listing.',
      points: [
        'Off-Market Prime Plot & Cantilever Villa Access',
        'Micro-Location Price Appreciation Projections',
        'Cardinal Solar & Biophilic Site Analysis',
      ],
    },
    {
      icon: Scale,
      number: '03',
      title: 'Transparent Guidance',
      subtitle: 'Fiduciary Milestone Governance',
      description:
        'Complete transparency in architectural bill-of-quantities (BOQ), material provenance, and phased escrow payouts. Zero hidden premiums, zero unvetted contractors.',
      points: [
        'Open-Book European Material Invoices & Sourcing',
        'Milestone-Based Phased Construction Escrow',
        'Live Client Dashboard & Weekly Drone Progress Audits',
      ],
    },
  ];

  return (
    <section className="py-28 bg-[#12171A] text-[#F2EFE9] relative border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#C9A66B]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-3">
            <span>THE LIVI STANDARD</span>
            <span aria-hidden="true">·</span>
            <span>FIDUCIARY TRUST</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#F2EFE9]">
            WHY CHOOSE LIVI DEVELOPERS
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9AA3A8] leading-relaxed">
            In a real estate market where ambiguity can cost millions, LIVI stands as Lahore’s benchmark of institutional integrity, structural excellence, and transparent client stewardship.
          </p>
        </motion.div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#161C1F] border border-white/[0.08] hover:border-[#C9A66B]/50 p-8 sm:p-10 rounded-sm flex flex-col justify-between group transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-sm bg-[#C9A66B]/10 border border-[#C9A66B]/30 flex items-center justify-center text-[#C9A66B] group-hover:bg-[#C9A66B] group-hover:text-[#0E1214] transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-xs text-[#9AA3A8]">
                      {pillar.number}
                    </span>
                  </div>

                  <span className="text-[10px] font-syne uppercase tracking-[0.25em] text-[#C9A66B] block mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-syne font-bold text-2xl text-[#F2EFE9] tracking-wide group-hover:text-[#C9A66B] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#9AA3A8] mt-3 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Bullet proof points */}
                  <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2.5">
                    {pillar.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#9AA3A8]">
                        <Check className="w-3.5 h-3.5 text-[#C9A66B] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#9AA3A8]">
                  <span>GUARANTEED SLA</span>
                  <span className="text-[#C9A66B]">AUDITED 2026</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Matrix Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 p-8 bg-[#161C1F] border border-white/[0.08] rounded-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C9A66B]/15 border border-[#C9A66B] flex items-center justify-center text-[#C9A66B] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-base text-[#F2EFE9] tracking-wider uppercase">
                DIRECT DHA & LDA VERIFIED TRANSFERS
              </h4>
              <p className="text-xs text-[#9AA3A8] mt-0.5">
                All transactions routed through dedicated bank escrow accounts with certified legal indemnity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[#F2EFE9] shrink-0">
            <div>
              <span className="text-[#C9A66B] font-bold block text-lg font-syne">PKR 12B+</span>
              <span className="text-[10px] text-[#9AA3A8]">Assets Transacted</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-[#C9A66B] font-bold block text-lg font-syne">100%</span>
              <span className="text-[10px] text-[#9AA3A8]">Title Clearance</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
