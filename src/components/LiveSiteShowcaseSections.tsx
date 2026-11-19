import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Gift,
  PhoneCall,
  Sparkles,
  Award,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { AppView } from '../types';
import { PROVIDED_IMAGES, INDIAN_STUDENT_PORTRAITS } from '../data/mediaAssets';
import { LIVE_WORKSHOPS, PARTNER_UNIVERSITIES } from '../data/catalogSeed';
import { ITV_COURSES } from '../data/itvedantData';

interface LiveShowcaseProps {
  onNavigate: (view: AppView) => void;
  onSelectCourse: (courseId: string) => void;
  onRequestCallback: (courseInterest?: string) => void;
}

const MOMENTUM_STATS = [
  { value: '5,000+', label: 'No. Of Hiring Companies' },
  { value: '2.5 - 4.5 LPA', label: 'Average Fresher Salary' },
  { value: '19.5 LPA', label: 'Highest Salary Offered' },
  { value: '12,682', label: 'Alumni Network' },
];

const CAMPUS_ACTION_GALLERY = [
  {
    title: 'Technical Assessment & Coding Session',
    subtitle: 'Live Mock Interviews · High-Tech Computer Lab',
    imageUrl: PROVIDED_IMAGES.codingWorkshop,
  },
  {
    title: 'Placed Batch Felicitations & Offer Letters',
    subtitle: 'Celebrating Tech Mahindra & Infosys Hires · Pune',
    imageUrl: PROVIDED_IMAGES.indianCampusSteps,
  },
  {
    title: 'Qualifying & Capgemini Hiring Drive',
    subtitle: 'On-Campus Recruitment Day · Main Campus',
    imageUrl: PROVIDED_IMAGES.indianClassroomTeam,
  },
  {
    title: '1-on-1 Code Clinic & Technical Mentorship',
    subtitle: 'Daily Doubt Clearance Desk · Mumbai Hub',
    imageUrl: PROVIDED_IMAGES.indianLibraryGroup,
  },
];

const INDUSTRY_MENTORS = [
  {
    name: 'Aarav Singhania',
    role: 'Principal AI & Cloud Architect',
    background: 'Ex-Amazon & Microsoft · 12+ Yrs Experience',
    track: 'AI, Machine Learning & Cloud Systems',
    photoUrl: INDIAN_STUDENT_PORTRAITS[0],
    rating: '4.95 ★ (1,240+ Mentored)',
    quote:
      'We train you on the exact production architectures used in high-scale tech teams — zero fluff, pure implementation.',
    courseKeyword: 'ai',
  },
  {
    name: 'Pooja Iyer',
    role: 'Lead Product Marketing Manager (PMM)',
    background: 'Ex-Swiggy & Freshworks · 9+ Yrs GTM',
    track: 'Digital Marketing & Growth Strategy',
    photoUrl: INDIAN_STUDENT_PORTRAITS[1],
    rating: '4.92 ★ (940+ Mentored)',
    quote:
      'Positioning and market launch strategy are superpowers. I help you build real GTM playbooks & case studies that recruiters love.',
    courseKeyword: 'marketing',
  },
  {
    name: 'Arjun Malhotra',
    role: 'Lead Full Stack & Systems Director',
    background: 'IIT-Aligned Faculty · 10+ Yrs Production Dev',
    track: 'Full Stack Web & Mobile Engineering',
    photoUrl: INDIAN_STUDENT_PORTRAITS[2],
    rating: '4.96 ★ (1,080+ Mentored)',
    quote:
      'From scalable microservices to cinema-quality UI/UX, Belvo teaches you how to ship production assets at enterprise standards.',
    courseKeyword: 'web',
  },
  {
    name: 'Tanya Kapoor',
    role: 'Packaging Design & Creative Art Director',
    background: 'Ex-Ogilvy & Dentsu · Performance Lead',
    track: 'UI/UX Design & Brand Communication',
    photoUrl: INDIAN_STUDENT_PORTRAITS[3],
    rating: '4.94 ★ (1,150+ Mentored)',
    quote:
      'Design that does not convert is just art. We train you to create visual design assets that drive verifiable business results.',
    courseKeyword: 'design',
  },
];

