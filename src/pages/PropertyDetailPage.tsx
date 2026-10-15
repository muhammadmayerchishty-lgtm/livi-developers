import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  Calendar,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  User,
  Compass,
  Building,
  Ruler,
} from 'lucide-react';
import { PROPERTIES, Property } from '../data/properties';
import { formatPkr } from '../data/images';
import { SafeImage } from '../components/SafeImage';
import { useSavedProperties } from '../context/SavedPropertiesContext';
import { ScheduleVisitModal } from '../components/ScheduleVisitModal';
import { useSEO } from '../hooks/useSEO';

export const PropertyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isSaved, toggleSave } = useSavedProperties();

  const property = PROPERTIES.find((p) => p.slug === slug);

  useSEO({
    title: property ? property.title : 'Property Details',
    description: property ? property.description : 'Luxury residence in Lahore by LIVI DEVELOPERS.',
  });

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  // Friendly 404 if property not found
  if (!property) {
    return (
      <div className="min-h-screen bg-[#0E1214] text-[#F2EFE9] pt-32 pb-20 flex flex-col items-center justify-center px-6 text-center">
        <span className="text-xs font-syne font-bold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
          PROPERTY NOT FOUND · 404
        </span>
        <h1 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-wide text-[#F2EFE9]">
          RESIDENCE UNAVAILABLE
        </h1>
        <p className="text-sm text-[#9AA3A8] mt-3 max-w-md leading-relaxed">
          The requested listing slug does not exist in our Lahore active portfolio, or it may have been retired into private escrow.
        </p>
        <Link
          to="/properties"
          className="mt-8 px-8 py-3.5 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-[#D8B57B] transition-colors"
        >
          Return to Properties Directory
        </Link>
      </div>
    );
  }

  // Similar properties (same type or area, excluding current)
  const similarProperties = PROPERTIES.filter(
    (p) => p.id !== property.id && (p.type === property.type || p.area.includes(property.area.split(',')[0]))
  ).slice(0, 3);

  const handleWhatsAppInquiry = () => {
    const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+923008455484';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello LIVI DEVELOPERS, I am interested in inquiring about the "${property.title}" (${formatPkr(property.pricePkr)}) located in ${property.area}. Please share the complete architectural brochure and arrange a private briefing.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="pt-28 pb-32 min-h-screen bg-[#0E1214] text-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Navigation Breadcrumb & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs font-syne uppercase tracking-wider text-[#9AA3A8]">
            <Link to="/" className="hover:text-[#F2EFE9] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-[#F2EFE9] transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-[#C9A66B] font-semibold">{property.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-[#161C1F] border border-amber-300/40 text-amber-300 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-xs">
              DEMO LISTING
            </span>
            <button
              onClick={() => toggleSave(property.id)}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-syne uppercase tracking-wider ${
                isSaved(property.id)
                  ? 'bg-[#C9A66B] text-[#0E1214] border-[#C9A66B]'
                  : 'bg-[#161C1F] text-[#9AA3A8] border-white/10 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved(property.id) ? 'fill-[#0E1214]' : ''}`} />
              <span className="hidden sm:inline">{isSaved(property.id) ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Title, Address & Price Strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.25em] uppercase text-[#C9A66B] mb-2">
              <span>FOR {property.purpose}</span>
              <span aria-hidden="true">·</span>
              <span>{property.type}</span>
              <span aria-hidden="true">·</span>
              <span>{property.sizeLabel}</span>
            </div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide text-[#F2EFE9]">
              {property.title}
            </h1>
            <p className="text-sm text-[#9AA3A8] mt-2 flex items-center gap-1.5 font-inter">
              <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0" />
              <span>{property.area}</span>
            </p>
          </div>

          <div className="text-left lg:text-right">
            <span className="text-[10px] font-syne uppercase tracking-widest text-[#9AA3A8] block mb-1">
              DEMAND / GUIDE PRICE
            </span>
            <span className="font-syne font-extrabold text-3xl sm:text-4xl text-[#C9A66B] tracking-wide block">
              {formatPkr(property.pricePkr)}
            </span>
            <span className="text-xs font-mono text-[#9AA3A8]">
              {property.sizeSqft > 0 ? `PKR ${Math.round(property.pricePkr / property.sizeSqft).toLocaleString('en-PK')} / sq.ft` : 'Direct Escrow'}
            </span>
          </div>
        </div>

        {/* Gallery with Lightbox (All 3 Images) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Large Display Image */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="lg:col-span-8 relative aspect-[16/10] bg-[#161C1F] rounded-sm overflow-hidden border border-white/10 group cursor-pointer"
          >
            <SafeImage
              src={property.images[activeImageIndex]}
              alt={`${property.title} - Main View`}
              width={1200}
              height={750}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1214]/60 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 right-4 bg-[#0E1214]/80 backdrop-blur-md px-3 py-1.5 text-xs font-syne uppercase tracking-wider text-[#F2EFE9] border border-white/10 rounded-xs flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>Open Lightbox</span>
            </div>
            <div className="absolute bottom-4 left-4 bg-[#0E1214]/80 px-2.5 py-1 text-[10px] font-mono text-[#9AA3A8] rounded-xs border border-white/10">
              {activeImageIndex === 0 ? 'Exterior Elevation' : activeImageIndex === 1 ? 'Living Room' : 'Interior Architecture'}
            </div>
          </div>

          {/* Side Thumbnail Stack */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] rounded-sm overflow-hidden border transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#C9A66B] ring-2 ring-[#C9A66B]/50'
                    : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <SafeImage
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[10px] font-syne uppercase tracking-wider text-white bg-black/70 px-2 py-0.5 rounded-xs">
                  {idx === 0 ? '01 Exterior' : idx === 1 ? '02 Living' : '03 Suite / Kitchen'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Main Content & Side Action Panel */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Specs, Description, Amenities, House Plan, Map */}
          <div className="lg:col-span-8 space-y-12">
            {/* Quick Metrics Bar */}
            <div className="p-6 bg-[#161C1F] border border-white/10 rounded-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] block">Bedrooms</span>
                <span className="font-syne font-bold text-xl text-[#F2EFE9] mt-0.5 block">
                  {property.bedrooms > 0 ? `${property.bedrooms} Suites` : 'N/A (Plot)'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] block">Bathrooms</span>
                <span className="font-syne font-bold text-xl text-[#F2EFE9] mt-0.5 block">
                  {property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] block">Covered Area</span>
                <span className="font-mono font-bold text-xl text-[#F2EFE9] mt-0.5 block">
                  {property.sizeSqft > 0 ? `${property.sizeSqft.toLocaleString()} sq.ft` : property.sizeLabel}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] block">Plot Footprint</span>
                <span className="font-syne font-bold text-xl text-[#C9A66B] mt-0.5 block">
                  {property.sizeLabel}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-syne font-bold text-xl uppercase tracking-wider text-[#F2EFE9] mb-4">
                ARCHITECTURAL OVERVIEW
              </h3>
              <p className="text-sm text-[#9AA3A8] leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities & Features */}
            <div>
              <h3 className="font-syne font-bold text-xl uppercase tracking-wider text-[#F2EFE9] mb-5">
                ESTATE SPECIFICATIONS & FINISHES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9AA3A8]">
                {property.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-[#161C1F] border border-white/5 rounded-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                    <span className="text-[#F2EFE9]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HOUSE PLAN TABLE & TOP-DOWN BLUEPRINT */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.25em] uppercase text-[#C9A66B] mb-2">
                <span>BLUEPRINT SPECIFICATION</span>
                <span aria-hidden="true">·</span>
                <span>SPATIAL BREAKDOWN</span>
              </div>
              <h3 className="font-syne font-bold text-2xl uppercase tracking-wide text-[#F2EFE9] mb-6">
                HOUSE PLAN & FLOOR AREAS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Table */}
                <div className="border border-white/10 rounded-sm overflow-hidden bg-[#161C1F]">
                  <div className="p-3 bg-[#0E1214] border-b border-white/10 text-xs font-syne uppercase tracking-wider font-bold text-[#C9A66B]">
                    Covered Room Footprints (m²)
                  </div>
                  <div className="divide-y divide-white/5 text-xs">
                    {property.floorPlan.map((fp, i) => (
                      <div key={i} className="p-3 flex items-center justify-between">
                        <span className="text-[#F2EFE9] font-medium">{fp.label}</span>
                        <span className="font-mono text-[#C9A66B]">
                          {fp.areaM2} m² ({Math.round(fp.areaM2 * 10.764)} sq.ft)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top-down Floor Plan Image */}
                <div className="aspect-[4/3] rounded-sm overflow-hidden border border-white/10 bg-[#161C1F]">
                  <SafeImage
                    src="/images/plans/floorplan-glass-residence.webp"
                    alt="Floorplan blueprint"
                    width={500}
                    height={375}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Styled Location Block (No Map API Key Needed!) */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="font-syne font-bold text-xl uppercase tracking-wider text-[#F2EFE9] mb-4">
                LOCATION & SECTOR CONTEXT
              </h3>
              <div className="p-6 bg-[#161C1F] border border-white/10 rounded-sm relative overflow-hidden">
                {/* Stylized Architectural Vector Grid Map */}
                <div className="h-48 w-full bg-[#0E1214] rounded-sm relative border border-white/10 overflow-hidden flex items-center justify-center">
                  {/* Decorative map grid lines */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A66B_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute w-full h-[1px] bg-[#C9A66B]/30 top-1/3" />
                  <div className="absolute w-full h-[1px] bg-[#C9A66B]/30 top-2/3" />
                  <div className="absolute h-full w-[1px] bg-[#C9A66B]/30 left-1/3" />
                  <div className="absolute h-full w-[1px] bg-[#C9A66B]/30 left-2/3" />

                  {/* Marker Pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#C9A66B] text-[#0E1214] flex items-center justify-center font-bold shadow-2xl animate-bounce">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="mt-2 bg-[#161C1F]/90 backdrop-blur-md px-3 py-1 border border-[#C9A66B] rounded-xs text-[11px] font-syne font-bold uppercase tracking-wider text-[#F2EFE9]">
                      {property.area}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#9AA3A8] gap-3">
                  <div>
                    <strong className="text-[#F2EFE9] block mb-0.5">Municipal Authority:</strong>
                    <span>DHA Lahore / LDA Master-Plan Zone</span>
                  </div>
                  <div>
                    <strong className="text-[#F2EFE9] block mb-0.5">Access Points:</strong>
                    <span>Ring Road Interchange · Lahore Airport (12 Mins)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Action & Agent Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-[#161C1F] border border-white/10 p-6 rounded-sm shadow-2xl space-y-6">
              <div>
                <span className="text-[10px] font-syne uppercase tracking-widest text-[#C9A66B] block mb-1">
                  DIRECT ESCROW INQUIRY
                </span>
                <div className="font-syne font-bold text-2xl text-[#F2EFE9]">
                  {formatPkr(property.pricePkr)}
                </div>
                <p className="text-xs text-[#9AA3A8] mt-1">
                  Private client title verification guaranteed.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full py-3.5 bg-[#C9A66B] hover:bg-[#D8B57B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule a Visit</span>
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3.5 border border-[#C9A66B]/50 hover:bg-[#C9A66B]/15 text-[#F2EFE9] font-syne font-semibold text-xs uppercase tracking-[0.15em] rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#C9A66B]" />
                  <span>Inquire on WhatsApp</span>
                </button>
              </div>

              {/* Assigned Agent Card */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] block mb-3">
                  ASSIGNED PRIVATE BROKER
                </span>
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#C9A66B]/15 border border-[#C9A66B] flex items-center justify-center text-[#C9A66B]">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-base text-[#F2EFE9]">
                      {property.agentName}
                    </h4>
                    <span className="text-xs text-[#C9A66B] block">
                      Senior Partner · LIVI Lahore
                    </span>
                    <span className="text-[10px] font-mono text-[#9AA3A8]">
                      Certified DHA Escrow License #784
                    </span>
                  </div>
                </div>
              </div>

              {/* Legal Note */}
              <div className="p-3 bg-[#0E1214] border border-white/5 rounded-xs text-[10px] text-[#9AA3A8] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                <span>100% Non-encumbrance certified title audited by LIVI Legal Counsel.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-24 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-syne uppercase tracking-widest text-[#C9A66B] block mb-1">
                  CURATED ALTERNATIVES
                </span>
                <h3 className="font-syne font-bold text-2xl uppercase tracking-wide text-[#F2EFE9]">
                  SIMILAR PROPERTIES IN LAHORE
                </h3>
              </div>
              <Link
                to="/properties"
                className="text-xs font-syne uppercase tracking-wider text-[#C9A66B] hover:underline flex items-center gap-1"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((similar) => (
                <div
                  key={similar.id}
                  className="bg-[#161C1F] border border-white/10 hover:border-[#C9A66B]/50 rounded-sm overflow-hidden flex flex-col justify-between group transition-all"
                >
                  <div className="relative aspect-[16/10] bg-[#101416]">
                    <SafeImage
                      src={similar.images[0]}
                      alt={similar.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#0E1214]/80 text-[9px] font-mono text-amber-300 border border-amber-300/30 px-2 py-0.5">
                      DEMO LISTING
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-syne uppercase text-[#C9A66B]">
                      {similar.area}
                    </span>
                    <h4 className="font-syne font-bold text-base text-[#F2EFE9] group-hover:text-[#C9A66B] transition-colors truncate">
                      {similar.title}
                    </h4>
                    <span className="font-mono text-xs font-bold text-[#F2EFE9] block mt-1">
                      {formatPkr(similar.pricePkr)}
                    </span>
                    <Link
                      to={`/properties/${similar.slug}`}
                      className="mt-3 block text-center py-2 bg-white/5 hover:bg-[#C9A66B] text-[#F2EFE9] hover:text-[#0E1214] text-[11px] font-syne uppercase tracking-wider rounded-xs transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-lg">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
              <div className="relative w-full max-h-[75vh] flex items-center justify-center">
                <SafeImage
                  src={property.images[activeImageIndex]}
                  alt={`${property.title} view ${activeImageIndex + 1}`}
                  width={1400}
                  height={900}
                  className="max-w-full max-h-[75vh] object-contain rounded"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="font-syne font-bold text-base uppercase text-[#F2EFE9]">
                  {property.title} · Image {activeImageIndex + 1} of {property.images.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Schedule a Visit Modal */}
      <ScheduleVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        propertyTitle={property.title}
      />
    </div>
  );
};
