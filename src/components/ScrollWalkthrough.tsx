import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SafeImage } from './SafeImage';

// Register ScrollTrigger once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WalkthroughSlide {
  id: string;
  image: string;
  title: string;
  caption: string;
  detail: string;
}

const SLIDES: WalkthroughSlide[] = [
  {
    id: 'exterior',
    image: '/images/gallery/exterior.webp',
    title: 'THE EXTERIOR MONOLITH',
    caption: 'Cantilever Glass Pavilion at Dusk',
    detail: 'Full-size tennis court & private motor court',
  },
  {
    id: 'living-room',
    image: '/images/gallery/living-room.webp',
    title: 'THE GRAND SALON',
    caption: 'Bookmatched Carrara Marble Fireplace',
    detail: 'Double-height glazing & bespoke Italian oak millwork',
  },
  {
    id: 'pool-night',
    image: '/images/gallery/pool-night.webp',
    title: 'THE NIGHT AQUATIC',
    caption: 'Illuminated Reflection Pool & Sunken Fire Lounge',
    detail: 'Black water perimeter with submerged LED channels',
  },
  {
    id: 'home-theatre',
    image: '/images/gallery/home-theatre.webp',
    title: 'THE PRIVATE CINEMA',
    caption: 'Acoustically Tuned Dolby Atmos Screening Room',
    detail: 'Tiered leather recliners & 4K laser projection',
  },
  {
    id: 'entrance-hall',
    image: '/images/gallery/entrance-hall.webp',
    title: 'THE MONUMENTAL FOYER',
    caption: 'Double-Height Grand Entrance Gallery',
    detail: 'Floating cantilevered stone staircase & ancient olive court',
  },
];

export const ScrollWalkthrough: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const captionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const totalSlides = SLIDES.length;
      if (!pinSectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: 'top top',
          end: `+=${totalSlides * 100}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update active index based on scroll progress
            const index = Math.min(
              totalSlides - 1,
              Math.floor(self.progress * totalSlides)
            );
            setActiveIndex(index);

            // Update progress bar width
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Animate cross-fade between consecutive slides
      SLIDES.forEach((_, i) => {
        if (i < totalSlides - 1) {
          const currentSlide = slidesRef.current[i];
          const nextSlide = slidesRef.current[i + 1];
          const currentCaption = captionsRef.current[i];
          const nextCaption = captionsRef.current[i + 1];

          tl.to(
            currentSlide,
            {
              opacity: 0,
              scale: 1.06,
              duration: 1,
              ease: 'power2.inOut',
            },
            `step-${i}`
          );

          if (nextSlide) {
            tl.fromTo(
              nextSlide,
              { opacity: 0, scale: 1.08 },
              {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power2.inOut',
              },
              `step-${i}`
            );
          }

          if (currentCaption) {
            tl.to(
              currentCaption,
              { opacity: 0, y: -20, duration: 0.6, ease: 'power2.inOut' },
              `step-${i}`
            );
          }

          if (nextCaption) {
            tl.fromTo(
              nextCaption,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
              `step-${i}+=0.3`
            );
          }
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#0E1214] text-[#F2EFE9] w-full">
      {/* Pinned Viewport Container */}
      <div
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Full-Screen Slides Stack */}
        <div className="absolute inset-0 w-full h-full">
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              ref={(el) => (slidesRef.current[idx] = el)}
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: idx === 0 ? 1 : 0,
                zIndex: idx + 1,
              }}
            >
              <SafeImage
                src={slide.image}
                alt={slide.title}
                width={1600}
                height={900}
                className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
              />
              {/* Cinematic Scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1214] via-[#0E1214]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0E1214]/70 via-transparent to-[#0E1214]/60" />
            </div>
          ))}
        </div>

        {/* Top Header Overlay */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-12 pt-10 sm:pt-14 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-1">
              <span>WALK THROUGH LIVI</span>
              <span aria-hidden="true">·</span>
              <span>CINEMATIC ARCHITECTURE</span>
            </div>
            <h2 className="font-syne font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-[#F2EFE9]">
              THE RESIDENCE EXPERIENCE
            </h2>
          </div>

          {/* Slide Indicator */}
          <div className="flex items-center gap-2 bg-[#161C1F]/80 backdrop-blur-md px-4 py-2 border border-white/10 rounded-sm">
            <span className="font-mono text-sm font-bold text-[#C9A66B]">
              0{activeIndex + 1}
            </span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs text-[#9AA3A8]">0{SLIDES.length}</span>
          </div>
        </div>

        {/* Captions Overlay Center-Bottom */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-12 pb-14 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="relative min-h-[90px] max-w-xl">
            {SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                ref={(el) => (captionsRef.current[idx] = el)}
                className="absolute bottom-0 left-0 transition-all duration-500"
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  pointerEvents: idx === activeIndex ? 'auto' : 'none',
                }}
              >
                <span className="text-[11px] font-syne uppercase tracking-[0.3em] text-[#C9A66B] block mb-1">
                  {slide.detail}
                </span>
                <h3 className="font-syne font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide text-[#F2EFE9]">
                  {slide.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9AA3A8] mt-1 font-inter">
                  {slide.caption}
                </p>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="w-full sm:w-64 flex flex-col gap-2">
            <div className="flex justify-between text-[10px] font-mono tracking-widest text-[#9AA3A8] uppercase">
              <span>EXPLORATION PROGRESS</span>
              <span className="text-[#C9A66B]">{Math.round(((activeIndex + 1) / SLIDES.length) * 100)}%</span>
            </div>
            <div className="w-full h-[2px] bg-white/15 overflow-hidden rounded-full">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-[#C9A66B] to-[#EBD5B0] transition-all duration-150"
                style={{ width: `${((activeIndex + 1) / SLIDES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
