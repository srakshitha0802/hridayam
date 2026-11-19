import React, { useEffect, useState } from 'react';
import {
  Gift,
  UserPlus,
  Ticket,
  BookOpen,
  HelpCircle,
  Copy,
  Check,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { REFER_EARN_PROGRAMS, REFER_EARN_FAQS, ITV_COURSES } from '../data/itvedantData';
import { AppView, ReferralSubmission } from '../types';
import { useAuth } from '../context/AuthContext';
import { PortalKpi, PortalNavItem, PortalWorkspaceShell } from './PortalWorkspaceShell';

interface ReferEarnViewProps {
  onReferralSuccess?: (submission: ReferralSubmission) => void;
  onNavigate?: (view: AppView) => void;
}

type ReferTab = 'overview' | 'refer-form' | 'my-referrals' | 'programs' | 'faq';

export const ReferEarnView: React.FC<ReferEarnViewProps> = ({
  onReferralSuccess,
  onNavigate,
}) => {
  const { user, signOutUser } = useAuth();
  const [activeTab, setActiveTab] = useState<ReferTab>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [generatedRefCode, setGeneratedRefCode] = useState('HRD-REF-2026-881');
  const [referrals, setReferrals] = useState<ReferralSubmission[]>([]);

  const [formData, setFormData] = useState({
    referrerName: user?.displayName || 'Aarav Deshmukh',
    referrerPhone: '+91 98204 51920',
    referrerEmail: user?.email || 'student@hridayam.in',
    referrerRole: 'Current Student',
    friendName: '',
    friendPhone: '',
    friendEmail: '',
    interestedCourse: ITV_COURSES[0]?.title || 'Master in Data Science and Analytics with AI',
    preferredCenter: 'Thane Head Office',
  });

  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem('itv_referrals_v1') || '[]');
      setReferrals(existing);
    } catch {}
  }, [activeTab]);

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
      const next = [newSubmission, ...existing];
      localStorage.setItem('itv_referrals_v1', JSON.stringify(next));
      setReferrals(next);
    } catch {}

    if (onReferralSuccess) {
      onReferralSuccess(newSubmission);
    }

    setFormSubmitted(true);
    setFormData((prev) => ({ ...prev, friendName: '', friendPhone: '', friendEmail: '' }));
  };

  const handleCopyCode = () => {
    const shareText = `Check out Hridayam by Belvo career programs with 100% placement support. Use my referral code ${generatedRefCode} to unlock priority counseling.`;
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2600);
  };

  const dispatchedCount = referrals.filter((r) => r.voucherCode !== 'PENDING_ADMISSION').length;

  const navItems: PortalNavItem[] = [
    { id: 'overview', label: 'Rewards Overview', icon: Gift, group: 'Referral Hub' },
    { id: 'refer-form', label: 'Refer a Friend', icon: UserPlus, group: 'Referral Hub' },
    { id: 'my-referrals', label: 'My Vouchers & Log', icon: Ticket, badge: referrals.length, group: 'Referral Hub' },
    { id: 'programs', label: 'Eligible Programs', icon: BookOpen, badge: REFER_EARN_PROGRAMS.length, group: 'Program Guide' },
    { id: 'faq', label: 'Policy & FAQs', icon: HelpCircle, group: 'Program Guide' },
  ];

  const kpis: PortalKpi[] = [
    { label: 'Reward Per Enrollment', value: '₹5,000', hint: 'Instant Amazon e-Voucher', pastelClass: 'pastel-peach-card' },
    { label: 'Referrals Submitted', value: referrals.length, hint: 'No upper limit on invites', pastelClass: 'pastel-sky-card' },
    { label: 'Vouchers Dispatched', value: dispatchedCount, hint: `₹${(dispatchedCount * 5000).toLocaleString('en-IN')} earned`, pastelClass: 'pastel-mint-card' },
    { label: 'Active Share Code', value: generatedRefCode.slice(-6), hint: 'Valid across all campuses', pastelClass: 'pastel-lavender-card' },
  ];

  return (
    <PortalWorkspaceShell
      portalName="Refer & Earn Portal"
      portalSubtitle="Invite friends to Hridayam by Belvo classroom or live online batches and earn ₹5,000 Amazon vouchers on every enrollment."
      userName={user?.displayName || 'Aarav Deshmukh'}
      userEmail={user?.email || 'student@hridayam.in'}
      userBadgeCode={user?.badgeCode || 'HRD-STU-2026-4108'}
      userCampus={user?.campus || 'Pune FC Road Campus'}
      roleAccent="rose"
      navItems={navItems}
      activeId={activeTab}
      onSelectNav={(id) => setActiveTab(id as ReferTab)}
      kpis={kpis}
      headerActions={
        <>
          <button
            type="button"
            onClick={() => setActiveTab('refer-form')}
            className="px-4 py-2.5 rounded-xl bg-white/95 text-[#0B1B3D] hover:bg-white text-xs font-extrabold cursor-pointer whitespace-nowrap"
          >
            Refer a Friend Now
          </button>
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied Invite' : 'Copy Share Link'}</span>
          </button>
        </>
      }
      onLogout={() => {
        signOutUser();
        onNavigate?.('home');
      }}
    >
      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold text-[#0B1B3D]">
                Earn ₹5,000 Amazon Gift Vouchers for Every Friend Who Joins
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Share the gift of career-ready tech &amp; AI mentorship. When your referred friend completes admission and pays the initial 20% fee installment, your Amazon e-voucher is dispatched automatically via Institute Admin.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="pastel-sky-card rounded-2xl p-4 space-y-1">
                <div className="text-xs font-mono-tabular font-extrabold text-[#2B4EA2]">Step 01</div>
                <div className="text-sm font-extrabold text-[#0B1B3D]">Register Your Friend</div>
                <p className="text-xs text-slate-700">Submit their contact details and preferred Indian campus or online track.</p>
              </div>
              <div className="pastel-mint-card rounded-2xl p-4 space-y-1">
                <div className="text-xs font-mono-tabular font-extrabold text-emerald-800">Step 02</div>
                <div className="text-sm font-extrabold text-[#0B1B3D]">Receive ₹5,000 Voucher</div>
                <p className="text-xs text-slate-700">Voucher unlocks on admission confirmation with zero cap on total earnings.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('refer-form')}
                className="px-5 py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer"
              >
                Open Referral Form
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('my-referrals')}
                className="px-5 py-3 rounded-xl btn-blue-glass text-xs font-extrabold cursor-pointer"
              >
                Track My Vouchers ({referrals.length})
              </button>
            </div>
          </div>

          <div className="xl:col-span-5 metallic-chrome-surface rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-4 text-center">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl btn-blue-primary flex items-center justify-center mx-auto">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#2B4EA2]">
                Personal Referral Code
              </div>
              <div className="text-2xl font-mono-tabular font-extrabold text-[#0B1B3D] bg-white/85 rounded-2xl py-3 px-4 border border-[#D3E2FA]">
                {generatedRefCode}
              </div>
            </div>
            <div className="space-y-2 text-left text-xs text-slate-700 pastel-lavender-card rounded-2xl p-4">
              <div className="flex items-center gap-2 font-bold text-[#0B1B3D]">
                <CheckCircle2 className="w-4 h-4 text-[#2B4EA2]" />
                <span>Valid across all 11 Belvo career tracks</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[#0B1B3D]">
                <CheckCircle2 className="w-4 h-4 text-[#2B4EA2]" />
                <span>Direct tracking in Institute Admin CRM</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Invite Message Copied' : 'Copy Referral Message'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. REFER A FRIEND FORM */}
      {activeTab === 'refer-form' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-3xl space-y-5">
          <div>
            <h2 className="text-xl font-extrabold text-[#0B1B3D]">Register a New Referral</h2>
            <p className="text-xs text-slate-600">Logged referrals sync directly to the Institute Admin Voucher Queue.</p>
          </div>

          {formSubmitted && (
            <div className="pastel-mint-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-extrabold text-[#0B1B3D]">Referral Registered ({generatedRefCode})</div>
                <div className="text-slate-700">Your friend will receive priority counseling and your voucher is queued.</div>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3.5 py-2 rounded-xl btn-blue-primary text-xs font-bold cursor-pointer"
              >
                Copy Code
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#0B1B3D] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.referrerName}
                  onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-[#0B1B3D] mb-1">Your Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.referrerPhone}
                  onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#D3E2FA]">
              <div>
                <label className="block font-bold text-[#0B1B3D] mb-1">Friend&apos;s Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.friendName}
                  onChange={(e) => setFormData({ ...formData, friendName: e.target.value })}
                  placeholder="Enter friend's name"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-[#0B1B3D] mb-1">Friend&apos;s Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.friendPhone}
                  onChange={(e) => setFormData({ ...formData, friendPhone: e.target.value })}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#0B1B3D] mb-1">Interested Track</label>
                <select
                  value={formData.interestedCourse}
                  onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-bold"
                >
                  {ITV_COURSES.map((c) => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold text-[#0B1B3D] mb-1">Preferred Campus</label>
                <select
                  value={formData.preferredCenter}
                  onChange={(e) => setFormData({ ...formData, preferredCenter: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-bold"
                >
                  <option>Thane Head Office</option>
                  <option>Pune FC Road Campus</option>
                  <option>Bengaluru Koramangala Hub</option>
                  <option>Hyderabad HITEC City</option>
                  <option>Live Online Pan-India</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Submit Referral &amp; Generate Reward Code
            </button>
          </form>
        </div>
      )}

      {/* 3. MY REFERRALS & VOUCHERS */}
      {activeTab === 'my-referrals' && (
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <h2 className="text-lg font-extrabold text-[#0B1B3D]">Referral History &amp; Voucher Status ({referrals.length})</h2>
          {referrals.length === 0 ? (
            <div className="pastel-sky-card rounded-2xl p-6 text-center space-y-3 text-xs">
              <p className="font-bold text-[#0B1B3D]">No referrals submitted yet.</p>
              <button
                type="button"
                onClick={() => setActiveTab('refer-form')}
                className="px-4 py-2 rounded-xl btn-blue-primary text-xs font-bold cursor-pointer"
              >
                Submit Your First Referral
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {referrals.map((r) => (
                <div key={r.id} className="metallic-chrome-surface rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-extrabold text-sm text-[#0B1B3D]">{r.friendName} ({r.friendPhone})</div>
                    <div className="text-slate-600">{r.interestedCourse} · {r.preferredCenter}</div>
                    <div className="font-mono-tabular text-[11px] text-[#334873]">Code: {r.referralCode}</div>
                  </div>
                  <div className="text-right font-mono-tabular">
                    <div className="font-extrabold text-[#1E428E]">{r.rewardStatus}</div>
                    <div className="text-[11px] text-slate-600">{r.voucherCode}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. ELIGIBLE PROGRAMS */}
      {activeTab === 'programs' && (
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <h2 className="text-lg font-extrabold text-[#0B1B3D]">Eligible Career Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REFER_EARN_PROGRAMS.map((p) => (
              <div key={p.courseName} className="metallic-chrome-surface rounded-2xl p-5 space-y-1.5 text-xs">
                <div className="font-extrabold text-sm text-[#0B1B3D]">{p.courseName}</div>
                <div className="text-slate-600">{p.category} · {p.courseDuration}</div>
                <div className="font-mono-tabular font-extrabold text-[#2B4EA2]">Reward: {p.voucherLabel}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. POLICY & FAQS */}
      {activeTab === 'faq' && (
        <div className="glass-panel rounded-3xl p-6 space-y-3">
          <h2 className="text-lg font-extrabold text-[#0B1B3D]">Refer &amp; Earn Policy FAQs</h2>
          {REFER_EARN_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={faq.question} className="bg-white/85 rounded-2xl border border-[#D3E2FA] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-extrabold text-[#0B1B3D] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </PortalWorkspaceShell>
  );
};
