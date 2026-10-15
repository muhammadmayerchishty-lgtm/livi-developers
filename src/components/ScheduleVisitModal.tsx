import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { InquiryVisitForm } from './InquiryVisitForm';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  propertyTitle,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#161C1F] border border-[#C9A66B]/40 rounded-sm max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 text-[#F2EFE9] relative shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Schedule a Visit Dialog"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-[#9AA3A8] hover:text-[#F2EFE9] bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close visit dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6 pr-8">
            <span className="text-[10px] font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] block mb-1">
              PRIVATE VIEWING SALON
            </span>
            <h3 className="font-syne font-bold text-2xl uppercase tracking-wide">
              SCHEDULE A VISIT
            </h3>
            <p className="text-xs text-[#9AA3A8] mt-1">
              Arrange an exclusive private walkthrough accompanied by our Senior Development Partner in Lahore.
            </p>
          </div>

          <InquiryVisitForm
            initialPropertyTitle={propertyTitle}
            onSuccess={() => {
              // optional delayed close if desired
            }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
