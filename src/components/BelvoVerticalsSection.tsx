import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Download,
  PhoneCall,
  Briefcase,
  Layers,
  LayoutGrid,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Cpu,
  Palette,
  TrendingUp,
} from 'lucide-react';
import { ITV_COURSES, ITvedantCourse } from '../data/itvedantData';
import { BELVO_CATEGORIES } from '../types';
import { COURSE_COVER_IMAGES } from '../data/mediaAssets';
import { directDownloadCurriculumPdf } from '../utils/downloadBrochurePdf';

interface BelvoVerticalsSectionProps {
  onSelectCourse: (courseId: string) => void;
  onRequestCallback: (courseInterest?: string) => void;
  onDownloadBrochure: (courseTitle?: string) => void;
}

const COLUMN_GROUPS = [
  {
    id: 'tech-career',
    title: 'Tech, Product & Career',
    headerGrad: 'from-[#19387E] to-[#2B59B5]',
    icon: <Cpu className="w-3.5 h-3.5" />,
    categories: ['Tech, AI & Product Lab', 'Career Acceleration & Communication'],
  },
  {
    id: 'design-finance',
    title: 'Design, Craft & Finance',
    headerGrad: 'from-[#2B59B5] to-[#4A80DB]',
    icon: <Palette className="w-3.5 h-3.5" />,
    categories: ['Design, Studio & Spatial Craft', 'Finance, Accounting & Tax Mastery'],
  },
  {
    id: 'growth-biz',
    title: 'Growth, Startups & People',
    headerGrad: 'from-[#3869C3] to-[#639AE8]',
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    categories: ['Growth, Marketing & Creator Economy', 'Business, Startup & Leadership'],
  },
] as const;

