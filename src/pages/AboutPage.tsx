import React from 'react';
import { motion } from 'framer-motion';
import { SafeImage } from '../components/SafeImage';
import { Building2, ShieldCheck, Award, Trees, Sparkles, Scale, UserCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export const AboutPage: React.FC = () => {
  useSEO({
    title: 'About Our Ethos & Architecture',
    description: 'Discover LIVI DEVELOPERS foundational ethos, brutalist architectural standards, and verified title escrow in Lahore, Pakistan.',
  });

  const team = [
    {
      name: 'Mian Tariq Chishti',
      role: 'Principal Architectural Director',
      credentials: 'B.Arch (AA London), 22+ Years in Lahore Master-Planning',
    },
    {
      name: 'Zainab Malik',
      role: 'Head of Private Client Acquisitions',
      credentials: 'Ex-Standard Chartered Wealth, DHA Escrow Specialist',
    },
    {
      name: 'Engr. Bilal Hashmi',
      role: 'Chief Structural Engineer',
      credentials: 'M.Sc Structural (UET Lahore), Anti-Seismic Specialist',
    },
  ];

  return (
    <div className="pt-28 pb-32 min-h-screen bg-[#0E1214] text-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
            <span>ABOUT LIVI DEVELOPERS</span>
            <span aria-hidden="true">·</span>
            <span>ESTABLISHED IN LAHORE</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide text-[#F2EFE9] leading-tight">
            A NEW STANDARD OF MODERN LIVING
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#9AA3A8] leading-relaxed">
            Bridging Lahore’s historic architectural majesty with European brutalist precision, post-tensioned cantilever engineering, and uncompromising escrow integrity.
          </p>
        </div>

        {/* Hero Visual & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 bg-[#161C1F]">
            <SafeImage
              src="/images/gallery/exterior.webp"
              alt="LIVI signature villa exterior"
              width={1000}
              height={625}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1214] via-transparent to-transparent opacity-60" />
          </div>

          <div className="lg:col-span-5 space-y-6 text-sm text-[#9AA3A8] leading-relaxed">
            <h2 className="font-syne font-bold text-2xl uppercase text-[#F2EFE9]">
              OUR FOUNDATIONAL ETHOS
            </h2>
            <p>
              Founded in Lahore, LIVI DEVELOPERS emerged from a desire to elevate residential development beyond standard commercial conventions. We believe a home in Lahore must be a fortress of tranquility, sheltering its residents from the city’s heat and noise through thermal mass, shaded courtyards, and filtered water spines.
            </p>
            <p>
              We act as both architect and master builder, guaranteeing that every millimeter conceived in our design studio on MM Alam Road is executed with European tolerances on site in DHA Phase 6, Phase 8, and Defence Raya.
            </p>
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 font-mono text-xs text-[#F2EFE9]">
              <div>
                <span className="text-2xl font-bold font-syne text-[#C9A66B] block">18+</span>
                <span className="text-[#9AA3A8]">Villas Completed</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-syne text-[#C9A66B] block">100%</span>
                <span className="text-[#9AA3A8]">Clear Legal Titles</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-syne uppercase tracking-widest text-[#C9A66B] block mb-1">
              ENGINEERING RIGOR
            </span>
            <h3 className="font-syne font-bold text-3xl uppercase text-[#F2EFE9]">
              HOW WE BUILD DIFFERENTLY
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#161C1F] border border-white/10 rounded-sm space-y-3">
              <Building2 className="w-6 h-6 text-[#C9A66B]" />
              <h4 className="font-syne font-bold text-base uppercase text-[#F2EFE9]">
                Post-Tensioned Slabs
              </h4>
              <p className="text-xs text-[#9AA3A8] leading-relaxed">
                Allowing 30-foot unobstructed column-free interior living pavilions and dramatic floating cantilevered upper decks.
              </p>
            </div>

            <div className="p-6 bg-[#161C1F] border border-white/10 rounded-sm space-y-3">
              <Trees className="w-6 h-6 text-[#C9A66B]" />
              <h4 className="font-syne font-bold text-base uppercase text-[#F2EFE9]">
                Biophilic Shading
              </h4>
              <p className="text-xs text-[#9AA3A8] leading-relaxed">
                Engineered brise-soleil bronze louvers and reflection pools naturally tempering summer temperatures by up to 6°C.
              </p>
            </div>

            <div className="p-6 bg-[#161C1F] border border-white/10 rounded-sm space-y-3">
              <Sparkles className="w-6 h-6 text-[#C9A66B]" />
              <h4 className="font-syne font-bold text-base uppercase text-[#F2EFE9]">
                Authentic Materials
              </h4>
              <p className="text-xs text-[#9AA3A8] leading-relaxed">
                Direct import of quarried Portuguese limestone, Calacatta marble, and German Schüco acoustic triple glazing.
              </p>
            </div>

            <div className="p-6 bg-[#161C1F] border border-white/10 rounded-sm space-y-3">
              <Scale className="w-6 h-6 text-[#C9A66B]" />
              <h4 className="font-syne font-bold text-base uppercase text-[#F2EFE9]">
                Title & Escrow
              </h4>
              <p className="text-xs text-[#9AA3A8] leading-relaxed">
                Every transaction protected by audited DHA transfer certificates and phased milestone-based banking escrow.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-24 pt-12 border-t border-white/10">
          <div className="mb-12">
            <span className="text-xs font-syne uppercase tracking-widest text-[#C9A66B] block mb-1">
              STEWARDSHIP & EXPERTISE
            </span>
            <h3 className="font-syne font-bold text-2xl uppercase text-[#F2EFE9]">
              EXECUTIVE LEADERSHIP
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="p-6 bg-[#161C1F] border border-white/10 rounded-sm flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A66B]/15 border border-[#C9A66B] flex items-center justify-center text-[#C9A66B] mb-4">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-syne font-bold text-lg text-[#F2EFE9]">
                    {member.name}
                  </h4>
                  <span className="text-xs font-syne uppercase tracking-wider text-[#C9A66B] block mt-0.5">
                    {member.role}
                  </span>
                  <p className="text-xs text-[#9AA3A8] mt-3">
                    {member.credentials}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#161C1F] to-[#1E2529] border border-[#C9A66B]/40 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-syne font-bold text-xl sm:text-2xl uppercase text-[#F2EFE9]">
              COMMISSION A PRIVATE RESIDENCE IN LAHORE
            </h4>
            <p className="text-xs sm:text-sm text-[#9AA3A8] mt-1">
              Consult with our architectural partners on land acquisition, zoning, and bespoke construction.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-[#D8B57B] transition-colors whitespace-nowrap"
          >
            Arrange Private Briefing
          </Link>
        </div>
      </div>
    </div>
  );
};
