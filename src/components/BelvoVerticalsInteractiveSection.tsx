import React, { useState, useEffect, useRef } from 'react';
import { GoogleIcon } from './GoogleIcon';

export interface BelvoVerticalItem {
  id: string;
  title: string;
  badge: string;
  desc: string;
  category: 'Tech' | 'Design' | 'Growth' | 'Enterprise';
  icon: string;
  courseId: string;
  actionText: string;
  isExpansion?: boolean;
  tools: string[];
  salaryHike: string;
  targetRole: string;
  hiringPartners: string[];
  colorGradient: string;
}

export const BELVO_VERTICALS_DATA: BelvoVerticalItem[] = [
  {
    id: 'vertical-1',
    badge: 'Growth Lab',
    title: 'Digital Marketing and Social Media Management',
    desc: 'Full-funnel ads, creative testing matrices, viral Reels & Klaviyo retention.',
    category: 'Growth',
    icon: 'campaign',
    courseId: 'course_digital_marketing_growth',
    actionText: 'View Curriculum',
    tools: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'Klaviyo', 'GA4'],
    salaryHike: '₹12 - ₹24 LPA',
    targetRole: 'Performance Marketing Lead',
    hiringPartners: ['Nykaa', 'Swiggy', 'Zomato', 'Publicis'],
    colorGradient: 'from-[#1E428E] to-[#3869C3]',
  },
  {
    id: 'vertical-2',
    badge: 'Most Popular',
    title: 'Web, App, and Software Development',
    desc: 'React 19, TypeScript, Next.js, React Native mobile apps & Docker microservices.',
    category: 'Tech',
    icon: 'terminal',
    courseId: 'course_fullstack_typescript',
    actionText: 'View Curriculum',
    tools: ['React 19', 'TypeScript', 'Next.js', 'Node.js', 'Docker', 'PostgreSQL'],
    salaryHike: '₹14 - ₹28 LPA',
    targetRole: 'Full Stack SDE / Tech Lead',
    hiringPartners: ['Amazon', 'Microsoft', 'Cred', 'Flipkart'],
    colorGradient: 'from-[#3869C3] to-[#5A87D7]',
  },
  {
    id: 'vertical-3',
    badge: 'Design System',
    title: 'Graphic Design, Branding, and UI/UX',
    desc: 'Figma design tokens, WCAG 2.2 accessibility, interactive wireframes & brand kits.',
    category: 'Design',
    icon: 'draw',
    courseId: 'course_uiux_brand_systems',
    actionText: 'View Curriculum',
    tools: ['Figma', 'Illustrator', 'Spline 3D', 'Design Tokens', 'Photoshop'],
    salaryHike: '₹10 - ₹22 LPA',
    targetRole: 'Senior Product UI/UX Designer',
    hiringPartners: ['Razorpay', 'Swiggy', 'PhonePe', 'Adobe'],
    colorGradient: 'from-[#5A87D7] to-[#84ADEB]',
  },
  {
    id: 'vertical-4',
    badge: 'Studio Suite',
    title: 'Video Editing, Animation, and VFX',
    desc: 'DaVinci Resolve Rec.709 color science, After Effects motion & 3D tracking.',
    category: 'Design',
    icon: 'movie_filter',
    courseId: 'course_motion_vfx_story',
    actionText: 'View Curriculum',
    tools: ['DaVinci Resolve', 'After Effects', 'Blender', 'Premiere Pro'],
    salaryHike: '₹8 - ₹18 LPA',
    targetRole: 'Lead Motion Designer / VFX Artist',
    hiringPartners: ['Red Chillies', 'Disney+ Hotstar', 'DDB Mudra'],
    colorGradient: 'from-[#1E428E] to-[#5A87D7]',
  },
  {
    id: 'vertical-5',
    badge: 'Flagship #1',
    title: 'Artificial Intelligence, Machine Learning, and Automation',
    desc: 'Generative AI, Gemini API, LangChain RAG, fine-tuned models & autonomous multi-agents.',
    category: 'Tech',
    icon: 'smart_toy',
    courseId: 'course_ai_automation_workflows',
    actionText: 'View Curriculum',
    tools: ['Gemini API', 'Python', 'PyTorch', 'LangChain', 'Ollama', 'Vector DBs'],
    salaryHike: '₹18 - ₹34 LPA',
    targetRole: 'AI / RAG Solutions Engineer',
    hiringPartners: ['Capgemini', 'IBM', 'Google Cloud', 'Fractal Analytics'],
    colorGradient: 'from-[#1E428E] via-[#3869C3] to-[#84ADEB]',
  },
  {
    id: 'vertical-6',
    badge: 'D2C Scaling',
    title: 'E-commerce and Online Business',
    desc: 'Shopify Plus architecture, Amazon Seller Central, CRO & supply chain sourcing.',
    category: 'Growth',
    icon: 'storefront',
    courseId: 'course_ecommerce_scale',
    actionText: 'View Curriculum',
    tools: ['Shopify Plus', 'Amazon Central', 'Helium 10', 'Hotjar', 'Klaviyo'],
    salaryHike: '₹12 - ₹25 LPA',
    targetRole: 'Head of E-Commerce Growth',
    hiringPartners: ['Boat Lifestyle', 'Mamaearth', 'Lenskart', 'Amazon'],
    colorGradient: 'from-[#3869C3] to-[#84ADEB]',
  },
  {
    id: 'vertical-7',
    badge: 'Hands-on Bay',
    title: 'Photography and Content Creation',
    desc: 'Studio strobes, commercial product shoots, editorial lighting & short-form video.',
    category: 'Design',
    icon: 'photo_camera',
    courseId: 'course_photography_content',
    actionText: 'View Curriculum',
    tools: ['Profoto Strobes', 'Sony Cinema', 'Lightroom CC', 'Capture One'],
    salaryHike: '₹8 - ₹16 LPA',
    targetRole: 'Commercial Brand Creator & Director',
    hiringPartners: ['Myntra', 'Vogue India', 'Dentsu', 'Ogilvy'],
    colorGradient: 'from-[#5A87D7] to-[#1E428E]',
  },
  {
    id: 'vertical-8',
    badge: 'High Earning',
    title: 'Business Development, Sales, and Entrepreneurship',
    desc: 'Enterprise B2B outreach, MEDDICC deal qualification, SaaS sales & VC pitch decks.',
    category: 'Growth',
    icon: 'trending_up',
    courseId: 'course_b2b_sales_ventures',
    actionText: 'View Curriculum',
    tools: ['Salesforce', 'Apollo.io', 'Gong.io', 'PitchBook', 'LinkedIn Sales Nav'],
    salaryHike: '₹16 - ₹32 LPA',
    targetRole: 'Enterprise Account Executive / Growth Lead',
    hiringPartners: ['Salesforce', 'HubSpot', 'Freshworks', 'Zoho'],
    colorGradient: 'from-[#1E428E] to-[#3869C3]',
  },
  {
    id: 'vertical-9',
    badge: 'Search Domination',
    title: 'Copywriting, SEO, and Content Marketing',
    desc: 'Direct-response sales letters, Page 1 SEO rankings & automated email funnels.',
    category: 'Growth',
    icon: 'edit_note',
    courseId: 'course_seo_copywriting',
    actionText: 'View Curriculum',
    tools: ['Ahrefs', 'SEMrush', 'SurferSEO', 'ConvertKit', 'Search Console'],
    salaryHike: '₹9 - ₹18 LPA',
    targetRole: 'Content & SEO Growth Strategist',
    hiringPartners: ['HubSpot', 'Webchutney', 'Schbang', 'Times Internet'],
    colorGradient: 'from-[#3869C3] to-[#5A87D7]',
  },
  {
    id: 'vertical-10',
    badge: 'Cyber Defense',
    title: 'Cloud Computing, IT, and Cybersecurity Awareness',
    desc: 'AWS & Azure infrastructure, Terraform automation & ethical hacking labs.',
    category: 'Tech',
    icon: 'shield',
    courseId: 'course_cloud_cybersecurity',
    actionText: 'View Curriculum',
    tools: ['AWS Cloud', 'Azure', 'Terraform', 'Linux', 'Wireshark', 'Burp Suite'],
    salaryHike: '₹14 - ₹26 LPA',
    targetRole: 'Cloud DevOps / SecOps Engineer',
    hiringPartners: ['TCS', 'Infosys', 'Wipro', 'Accenture'],
    colorGradient: 'from-[#1E428E] to-[#84ADEB]',
  },
  {
    id: 'vertical-11',
    badge: 'Top Placement',
    title: 'Data Analytics and Business Intelligence',
    desc: 'Executive Power BI & Tableau dashboards, advanced SQL & Snowflake pipelines.',
    category: 'Tech',
    icon: 'analytics',
    courseId: 'course_data_analytics_bi',
    actionText: 'View Curriculum',
    tools: ['Power BI', 'Snowflake', 'SQL', 'Python', 'Tableau', 'dbt'],
    salaryHike: '₹12 - ₹24 LPA',
    targetRole: 'Lead BI & Analytics Consultant',
    hiringPartners: ['Deloitte', 'EY', 'PwC', 'KPMG', 'Mu Sigma'],
    colorGradient: 'from-[#3869C3] to-[#5A87D7]',
  },
  {
    id: 'vertical-12',
    badge: 'Platform Expansion',
    title: 'Custom Corporate & Emerging Technologies',
    desc: 'Additional courses may be introduced as the platform expands.',
    category: 'Enterprise',
    icon: 'add_circle',
    courseId: 'course_ai_automation_workflows',
    actionText: 'Suggest Track',
    isExpansion: true,
    tools: ['Enterprise Cohorts', 'Executive AI', 'Spatial Computing', 'Web3'],
    salaryHike: 'Custom Track',
    targetRole: 'Enterprise Innovation Specialist',
    hiringPartners: ['Belvo Enterprise Labs', 'Corporate Partners'],
    colorGradient: 'from-[#5A87D7] via-[#84ADEB] to-[#D3E5FD]',
  },
];

