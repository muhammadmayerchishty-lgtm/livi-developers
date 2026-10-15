import React from 'react';
import { motion } from 'framer-motion';
import { SafeImage } from './SafeImage';
import { Shield, Sparkles, Building2, Trees, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-28 bg-[#0E1214] text-[#F2EFE9] relative overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-[#C9A66B]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-3">
            <span>ABOUT LIVI DEVELOPERS</span>
            <span aria-hidden="true">·</span>
            <span>OUR ARCHITECTURAL ETHOS</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#F2EFE9] leading-tight">
            REDEFINING THE LAHORE SKYLINE WITH TIMELESS RESTRAINT
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#9AA3A8] leading-relaxed">
            Founded with an uncompromising conviction: that true luxury is not excessive ornamentation,
            but structural mastery, pure volumetric light, and raw material authenticity.
          </p>
        </div>

        {/* 2-Column Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 bg-[#161C1F]">
              <SafeImage
                src="/images/courtyard-water.webp"
                alt="LIVI developers architectural courtyard in Lahore"
                width={800}
                height={600}
                className="w-full h-full object-cover brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1214]/80 via-transparent to-transparent" />
            </div>

            {/* Floating Architectural Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#161C1F] border border-[#C9A66B]/40 p-5 rounded-sm shadow-2xl max-w-xs">
              <span className="text-[10px] font-syne tracking-widest uppercase text-[#C9A66B] block mb-1">
                ENGINEERING PHILOSOPHY
              </span>
              <p className="text-xs text-[#F2EFE9] font-inter leading-relaxed">
                Seamless indoor-outdoor living engineered for Lahore’s subtropical climate with natural shaded courtyards and reflection pools.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Core Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div className="space-y-4 text-sm text-[#9AA3A8] leading-relaxed">
              <p>
                Lahore has long celebrated architectural grandeur — from ancient Mughal brickwork pavilions
                and tranquil courtyards to post-modern estates. At LIVI Developers, we synthesize this rich spatial
                heritage with European brutalist precision, creating residential sanctuaries that feel grounded,
                sculptural, and transcendent.
              </p>
              <p>
                Every villa is engineered as a private family estate: floor-to-ceiling German acoustic glazing,
                32-foot cantilevered structural wings, imported Calacatta marble hearths, and integrated clean-energy
                microgrids that guarantee uninterrupted comfort.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/[0.08]">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider text-[#F2EFE9]">
                  <Building2 className="w-4 h-4 text-[#C9A66B]" />
                  <span>Monolithic Spans</span>
                </div>
                <p className="text-xs text-[#9AA3A8] leading-relaxed">
                  Post-tensioned concrete engineering enabling column-free living halls and 28ft floating master balconies.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider text-[#F2EFE9]">
                  <Trees className="w-4 h-4 text-[#C9A66B]" />
                  <span>Biophilic Climate</span>
                </div>
                <p className="text-xs text-[#9AA3A8] leading-relaxed">
                  Passive solar orientation, deep brise-soleil shading, and reflective water bodies that temper ambient heat.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider text-[#F2EFE9]">
                  <Sparkles className="w-4 h-4 text-[#C9A66B]" />
                  <span>Curated Materials</span>
                </div>
                <p className="text-xs text-[#9AA3A8] leading-relaxed">
                  Bookmatched quarried marble, fluted architectural bronze, Burmese teak woodwork, and zero synthetic veneers.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider text-[#F2EFE9]">
                  <Shield className="w-4 h-4 text-[#C9A66B]" />
                  <span>Verified Title Escrow</span>
                </div>
                <p className="text-xs text-[#9AA3A8] leading-relaxed">
                  100% verified DHA and LDA legal documentation with transparent phased milestone escrow contracts.
                </p>
              </div>
            </div>

            {/* Quantitative Track Record Strip */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="font-syne font-bold text-2xl sm:text-3xl text-[#C9A66B] block">
                  18+
                </span>
                <span className="text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8]">
                  Signature Villas Built
                </span>
              </div>
              <div>
                <span className="font-syne font-bold text-2xl sm:text-3xl text-[#F2EFE9] block font-mono">
                  450k+
                </span>
                <span className="text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8]">
                  Sq.Ft Delivered
                </span>
              </div>
              <div>
                <span className="font-syne font-bold text-2xl sm:text-3xl text-[#C9A66B] block font-mono">
                  100%
                </span>
                <span className="text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8]">
                  DHA / LDA Compliance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
