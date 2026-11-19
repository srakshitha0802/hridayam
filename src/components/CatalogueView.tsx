import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  CheckCircle2,
  Calculator,
} from 'lucide-react';
import { ITV_COURSES, ITvedantCourse } from '../data/itvedantData';
import { BELVO_CATEGORIES } from '../types';
import { COURSE_COVER_IMAGES } from '../data/mediaAssets';

interface CatalogueViewProps {
  onSelectCourse: (courseId: string) => void;
  onRequestCallback: (courseInterest?: string) => void;
  onEnrollCourse?: (course: ITvedantCourse) => void;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  onSelectCourse,
  onRequestCallback,
  onEnrollCourse,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [emiCourseId, setEmiCourseId] = useState<string>(ITV_COURSES[0].id);
  const [emiMonths, setEmiMonths] = useState<number>(12);

  const selectedEmiCourse = ITV_COURSES.find((c) => c.id === emiCourseId) || ITV_COURSES[0];
  const monthlyEmi = Math.round((selectedEmiCourse.fee || 42000) / emiMonths);
  const paybackMonths = Math.max(1, Math.ceil((selectedEmiCourse.fee || 42000) / 55000));

  const categories = [
    { id: 'all', label: `All ${ITV_COURSES.length} Programs` },
    ...BELVO_CATEGORIES.map((cat) => ({
      id: cat,
      label: `${cat} (${ITV_COURSES.filter((c) => c.category === cat).length})`,
    })),
  ];

