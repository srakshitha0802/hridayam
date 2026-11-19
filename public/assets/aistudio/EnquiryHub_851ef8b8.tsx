import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, Mail, MapPin, Search, ShieldCheck } from 'lucide-react';
import { submitEnquiry, verifyCertificateById } from '../lib/firestoreService';
import { BELVO_CATEGORIES, Certificate, EnquiryType } from '../types';
import { useAuth } from '../context/AuthContext';

interface EnquiryHubProps {
  initialType?: EnquiryType;
  initialCourseInterest?: string;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

const ENQUIRY_TABS: { id: EnquiryType; label: string; subtitle: string }[] = [
  {
    id: 'course_enquiry',
    label: 'Course & Syllabus',
    subtitle: 'Request detailed modules, fee plans, or scholarship eligibility.',
  },
  {
    id: 'corporate_training',
    label: 'Corporate Training',
    subtitle: 'Upskill engineering, marketing, or design teams with Belvo mentors.',
  },
  {
    id: 'university_partnership',
    label: 'University Alliance',
    subtitle: 'Co-brand industry tracks, credit programs, and campus workshops.',
  },
  {
    id: 'instructor_application',
    label: 'Become an Instructor',
    subtitle: 'Teach practical cohorts on Hridayam across any Belvo domain.',
  },
];

export function EnquiryHub({
  initialType = 'course_enquiry',
  initialCourseInterest = '',
  onToast,
}: EnquiryHubProps) {
  const { user } = useAuth();
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(initialType);
  const [fullName, setFullName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [courseInterest, setCourseInterest] = useState(
    initialCourseInterest || BELVO_CATEGORIES[0]
  );
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  const [certLookupId, setCertLookupId] = useState('');
  const [verifyingCert, setVerifyingCert] = useState(false);
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null | undefined>(undefined);

  useEffect(() => {
    setEnquiryType(initialType);
  }, [initialType]);

  useEffect(() => {
    if (initialCourseInterest) {
      setCourseInterest(initialCourseInterest);
    }
  }, [initialCourseInterest]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 2) {
      onToast('error', 'Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      onToast('error', 'Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 10) {
      onToast('error', 'Please share at least 10 characters describing your request.');
      return;
    }

    setSubmitting(true);
    try {
      const id = await submitEnquiry({
        enquiryType,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        organization: organization.trim(),
        courseInterest,
        message: message.trim(),
        userId: user?.uid || '',
      });
      setLastSubmittedId(id);
      setMessage('');
      onToast(
        'success',
        'Enquiry submitted successfully',
        `Reference ID ${id} logged with the Belvo team.`
      );
    } catch {
      onToast('error', 'Submission failed', 'Please double check all fields and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certLookupId.trim()) return;
    setVerifyingCert(true);
    try {
      const found = await verifyCertificateById(certLookupId.trim());
      setVerifiedCert(found);
    } catch {
      setVerifiedCert(null);
    } finally {
      setVerifyingCert(false);
    }
  };

  const activeTab = ENQUIRY_TABS.find((t) => t.id === enquiryType) || ENQUIRY_TABS[0];

  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-10 sm:py-14 relative z-10">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold text-[#1D4ED8]">Hridayam by Belvo Contact &amp; Admissions Desk</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-2 text-balance">
          Contact Forms, Partnerships &amp; Credential Verification
        </h1>
        <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed">
          Connect directly with Belvo admissions advisors, corporate learning coordinators, or university alliance directors—or validate a student completion credential below.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 edu-panel rounded-2xl overflow-hidden">
          <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-1.5">
            {ENQUIRY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setEnquiryType(tab.id);
                  setLastSubmittedId(null);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                  enquiryType === tab.id
                    ? 'bg-[#1D4ED8] text-white shadow-xs'
                    : 'text-[#475569] hover:bg-slate-200/70 hover:text-[#0F172A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleEnquirySubmit} className="p-6 sm:p-8 space-y-5">
            <div className="pb-4 border-b border-slate-200">
              <h2 className="font-display text-xl font-semibold text-[#0F172A]">
                {activeTab.label}
              </h2>
              <p className="text-xs text-[#64748B] mt-1">{activeTab.subtitle}</p>
            </div>

            {lastSubmittedId && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-950">
                    Request logged under reference <span className="font-mono-tabular">{lastSubmittedId}</span>
                  </p>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Our admissions and partnerships desk reviews all enquiries within one business day.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="enq-name" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                  Full Name
                </label>
                <input
                  id="enq-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-3.5 py-2.5 text-sm edu-input rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="enq-email" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                  Work or Academic Email
                </label>
                <input
                  id="enq-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full px-3.5 py-2.5 text-sm edu-input rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="enq-phone" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                  Phone Number
                </label>
                <input
                  id="enq-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 / +1 ..."
                  className="w-full px-3.5 py-2.5 text-sm edu-input rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="enq-org" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                  {enquiryType === 'university_partnership'
                    ? 'University / Institution Name'
                    : enquiryType === 'corporate_training'
                    ? 'Company & Team Size'
                    : 'Current Organization / College'}
                </label>
                <input
                  id="enq-org"
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Belvo Labs / 25 learners"
                  className="w-full px-3.5 py-2.5 text-sm edu-input rounded-xl"
                />
              </div>
            </div>

            <div>
              <label htmlFor="enq-domain" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Discipline or Specific Course of Interest
              </label>
              <select
                id="enq-domain"
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm edu-input rounded-xl"
              >
                {initialCourseInterest && !BELVO_CATEGORIES.includes(initialCourseInterest as (typeof BELVO_CATEGORIES)[number]) && (
                  <option value={initialCourseInterest}>{initialCourseInterest}</option>
                )}
                {BELVO_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="enq-msg" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Details &amp; Timeline
              </label>
              <textarea
                id="enq-msg"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your learning objectives, cohort timeline, or partnership proposal..."
                className="w-full px-3.5 py-2.5 text-sm edu-input rounded-xl"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#475569]">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                <span>Protected under Belvo privacy policy</span>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-edu-primary px-6 py-2.5 text-sm font-bold disabled:opacity-60 rounded-xl min-h-[44px]"
              >
                {submitting ? 'Submitting...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="edu-panel rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
              <Award className="w-4 h-4" />
              <span>Credential Registry</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-[#0F172A] mt-1.5">
              Verify a Completion Certificate
            </h3>
            <p className="text-xs text-[#475569] mt-2 leading-relaxed">
              Employers and academic registrars can validate any Hridayam by Belvo certificate ID directly against Firestore records.
            </p>

            <form onSubmit={handleVerifyCertificate} className="mt-4 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#1D4ED8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={certLookupId}
                  onChange={(e) => setCertLookupId(e.target.value)}
                  placeholder="Enter Certificate Document ID"
                  aria-label="Certificate ID"
                  className="w-full pl-9 pr-3 py-2 font-mono-tabular text-xs edu-input rounded-xl"
                />
              </div>
              <button
                type="submit"
                disabled={verifyingCert}
                className="btn-edu-primary w-full py-2.5 px-4 text-xs font-bold rounded-xl"
              >
                {verifyingCert ? 'Checking Registry...' : 'Verify Credential'}
              </button>
            </form>

            {verifiedCert === null && (
              <p className="mt-4 text-xs text-[#B91C1C] font-semibold">
                No matching certificate record was found for that ID.
              </p>
            )}
            {verifiedCert && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                <p className="text-xs font-semibold text-[#059669]">Verified Authentic Credential</p>
                <p className="text-sm font-semibold text-emerald-950">{verifiedCert.studentName}</p>
                <p className="text-xs text-emerald-900">{verifiedCert.courseTitle}</p>
                <p className="font-mono-tabular text-[11px] font-bold text-[#059669]">
                  Code: {verifiedCert.certificateCode}
                </p>
              </div>
            )}
          </div>

          <div className="edu-panel rounded-2xl p-6 space-y-3 text-xs text-[#475569]">
            <h3 className="font-display text-base font-semibold text-[#0F172A]">
              Direct Belvo Academic Desk
            </h3>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#1D4ED8] shrink-0" />
              <span>admissions@hridayam.belvo.edu</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1D4ED8] shrink-0" />
              <span>Indiranagar Studio Campus, Bengaluru · Remote Global</span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
