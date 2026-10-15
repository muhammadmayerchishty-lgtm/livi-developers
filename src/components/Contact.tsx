import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactProps {
  initialSubject?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: initialSubject || '2-Kanal Signature Villa (DHA Phase 6)',
    budget: 'PKR 25 - 40 Crore',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello LIVI DEVELOPERS, I am interested in inquiring about ${formData.interest}. My name is ${formData.name || 'a private client'}.`
    );
    window.open(`https://wa.me/923008455484?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-28 bg-[#0E1214] text-[#F2EFE9] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
            <span>PRIVATE CLIENT CONSULTATION</span>
            <span aria-hidden="true">·</span>
            <span>LAHORE CONCIERGE</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#F2EFE9]">
            TALK TO AN AGENT & PRINCIPAL ARCHITECT
          </h2>
          <p className="text-sm sm:text-base text-[#9AA3A8] mt-3">
            Schedule a confidential briefing, private site tour, or custom architectural commission in DHA Phase 6 or Gulberg.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Offices & VIP Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#161C1F] border border-white/[0.08] p-8 rounded-sm">
              <h3 className="font-syne font-bold text-lg uppercase tracking-wider text-[#F2EFE9] mb-6">
                LIVI DEVELOPERS OFFICES
              </h3>

              <div className="space-y-6 text-xs text-[#9AA3A8]">
                {/* Office 1 */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#F2EFE9] font-syne uppercase tracking-wider block mb-0.5">
                      Corporate Architecture Studio
                    </strong>
                    <p className="leading-relaxed">
                      Level 6, Ali Tower, MM Alam Road, Gulberg III, Lahore, Pakistan
                    </p>
                  </div>
                </div>

                {/* Office 2 */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#F2EFE9] font-syne uppercase tracking-wider block mb-0.5">
                      Site & Model Experience Centre
                    </strong>
                    <p className="leading-relaxed">
                      Commercial Pavilion, Sector K, Defence Raya Golf Enclave, DHA Phase 6, Lahore
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 pt-3 border-t border-white/[0.06]">
                  <Phone className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F2EFE9] font-syne uppercase tracking-wider block mb-0.5">
                      Direct Concierge Line
                    </strong>
                    <a
                      href="tel:+924235788900"
                      className="hover:text-[#C9A66B] transition-colors"
                    >
                      +92 (42) 3578-8900 / +92 (300) 845-5484
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F2EFE9] font-syne uppercase tracking-wider block mb-0.5">
                      Private Briefings Desk
                    </strong>
                    <span className="font-mono text-[#F2EFE9]">vip@lividevelopers.pk</span>
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

            {/* Quick WhatsApp Concierge Button */}
            <div className="p-6 bg-gradient-to-r from-[#161C1F] to-[#1E2529] border border-[#C9A66B]/30 rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-syne tracking-widest uppercase text-[#C9A66B] block">
                  INSTANT VIP CONCIERGE
                </span>
                <span className="font-syne font-bold text-sm text-[#F2EFE9] block mt-0.5">
                  Direct WhatsApp Liaison
                </span>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="px-4 py-2.5 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-[#D8B57B] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Connect
              </button>
            </div>
          </div>

          {/* Right Column: Confidential Inquiries Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#161C1F] border border-white/[0.08] p-8 sm:p-10 rounded-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#C9A66B]/15 border border-[#C9A66B] flex items-center justify-center text-[#C9A66B] mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-syne font-bold text-2xl text-[#F2EFE9] uppercase tracking-wide">
                    INQUIRY RECEIVED
                  </h3>
                  <p className="text-sm text-[#9AA3A8] mt-3 max-w-md leading-relaxed">
                    Thank you, <span className="text-[#F2EFE9] font-medium">{formData.name}</span>.
                    Our Principal Real Estate Director will contact you within 2 business hours via WhatsApp / call to coordinate your confidential private briefing.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-2.5 border border-white/20 text-xs font-syne uppercase tracking-wider hover:border-[#C9A66B] transition-colors rounded-sm cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <span className="font-syne font-bold text-sm tracking-widest uppercase text-[#C9A66B]">
                      CONFIDENTIAL BRIEFING FORM
                    </span>
                    <span className="text-[11px] text-[#9AA3A8]">
                      Encrypted Escrow Liaison
                    </span>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-syne uppercase tracking-wider text-[#9AA3A8] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tariq Chishti"
                        className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-4 py-3 text-sm text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none focus:border-[#C9A66B] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-syne uppercase tracking-wider text-[#9AA3A8] mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 000 0000"
                        className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-4 py-3 text-sm text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none focus:border-[#C9A66B] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-syne uppercase tracking-wider text-[#9AA3A8] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@domain.com"
                        className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-4 py-3 text-sm text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none focus:border-[#C9A66B] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-syne uppercase tracking-wider text-[#9AA3A8] mb-2">
                        Area of Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-4 py-3 text-sm text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B] transition-colors"
                      >
                        <option value="2-Kanal Aurora Villa (DHA Phase 6)">The Aurora Villa (DHA Phase 6)</option>
                        <option value="Elysium Sky Penthouse (Gulberg III)">The Elysium Penthouse (Gulberg III)</option>
                        <option value="Zenith Courtyard Residence (Defence Raya)">Zenith Courtyard (Defence Raya)</option>
                        <option value="The Monolith Estate (DHA Phase 8)">Monolith Estate (DHA Phase 8)</option>
                        <option value="Turnkey Architectural Construction">Turnkey Architectural Construction</option>
                        <option value="Prime DHA/Gulberg Plot Acquisition">Prime Plot Acquisition & Title Search</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-xs font-syne uppercase tracking-wider text-[#9AA3A8] mb-2">
                      Investment Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-4 py-3 text-sm text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B] transition-colors"
                    >
                      <option value="PKR 15 - 25 Crore">PKR 15 – 25 Crore ($550k – $900k USD)</option>
                      <option value="PKR 25 - 40 Crore">PKR 25 – 40 Crore ($900k – $1.45M USD)</option>
                      <option value="PKR 40+ Crore">PKR 40+ Crore ($1.45M+ USD)</option>
                      <option value="Custom Bespoke Commission">Custom Bespoke Plot & Build Commission</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-syne uppercase tracking-wider text-[#9AA3A8] mb-2">
                      Specific Inquiries / Timeline
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail any specific plot preferences, floor layout requirements, or desired tour timing..."
                      className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-4 py-3 text-sm text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none focus:border-[#C9A66B] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-[#9AA3A8]">
                      All inquiries protected by strict non-disclosure protocol.
                    </span>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A66B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-[#D8B57B] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit Private Briefing
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-24 pt-12 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#9AA3A8]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-xs bg-[#C9A66B] text-[#0E1214] flex items-center justify-center font-syne font-bold text-xs">
              L
            </div>
            <span className="font-syne font-bold tracking-widest text-[#F2EFE9] uppercase">
              LIVI DEVELOPERS · LAHORE
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] tracking-wider uppercase font-syne">
            <span>DHA Phase 6</span>
            <span className="text-white/20">·</span>
            <span>Defence Raya</span>
            <span className="text-white/20">·</span>
            <span>Gulberg III</span>
            <span className="text-white/20">·</span>
            <span>DHA Phase 8</span>
          </div>

          <div className="text-[11px] font-mono text-[#9AA3A8]/70">
            © {new Date().getFullYear()} LIVI DEVELOPERS PVT. LTD. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </section>
  );
};
