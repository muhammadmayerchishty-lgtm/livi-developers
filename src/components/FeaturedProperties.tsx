import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SafeImage } from './SafeImage';
import { PROPERTIES, Property } from '../data/properties';
import { formatPkr } from '../data/images';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ArrowUpRight,
  X,
  ShieldCheck,
  Phone,
  User,
} from 'lucide-react';

interface FeaturedPropertiesProps {
  onScheduleViewing?: (propertyTitle: string) => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  onScheduleViewing,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeModalImageIndex, setActiveModalImageIndex] = useState(0);

  const featuredList = PROPERTIES.filter((p) => p.featured);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const openDetails = (property: Property) => {
    setSelectedProperty(property);
    setActiveModalImageIndex(0);
  };

  return (
    <section
      id="properties"
      className="py-28 bg-[#0E1214] text-[#F2EFE9] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with Carousel Arrows */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
              <span>EXCLUSIVE RESIDENTIAL PORTFOLIO</span>
              <span aria-hidden="true">·</span>
              <span>LAHORE</span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#F2EFE9]">
              FEATURED PROPERTIES
            </h2>
          </div>

          {/* Navigation Controls & Count */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[#9AA3A8] hidden sm:inline">
              SHOWING {featuredList.length} EXCLUSIVE RESIDENCES
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-11 h-11 rounded-sm border border-white/10 hover:border-[#C9A66B] bg-[#161C1F] hover:bg-[#C9A66B] text-[#F2EFE9] hover:text-[#0E1214] flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Previous properties"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-11 h-11 rounded-sm border border-white/10 hover:border-[#C9A66B] bg-[#161C1F] hover:bg-[#C9A66B] text-[#F2EFE9] hover:text-[#0E1214] flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Next properties"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Carousel (3 desktop, 1.1 mobile) */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredList.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-[88%] sm:w-[48%] lg:w-[calc(33.333%-1rem)] shrink-0 snap-start bg-[#161C1F] border border-white/[0.08] hover:border-[#C9A66B]/50 rounded-sm overflow-hidden flex flex-col justify-between group transition-all duration-500 shadow-xl"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#101416]">
                  <SafeImage
                    src={property.images[0]}
                    alt={property.title}
                    width={700}
                    height={480}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161C1F] via-transparent to-transparent opacity-80" />

                  {/* Purpose & Type Tag */}
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
                    <span className="bg-[#0E1214]/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-syne font-bold uppercase tracking-wider text-[#C9A66B] border border-white/10">
                      FOR {property.purpose}
                    </span>
                    <span className="bg-[#161C1F]/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-syne uppercase tracking-wider text-[#F2EFE9] border border-white/10">
                      {property.type}
                    </span>
                  </div>

                  {/* Price Tag in PKR */}
                  <div className="absolute bottom-3.5 right-3.5 z-10 text-right">
                    <span className="font-syne font-extrabold text-lg sm:text-xl text-[#F2EFE9] tracking-wide block drop-shadow-md">
                      {formatPkr(property.pricePkr)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Clean Location Metadata */}
                  <div className="flex items-center gap-1.5 text-xs text-[#9AA3A8] font-inter mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
                    <span className="truncate">{property.area}</span>
                  </div>

                  <h3 className="font-syne font-bold text-xl text-[#F2EFE9] tracking-wide group-hover:text-[#C9A66B] transition-colors">
                    {property.title}
                  </h3>

                  <p className="text-xs text-[#9AA3A8] mt-2 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>

                  {/* Spec Row: Beds / Baths / Size */}
                  <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-xs text-[#9AA3A8]">
                    {property.bedrooms > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-[#C9A66B]" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-[#C9A66B]" />
                        <span>{property.type.toUpperCase()}</span>
                      </div>
                    )}

                    {property.bathrooms > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-[#C9A66B]" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-[#C9A66B]">Plot</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 font-mono text-right justify-end text-[#F2EFE9]">
                      <span>{property.sizeLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: View Details */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => openDetails(property)}
                  className="w-full py-2.5 bg-white/5 hover:bg-[#C9A66B] text-[#F2EFE9] hover:text-[#0E1214] border border-white/10 hover:border-[#C9A66B] font-syne font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Property Details Modal with Gallery of 3 Images */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#161C1F] border border-white/10 rounded-sm max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 text-[#F2EFE9] relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-6 right-6 p-2 text-[#9AA3A8] hover:text-[#F2EFE9] bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Price Header */}
              <div className="pr-12">
                <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-widest text-[#C9A66B] uppercase">
                  <span>FOR {selectedProperty.purpose}</span>
                  <span>·</span>
                  <span>{selectedProperty.type}</span>
                  <span>·</span>
                  <span>{selectedProperty.sizeLabel}</span>
                </div>
                <h3 className="font-syne font-bold text-2xl sm:text-3xl tracking-wide mt-1">
                  {selectedProperty.title}
                </h3>
                <p className="text-xs text-[#9AA3A8] mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A66B]" />
                  <span>{selectedProperty.area}</span>
                </p>
                <div className="mt-3 font-syne font-bold text-2xl text-[#C9A66B]">
                  {formatPkr(selectedProperty.pricePkr)}
                </div>
              </div>

              {/* Interactive Multi-Image Gallery (3 images per property) */}
              <div className="mt-6">
                <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-[#101416] border border-white/5">
                  <SafeImage
                    src={selectedProperty.images[activeModalImageIndex]}
                    alt={`${selectedProperty.title} - View ${activeModalImageIndex + 1}`}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  <div className="absolute bottom-3 right-3 bg-[#0E1214]/80 px-2.5 py-1 text-[10px] font-mono text-[#9AA3A8] rounded-xs border border-white/10">
                    Image {activeModalImageIndex + 1} of 3
                  </div>
                </div>

                {/* 3 Thumbnail Selector Buttons */}
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {selectedProperty.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveModalImageIndex(idx)}
                      className={`relative aspect-[16/10] rounded-xs overflow-hidden border transition-all cursor-pointer ${
                        activeModalImageIndex === idx
                          ? 'border-[#C9A66B] ring-1 ring-[#C9A66B]'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <SafeImage
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        width={280}
                        height={175}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1.5 text-[9px] font-syne uppercase tracking-wider text-white bg-black/60 px-1 rounded">
                        {idx === 0 ? 'Exterior' : idx === 1 ? 'Living' : 'Interior'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="mt-6 text-sm text-[#9AA3A8] leading-relaxed">
                {selectedProperty.description}
              </p>

              {/* Architectural Features */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <h4 className="font-syne font-bold text-xs uppercase tracking-widest text-[#C9A66B] mb-3">
                  RESIDENCE HIGHLIGHTS & AMENITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#9AA3A8]">
                  {selectedProperty.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floor Plan Areas */}
              {selectedProperty.floorPlan.length > 0 && (
                <div className="mt-6 pt-5 border-t border-white/10">
                  <h4 className="font-syne font-bold text-xs uppercase tracking-widest text-[#C9A66B] mb-3">
                    ARCHITECTURAL FLOORPLAN BREAKDOWN
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProperty.floorPlan.map((fp, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#0E1214] border border-white/5 rounded-xs"
                      >
                        <span className="text-[11px] text-[#9AA3A8] block">
                          {fp.label}
                        </span>
                        <span className="font-mono text-sm font-semibold text-[#F2EFE9] mt-0.5 block">
                          {fp.areaM2} m² ({Math.round(fp.areaM2 * 10.764)} sq.ft)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agent Representative & Inquiry Bar */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A66B]/15 border border-[#C9A66B] flex items-center justify-center text-[#C9A66B]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] block">
                      Assigned LIVI Private Broker
                    </span>
                    <span className="font-syne font-bold text-sm text-[#F2EFE9]">
                      {selectedProperty.agentName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const title = selectedProperty.title;
                      setSelectedProperty(null);
                      onScheduleViewing?.(title);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-[#D8B57B] transition-colors cursor-pointer"
                  >
                    Schedule Private Tour
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
