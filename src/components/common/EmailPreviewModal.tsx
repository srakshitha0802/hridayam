import React from 'react';
import { EmailNotification } from '../../types';
import {
  X,
  Mail,
  Printer,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { navigateTo } from '../../utils/navigation';

interface EmailPreviewModalProps {
  notification: EmailNotification | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  notification,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !notification) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleAction = () => {
    onClose();
    if (notification.metadata?.courseId) {
      if (notification.category === 'enrolment') {
        navigateTo(`/learn/${notification.metadata.courseId}`);
      } else if (notification.category === 'certificate') {
        navigateTo(`/verify-certificate?id=${notification.metadata.certificateId || ''}`);
      } else {
        navigateTo(`/course/${notification.metadata.courseId}`);
      }
    } else {
      navigateTo('/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Email Client Simulated Header */}
        <div className="bg-slate-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-tight">Transactional Email Notification</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-teal-900 text-teal-300 font-semibold border border-teal-700">
                  Resend / Belvo Mailer
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Message ID: msg_{notification.id.replace('notif-', '')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Print Email"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Envelope Metadata */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 text-xs space-y-1.5 font-mono text-slate-600">
          <div className="flex justify-between">
            <span><strong>From:</strong> Hridayam Admissions &lt;admissions@belvo.in&gt;</span>
            <span className="text-slate-400 font-sans">{new Date(notification.sentAt).toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span><strong>To:</strong> {notification.recipientName} &lt;{notification.recipientEmail}&gt;</span>
          </div>
          <div className="text-slate-900 font-sans font-semibold pt-1">
            <strong>Subject:</strong> {notification.subject}
          </div>
        </div>

        {/* Email HTML Body Canvas */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-teal-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div>
                <span className="text-base font-bold text-slate-950 tracking-tight">Hridayam</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">by Belvo</span>
              </div>
            </div>
            <span className="text-xs font-mono uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded">
              Verified Transaction
            </span>
          </div>

          {/* Salutation */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-950">
              Hello {notification.recipientName},
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {notification.previewText}
            </p>
          </div>

          {/* Category-Specific Dynamic Email Card */}
          {notification.category === 'payment' && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" />
                  <span>Tax Invoice Breakdown (GST Included)</span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-900">
                  ₹{(notification.metadata?.amount || 0).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 font-mono">
                <div className="flex justify-between">
                  <span>Course Item:</span>
                  <span className="font-semibold text-slate-900 text-right">{notification.metadata?.courseTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Gateway ID:</span>
                  <span className="text-slate-800">{notification.metadata?.paymentId || 'pay_rzp_demo_auth'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Merchant Order ID:</span>
                  <span className="text-slate-800">{notification.metadata?.orderId || 'order_belvo_auth'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="text-slate-800">Razorpay Unified (UPI / Cards)</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                  <span>Total Amount Paid:</span>
                  <span className="text-teal-700">₹{(notification.metadata?.amount || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {notification.category === 'certificate' && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Credential Record Authenticated</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Your certificate for <strong>{notification.metadata?.courseTitle}</strong> has been sealed cryptographically in the official registry.
              </p>
              <div className="pt-2 border-t border-amber-200/60 font-mono text-xs flex flex-wrap justify-between gap-2 text-slate-800">
                <span>Record ID: <strong>{notification.metadata?.certificateId}</strong></span>
                <span>Verification: <strong>{notification.metadata?.verificationCode || 'VERIFIED-BELVO'}</strong></span>
              </div>
            </div>
          )}

          {notification.category === 'enrolment' && (
            <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Immediate Classroom Access Granted</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                You now have unrestricted 24/7 access to all video lessons, project boilerplates, downloadable Figma templates, and the assessment evaluation quiz.
              </p>
            </div>
          )}

          {notification.category === 'quiz' && (
            <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Curriculum Evaluation Result</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Course: <strong>{notification.metadata?.courseTitle}</strong>
              </p>
              <div className="text-sm font-bold text-slate-900">
                Score Achieved: <span className="text-teal-700">{notification.metadata?.quizScore}%</span>
              </div>
            </div>
          )}

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleAction}
              className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {notification.category === 'enrolment' ? 'Enter Classroom' : notification.category === 'certificate' ? 'Verify Certificate' : 'Go to Course'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>

          {/* Footer Fine Print */}
          <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 space-y-1">
            <p>Hridayam by Belvo Digital Academy · Bengaluru, Karnataka, India</p>
            <p>Support & Admissions: learning@belvo.com · +91 (0) 80 4120 7800</p>
            <p className="font-mono text-[10px]">Security notice: Official emails from Belvo are cryptographically signed via DKIM & SPF.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
