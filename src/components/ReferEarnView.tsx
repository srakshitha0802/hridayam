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
    <div className="space-y-16 pb-20 relative z-10 text-white">
      {/* Breadcrumb Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-xs text-pink-200 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-pink-300">Refer and Earn</span>
        </div>
      </div>

      {/* 1. HERO SECTION (DARKEST TRANSPARENT PINK GLASS STYLE) */}
      <section className="pt-4 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/80 text-pink-200 border border-pink-400/40 text-xs font-semibold backdrop-blur-md">
                <GoogleIcon name="redeem" size={17} className="text-pink-300" />
                <span>Share Knowledge & Get Rewarded</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display leading-tight">
                Refer your friend and someone you know and earn an{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-pink-100">
                  Amazon Gift voucher upto 5000 !!
                </span>
              </h1>

              <p className="text-pink-100 text-sm sm:text-base leading-relaxed max-w-xl">
                Share the gift of education with your friends and get a chance of earning upto ₹5000 Amazon vouchers on every successful enrollment!
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#refer-form"
                  className="btn-pink-primary px-7 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-xl flex items-center gap-2"
                >
                  <GoogleIcon name="redeem" size={17} />
                  <span>Refer Now</span>
                  <GoogleIcon name="arrow_downward" size={16} />
                </a>
                <a
                  href="#refer-policy"
                  className="btn-pink-glass px-5 py-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-white"
                >
                  <GoogleIcon name="description" size={17} />
                  <span>Refer & Earn Policy</span>
                </a>
              </div>
            </div>

            {/* Right Graphic: Amazon Voucher & Graphic Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md glass-dark rounded-3xl p-6 sm:p-8 border-2 border-pink-400/40 shadow-2xl text-center space-y-4 text-white">
                <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                  <GoogleIcon name="featured_seasonal_and_gifts" size={32} filled />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase text-pink-300 tracking-wider">
                    Official Referral Reward
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-white font-display mt-1">
                    Amazon Voucher
                  </div>
                  <div className="text-2xl font-bold text-pink-300 font-display mt-0.5">
                    Upto ₹5,000 / Referral
                  </div>
                </div>
                <div className="bg-black/35 rounded-2xl p-4 border border-pink-400/30 text-xs text-pink-100 space-y-1.5 text-left">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <GoogleIcon name="check_circle" size={16} className="text-pink-300" filled />
                    <span>Instant Amazon e-Voucher Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <GoogleIcon name="check_circle" size={16} className="text-pink-300" filled />
                    <span>No Upper Limit on Referrals</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <GoogleIcon name="check_circle" size={16} className="text-pink-300" filled />
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
          <span className="text-xs font-semibold uppercase text-pink-300 tracking-widest">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            It takes only 2 steps to unlock the benefit
          </h2>
          <p className="text-xs sm:text-sm text-pink-200">
            No complex hurdles or prolonged waiting. Transparent and direct rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Step 01 */}
          <div className="glass-dark rounded-3xl p-8 border border-pink-400/40 shadow-xl space-y-4 text-center text-white">
            <div className="w-14 h-14 bg-pink-900/90 border border-pink-400/40 text-white rounded-2xl font-bold text-xl flex items-center justify-center mx-auto shadow-md font-display">
              01
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Step 01: Fill up a Form
            </h3>
            <p className="text-xs text-pink-200 leading-relaxed">
              Fill our Refer & Earn Form mentioned below. Add all the mandatory details of your referred friend (Name, Contact No, Course interest, and preferred learning center).
            </p>
          </div>

          {/* Step 02 */}
          <div className="glass-dark rounded-3xl p-8 border border-pink-400/40 shadow-xl space-y-4 text-center text-white">
            <div className="w-14 h-14 bg-gradient-to-tr from-pink-600 to-rose-600 text-white rounded-2xl font-bold text-xl flex items-center justify-center mx-auto shadow-md font-display border border-pink-300/40">
              02
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Step 02: Reward Received
            </h3>
            <p className="text-xs text-pink-200 leading-relaxed">
              You will receive a referral reward/voucher once your referee completes their admission and pays the first 20% of their course fees! Voucher sent to WhatsApp & Email.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM-WISE REWARD BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-dark rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 border-2 border-pink-400/40">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase text-pink-300 tracking-widest">
              Reward Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              By referring below mentioned programs you and your friends will receive respective benefits
            </h2>
          </div>

          {/* Amazon Voucher Visual Mockup in Metallic Pink */}
          <div className="max-w-md mx-auto bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 rounded-3xl p-6 text-white shadow-2xl border-4 border-pink-300/40 text-center space-y-1.5">
            <div className="text-xs font-bold tracking-widest uppercase text-pink-100">amazon.com Gift Voucher</div>
            <div className="text-4xl sm:text-5xl font-bold font-display text-white">₹5000</div>
            <div className="text-[11px] font-medium text-pink-100">
              Redeemable for any product on Amazon India
            </div>
          </div>

          {/* Program Cards Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {REFER_EARN_PROGRAMS.map((item, index) => (
              <div
                key={index}
                className="bg-black/35 backdrop-blur-md border border-pink-400/30 rounded-2xl p-5 flex flex-col justify-between group hover:border-pink-300 transition-all shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-pink-200 bg-pink-900/80 px-2 py-0.5 rounded border border-pink-400/30">
                      {item.badge}
                    </span>
                    <span className="text-xs text-pink-200 font-medium">{item.courseDuration}</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm group-hover:text-pink-200 transition-colors leading-snug">
                    {item.courseName}
                  </h4>
                  <p className="text-xs text-pink-300">{item.category}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-pink-400/25 flex items-center justify-between">
                  <span className="text-xs text-pink-200 font-medium">Voucher:</span>
                  <span className="text-base font-bold text-pink-200 font-display">
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
          <span className="text-xs font-semibold uppercase text-pink-300 tracking-widest">
            Enter Details
          </span>
          <h2 className="text-3xl font-bold text-white font-display">
            Refer & Earn
          </h2>
          <p className="text-xs sm:text-sm text-pink-200">
            Fill all the mandatory details in the below form to ensure correct credit of your Amazon Gift Voucher.
          </p>
        </div>

        <div className="glass-dark rounded-3xl p-6 sm:p-10 border-2 border-pink-400/40 shadow-2xl backdrop-blur-2xl text-white">
          {formSubmitted ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <GoogleIcon name="check" size={32} weight={600} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Referral Successfully Registered!
                </h3>
                <p className="text-xs sm:text-sm text-pink-200 mt-1 max-w-md mx-auto">
                  We have logged your recommendation for <strong>{formData.friendName}</strong>. Our counselors will reach out to them within 2 hours.
                </p>
              </div>

              {/* Unique Referral Code Badge */}
              <div className="bg-black/40 border border-pink-400/40 rounded-2xl p-5 max-w-md mx-auto space-y-3">
                <span className="text-xs font-semibold text-pink-300 uppercase tracking-wider">
                  Your Unique Referral Code
                </span>
                <div className="text-2xl font-bold text-white font-mono tracking-wider">
                  {generatedRefCode}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex-1 py-2.5 rounded-xl btn-pink-dark text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-white"
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
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md"
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
                className="text-xs font-semibold text-pink-300 underline cursor-pointer hover:text-white"
              >
                Refer another friend now
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Part 1: Your Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-pink-400/30">
                  <GoogleIcon name="person" size={20} className="text-pink-300" />
                  <h3 className="font-bold text-white text-base font-display">
                    Your Details (Referrer)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-pink-200 mb-1">
                      Your Full Name <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sameer Kulkarni"
                      value={formData.referrerName}
                      onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-pink-200 mb-1">
                      Your Contact Number (for Voucher Delivery) <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.referrerPhone}
                      onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-pink-200 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="sameer@example.com"
                      value={formData.referrerEmail}
                      onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-pink-200 mb-1">Are you an enrolled learner?</label>
                    <select
                      value={formData.referrerRole}
                      onChange={(e) => setFormData({ ...formData, referrerRole: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    >
                      <option value="Current Student" className="bg-[#24031B] text-white">Current Enrolled Student</option>
                      <option value="Placed Alumni" className="bg-[#24031B] text-white">Placed Alumni</option>
                      <option value="External Advocate" className="bg-[#24031B] text-white">External Friend / Advocate</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Part 2: Your Friend's Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-pink-400/30">
                  <GoogleIcon name="redeem" size={20} className="text-pink-300" />
                  <h3 className="font-bold text-white text-base font-display">
                    Your Friend's Details (Referee)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-pink-200 mb-1">
                      Friend's Full Name <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Deshpande"
                      value={formData.friendName}
                      onChange={(e) => setFormData({ ...formData, friendName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-pink-200 mb-1">
                      Friend's Contact Number <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 91234 56789"
                      value={formData.friendPhone}
                      onChange={(e) => setFormData({ ...formData, friendPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-pink-200 mb-1">Friend's Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="friend@example.com"
                      value={formData.friendEmail}
                      onChange={(e) => setFormData({ ...formData, friendEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-pink-200 mb-1">Course Friend is Interested In</label>
                    <select
                      value={formData.interestedCourse}
                      onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    >
                      {ITV_COURSES.map((course) => (
                        <option key={course.id} value={course.title} className="bg-[#24031B] text-white">
                          {course.shortTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl btn-pink-primary font-semibold text-xs uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 text-white"
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
          <span className="text-xs font-semibold uppercase text-pink-300 tracking-widest">
            Policy Guidelines
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Frequently Asked Questions About Our Refer & Earn Policy
          </h2>
        </div>

        <div className="space-y-3">
          {REFER_EARN_FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="glass-dark rounded-2xl overflow-hidden transition-all shadow-xl border border-pink-400/35"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left font-semibold text-white text-sm flex items-center justify-between gap-4 hover:bg-white/10 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-bold text-pink-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <GoogleIcon
                    name="keyboard_arrow_down"
                    size={20}
                    className={`text-pink-300 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-pink-200 leading-relaxed border-t border-pink-400/30 pt-3">
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
