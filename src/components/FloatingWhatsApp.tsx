import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello LIVI DEVELOPERS, I would like to inquire about your luxury properties and villas in Lahore.'
    );
    window.open(`https://wa.me/923008455484?text=${text}`, '_blank');
  };

  return (
    <aside aria-label="VIP Concierge" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover/initial */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            className="hidden sm:flex items-center gap-2 bg-[#161C1F]/95 backdrop-blur-md border border-[#C9A66B]/50 px-3.5 py-2 rounded-sm shadow-2xl text-xs font-syne text-[#F2EFE9] whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <span>VIP Concierge Online · Inquire on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenWhatsApp}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#161C1F] to-[#0A0D0E] border-2 border-[#C9A66B] flex items-center justify-center text-[#C9A66B] hover:text-[#0E1214] hover:bg-[#C9A66B] hover:border-[#F2EFE9] shadow-2xl transition-all duration-300 cursor-pointer group"
        aria-label="Direct WhatsApp Concierge"
      >
        <MessageSquare className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />

        {/* Subtle Online Status Dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-[#0E1214]" />
      </motion.button>
    </aside>
  );
};