export const PlacementMomentumAndWhySection: React.FC<{
  onRequestCallback: (courseInterest?: string) => void;
}> = ({ onRequestCallback }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Centered Header Card: A Hiring Call Every 12 Hours. Your Turn Next. */}
      <div className="max-w-2xl mx-auto pastel-glass-panel metallic-sheen-card rounded-3xl px-6 sm:px-10 py-6 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#BFD6F6] text-[10px] font-extrabold uppercase tracking-widest text-[#2B59B5]">
          <TrendingUp className="w-3 h-3" />
          <span>Consistent Placement Momentum</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1E428E] leading-tight">
          A Hiring Call Every 12 Hours.{' '}
          <span className="text-[#3869C3]">Your Turn Next.</span>
        </h2>
      </div>

      {/* 4 Frosted White-Blue Stat Cards (exact match to screenshot) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MOMENTUM_STATS.map((stat) => (
          <div
            key={stat.label}
            className="pastel-glass-card metallic-sheen-card rounded-2xl px-5 py-6 text-center space-y-1"
          >
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E428E] font-mono-tabular">
              {stat.value}
            </div>
            <div className="text-xs font-bold text-[#5273A8]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 4 Live Campus & Placement Drive Photography Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CAMPUS_ACTION_GALLERY.map((item) => (
          <div
            key={item.title}
            className="pastel-glass-card metallic-sheen-card rounded-3xl overflow-hidden group"
          >
            <div className="h-44 overflow-hidden relative bg-[#DCEBFF]">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 text-center space-y-1">
              <h3 className="font-display text-xs sm:text-[13px] font-extrabold text-[#132C63] leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] font-medium text-[#5273A8]">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Why Hridayam by Belvo? Deep Royal-Sapphire Metallic Banner (exact match to screenshot) */}
      <div className="metallic-royal-banner metallic-sheen-card rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
        <div className="lg:col-span-6 flex items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/80 shadow-lg shrink-0">
            <img
              src={PROVIDED_IMAGES.indianStudentLaptop}
              alt="Hridayam pedagogy leadership"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-sky-200">
              Leadership &amp; Pedagogy
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
              Why Hridayam by Belvo?
            </h3>
            <p className="text-xs text-sky-100 leading-relaxed">
              &ldquo;Our single mission is to ensure every learner walks away with practical
              mastery and a confirmed tech offer letter.&rdquo;
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white">
          {[
            '100% Structured Placement Assurance',
            '80% Practical Hands-On Lab Ratio',
            '35+ Real Agency Industry Capstones',
            '1-on-1 Weekly Mentor Code Audits',
          ].map((pillar) => (
            <div
              key={pillar}
              className="flex items-center gap-2.5 bg-white/12 border border-white/25 rounded-xl px-3.5 py-2.5 backdrop-blur-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-sky-200 shrink-0" />
              <span className="font-bold">{pillar}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Academic & University Alliance Strip in Frosted Pastel Glass */}
      <div className="pastel-glass-panel rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#3869C3]">
              Academic &amp; University Alliance Network
            </p>
            <h3 className="font-display text-lg font-extrabold text-[#1E428E]">
              Curriculum co-reviewed with academic councils &amp; design labs
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onRequestCallback('Academic / University Partnership Inquiry')}
            className="text-xs font-extrabold text-[#2B59B5] hover:text-[#132C63] underline underline-offset-4 cursor-pointer"
          >
            Apply for University Partnership
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PARTNER_UNIVERSITIES.slice(0, 5).map((uni) => (
            <div
              key={uni.id}
              className="bg-white/80 border border-white rounded-2xl px-4 py-3 space-y-1 shadow-xs"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-mono-tabular text-[#2B59B5] font-extrabold">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>{uni.shortCode}</span>
                <span>·</span>
                <span>{uni.location}</span>
              </div>
              <div className="text-xs font-extrabold text-[#132C63] truncate">{uni.name}</div>
              <div className="text-[11px] text-[#5273A8] truncate">{uni.allianceRole}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const IndustryMentorsAndWorkshopsSection: React.FC<{
  onSelectCourse: (courseId: string) => void;
  onRequestCallback: (courseInterest?: string) => void;
}> = ({ onSelectCourse, onRequestCallback }) => {
  const [reservedWorkshopIds, setReservedWorkshopIds] = useState<string[]>([]);

  const resolveCourse = (keyword: string): string => {
    const match = ITV_COURSES.find(
      (c) =>
        c.title.toLowerCase().includes(keyword) || c.category.toLowerCase().includes(keyword)
    );
    return match ? match.id : ITV_COURSES[0].id;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
      {/* Centered White-Blue Pastel Header Card (exact match to screenshot) */}
      <div className="max-w-2xl mx-auto pastel-glass-panel metallic-sheen-card rounded-3xl px-6 sm:px-10 py-6 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#BFD6F6] text-[10px] font-extrabold uppercase tracking-widest text-[#2B59B5]">
          <Sparkles className="w-3 h-3" />
          <span>Real Practitioners · Not Just Lecturers</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1E428E]">
          Meet Your Real <span className="text-[#3869C3]">Industry Mentors</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#456396]">
          Every week, our senior practitioners conduct live 1-on-1 portfolio audits, technical code
          clinics, and commercial pitch simulations.
        </p>
      </div>

      {/* 4 Centered-Portrait Frosted White-Blue Mentor Cards (exact match to screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {INDUSTRY_MENTORS.map((mentor) => (
          <div
            key={mentor.name}
            className="pastel-glass-card metallic-sheen-card rounded-3xl p-5 flex flex-col justify-between gap-4 text-center"
          >
            <div className="space-y-3">
              {/* Centered Rounded Portrait + Overlapping Dark Royal Rating Pill */}
              <div className="relative mx-auto w-24 pt-1 pb-2">
                <img
                  src={mentor.photoUrl}
                  alt={mentor.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-2xl object-cover object-top border-2 border-white shadow-md mx-auto"
                />
                <span className="inline-block -mt-3 relative z-10 px-2.5 py-0.5 rounded-full bg-[#1E428E] text-white text-[10px] font-extrabold font-mono-tabular shadow-sm whitespace-nowrap">
                  {mentor.rating}
                </span>
              </div>

              <div>
                <h3 className="font-display text-base font-extrabold text-[#132C63]">
                  {mentor.name}
                </h3>
                <p className="text-xs font-bold text-[#2B59B5] mt-0.5">{mentor.role}</p>
                <p className="text-[11px] font-medium text-[#5A79AD] mt-0.5">
                  {mentor.background}
                </p>
              </div>

              <div className="text-xs text-[#3C588A] leading-relaxed bg-[#EEF5FF]/90 border border-[#D3E5FD] rounded-2xl p-3 text-left">
                &ldquo;{mentor.quote}&rdquo;
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() =>
                  onRequestCallback(`1-on-1 Mentorship with ${mentor.name} (${mentor.track})`)
                }
                className="w-full py-2.5 rounded-xl metallic-btn-primary text-[11px] font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>BOOK 1-ON-1 SESSION</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectCourse(resolveCourse(mentor.courseKeyword))}
                className="w-full py-1.5 rounded-xl text-xs font-bold text-[#2B59B5] hover:text-[#132C63] transition-colors cursor-pointer"
              >
                View {mentor.name.split(' ')[0]}&apos;s Track →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Free Live Faculty Clinics Strip */}
      <div className="pastel-glass-panel rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg font-extrabold text-[#1E428E]">
            Upcoming Free Live Faculty Clinics
          </h3>
          <span className="text-xs font-bold text-[#3869C3]">Open to prospective learners</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LIVE_WORKSHOPS.map((ws) => {
            const reserved = reservedWorkshopIds.includes(ws.id);
            return (
              <div
                key={ws.id}
                className="bg-white/85 border border-white rounded-2xl p-4 flex flex-col justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono-tabular text-[#2B59B5] font-extrabold">
                    {ws.dateLabel} · {ws.timeLabel}
                  </div>
                  <h4 className="font-display text-sm font-extrabold text-[#132C63] leading-snug">
                    {ws.title}
                  </h4>
                  <p className="text-xs text-[#5273A8]">
                    Hosted by {ws.mentorName} · {ws.seatsLeft} seats left
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!reserved) {
                      setReservedWorkshopIds((prev) => [...prev, ws.id]);
                      onRequestCallback(`Free Live Clinic Seat: ${ws.title}`);
                    }
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    reserved
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : 'metallic-btn-ice'
                  }`}
                >
                  {reserved ? 'Seat Reserved · Check Email' : 'Reserve Free Seat'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const ReferAndQuickCallbackSections: React.FC<LiveShowcaseProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleQuickCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Please enter your name.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError(null);

    try {
      const existing = JSON.parse(localStorage.getItem('itv_leads_v1') || '[]');
      const newLead = {
        id: `bottom_${Date.now()}`,
        name: name.trim(),
        phone: phone.trim(),
        courseInterest: 'Course Selection Advisor Callback',
        cityOrCenter: 'Pan-India',
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('itv_leads_v1', JSON.stringify([newLead, ...existing]));
    } catch {}

    setSubmitted(true);
  };

  return (
    <div className="space-y-12">
      {/* Refer & Earn Deep Royal-Sapphire Metallic Banner (exact match to screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="metallic-royal-banner metallic-sheen-card rounded-3xl p-7 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/30 text-[10px] font-extrabold uppercase tracking-widest text-sky-100">
              <Gift className="w-3.5 h-3.5" />
              <span>Referral Program</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Refer your friend and someone you know and earn an Amazon Gift voucher upto 5000 !!
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              Share the gift of education with your friends and get a chance of earning up to
              ₹5,000 on every successful enrollment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('refer-earn')}
              className="px-6 py-3.5 rounded-2xl bg-white text-[#1E428E] hover:bg-[#EEF5FF] text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-lg transition-all hover:-translate-y-0.5"
            >
              <span>REFER NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('refer-earn')}
              className="px-4 py-3 rounded-xl text-sky-100 hover:text-white text-xs font-bold underline underline-offset-4 cursor-pointer"
            >
              Refer &amp; Earn Policy
            </button>
          </div>
        </div>
      </section>

      {/* Pre-Footer "Are You Confused About Which Course to Choose?" Frosted Pastel Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pastel-glass-panel metallic-sheen-card rounded-3xl p-7 sm:p-10 text-center space-y-5">
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E428E]">
              Are You Confused About Which Course to Choose?
            </h2>
            <p className="text-xs sm:text-sm text-[#456396]">
              Speak to our Senior Academic Advisors. We evaluate your qualification and recommend
              the optimal career program.
            </p>
          </div>

          {submitted ? (
            <div className="max-w-md mx-auto bg-white/90 border border-[#BFD6F6] rounded-2xl p-5 space-y-2 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-emerald-700 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Callback Scheduled for {name}</span>
              </div>
              <p className="text-xs text-[#456396]">
                Our senior advisor will call{' '}
                <span className="font-mono-tabular font-bold text-[#132C63]">{phone}</span> within
                15 minutes.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                }}
                className="text-xs font-bold text-[#2B59B5] underline cursor-pointer"
              >
                Schedule another callback
              </button>
            </div>
          ) : (
            <form onSubmit={handleQuickCallback} className="max-w-2xl mx-auto space-y-3" noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(null);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl pastel-input text-sm font-medium"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError(null);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl pastel-input text-sm font-medium"
                />
                <button
                  type="submit"
                  className="metallic-btn-primary px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>REQUEST CALLBACK</span>
                </button>
              </div>
              {error && (
                <div
                  role="alert"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