  const filteredCourses = ITV_COURSES.filter((course) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      course.category === selectedCategory ||
      course.categoryLabel?.toLowerCase().includes(selectedCategory.toLowerCase());
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      course.title.toLowerCase().includes(q) ||
      course.summary.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q) ||
      course.toolsCovered.some((t) => t.toLowerCase().includes(q)) ||
      course.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-24 relative z-10 text-[#132C63]">
      {/* Frosted Pastel White-Blue Hero */}
      <section className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pastel-glass-hero metallic-sheen-card rounded-3xl p-8 sm:p-12 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-[#BFD6F6] text-[11px] font-extrabold uppercase tracking-widest text-[#2B59B5]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hridayam by Belvo · {ITV_COURSES.length} Creative &amp; Career Tracks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1E428E] leading-tight">
            Explore All {ITV_COURSES.length} Humanized Programs
          </h1>

          <p className="text-[#456396] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Built for real human careers — spanning AI &amp; Software, Product Development, UI/UX,
            Interior &amp; Fashion Design, Marketing, Startups, Finance, GST, and Interview Mastery.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-1">
            <div className="relative">
              <Search className="w-4 h-4 text-[#3869C3] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search any course or craft (Fashion, Interior, AI, GST, Product, React)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl pastel-input text-sm font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6 School Filter Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat.id ? 'metallic-btn-primary' : 'metallic-btn-ice'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards + Transparent EMI Planner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Interactive 0% Interest INR EMI & Career ROI Calculator */}
        <div className="pastel-glass-panel metallic-sheen-card rounded-3xl p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#2B59B5]">
              <Calculator className="w-3.5 h-3.5" />
              <span>Transparent Indian Fee Planner</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1E428E]">
              0% Interest EMI &amp; Payback Calculator
            </h2>
            <p className="text-xs text-[#456396] leading-relaxed">
              Pick any of our {ITV_COURSES.length} tracks and installment tenure to see your clear
              monthly INR plan with zero hidden fees.
            </p>
          </div>

          <div className="lg:col-span-4 space-y-3 text-xs">
            <div>
              <label className="block font-extrabold text-[#132C63] mb-1">
                Choose Career Program
              </label>
              <select
                value={emiCourseId}
                onChange={(e) => setEmiCourseId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl pastel-input font-bold"
              >
                {ITV_COURSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} (₹{c.fee.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              {[3, 6, 9, 12].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setEmiMonths(m)}
                  className={`flex-1 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    emiMonths === m ? 'metallic-btn-primary' : 'metallic-btn-ice'
                  }`}
                >
                  {m}M
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 metallic-royal-banner rounded-2xl p-5 space-y-1 text-center">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-200">
              0% EMI Monthly
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-tabular text-white">
              ₹{monthlyEmi.toLocaleString('en-IN')}/mo
            </div>
            <div className="text-[11px] text-sky-100">
              Est. payback: <strong className="text-white">~{paybackMonths} month(s)</strong>
            </div>
          </div>
        </div>

        {/* Result Count Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-extrabold text-[#1E428E] bg-white/85 px-4 py-2 rounded-xl border border-white shadow-xs">
            Showing {filteredCourses.length} of {ITV_COURSES.length} Creative &amp; Career Programs
          </span>
          <span className="text-xs text-[#1E428E] font-extrabold inline-flex items-center gap-1.5 bg-white/85 px-4 py-2 rounded-xl border border-white shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#2B59B5]" />
            <span>Human-Mentored · Practical Capstones · Placement Support</span>
          </span>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course: ITvedantCourse, idx: number) => {
            const cover = COURSE_COVER_IMAGES[idx % COURSE_COVER_IMAGES.length];
            return (
              <article
                key={course.id}
                className="pastel-glass-card metallic-sheen-card rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Cover & Title Header */}
                  <div className="h-44 relative overflow-hidden bg-[#132C63]">
                    <img
                      src={cover}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#132C63]/92 via-[#132C63]/40 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/92 text-[#1E428E] text-[10px] font-extrabold shadow-xs truncate max-w-[65%]">
                        {course.badge || course.categoryLabel}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#132C63]/80 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold inline-flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3 text-sky-300" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-sky-200 truncate">
                        {course.category}
                      </div>
                      <h3 className="font-display font-extrabold text-lg leading-snug line-clamp-2">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1 font-extrabold text-[#1E428E] font-mono-tabular">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {course.rating || 4.9} ({course.reviewCount}+)
                      </span>
                      <span className="font-extrabold text-[#2B59B5] font-mono-tabular">
                        {course.highestPackage}
                      </span>
                    </div>

                    <p className="text-xs text-[#3C588A] leading-relaxed line-clamp-3">
                      {course.summary}
                    </p>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-[#5273A8] tracking-wider block mb-1.5">
                        Craft &amp; Tools Mastered
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.toolsCovered.slice(0, 4).map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-0.5 rounded-md bg-white/90 border border-[#CFE1FB] text-[#1E428E] text-[10px] font-bold"
                          >
                            {tool}
                          </span>
                        ))}
                        {course.toolsCovered.length > 4 && (
                          <span className="px-2 py-0.5 rounded-md bg-[#E8F1FD] text-[#2B59B5] text-[10px] font-bold">
                            +{course.toolsCovered.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#D3E5FD] text-xs">
                      <div>
                        <span className="text-[10px] text-[#5273A8] font-bold block">
                          Fee Investment
                        </span>
                        <span className="text-base font-extrabold text-[#132C63] font-mono-tabular">
                          ₹{course.fee.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#1E428E] font-extrabold bg-[#E8F1FD] px-2.5 py-1 rounded-lg border border-[#BFD6F6] font-mono-tabular">
                        EMI {course.emiStartsAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-5 pb-5 pt-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => onSelectCourse(course.id)}
                    className="w-full py-3 rounded-xl metallic-btn-primary font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Syllabus &amp; Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onRequestCallback(course.title)}
                      className="py-2.5 rounded-xl metallic-btn-ice text-xs font-extrabold text-center cursor-pointer"
                    >
                      Free Demo Class
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onEnrollCourse ? onEnrollCourse(course) : onRequestCallback(course.title)
                      }
                      className="py-2.5 rounded-xl bg-[#1E428E] hover:bg-[#132C63] text-white text-xs font-extrabold text-center cursor-pointer transition-colors"
                    >
                      Quick Enrol
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Custom Track Banner */}
        <div className="pastel-glass-panel rounded-3xl p-7 text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#2B59B5] text-[11px] font-extrabold border border-[#BFD6F6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized Learning Paths</span>
          </div>
          <h3 className="text-xl font-extrabold text-[#1E428E] font-display">
            Want to combine two tracks — like Fashion Design + Social Media, or AI + Entrepreneurship?
          </h3>
          <p className="text-xs text-[#456396] max-w-lg mx-auto">
            Our mentors help you blend custom dual-track roadmaps tailored around your personal
            career goals and timeline.
          </p>
          <button
            type="button"
            onClick={() => onRequestCallback('Custom Dual-Track Career Roadmap')}
            className="metallic-btn-primary px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider mt-2 cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Design My Custom Track</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
