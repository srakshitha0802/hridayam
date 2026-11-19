import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { REFER_EARN_PROGRAMS, REFER_EARN_FAQS, ITV_COURSES } from '../data/itvedantData';
import { ReferralSubmission } from '../types';

interface ReferEarnViewProps {
  onReferralSuccess?: (submission: ReferralSubmission) => void;
}

export const ReferEarnView: React.FC<ReferEarnViewProps> = ({ onReferralSuccess }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [generatedRefCode, setGeneratedRefCode] = useState('');

  const [formData, setFormData] = useState({
    referrerName: '',
    referrerPhone: '',
    referrerEmail: '',
    referrerRole: 'Current Student',
    friendName: '',
    friendPhone: '',
    friendEmail: '',
    interestedCourse: 'Master in Data Science and Analytics with AI',
    preferredCenter: 'Thane Head Office',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.referrerName || !formData.referrerPhone || !formData.friendName || !formData.friendPhone) {
      return;
    }

    const refCode = `HRD-REF-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRefCode(refCode);

    const newSubmission: ReferralSubmission = {
      id: `ref_${Date.now()}`,
      referrerName: formData.referrerName,
      referrerPhone: formData.referrerPhone,
      referrerEmail: formData.referrerEmail,
      referrerRole: formData.referrerRole,
      friendName: formData.friendName,
      friendPhone: formData.friendPhone,
      friendEmail: formData.friendEmail,
      interestedCourse: formData.interestedCourse,
      preferredCenter: formData.preferredCenter,
      rewardStatus: 'Pending Verification',
      voucherCode: 'PENDING_ADMISSION',
      referralCode: refCode,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('itv_referrals_v1') || '[]');
      localStorage.setItem('itv_referrals_v1', JSON.stringify([newSubmission, ...existing]));
    } catch {}

    if (onReferralSuccess) {
      onReferralSuccess(newSubmission);
    }

    setFormSubmitted(true);
  };

  const handleCopyCode = () => {
    const shareText = `Hey! Check out Hridayam by Belvo's career programs with 100% placement assurance. Use my referral code ${generatedRefCode} or enroll here: https://itvedant.com/ref?code=${generatedRefCode}`;
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="space-y-16 pb-20 relative z-10 text-slate-900">
      {/* Breadcrumb Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-blue-600">Refer and Earn</span>
        </div>
      </div>

      {/* 1. HERO SECTION (BLUE-WHITE PREMIUM TEXTURE) */}
      <section className="pt-4 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                <GoogleIcon name="redeem" size={17} className="text-blue-600" />
                <span>Share Knowledge & Get Rewarded</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-display leading-tight">
                Refer your friend and someone you know and earn an{' '}
                <span className="text-blue-600">
                  Amazon Gift voucher upto 5000 !!
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Share the gift of education with your friends and get a chance of earning upto ₹5000 Amazon vouchers on every successful enrollment!
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#refer-form"
                  className="btn-blue-primary px-7 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-xl flex items-center gap-2"
                >
                  <GoogleIcon name="redeem" size={17} />
                  <span>Refer Now</span>
                  <GoogleIcon name="arrow_downward" size={16} />
                </a>
                <a
                  href="#refer-policy"
                  className="px-5 py-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all"
                >
                  <GoogleIcon name="description" size={17} />
                  <span>Refer & Earn Policy</span>
                </a>
              </div>
            </div>

            {/* Right Graphic: Amazon Voucher & Graphic Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-xl text-center space-y-4 text-slate-900">
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-sky-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <GoogleIcon name="featured_seasonal_and_gifts" size={32} filled />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase text-blue-600 tracking-wider">
                    Official Referral Reward
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 font-display mt-1">
                    Amazon Voucher
                  </div>
                  <div className="text-2xl font-bold text-blue-600 font-display mt-0.5">
                    Upto ₹5,000 / Referral
                  </div>
                </div>
                <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-100 text-xs text-slate-700 space-y-1.5 text-left">
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <GoogleIcon name="check_circle" size={16} className="text-blue-600" filled />
                    <span>Instant Amazon e-Voucher Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <GoogleIcon name="check_circle" size={16} className="text-blue-600" filled />
                    <span>No Upper Limit on Referrals</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <GoogleIcon name="check_circle" size={16} className="text-blue-600" filled />
                    <span>Valid for All Classroom & Online Batches</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IT TAKES ONLY 2 STEPS TO UNLOCK THE BENEFIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase text-blue-600 tracking-widest">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            It takes only 2 steps to unlock the benefit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            No complex hurdles or prolonged waiting. Transparent and direct rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Step 01 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 shadow-md space-y-4 text-center text-slate-900">
            <div className="w-14 h-14 bg-blue-50 border border-blue-200 text-blue-700 rounded-2xl font-bold text-xl flex items-center justify-center mx-auto shadow-sm font-display">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Step 01: Fill up a Form
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fill our Refer & Earn Form mentioned below. Add all the mandatory details of your referred friend (Name, Contact No, Course interest, and preferred learning center).
            </p>
          </div>

          {/* Step 02 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 shadow-md space-y-4 text-center text-slate-900">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-sky-600 text-white rounded-2xl font-bold text-xl flex items-center justify-center mx-auto shadow-md font-display border border-blue-300">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Step 02: Reward Received
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You will receive a referral reward/voucher once your referee completes their admission and pays the first 20% of their course fees! Voucher sent to WhatsApp & Email.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM-WISE REWARD BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-xl space-y-8 border-2 border-blue-200 text-slate-900">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase text-blue-600 tracking-widest">
              Reward Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              By referring below mentioned programs you and your friends will receive respective benefits
            </h2>
          </div>

          {/* Amazon Voucher Visual Mockup */}
          <div className="max-w-md mx-auto bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 rounded-3xl p-6 text-white shadow-xl border-4 border-blue-200 text-center space-y-1.5">
            <div className="text-xs font-bold tracking-widest uppercase text-sky-100">amazon.com Gift Voucher</div>
            <div className="text-4xl sm:text-5xl font-bold font-display text-white">₹5000</div>
            <div className="text-[11px] font-medium text-sky-100">
              Redeemable for any product on Amazon India
            </div>
          </div>

          {/* Program Cards Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {REFER_EARN_PROGRAMS.map((item, index) => (
              <div
                key={index}
                className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 flex flex-col justify-between group hover:border-blue-400 transition-all shadow-sm text-slate-900"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                      {item.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{item.courseDuration}</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors leading-snug">
                    {item.courseName}
                  </h4>
                  <p className="text-xs text-blue-600 font-medium">{item.category}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-blue-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Voucher:</span>
                  <span className="text-base font-bold text-blue-600 font-display">
                    ₹{item.voucherAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE INTERACTIVE REFER & EARN FORM */}
      <section id="refer-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase text-blue-600 tracking-widest">
            Enter Details
          </span>
          <h2 className="text-3xl font-bold text-slate-900 font-display">
            Refer & Earn
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Fill all the mandatory details in the below form to ensure correct credit of your Amazon Gift Voucher.
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border-2 border-blue-200 shadow-xl text-slate-900">
          {formSubmitted ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-sky-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <GoogleIcon name="check" size={32} weight={600} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Referral Successfully Registered!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  We have logged your recommendation for <strong className="text-slate-900">{formData.friendName}</strong>. Our counselors will reach out to them within 2 hours.
                </p>
              </div>

              {/* Unique Referral Code Badge */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 max-w-md mx-auto space-y-3">
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                  Your Unique Referral Code
                </span>
                <div className="text-2xl font-bold text-slate-900 font-mono tracking-wider">
                  {generatedRefCode}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-white shadow-sm"
                  >
                    <GoogleIcon name={copiedLink ? 'done' : 'content_copy'} size={16} />
                    <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Referral Link'}</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Hey! Check out Hridayam by Belvo's 100% placement IT courses in Data Science, Full Stack & Cloud. Use my referral code ${generatedRefCode} for exclusive student benefits: https://itvedant.com`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({
                    ...formData,
                    friendName: '',
                    friendPhone: '',
                    friendEmail: '',
                  });
                }}
                className="text-xs font-semibold text-blue-600 underline cursor-pointer hover:text-blue-800"
              >
                Refer another friend now
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Part 1: Your Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
                  <GoogleIcon name="person" size={20} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-base font-display">
                    Your Details (Referrer)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Your Full Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sameer Kulkarni"
                      value={formData.referrerName}
                      onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Your Contact Number (for Voucher Delivery) <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.referrerPhone}
                      onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="sameer@example.com"
                      value={formData.referrerEmail}
                      onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Are you an enrolled learner?</label>
                    <select
                      value={formData.referrerRole}
                      onChange={(e) => setFormData({ ...formData, referrerRole: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 bg-white"
                    >
                      <option value="Current Student" className="bg-white text-slate-900">Current Enrolled Student</option>
                      <option value="Placed Alumni" className="bg-white text-slate-900">Placed Alumni</option>
                      <option value="External Advocate" className="bg-white text-slate-900">External Friend / Advocate</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Part 2: Your Friend's Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
                  <GoogleIcon name="redeem" size={20} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-base font-display">
                    Your Friend's Details (Referee)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Friend's Full Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Deshpande"
                      value={formData.friendName}
                      onChange={(e) => setFormData({ ...formData, friendName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Friend's Contact Number <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 91234 56789"
                      value={formData.friendPhone}
                      onChange={(e) => setFormData({ ...formData, friendPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Friend's Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="friend@example.com"
                      value={formData.friendEmail}
                      onChange={(e) => setFormData({ ...formData, friendEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Course Friend is Interested In</label>
                    <select
                      value={formData.interestedCourse}
                      onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 bg-white"
                    >
                      {ITV_COURSES.map((course) => (
                        <option key={course.id} value={course.title} className="bg-white text-slate-900">
                          {course.shortTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl btn-blue-primary font-semibold text-xs uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 text-white"
              >
                <span>Submit Referral & Unlock Benefit</span>
                <GoogleIcon name="rocket_launch" size={18} className="text-white" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 5. REFER & EARN FAQ ACCORDION */}
      <section id="refer-policy" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase text-blue-600 tracking-widest">
            Policy Guidelines
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Frequently Asked Questions About Our Refer & Earn Policy
          </h2>
        </div>

        <div className="space-y-3">
          {REFER_EARN_FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden transition-all shadow-md border border-blue-200 text-slate-900"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left font-semibold text-slate-900 text-sm flex items-center justify-between gap-4 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-bold text-blue-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <GoogleIcon
                    name="keyboard_arrow_down"
                    size={20}
                    className={`text-blue-600 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-800' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-blue-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
