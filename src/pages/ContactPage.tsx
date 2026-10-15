import React from 'react';
import { InquiryVisitForm } from '../components/InquiryVisitForm';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const handleDirectWhatsApp = () => {
    const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+923008455484';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      'Hello LIVI DEVELOPERS, I would like to schedule a private consultation regarding your luxury residential developments in Lahore.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="pt-28 pb-32 min-h-screen bg-[#0E1214] text-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
            <span>VIP CLIENT CONCIERGE</span>
            <span aria-hidden="true">·</span>
            <span>LAHORE, PAKISTAN</span>
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide text-[#F2EFE9] leading-tight">
            CONTACT & PRIVATE BRIEFINGS
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#9AA3A8] leading-relaxed">
            Connect directly with LIVI’s Senior Partners for confidential property viewings, plot acquisitions, or bespoke architectural commissions across DHA and Gulberg.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Office Liaison */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#161C1F] border border-white/10 p-8 rounded-sm space-y-6">
              <h2 className="font-syne font-bold text-lg uppercase tracking-wider text-[#F2EFE9]">
                LAHORE DEVELOPMENT OFFICES
              </h2>

              <div className="space-y-6 text-xs text-[#9AA3A8]">
                {/* Office 1 */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F2EFE9] font-syne uppercase tracking-wider block mb-0.5">
                      Design Studio & Headquarters
                    </strong>
                    <p className="leading-relaxed">
                      Level 6, Ali Tower, MM Alam Road, Gulberg III, Lahore, Pakistan
                    </p>
                  </div>
                </div>

                {/* Office 2 */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F2EFE9] font-syne uppercase tracking-wider block mb-0.5">
                      Site & Model Experience Centre
                    </strong>
                    <p className="leading-relaxed">
                      Commercial Pavilion, Sector K, Defence Raya Golf Enclave, DHA Phase 6, Lahore
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3 pt-4 border-t border-white/[0.06]">
                  <Phone className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F2EFE9] font-syne uppercase tracking-wider block mb-0.5">
                      Direct Concierge Line
                    </strong>
                    <a href="tel:+924235788900" className="hover:text-[#C9A66B] transition-colors text-sm font-mono">
                      +92 (42) 3578-8900
                    </a>
                  </div>
                </div>

                {/* Direct Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F2EFE9] font-syne uppercase tracking-wider block mb-0.5">
                      Private Briefings Desk
                    </strong>
                    <span className="font-mono text-sm text-[#F2EFE9]">vip@lividevelopers.pk</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F2EFE9] font-syne uppercase tracking-wider block mb-0.5">
                      Consultation Hours
                    </strong>
                    <span>Monday – Saturday: 10:00 AM – 7:30 PM PKT (By Appointment)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 bg-gradient-to-r from-[#161C1F] to-[#1E2529] border border-[#C9A66B]/40 rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-syne tracking-widest uppercase text-[#C9A66B] block">
                  INSTANT ENCRYPTED CHAT
                </span>
                <span className="font-syne font-bold text-sm text-[#F2EFE9] block mt-0.5">
                  Direct WhatsApp Liaison
                </span>
              </div>
              <button
                onClick={handleDirectWhatsApp}
                className="px-4 py-2.5 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-[#D8B57B] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Connect
              </button>
            </div>

            <div className="p-4 bg-[#161C1F] border border-white/5 rounded-xs flex items-center gap-3 text-xs text-[#9AA3A8]">
              <ShieldCheck className="w-5 h-5 text-[#C9A66B] shrink-0" />
              <span>All communications and site appointments governed by strict non-disclosure protocol.</span>
            </div>
          </div>

          {/* Right Column: Typed Inquiry & Visit Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#161C1F] border border-white/10 p-8 sm:p-10 rounded-sm shadow-2xl">
              <div className="mb-6">
                <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-[#C9A66B] block mb-1">
                  OFFICIAL INQUIRY FORM
                </span>
                <h3 className="font-syne font-bold text-2xl uppercase text-[#F2EFE9]">
                  SCHEDULE A VISIT OR CONSULTATION
                </h3>
                <p className="text-xs text-[#9AA3A8] mt-1">
                  Complete the dossier below to arrange a site visit or confidential development consultation.
                </p>
              </div>

              <InquiryVisitForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
