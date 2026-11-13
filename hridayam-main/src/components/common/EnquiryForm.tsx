import React, { useState } from 'react';
import { storageService } from '../../services/storage';
import { EnquiryLead } from '../../types';
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  HeartHandshake,
  User,
  Mail,
  Phone,
  BookOpen,
  Briefcase,
  Check
} from 'lucide-react';

interface EnquiryFormProps {
  onSuccess?: (lead: EnquiryLead) => void;
  className?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ onSuccess, className = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    areaOfInterest: 'Web & Software Development',
    currentStatus: 'Student' as EnquiryLead['currentStatus'],
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<EnquiryLead | null>(null);

  const interestOptions = [
    'Web & Software Development',
    'AI & Workflow Automation',
    'Performance Marketing & Social Media',
    'UI/UX Design Systems & Micro-Interactions',
    'Data Analytics & Business Intelligence',
    'Enterprise Team Upskilling'
  ];

  const statusOptions: Array<EnquiryLead['currentStatus']> = [
    'Student',
    'Graduate',
    'Working Professional',
    'Other'
  ];

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'fullName':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Full name is required';
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        return '';

      case 'email':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Email address is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address';
        }
        return '';

      case 'phone':
        if (!value || typeof value !== 'string' || !value.trim()) {
          return 'Mobile number is required';
        }
        // Accepts numbers, optional +, spaces, hyphens, min 10 digits
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
          return 'Please enter a valid 10-digit mobile number';
        }
        return '';

      case 'areaOfInterest':
        if (!value) return 'Please select an area of interest';
        return '';

      case 'currentStatus':
        if (!value) return 'Please select your current status';
        return '';

      case 'consent':
        if (!value) {
          return 'You must agree to continue';
        }
        return '';

      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, (formData as any)[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const newErrors: Record<string, string> = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      areaOfInterest: validateField('areaOfInterest', formData.areaOfInterest),
      currentStatus: validateField('currentStatus', formData.currentStatus),
      consent: validateField('consent', formData.consent)
    };

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      areaOfInterest: true,
      currentStatus: true,
      consent: true
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err.length > 0);
    if (hasErrors) {
      return;
    }

    setIsLoading(true);

    try {
      // Check if custom backend endpoint is configured via environment
      const backendEndpoint = import.meta.env.VITE_ENQUIRY_API_ENDPOINT;

      if (backendEndpoint) {
        const response = await fetch(backendEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }
      } else {
        // Transparent client-side delay to reflect processing
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      // Persist to local registry
      const lead = storageService.saveEnquiry({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        areaOfInterest: formData.areaOfInterest,
        currentStatus: formData.currentStatus,
        consent: formData.consent
      });

      setSubmittedLead(lead);
      setIsSubmitted(true);
      if (onSuccess) onSuccess(lead);
    } catch (err: any) {
      setSubmitError(
        err?.message || 'Unable to submit your enquiry. Please verify your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      areaOfInterest: 'Web & Software Development',
      currentStatus: 'Student',
      consent: false
    });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setSubmittedLead(null);
  };

  return (
    <div
      className={`relative bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F0D6E3] ring-1 ring-[#A81752]/10 overflow-hidden ${className}`}
    >
      {/* Soft Pink Background Accent Glow */}
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FCE7F3]/70 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#FFF5F9] blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {isSubmitted && submittedLead ? (
          <div className="py-6 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#FCE7F3] border border-[#F0D6E3] text-[#C2185B] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-[#C2185B]" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#C2185B]">
                Enquiry Received · Admissions Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#21131B] tracking-tight">
                Welcome to Hridayam, {submittedLead.fullName.split(' ')[0]}!
              </h3>
              <p className="text-xs sm:text-sm text-[#756572] max-w-md mx-auto leading-relaxed pt-1">
                Our curriculum advisor will review your profile for{' '}
                <strong className="text-[#21131B]">{submittedLead.areaOfInterest}</strong> and reach out to you within 24 hours at{' '}
                <strong className="text-[#21131B]">{submittedLead.email}</strong>.
              </p>
            </div>

            <div className="p-4 bg-[#FFFBFD] rounded-2xl border border-[#F0D6E3] text-left text-xs space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between text-slate-500">
                <span>Reference ID:</span>
                <span className="font-mono font-semibold text-[#760D3B]">{submittedLead.id}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Candidate Status:</span>
                <span className="font-medium text-[#21131B]">{submittedLead.currentStatus}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Contact Phone:</span>
                <span className="font-mono text-[#21131B]">{submittedLead.phone}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 text-xs font-bold text-[#760D3B] hover:text-[#C2185B] bg-[#FCE7F3] hover:bg-[#FCE7F3]/80 rounded-xl transition-colors cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#A81752] bg-[#FCE7F3] px-3 py-1 rounded-full border border-[#F0D6E3] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#A81752]" />
              <span>Admissions & Advisory</span>
            </div>

            {/* Title & Description */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#21131B] tracking-tight leading-tight">
              Start Your Learning Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#756572] mt-1.5 mb-6 leading-relaxed">
              Tell us about yourself and we’ll help you find the right learning path.
            </p>

            {submitError && (
              <div
                role="alert"
                className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="enquiry-fullName"
                  className="block text-xs font-semibold text-[#21131B] mb-1.5"
                >
                  Full Name <span className="text-[#C2185B]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#756572]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="enquiry-fullName"
                    name="fullName"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#FFFBFD] border rounded-xl text-[#21131B] placeholder-[#756572]/60 focus:bg-white focus:outline-none transition-colors ${
                      errors.fullName && touched.fullName
                        ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                        : 'border-[#F0D6E3] focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3]'
                    }`}
                  />
                </div>
                {errors.fullName && touched.fullName && (
                  <p id="fullName-error" className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="enquiry-email"
                    className="block text-xs font-semibold text-[#21131B] mb-1.5"
                  >
                    Email Address <span className="text-[#C2185B]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#756572]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="enquiry-email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="name@example.com"
                      className={`w-full pl-9 pr-3 py-2.5 text-xs bg-[#FFFBFD] border rounded-xl text-[#21131B] placeholder-[#756572]/60 focus:bg-white focus:outline-none transition-colors ${
                        errors.email && touched.email
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                          : 'border-[#F0D6E3] focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3]'
                      }`}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p id="email-error" className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-xs font-semibold text-[#21131B] mb-1.5"
                  >
                    Mobile Number <span className="text-[#C2185B]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#756572]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      id="enquiry-phone"
                      name="phone"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      placeholder="+91 98765 43210"
                      className={`w-full pl-9 pr-3 py-2.5 text-xs bg-[#FFFBFD] border rounded-xl text-[#21131B] placeholder-[#756572]/60 focus:bg-white focus:outline-none transition-colors ${
                        errors.phone && touched.phone
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                          : 'border-[#F0D6E3] focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3]'
                      }`}
                    />
                  </div>
                  {errors.phone && touched.phone && (
                    <p id="phone-error" className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Area of Interest */}
              <div>
                <label
                  htmlFor="enquiry-interest"
                  className="block text-xs font-semibold text-[#21131B] mb-1.5"
                >
                  Area of Interest <span className="text-[#C2185B]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#756572]">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <select
                    id="enquiry-interest"
                    name="areaOfInterest"
                    required
                    value={formData.areaOfInterest}
                    onChange={(e) => handleChange('areaOfInterest', e.target.value)}
                    onBlur={() => handleBlur('areaOfInterest')}
                    className="w-full pl-9 pr-8 py-2.5 text-xs bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:bg-white focus:outline-none focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3] transition-colors cursor-pointer"
                  >
                    {interestOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Current Status Dropdown */}
              <div>
                <label
                  htmlFor="enquiry-status"
                  className="block text-xs font-semibold text-[#21131B] mb-1.5"
                >
                  Current Status <span className="text-[#C2185B]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#756572]">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <select
                    id="enquiry-status"
                    name="currentStatus"
                    required
                    value={formData.currentStatus}
                    onChange={(e) => handleChange('currentStatus', e.target.value)}
                    onBlur={() => handleBlur('currentStatus')}
                    className="w-full pl-9 pr-8 py-2.5 text-xs bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] focus:bg-white focus:outline-none focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3] transition-colors cursor-pointer"
                  >
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div>
                <label
                  htmlFor="enquiry-consent"
                  className="flex items-start gap-2.5 cursor-pointer text-xs select-none"
                >
                  <input
                    type="checkbox"
                    id="enquiry-consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => handleChange('consent', e.target.checked)}
                    onBlur={() => handleBlur('consent')}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                    className="mt-0.5 w-4 h-4 rounded text-[#C2185B] border-[#F0D6E3] focus:ring-[#C2185B] accent-[#C2185B] cursor-pointer"
                  />
                  <span className="text-[#756572] leading-tight">
                    I agree to receive curriculum updates, course brochures, and personalized learning guidance from Hridayam by Belvo.
                  </span>
                </label>
                {errors.consent && touched.consent && (
                  <p id="consent-error" className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#A81752] hover:bg-[#8A1041] active:scale-[0.99] transition-all shadow-md hover:shadow-lg shadow-[#A81752]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Free Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Security & Response Guarantee */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#756572] pt-1">
                <HeartHandshake className="w-3.5 h-3.5 text-[#A81752]" />
                <span>No spam. 100% free career advisory session within 24h.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
