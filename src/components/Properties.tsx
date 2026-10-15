import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SafeImage } from './SafeImage';
import { MapPin, Bed, Bath, Move, ArrowUpRight, X, Check, ShieldCheck, Download, Calendar } from 'lucide-react';

export interface PropertyItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'villas' | 'penthouses' | 'houses' | 'plots';
  location: string;
  pricePKR: string;
  priceUSD: string;
  area: string;
  beds?: number;
  baths?: number;
  image: string;
  status: 'Available' | 'Under Construction' | 'Exclusive Release';
  description: string;
  features: string[];
  specs: {
    plotSize: string;
    coveredArea: string;
    floors: string;
    parking: string;
    facing: string;
  };
}

export const PROPERTIES_DATA: PropertyItem[] = [
  {
    id: 'livi-aurora-villa',
    title: 'The Aurora Cantilever Villa',
    subtitle: 'Signature 2-Kanal Architectural Masterpiece',
    category: 'villas',
    location: 'Sector K, DHA Phase 6, Lahore',
    pricePKR: 'PKR 34.5 Crore',
    priceUSD: '$1,240,000 USD',
    area: '9,200 sq.ft',
    beds: 6,
    baths: 7,
    image: '/images/villa-cantilever.webp',
    status: 'Exclusive Release',
    description:
      'A striking exercise in structural minimalism. Featuring a 28-foot cantilevered master wing, imported bookmatched Italian travertine, double-height curtain walls, and a sunken heated pool lounge overlooking manicured palms.',
    features: [
      'Private 40ft Heated Infinity Reflection Pool',
      'Double-Height Glass Atrium with Motorized Louvers',
      'Custom Boffi Kitchen with Miele Appliances',
      'Basement Private Cinema & Temperature Wine Cellar',
      'Integrated Control4 Smart Home & 25kW Solar Grid',
      '4-Vehicle Secure Covered Showroom Garage',
    ],
    specs: {
      plotSize: '2 Kanal (9,000 sq ft)',
      coveredArea: '9,200 sq.ft',
      floors: 'Basement + Ground + 1st Floor + Rooftop Sky Lounge',
      parking: '4 Luxury Vehicles',
      facing: 'North-East (Optimal Natural Illumination)',
    },
  },
  {
    id: 'livi-elysium-penthouse',
    title: 'The Elysium Sky Penthouse',
    subtitle: 'Full-Floor Residence with 360° Skyline Views',
    category: 'penthouses',
    location: 'MM Alam Road, Gulberg III, Lahore',
    pricePKR: 'PKR 21.8 Crore',
    priceUSD: '$785,000 USD',
    area: '6,400 sq.ft',
    beds: 4,
    baths: 5,
    image: '/images/interior-penthouse.webp',
    status: 'Available',
    description:
      'Floating high above Lahore’s cultural pulse in Gulberg. Direct private key-card elevator access into a double-height grand gallery with Calacatta Gold marble accents, custom brass fixtures, and a wraparound sunset terrace.',
    features: [
      'Private Key-Card High-Speed Elevator Access',
      'Wraparound 1,400 sq ft Sky Garden with Plunge Pool',
      'Dual Master Suites with Dornbracht Spa Fixtures',
      'Panoramic Views of Lahore Skyline and Badshahi Vistas',
      'Sub-Zero & Wolf Gourmet Prep Kitchen',
      '24/7 Dedicated Building Concierge & Valet',
    ],
    specs: {
      plotSize: 'Full 18th Floor Footprint',
      coveredArea: '6,400 sq.ft',
      floors: 'Single Level Full-Floor',
      parking: '3 Designated Underground Bays',
      facing: '360-Degree Panoramic Cardinal Exposure',
    },
  },
  {
    id: 'livi-zenith-courtyard',
    title: 'The Zenith Courtyard Residence',
    subtitle: '1-Kanal Biophilic Oasis with Water Spine',
    category: 'houses',
    location: 'Defence Raya Golf Enclave, DHA Phase 6',
    pricePKR: 'PKR 19.5 Crore',
    priceUSD: '$705,000 USD',
    area: '5,500 sq.ft',
    beds: 5,
    baths: 6,
    image: '/images/courtyard-water.webp',
    status: 'Available',
    description:
      'Harmonizing indoor luxury with organic tranquility. Designed around a linear basalt reflection pool and an ancient olive courtyard, this residence offers tranquil seclusion right alongside the Defence Raya championship golf course.',
    features: [
      'Central Linear Basalt Reflection Pool with Water Wall',
      'Direct Golf Course Green Belt Vistas',
      'Floor-to-Ceiling Thermally Broken Triple Glazing',
      'Full Teak Wood Ceiling Treatments & Hidden Doors',
      '100% In-Floor Radiant Cooling and Heating',
      'Separate Maid & Chauffeur Quarters',
    ],
    specs: {
      plotSize: '1 Kanal (4,500 sq ft)',
      coveredArea: '5,500 sq.ft',
      floors: 'Ground + 1st Floor + Zen Deck',
      parking: '3 Covered Spaces',
      facing: 'South-West Facing Golf Course Greens',
    },
  },
  {
    id: 'livi-monolith-estate',
    title: 'The Monolith Facade Estate',
    subtitle: 'Brutalist Masterpiece with Fluted Bronze Architecture',
    category: 'villas',
    location: 'Sector W, DHA Phase 8, Lahore',
    pricePKR: 'PKR 42.0 Crore',
    priceUSD: '$1,510,000 USD',
    area: '11,500 sq.ft',
    beds: 7,
    baths: 8,
    image: '/images/facade-detail.webp',
    status: 'Under Construction',
    description:
      'A monumental presence in prestigious DHA Phase 8. Textured hand-hewn limestone monolithic piers juxtaposed against darkened fluted architectural bronze louvers and bespoke linear perimeter illumination.',
    features: [
      'Hand-Cut Portuguese Ribbed Limestone Exterior',
      'Olympic-Length Indoor Heated Lap Pool',
      'Commercial Grade VRF HVAC & Air Purification',
      'Private Executive Study and Boardroom Suite',
      'Underground 6-Car Gallery with Turntable',
      'CCTV AI Perimeter Defense & Biometric Access',
    ],
    specs: {
      plotSize: '2.5 Kanal (11,250 sq ft)',
      coveredArea: '11,500 sq.ft',
      floors: 'Basement + Ground + 2 Upper Floors',
      parking: '6 Gallery Bays',
      facing: 'East Facing Sunrise Boulevard',
    },
  },
];