export const BelvoVerticalsSection: React.FC<BelvoVerticalsSectionProps> = ({
  onSelectCourse,
  onRequestCallback,
  onDownloadBrochure,
}) => {
  const [viewMode, setViewMode] = useState<'graph' | 'slideshow' | 'grid'>('graph');
  const [selectedId, setSelectedId] = useState<string>('course_ai_automation_workflows');
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [gridSchool, setGridSchool] = useState<string>('All');

  const activeCourse: ITvedantCourse =
    ITV_COURSES.find((c) => c.id === selectedId) || ITV_COURSES[0];

  const currentSlide: ITvedantCourse = ITV_COURSES[slideIndex % ITV_COURSES.length];

  const gridFilteredCourses = useMemo(() => {
    if (gridSchool === 'All') return ITV_COURSES;
    return ITV_COURSES.filter((c) => c.category === gridSchool);
  }, [gridSchool]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Centered White-Blue-Pastel Frosted Header Panel */}
      <div className="max-w-3xl mx-auto pastel-glass-panel metallic-sheen-card rounded-3xl px-6 sm:px-10 py-7 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-[#BFD6F6] text-[10px] font-extrabold uppercase tracking-widest text-[#2B59B5]">
          <Sparkles className="w-3 h-3" />
          <span>6 Creative &amp; Career Schools · {ITV_COURSES.length} Humanized Programs</span>
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1E428E] leading-tight">
          Explore All{' '}
          <span className="text-[#3869C3]">{ITV_COURSES.length} Craft, Tech &amp; Life Courses</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#456396] max-w-2xl mx-auto leading-relaxed">
          From AI, Full Stack &amp; Product Development to Interior Design, Fashion Design,
          Entrepreneurship, GST &amp; Taxation, and Interview Readiness — every course is taught
          by warm, practicing mentors.
        </p>

        {/* 3-Mode Switcher Pills */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white/75 border border-white shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode('graph')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer transition-all ${
              viewMode === 'graph' ? 'metallic-btn-primary' : 'text-[#1E428E] hover:bg-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Career Flow Graph</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('slideshow')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer transition-all ${
              viewMode === 'slideshow' ? 'metallic-btn-primary' : 'text-[#1E428E] hover:bg-white'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Interactive Slideshow</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer transition-all ${
              viewMode === 'grid' ? 'metallic-btn-primary' : 'text-[#1E428E] hover:bg-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All {ITV_COURSES.length} Courses Grid</span>
          </button>
        </div>
      </div>

      {/* MODE 1: INTERACTIVE CAREER FLOW GRAPH (3 Pathway Columns covering all 22 Courses + Inspector) */}
      {viewMode === 'graph' && (
        <div className="pastel-glass-panel rounded-3xl p-5 sm:p-7 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#3869C3]">
              Interactive Career Pathways ({ITV_COURSES.length} Specialized Tracks)
            </span>
            <span className="text-[11px] font-bold text-[#5273A8]">
              Click any course to inspect its story, tools &amp; outcomes
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left 8 Cols: 3 Categorized Pathway Columns */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {COLUMN_GROUPS.map((col) => {
                const colCourses = ITV_COURSES.filter((c) =>
                  (col.categories as readonly string[]).includes(c.category)
                );
                return (
                  <div key={col.id} className="space-y-2.5">
                    <div
                      className={`px-3.5 py-2.5 rounded-xl bg-gradient-to-r ${col.headerGrad} text-white flex items-center justify-between shadow-sm`}
                    >
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold truncate">
                        {col.icon}
                        <span className="truncate">{col.title}</span>
                      </span>
                      <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full shrink-0 ml-1">
                        {colCourses.length}
                      </span>
                    </div>

                    <div className="space-y-2 max-h-[540px] overflow-y-auto pastel-scrollbar pr-1">
                      {colCourses.map((course) => {
                        const active = activeCourse.id === course.id;
                        return (
                          <button
                            key={course.id}
                            type="button"
                            onClick={() => setSelectedId(course.id)}
                            className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer ${
                              active
                                ? 'bg-white border-2 border-[#2B59B5] shadow-md ring-3 ring-[#94BCF1]/35'
                                : 'bg-white/75 hover:bg-white border border-white/95 hover:border-[#94BCF1] shadow-xs'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3869C3] truncate">
                                {course.categoryLabel}
                              </span>
                              <span className="text-[10px] font-mono-tabular font-bold text-[#5273A8] shrink-0">
                                {course.duration}
                              </span>
                            </div>
                            <div className="text-xs font-extrabold text-[#132C63] leading-snug">
                              {course.title}
                            </div>
                            <div className="text-[10px] font-medium text-[#5A79AD] mt-1 truncate">
                              {course.toolsCovered.slice(0, 3).join(' · ')}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 4 Cols: Sticky Humanized Deep-Dive Course Inspector Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 bg-white/92 border-2 border-white rounded-3xl p-5 sm:p-6 shadow-lg flex flex-col justify-between gap-5 metallic-sheen-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1E428E] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    {activeCourse.badge || activeCourse.categoryLabel}
                  </span>
                  <span className="text-xs font-extrabold font-mono-tabular text-[#1E428E]">
                    {activeCourse.highestPackage}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3869C3]">
                    {activeCourse.category} · {activeCourse.duration}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#132C63] leading-snug mt-0.5">
                    {activeCourse.title}
                  </h3>
                  <p className="text-xs text-[#3C588A] leading-relaxed mt-2">
                    {activeCourse.summary}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#EEF5FF] border border-[#D3E5FD] space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#5273A8]">
                    Where This Path Takes You
                  </div>
                  <div className="text-xs font-extrabold text-[#1E428E] flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#3869C3] shrink-0" />
                    <span>{activeCourse.careerRoles.slice(0, 2).join(' · ')}</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#5273A8] font-mono-tabular">
                    0% EMI from {activeCourse.emiStartsAt} · {activeCourse.projectsCount}+ Live
                    Builds
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#5273A8]">
                    Craft, Tools &amp; Frameworks
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCourse.toolsCovered.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-lg bg-[#F4F8FF] border border-[#CFE1FB] text-[11px] font-bold text-[#1E428E]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#5273A8]">
                    What Makes It Human &amp; Practical
                  </div>
                  <ul className="space-y-1.5">
                    {activeCourse.keyHighlights.slice(0, 3).map((hl) => (
                      <li
                        key={hl}
                        className="flex items-start gap-1.5 text-[11px] font-semibold text-[#132C63] leading-snug"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2B59B5] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-[#E1EDFD]">
                <button
                  type="button"
                  onClick={() => onSelectCourse(activeCourse.id)}
                  className="w-full py-3 rounded-xl metallic-btn-primary text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>VIEW FULL CURRICULUM</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onRequestCallback(`Track Mentor Call: ${activeCourse.title}`)}
                    className="py-2.5 px-2 rounded-xl metallic-btn-ice text-[11px] font-bold inline-flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#2B59B5]" />
                    <span>Ask Mentor</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      directDownloadCurriculumPdf(activeCourse.title);
                      onDownloadBrochure(activeCourse.title);
                    }}
                    className="py-2.5 px-2 rounded-xl metallic-btn-ice text-[11px] font-bold inline-flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#2B59B5]" />
                    <span>Direct PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: INTERACTIVE SLIDESHOW (All 22 Courses) */}
      {viewMode === 'slideshow' && (
        <div className="pastel-glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
            <div className="lg:col-span-5 h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-white shadow-md relative">
              <img
                src={COURSE_COVER_IMAGES[slideIndex % COURSE_COVER_IMAGES.length]}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132C63]/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-[10px] font-extrabold uppercase">
                  {currentSlide.badge || currentSlide.categoryLabel} · {currentSlide.duration}
                </span>
                <span className="text-xs font-extrabold font-mono-tabular">
                  {currentSlide.highestPackage}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#3869C3] font-mono-tabular">
                  COURSE {String(slideIndex + 1).padStart(2, '0')} / {ITV_COURSES.length} ·{' '}
                  {currentSlide.category.toUpperCase()}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSlideIndex(
                        (prev) => (prev - 1 + ITV_COURSES.length) % ITV_COURSES.length
                      )
                    }
                    className="w-9 h-9 rounded-full metallic-btn-ice flex items-center justify-center cursor-pointer"
                    aria-label="Previous course"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlideIndex((prev) => (prev + 1) % ITV_COURSES.length)}
                    className="w-9 h-9 rounded-full metallic-btn-ice flex items-center justify-center cursor-pointer"
                    aria-label="Next course"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E428E] leading-tight">
                {currentSlide.title}
              </h3>

              <p className="text-sm text-[#3C588A] leading-relaxed">{currentSlide.summary}</p>
              <p className="text-xs text-[#5273A8] leading-relaxed">{currentSlide.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {currentSlide.toolsCovered.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-white/90 border border-[#CFE1FB] text-xs font-bold text-[#1E428E]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectCourse(currentSlide.id)}
                  className="metallic-btn-primary px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Inspect Full Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    directDownloadCurriculumPdf(currentSlide.title);
                    onDownloadBrochure(currentSlide.title);
                  }}
                  className="metallic-btn-ice px-5 py-3 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Direct PDF</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {ITV_COURSES.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSlideIndex(idx)}
                aria-label={`Jump to ${c.title}`}
                title={c.title}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === slideIndex ? 'w-7 bg-[#2B59B5]' : 'w-2 bg-[#94BCF1]/70 hover:bg-[#3869C3]'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: ALL 22 COURSES GRID WITH 6 SCHOOL FILTER PILLS */}
      {viewMode === 'grid' && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start lg:justify-center">
            {['All', ...BELVO_CATEGORIES].map((school) => {
              const active = gridSchool === school;
              const count =
                school === 'All'
                  ? ITV_COURSES.length
                  : ITV_COURSES.filter((c) => c.category === school).length;
              return (
                <button
                  key={school}
                  type="button"
                  onClick={() => setGridSchool(school)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 cursor-pointer transition-all ${
                    active ? 'metallic-btn-primary' : 'metallic-btn-ice'
                  }`}
                >
                  {school === 'All' ? `All Courses (${count})` : `${school} (${count})`}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridFilteredCourses.map((course, idx) => (
              <div
                key={course.id}
                className="pastel-glass-card metallic-sheen-card rounded-3xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono-tabular gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#1E428E] font-extrabold truncate">
                      {String(idx + 1).padStart(2, '0')} · {course.categoryLabel}
                    </span>
                    <span className="text-[#1E428E] font-extrabold shrink-0">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-extrabold text-[#132C63] leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#456396] leading-relaxed line-clamp-3">
                    {course.summary}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {course.toolsCovered.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded-md bg-white/85 border border-[#D3E5FD] text-[10px] font-bold text-[#2B59B5]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D3E5FD] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectCourse(course.id)}
                    className="text-xs font-extrabold text-[#1E428E] hover:text-[#2B59B5] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      directDownloadCurriculumPdf(course.title);
                      onDownloadBrochure(course.title);
                    }}
                    className="text-[11px] font-bold text-[#3869C3] hover:text-[#132C63] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
