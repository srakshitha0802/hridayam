import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  GraduationCap,
  Users,
  Briefcase,
  ShieldCheck,
  MessageSquare,
  Download,
  ChevronDown,
  PhoneCall,
  Rocket,
  Star,
  Award,
  BadgeCheck,
  Search,
  Copy,
  Check,
  Calculator,
  AlertCircle,
  Sparkles,
  BookOpen,
  Heart,
  Trophy,
  Compass,
} from 'lucide-react';
import { AppView } from '../types';
import {
  ITV_COURSES,
  CLASSROOM_CENTERS,
  HOME_FAQS,
} from '../data/itvedantData';
import { PROVIDED_IMAGES } from '../data/mediaAssets';
import { FIXED_DEMO_ACCOUNTS } from '../context/AuthContext';
import { CompanyLogosInlineStrip } from './CompaniesSlidingMarquee';
import { BelvoVerticalsSection } from './BelvoVerticalsSection';
import { FlagshipMasterConsole } from './FlagshipMasterConsole';
import {
  PlacementMomentumAndWhySection,
  IndustryMentorsAndWorkshopsSection,
  ReferAndQuickCallbackSections,
} from './LiveSiteShowcaseSections';

interface HomeViewProps {
  onNavigate: (view: AppView) => void;
  onSelectCourse: (courseId: string) => void;
  onRequestCallback: (courseInterest?: string) => void;
  onDownloadBrochure: (courseTitle?: string) => void;
  onOpenChatbot: () => void;
  onOpenCommandPalette?: () => void;
}

const MATCHER_BACKGROUNDS = [
  { id: 'non-it', label: 'Non-IT / Fresh Graduate', avgSalaryMonthly: 48000 },
  { id: 'cs-it', label: 'CS / IT Student', avgSalaryMonthly: 62000 },
  { id: 'working', label: 'Working Professional', avgSalaryMonthly: 92000 },
] as const;

const MATCHER_GOALS = [
  { id: 'ai-auto', label: 'AI & Automation', keyword: 'ai & automation' },
  { id: 'engineering', label: 'Full Stack, App & Software', keyword: 'full stack' },
  { id: 'product', label: 'Product Development', keyword: 'product development' },
  { id: 'design-craft', label: 'UI/UX, Interior & Fashion Design', keyword: 'interior design' },
  { id: 'growth-startup', label: 'Marketing, Social & Startups', keyword: 'entrepreneurship' },
  { id: 'finance-career', label: 'Finance, GST & Career Prep', keyword: 'gst & taxation' },
] as const;

