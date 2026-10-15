import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Heart,
  ArrowUpRight,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { PROPERTIES, Property, PropertyPurpose, PropertyType } from '../data/properties';
import { formatPkr } from '../data/images';
import { SafeImage } from '../components/SafeImage';
import { useSavedProperties } from '../context/SavedPropertiesContext';
import { ScheduleVisitModal } from '../components/ScheduleVisitModal';
import { useSEO } from '../hooks/useSEO';

export const PropertiesPage: React.FC = () => {
  useSEO({
    title: 'Curated Properties Portfolio — Lahore',
    description: 'Explore verified luxury villas, sky penthouses, and residential plots in DHA Phase 6, Defence Raya, and Gulberg III.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const { isSaved, toggleSave } = useSavedProperties();

  // Filter States initialized from URL search params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [purpose, setPurpose] = useState<string>(searchParams.get('purpose') || 'all');
  const [area, setArea] = useState<string>(searchParams.get('area') || 'all');
  const [propertyType, setPropertyType] = useState<string>(searchParams.get('type') || 'all');
  const [maxBudget, setMaxBudget] = useState<number>(() => {
    const b = searchParams.get('budget');
    return b && b !== 'all' ? parseInt(b, 10) : 500000000; // default 50 Crore max
  });
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get('beds') || 'any');
  const [size, setSize] = useState<string>(searchParams.get('size') || 'any');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Visit modal state
  const [selectedVisitProperty, setSelectedVisitProperty] = useState<string | null>(null);

  // Sync state if query params change externally
  useEffect(() => {
    const q = searchParams.get('q');
    const a = searchParams.get('area');
    const t = searchParams.get('type');
    const b = searchParams.get('budget');
    const p = searchParams.get('purpose');

    if (q) setSearchQuery(q);
    if (a) setArea(a);
    if (t) setPropertyType(t);
    if (b && b !== 'all') setMaxBudget(parseInt(b, 10));
    if (p) setPurpose(p);
  }, [searchParams]);

  // Working filters on typed data via useMemo
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((item) => {
      // 1. Text Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(query) ||
          item.area.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.features.some((f) => f.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      // 2. Purpose filter (buy | rent)
      if (purpose !== 'all' && item.purpose !== purpose) {
        return false;
      }

      // 3. Area filter
      if (area !== 'all' && !item.area.toLowerCase().includes(area.toLowerCase())) {
        return false;
      }

      // 4. Type filter
      if (propertyType !== 'all' && item.type !== propertyType) {
        return false;
      }

      // 5. Budget filter (PKR)
      if (item.pricePkr > maxBudget) {
        return false;
      }

      // 6. Bedrooms filter
      if (bedrooms !== 'any') {
        const bedNum = parseInt(bedrooms, 10);
        if (bedrooms === '5+') {
          if (item.bedrooms < 5) return false;
        } else if (item.bedrooms !== bedNum) {
          return false;
        }
      }

      // 7. Size filter (5 Marla, 10 Marla, 1 Kanal, 2 Kanal)
      if (size !== 'any') {
        if (!item.sizeLabel.toLowerCase().includes(size.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePkr - b.pricePkr;
      if (sortBy === 'price-desc') return b.pricePkr - a.pricePkr;
      if (sortBy === 'size-desc') return b.sizeSqft - a.sizeSqft;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, purpose, area, propertyType, maxBudget, bedrooms, size, sortBy]);

  const handleClearAll = () => {
    setSearchQuery('');
    setPurpose('all');
    setArea('all');
    setPropertyType('all');
    setMaxBudget(500000000);
    setBedrooms('any');
    setSize('any');
    setSortBy('featured');
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="pt-28 pb-32 min-h-screen bg-[#0E1214] text-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
            <span>RESIDENTIAL PORTFOLIO</span>
            <span aria-hidden="true">·</span>
            <span>LAHORE, PAKISTAN</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide text-[#F2EFE9]">
            PROPERTIES DIRECTORY
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#9AA3A8] max-w-2xl leading-relaxed">
            Filter our architectural catalogue across DHA Phase 6, Defence Raya, Gulberg, and Bahria Town with verified legal titles.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#161C1F] border border-white/10 rounded-sm p-6 mb-10 space-y-6 shadow-2xl">
          {/* Top Search Bar & Purpose Pills */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#C9A66B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search villas, penthouses, features (e.g. pool, cantilever, marble)..."
                className="w-full bg-[#0E1214] border border-white/10 rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none focus:border-[#C9A66B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9AA3A8] hover:text-[#F2EFE9]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Purpose Segmented Control (Buy / Rent / All) */}
            <div className="flex items-center gap-1 p-1 bg-[#0E1214] border border-white/10 rounded-sm shrink-0">
              {(['all', 'buy', 'rent'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPurpose(p)}
                  className={`px-4 py-1.5 text-xs font-syne uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                    purpose === p
                      ? 'bg-[#C9A66B] text-[#0E1214] font-bold'
                      : 'text-[#9AA3A8] hover:text-[#F2EFE9]'
                  }`}
                >
                  {p === 'all' ? 'All Portfolio' : `For ${p}`}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filter Row: Area, Type, Bedrooms, Size, Sort */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            {/* Area */}
            <div>
              <label className="block text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1">
                Location Area
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-3 py-2 text-xs text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B]"
              >
                <option value="all">All Locations</option>
                <option value="DHA Phase 6">DHA Phase 6</option>
                <option value="DHA Phase 8">DHA Phase 8</option>
                <option value="Defence Raya">Defence Raya</option>
                <option value="Gulberg">Gulberg</option>
                <option value="Bahria Town">Bahria Town</option>
                <option value="Johar Town">Johar Town</option>
                <option value="DHA Phase 9">DHA Phase 9 Prism</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-3 py-2 text-xs text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B]"
              >
                <option value="all">All Types</option>
                <option value="villa">Signature Villa</option>
                <option value="apartment">Sky Penthouse</option>
                <option value="house">Modern House</option>
                <option value="plot">Prime Plot</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1">
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-3 py-2 text-xs text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B]"
              >
                <option value="any">Any Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5 Bedrooms</option>
                <option value="5+">5+ Bedrooms</option>
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1">
                Plot / Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-3 py-2 text-xs text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B]"
              >
                <option value="any">Any Size</option>
                <option value="10 Marla">10 Marla</option>
                <option value="1 Kanal">1 Kanal</option>
                <option value="2 Kanal">2 Kanal</option>
              </select>
            </div>

            {/* Sort */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1">
                Sort Ordering
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-3 py-2 text-xs text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="size-desc">Largest Covered Area</option>
              </select>
            </div>
          </div>

          {/* Budget Slider */}
          <div className="pt-2 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-1/2">
              <div className="flex justify-between text-xs font-syne uppercase mb-1">
                <span className="text-[#9AA3A8]">Budget Cap</span>
                <span className="text-[#C9A66B] font-bold font-mono">{formatPkr(maxBudget)}</span>
              </div>
              <input
                type="range"
                min="10000000"
                max="500000000"
                step="10000000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(parseInt(e.target.value, 10))}
                className="w-full accent-[#C9A66B] bg-[#0E1214] h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Actions: Results count & Clear All */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
              <span className="text-xs font-mono text-[#9AA3A8]">
                {filteredProperties.length} of {PROPERTIES.length} residences found
              </span>
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 text-xs font-syne uppercase tracking-wider text-[#9AA3A8] hover:text-[#C9A66B] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid with Animated Layout */}
        {filteredProperties.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center bg-[#161C1F] border border-white/10 rounded-sm flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A66B] mb-4">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="font-syne font-bold text-2xl text-[#F2EFE9] uppercase tracking-wide">
              NO MATCHING RESIDENCES FOUND
            </h3>
            <p className="text-xs sm:text-sm text-[#9AA3A8] mt-2 max-w-md leading-relaxed">
              We couldn't find any properties matching your current filter parameters. Try expanding your budget cap or resetting your location criteria.
            </p>
            <button
              onClick={handleClearAll}
              className="mt-6 px-6 py-2.5 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-[#D8B57B] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProperties.map((prop) => (
                <motion.article
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#161C1F] border border-white/[0.08] hover:border-[#C9A66B]/60 rounded-sm overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#101416]">
                      <SafeImage
                        src={prop.images[0]}
                        alt={prop.title}
                        width={600}
                        height={410}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.92] group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161C1F] via-transparent to-transparent opacity-80" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                        <span className="bg-[#0E1214]/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-syne font-bold uppercase tracking-wider text-[#C9A66B] border border-white/10">
                          FOR {prop.purpose}
                        </span>
                        {/* DEMO LISTING Badge */}
                        <span className="bg-[#161C1F]/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-amber-300 border border-amber-300/30">
                          DEMO LISTING
                        </span>
                      </div>

                      {/* Save Heart Button */}
                      <button
                        onClick={() => toggleSave(prop.id)}
                        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                          isSaved(prop.id)
                            ? 'bg-[#C9A66B] text-[#0E1214] border-[#C9A66B]'
                            : 'bg-[#0E1214]/70 text-white border-white/20 hover:text-[#C9A66B] hover:border-[#C9A66B]'
                        }`}
                        aria-label={`Save ${prop.title}`}
                      >
                        <Heart className={`w-4 h-4 ${isSaved(prop.id) ? 'fill-[#0E1214]' : ''}`} />
                      </button>

                      {/* Price on Image */}
                      <div className="absolute bottom-3 right-3 z-10 text-right">
                        <span className="font-syne font-extrabold text-lg text-[#F2EFE9] tracking-wide block drop-shadow-md">
                          {formatPkr(prop.pricePkr)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-xs text-[#9AA3A8] font-inter mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
                        <span className="truncate">{prop.area}</span>
                      </div>

                      <Link
                        to={`/properties/${prop.slug}`}
                        className="font-syne font-bold text-lg text-[#F2EFE9] group-hover:text-[#C9A66B] transition-colors truncate block"
                      >
                        {prop.title}
                      </Link>

                      <p className="text-xs text-[#9AA3A8] mt-2 line-clamp-2 leading-relaxed">
                        {prop.description}
                      </p>

                      {/* Spec Strip */}
                      <div className="mt-4 pt-3.5 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-xs text-[#9AA3A8]">
                        {prop.bedrooms > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <Bed className="w-3.5 h-3.5 text-[#C9A66B]" />
                            <span>{prop.bedrooms} Beds</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <Maximize2 className="w-3.5 h-3.5 text-[#C9A66B]" />
                            <span>Plot</span>
                          </div>
                        )}

                        {prop.bathrooms > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <Bath className="w-3.5 h-3.5 text-[#C9A66B]" />
                            <span>{prop.bathrooms} Baths</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#C9A66B] font-mono">DHA Approved</span>
                          </div>
                        )}

                        <div className="font-mono text-right text-[#F2EFE9]">
                          <span>{prop.sizeLabel}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <Link
                      to={`/properties/${prop.slug}`}
                      className="w-full py-2 bg-white/5 hover:bg-white/10 text-[#F2EFE9] border border-white/10 font-syne font-bold text-[11px] uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 text-center"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A66B]" />
                    </Link>

                    <button
                      onClick={() => setSelectedVisitProperty(prop.title)}
                      className="w-full py-2 bg-[#C9A66B]/15 hover:bg-[#C9A66B] text-[#C9A66B] hover:text-[#0E1214] border border-[#C9A66B]/50 hover:border-[#C9A66B] font-syne font-bold text-[11px] uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Visit</span>
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Schedule a Visit Modal */}
      <ScheduleVisitModal
        isOpen={selectedVisitProperty !== null}
        onClose={() => setSelectedVisitProperty(null)}
        propertyTitle={selectedVisitProperty || undefined}
      />
    </div>
  );
};
