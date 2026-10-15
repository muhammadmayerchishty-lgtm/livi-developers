import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Phone, MapPin, Heart } from 'lucide-react';
import { useSavedProperties } from '../context/SavedPropertiesContext';

interface HeaderProps {
  onOpenContactModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContactModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { savedIds, setIsDrawerOpen } = useSavedProperties();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', to: '/' },
    { name: 'PROPERTIES', to: '/properties' },
    { name: 'ABOUT', to: '/about' },
    { name: 'SERVICES', to: '/#services' },
    { name: '3D VIRTUAL', to: '/#virtual-tour' },
    { name: 'CONTACT', to: '/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    setMobileMenuOpen(false);

    if (to.startsWith('/#')) {
      const elementId = to.replace('/#', '');
      if (location.pathname === '/') {
        e.preventDefault();
        const target = document.getElementById(elementId);
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled || location.pathname !== '/'
            ? 'bg-[#0E1214]/90 backdrop-blur-md py-4 border-b border-white/[0.08] shadow-2xl'
            : 'bg-transparent py-6 lg:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Wordmark Left */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]"
            aria-label="LIVI DEVELOPERS Homepage"
          >
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#C9A66B] to-[#997940] flex items-center justify-center text-[#0E1214] font-syne font-bold text-sm tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105">
              L
            </div>
            <span className="font-syne font-bold text-lg md:text-xl tracking-[0.2em] text-[#F2EFE9] uppercase whitespace-nowrap transition-colors duration-300 group-hover:text-[#C9A66B]">
              LIVI <span className="font-light text-[#9AA3A8] text-sm md:text-base tracking-[0.15em]">DEVELOPERS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] tracking-[0.25em] font-medium uppercase text-[#9AA3A8]">
            {navLinks.map((link) => {
              const isActive =
                link.to === '/'
                  ? location.pathname === '/'
                  : !link.to.startsWith('/#') && location.pathname.startsWith(link.to);

              return (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={(e) => handleLinkClick(e, link.to)}
                  className={`relative py-1 transition-colors duration-300 group focus-visible:outline-none focus-visible:text-[#C9A66B] ${
                    isActive ? 'text-[#C9A66B] font-semibold' : 'hover:text-[#F2EFE9]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C9A66B] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions: Saved Properties, VIP Concierge & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Saved Drawer Trigger Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 text-[#9AA3A8] hover:text-[#C9A66B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B] rounded-xs transition-colors cursor-pointer"
              aria-label={`Open Saved Residences (${savedIds.length} saved)`}
            >
              <Heart className={`w-5 h-5 ${savedIds.length > 0 ? 'fill-[#C9A66B] text-[#C9A66B]' : ''}`} />
              {savedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A66B] text-[#0E1214] font-mono font-bold text-[10px] flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </button>

            {/* VIP CTA */}
            <button
              onClick={onOpenContactModal}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-[#C9A66B]/50 text-xs font-syne font-semibold tracking-widest text-[#F2EFE9] hover:bg-[#C9A66B] hover:text-[#0E1214] hover:border-[#C9A66B] transition-all duration-300 uppercase whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]"
            >
              VIP Concierge
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F2EFE9] hover:text-[#C9A66B] focus-visible:outline-none transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#0E1214] flex flex-col justify-between p-8 lg:hidden pt-28 overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              <span className="text-[11px] font-syne tracking-[0.3em] uppercase text-[#C9A66B]">
                NAVIGATION ARCHIVE
              </span>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx + 0.1, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    onClick={(e) => handleLinkClick(e, link.to)}
                    className="font-syne text-2xl font-bold tracking-wider text-[#F2EFE9] hover:text-[#C9A66B] transition-colors py-2 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#9AA3A8]" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-4 text-xs text-[#9AA3A8]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A66B]" />
                <span>Gulberg III & Defence Raya DHA Phase 6, Lahore</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A66B]" />
                <span>+92 (42) 3578-8900 / VIP Concierge</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactModal?.();
                }}
                className="w-full mt-2 py-3.5 bg-[#C9A66B] text-[#0E1214] font-syne font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-[#D8B57B] transition-colors"
              >
                Book Private Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
