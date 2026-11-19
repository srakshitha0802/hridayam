import React, { useMemo, useState } from 'react';
import {
  Search,
  ArrowRight,
  Download,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Award,
  Briefcase,
  Layers,
  Calendar,
} from 'lucide-react';
import { ITV_COURSES, PLACED_STUDENTS } from '../data/itvedantData';
import { COURSE_COVER_IMAGES, INDIAN_STUDENT_PORTRAITS } from '../data/mediaAssets';
import { directDownloadCurriculumPdf } from '../utils/downloadBrochurePdf';

interface FlagshipMasterConsoleProps {
  onSelectCourse: (courseId: string) => void;
  onRequestCallback: (courseInterest?: string) => void;
  onDownloadBrochure: (courseTitle?: string) => void;
}

const TRANSFORMATION_STORIES = [
  {
    id: 'tr-1',
    name: 'Sneha Kulkarni',
    role: 'Performance Marketing Lead',
    company: 'Nykaa E-Commerce',
    fromLpa: 'Fresher (₹0)',
    toLpa: '₹18 LPA',
    jumpBadge: '+615% Package',
    quote:
      'Running live campaigns with real Meta Ad spend and budget scaling gave me the exact ROAS case studies that cracked my Nykaa interview.',
    track: 'Digital Marketing and Social Media...',
    batch: '2026 Batch',
    photoUrl: INDIAN_STUDENT_PORTRAITS[1],
  },
  {
    id: 'tr-2',
    name: 'Rahul Verma',
    role: 'Full Stack Engineer',
    company: 'Amazon Web Services',
    fromLpa: '₹3.4 LPA',
    toLpa: '₹24 LPA',
    jumpBadge: '6.8x Salary Jump',
    quote:
      'I transitioned from a B.Com IT support role to building microservices. The daily 1-on-1 code reviews transformed my algorithmic thinking.',
    track: 'Full Stack Development Master...',
    batch: '2026 Batch',
    photoUrl: INDIAN_STUDENT_PORTRAITS[0],
  },
  {
    id: 'tr-3',
    name: 'Ananya Mukherjee',
    role: 'Senior Product UI/UX Designer',
    company: 'Swiggy Studio',
    fromLpa: '₹3.2 LPA',
    toLpa: '₹16.5 LPA',
    jumpBadge: '+415% Increment',
    quote:
      'The Figma design system, WCAG accessibility workshops, and live critique sessions gave me a portfolio recruiters loved.',
    track: 'Graphic Design, Branding & UI/UX',
    batch: '2026 Batch',
    photoUrl: INDIAN_STUDENT_PORTRAITS[2],
  },
  ...PLACED_STUDENTS.slice(0, 3).map((s, idx) => ({
    id: `tr-extra-${s.id}`,
    name: s.name,
    role: s.role,
    company: s.company,
    fromLpa: s.previousBackground,
    toLpa: `₹${s.packageLPA} LPA`,
    jumpBadge: 'Verified Hire',
    quote:
      s.quote ||
      'Hands-on capstones and 1-on-1 mock panels helped me secure a direct offer letter.',
    track: s.course,
    batch: `${s.year} Batch`,
    photoUrl: INDIAN_STUDENT_PORTRAITS[(idx + 3) % INDIAN_STUDENT_PORTRAITS.length],
  })),
];

