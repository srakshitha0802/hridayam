import React, { useState } from 'react';
import { Course, Category, LearningPath } from '../types';
import { storageService } from '../services/storage';
import { CourseCard } from '../components/common/CourseCard';
import { CategoryCard } from '../components/common/CategoryCard';
import { VideoModal } from '../components/common/VideoModal';
import { navigateTo } from '../utils/navigation';
import {
  Search,
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Clock,
  Compass,
  Laptop,
  Play,
  ShieldCheck,
  Zap,
  TrendingUp,
  FileCheck,
  Eye,
  X,
  Star,
  Users,
  Check,
  ChevronDown,
  ChevronUp,
  Target,
  BarChart3,
  GraduationCap
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [courses] = useState<Course[]>(() => storageService.getCourses());
  const [categories] = useState<Category[]>(() => storageService.getCategories());
  const [learningPaths] = useState<LearningPath[]>(() => storageService.getLearningPaths());

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');

  // Interactive Skill Matcher State
  const [matcherGoal, setMatcherGoal] = useState<'web' | 'ai' | 'marketing' | 'design'>('web');
  const [matcherLevel, setMatcherLevel] = useState<'beginner' | 'intermediate'>('beginner');

  // Video Tour Modal State
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  // FAQ Accordion State (single open index or null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Deliverable Detail Modal State
  const [activeDeliverable, setActiveDeliverable] = useState<{
    title: string;
    category: string;
    description: string;
    techStack: string[];
    features: string[];
  } | null>(null);

  const featuredCourses = courses.filter((c) => c.isFeatured && c.status === 'published');

  // Dynamic Skill Matcher Result Computation
  const getMatchedCourse = (): Course | undefined => {
    if (matcherGoal === 'web') {
      return matcherLevel === 'beginner'
        ? courses.find((c) => c.id === 'course-1') || courses[0]
        : courses.find((c) => c.categoryId === 'track-web-software' && c.level === 'Advanced') || courses[0];
    }
    if (matcherGoal === 'ai') {
      return courses.find((c) => c.id === 'course-2' || c.categoryId === 'track-ai-automation') || courses[0];
    }
    if (matcherGoal === 'marketing') {
      return courses.find((c) => c.id === 'course-3' || c.categoryId === 'track-digital-marketing') || courses[0];
    }
    if (matcherGoal === 'design') {
      return courses.find((c) => c.id === 'course-4' || c.categoryId === 'track-graphic-design') || courses[0];
    }
    return courses[0];
  };

  const matchedCourse = getMatchedCourse();

  const filteredDiscoveryCourses = courses
    .filter((c) => {
      if (c.status !== 'published') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchDesc = c.shortDescription.toLowerCase().includes(q);
        const matchInstructor = c.instructor.name.toLowerCase().includes(q);
        const matchCategory = c.categoryName.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchInstructor && !matchCategory) return false;
      }
      if (selectedCategory !== 'all' && c.categoryId !== selectedCategory) return false;
      if (selectedLevel !== 'all' && c.level.toLowerCase() !== selectedLevel.toLowerCase()) return false;
      if (selectedPrice === 'free' && c.price > 0) return false;
      if (selectedPrice === 'paid' && c.price === 0) return false;
      if (selectedFormat !== 'all' && c.format !== selectedFormat) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // default order
    });

  const practicalDeliverables = [
    {
      title: 'Full-Stack SaaS Task Engine',
      category: 'Software Engineering',
      description: 'Production React 19 & Express web app with JWT authentication, relational database models, and role-based access.',
      techStack: ['React 19', 'TypeScript', 'Express', 'Tailwind CSS', 'PostgreSQL'],
      features: [
        'Secure multi-tenant authentication with refresh tokens',
        'Optimistic UI state mutations with error rollback',
        'Role-protected API routes with server-side rate limiting'
      ]
    },
    {
      title: 'Performance Growth Ad Campaign',
      category: 'Digital Marketing',
      description: 'End-to-end multi-channel acquisition funnel with pixel attribution, copy frameworks, and verified margin models.',
      techStack: ['Meta CBO', 'Google Ads', 'Server CAPI', 'Attribution Modeling'],
      features: [
        'Scientific creative angle matrix testing across 12 ad variations',
        'Server-side Conversions API integration bypassing ad blockers',
        'Break-even ROAS & customer lifetime value (LTV) predictive sheet'
      ]
    },
    {
      title: 'Autonomous Support Intelligence Pipeline',
      category: 'AI & Automation',
      description: 'Event-driven webhook workflow combining n8n and structured LLM tool-calling for customer ticket triage.',
      techStack: ['n8n', 'Gemini API', 'Webhooks', 'Slack Bot', 'PostgreSQL'],
      features: [
        'Instant multi-channel webhook payload ingestion & JSON normalization',
        'Strict schema-enforced LLM classification (Severity 1 to 4)',
        'Automatic CRM ticket creation with idempotent deduplication'
      ]
    },
    {
      title: 'Design System & Component Token Library',
      category: 'UI/UX Design',
      description: 'Enterprise Figma component system with responsive auto-layout, variable modes, and developer handoff specs.',
      techStack: ['Figma 5.0', 'Tokens Studio', 'WCAG AA', 'Design Tokens'],
      features: [
        'Modular typography scale with mathematical spatial grid system',
        'Light and dark mode variable collections with semantic aliasing',
        'Clickable interactive prototypes with micro-interaction states'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Divya Mehra',
      role: 'Head of Operations',
      company: 'FinFlow Technologies',
      course: 'AI & Workflow Automation Masterclass',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      quote:
        'The n8n automation and LLM structured prompt lessons helped us automate over 70% of inbound customer ticket categorization within 2 weeks of starting the course. Truly agency-grade execution.'
    },
    {
      name: 'Rohan Varma',
      role: 'Frontend Engineer',
      company: 'Zeta Innovations',
      course: 'Full-Stack Web Development Foundations',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      quote:
        'Unlike generic tutorials that teach toy examples, Hridayam taught real-world patterns: JWT refresh rotations, optimistic UI updates, and clean modular component design that directly matched my company code.'
    },
    {
      name: 'Ananya Desai',
      role: 'Growth Strategist',
      company: 'CraftBloom Agency',
      course: 'Performance Marketing & Social Media Strategy',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      quote:
        'The break-even ROAS framework and Meta Conversions API implementation alone saved our client accounts thousands of rupees in wasted spend. The instructor gave feedback on our real ad copy.'
    },
    {
      name: 'Karthik Sundaram',
      role: 'Product Designer',
      company: 'Studio Craft',
      course: 'UI/UX Design Systems & Micro-Interactions',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      quote:
        'The verifiable credential feature is a game-changer. My hiring manager verified my certificate ID directly on the Belvo portal during my final interview loop.'
    }
  ];

  const faqs = [
    {
      q: 'What is the philosophy behind Hridayam by Belvo?',
      a: 'Hridayam is Belvo’s digital academy designed to bridge the gap between academic theory and high-standard digital agency execution. Every curriculum is authored and maintained by active practitioners working in software engineering, digital marketing, AI automation, and product design.'
    },
    {
      q: 'Are the free courses genuinely free?',
      a: 'Yes. Foundational courses such as Full-Stack Web Development Foundations and UI/UX Design Systems are 100% free with full access to curriculum, lesson videos, downloadable assets, and assessment quizzes.'
    },
    {
      q: 'How are certificates earned and verified?',
      a: 'Certificates are issued only after 100% lesson completion and achieving a passing grade on the course assessment. Each certificate receives a unique tamper-evident verification ID that can be publicly validated on our verification portal.'
    },
    {
      q: 'Can I study at my own pace?',
      a: 'Yes. All courses provide on-demand video lessons, step-by-step documentation, downloadable code templates, and persistent progress saving across your sessions.'
    },
    {
      q: 'How does payment and enrollment work for paid masterclasses?',
      a: 'Paid masterclasses support Indian payments via Razorpay (UPI, Credit/Debit Cards, and Netbanking) with coupon discounts (e.g. BELVO2026). Enrolment is activated immediately upon verified payment with an official tax invoice receipt and email confirmation.'
    },
    {
      q: 'Can I download the course materials and code starter kits?',
      a: 'Absolutely. Every course comes with downloadable assets—including PDF workbooks, GitHub repository boilerplates, Figma token libraries, and dataset CSVs—all organized in your Student Dashboard Learning Materials tab.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* ----------------- Hero Section with Video Composition ----------------- */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Compelling Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>The Learning Platform by Belvo</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1] text-balance">
                Turn Your Curiosity Into Real-World Skills.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Learn digital, creative, and technical skills through practical courses designed to help you build, create, and grow. Engineered by agency practitioners for students, creators, and professionals.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('/courses')}
                  className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsTourModalOpen(true)}
                  className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2 cursor-pointer border border-slate-200"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-teal-600" />
                  <span>Watch Platform Tour</span>
                </button>
              </div>

              {/* Clean Editorial Value Badges */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-xs font-bold text-slate-900">Project-Driven</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Real code & live deliverables</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Agency Standard</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Built by Belvo practitioners</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Verifiable</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Tamper-evident certificates</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Video Preview Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 p-6 text-white border border-slate-800 shadow-xl overflow-hidden">
                {/* Decorative architectural grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                      <span className="text-xs font-semibold tracking-wide text-teal-300">Curriculum Preview</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">11 Core Disciplines</span>
                  </div>

                  {/* Sample Module Card 1 with Thumbnail Preview */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xs space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">Track 02 · Web & Software Dev</span>
                      <span className="text-teal-400 font-mono text-[11px]">Free Course</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">Full-Stack Architecture & TypeScript Components</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>36 hours · 5 practical modules</span>
                      <button
                        onClick={() => navigateTo('/course/course-1')}
                        className="text-teal-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Syllabus</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Sample Module Card 2 */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xs space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">Track 05 · AI & Workflow Automation</span>
                      <span className="text-emerald-400 font-mono text-[11px]">Masterclass</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">Structured JSON Schemas & Production n8n Pipelines</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>24 hours · Real webhook testing</span>
                      <button
                        onClick={() => navigateTo('/course/course-2')}
                        className="text-emerald-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Syllabus</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Video Reel CTA */}
                  <div
                    onClick={() => setIsTourModalOpen(true)}
                    className="p-3 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-xl flex items-center justify-between text-xs text-teal-300 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 fill-current text-teal-400" />
                      <span className="font-semibold">Watch 2-Min Platform Walkthrough</span>
                    </div>
                    <span className="font-mono text-[10px] bg-teal-950 px-2 py-0.5 rounded text-teal-300">
                      PLAY HD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- Interactive 30-Second Skill Matcher ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3 py-1 rounded-md border border-teal-800/60">
                <Target className="w-3.5 h-3.5" />
                <span>Smart Skill Matcher · 30 Seconds</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Not sure where to begin? Let's match your career objective.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Select your focus area and experience level. We'll instantly match you with the highest-impact Belvo course and learning path.
              </p>

              {/* Goal Selection Buttons */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-400">1. What do you want to master?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'web', label: 'Web & Software', icon: Code2 },
                    { id: 'ai', label: 'AI & Automation', icon: Cpu },
                    { id: 'marketing', label: 'Growth Marketing', icon: TrendingUp },
                    { id: 'design', label: 'UI/UX & Branding', icon: Layers }
                  ].map((g) => {
                    const Icon = g.icon;
                    const isSelected = matcherGoal === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setMatcherGoal(g.id as any)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-sm'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{g.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Level Selection */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-slate-400">2. What is your current proficiency?</label>
                <div className="flex gap-2">
                  {[
                    { id: 'beginner', label: 'Beginner / Career Starter' },
                    { id: 'intermediate', label: 'Practitioner / Upskilling' }
                  ].map((lvl) => {
                    const isSelected = matcherLevel === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setMatcherLevel(lvl.id as any)}
                        className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white text-slate-950 border-white font-bold'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Matched Course Result Card */}
            {matchedCourse && (
              <div className="lg:max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
                  <span className="font-mono text-teal-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    98% High Alignment Match
                  </span>
                  <span className="bg-teal-400/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    {matchedCourse.price === 0 ? 'FREE COURSE' : `₹${matchedCourse.price}`}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    {matchedCourse.categoryName}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                    {matchedCourse.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {matchedCourse.shortDescription}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-300 py-2 border-y border-white/10">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Level</span>
                    <span className="font-semibold text-white">{matchedCourse.level}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Duration</span>
                    <span className="font-semibold text-white">{matchedCourse.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Format</span>
                    <span className="font-semibold text-white">{matchedCourse.format}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => navigateTo(`/course/${matchedCourse.id}`)}
                    className="flex-1 py-2.5 px-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>View Matched Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigateTo('/courses')}
                    className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl transition-all cursor-pointer"
                  >
                    All Courses
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ----------------- Course Discovery & Search ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Search & Filter</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
                Course Discovery Engine
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Browse all 11 disciplines. Filter by domain, skill difficulty, pricing, and format.
              </p>
            </div>
            <button
              onClick={() => navigateTo('/courses')}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Catalogue ({courses.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course title, skill, category, or instructor..."
              className="w-full pl-12 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span className="font-semibold text-slate-500 mr-1">Filter by:</span>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Level Dropdown */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="all">All Skill Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Pricing Dropdown */}
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="all">All Pricing</option>
              <option value="free">Free Courses</option>
              <option value="paid">Paid Masterclasses</option>
            </select>

            {/* Format Dropdown */}
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="all">All Formats</option>
              <option value="Self-Paced">Self-Paced</option>
              <option value="Cohort-Based">Cohort-Based</option>
              <option value="Weekend Intensive">Weekend Intensive</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-teal-500 cursor-pointer ml-auto"
            >
              <option value="featured">Featured Order</option>
              <option value="newest">Newest Releases</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>

            {(searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all' || selectedPrice !== 'all' || selectedFormat !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSelectedPrice('all');
                  setSelectedFormat('all');
                  setSortBy('featured');
                }}
                className="text-xs text-rose-600 hover:underline cursor-pointer ml-2"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Results Grid */}
          <div className="pt-4">
            {filteredDiscoveryCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDiscoveryCourses.slice(0, 6).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <Compass className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-slate-800">No courses match your query</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your search terms or clearing the filter dropdowns.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ----------------- 11 Core Learning Categories ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Disciplines</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              11 Core Learning Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              From full-stack code and AI automations to brand strategy and data modeling — curated practical tracks backed by Belvo.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/categories')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const count = courses.filter((c) => c.categoryId === cat.id && c.status === 'published').length;
            return <CategoryCard key={cat.id} category={cat} courseCount={count} />;
          })}
        </div>
      </section>

      {/* ----------------- Featured Programs ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Editor's Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Featured Programs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Comprehensive curriculums with complete lesson syllabi, downloadable project assets, and verifiable completion credentials.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/courses')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Browse Full Catalogue ({courses.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.slice(0, 6).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* ----------------- Belvo Agency Standard vs Traditional Academies ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-md border border-teal-200">
            Agency Rigor vs Traditional Academies
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mt-3">
            Why Learning with an Active Agency Makes All the Difference
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Most bootcamps teach 4-year-old curriculum on toy projects. Hridayam applies Belvo's active production standards to every module.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="py-4 px-6 font-bold text-slate-900 uppercase tracking-wider">Evaluation Dimension</th>
                  <th className="py-4 px-6 font-bold text-teal-800 bg-teal-50/70 border-x border-teal-100 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      Hridayam by Belvo
                    </span>
                  </th>
                  <th className="py-4 px-6 font-bold text-slate-500 uppercase tracking-wider">Conventional Online Academies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    dim: 'Curriculum & Stack',
                    belvo: 'Active 2026 client toolchains: React 19, TypeScript, n8n, Meta CBO, Figma 5.0 variables',
                    other: 'Outdated slides and obsolete tutorials recorded years ago on legacy versions'
                  },
                  {
                    dim: 'Deliverables & Portfolio',
                    belvo: 'Authentic agency deliverables: multi-tenant SaaS, client ad matrices, webhook automations',
                    other: 'Toy to-do list apps and placeholder lorem ipsum templates'
                  },
                  {
                    dim: 'Credential Verification',
                    belvo: 'Cryptographic tamper-evident ID verifiable anytime by employers on public portal',
                    other: 'Static PDF certificate with no tamper verification or proof of assessment'
                  },
                  {
                    dim: 'Assessments & Quizzes',
                    belvo: 'Strict passing threshold (70%+), timed quizzes, code tests, and project brief reviews',
                    other: 'Auto-granted completion without validating practical student comprehension'
                  },
                  {
                    dim: 'Pricing & Integrity',
                    belvo: 'Free foundational courses + transparent flat masterclasses with GST tax invoices',
                    other: 'Aggressive sales calls, predatory multi-lakh loans, and hidden subscription fees'
                  }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">{row.dim}</td>
                    <td className="py-4 px-6 bg-teal-50/30 border-x border-teal-100 text-teal-950 font-medium">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{row.belvo}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{row.other}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ----------------- Learning Paths ----------------- */}
      <section className="bg-slate-900 text-white py-20 -mx-4 sm:-mx-6 px-4 sm:px-6 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400">
                Career Trajectories
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Curated Learning Paths
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Structured sequences of courses designed to take you from foundational concepts to professional, role-ready execution.
              </p>
            </div>

            <button
              onClick={() => navigateTo('/paths')}
              className="text-xs font-semibold text-teal-300 hover:text-white inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All Career Paths</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.slice(0, 3).map((path) => (
              <div
                key={path.id}
                onClick={() => navigateTo(`/paths`)}
                className="group bg-slate-950/70 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-mono text-teal-400">{path.totalDurationHours}h sequence</span>
                    <span>{path.courseIds.length} courses included</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors mb-2">
                    {path.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {path.shortDescription}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-800/80 mb-6">
                    <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">Target Role:</p>
                    <p className="text-xs text-teal-300 font-medium">{path.targetRole}</p>
                  </div>
                </div>

                <div className="flex items-center text-xs font-semibold text-teal-400 group-hover:text-teal-300 gap-1">
                  <span>Explore Sequence</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- Practical Learning Showcase ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-1">
              <Laptop className="w-3.5 h-3.5" />
              <span>Demonstration Deliverables</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
              Practical Learning Showcase
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Illustrative examples of real-world portfolio deliverables built throughout Hridayam courses. Click any project to inspect specs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practicalDeliverables.map((proj, idx) => (
              <div
                key={idx}
                onClick={() => setActiveDeliverable(proj)}
                className="bg-white border border-slate-200 hover:border-teal-500/50 hover:shadow-md rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 font-semibold">
                      {proj.category}
                    </span>
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                  {proj.techStack.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- Alumni & Student Testimonials ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Verified Alumni</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Taught by Practitioners. Proven by Learners.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Real feedback from students, founders, and professionals who have leveled up their technical and digital skills with Hridayam.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-lg">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>4.9 / 5.0 Average Platform Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.role} · {t.company}</p>
                  <span className="text-[10px] text-teal-700 font-mono font-medium block mt-0.5">
                    {t.course}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- How It Works ----------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Step by Step
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mt-1">
            How Hridayam Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
          {[
            { step: '01', title: 'Discover', desc: 'Browse 11 core tracks & find the skill you need.' },
            { step: '02', title: 'Enrol', desc: 'Join free or paid courses with instant access.' },
            { step: '03', title: 'Build', desc: 'Watch structured video lessons and build code.' },
            { step: '04', title: 'Assess', desc: 'Pass rigorous module quizzes & submit work.' },
            { step: '05', title: 'Certify', desc: 'Receive your verified Belvo digital credential.' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-2 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block border border-teal-200/50">
                {item.step}
              </span>
              <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- Frequently Asked Questions (Interactive Accordion) ----------------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Everything you need to know about enrolment, curriculums, certificates, and student support.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{faq.q}</span>
                  </h4>
                  <div className="p-1 rounded-lg bg-slate-100 text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100/80">
                    <p className="ml-6.5">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigateTo('/faq')}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Help & FAQ Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Video Platform Tour Modal */}
      <VideoModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        title="Hridayam by Belvo — Platform Overview & Philosophy"
        videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        subtitle="Practical learning, verifiable skills, agency-backed curricula."
      />

      {/* Deliverable Details Modal */}
      {activeDeliverable && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-teal-700 font-bold">
                  {activeDeliverable.category}
                </span>
                <h3 className="text-base font-bold text-slate-950 mt-0.5">
                  {activeDeliverable.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDeliverable(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeDeliverable.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900">Key Production Features:</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeDeliverable.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Toolchain & Technologies:</p>
              <div className="flex flex-wrap gap-1.5">
                {activeDeliverable.techStack.map((t, i) => (
                  <span key={i} className="text-[11px] font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveDeliverable(null)}
                className="px-4 py-2 bg-slate-950 text-white text-xs font-semibold rounded-xl hover:bg-slate-800"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
