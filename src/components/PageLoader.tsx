import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // If reduced motion is preferred, complete immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#0E1214] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          {/* Subtle gold brand mark */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#C9A66B] to-[#997940] flex items-center justify-center text-[#0E1214] font-syne font-extrabold text-xl tracking-wider shadow-lg">
              L
            </div>
            <div className="flex flex-col items-center">
              <span className="font-syne font-bold text-lg tracking-[0.3em] uppercase text-[#F2EFE9]">
                LIVI DEVELOPERS
              </span>
              <span className="text-[10px] font-syne tracking-[0.35em] text-[#C9A66B] uppercase mt-1">
                A NEW STANDARD OF MODERN LIVING
              </span>
            </div>

            {/* Minimal hairline loading bar */}
            <div className="w-32 h-[1px] bg-white/10 mt-4 overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                className="w-full h-full bg-[#C9A66B]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