interface PropertiesProps {
  onScheduleInquiry: (propertyTitle: string) => void;
}

export const Properties: React.FC<PropertiesProps> = ({ onScheduleInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);

  const filteredProperties =
    activeCategory === 'all'
      ? PROPERTIES_DATA
      : PROPERTIES_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="properties" className="py-28 bg-[#0E1214] text-[#F2EFE9] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
              <span>PORTFOLIO OF RESIDENCES</span>
              <span aria-hidden="true">·</span>
              <span>LAHORE</span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#F2EFE9]">
              CURATED DEVELOPMENTS
            </h2>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#161C1F] border border-white/10 rounded-sm overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Residences' },
              { id: 'villas', label: 'Villas' },
              { id: 'penthouses', label: 'Penthouses' },
              { id: 'houses', label: 'Estates' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 text-xs font-syne tracking-wider uppercase rounded-xs transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#C9A66B] text-[#0E1214] font-bold shadow-md'
                    : 'text-[#9AA3A8] hover:text-[#F2EFE9] hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#161C1F] border border-white/[0.08] hover:border-[#C9A66B]/50 transition-all duration-500 rounded-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#101416]">
                  <SafeImage
                    src={property.image}
                    alt={property.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161C1F] via-transparent to-transparent opacity-80" />

                  {/* Clean unboxed status text */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#0E1214]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[11px] font-syne tracking-wider uppercase text-[#C9A66B]">
                    <span>{property.status}</span>
                  </div>

                  {/* Price Tag in corner */}
                  <div className="absolute bottom-4 right-4 z-10 text-right">
                    <span className="font-syne font-bold text-lg md:text-xl text-[#F2EFE9] block tracking-wide">
                      {property.pricePKR}
                    </span>
                    <span className="text-[10px] font-mono text-[#9AA3A8]">
                      {property.priceUSD}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8">
                  {/* Clean Unboxed Metadata with Typographic Separators */}
                  <div className="flex items-center gap-2 text-xs text-[#9AA3A8] font-inter mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
                    <span>{property.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{property.area}</span>
                  </div>

                  <h3 className="font-syne font-bold text-xl md:text-2xl text-[#F2EFE9] tracking-wide group-hover:text-[#C9A66B] transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-xs text-[#C9A66B] font-syne uppercase tracking-widest mt-1">
                    {property.subtitle}
                  </p>

                  <p className="text-sm text-[#9AA3A8] mt-3 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>

                  {/* Spec Row */}
                  <div className="mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-xs">
                    {property.beds && (
                      <div className="flex items-center gap-2 text-[#9AA3A8]">
                        <Bed className="w-4 h-4 text-[#C9A66B]" />
                        <span>{property.beds} Suites</span>
                      </div>
                    )}
                    {property.baths && (
                      <div className="flex items-center gap-2 text-[#9AA3A8]">
                        <Bath className="w-4 h-4 text-[#C9A66B]" />
                        <span>{property.baths} Baths</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[#9AA3A8]">
                      <Move className="w-4 h-4 text-[#C9A66B]" />
                      <span className="font-mono">{property.area}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 md:p-8 pt-0 flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedProperty(property)}
                  className="inline-flex items-center gap-2 text-xs font-syne font-semibold uppercase tracking-wider text-[#F2EFE9] hover:text-[#C9A66B] transition-colors group/btn cursor-pointer py-2"
                >
                  <span>Explore Blueprint & Specs</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C9A66B] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>

                <button
                  onClick={() => onScheduleInquiry(property.title)}
                  className="px-4 py-2 bg-[#C9A66B]/15 hover:bg-[#C9A66B] text-[#C9A66B] hover:text-[#0E1214] border border-[#C9A66B]/40 hover:border-[#C9A66B] font-syne font-bold text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer"
                >
                  Private Tour
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Property Blueprint & Specs Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#161C1F] border border-white/10 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-[#F2EFE9] relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-6 right-6 p-2 text-[#9AA3A8] hover:text-[#F2EFE9] bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pr-8">
                <span className="text-xs font-syne font-semibold tracking-[0.25em] text-[#C9A66B] uppercase block">
                  ARCHITECTURAL DOSSIER
                </span>
                <h3 className="font-syne font-bold text-2xl sm:text-3xl tracking-wide mt-1">
                  {selectedProperty.title}
                </h3>
                <p className="text-sm text-[#9AA3A8] mt-1">
                  {selectedProperty.location} · {selectedProperty.pricePKR} ({selectedProperty.priceUSD})
                </p>
              </div>

              {/* Full Image */}
              <div className="mt-6 aspect-[16/9] w-full rounded overflow-hidden bg-[#101416] border border-white/5">
                <SafeImage
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <p className="mt-6 text-sm text-[#9AA3A8] leading-relaxed">
                {selectedProperty.description}
              </p>

              {/* Structural Specifications Table */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <h4 className="font-syne font-bold text-sm tracking-wider uppercase text-[#C9A66B] mb-4">
                  STRUCTURAL & LOT SPECIFICATIONS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-inter">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#9AA3A8]">Plot Size</span>
                    <span className="font-medium text-[#F2EFE9]">{selectedProperty.specs.plotSize}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#9AA3A8]">Covered Area</span>
                    <span className="font-mono text-[#F2EFE9]">{selectedProperty.specs.coveredArea}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#9AA3A8]">Configuration</span>
                    <span className="font-medium text-[#F2EFE9]">{selectedProperty.specs.floors}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#9AA3A8]">Covered Parking</span>
                    <span className="font-medium text-[#F2EFE9]">{selectedProperty.specs.parking}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5 sm:col-span-2">
                    <span className="text-[#9AA3A8]">Orientation</span>
                    <span className="font-medium text-[#F2EFE9]">{selectedProperty.specs.facing}</span>
                  </div>
                </div>
              </div>

              {/* Curated Amenities */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <h4 className="font-syne font-bold text-sm tracking-wider uppercase text-[#C9A66B] mb-4">
                  RESIDENCE HIGHLIGHTS & AMENITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9AA3A8]">
                  {selectedProperty.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#9AA3A8]">
                  Direct liaison with LIVI Principal Architect & Legal Title Escrow.
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedProperty(null);
                      onScheduleInquiry(selectedProperty.title);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-[#D8B57B] transition-colors cursor-pointer"
                  >
                    Schedule VIP Tour
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
