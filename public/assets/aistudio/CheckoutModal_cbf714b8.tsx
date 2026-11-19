import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { SubscriptionPlan } from '../data/catalogSeed';
import { enrolStudentInCourse } from '../lib/firestoreService';
import { Course, Enrolment } from '../types';
import { useAuth } from '../context/AuthContext';

export type CheckoutTarget =
  | { kind: 'course'; course: Course }
  | { kind: 'subscription'; plan: SubscriptionPlan; billingCycle: 'monthly' | 'annual' };

interface CheckoutModalProps {
  target: CheckoutTarget;
  onClose: () => void;
  onSuccessCourse: (enrolment: Enrolment, course: Course) => void;
  onSuccessSubscription: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export function CheckoutModal({
  target,
  onClose,
  onToast,
}: CheckoutModalProps) {
  const { user, isAdmin, subscription, signInWithGoogle } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('student@oksbi');
  const [sendEmailReceipt, setSendEmailReceipt] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<{
    txnId: string;
    amount: number;
    date: string;
    method: string;
  } | null>(null);

  const isFreeOrCovered =
    target.kind === 'course' &&
    (target.course.isFree || (Boolean(subscription) && target.course.includedInSubscription));

  const amountDue =
    target.kind === 'course'
      ? isFreeOrCovered
        ? 0
        : target.course.price
      : target.billingCycle === 'annual'
      ? target.plan.annualTotal
      : target.plan.monthlyPrice;

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      let activeUser = user;
      if (!activeUser) {
        activeUser = await signInWithGoogle();
      }
      if (!activeUser) {
        onToast('error', 'Sign-in required', 'Please sign in to complete enrolment.');
        setProcessing(false);
        return;
      }

      const txnId = `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      if (target.kind === 'course') {
        const paymentType = target.course.isFree
          ? 'free'
          : subscription && target.course.includedInSubscription
          ? 'subscription'
          : 'one_time';

        await enrolStudentInCourse(
          activeUser,
          isAdmin,
          target.course,
          paymentType,
          amountDue
        );

        setCompletedReceipt({
          txnId,
          amount: amountDue,
          date: new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          method: amountDue === 0 ? 'Free Scholarship Access' : paymentMethod.toUpperCase(),
        });

        onToast(
          'success',
          'Enrolment Confirmed!',
          `Welcome to ${target.course.title}! Start your modules in the student dashboard.`
        );
      }
    } catch (err) {
      console.error(err);
      onToast('error', 'Payment confirmation failed', 'Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-heading"
    >
      <div className="glass-dark rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-sky-400/40 relative text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-sky-400/30 bg-black/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-sky-600 text-white flex items-center justify-center shadow-xs">
              <GoogleIcon name="payments" size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-sky-300 uppercase tracking-wider">
                Hridayam by Belvo Secure Checkout
              </p>
              <h2 id="checkout-heading" className="font-display text-base sm:text-lg font-bold text-white">
                {target.kind === 'course' ? 'Confirm Course Enrolment' : 'Activate Membership Plan'}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-sky-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <GoogleIcon name="close" size={20} />
          </button>
        </div>

        {completedReceipt ? (
          /* Receipt View */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <GoogleIcon name="check" size={32} />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-900/80 text-sky-200 text-[10px] font-bold uppercase tracking-wider mb-1 border border-sky-400/30">
                Payment Confirmed
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                Enrolment Successful!
              </h3>
              <p className="text-xs text-sky-200 mt-1">
                Welcome to Hridayam by Belvo. Your studio materials and labs are now ready.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-black/35 rounded-2xl p-4 text-xs space-y-2.5 text-left border border-sky-400/30">
              <div className="flex justify-between pb-2 border-b border-sky-400/25">
                <span className="text-sky-200">Transaction ID</span>
                <span className="font-mono font-bold text-white">{completedReceipt.txnId}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-sky-400/25">
                <span className="text-sky-200">Item</span>
                <span className="font-semibold text-white max-w-[200px] truncate text-right">
                  {target.kind === 'course' ? target.course.title : target.plan.name}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-sky-400/25">
                <span className="text-sky-200">Amount Paid</span>
                <span className="font-bold text-sky-300">
                  {completedReceipt.amount === 0 ? 'Free Access' : `₹${completedReceipt.amount.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-sky-400/25">
                <span className="text-sky-200">Payment Channel</span>
                <span className="font-semibold text-white">{completedReceipt.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sky-200">Date &amp; Time</span>
                <span className="font-semibold text-white">{completedReceipt.date}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-xl btn-blue-primary font-bold text-xs uppercase tracking-wider text-white shadow-xl cursor-pointer"
              >
                Go to Student Learning Dashboard
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-xl btn-blue-glass text-white hover:border-sky-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Print / Save Tax Invoice
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleConfirm} className="p-6 space-y-4 text-white">
            <div className="p-4 bg-black/35 rounded-2xl flex items-start justify-between gap-4 border border-sky-400/30">
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-sky-300 uppercase tracking-wider">
                  {target.kind === 'course'
                    ? target.course.category
                    : `${target.billingCycle === 'annual' ? 'Annual' : 'Monthly'} Subscription`}
                </p>
                <p className="font-display text-sm font-bold text-white mt-0.5 leading-snug">
                  {target.kind === 'course' ? target.course.title : target.plan.name}
                </p>
                {target.kind === 'course' && (
                  <p className="text-[11px] text-sky-200 mt-1">
                    {target.course.durationHours ? `${target.course.durationHours} Hours` : '6 Months'} • 100% Placement Support
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-xl font-bold text-sky-300">
                  {amountDue === 0 ? 'Free' : `₹${amountDue.toLocaleString()}`}
                </p>
                {amountDue > 0 && target.kind === 'course' && (
                  <span className="text-[10px] text-sky-200 font-semibold block">
                    0% EMI available
                  </span>
                )}
              </div>
            </div>

            {!user && (
              <div className="p-3 bg-blue-950/80 border border-sky-400/30 rounded-xl text-xs text-sky-200 flex items-start gap-2">
                <GoogleIcon name="account_circle" size={18} className="text-sky-300 shrink-0 mt-0.5" />
                <span>
                  One-click Google or guest sign-in will securely link your LMS progress, verifiable certificates, and project reviews.
                </span>
              </div>
            )}

            {amountDue > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-sky-200 uppercase tracking-wider text-[11px]">
                  Select Payment Gateway
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-black/30 border-sky-400/30 text-sky-200 hover:text-white hover:border-sky-300'
                    }`}
                  >
                    <GoogleIcon name="qr_code_2" size={18} />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-black/30 border-sky-400/30 text-sky-200 hover:text-white hover:border-sky-300'
                    }`}
                  >
                    <GoogleIcon name="credit_card" size={18} />
                    <span>Card / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'netbanking'
                        ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-black/30 border-sky-400/30 text-sky-200 hover:text-white hover:border-sky-300'
                    }`}
                  >
                    <GoogleIcon name="account_balance" size={18} />
                    <span>NetBanking</span>
                  </button>
                </div>

                {paymentMethod === 'upi' ? (
                  <div className="p-3.5 bg-black/30 rounded-2xl border border-sky-400/30 space-y-2">
                    <label htmlFor="chk-upi" className="block text-[11px] font-semibold text-sky-200">
                      Enter UPI ID (Google Pay, PhonePe, Paytm)
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="chk-upi"
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okaxis"
                        className="flex-1 px-3 py-2 text-xs rounded-xl glass-input"
                      />
                      <span className="px-3 py-2 bg-blue-900/80 text-sky-200 text-[11px] font-bold rounded-xl flex items-center border border-sky-400/30">
                        Verified
                      </span>
                    </div>
                    <div className="text-[10px] text-sky-300 flex items-center gap-1">
                      <GoogleIcon name="verified" size={14} className="text-sky-300" />
                      Zero surcharge on all UPI transactions.
                    </div>
                  </div>
                ) : paymentMethod === 'card' ? (
                  <div className="p-3.5 bg-black/30 rounded-2xl border border-sky-400/30 space-y-2">
                    <label htmlFor="chk-card-last4" className="block text-[11px] font-semibold text-sky-200">
                      Card Number (Simulated 16 Digits)
                    </label>
                    <input
                      id="chk-card-last4"
                      type="text"
                      maxLength={19}
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3 py-2 text-xs rounded-xl glass-input font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="08/28"
                        className="w-full px-3 py-2 rounded-xl glass-input"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        defaultValue="888"
                        maxLength={3}
                        className="w-full px-3 py-2 rounded-xl glass-input"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-black/30 rounded-2xl border border-sky-400/30 space-y-2">
                    <label className="block text-[11px] font-semibold text-sky-200">
                      Select Popular Bank
                    </label>
                    <select className="w-full px-3 py-2 text-xs rounded-xl glass-input">
                      <option className="bg-[#0A1633] text-white">HDFC Bank</option>
                      <option className="bg-[#0A1633] text-white">State Bank of India (SBI)</option>
                      <option className="bg-[#0A1633] text-white">ICICI Bank</option>
                      <option className="bg-[#0A1633] text-white">Axis Bank</option>
                      <option className="bg-[#0A1633] text-white">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            <label className="flex items-center gap-2 text-xs text-sky-200 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={sendEmailReceipt}
                onChange={(e) => setSendEmailReceipt(e.target.checked)}
                className="rounded accent-[#3869C3] cursor-pointer"
              />
              <GoogleIcon name="mail" size={16} className="text-sky-300" />
              <span>Send payment receipt, tax invoice &amp; syllabus to email</span>
            </label>

            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-sky-300 font-semibold">
                <GoogleIcon name="lock" size={14} className="text-sky-300" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <button
                type="submit"
                disabled={processing}
                className="btn-blue-primary px-6 py-3 text-xs font-bold disabled:opacity-60 rounded-xl cursor-pointer shadow-xl flex items-center gap-1.5 uppercase tracking-wider text-white"
              >
                {processing ? (
                  <>
                    <GoogleIcon name="sync" size={16} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : amountDue === 0 ? (
                  'Confirm Free Enrolment'
                ) : (
                  `Pay ₹${amountDue.toLocaleString()} & Enrol`
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
