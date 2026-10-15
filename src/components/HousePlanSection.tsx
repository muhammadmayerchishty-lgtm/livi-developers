import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SafeImage } from './SafeImage';
import { Maximize2, X, Download, ShieldCheck, Ruler } from 'lucide-react';

interface RoomArea {
  room: string;
  areaM2: number;
  areaSqft: number;
  level: string;
}

const ROOM_AREAS: RoomArea[] = [
  { room: 'Living Room', areaM2: 68, areaSqft: 732, level: 'Ground Floor Pavilion' },
  { room: 'Dining Room', areaM2: 34, areaSqft: 366, level: 'Ground Floor Atrium' },
  { room: 'Kitchen', areaM2: 42, areaSqft: 452, level: 'Chef & Butler Kitchen' },
  { room: 'TV Lounge', areaM2: 48, areaSqft: 516, level: 'Family Courtyard Wing' },
  { room: 'Master Bedroom', areaM2: 65, areaSqft: 700, level: 'Cantilever Master Wing' },
  { room: 'Guest Bedroom', areaM2: 38, areaSqft: 409, level: 'Ground Suite' },
  { room: 'Bathroom', areaM2: 28, areaSqft: 301, level: 'Master Spa En-suite' },
  { room: 'Hallway', areaM2: 32, areaSqft: 344, level: 'Double-Height Gallery' },
];

export const HousePlanSection: React.FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const totalM2 = ROOM_AREAS.reduce((acc, curr) => acc + curr.areaM2, 0);
  const totalSqft = ROOM_AREAS.reduce((acc, curr) => acc + curr.areaSqft, 0);

  return (
    <section id="house-plan" className="py-28 bg-[#12171A] text-[#F2EFE9] relative border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-[#C9A66B]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Big HOUSE PLAN Title & Area Table with Thin Dividers */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
                <span>ARCHITECTURAL SCHEMATICS</span>
                <span aria-hidden="true">·</span>
                <span>GLASS RESIDENCE</span>
              </div>
              <h2 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-wide uppercase text-[#F2EFE9] leading-[1.05]">
                HOUSE PLAN
              </h2>
              <p className="mt-4 text-sm text-[#9AA3A8] leading-relaxed max-w-lg">
                Calculated spatial allocations engineered for monumental volume, optimal airflow cross-ventilation, and privacy separation across the 2-Kanal footprint.
              </p>
            </motion.div>

            {/* Area Table in m² with Thin Dividers */}
            <div className="mt-8 border-t border-white/10">
              {ROOM_AREAS.map((item, idx) => (
                <motion.div
                  key={item.room}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="py-3.5 border-b border-white/[0.08] flex items-center justify-between text-xs sm:text-sm group hover:bg-white/[0.02] transition-colors px-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#9AA3A8] w-5">
                      0{idx + 1}
                    </span>
                    <span className="font-syne font-semibold text-[#F2EFE9] tracking-wider uppercase group-hover:text-[#C9A66B] transition-colors">
                      {item.room}
                    </span>
                    <span className="text-[11px] text-[#9AA3A8]/70 hidden sm:inline">
                      · {item.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-right">
                    <span className="text-[#C9A66B] font-semibold">
                      {item.areaM2} m²
                    </span>
                    <span className="text-[#9AA3A8] text-xs">
                      ({item.areaSqft} sq.ft)
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Total Row */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="py-4 border-b-2 border-[#C9A66B]/50 flex items-center justify-between text-sm sm:text-base font-syne font-bold px-1"
              >
                <div className="flex items-center gap-2 text-[#F2EFE9] tracking-wider uppercase">
                  <Ruler className="w-4 h-4 text-[#C9A66B]" />
                  <span>TOTAL COVERED AREA</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-[#F2EFE9]">
                  <span className="text-[#C9A66B]">{totalM2} m²</span>
                  <span className="text-xs text-[#9AA3A8]">({totalSqft} sq.ft)</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Top-Down Floor Plan Image */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-[#161C1F] border border-white/10 hover:border-[#C9A66B]/50 transition-all duration-500 shadow-2xl cursor-pointer"
              onClick={() => setIsZoomed(true)}
            >
              <SafeImage
                src="/images/plans/floorplan-glass-residence.webp"
                alt="Architectural top-down floor plan for Glass Residence in Lahore"
                width={1000}
                height={750}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1214]/80 via-transparent to-transparent opacity-80" />

              {/* Overlay Badges */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#0E1214]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[11px] font-syne tracking-wider uppercase text-[#C9A66B]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OFFICIAL DHA PERMITTED BLUEPRINT</span>
              </div>

              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-[#161C1F]/80 backdrop-blur-md px-3 py-2 border border-white/20 rounded-xs text-xs font-syne uppercase tracking-wider text-[#F2EFE9] group-hover:bg-[#C9A66B] group-hover:text-[#0E1214] transition-colors">
                <Maximize2 className="w-4 h-4" />
                <span>Expand Plan</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expanded Blueprint Modal */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-lg">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 text-[#F2EFE9] rounded-full transition-colors cursor-pointer"
              aria-label="Close enlarged plan"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
              <div className="relative w-full max-h-[75vh] flex items-center justify-center bg-[#161C1F] rounded border border-white/10 p-2">
                <SafeImage
                  src="/images/plans/floorplan-glass-residence.webp"
                  alt="Expanded floor plan blueprint"
                  width={1400}
                  height={1050}
                  className="max-w-full max-h-[75vh] object-contain rounded"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="font-syne font-bold text-lg uppercase tracking-wider text-[#F2EFE9] block">
                  GLASS RESIDENCE · 2-KANAL MASTER BLUEPRINT
                </span>
                <span className="text-xs text-[#9AA3A8] font-mono mt-1 block">
                  Ground Floor Covered Area: 355 m² (3,820 sq.ft) · Total With Upper Wing: 836 m² (9,000 sq.ft)
                </span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