const EMI_TENURES = [6, 12, 18] as const;

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectCourse,
  onRequestCallback,
  onDownloadBrochure,
  onOpenChatbot,
  onOpenCommandPalette,
}) => {
  const [selectedCampusId, setSelectedCampusId] = useState<string>(CLASSROOM_CENTERS[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [curriculumDropdownOpen, setCurriculumDropdownOpen] = useState(false);
  const [copiedAccountId, setCopiedAccountId] = useState<string | null>(null);

  // Interactive Career Track Matcher & ROI Simulator State
  const [matcherBg, setMatcherBg] = useState<(typeof MATCHER_BACKGROUNDS)[number]['id']>('non-it');
  const [matcherGoal, setMatcherGoal] = useState<(typeof MATCHER_GOALS)[number]['id']>('ai-auto');
  const [matcherTenure, setMatcherTenure] = useState<(typeof EMI_TENURES)[number]>(12);

  // Hero Career Growth Lead Form State
  const [leadPhone, setLeadPhone] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const matchedTrackResult = useMemo(() => {
    const goalObj = MATCHER_GOALS.find((g) => g.id === matcherGoal) || MATCHER_GOALS[0];
    const bgObj = MATCHER_BACKGROUNDS.find((b) => b.id === matcherBg) || MATCHER_BACKGROUNDS[0];
    const course =
      ITV_COURSES.find(
        (c) =>
          c.title.toLowerCase().includes(goalObj.keyword) ||
          c.category.toLowerCase().includes(goalObj.keyword)
      ) || ITV_COURSES[0];

    const monthlyEmi = Math.round(course.fee / matcherTenure);
    const paybackMonths = Math.max(0.6, +(course.fee / bgObj.avgSalaryMonthly).toFixed(1));
    const expectedCtcRange =
      matcherBg === 'working'
        ? `₹9.5 – ${course.highestPackage}`
        : matcherBg === 'cs-it'
          ? `₹6.5 – ${course.highestPackage}`
          : `₹5.0 – ₹14 LPA`;

    return {
      course,
      monthlyEmi,
      paybackMonths,
      expectedCtcRange,
    };
  }, [matcherBg, matcherGoal, matcherTenure]);

  const activeCampus =
    CLASSROOM_CENTERS.find((c) => c.id === selectedCampusId) || CLASSROOM_CENTERS[0];

  const handleCopyCredentials = (accountId: string, email: string, password: string) => {
    try {
      navigator.clipboard?.writeText(`${email} / ${password}`);
    } catch {}
    setCopiedAccountId(accountId);
    setTimeout(() => {
      setCopiedAccountId((prev) => (prev === accountId ? null : prev));
    }, 1800);
  };

  const handleHeroLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedDigits = leadPhone.replace(/\D/g, '');
    if (cleanedDigits.length < 10) {
      setLeadError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (leadName.trim().length < 2) {
      setLeadError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) {
      setLeadError('Please enter a valid email address.');
      return;
    }

    setLeadError(null);

    try {
      const existing = JSON.parse(localStorage.getItem('itv_leads_v1') || '[]');
      const newLead = {
        id: `lead_${Date.now()}`,
        name: leadName.trim(),
        phone: leadPhone.trim(),
        email: leadEmail.trim(),
        courseInterest: 'Hero Career Roadmap Counseling',
        cityOrCenter: 'Pan-India Online / Campus',
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('itv_leads_v1', JSON.stringify([newLead, ...existing]));
    } catch {}

    setLeadSubmitted(true);
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-24 relative z-10">
      {/* =====================================================================
          HERO SECTION: FLOATING PASTEL PILLS + 2 FROSTED WHITE-BLUE GLASS CARDS
         ===================================================================== */}
      <section className="pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-5">
          {/* Top Floating Ambient Ribbon over Live Sapphire Video (exact match to screenshot) */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className="animate-float-smooth inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white text-[11px] font-extrabold text-[#1E428E] shadow-md hover:bg-white transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#3869C3]" />
              <span>Explore Knowledge</span>
            </button>

            <div className="flex items-center gap-1.5 font-display text-sm sm:text-base font-extrabold tracking-[0.26em] text-white text-video-crisp select-none">
              <span>HRID</span>
              <Heart className="w-4 h-4 text-white fill-white/85 drop-shadow" />
              <span>YAM</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('student')}
                className="animate-float-smooth-delayed hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white text-[11px] font-extrabold text-[#1E428E] shadow-md hover:bg-white transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#3869C3]" />
                <span>Learn &amp; Grow</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('placements')}
                className="animate-float-smooth inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white text-[11px] font-extrabold text-[#1E428E] shadow-md hover:bg-white transition-colors cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-[#3869C3]" />
                <span>Achieve More</span>
              </button>
            </div>
          </div>

          {/* 2-Column Translucent White-Blue Pastel Hero Cards (live video clearly visible around & behind) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
            {/* Left Frosted White-Blue Hero Card */}
            <div className="lg:col-span-7 pastel-glass-hero metallic-sheen-card rounded-3xl p-7 sm:p-9 lg:p-10 flex flex-col justify-between gap-6 animate-fade-up-soft">
              <div className="space-y-5">
                {/* Top Pill Badge & Quick Find */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#BFD6F6] text-[11px] font-extrabold text-[#1E428E] shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#3869C3]" />
                    <span>Next-Gen Career EdTech · Hridayam by Belvo · 100% Placement</span>
                  </span>

                  {onOpenCommandPalette && (
                    <button
                      type="button"
                      onClick={onOpenCommandPalette}
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/85 hover:bg-white border border-[#BFD6F6] text-[11px] font-bold text-[#1E428E] cursor-pointer transition-colors"
                    >
                      <Search className="w-3 h-3 text-[#3869C3]" />
                      <span>Quick Find</span>
                      <kbd className="font-mono-tabular text-[10px] text-[#3869C3]">⌘K</kbd>
                    </button>
                  )}
                </div>

                {/* Display Headline matching screenshot */}
                <div className="space-y-3">
                  <h1 className="font-display text-[clamp(2.35rem,4.5vw,3.75rem)] font-extrabold text-[#1E428E] leading-[1.06] tracking-tight">
                    GenZ learning by a{' '}
                    <span className="text-[#3869C3]">GenZ</span>
                  </h1>

                  <p className="text-[#365486] text-base sm:text-lg font-medium leading-relaxed max-w-xl">
                    Fast-track your tech &amp; creative career with real-world agency projects,
                    elite mentors, and guaranteed career placement.
                  </p>
                </div>

                {/* Accreditation Trust Row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3.5 border-y border-[#BFD6F6]/80 text-xs font-extrabold text-[#1E428E]">
                  <span className="inline-flex items-center gap-1.5">
                    <BadgeCheck className="w-4 h-4 text-[#2B59B5]" />
                    NSDC Partner
                  </span>
                  <span className="text-[#84ADEB]" aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#2B59B5]" />
                    Skill India
                  </span>
                  <span className="text-[#84ADEB]" aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2B59B5]" />
                    ISO 9001:2015
                  </span>
                  <span className="text-[#84ADEB]" aria-hidden="true">·</span>
                  <span>NASSCOM</span>
                  <span className="text-[#84ADEB]" aria-hidden="true">·</span>
                  <span>AWS Academy</span>
                </div>

                {/* Google Rating Proof */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-white border border-[#D3E5FD] flex items-center justify-center shadow-xs shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-label="Google">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        fill="#EA4335"
                      />
                    </svg>
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#132C63] font-mono-tabular">
                    4.9 / 5.0 <span className="font-semibold text-[#4C6B9E]">(5,280+ Student Reviews)</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1 relative">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCurriculumDropdownOpen((prev) => !prev)}
                    className="metallic-btn-primary px-6 py-3.5 rounded-2xl text-xs sm:text-[13px] font-extrabold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    aria-expanded={curriculumDropdownOpen}
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD CURRICULUM PDF</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        curriculumDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {curriculumDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-80 pastel-glass-panel rounded-2xl p-2 z-30 space-y-1 shadow-xl">
                      <div className="max-h-64 overflow-y-auto pastel-scrollbar space-y-1 pr-1">
                        {ITV_COURSES.map((course) => (
                          <button
                            key={course.id}
                            type="button"
                            onClick={() => {
                              setCurriculumDropdownOpen(false);
                              onDownloadBrochure(course.title);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-white text-xs font-bold text-[#132C63] cursor-pointer transition-colors"
                          >
                            {course.title}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCurriculumDropdownOpen(false);
                          onDownloadBrochure('Complete Hridayam by Belvo 22-Course 2026 Prospectus');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl bg-[#E8F1FD] hover:bg-[#D3E5FD] text-xs font-extrabold text-[#1E428E] cursor-pointer transition-colors"
                      >
                        Download All 22 Courses Master PDF
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onRequestCallback('Hero Talk to Counselor')}
                  className="metallic-btn-ice px-6 py-3.5 rounded-2xl text-xs sm:text-[13px] font-extrabold inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 text-[#2B59B5]" />
                  <span>Talk to Counselor</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenChatbot}
                  className="px-3 py-2.5 rounded-xl text-[#2B59B5] hover:text-[#132C63] hover:bg-white/70 text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask Career Advisor</span>
                </button>
              </div>
            </div>

            {/* Right Frosted White-Blue Career Growth Form Card */}
            <div className="lg:col-span-5 pastel-glass-hero metallic-sheen-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between animate-fade-up-soft">
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1E428E] leading-snug">
                    Let&apos;s talk about your career growth!
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#456396] font-medium mt-1 leading-relaxed">
                    Get a tailored curriculum roadmap and 100% placement assurance details.
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-[#3869C3] shrink-0 mt-1" />
              </div>

              {leadSubmitted ? (
                <div className="bg-white/90 rounded-2xl p-6 border border-[#BFD6F6] text-center space-y-4 my-auto shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-extrabold text-[#132C63]">
                      Roadmap Request Confirmed
                    </h3>
                    <p className="text-xs text-[#456396] leading-relaxed">
                      Thank you, <strong>{leadName}</strong>. Our senior academic counselor will
                      call{' '}
                      <span className="font-mono-tabular font-bold text-[#1E428E]">
                        {leadPhone}
                      </span>{' '}
                      within 15 minutes.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onDownloadBrochure('Hridayam by Belvo 2026 Roadmap')}
                      className="w-full py-2.5 rounded-xl metallic-btn-primary text-xs font-extrabold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Roadmap PDF Now</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLeadSubmitted(false);
                        setLeadPhone('');
                        setLeadName('');
                        setLeadEmail('');
                      }}
                      className="text-xs font-bold text-[#2B59B5] hover:text-[#132C63] underline cursor-pointer py-1"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleHeroLeadSubmit} className="space-y-4" noValidate>
                  <div>
                    <label
                      htmlFor="hero-lead-phone"
                      className="block text-xs font-extrabold text-[#1E428E] mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="hero-lead-phone"
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => {
                        setLeadPhone(e.target.value);
                        if (leadError) setLeadError(null);
                      }}
                      placeholder="Enter 10 digit Mobile Number"
                      className="w-full px-4 py-3 rounded-xl pastel-input text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hero-lead-name"
                      className="block text-xs font-extrabold text-[#1E428E] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="hero-lead-name"
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => {
                        setLeadName(e.target.value);
                        if (leadError) setLeadError(null);
                      }}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl pastel-input text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hero-lead-email"
                      className="block text-xs font-extrabold text-[#1E428E] mb-1.5"
                    >
                      Email ID
                    </label>
                    <input
                      id="hero-lead-email"
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => {
                        setLeadEmail(e.target.value);
                        if (leadError) setLeadError(null);
                      }}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full px-4 py-3 rounded-xl pastel-input text-sm font-medium"
                    />
                  </div>

                  {leadError && (
                    <div
                      role="alert"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{leadError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl metallic-btn-primary text-sm font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    <span>SUBMIT</span>
                    <Rocket className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: 3,500+ LEARNERS PLACED + SLIDING PASTEL COMPANY MARQUEE
         ===================================================================== */}
      <section className="space-y-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pastel-glass-panel metallic-sheen-card rounded-3xl px-6 sm:px-10 py-6 text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#BFD6F6] text-[10px] font-extrabold uppercase tracking-widest text-[#2B59B5]">
              <Award className="w-3 h-3" />
              <span>3,500+ Placements Across India</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E428E] leading-snug">
              3,500+ Learners Have Been Placed By Our India&apos;s Largest Placement Team
            </h2>
            <p className="text-xs sm:text-sm text-[#456396]">
              From global product giants to premier tech consultancies, our students launch their
              careers across 2,000+ top enterprises.
            </p>
          </div>
        </div>

        <CompanyLogosInlineStrip pastel />
      </section>

      {/* =====================================================================
          SECTION 3: A HIRING CALL EVERY 12 HOURS + WHY HRIDAYAM BY BELVO?
         ===================================================================== */}
      <PlacementMomentumAndWhySection onRequestCallback={onRequestCallback} />

      {/* =====================================================================
          SECTION 4: EXPLORE PROGRAMS ACROSS ALL 11 BELVO VERTICALS
         ===================================================================== */}
      <BelvoVerticalsSection
        onSelectCourse={onSelectCourse}
        onRequestCallback={onRequestCallback}
        onDownloadBrochure={onDownloadBrochure}
      />

      {/* =====================================================================
          SECTION 5: MEET YOUR REAL INDUSTRY MENTORS + LIVE CLINICS
         ===================================================================== */}
      <IndustryMentorsAndWorkshopsSection
        onSelectCourse={onSelectCourse}
        onRequestCallback={onRequestCallback}
      />

      {/* =====================================================================
          SECTION 6: FLAGSHIP MASTER PROGRAMS CONSOLE + CAREER TRANSFORMATIONS
         ===================================================================== */}
      <FlagshipMasterConsole
        onSelectCourse={onSelectCourse}
        onRequestCallback={onRequestCallback}
        onDownloadBrochure={onDownloadBrochure}
      />

      {/* =====================================================================
          SECTION 7 (ADDITIONAL FEATURE): INTERACTIVE TRACK MATCHER & 0% EMI ROI
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pastel-glass-panel metallic-sheen-card rounded-3xl p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1E428E] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#3869C3] block">
                  Smart Tuition &amp; Payback Planner
                </span>
                <h3 className="font-display text-xl font-extrabold text-[#1E428E]">
                  Interactive Track Matcher &amp; 0% EMI Calculator
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="block text-xs font-extrabold text-[#132C63] mb-2">
                  1. Your Current Background
                </span>
                <div className="flex flex-wrap gap-2">
                  {MATCHER_BACKGROUNDS.map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setMatcherBg(bg.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        matcherBg === bg.id ? 'metallic-btn-primary' : 'metallic-btn-ice'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-extrabold text-[#132C63] mb-2">
                  2. Target Career Track
                </span>
                <div className="flex flex-wrap gap-2">
                  {MATCHER_GOALS.map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setMatcherGoal(goal.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        matcherGoal === goal.id ? 'metallic-btn-primary' : 'metallic-btn-ice'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-extrabold text-[#132C63] mb-2">
                  3. 0% Interest Installment Tenure
                </span>
                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/80 border border-[#BFD6F6]">
                  {EMI_TENURES.map((months) => (
                    <button
                      key={months}
                      type="button"
                      onClick={() => setMatcherTenure(months)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-extrabold font-mono-tabular transition-all cursor-pointer whitespace-nowrap ${
                        matcherTenure === months
                          ? 'bg-[#1E428E] text-white shadow-xs'
                          : 'text-[#1E428E] hover:bg-[#E8F1FD]'
                      }`}
                    >
                      {months} Months
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/90 border-2 border-white rounded-3xl p-5 sm:p-6 space-y-4 shadow-md">
            <div className="space-y-1">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#3869C3]">
                Recommended Track · {matchedTrackResult.course.duration}
              </p>
              <h4 className="font-display text-lg font-extrabold text-[#132C63] leading-snug">
                {matchedTrackResult.course.title}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#D3E5FD]">
              <div className="p-3 rounded-2xl bg-[#EEF5FF]">
                <div className="text-[11px] font-bold text-[#5273A8]">0% Monthly EMI</div>
                <div className="text-xl font-extrabold font-mono-tabular text-[#1E428E]">
                  ₹{matchedTrackResult.monthlyEmi.toLocaleString('en-IN')}
                  <span className="text-xs font-semibold text-[#5273A8]">/mo</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-[#EEF5FF]">
                <div className="text-[11px] font-bold text-[#5273A8]">Total Program Fee</div>
                <div className="text-xl font-extrabold font-mono-tabular text-[#1E428E]">
                  ₹{matchedTrackResult.course.fee.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200/70">
                <div className="text-[11px] font-bold text-emerald-800">Projected CTC</div>
                <div className="text-sm font-extrabold font-mono-tabular text-emerald-700 mt-0.5">
                  {matchedTrackResult.expectedCtcRange}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-[#F4F8FF] border border-[#D3E5FD]">
                <div className="text-[11px] font-bold text-[#5273A8]">Est. Fee Payback</div>
                <div className="text-sm font-extrabold font-mono-tabular text-[#1E428E] mt-0.5">
                  ~{matchedTrackResult.paybackMonths} mo salary
                </div>
              </div>
            </div>

            <div className="pt-1 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onSelectCourse(matchedTrackResult.course.id)}
                className="py-2.5 px-3 rounded-xl metallic-btn-primary text-xs font-extrabold cursor-pointer text-center"
              >
                Inspect Syllabus
              </button>
              <button
                type="button"
                onClick={() => onDownloadBrochure(matchedTrackResult.course.title)}
                className="py-2.5 px-3 rounded-xl metallic-btn-ice text-xs font-extrabold cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Roadmap PDF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8 (ADDITIONAL FEATURE): ROLE-PROTECTED WORKSPACES
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="pastel-glass-panel rounded-3xl px-6 sm:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2B59B5]">
              Role-Protected Workspaces · Fixed Demo Authentication Required
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E428E]">
              Dedicated Left-Sidebar Portals for Every Role
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('portal-login')}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl metallic-btn-primary text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Open Portal Login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              account: FIXED_DEMO_ACCOUNTS[0],
              title: 'Student LMS Portal',
              view: 'student' as AppView,
              icon: <GraduationCap className="w-5 h-5 text-[#1E428E]" />,
              cardTone: 'pastel-sky-card',
              bullets: [
                '10 left-sidebar LMS modules',
                'Interactive Code Sandbox & ATS Resume',
                'Live Placement Drives & Certificates',
              ],
            },
            {
              account: FIXED_DEMO_ACCOUNTS[1],
              title: 'Faculty & Mentor Hub',
              view: 'mentor-portal' as AppView,
              icon: <Users className="w-5 h-5 text-indigo-700" />,
              cardTone: 'pastel-lavender-card',
              bullets: [
                '8 left-sidebar faculty modules',
                'Rubric Code Audits & Lab Authoring',
                'Mock Panel Scheduling & Doubts Queue',
              ],
            },
            {
              account: FIXED_DEMO_ACCOUNTS[2],
              title: 'Recruiter & Hiring Desk',
              view: 'recruiter-portal' as AppView,
              icon: <Briefcase className="w-5 h-5 text-emerald-700" />,
              cardTone: 'pastel-mint-card',
              bullets: [
                '7 left-sidebar ATS & hiring modules',
                'Verified Talent Pool & Drive Venues',
                'Live Candidate Offer Tracking',
              ],
            },
            {
              account: FIXED_DEMO_ACCOUNTS[3],
              title: 'Institute Admin Console',
              view: 'instructor' as AppView,
              icon: <ShieldCheck className="w-5 h-5 text-rose-700" />,
              cardTone: 'pastel-rose-card',
              bullets: [
                '8 left-sidebar governance modules',
                'Counselor CRM, Batches & GST Ledger',
                'Scholarship Grants & Audit Logs',
              ],
            },
          ].map((portal) => {
            const isCopied = copiedAccountId === portal.account.role;
            return (
              <div
                key={portal.title}
                className={`${portal.cardTone} metallic-sheen-card rounded-3xl p-5 flex flex-col justify-between gap-4 shadow-md transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/95 border border-white flex items-center justify-center shadow-xs">
                      {portal.icon}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyCredentials(
                          portal.account.role,
                          portal.account.email,
                          portal.account.password
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-white/85 hover:bg-white border border-white text-[10px] font-extrabold text-[#1E428E] inline-flex items-center gap-1 cursor-pointer transition-colors"
                      title="Copy demo email and password"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Login</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-extrabold text-[#132C63]">
                      {portal.title}
                    </h3>
                    <p className="text-[11px] font-mono-tabular font-bold text-[#2B59B5] mt-0.5 truncate">
                      {portal.account.email}
                    </p>
                  </div>

                  <ul className="space-y-1.5 text-xs text-[#365486]">
                    {portal.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2B59B5] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(portal.view)}
                  className="w-full py-2.5 rounded-xl metallic-btn-primary text-xs font-extrabold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: OUR TRAINING CENTERS IN MUMBAI, PUNE & NAGPUR (exact match)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pastel-glass-panel rounded-3xl p-6 sm:p-10 space-y-7">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#3869C3]">
              Campus Locations
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1E428E]">
              Our Training Centers in Mumbai, Pune &amp; Nagpur
            </h2>
            <p className="text-xs sm:text-sm text-[#456396]">
              Walk in for a 1-on-1 counseling session and experience live classroom labs.
            </p>
          </div>

          {/* City Tab Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CLASSROOM_CENTERS.map((center) => {
              const active = center.id === activeCampus.id;
              return (
                <button
                  key={center.id}
                  type="button"
                  onClick={() => setSelectedCampusId(center.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                    active ? 'metallic-btn-primary' : 'metallic-btn-ice'
                  }`}
                >
                  {center.city}
                </button>
              );
            })}
          </div>

          {/* Active Campus Showcase Card */}
          <div className="bg-white/88 border-2 border-white rounded-3xl p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-md metallic-sheen-card">
            <div className="lg:col-span-5 h-60 sm:h-64 rounded-2xl overflow-hidden border border-[#D3E5FD] shadow-sm">
              <img
                src={PROVIDED_IMAGES.indianCampusSteps}
                alt={activeCampus.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#1E428E]">
                    {activeCampus.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#456396] mt-1 leading-relaxed">
                    {activeCampus.address}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E8F1FD] border border-[#BFD6F6] text-[10px] font-extrabold uppercase tracking-wider text-[#1E428E] shrink-0">
                  {activeCampus.id === CLASSROOM_CENTERS[0].id ? 'HEAD OFFICE' : 'CAMPUS HUB'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#EEF5FF] border border-[#D3E5FD] space-y-2 text-xs text-[#132C63]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#2B59B5] shrink-0 mt-0.5" />
                  <span>
                    <strong>Transit:</strong> {activeCampus.metroStation}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#2B59B5] shrink-0" />
                  <span className="font-mono-tabular">
                    <strong>Phone:</strong> {activeCampus.contactNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2B59B5] shrink-0" />
                  <span>
                    <strong>Timing:</strong> {activeCampus.timing}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onRequestCallback(`Campus Visit: ${activeCampus.name}`)}
                  className="metallic-btn-primary px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                >
                  BOOK CAMPUS TOUR
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('centers')}
                  className="metallic-btn-ice px-5 py-3 rounded-xl text-xs font-extrabold cursor-pointer"
                >
                  Contact Center
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: REFER & EARN ₹5,000 + CONFUSED ABOUT COURSE CALLBACK
         ===================================================================== */}
      <ReferAndQuickCallbackSections
        onNavigate={onNavigate}
        onSelectCourse={onSelectCourse}
        onRequestCallback={onRequestCallback}
      />

      {/* =====================================================================
          SECTION 11: FREQUENTLY ASKED QUESTIONS (exact match to screenshot)
         ===================================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="pastel-glass-panel rounded-3xl px-6 py-6 text-center space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#3869C3]">
            Frequently Asked Questions
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E428E]">
            Got Questions About Hridayam by Belvo?
          </h2>
        </div>

        <div className="space-y-3">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.question}
                className="pastel-glass-card rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-display text-sm sm:text-base font-extrabold text-[#1E428E]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#2B59B5] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#456396] leading-relaxed border-t border-[#D3E5FD]/80">
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
