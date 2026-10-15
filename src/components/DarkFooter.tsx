import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, MapPin, Phone, MessageSquare } from 'lucide-react';

interface DarkFooterProps {
  onOpenConsultation?: () => void;
}

export const DarkFooter: React.FC<DarkFooterProps> = ({ onOpenConsultation }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const menuLinks = [
    { name: 'Home', to: '/' },
    { name: 'About LIVI', to: '/about' },
    { name: 'Properties Directory', to: '/properties' },
    { name: 'Contact & Briefings', to: '/contact' },
    { name: 'Services & Engineering', to: '/#services' },
    { name: '3D Virtual Villa', to: '/#virtual-tour' },
  ];

  const primeLocations = [
    'DHA Phase 6 (Sectors K, J, L)',
    'DHA Phase 8 (Park View & Sectors W, Y)',
    'Defence Raya Golf & Country Club',
    'Gulberg III (MM Alam & Ali Tower)',
    'Bahria Town Sector C',
    'Model Town & Canal Bank Enclaves',
  ];

  return (
    <footer className="bg-[#0A0D0E] text-[#F2EFE9] pt-20 pb-12 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Newsletter & Brand Row */}
        <div className="pb-16 border-b border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#C9A66B] to-[#997940] flex items-center justify-center text-[#0E1214] font-syne font-extrabold text-sm tracking-wider">
                L
              </div>
              <span className="font-syne font-bold text-xl tracking-[0.2em] text-[#F2EFE9] uppercase">
                LIVI DEVELOPERS
              </span>
            </div>
            <p className="text-sm text-[#9AA3A8] max-w-lg leading-relaxed">
              A new standard of modern living. Designing and building bespoke private estates, cantilever glass villas, and sky penthouses across Lahore, Pakistan.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-[#161C1F] border border-white/[0.08] p-6 rounded-sm">
            <span className="text-[10px] font-syne uppercase tracking-[0.25em] text-[#C9A66B] block mb-1">
              EXCLUSIVE PRIVATE DISPATCH
            </span>
            <h4 className="font-syne font-bold text-lg text-[#F2EFE9]">
              Receive Off-Market Architectural Releases
            </h4>
            <p className="text-xs text-[#9AA3A8] mt-1 mb-4">
              Get confidential dossiers on newly cleared DHA plots and upcoming signature villas before public release.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#C9A66B] font-syne font-semibold py-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You have been subscribed to our private investor registry.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your private email address"
                  className="bg-[#0E1214] border border-white/10 rounded-sm px-4 py-2.5 text-xs text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none focus:border-[#C9A66B] flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-[#D8B57B] transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Navigation & Contact Grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/[0.08] text-xs">
          {/* Col 1: Menu Links */}
          <div className="space-y-4">
            <h5 className="font-syne font-bold tracking-[0.2em] uppercase text-[#F2EFE9] text-sm">
              NAVIGATION
            </h5>
            <ul className="space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  {link.to.startsWith('/#') ? (
                    <a
                      href={link.to}
                      className="text-[#9AA3A8] hover:text-[#C9A66B] transition-colors flex items-center gap-1.5"
                    >
                      <span>{link.name}</span>
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-[#9AA3A8] hover:text-[#C9A66B] transition-colors flex items-center gap-1.5"
                    >
                      <span>{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Prime Lahore Sectors */}
          <div className="space-y-4">
            <h5 className="font-syne font-bold tracking-[0.2em] uppercase text-[#F2EFE9] text-sm">
              PRIME LOCATIONS
            </h5>
            <ul className="space-y-2.5 text-[#9AA3A8]">
              {primeLocations.map((loc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#C9A66B]" />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Lahore Offices */}
          <div className="space-y-4">
            <h5 className="font-syne font-bold tracking-[0.2em] uppercase text-[#F2EFE9] text-sm">
              LAHORE STUDIOS
            </h5>
            <div className="space-y-3 text-[#9AA3A8]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                <span>Level 6, Ali Tower, MM Alam Road, Gulberg III, Lahore</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                <span>Sector K, Defence Raya Golf Enclave, DHA Phase 6</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & VIP Liaison */}
          <div className="space-y-4">
            <h5 className="font-syne font-bold tracking-[0.2em] uppercase text-[#F2EFE9] text-sm">
              VIP LIAISON
            </h5>
            <div className="space-y-2.5 text-[#9AA3A8]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <a href="tel:+924235788900" className="hover:text-[#F2EFE9] transition-colors">
                  +92 (42) 3578-8900
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <a href="https://wa.me/923008455484" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2EFE9] transition-colors">
                  +92 (300) 845-5484 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <span className="font-mono">vip@lividevelopers.pk</span>
              </div>
              <button
                onClick={onOpenConsultation}
                className="mt-3 w-full py-2.5 border border-[#C9A66B]/50 hover:bg-[#C9A66B] text-[#C9A66B] hover:text-[#0E1214] font-syne font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer text-center"
              >
                Book VIP Briefing
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Mandatory Demo Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9AA3A8]">
          <div className="font-mono text-[11px]">
            © 2026 LIVI DEVELOPERS - Demo concept, sample listings
          </div>
          <div className="flex items-center gap-6 text-[11px] font-syne uppercase tracking-wider">
            <span>DHA Lahore Title Escrow</span>
            <span className="text-white/20">·</span>
            <span>LDA Permitted Footprints</span>
            <span className="text-white/20">·</span>
            <span>Non-Encumbrance Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
