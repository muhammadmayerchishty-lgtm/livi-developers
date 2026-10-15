import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Phone, MessageSquare } from 'lucide-react';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetSubject?: string;
}

export const VipModal: React.FC<VipModalProps> = ({
  isOpen,
  onClose,
  presetSubject,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(presetSubject || 'Signature Villa Inquiries');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello LIVI Concierge, my name is ${name || 'a private client'} inquiring about ${subject}.`
    );
    window.open(`https://wa.me/923008455484?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#161C1F] border border-[#C9A66B]/40 rounded-sm max-w-lg w-full p-6 sm:p-8 text-[#F2EFE9] relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#9AA3A8] hover:text-[#F2EFE9] rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[10px] font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] block mb-1">
            VIP PRIVATE DESK
          </span>
          <h3 className="font-syne font-bold text-2xl uppercase tracking-wide">
            TALK TO AN AGENT
          </h3>
          <p className="text-xs text-[#9AA3A8] mt-1 mb-6">
            Direct access to senior partners for private viewings and development briefs in Lahore.
          </p>

          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#C9A66B]/15 border border-[#C9A66B] flex items-center justify-center text-[#C9A66B] mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-syne font-bold text-lg text-[#F2EFE9] uppercase">
                BRIEFING SCHEDULED
              </h4>
              <p className="text-xs text-[#9AA3A8] mt-2 max-w-xs leading-relaxed">
                Our Private Client Director will contact you at {phone} within 2 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-wider rounded-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Asad Chishty"
                  className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none focus:border-[#C9A66B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 000 0000"
                  className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none focus:border-[#C9A66B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1">
                  Inquiry Focus
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B]"
                >
                  <option value="The Aurora Cantilever Villa (DHA Phase 6)">The Aurora Cantilever Villa (DHA Phase 6)</option>
                  <option value="The Elysium Penthouse (Gulberg III)">The Elysium Penthouse (Gulberg III)</option>
                  <option value="Zenith Courtyard (Defence Raya)">Zenith Courtyard (Defence Raya)</option>
                  <option value="The Monolith Estate (DHA Phase 8)">The Monolith Estate (DHA Phase 8)</option>
                  <option value="Turnkey Architectural Construction">Turnkey Architectural Construction</option>
                  <option value="Prime DHA Plot Acquisition">Prime DHA Plot Acquisition</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-[#D8B57B] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Request Private Call
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 border border-[#C9A66B]/50 hover:bg-[#C9A66B]/10 text-[#F2EFE9] font-syne font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C9A66B]" />
                  Direct WhatsApp Chat
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
