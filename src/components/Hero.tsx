import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, ChevronDown, PhoneCall } from 'lucide-react';
import { SafeImage } from './SafeImage';

import { Hero3DContainer } from './3d/Hero3DContainer';
import { HeroSearchBar } from './HeroSearchBar';

interface HeroProps {
  onExploreClick: () => void;
  onTalkToAgentClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onTalkToAgentClick }) => {
  const { scrollY } = useScroll();

  // Subtle parallax effect on scroll
  const yParallax = useTransform(scrollY, [0, 800], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[680px] overflow-hidden flex items-center justify-center bg-[#0E1214]"
    >
      {/* 3D HERO LAYER (Canvas with fallback to static image on mobile/reduced-motion/error) */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <Hero3DContainer />

        {/* Cinematic gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1214] via-[#0E1214]/55 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1214]/75 via-transparent to-[#0E1214]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0E1214]/30 to-[#0E1214]/80 pointer-events-none" />
      </motion.div>

      {/* Content Container */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-12 flex flex-col items-center text-center pt-16 sm:pt-20"
      >
        {/* Subtitle / Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 text-xs md:text-sm tracking-[0.35em] uppercase font-syne font-semibold text-[#C9A66B] mb-4 sm:mb-6"
        >
          <span className="w-8 h-[1px] bg-[#C9A66B]/60" />
          <span>A NEW STANDARD OF MODERN LIVING</span>
          <span className="w-8 h-[1px] bg-[#C9A66B]/60" />
        </motion.div>

        {/* Giant Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.14em] uppercase text-[#F2EFE9] max-w-5xl leading-[1.05] drop-shadow-2xl"
          style={{ textWrap: 'balance' }}
        >
          LIVI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2EFE9] via-[#C9A66B] to-[#F2EFE9]">DEVELOPERS</span>
        </motion.h1>

        {/* Editorial description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm sm:text-base md:text-lg text-[#9AA3A8] max-w-2xl font-normal leading-relaxed tracking-wide"
        >
          Sculpting bespoke residential sanctuaries across DHA Phase 6, Raya, and Gulberg.
          Monolithic architectural precision meets twilight tranquility.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          {/* Gold Filled Button */}
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-[0.25em] hover:bg-[#D8B57B] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(201,166,107,0.35)] active:scale-[0.98] cursor-pointer"
          >
            Explore Properties
          </button>

          {/* Outlined Button */}
          <button
            onClick={onTalkToAgentClick}
            className="w-full sm:w-auto px-8 py-4 rounded-sm border border-[#C9A66B]/60 text-[#F2EFE9] font-syne font-semibold text-xs uppercase tracking-[0.25em] hover:bg-[#C9A66B]/15 hover:border-[#C9A66B] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#C9A66B]" />
            Talk to an Agent
          </button>
        </motion.div>

        {/* Hero Search Bar (Area, Type, Budget) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 w-full max-w-4xl"
        >
          <HeroSearchBar />
        </motion.div>
      </motion.div>

      {/* Bottom Right Location Tag */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 right-6 lg:right-12 z-20 flex items-center gap-3 text-right"
      >
        <div className="flex flex-col">
          <span className="font-syne font-bold text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F2EFE9]">
            LAHORE, PAKISTAN
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#9AA3A8]">
            31.5204° N · 74.3587° E · PUNJAB
          </span>
        </div>
        <div className="w-9 h-9 rounded-full border border-white/10 bg-[#161C1F]/60 backdrop-blur-md flex items-center justify-center text-[#C9A66B]">
          <Compass className="w-4 h-4 animate-spin-slow" />
        </div>
      </motion.div>

      {/* Bottom Left Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.95 }}
        className="absolute bottom-8 left-6 lg:left-12 z-20 hidden md:flex items-center gap-3 text-left cursor-pointer"
        onClick={onExploreClick}
      >
        <div className="w-7 h-11 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-2.5 rounded-full bg-[#C9A66B]"
          />
        </div>
        <div className="flex flex-col text-[11px] font-syne tracking-widest uppercase text-[#9AA3A8]">
          <span>SCROLL TO DISCOVER</span>
          <span className="text-[9px] text-[#C9A66B]">ARCHITECTURE & RESIDENCES</span>
        </div>
      </motion.div>
    </section>
  );
};
