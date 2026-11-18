import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { ITV_COURSES, ITvedantCourse } from '../data/itvedantData';
import { BELVO_CATEGORIES } from '../types';

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

  const categories = [
    { id: 'all', label: 'All Disciplines (11+)' },
    ...BELVO_CATEGORIES.map((cat) => ({ id: cat, label: cat })),
  ];

  const filteredCourses = ITV_COURSES.filter((course) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      course.category === selectedCategory ||
      course.categoryLabel?.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.toolsCovered.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20 relative z-10 text-white">
      {/* Hero */}
      <section className="glass-dark text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-sky-400/35 relative overflow-hidden backdrop-blur-2xl shadow-2xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-sky-400/40 text-sky-200 text-xs font-semibold backdrop-blur-md">
            <GoogleIcon name="school" size={16} className="text-sky-300" />
            <span>Belvo Services &amp; Industry Expertise Tracks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white">
            Explore Belvo Course Catalogue
          </h1>

          <p className="text-sky-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            High-impact programs covering all 11 services and expertise tracks offered by Belvo — from AI &amp; Software Engineering to UI/UX, VFX, Growth Marketing, and Venture Sales.
          </p>

          {/* Search bar inside Hero */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <GoogleIcon name="search" size={20} className="text-sky-300" />
              </span>
              <input
                type="text"
                placeholder="Search by topic, skill (React, Figma, AI, SEO, DaVinci, Python)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass-input text-white placeholder-sky-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills (All 11 Belvo categories) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md border border-sky-300/40'
                  : 'glass-dark text-sky-200 hover:text-white border border-sky-400/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between pb-6 gap-2">
          <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
            Showing {filteredCourses.length} Comprehensive Career Programs
          </span>
          <span className="text-xs text-sky-200 font-semibold flex items-center gap-1.5 bg-blue-950/80 px-3 py-1 rounded-full border border-sky-400/40">
            <GoogleIcon name="verified" size={14} filled className="text-sky-300" />
            Dual Certified • 100% Placement Support
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: ITvedantCourse) => (
            <div
              key={course.id}
              className="glass-dark rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-sky-300 transition-all flex flex-col justify-between group border border-sky-400/40 text-white"
            >
              <div>
                {/* Course Header Banner */}
                <div className="p-6 bg-gradient-to-br from-[#0A1633] to-[#1E40AF] text-white relative">
                  <div className="flex items-center justify-between text-[11px] mb-2 font-semibold">
                    <span className="bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-md max-w-[200px] truncate text-white">
                      {course.categoryLabel || course.category}
                    </span>
                    <span className="text-sky-200 flex items-center gap-1 shrink-0">
                      <GoogleIcon name="schedule" size={14} />
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-white group-hover:text-sky-200 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-sky-200">
                    <span className="flex items-center gap-1">
                      <GoogleIcon name="star" size={14} filled className="text-sky-300" />
                      {course.rating || 4.9} / 5
                    </span>
                    <span>•</span>
                    <span>{course.reviewCount || 1200}+ Learners</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-sky-100 line-clamp-3 leading-relaxed">
                    {course.summary}
                  </p>

                  {/* Tools preview */}
                  <div>
                    <span className="text-[10px] font-bold uppercase text-sky-300 tracking-wider block mb-1.5">
                      Tools &amp; Technologies Mastered
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.toolsCovered.slice(0, 5).map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-black/40 border border-sky-400/30 text-sky-100 text-[11px] font-semibold"
                        >
                          {tool}
                        </span>
                      ))}
                      {course.toolsCovered.length > 5 && (
                        <span className="px-2 py-0.5 rounded-md bg-black/30 border border-sky-400/20 text-sky-300 text-[11px] font-semibold">
                          +{course.toolsCovered.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-sky-400/30 text-xs text-sky-100">
                    <div>
                      <span className="text-[10px] text-sky-300 block font-semibold">Highest Package</span>
                      <strong className="text-white font-bold">{course.highestPackage}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-sky-300 block font-semibold">Capstone Projects</span>
                      <strong className="text-white font-bold">{course.projectsCount}+ Projects</strong>
                    </div>
                  </div>

                  {/* Pricing info */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div>
                      <span className="text-sky-300 text-[11px] block">Fee Investment</span>
                      <span className="text-base font-bold text-white">
                        ₹{course.fee?.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[11px] text-sky-200 font-bold bg-blue-900/60 px-2 py-0.5 rounded-md border border-sky-400/40">
                      EMI from {course.emiStartsAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => onSelectCourse(course.id)}
                  className="w-full py-3 rounded-xl btn-pink-primary font-bold text-xs uppercase tracking-wider text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Full Curriculum &amp; Labs</span>
                  <GoogleIcon name="arrow_forward" size={16} />
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onRequestCallback(course.title)}
                    className="py-2.5 rounded-xl border border-sky-400/40 hover:border-sky-300 text-sky-100 text-xs font-semibold text-center block transition-colors bg-white/10 cursor-pointer"
                  >
                    Free Demo Class
                  </button>
                  <button
                    onClick={() => onEnrollCourse ? onEnrollCourse(course) : onRequestCallback(course.title)}
                    className="py-2.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-white text-xs font-bold text-center block transition-colors cursor-pointer border border-sky-400/40"
                  >
                    Quick Enrol
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic expansion banner as requested */}
        <div className="mt-14 p-6 glass-dark rounded-3xl text-center space-y-2 border-2 border-sky-400/40 shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 text-sky-200 text-xs font-semibold border border-sky-400/30">
            <GoogleIcon name="auto_awesome" size={14} className="text-sky-300" />
            <span>Continuous Platform Expansion</span>
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            Additional courses may be introduced as the platform expands.
          </h3>
          <p className="text-xs text-sky-200 max-w-lg mx-auto">
            Suggest a new track, request corporate cohort syllabi, or co-design specializations with Belvo faculty.
          </p>
          <button
            onClick={() => onRequestCallback('Suggest New Course Track')}
            className="btn-pink-glass px-5 py-2.5 rounded-xl text-xs font-bold text-white hover:border-sky-300 mt-2 cursor-pointer"
          >
            Request Custom Specialization
          </button>
        </div>
      </section>
    </div>
  );
};
