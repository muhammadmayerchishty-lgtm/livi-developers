import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Trash2, ArrowRight, Heart, Bed, Bath, MapPin } from 'lucide-react';
import { useSavedProperties } from '../context/SavedPropertiesContext';
import { PROPERTIES } from '../data/properties';
import { formatPkr } from '../data/images';
import { SafeImage } from './SafeImage';

export const SavedDrawer: React.FC = () => {
  const { savedIds, isDrawerOpen, setIsDrawerOpen, toggleSave, clearAll } = useSavedProperties();

  const savedProperties = PROPERTIES.filter((p) => savedIds.includes(p.id));

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-out Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#161C1F] border-l border-white/10 text-[#F2EFE9] flex flex-col shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Saved Properties Drawer"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C9A66B] fill-[#C9A66B]" />
                  <h3 className="font-syne font-bold text-sm tracking-widest uppercase text-[#F2EFE9]">
                    SAVED RESIDENCES ({savedProperties.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-full text-[#9AA3A8] hover:text-[#F2EFE9] hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close saved drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {savedProperties.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9AA3A8] mb-4">
                      <Heart className="w-6 h-6 stroke-1" />
                    </div>
                    <p className="font-syne font-bold text-base text-[#F2EFE9] uppercase tracking-wider">
                      NO SAVED RESIDENCES
                    </p>
                    <p className="text-xs text-[#9AA3A8] mt-1 max-w-xs leading-relaxed">
                      Click the heart icon on any villa or penthouse to keep track of your preferred listings.
                    </p>
                    <Link
                      to="/properties"
                      onClick={() => setIsDrawerOpen(false)}
                      className="mt-6 px-6 py-2.5 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-[#D8B57B] transition-colors"
                    >
                      Browse Portfolio
                    </Link>
                  </div>
                ) : (
                  savedProperties.map((prop) => (
                    <div
                      key={prop.id}
                      className="p-3 bg-[#0E1214] border border-white/10 rounded-sm flex gap-3.5 group relative hover:border-[#C9A66B]/50 transition-colors"
                    >
                      <div className="w-24 h-20 shrink-0 rounded-xs overflow-hidden bg-[#161C1F]">
                        <SafeImage
                          src={prop.images[0]}
                          alt={prop.title}
                          width={100}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-syne uppercase tracking-wider text-[#C9A66B]">
                              {prop.sizeLabel} · {prop.type}
                            </span>
                            <button
                              onClick={() => toggleSave(prop.id)}
                              className="text-[#9AA3A8] hover:text-red-400 p-1 transition-colors cursor-pointer"
                              title="Remove"
                              aria-label={`Remove ${prop.title} from saved`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <Link
                            to={`/properties/${prop.slug}`}
                            onClick={() => setIsDrawerOpen(false)}
                            className="font-syne font-bold text-sm text-[#F2EFE9] hover:text-[#C9A66B] transition-colors truncate block"
                          >
                            {prop.title}
                          </Link>
                          <div className="flex items-center gap-1 text-[11px] text-[#9AA3A8] truncate mt-0.5">
                            <MapPin className="w-3 h-3 text-[#C9A66B] shrink-0" />
                            <span className="truncate">{prop.area}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono text-xs font-bold text-[#F2EFE9]">
                            {formatPkr(prop.pricePkr)}
                          </span>
                          <Link
                            to={`/properties/${prop.slug}`}
                            onClick={() => setIsDrawerOpen(false)}
                            className="text-[11px] font-syne uppercase text-[#C9A66B] flex items-center gap-1 hover:underline"
                          >
                            View
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {savedProperties.length > 0 && (
                <div className="p-6 border-t border-white/10 flex items-center justify-between bg-[#12171A]">
                  <button
                    onClick={clearAll}
                    className="text-xs text-[#9AA3A8] hover:text-red-400 font-syne uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                  <Link
                    to="/contact"
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-5 py-2.5 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-[#D8B57B] transition-colors cursor-pointer"
                  >
                    Inquire All ({savedProperties.length})
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