interface BelvoVerticalsInteractiveSectionProps {
  onSelectCourse: (courseId: string) => void;
  onRequestCallback: (interest?: string) => void;
}

export const BelvoVerticalsInteractiveSection: React.FC<BelvoVerticalsInteractiveSectionProps> = ({
  onSelectCourse,
  onRequestCallback,
}) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'slideshow' | 'grid'>('flow');
  const [selectedVertical, setSelectedVertical] = useState<BelvoVerticalItem>(BELVO_VERTICALS_DATA[4]); // Default to AI
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Tech' | 'Design' | 'Growth'>('All');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredVerticals =
    selectedFilter === 'All'
      ? BELVO_VERTICALS_DATA
      : BELVO_VERTICALS_DATA.filter((v) => v.category === selectedFilter || v.isExpansion);

  // Slideshow auto-advance
  useEffect(() => {
    if (activeTab === 'slideshow' && isAutoPlaying) {
      slideshowTimerRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % BELVO_VERTICALS_DATA.length);
      }, 4500);
    }
    return () => {
      if (slideshowTimerRef.current) clearInterval(slideshowTimerRef.current);
    };
  }, [activeTab, isAutoPlaying]);

  const currentSlide = BELVO_VERTICALS_DATA[currentSlideIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10 text-[#1E428E]">
      {/* 1. Header Frame in High-Clarity Frosted Glass */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-3 border-2 border-white shadow-xl backdrop-blur-2xl">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border-2 border-[#D3E5FD] text-[#1E428E] text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <GoogleIcon name="hub" size={16} className="text-[#3869C3]" />
            <span>Core Expertise Offered by Belvo</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E428E] font-display tracking-tight">
            Explore Programs Across All <span className="text-[#3869C3]">11 Belvo Verticals</span>
          </h2>

          <p className="text-sm sm:text-base text-[#1E428E] leading-relaxed font-bold max-w-2xl mx-auto">
            From cutting-edge AI automation to high-margin e-commerce, software engineering, and creative media production — each vertical is taught by practicing industry leaders.
          </p>

          {/* Interactive Mode Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 pt-3 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('flow')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'flow'
                  ? 'btn-blue-primary text-white shadow-md border-2 border-white'
                  : 'glass-card text-[#1E428E] hover:border-[#3869C3] border-2 border-white'
              }`}
            >
              <GoogleIcon name="account_tree" size={16} />
              <span>Career Flow Graph</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('slideshow')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'slideshow'
                  ? 'btn-blue-primary text-white shadow-md border-2 border-white'
                  : 'glass-card text-[#1E428E] hover:border-[#3869C3] border-2 border-white'
              }`}
            >
              <GoogleIcon name="slideshow" size={16} />
              <span>Interactive Slideshow</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('grid')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'grid'
                  ? 'btn-blue-primary text-white shadow-md border-2 border-white'
                  : 'glass-card text-[#1E428E] hover:border-[#3869C3] border-2 border-white'
              }`}
            >
              <GoogleIcon name="grid_view" size={16} />
              <span>All 12 Tracks Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: CAREER FLOW GRAPH (CREATIVE INTERCONNECTED MATRIX)                */}
      {/* ========================================================================= */}
      {activeTab === 'flow' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Flow Matrix Canvas Frame */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-white shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            {/* Ambient Background Grid & Pulses */}
            <div className="absolute inset-0 bg-radial-gradient from-white/30 via-transparent to-transparent pointer-events-none opacity-60" />

            <div className="flex flex-col lg:flex-row items-stretch gap-8 relative z-10">
              {/* Left Column: 3 Strategic Domains Flow Columns */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between border-b border-[#D3E5FD] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#3869C3] animate-ping" />
                    <span className="text-xs font-extrabold uppercase text-[#1E428E] tracking-wider">
                      Interactive Career Pathways
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#3869C3] bg-white px-2.5 py-1 rounded-full border border-[#D3E5FD]">
                    Click any node to inspect syllabus
                  </span>
                </div>

                {/* 3 Career Ecosystem Clusters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Cluster 1: Tech & AI Core */}
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#1E428E] to-[#3869C3] text-white text-xs font-extrabold flex items-center justify-between shadow-xs">
                      <span className="flex items-center gap-1.5">
                        <GoogleIcon name="terminal" size={15} />
                        <span>Tech &amp; AI Core</span>
                      </span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">4 Tracks</span>
                    </div>

                    <div className="space-y-2.5">
                      {BELVO_VERTICALS_DATA.filter((v) => v.category === 'Tech').map((item) => {
                        const isSelected = selectedVertical.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedVertical(item)}
                            className={`p-3.5 rounded-2xl cursor-pointer transition-all border-2 text-left relative ${
                              isSelected
                                ? 'bg-white shadow-lg border-[#3869C3] scale-102 ring-2 ring-[#3869C3]/20'
                                : 'glass-card border-white hover:border-[#5A87D7] hover:bg-white/80'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#D3E5FD] text-[#1E428E] border border-white">
                                {item.badge}
                              </span>
                              <GoogleIcon name={item.icon} size={16} className="text-[#3869C3]" />
                            </div>
                            <h4 className="text-xs font-bold text-[#1E428E] line-clamp-1 leading-snug">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-[#1E428E]/75 line-clamp-1 mt-0.5 font-medium">
                              {item.tools.slice(0, 3).join(' • ')}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cluster 2: Design & Media Studio */}
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#3869C3] to-[#5A87D7] text-white text-xs font-extrabold flex items-center justify-between shadow-xs">
                      <span className="flex items-center gap-1.5">
                        <GoogleIcon name="palette" size={15} />
                        <span>Design &amp; Media</span>
                      </span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">3 Tracks</span>
                    </div>

                    <div className="space-y-2.5">
                      {BELVO_VERTICALS_DATA.filter((v) => v.category === 'Design').map((item) => {
                        const isSelected = selectedVertical.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedVertical(item)}
                            className={`p-3.5 rounded-2xl cursor-pointer transition-all border-2 text-left relative ${
                              isSelected
                                ? 'bg-white shadow-lg border-[#3869C3] scale-102 ring-2 ring-[#3869C3]/20'
                                : 'glass-card border-white hover:border-[#5A87D7] hover:bg-white/80'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#D3E5FD] text-[#1E428E] border border-white">
                                {item.badge}
                              </span>
                              <GoogleIcon name={item.icon} size={16} className="text-[#3869C3]" />
                            </div>
                            <h4 className="text-xs font-bold text-[#1E428E] line-clamp-1 leading-snug">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-[#1E428E]/75 line-clamp-1 mt-0.5 font-medium">
                              {item.tools.slice(0, 3).join(' • ')}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cluster 3: Growth, D2C & Monetization */}
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#5A87D7] to-[#1E428E] text-white text-xs font-extrabold flex items-center justify-between shadow-xs">
                      <span className="flex items-center gap-1.5">
                        <GoogleIcon name="trending_up" size={15} />
                        <span>Growth &amp; D2C</span>
                      </span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">5 Tracks</span>
                    </div>

                    <div className="space-y-2.5">
                      {BELVO_VERTICALS_DATA.filter(
                        (v) => v.category === 'Growth' || v.category === 'Enterprise'
                      ).map((item) => {
                        const isSelected = selectedVertical.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedVertical(item)}
                            className={`p-3.5 rounded-2xl cursor-pointer transition-all border-2 text-left relative ${
                              isSelected
                                ? 'bg-white shadow-lg border-[#3869C3] scale-102 ring-2 ring-[#3869C3]/20'
                                : 'glass-card border-white hover:border-[#5A87D7] hover:bg-white/80'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#D3E5FD] text-[#1E428E] border border-white">
                                {item.badge}
                              </span>
                              <GoogleIcon name={item.icon} size={16} className="text-[#3869C3]" />
                            </div>
                            <h4 className="text-xs font-bold text-[#1E428E] line-clamp-1 leading-snug">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-[#1E428E]/75 line-clamp-1 mt-0.5 font-medium">
                              {item.tools.slice(0, 3).join(' • ')}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Node Inspector Spotlight Card */}
              <div className="w-full lg:w-96 flex flex-col justify-between glass-card rounded-3xl p-6 border-2 border-white shadow-xl relative bg-white/90">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#1E428E] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      {selectedVertical.badge}
                    </span>
                    <span className="text-xs font-extrabold text-[#3869C3] flex items-center gap-1">
                      <GoogleIcon name="payments" size={15} />
                      {selectedVertical.salaryHike}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#1E428E] leading-snug font-display">
                      {selectedVertical.title}
                    </h3>
                    <p className="text-xs text-[#1E428E] mt-2 leading-relaxed font-semibold">
                      {selectedVertical.desc}
                    </p>
                  </div>

                  {/* Career Role Outcome */}
                  <div className="p-3.5 rounded-2xl bg-[#D3E5FD]/50 border border-white space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-[#1E428E] block">
                      Target Placement Role
                    </span>
                    <span className="text-xs font-bold text-[#3869C3] block">
                      {selectedVertical.targetRole}
                    </span>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase text-[#1E428E] tracking-wider block">
                      Production Stack &amp; Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedVertical.tools.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#D3E5FD] text-[#1E428E] text-[11px] font-bold shadow-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hiring MNCs & Startups */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-extrabold uppercase text-[#1E428E] tracking-wider block">
                      Hiring Companies
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-xs text-[#1E428E] font-bold">
                      {selectedVertical.hiringPartners.map((h, idx) => (
                        <span key={idx} className="bg-white/80 px-2 py-0.5 rounded-md border border-white">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-2 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedVertical.isExpansion) {
                        onRequestCallback('Suggest Track / Corporate Cohort');
                      } else {
                        onSelectCourse(selectedVertical.courseId);
                      }
                    }}
                    className="w-full py-3.5 rounded-xl btn-blue-primary font-bold text-xs uppercase tracking-wider text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-white"
                  >
                    <span>{selectedVertical.actionText}</span>
                    <GoogleIcon name="arrow_forward" size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestCallback(selectedVertical.title)}
                    className="w-full py-2.5 rounded-xl btn-blue-glass font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <GoogleIcon name="chat" size={15} />
                    <span>Talk to Track Mentor</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: INTERACTIVE SLIDESHOW CAROUSEL                                    */}
      {/* ========================================================================= */}
      {activeTab === 'slideshow' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border-2 border-white shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            {/* Top Toolbar: Slide Progress & Controls */}
            <div className="flex items-center justify-between pb-6 border-b border-[#D3E5FD] gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#1E428E] text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                  {currentSlideIndex + 1}/{BELVO_VERTICALS_DATA.length}
                </span>
                <div>
                  <span className="text-xs font-extrabold text-[#1E428E] uppercase tracking-wider block">
                    Belvo Studio Showcase
                  </span>
                  <span className="text-[11px] font-bold text-[#3869C3]">
                    {currentSlide.category} Ecosystem
                  </span>
                </div>
              </div>

              {/* Prev / Play-Pause / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#D3E5FD] text-[#1E428E] text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer hover:border-[#3869C3]"
                >
                  <GoogleIcon name={isAutoPlaying ? 'pause' : 'play_arrow'} size={15} />
                  <span>{isAutoPlaying ? 'Pause' : 'Auto Play'}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlideIndex(
                      (prev) => (prev - 1 + BELVO_VERTICALS_DATA.length) % BELVO_VERTICALS_DATA.length
                    )
                  }
                  className="w-9 h-9 rounded-xl bg-white border border-[#D3E5FD] text-[#1E428E] flex items-center justify-center shadow-xs cursor-pointer hover:border-[#3869C3]"
                  aria-label="Previous Slide"
                >
                  <GoogleIcon name="chevron_left" size={20} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlideIndex((prev) => (prev + 1) % BELVO_VERTICALS_DATA.length)
                  }
                  className="w-9 h-9 rounded-xl bg-white border border-[#D3E5FD] text-[#1E428E] flex items-center justify-center shadow-xs cursor-pointer hover:border-[#3869C3]"
                  aria-label="Next Slide"
                >
                  <GoogleIcon name="chevron_right" size={20} />
                </button>
              </div>
            </div>

            {/* Slide Stage Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
              {/* Left Stage Details */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#D3E5FD] text-[#1E428E] text-xs font-extrabold shadow-xs">
                  <GoogleIcon name={currentSlide.icon} size={16} className="text-[#3869C3]" />
                  <span>{currentSlide.badge}</span>
                  <span className="text-[#3869C3]">•</span>
                  <span>{currentSlide.salaryHike}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E428E] font-display tracking-tight leading-tight">
                  {currentSlide.title}
                </h3>

                <p className="text-sm sm:text-base text-[#1E428E] font-semibold leading-relaxed max-w-xl">
                  {currentSlide.desc}
                </p>

                {/* Target Role & Tools Pills */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-[#1E428E]">
                    <strong className="text-[#3869C3]">Target Role:</strong> {currentSlide.targetRole}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentSlide.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-white border-2 border-white text-xs font-bold text-[#1E428E] shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentSlide.isExpansion) {
                        onRequestCallback('Suggest Track / Corporate Cohort');
                      } else {
                        onSelectCourse(currentSlide.courseId);
                      }
                    }}
                    className="py-3 px-6 rounded-xl btn-blue-primary font-bold text-xs uppercase tracking-wider text-white shadow-lg flex items-center gap-2 cursor-pointer border border-white"
                  >
                    <span>{currentSlide.actionText}</span>
                    <GoogleIcon name="arrow_forward" size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestCallback(currentSlide.title)}
                    className="py-3 px-6 rounded-xl btn-blue-glass font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <GoogleIcon name="calendar_month" size={16} />
                    <span>Book Demo</span>
                  </button>
                </div>
              </div>

              {/* Right Stage Visual Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm glass-card rounded-3xl p-6 sm:p-8 border-2 border-white shadow-2xl relative text-center space-y-4 bg-white/95">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#1E428E] to-[#3869C3] text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <GoogleIcon name={currentSlide.icon} size={36} />
                  </div>

                  <div>
                    <span className="text-xs font-extrabold text-[#3869C3] uppercase tracking-wider">
                      Verified Capstones
                    </span>
                    <h4 className="text-lg font-extrabold text-[#1E428E] mt-1">
                      {currentSlide.targetRole}
                    </h4>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#D3E5FD]/40 border border-[#84ADEB]/30 text-xs text-[#1E428E] space-y-1">
                    <span className="font-bold block">Top Hiring Partners</span>
                    <p className="font-semibold text-[11px] text-[#1E428E]/85">
                      {currentSlide.hiringPartners.join(' • ')}
                    </p>
                  </div>

                  <div className="text-[11px] text-[#1E428E] font-bold">
                    Dual Certificate • 1-on-1 Mentorship • Daily Code Clinic
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Navigation Dots */}
            <div className="flex items-center justify-center gap-2 pt-8 flex-wrap">
              {BELVO_VERTICALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'w-8 bg-[#1E428E]'
                      : 'w-2.5 bg-white border border-[#D3E5FD] hover:bg-[#3869C3]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: ALL 12 TRACKS INTERACTIVE GRID                                    */}
      {/* ========================================================================= */}
      {activeTab === 'grid' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
            {(['All', 'Tech', 'Design', 'Growth'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? 'btn-blue-primary text-white shadow-md border-2 border-white'
                    : 'glass-card text-[#1E428E] hover:border-[#3869C3] border-2 border-white'
                }`}
              >
                {cat === 'All' ? 'All 12 Verticals' : `${cat} Tracks`}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVerticals.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.isExpansion) {
                    onRequestCallback('Custom Corporate & Emerging Technologies Track');
                  } else {
                    onSelectCourse(cat.courseId);
                  }
                }}
                className="glass-card rounded-2xl p-5 hover:border-[#3869C3] shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group border-2 border-white text-[#1E428E]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-[#3869C3] text-[#1E428E] group-hover:text-white transition-all flex items-center justify-center shadow-xs border border-[#D3E5FD]">
                      <GoogleIcon name={cat.icon} size={20} />
                    </div>
                    <span className="text-[10px] font-extrabold text-[#1E428E] bg-[#D3E5FD] px-2.5 py-0.5 rounded-full border border-white">
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1E428E] text-sm group-hover:text-[#3869C3] transition-colors line-clamp-2 leading-snug">
                      {cat.title}
                    </h4>
                    <p className="text-[11px] text-[#1E428E] mt-1.5 leading-relaxed line-clamp-2 font-medium">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {cat.tools.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-bold text-[#3869C3] bg-white px-2 py-0.5 rounded border border-[#D3E5FD]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#D3E5FD] flex items-center justify-between text-xs text-[#3869C3] font-bold group-hover:text-[#1E428E]">
                  <span>{cat.actionText}</span>
                  <GoogleIcon
                    name="arrow_forward"
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
