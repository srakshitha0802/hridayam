import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { CompaniesSlidingMarquee } from './CompaniesSlidingMarquee';
import { DoodleSparkle } from './ThemeDoodles';
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
    <div className="space-y-16 pb-20 relative z-10 text-white">
      {/* 1. HERO SECTION (1ST FRAME - DARKEST TRANSPARENT PINK GLASS & CRISP WHITE CONTENT) */}
      <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[40px] sm:rounded-b-[56px] border-b border-pink-400/35">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headlines & Accreditations (Darkest Transparent Pink Frame) */}
            <div className="lg:col-span-7 space-y-6 glass-dark rounded-3xl p-6 sm:p-8 sm:py-10 border-2 border-pink-400/40 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
              {/* Subtle ambient pink flare */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Trust Badge with Google Icon & Sparkle Doodle */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/80 border border-pink-400/40 text-pink-200 text-xs font-semibold shadow-md">
                <DoodleSparkle className="text-pink-400" />
                <span>Next-Gen Career EdTech • Hridayam by Belvo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                <span className="text-pink-300 font-bold">100% Placement</span>
              </div>

              {/* Main Headline (GenZ learning by a GenZ) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] font-display tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-200 to-pink-300">
                  GenZ learning by a GenZ
                </span>
              </h1>

              {/* Accreditations Bar (NSDC, Skill India, ISO, NASSCOM, AWS) */}
              <div className="flex flex-wrap items-center gap-3 py-3 border-y border-pink-400/30 text-xs text-pink-100">
                <div className="flex items-center gap-1.5 font-semibold text-pink-200">
                  <GoogleIcon name="verified" size={18} className="text-pink-400" filled />
                  <span>NSDC Partner</span>
                </div>
                <span className="text-pink-400/60">•</span>
                <div className="flex items-center gap-1.5 font-semibold text-pink-200">
                  <GoogleIcon name="military_tech" size={18} className="text-pink-400" />
                  <span>Skill India</span>
                </div>
                <span className="text-pink-400/60">•</span>
                <div className="flex items-center gap-1.5 font-semibold text-pink-200">
                  <GoogleIcon name="workspace_premium" size={18} className="text-pink-400" />
                  <span>ISO 9001:2015</span>
                </div>
                <span className="text-pink-400/60">•</span>
                <span className="font-semibold text-pink-200">NASSCOM</span>
                <span className="text-pink-400/60">•</span>
                <span className="font-semibold text-pink-200">AWS Academy</span>
              </div>

              {/* Google Reviews Badge (All Pink & White Theme) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-pink-100">
                <div className="w-6 h-6 rounded-full bg-white/15 shadow-md border border-pink-400/40 flex items-center justify-center font-bold text-pink-300">
                  G
                </div>
                <div className="flex text-pink-300">
                  {[...Array(5)].map((_, i) => (
                    <GoogleIcon key={i} name="star" size={16} filled className="text-pink-300" />
                  ))}
                </div>
                <span>4.9 / 5.0 (5,280+ Student Reviews)</span>
              </div>

              {/* Download Brochure Button & Quick Guidance */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => onDownloadBrochure('Master in Data Science and Analytics with AI')}
                  className="btn-pink-primary px-7 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xl text-white"
                >
                  <GoogleIcon name="download" size={18} className="text-white" />
                  <span className="text-white">Download Brochure</span>
                  <GoogleIcon name="keyboard_arrow_down" size={18} className="text-white" />
                </button>

                <button
                  onClick={() => onRequestCallback()}
                  className="btn-pink-glass px-5 py-3.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-white"
                >
                  <GoogleIcon name="call" size={17} className="text-pink-300" />
                  <span className="text-white">Talk to Counselor</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Form Card ("Let's talk about your career growth!") */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md glass-dark rounded-3xl p-6 sm:p-8 relative overflow-hidden border-2 border-pink-400/40 shadow-2xl backdrop-blur-2xl text-white">
                {/* Decorative Pastel Ambient Orbs inside card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-display">
                      Let's talk about your career growth!
                    </h3>
                    <DoodleSparkle className="text-pink-300" />
                  </div>
                  <p className="text-xs text-pink-200">
                    Get a tailored curriculum roadmap and 100% placement assurance details.
                  </p>

                  {heroFormSubmitted ? (
                    <div className="bg-pink-950/80 border border-pink-400/40 rounded-2xl p-6 text-center space-y-3">
                      <div className="w-12 h-12 bg-gradient-to-tr from-pink-500 to-rose-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                        <GoogleIcon name="check" size={24} weight={600} />
                      </div>
                      <h4 className="font-bold text-white text-base">Request Submitted!</h4>
                      <p className="text-xs text-pink-100">
                        Thank you, {heroForm.name}. A senior career advisor will call you at <strong>{heroForm.phone}</strong> within 15 minutes.
                      </p>
                      <button
                        onClick={() => setHeroFormSubmitted(false)}
                        className="text-xs font-semibold text-pink-300 underline cursor-pointer hover:text-white"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleHeroSubmit} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block text-pink-200 font-medium mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <GoogleIcon
                            name="call"
                            size={16}
                            className="absolute left-3.5 top-3 text-pink-300"
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
                        <label className="block text-pink-200 font-medium mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <GoogleIcon
                            name="person"
                            size={16}
                            className="absolute left-3.5 top-3 text-pink-300"
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
                        <label className="block text-pink-200 font-medium mb-1">
                          Email ID
                        </label>
                        <div className="relative">
                          <GoogleIcon
                            name="mail"
                            size={16}
                            className="absolute left-3.5 top-3 text-pink-300"
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
                        className="w-full py-3.5 rounded-xl btn-pink-primary font-semibold text-xs uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 text-white"
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

      {/* 3. A HIRING CALL EVERY 12 HOURS & STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/80 text-pink-200 border border-pink-400/40 text-xs font-semibold backdrop-blur-md">
            <GoogleIcon name="schedule" size={16} className="text-pink-300" />
            <span>Consistent Placement Momentum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            A Hiring Call Every 12 Hours. Your Turn Next.
          </h2>
        </div>

        {/* 4 Stat Boxes with Darkest Transparent Pink Glass Card Aesthetics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-dark rounded-2xl p-6 text-center space-y-1 border border-pink-400/40 shadow-xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              5,000+
            </div>
            <div className="text-xs text-pink-200 font-medium">No. Of Hiring Companies</div>
          </div>

          <div className="glass-dark rounded-2xl p-6 text-center space-y-1 border border-pink-400/40 shadow-xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-pink-200 font-display">
              2.5 - 4.5 LPA
            </div>
            <div className="text-xs text-pink-200 font-medium">Average Fresher Salary</div>
          </div>

          <div className="glass-dark rounded-2xl p-6 text-center space-y-1 border border-pink-400/40 shadow-xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              19.5 LPA
            </div>
            <div className="text-xs text-pink-200 font-medium">Highest Salary Offered</div>
          </div>

          <div className="glass-dark rounded-2xl p-6 text-center space-y-1 border border-pink-400/40 shadow-xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-pink-200 font-display">
              12,682
            </div>
            <div className="text-xs text-pink-200 font-medium">Alumni Network</div>
          </div>
        </div>

        {/* 4 Real Classroom / Placement Photos Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {campusPhotos.map((photo, idx) => (
            <div
              key={idx}
              className="glass-dark rounded-2xl overflow-hidden group border border-pink-400/40 shadow-xl"
            >
              <div className="h-44 bg-black/40 relative overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180212] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
              <div className="p-4 space-y-1 text-center bg-black/40 backdrop-blur-md">
                <h4 className="font-semibold text-white text-xs truncate">{photo.title}</h4>
                <p className="text-[11px] text-pink-200 truncate">{photo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOUNDER / MENTOR SPOTLIGHT ("Why Hridayam by Belvo?") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-dark rounded-3xl p-6 sm:p-10 border-2 border-pink-400/40 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-pink-400 shadow-md shrink-0 bg-black/40">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Senior Tech Lead Mentor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase text-pink-300 tracking-wider">
                Leadership & Pedagogy
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Why Hridayam by Belvo?
              </h3>
              <p className="text-xs text-pink-200 max-w-sm">
                "Our single mission is to ensure every learner walks away with practical mastery and a confirmed tech offer letter."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white">
            <div className="flex items-center gap-2">
              <GoogleIcon name="check_circle" size={18} className="text-pink-400" filled />
              <span><strong>100% Placement Assurance</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <GoogleIcon name="check_circle" size={18} className="text-pink-400" filled />
              <span><strong>80% Practical Hands-on Labs</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <GoogleIcon name="check_circle" size={18} className="text-pink-400" filled />
              <span><strong>35+ Real Industry Capstones</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <GoogleIcon name="check_circle" size={18} className="text-pink-400" filled />
              <span><strong>1-on-1 Mentor Guidance</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* BELVO 11 COURSE CATEGORIES SHOWCASE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/80 border border-pink-400/40 text-pink-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <GoogleIcon name="hub" size={16} className="text-pink-300" />
            <span>Core Expertise Offered by Belvo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display">
            Explore Programs Across All 11 Belvo Verticals
          </h2>
          <p className="text-xs sm:text-sm text-pink-200 leading-relaxed">
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
              className="glass-dark rounded-2xl p-5 hover:border-pink-300 transition-all cursor-pointer flex flex-col justify-between group border border-pink-400/40 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-pink-900/80 group-hover:bg-pink-700 text-pink-200 group-hover:text-white transition-all flex items-center justify-center shadow-xs border border-pink-400/30">
                    <GoogleIcon name={cat.icon} size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-pink-200 bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-400/40">
                    {cat.badge}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-pink-200 transition-colors line-clamp-2 leading-snug">
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-pink-200 mt-1.5 leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-pink-400/30 flex items-center justify-between text-xs text-pink-300 font-semibold group-hover:text-white">
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

      {/* 6. CLASSROOM CENTERS TABS & EXPLORER (DARK PINK GLASS & REAL LAB BACKGROUND) */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl sm:rounded-[40px] border-y-2 border-pink-400/40 shadow-2xl my-8 glass-dark">
        {/* Background Classroom Board Image Frame (Chalkboard & Smart Screen Lab) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <img
            src="/classroom-board-bg.jpg"
            alt="Belvo Classroom Laboratory"
            className="w-full h-full object-cover opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#24031B]/95 via-[#350525]/90 to-[#1F0217]/95 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase text-pink-300 tracking-widest">
              Campus Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Our Training Centers in Mumbai, Pune &amp; Nagpur
            </h2>
            <p className="text-xs sm:text-sm text-pink-200">
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
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md border border-pink-300/50'
                    : 'bg-black/40 text-pink-200 border border-pink-400/30 hover:bg-white/10'
                }`}
              >
                {c.name.split(' ')[0]} {c.name.split(' ')[1] || ''}
              </button>
            ))}
          </div>

          {/* Active Center Card */}
          {CLASSROOM_CENTERS[selectedCenterTab] && (
            <div className="glass-dark rounded-3xl p-6 sm:p-8 border border-pink-400/40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto shadow-2xl">
              <div className="md:col-span-5 h-64 rounded-2xl overflow-hidden bg-black/40 border border-pink-400/30">
                <img
                  src={CLASSROOM_CENTERS[selectedCenterTab].imageUrl}
                  alt={CLASSROOM_CENTERS[selectedCenterTab].name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xl font-display">
                    {CLASSROOM_CENTERS[selectedCenterTab].name}
                  </h3>
                  {CLASSROOM_CENTERS[selectedCenterTab].isHeadOffice && (
                    <span className="bg-pink-900/80 text-pink-200 font-semibold text-[10px] uppercase px-2 py-0.5 rounded border border-pink-400/40">
                      Head Office
                    </span>
                  )}
                </div>

                <p className="text-xs text-pink-100 leading-relaxed">
                  {CLASSROOM_CENTERS[selectedCenterTab].address}
                </p>

                <div className="space-y-2 text-xs text-pink-100 bg-black/35 p-3.5 rounded-2xl border border-pink-400/30">
                  <div className="flex items-center gap-2">
                    <GoogleIcon name="near_me" size={16} className="text-pink-300" />
                    <span><strong>Transit / Metro:</strong> {CLASSROOM_CENTERS[selectedCenterTab].metroStation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GoogleIcon name="call" size={16} className="text-pink-300" />
                    <span><strong>Phone:</strong> {CLASSROOM_CENTERS[selectedCenterTab].contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GoogleIcon name="schedule" size={16} className="text-pink-300" />
                    <span><strong>Timing:</strong> {CLASSROOM_CENTERS[selectedCenterTab].timing}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => onRequestCallback(`Campus Visit: ${CLASSROOM_CENTERS[selectedCenterTab].name}`)}
                    className="btn-pink-primary px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-md cursor-pointer text-white"
                  >
                    Book Campus Tour
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="btn-pink-glass px-4 py-2.5 rounded-xl text-xs font-semibold text-white"
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
        <div className="glass-dark rounded-3xl p-8 sm:p-10 border-2 border-pink-400/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/80 text-pink-200 text-xs font-semibold uppercase tracking-wider border border-pink-400/40">
              <GoogleIcon name="redeem" size={16} className="text-pink-300" />
              Referral Program
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Refer your friend and someone you know and earn an{' '}
              <span className="text-pink-300">Amazon Gift voucher upto 5000 !!</span>
            </h2>
            <p className="text-xs sm:text-sm text-pink-200">
              Share the gift of education with your friends and get a chance of earning upto ₹5000 on every successful enrollment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('refer-earn')}
              className="btn-pink-primary px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-xl cursor-pointer text-white"
            >
              Refer Now →
            </button>
            <button
              onClick={() => onNavigate('refer-earn')}
              className="text-xs font-semibold text-pink-200 hover:text-white hover:underline p-2"
            >
              Refer & Earn Policy
            </button>
          </div>
        </div>
      </section>

      {/* 8. PRE-FOOTER CALLBACK FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-dark rounded-3xl p-8 border border-pink-400/40 text-center space-y-4 shadow-2xl backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white font-display">
            Are You Confused About Which Course to Choose?
          </h2>
          <p className="text-xs text-pink-200 max-w-lg mx-auto">
            Speak to our Senior Academic Advisors. We evaluate your qualification and recommend the optimal career program.
          </p>

          {bottomFormSubmitted ? (
            <div className="bg-pink-950/80 border border-pink-400/40 rounded-2xl p-4 text-center max-w-md mx-auto space-y-1">
              <div className="text-sm font-semibold text-white">Thank You, {bottomForm.name}!</div>
              <p className="text-xs text-pink-200">Our advisor will reach out to you within 15 minutes.</p>
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
                className="btn-pink-primary px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-lg cursor-pointer whitespace-nowrap text-white"
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
          <span className="text-xs font-semibold uppercase text-pink-300 tracking-widest">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Got Questions About Hridayam by Belvo?
          </h2>
        </div>

        <div className="space-y-3">
          {HOME_FAQS.slice(0, 5).map((faq, index) => {
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
                  <span>{faq.question}</span>
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
