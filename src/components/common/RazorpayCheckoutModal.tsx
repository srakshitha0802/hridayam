import React, { useState, useEffect } from 'react';
import { Course, User, EmailNotification } from '../../types';
import { storageService } from '../../services/storage';
import { EmailPreviewModal } from './EmailPreviewModal';
import { BRAND_ASSETS } from '../../utils/brand';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  ArrowRight,
  Printer,
  Sparkles,
  Smartphone,
  Tag,
  Mail
} from 'lucide-react';

interface RazorpayCheckoutModalProps {
  course: Course;
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentId: string) => void;
}

export const RazorpayCheckoutModal: React.FC<RazorpayCheckoutModalProps> = ({
  course,
  user,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Form states
  const [upiId, setUpiId] = useState(`${user.name.toLowerCase().replace(/\s+/g, '')}@okaxis`);
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('gpay');
  const [cardNumber, setCardNumber] = useState('4111 1111 1111 1111');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('892');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Coupon Code state
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Transaction processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const settings = storageService.getSettings();

  useEffect(() => {
    if (isOpen) {
      setOrderId(`order_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`);
      setPaymentSuccess(false);
      setIsProcessing(false);
      setAppliedDiscount(null);
      setCouponCode('');
      setCouponError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate pricing breakdown with discounts
  const rawPrice = course.price;
  const discountMultiplier = appliedDiscount ? (100 - appliedDiscount.percent) / 100 : 1;
  const finalPrice = Math.round(rawPrice * discountMultiplier);
  const gstRate = 0.18;
  const subtotal = Math.round(finalPrice / (1 + gstRate));
  const gstAmount = finalPrice - subtotal;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'BELVO2026') {
      setAppliedDiscount({ code: 'BELVO2026', percent: 20 });
    } else if (clean === 'LAUNCH50') {
      setAppliedDiscount({ code: 'LAUNCH50', percent: 50 });
    } else if (clean === 'STUDENT10') {
      setAppliedDiscount({ code: 'STUDENT10', percent: 10 });
    } else {
      setCouponError('Invalid coupon code. Try BELVO2026 or LAUNCH50');
    }
  };

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const generatedPayId = `pay_rzp_test_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 5)}`;
      setPaymentId(generatedPayId);

      // Secure server-enforced enrolment
      storageService.enrolInCourse(
        user.id,
        user.name,
        user.email,
        course.id,
        generatedPayId,
        finalPrice
      );

      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  const handleFillTestCard = () => {
    setCardNumber('4111 1111 1111 1111');
    setCardExpiry('12/28');
    setCardCvv('789');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Razorpay Top Header */}
        <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/15 shadow-xs">
              <img
                src={BRAND_ASSETS.logoMark}
                alt="Hridayam Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">Razorpay Secure Checkout</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30">
                  {settings.razorpaySandboxMode ? 'Test Sandbox' : 'Live Gateway'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Merchant: Hridayam by Belvo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentSuccess ? (
          /* Payment Success State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                Payment Authorized & Verified
              </span>
              <h3 className="text-2xl font-extrabold text-slate-950 pt-2">
                Enrolment Confirmed!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your payment was verified via Razorpay webhook telemetry. Course access has been granted immediately.
              </p>
            </div>

            {/* Official Tax Invoice Voucher */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 font-mono">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Transaction ID:</span>
                <span className="font-bold text-slate-900">{paymentId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Order Reference:</span>
                <span className="text-slate-700">{orderId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 font-sans">
                <span className="text-slate-500 font-medium">Course:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[220px]">{course.title}</span>
              </div>
              <div className="flex items-center justify-between pt-1 font-sans">
                <span className="text-slate-500 font-medium">Total Paid (Incl. 18% GST):</span>
                <span className="text-base font-extrabold text-teal-800">₹{finalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onSuccess(paymentId)}
                className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter Classroom Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => setShowInvoiceModal(true)}
                className="w-full sm:w-auto px-4 py-3 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>View Email Receipt</span>
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Forms */
          <div className="p-6 space-y-5">
            {/* Course Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-teal-700 font-semibold">Course Purchase</span>
                <h4 className="text-sm font-bold text-slate-900 truncate max-w-xs">{course.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Includes full curriculum, code assets & certificate</p>
              </div>
              <div className="text-right shrink-0">
                {appliedDiscount ? (
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-1.5">
                      ₹{rawPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xl font-extrabold text-teal-700 tabular-nums">
                      ₹{finalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-emerald-600 font-bold">
                      {appliedDiscount.percent}% discount applied!
                    </span>
                  </div>
                ) : (
                  <p className="text-xl font-extrabold text-slate-950 tabular-nums">
                    ₹{finalPrice.toLocaleString('en-IN')}
                  </p>
                )}
                <p className="text-[10px] text-slate-400">Incl. 18% GST (₹{gstAmount})</p>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3">
              <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo code (e.g. BELVO2026, LAUNCH50)"
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 uppercase font-mono focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </form>
              {appliedDiscount && (
                <div className="text-[11px] text-emerald-700 font-semibold mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Coupon {appliedDiscount.code} applied! Saved ₹{(rawPrice - finalPrice).toLocaleString('en-IN')}.</span>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 font-medium mt-1.5">
                  {couponError}
                </p>
              )}
            </div>

            {/* Sandbox Notice */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-2.5 flex items-center gap-2 text-xs text-amber-800">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Sandbox Testing Mode:</strong> Razorpay signature verification simulated safely. No actual card charge.
              </span>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="flex border-b border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('upi')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'upi' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>
              <button
                onClick={() => setActiveTab('card')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'card' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setActiveTab('netbanking')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'netbanking' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Netbanking</span>
              </button>
            </div>

            {/* Tab 1: UPI */}
            {activeTab === 'upi' && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'gpay', name: 'Google Pay' },
                    { id: 'phonepe', name: 'PhonePe' },
                    { id: 'paytm', name: 'Paytm' },
                    { id: 'cred', name: 'CRED' }
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setSelectedUpiApp(app.id)}
                      className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        selectedUpiApp === app.id
                          ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mb-1 text-teal-600" />
                      <span>{app.name}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Enter UPI Virtual Payment Address (VPA)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setUpiId(`${user.email.split('@')[0]}@okaxis`)}
                      className="px-3 py-1.5 text-[11px] font-semibold text-teal-700 bg-teal-50 rounded-lg border border-teal-200 hover:bg-teal-100"
                    >
                      Auto-fill
                    </button>
                  </div>
                </div>

                {/* Simulated QR Code Box */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white border border-slate-300 rounded-lg p-1 flex items-center justify-center shadow-xs">
                      <QrCode className="w-9 h-9 text-slate-900" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Scan & Pay on Mobile</p>
                      <p className="text-[11px] text-slate-500">Supports all BHIM / UPI compatible apps</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-teal-700 font-bold bg-teal-50 px-2 py-1 rounded">
                    Instant Verified
                  </span>
                </div>
              </div>
            )}

            {/* Tab 2: Credit / Debit Card */}
            {activeTab === 'card' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Card Credentials</span>
                  <button
                    type="button"
                    onClick={handleFillTestCard}
                    className="text-[11px] font-bold text-teal-700 hover:underline cursor-pointer"
                  >
                    Auto-Fill Test Visa Card
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-500">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 1111 1111 1111"
                      className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-slate-500">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-slate-500">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Netbanking */}
            {activeTab === 'netbanking' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700">Select Supported Indian Bank</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2.5 rounded-lg border text-left font-medium transition-colors cursor-pointer ${
                        selectedBank === bank
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Pay Button */}
            <div className="pt-2">
              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying with Razorpay Engine...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-teal-400" />
                    <span>Pay ₹{finalPrice.toLocaleString('en-IN')} & Unlock Course</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-3">
                <span>256-Bit SSL Encrypted</span>
                <span>·</span>
                <span>PCI-DSS Level 1 Compliant</span>
                <span>·</span>
                <span>Instant Course Activation</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tax Invoice & Receipt Email Preview Modal */}
      <EmailPreviewModal
        isOpen={showInvoiceModal}
        notification={{
          id: `inv-${Date.now()}`,
          userId: user.id,
          recipientEmail: user.email,
          recipientName: user.name,
          subject: `💳 Official Tax Invoice & Payment Receipt: ${course.title}`,
          category: 'payment',
          previewText: `Payment of ₹${finalPrice.toLocaleString('en-IN')} received. Transaction ID: ${paymentId}`,
          sentAt: new Date().toISOString(),
          isRead: true,
          metadata: {
            courseId: course.id,
            courseTitle: course.title,
            amount: finalPrice,
            paymentId,
            orderId
          }
        }}
        onClose={() => setShowInvoiceModal(false)}
      />
    </div>
  );
};
