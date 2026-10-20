import React from 'react';
import { ShieldCheck, FileText, RefreshCw } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-teal-700 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Governance & Compliance</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026 · Belvo Learning Practice</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            Hridayam collects only necessary student identification data (name, email address, password hash, and learning progress records) required to provision access to lessons, score assessments, and generate tamper-evident completion certificates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Payment & Financial Data</h2>
          <p>
            Payment transactions are processed directly by authorized payment gateway partners (such as Razorpay). Hridayam does not store raw credit card numbers or banking credentials on our application servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Certificate Verification Registry</h2>
          <p>
            When a student is awarded an official Certificate of Completion, the student’s name, course title, and issue date are registered with a public verification ID to allow third-party credential validation by employers and institutions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Contact & Inquiries</h2>
          <p>
            For data privacy inquiries or account deletion requests, email our data governance officer at{' '}
            <strong className="text-slate-900">privacy@belvo.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-teal-700 font-semibold">
          <FileText className="w-4 h-4" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">Terms and Conditions</h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026 · Hridayam by Belvo</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By registering for an account or enrolling in any free or paid course on Hridayam by Belvo, you agree to comply with and be legally bound by these terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Intellectual Property Rights</h2>
          <p>
            All video lectures, downloadable source codes, assessment prompts, and syllabus documentation are the proprietary intellectual property of Belvo. Materials are licensed for individual educational use only.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Assessment Academic Integrity</h2>
          <p>
            Students must complete quizzes and assignments independently. Any attempt to tamper with grading parameters or fabricate completion criteria will result in immediate revocation of certificates.
          </p>
        </section>
      </div>
    </div>
  );
};

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-teal-700 font-semibold">
          <RefreshCw className="w-4 h-4" />
          <span>Fair Purchase Guarantee</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">Refund and Cancellation Policy</h1>
        <p className="text-xs text-slate-500">Effective Date: October 2026 · Belvo Learning Practice</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. 7-Day Refund Window</h2>
          <p>
            If you enroll in a paid masterclass and find the curriculum does not meet your professional objectives, you may request a 100% full refund within 7 calendar days of your initial purchase date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Eligibility Conditions</h2>
          <p>
            To maintain fairness and protect proprietary course frameworks, refund eligibility requires that you have accessed less than 30% of the course lesson units and have not taken or submitted the final assessment quiz.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Processing Time</h2>
          <p>
            Approved refunds are credited back to the original payment method (via Razorpay or bank transfer) within 5–7 business days.
          </p>
        </section>
      </div>
    </div>
  );
};