export const FlagshipMasterConsole: React.FC<FlagshipMasterConsoleProps> = ({
  onSelectCourse,
  onRequestCallback,
  onDownloadBrochure,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'tech' | 'design' | 'growth-biz' | 'finance-career'>('all');
  const [query, setQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(ITV_COURSES[0].id);
  const [carouselStart, setCarouselStart] = useState(0);

  const filteredCourses = useMemo(() => {
    return ITV_COURSES.filter((c) => {
      if (filterTab === 'tech' && c.category !== 'Tech, AI & Product Lab') return false;
      if (filterTab === 'design' && c.category !== 'Design, Studio & Spatial Craft') return false;
      if (
        filterTab === 'growth-biz' &&
        c.category !== 'Growth, Marketing & Creator Economy' &&
        c.category !== 'Business, Startup & Leadership'
      ) {
        return false;
      }
      if (
        filterTab === 'finance-career' &&
        c.category !== 'Finance, Accounting & Tax Mastery' &&
        c.category !== 'Career Acceleration & Communication'
      ) {
        return false;
      }
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.toolsCovered.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [filterTab, query]);

  const activeCourse =
    filteredCourses.find((c) => c.id === selectedCourseId) ||
    filteredCourses[0] ||
    ITV_COURSES[0];

  const activeIndex = Math.max(
    0,
    ITV_COURSES.findIndex((c) => c.id === activeCourse.id)
  );
  const activeCover = COURSE_COVER_IMAGES[activeIndex % COURSE_COVER_IMAGES.length];

  const visibleStories = [0, 1, 2].map(
    (offset) => TRANSFORMATION_STORIES[(carouselStart + offset) % TRANSFORMATION_STORIES.length]
  );

  const techCount = ITV_COURSES.filter((c) => c.category === 'Tech, AI & Product Lab').length;
  const designCount = ITV_COURSES.filter((c) => c.category === 'Design, Studio & Spatial Craft').length;
  const growthBizCount = ITV_COURSES.filter(
    (c) =>
      c.category === 'Growth, Marketing & Creator Economy' ||
      c.category === 'Business, Startup & Leadership'
  ).length;
  const financeCareerCount = ITV_COURSES.filter(
    (c) =>
      c.category === 'Finance, Accounting & Tax Mastery' ||
      c.category === 'Career Acceleration & Communication'
  ).length;

  return (
    <div className="space-y-14">
      {/* SECTION: ACCELERATE YOUR CAREER — DARK SAPPHIRE FLAGSHIP MASTER PROGRAMS CONSOLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Centered Frosted White-Blue Pastel Header Card */}
        <div className="max-w-2xl mx-auto pastel-glass-panel metallic-sheen-card rounded-3xl px-6 sm:px-10 py-6 text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#BFD6F6] text-[10px] font-extrabold uppercase tracking-widest text-[#2B59B5]">
            <Award className="w-3 h-3" />
            <span>Industry Aligned Programs · All {ITV_COURSES.length} Tracks</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1E428E] leading-tight">
            Accelerate Your Career with Our{' '}
            <span className="text-[#3869C3]">Industry-Aligned Courses</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#456396]">
            Compare every single one of our {ITV_COURSES.length} humanized tracks — from Software,
            AI &amp; Product Dev to Interior Design, Fashion Design, Startups, Finance &amp; GST.
          </p>
        </div>

        {/* Dark Royal-Sapphire Metallic Interactive Console */}
        <div className="metallic-console-dark rounded-3xl p-5 sm:p-7 space-y-5">
          {/* Console Header & Filter Pills */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-sky-200" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-extrabold text-white">
                  Flagship Master Programs ({ITV_COURSES.length} Tracks)
                </h3>
                <p className="text-xs text-sky-200/90">
                  Select any course below to inspect duration, tools, real capstones, and syllabus.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#0A1B47]/65 border border-white/20 self-start xl:self-auto">
              {[
                { id: 'all' as const, label: `All (${ITV_COURSES.length})` },
                { id: 'tech' as const, label: `Tech & Product (${techCount})` },
                { id: 'design' as const, label: `Design & Fashion (${designCount})` },
                { id: 'growth-biz' as const, label: `Growth & Biz (${growthBizCount})` },
                { id: 'finance-career' as const, label: `Finance & Career (${financeCareerCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                    filterTab === tab.id
                      ? 'bg-white text-[#132C63] shadow-sm'
                      : 'text-sky-100 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Split: Left Searchable List | Right Deep-Dive Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 5 Cols: Search + Scrollable Thumbnail Program List */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-sky-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${ITV_COURSES.length} flagship courses or tools...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1E50]/75 border border-white/22 text-xs text-white placeholder:text-sky-200/70 focus:outline-none focus:border-sky-300"
                />
              </div>

              <div className="space-y-2 max-h-[430px] overflow-y-auto pastel-scrollbar pr-1">
                {filteredCourses.map((course, idx) => {
                  const selected = course.id === activeCourse.id;
                  const thumb = COURSE_COVER_IMAGES[idx % COURSE_COVER_IMAGES.length];
                  return (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => setSelectedCourseId(course.id)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3 cursor-pointer ${
                        selected
                          ? 'bg-white/20 border-2 border-white shadow-lg'
                          : 'bg-[#0C2157]/60 hover:bg-white/12 border border-white/15'
                      }`}
                    >
                      <img
                        src={thumb}
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-white/30 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-sky-300 truncate">
                          {course.categoryLabel}
                        </div>
                        <div className="text-xs font-extrabold text-white truncate">
                          {course.title}
                        </div>
                        <div className="text-[10px] text-sky-200/85 font-mono-tabular mt-0.5">
                          {course.duration} · Top {course.highestPackage}
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 ${
                          selected ? 'text-white' : 'text-sky-300/60'
                        }`}
                      />
                    </button>
                  );
                })}
                {filteredCourses.length === 0 && (
                  <div className="p-6 text-center text-xs text-sky-200 bg-white/8 rounded-2xl border border-white/15">
                    No matching programs for &ldquo;{query}&rdquo;. Try clearing your filter.
                  </div>
                )}
              </div>
            </div>

            {/* Right 7 Cols: Deep-Dive Program Showcase */}
            <div className="lg:col-span-7 bg-[#0B1E4E]/75 border border-white/25 rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                {/* Cover Preview Banner */}
                <div className="h-44 sm:h-48 rounded-2xl overflow-hidden border border-white/25 relative">
                  <img
                    src={activeCover}
                    alt={activeCourse.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091840]/92 via-[#091840]/40 to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300 block">
                        {activeCourse.categoryLabel}
                      </span>
                      <h4 className="font-display text-lg sm:text-xl font-extrabold text-white leading-snug">
                        {activeCourse.title}
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white text-[#132C63] text-[11px] font-extrabold font-mono-tabular shrink-0 shadow-sm">
                      Max {activeCourse.highestPackage}
                    </span>
                  </div>
                </div>

                {/* Duration & Dual Cert Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/15 pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-sky-300 block">
                      Duration &amp; Mode
                    </span>
                    <span className="font-bold text-white">
                      {activeCourse.duration} · Classroom &amp; Online Live
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-sky-300 block">
                      Track Level
                    </span>
                    <span className="font-bold text-emerald-300 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Dual (Hridayam + NSDC)</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-sky-100 leading-relaxed">
                  {activeCourse.summary}
                </p>

                {/* Tools & Technologies Chips */}
                <div className="space-y-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Tools &amp; Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCourse.toolsCovered.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-lg bg-white/12 border border-white/22 text-[11px] font-semibold text-white"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3 Bottom Metric Tiles */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="rounded-2xl bg-white/10 border border-white/18 p-3">
                    <div className="text-[10px] text-sky-200/80">Projects</div>
                    <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5 font-mono-tabular">
                      28+ Real-World
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/18 p-3">
                    <div className="text-[10px] text-sky-200/80">Max Package</div>
                    <div className="text-xs sm:text-sm font-extrabold text-emerald-300 mt-0.5 font-mono-tabular">
                      {activeCourse.highestPackage}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/18 p-3">
                    <div className="text-[10px] text-sky-200/80">EMI Starts</div>
                    <div className="text-xs sm:text-sm font-extrabold text-sky-200 mt-0.5 font-mono-tabular">
                      {activeCourse.emiStartsAt}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Console CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => onSelectCourse(activeCourse.id)}
                  className="py-3 px-3 rounded-xl bg-white text-[#132C63] hover:bg-[#E8F2FF] text-[11px] font-extrabold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  VIEW FULL SYLLABUS
                </button>
                <button
                  type="button"
                  onClick={() => onRequestCallback(`Free Demo Class: ${activeCourse.title}`)}
                  className="py-3 px-3 rounded-xl bg-[#2B59B5] hover:bg-[#3869C3] border border-white/35 text-white text-[11px] font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>BOOK FREE DEMO</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    directDownloadCurriculumPdf(activeCourse.title);
                    onDownloadBrochure(activeCourse.title);
                  }}
                  className="py-3 px-3 rounded-xl bg-white/12 hover:bg-white/22 border border-white/30 text-white text-[11px] font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DIRECT PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CAREER TRANSFORMATIONS CAROUSEL + 4 KPI TILES (exact match to screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="pastel-glass-panel rounded-3xl px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#2B59B5]">
              <Briefcase className="w-3 h-3" />
              <span>Real Outcomes &amp; Proof</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E428E]">
              Career Transformations
            </h2>
            <p className="text-xs sm:text-sm text-[#456396]">
              Real journeys of freshers and working professionals who shifted into high-growth
              product companies and performance agencies.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                setCarouselStart(
                  (prev) => (prev - 1 + TRANSFORMATION_STORIES.length) % TRANSFORMATION_STORIES.length
                )
              }
              className="w-10 h-10 rounded-full metallic-btn-ice flex items-center justify-center cursor-pointer"
              aria-label="Previous career transformation"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setCarouselStart((prev) => (prev + 1) % TRANSFORMATION_STORIES.length)
              }
              className="w-10 h-10 rounded-full metallic-btn-ice flex items-center justify-center cursor-pointer"
              aria-label="Next career transformation"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visibleStories.map((story) => (
            <article
              key={story.id}
              className="pastel-glass-card metallic-sheen-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={story.photoUrl}
                    alt={story.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-2xl object-cover object-top border-2 border-white shadow-sm shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-extrabold text-[#132C63] truncate">
                      {story.name}
                    </h3>
                    <p className="text-[11px] font-bold text-[#3869C3] truncate">{story.role}</p>
                    <p className="text-[11px] text-[#5273A8] truncate">
                      Placed at <strong className="text-[#132C63]">{story.company}</strong>
                    </p>
                  </div>
                </div>

                {/* Salary Jump Pill Strip */}
                <div className="p-3 rounded-2xl bg-[#EEF5FF] border border-[#CFE1FB] flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-[#5A79AD]">
                      Trajectory
                    </div>
                    <div className="text-xs font-extrabold text-[#132C63] font-mono-tabular truncate">
                      {story.fromLpa} → <span className="text-[#2563EB]">{story.toLpa}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#2563EB] text-white text-[10px] font-extrabold shrink-0 shadow-xs">
                    {story.jumpBadge}
                  </span>
                </div>

                <p className="text-xs text-[#3C588A] leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#D3E5FD] flex items-center justify-between text-[11px] font-bold text-[#5273A8]">
                <span className="truncate max-w-[70%]">{story.track}</span>
                <span className="text-[#1E428E] shrink-0">{story.batch}</span>
              </div>
            </article>
          ))}
        </div>

        {/* 4 Bottom KPI Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '3,500+', label: 'Learners Placed', sub: 'Across India & Remote' },
            { value: '₹32 LPA', label: 'Highest Package', sub: 'In AI & Tech Roles' },
            { value: '2,000+', label: 'Hiring Partners', sub: 'MNCs, Startups & Agencies' },
            { value: 'Every 12 Hrs', label: 'Hiring Frequency', sub: 'Continuous Interview Calls' },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="pastel-glass-card metallic-sheen-card rounded-2xl p-5 text-center space-y-1"
            >
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E428E] font-mono-tabular">
                {kpi.value}
              </div>
              <div className="text-xs font-extrabold text-[#132C63]">{kpi.label}</div>
              <div className="text-[11px] text-[#5273A8]">{kpi.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
