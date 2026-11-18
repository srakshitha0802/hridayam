import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { CompaniesSlidingMarquee } from './CompaniesSlidingMarquee';
import {
  DoodleSparkle,
  DoodleGraduationCap,
  DoodleOpenBook,
  DoodleAtom,
  DoodleCodeWindow,
  DoodlePaperAirplane,
  DoodleRocket,
  DoodleLightbulb,
  DoodleMathFormula,
  DoodleBrainSynapse,
  DoodleCompass,
} from './ThemeDoodles';
import { IndustryAlignedProgramsSection } from './IndustryAlignedProgramsSection';
import {
  ITV_COURSES,
  CLASSROOM_CENTERS,
  HOME_FAQS,
} from '../data/itvedantData';
import { AppView } from '../types';

interface HomeViewProps {
  onNavigate: (view: AppView) => void;
  onSelectCourse: (courseId: string) => void;
  onRequestCallback: (courseInterest?: string) => void;
  onDownloadBrochure: (courseTitle?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectCourse,
  onRequestCallback,
  onDownloadBrochure,
}) => {
  const [selectedCenterTab, setSelectedCenterTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [heroFormSubmitted, setHeroFormSubmitted] = useState(false);
  const [heroForm, setHeroForm] = useState({
    phone: '',
    name: '',
    email: '',
  });

  const [bottomFormSubmitted, setBottomFormSubmitted] = useState(false);
  const [bottomForm, setBottomForm] = useState({
    name: '',
    phone: '',
    course: 'Master in Data Science and Analytics with AI',
  });

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroForm.phone || !heroForm.name) return;

    try {
      const existing = JSON.parse(localStorage.getItem('itv_leads_v1') || '[]');
      const newLead = {
        id: `hero_${Date.now()}`,
        name: heroForm.name,
        phone: heroForm.phone,
        email: heroForm.email,
        courseInterest: 'General Inquiry / Career Growth',
        cityOrCenter: 'Thane Head Office',
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('itv_leads_v1', JSON.stringify([newLead, ...existing]));
    } catch {}

    setHeroFormSubmitted(true);
  };

  const handleBottomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bottomForm.name || !bottomForm.phone) return;

    try {
      const existing = JSON.parse(localStorage.getItem('itv_leads_v1') || '[]');
      const newLead = {
        id: `bottom_${Date.now()}`,
        name: bottomForm.name,
        phone: bottomForm.phone,
        courseInterest: bottomForm.course,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('itv_leads_v1', JSON.stringify([newLead, ...existing]));
    } catch {}

    setBottomFormSubmitted(true);
  };

  const campusPhotos = [
    {
      title: 'Technical Assessment & Coding Session',
      subtitle: 'Learner Showcase • High-Tech Computer Lab',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Placed Batch Felicitations & Offer Letters',
      subtitle: 'QuickHeal & Tech Mahindra Hires • Pune Campus',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'QualityKiosk & Capgemini Hiring Drive',
      subtitle: 'On-Campus Recruitment Day • Main Campus',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: '1-on-1 Code Clinic & Technical Mentorship',
      subtitle: 'Daily Doubt Clearance Desk • Andheri Hub',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="space-y-16 pb-20 relative z-10 text-slate-900">
      {/* 1. HERO SECTION (MODERN BOLD FRAME - BLUE-WHITE PREMIUM TEXTURE) */}
      <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[40px] sm:rounded-b-[56px] border-b-2 border-blue-100 bg-gradient-to-b from-sky-50/50 via-white to-white">
        {/* Animated Educational Doodles in Hero Background */}
        <div className="absolute top-12 left-6 w-20 h-20 text-blue-600/30 hidden md:block animate-doodle-float pointer-events-none">
          <DoodleGraduationCap className="w-full h-full" />
        </div>
        <div className="absolute top-16 right-10 w-16 h-16 text-sky-600/30 hidden md:block animate-doodle-float-delayed pointer-events-none">
          <DoodleOpenBook className="w-full h-full" />
        </div>
        <div className="absolute bottom-10 left-1/3 w-14 h-14 text-blue-500/25 hidden lg:block animate-doodle-spin pointer-events-none">
          <DoodleAtom className="w-full h-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headlines & Accreditations (White-Blue Glass Frame) */}
            <div className="lg:col-span-7 space-y-6 glass-panel rounded-3xl p-6 sm:p-8 sm:py-10 border-2 border-blue-200/90 shadow-xl relative overflow-hidden backdrop-blur-2xl text-slate-900">
              {/* Subtle ambient light blue flare */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

              {/* Trust Badge with Google Icon & Sparkle Doodle */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border-2 border-blue-200 text-blue-800 text-xs font-bold shadow-xs">
                <DoodleSparkle className="text-blue-600" />
                <span>Next-Gen Career EdTech • Hridayam by Belvo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-blue-700 font-bold">100% Placement</span>
              </div>

              {/* Main Headline (GenZ learning by a GenZ) */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12] font-display tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">
                    GenZ learning by a GenZ
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl leading-relaxed">
                  Fast-track your tech & creative career with real-world agency projects, elite mentors, and guaranteed career placement.
                </p>
              </div>

              {/* Accreditations Bar (NSDC, Skill India, ISO, NASSCOM, AWS) */}
              <div className="flex flex-wrap items-center gap-3 py-3 border-y border-blue-100 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <GoogleIcon name="verified" size={18} className="text-blue-600" filled />
                  <span>NSDC Partner</span>
                </div>
                <span className="text-blue-300">•</span>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <GoogleIcon name="military_tech" size={18} className="text-blue-600" />
                  <span>Skill India</span>
                </div>
                <span className="text-blue-300">•</span>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <GoogleIcon name="workspace_premium" size={18} className="text-blue-600" />
                  <span>ISO 9001:2015</span>
                </div>
                <span className="text-blue-300">•</span>
                <span className="font-bold text-slate-800">NASSCOM</span>
                <span className="text-blue-300">•</span>
                <span className="font-bold text-slate-800">AWS Academy</span>
              </div>

              {/* Google Reviews Badge */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-6 h-6 rounded-full bg-blue-100 shadow-xs border border-blue-200 flex items-center justify-center font-bold text-blue-700">
                  G
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <GoogleIcon key={i} name="star" size={16} filled className="text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-800 font-bold">4.9 / 5.0 (5,280+ Student Reviews)</span>
              </div>

              {/* Download Brochure Button & Quick Guidance */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => onDownloadBrochure('Master in Data Science and Analytics with AI')}
                  className="btn-blue-primary px-7 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg text-white"
                >
                  <GoogleIcon name="download" size={18} className="text-white" />
                  <span>Download Brochure</span>
                  <GoogleIcon name="keyboard_arrow_down" size={18} className="text-white" />
                </button>

                <button
                  onClick={() => onRequestCallback()}
                  className="btn-blue-glass px-5 py-3.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-blue-700 hover:border-blue-500"
                >
                  <GoogleIcon name="call" size={17} className="text-blue-600" />
                  <span>Talk to Counselor</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Form Card ("Let's talk about your career growth!") */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border-2 border-blue-200 shadow-2xl backdrop-blur-2xl text-slate-900">
                {/* Decorative Ambient Highlights inside card */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-blue-100/50 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-100/50 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Let's talk about your career growth!
                    </h3>
                    <DoodleSparkle className="text-blue-600" />
                  </div>
                  <p className="text-xs text-slate-600">
                    Get a tailored curriculum roadmap and 100% placement assurance details.
                  </p>

                  {heroFormSubmitted ? (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center space-y-3">
                      <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-sky-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                        <GoogleIcon name="check" size={24} weight={600} />
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">Request Submitted!</h4>
                      <p className="text-xs text-slate-600">
                        Thank you, {heroForm.name}. A senior career advisor will call you at <strong>{heroForm.phone}</strong> within 15 minutes.
                      </p>
                      <button
                        onClick={() => setHeroFormSubmitted(false)}
                        className="text-xs font-semibold text-blue-700 underline cursor-pointer hover:text-blue-800"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleHeroSubmit} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <GoogleIcon
                            name="call"
                            size={16}
                            className="absolute left-3.5 top-3 text-blue-600"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Enter 10 digit Mobile Number"
                            value={heroForm.phone}
                            onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <GoogleIcon
                            name="person"
                            size={16}
                            className="absolute left-3.5 top-3 text-blue-600"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={heroForm.name}
                            onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Email ID
                        </label>
                        <div className="relative">
                          <GoogleIcon
                            name="mail"
                            size={16}
                            className="absolute left-3.5 top-3 text-blue-600"
                          />
                          <input
                            type="email"
                            placeholder="e.g. yourname@gmail.com"
                            value={heroForm.email}
                            onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-medium"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl btn-blue-primary font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 text-white"
                      >
                        <span>Submit</span>
                        <GoogleIcon name="rocket_launch" size={17} className="text-white" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SLIDING PLACEMENT COMPANIES MARQUEE */}
      <CompaniesSlidingMarquee />

      {/* 3. A HIRING CALL EVERY 12 HOURS & STATS (MODERN BOLD BLUE-WHITE FRAMES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border-2 border-blue-200 text-xs font-semibold">
            <GoogleIcon name="schedule" size={16} className="text-blue-600" />
            <span>Consistent Placement Momentum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            A Hiring Call Every 12 Hours. Your Turn Next.
          </h2>
        </div>

        {/* 4 Stat Boxes with Modern Bold Blue-White Glass Aesthetics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-6 text-center space-y-1 border-2 border-blue-100 shadow-md hover:border-blue-400 transition-all text-slate-900">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-display">
              5,000+
            </div>
            <div className="text-xs text-slate-600 font-semibold">No. Of Hiring Companies</div>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center space-y-1 border-2 border-blue-100 shadow-md hover:border-blue-400 transition-all text-slate-900">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">
              2.5 - 4.5 LPA
            </div>
            <div className="text-xs text-slate-600 font-semibold">Average Fresher Salary</div>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center space-y-1 border-2 border-blue-100 shadow-md hover:border-blue-400 transition-all text-slate-900">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-display">
              19.5 LPA
            </div>
            <div className="text-xs text-slate-600 font-semibold">Highest Salary Offered</div>
          </div>

          <div className="glass-card rounded-2xl p-6 text-center space-y-1 border-2 border-blue-100 shadow-md hover:border-blue-400 transition-all text-slate-900">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">
              12,682
            </div>
            <div className="text-xs text-slate-600 font-semibold">Alumni Network</div>
          </div>
        </div>

        {/* 4 Real Classroom / Placement Photos Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {campusPhotos.map((photo, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden group border-2 border-blue-100 hover:border-blue-300 shadow-md hover:shadow-lg transition-all"
            >
              <div className="h-44 bg-slate-100 relative overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
              <div className="p-4 space-y-1 text-center bg-white">
                <h4 className="font-semibold text-slate-900 text-xs truncate">{photo.title}</h4>
                <p className="text-[11px] text-slate-500 truncate">{photo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOUNDER / MENTOR SPOTLIGHT ("Why Hridayam by Belvo?") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-blue-contrast rounded-3xl p-6 sm:p-10 border-2 border-blue-300/40 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-blue-400 shadow-md shrink-0 bg-blue-900">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Senior Tech Lead Mentor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase text-sky-300 tracking-wider">
                Leadership & Pedagogy
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Why Hridayam by Belvo?
              </h3>
              <p className="text-xs text-sky-200 max-w-sm">
                "Our single mission is to ensure every learner walks away with practical mastery and a confirmed tech offer letter."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white">
            <div className="flex items-center gap-2">
              <GoogleIcon name="check_circle" size={18} className="text-sky-400" filled />
              <span><strong>100% Placement Assurance</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <GoogleIcon name="check_circle" size={18} className="text-sky-400" filled />
              <span><strong>80% Practical Hands-on Labs</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <GoogleIcon name="check_circle" size={18} className="text-sky-400" filled />
              <span><strong>35+ Real Industry Capstones</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <GoogleIcon name="check_circle" size={18} className="text-sky-400" filled />
              <span><strong>1-on-1 Mentor Guidance</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* BELVO 11 COURSE CATEGORIES SHOWCASE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border-2 border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <GoogleIcon name="hub" size={16} className="text-blue-600" />
            <span>Core Expertise Offered by Belvo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-display">
            Explore Programs Across All 11 Belvo Verticals
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From cutting-edge AI automation to high-margin e-commerce, software engineering, and creative media production — each vertical is taught by practicing industry leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
          {[
            {
              title: 'Digital Marketing and Social Media Management',
              icon: 'campaign',
              desc: 'Full-funnel ads, creative testing matrices, viral Reels & Klaviyo retention.',
              courseId: 'course_digital_marketing_growth',
              badge: 'Growth Lab',
            },
            {
              title: 'Web, App, and Software Development',
              icon: 'terminal',
              desc: 'React 19, TypeScript, Next.js, React Native mobile apps & Docker microservices.',
              courseId: 'course_fullstack_typescript',
              badge: 'Most Popular',
            },
            {
              title: 'Graphic Design, Branding, and UI/UX',
              icon: 'draw',
              desc: 'Figma design tokens, WCAG 2.2 accessibility, interactive wireframes & brand kits.',
              courseId: 'course_uiux_brand_systems',
              badge: 'Design System',
            },
            {
              title: 'Video Editing, Animation, and VFX',
              icon: 'movie_filter',
              desc: 'DaVinci Resolve Rec.709 color science, After Effects motion & 3D tracking.',
              courseId: 'course_motion_vfx_story',
              badge: 'Studio Suite',
            },
            {
              title: 'Artificial Intelligence, Machine Learning, and Automation',
              icon: 'smart_toy',
              desc: 'Generative AI, Gemini API, LangChain RAG, fine-tuned models & autonomous multi-agents.',
              courseId: 'course_ai_automation_workflows',
              badge: 'Flagship #1',
            },
            {
              title: 'E-commerce and Online Business',
              icon: 'storefront',
              desc: 'Shopify Plus architecture, Amazon Seller Central, CRO & supply chain sourcing.',
              courseId: 'course_ecommerce_scale',
              badge: 'D2C Scaling',
            },
            {
              title: 'Photography and Content Creation',
              icon: 'photo_camera',
              desc: 'Studio strobes, commercial product shoots, editorial lighting & short-form video.',
              courseId: 'course_photography_content',
              badge: 'Hands-on Bay',
            },
            {
              title: 'Business Development, Sales, and Entrepreneurship',
              icon: 'trending_up',
              desc: 'Enterprise B2B outreach, MEDDICC deal qualification, SaaS sales & VC pitch decks.',
              courseId: 'course_b2b_sales_ventures',
              badge: 'High Earning',
            },
            {
              title: 'Copywriting, SEO, and Content Marketing',
              icon: 'edit_note',
              desc: 'Direct-response sales letters, Page 1 SEO rankings & automated email funnels.',
              courseId: 'course_seo_copywriting',
              badge: 'Search Domination',
            },
            {
              title: 'Cloud Computing, IT, and Cybersecurity Awareness',
              icon: 'shield',
              desc: 'AWS & Azure infrastructure, Terraform automation & ethical hacking labs.',
              courseId: 'course_cloud_cybersecurity',
              badge: 'Cyber Defense',
            },
            {
              title: 'Data Analytics and Business Intelligence',
              icon: 'analytics',
              desc: 'Executive Power BI & Tableau dashboards, advanced SQL & Snowflake pipelines.',
              courseId: 'course_data_analytics_bi',
              badge: 'Top Placement',
            },
            {
              title: 'Custom Corporate & Emerging Technologies',
              icon: 'add_circle',
              desc: 'Additional courses may be introduced as the platform expands.',
              courseId: 'course_ai_automation_workflows',
              badge: 'Platform Expansion',
              isExpansion: true,
            },
          ].map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectCourse(cat.courseId);
              }}
              className="bg-white rounded-2xl p-5 hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group border-2 border-blue-100 shadow-sm text-slate-900"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white transition-all flex items-center justify-center shadow-2xs border border-blue-200">
                    <GoogleIcon name={cat.icon} size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    {cat.badge}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-blue-100 flex items-center justify-between text-xs text-blue-600 font-bold group-hover:text-blue-800">
                <span>{cat.isExpansion ? 'Suggest Track' : 'View Curriculum'}</span>
                <GoogleIcon
                  name="arrow_forward"
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INDUSTRY ALIGNED PROGRAMS & CAREER TRANSFORMATIONS */}
      <IndustryAlignedProgramsSection
        onSelectCourse={onSelectCourse}
        onRequestCallback={onRequestCallback}
        onDownloadBrochure={onDownloadBrochure}
      />

      {/* 6. CLASSROOM CENTERS TABS & EXPLORER (BLUE-WHITE LAB FRAME) */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl sm:rounded-[40px] border-2 border-blue-100 shadow-xl my-8 bg-gradient-to-b from-blue-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase text-blue-700 tracking-widest">
              Campus Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Our Training Centers in Mumbai, Pune &amp; Nagpur
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Walk in for a 1-on-1 counseling session and experience live classroom labs.
            </p>
          </div>

          {/* Center Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {CLASSROOM_CENTERS.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setSelectedCenterTab(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCenterTab === idx
                    ? 'bg-blue-600 text-white shadow-md border-2 border-blue-600'
                    : 'bg-white text-slate-700 border-2 border-blue-100 hover:border-blue-300'
                }`}
              >
                {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
              </button>
            ))}
          </div>

          {/* Active Center Card */}
          {CLASSROOM_CENTERS[selectedCenterTab] && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto shadow-xl">
              <div className="md:col-span-5 h-64 rounded-2xl overflow-hidden bg-slate-100 border border-blue-200">
                <img
                  src={CLASSROOM_CENTERS[selectedCenterTab].imageUrl}
                  alt={CLASSROOM_CENTERS[selectedCenterTab].name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-xl font-display">
                    {CLASSROOM_CENTERS[selectedCenterTab].name}
                  </h3>
                  {CLASSROOM_CENTERS[selectedCenterTab].isHeadOffice && (
                    <span className="bg-blue-100 text-blue-800 font-bold text-[10px] uppercase px-2 py-0.5 rounded border border-blue-200">
                      Head Office
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {CLASSROOM_CENTERS[selectedCenterTab].address}
                </p>

                <div className="space-y-2 text-xs text-slate-700 bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2">
                    <GoogleIcon name="near_me" size={16} className="text-blue-600" />
                    <span><strong>Transit / Metro:</strong> {CLASSROOM_CENTERS[selectedCenterTab].metroStation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GoogleIcon name="call" size={16} className="text-blue-600" />
                    <span><strong>Phone:</strong> {CLASSROOM_CENTERS[selectedCenterTab].contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GoogleIcon name="schedule" size={16} className="text-blue-600" />
                    <span><strong>Timing:</strong> {CLASSROOM_CENTERS[selectedCenterTab].timing}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => onRequestCallback(`Campus Visit: ${CLASSROOM_CENTERS[selectedCenterTab].name}`)}
                    className="btn-blue-primary px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-md cursor-pointer text-white"
                  >
                    Book Campus Tour
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="btn-blue-glass px-4 py-2.5 rounded-xl text-xs font-semibold text-blue-700 hover:border-blue-500"
                  >
                    Contact Center
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. REFER & EARN PROMOTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-10 border-2 border-blue-400/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden text-white">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/30 backdrop-blur-md">
              <GoogleIcon name="redeem" size={16} className="text-white" />
              Referral Program
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Refer your friend and someone you know and earn an{' '}
              <span className="text-sky-200">Amazon Gift voucher upto 5000 !!</span>
            </h2>
            <p className="text-xs sm:text-sm text-sky-100">
              Share the gift of education with your friends and get a chance of earning upto ₹5000 on every successful enrollment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('refer-earn')}
              className="bg-white text-blue-800 hover:bg-blue-50 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-xl cursor-pointer transition-all"
            >
              Refer Now →
            </button>
            <button
              onClick={() => onNavigate('refer-earn')}
              className="text-xs font-semibold text-sky-200 hover:text-white hover:underline p-2"
            >
              Refer & Earn Policy
            </button>
          </div>
        </div>
      </section>

      {/* 8. PRE-FOOTER CALLBACK FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 text-center space-y-4 shadow-xl text-slate-900">
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            Are You Confused About Which Course to Choose?
          </h2>
          <p className="text-xs text-slate-600 max-w-lg mx-auto">
            Speak to our Senior Academic Advisors. We evaluate your qualification and recommend the optimal career program.
          </p>

          {bottomFormSubmitted ? (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-center max-w-md mx-auto space-y-1">
              <div className="text-sm font-semibold text-slate-900">Thank You, {bottomForm.name}!</div>
              <p className="text-xs text-slate-600">Our advisor will reach out to you within 15 minutes.</p>
            </div>
          ) : (
            <form onSubmit={handleBottomSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto pt-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={bottomForm.name}
                onChange={(e) => setBottomForm({ ...bottomForm, name: e.target.value })}
                className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <input
                type="tel"
                required
                placeholder="Mobile Number"
                value={bottomForm.phone}
                onChange={(e) => setBottomForm({ ...bottomForm, phone: e.target.value })}
                className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <button
                type="submit"
                className="btn-blue-primary px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-md cursor-pointer whitespace-nowrap text-white"
              >
                Request Callback
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 9. FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase text-blue-700 tracking-widest">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Got Questions About Hridayam by Belvo?
          </h2>
        </div>

        <div className="space-y-3">
          {HOME_FAQS.slice(0, 5).map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden transition-all shadow-sm border-2 border-blue-100 hover:border-blue-300 text-slate-900"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left font-bold text-slate-900 text-sm flex items-center justify-between gap-4 hover:bg-blue-50/50 transition-colors"
                >
                  <span>{faq.question}</span>
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
