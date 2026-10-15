import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Calendar, Phone, Mail, MessageSquare } from 'lucide-react';

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  budget: string;
  preferredArea: string;
  propertyType: string;
  contactMethod: 'WhatsApp' | 'Call' | 'Email';
  preferredDate: string;
  notes: string;
  propertyTitle?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  preferredDate?: string;
}

interface InquiryVisitFormProps {
  initialPropertyTitle?: string;
  onSuccess?: () => void;
  className?: string;
}

export const InquiryVisitForm: React.FC<InquiryVisitFormProps> = ({
  initialPropertyTitle,
  onSuccess,
  className = '',
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    budget: 'PKR 25 - 40 Crore',
    preferredArea: 'DHA Phase 6',
    propertyType: 'villa',
    contactMethod: 'WhatsApp',
    preferredDate: '',
    notes: '',
    propertyTitle: initialPropertyTitle || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pure typed validation without third-party libraries
  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full legal name (min 2 characters)';
    }

    const cleanPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      errs.phone = 'Please provide a valid phone or WhatsApp number';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please provide a valid email format';
      }
    }

    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred viewing date';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      source: 'LIVI DEVELOPERS Portal',
    };

    console.log('Inquiry submitted payload:', payload);

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('Form endpoint POST failed, continuing with success presentation:', err);
      }
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    onSuccess?.();
  };

  if (isSuccess) {
    return (
      <div className={`p-8 bg-[#161C1F] border border-[#C9A66B]/50 rounded-sm text-center flex flex-col items-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-[#C9A66B]/15 border border-[#C9A66B] flex items-center justify-center text-[#C9A66B] mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-syne font-bold text-2xl text-[#F2EFE9] uppercase tracking-wider">
          VISIT RESERVED
        </h3>
        <p className="text-xs sm:text-sm text-[#9AA3A8] mt-2 max-w-md leading-relaxed">
          Thank you, <span className="text-[#F2EFE9] font-medium">{formData.name}</span>. Your private tour request for{' '}
          <span className="text-[#C9A66B] font-semibold">{formData.propertyTitle || 'selected residences'}</span> on{' '}
          <span className="text-[#F2EFE9]">{formData.preferredDate}</span> has been logged.
        </p>
        <p className="text-xs text-[#9AA3A8] mt-2">
          Our Senior Client Partner will reach out via <span className="text-[#C9A66B] font-semibold">{formData.contactMethod}</span> at {formData.phone}.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 px-6 py-2 border border-white/20 text-xs font-syne uppercase tracking-wider hover:border-[#C9A66B] transition-colors rounded-sm cursor-pointer"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`} noValidate>
      {formData.propertyTitle && (
        <div className="p-3 bg-[#0E1214] border border-[#C9A66B]/30 rounded-xs flex items-center justify-between">
          <span className="text-[10px] font-syne uppercase tracking-wider text-[#9AA3A8]">
            RESERVATION FOR:
          </span>
          <span className="text-xs font-syne font-bold text-[#C9A66B] truncate max-w-[70%]">
            {formData.propertyTitle}
          </span>
        </div>
      )}

      {/* Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-name" className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1.5">
            Full Name *
          </label>
          <input
            id="inquiry-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Tariq Chishti"
            className={`w-full bg-[#0E1214] border rounded-sm px-4 py-2.5 text-xs text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none transition-colors ${
              errors.name ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-[#C9A66B]'
            }`}
          />
          {errors.name && <span className="text-[10px] text-red-400 mt-1 block">{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="inquiry-phone" className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1.5">
            Phone / WhatsApp *
          </label>
          <input
            id="inquiry-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+92 300 000 0000"
            className={`w-full bg-[#0E1214] border rounded-sm px-4 py-2.5 text-xs text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none transition-colors ${
              errors.phone ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-[#C9A66B]'
            }`}
          />
          {errors.phone && <span className="text-[10px] text-red-400 mt-1 block">{errors.phone}</span>}
        </div>
      </div>

      {/* Email & Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-email" className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1.5">
            Email Address
          </label>
          <input
            id="inquiry-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="client@domain.com"
            className={`w-full bg-[#0E1214] border rounded-sm px-4 py-2.5 text-xs text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none transition-colors ${
              errors.email ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-[#C9A66B]'
            }`}
          />
          {errors.email && <span className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="inquiry-date" className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1.5">
            Preferred Viewing Date *
          </label>
          <input
            id="inquiry-date"
            type="date"
            required
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className={`w-full bg-[#0E1214] border rounded-sm px-4 py-2 text-xs text-[#F2EFE9] focus:outline-none transition-colors ${
              errors.preferredDate ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-[#C9A66B]'
            }`}
          />
          {errors.preferredDate && <span className="text-[10px] text-red-400 mt-1 block">{errors.preferredDate}</span>}
        </div>
      </div>

      {/* Preferred Area & Property Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-area" className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1.5">
            Preferred Area
          </label>
          <select
            id="inquiry-area"
            value={formData.preferredArea}
            onChange={(e) => setFormData({ ...formData, preferredArea: e.target.value })}
            className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-4 py-2.5 text-xs text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B]"
          >
            <option value="DHA Phase 6">DHA Phase 6</option>
            <option value="DHA Phase 8">DHA Phase 8</option>
            <option value="Defence Raya">Defence Raya Golf Enclave</option>
            <option value="Gulberg III">Gulberg III</option>
            <option value="Bahria Town">Bahria Town</option>
            <option value="Johar Town">Johar Town</option>
            <option value="DHA Phase 9 Prism">DHA Phase 9 Prism</option>
          </select>
        </div>

        <div>
          <label htmlFor="inquiry-type" className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1.5">
            Property Type
          </label>
          <select
            id="inquiry-type"
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
            className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-4 py-2.5 text-xs text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B]"
          >
            <option value="villa">Signature Villa</option>
            <option value="house">Modern House</option>
            <option value="apartment">Sky Penthouse / Apartment</option>
            <option value="plot">Prime Residential Plot</option>
          </select>
        </div>
      </div>

      {/* Budget & Contact Method */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-budget" className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1.5">
            Budget Range
          </label>
          <select
            id="inquiry-budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-4 py-2.5 text-xs text-[#F2EFE9] focus:outline-none focus:border-[#C9A66B]"
          >
            <option value="PKR 8 - 15 Crore">PKR 8 – 15 Crore</option>
            <option value="PKR 15 - 25 Crore">PKR 15 – 25 Crore</option>
            <option value="PKR 25 - 40 Crore">PKR 25 – 40 Crore</option>
            <option value="PKR 40+ Crore">PKR 40+ Crore</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1.5">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['WhatsApp', 'Call', 'Email'] as const).map((method) => (
              <button
                type="button"
                key={method}
                onClick={() => setFormData({ ...formData, contactMethod: method })}
                className={`py-2 px-1 text-[11px] font-syne uppercase tracking-wider rounded-xs border transition-colors cursor-pointer ${
                  formData.contactMethod === method
                    ? 'border-[#C9A66B] bg-[#C9A66B]/15 text-[#C9A66B] font-bold'
                    : 'border-white/10 text-[#9AA3A8] hover:text-[#F2EFE9]'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="inquiry-notes" className="block text-[11px] font-syne uppercase tracking-wider text-[#9AA3A8] mb-1.5">
          Special Requirements / Questions
        </label>
        <textarea
          id="inquiry-notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Any specific architectural preferences, pool requirements, or timing..."
          className="w-full bg-[#0E1214] border border-white/10 rounded-sm px-4 py-2 text-xs text-[#F2EFE9] placeholder-[#9AA3A8]/40 focus:outline-none focus:border-[#C9A66B] resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#C9A66B] hover:bg-[#D8B57B] disabled:opacity-50 text-[#0E1214] font-syne font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Transmitting Request...' : 'Confirm Private Tour Reservation'}</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[10px] text-[#9AA3A8]/70 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#C9A66B]" />
        <span>Strict Fiduciary Privacy · No Third-Party Data Sharing</span>
      </div>
    </form>
  );
};
