import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { ITV_COURSES } from '../data/itvedantData';

interface CourseDetailViewProps {
  courseId: string;
  onBack: () => void;
  onRequestCallback: (courseInterest: string) => void;
  onDownloadBrochure: (courseTitle: string) => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  courseId,
  onBack,
  onRequestCallback,
  onDownloadBrochure,
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  const course = ITV_COURSES.find((c) => c.id === courseId) || ITV_COURSES[0];

  return (
    <div className="space-y-12 pb-20 relative z-10 text-slate-900">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0B1B3D]/80 hover:bg-[#1E428E] border border-sky-300/40 backdrop-blur-md px-4 py-2 rounded-xl shadow-md transition-colors cursor-pointer"
        >
          <GoogleIcon name="arrow_back" size={16} />
          <span>Back to All Courses</span>
        </button>
      </div>

      {/* Course Detail Hero Banner */}
      <section className="pt-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border-2 border-blue-200 shadow-2xl relative overflow-hidden text-slate-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-gradient-to-r from-blue-600 to-sky-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-xs">
                  {course.categoryLabel}
                </span>
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
                  {course.certification}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {course.description}
              </p>

              {/* Quick stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-blue-100 text-xs">
                <div>
                  <span className="text-slate-500 block">Duration</span>
                  <span className="text-base font-bold text-slate-900">{course.duration}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Mode</span>
                  <span className="text-base font-bold text-slate-900">{course.mode}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Highest Package</span>
                  <span className="text-base font-bold text-blue-600">{course.highestPackage}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Capstone Projects</span>
                  <span className="text-base font-bold text-slate-900">{course.projectsCount}+ Projects</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onRequestCallback(course.title)}
                  className="btn-blue-primary px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <GoogleIcon name="call" size={16} />
                  Book Free Demo & Callback
                </button>
                <button
                  onClick={() => onDownloadBrochure(course.title)}
                  className="px-6 py-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <GoogleIcon name="download" size={16} className="text-blue-600" />
                  Download Complete Syllabus
                </button>
              </div>
            </div>

            {/* Sticky Card on Right */}
            <div className="lg:col-span-4 bg-blue-50/80 rounded-3xl p-6 shadow-xl border-2 border-blue-200 space-y-4 text-slate-900">
              <div className="space-y-1">
                <div className="text-xs text-blue-700 font-bold uppercase tracking-wider">Course Investment</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900 font-display">
                    ₹{course.fee.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{course.originalFee.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs font-bold text-blue-600">
                  0% Interest EMI starts from {course.emiStartsAt}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-blue-100 text-xs space-y-2 shadow-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <GoogleIcon name="verified_user" size={18} className="text-blue-600" filled />
                  <span>100% Placement Support Guarantee</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Unlimited interview drives with 2,000+ corporate hiring partners until you get placed.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <GoogleIcon name="calendar_month" size={16} className="text-blue-600" />
                  <span><strong>Next Batch:</strong> {course.nextBatch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GoogleIcon name="group" size={16} className="text-blue-600" />
                  <span><strong>Class Size:</strong> Limited to 25 seats</span>
                </div>
              </div>

              <button
                onClick={() => onRequestCallback(course.title)}
                className="w-full py-3.5 rounded-xl btn-blue-primary font-bold text-xs uppercase tracking-wider text-white shadow-xl cursor-pointer"
              >
                Apply for Admission / Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Highlights & Key Learning Outcomes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="video-section-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white font-display">
            Key Highlights of the Program
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.keyHighlights.map((highlight, idx) => (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-md p-4 rounded-2xl flex items-start gap-3 hover:border-blue-400 transition-all border-2 border-blue-100 shadow-sm"
              >
                <GoogleIcon name="check_circle" size={18} className="text-blue-600 shrink-0 mt-0.5" filled />
                <span className="text-xs font-semibold text-slate-800 leading-snug">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies Covered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="video-section-panel rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white font-display">
            Tools & Frameworks Mastered
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {course.toolsCovered.map((tool, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white/95 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-1.5 hover:border-blue-400 transition-all border-2 border-blue-100 shadow-xs"
              >
                <GoogleIcon name="auto_awesome" size={14} className="text-blue-600" />
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Week-by-Week Detailed Curriculum Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="video-section-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white font-display">
                Comprehensive Syllabus & Modules
              </h2>
              <p className="text-xs text-sky-100 mt-0.5">
                Structured step-by-step from foundational concepts to advanced production architecture.
              </p>
            </div>
            <button
              onClick={() => onDownloadBrochure(course.title)}
              className="px-4 py-2 rounded-xl bg-white/95 hover:bg-blue-50 text-xs font-bold text-blue-700 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <GoogleIcon name="download" size={16} />
              Download PDF
            </button>
          </div>

          <div className="space-y-3">
            {course.curriculum.map((mod, idx) => {
              const isOpen = openModuleIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/95 rounded-2xl overflow-hidden shadow-sm hover:border-blue-400 transition-all border-2 border-blue-100 text-slate-900"
                >
                  <button
                    onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                        M{mod.moduleNumber}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{mod.title}</h4>
                        <span className="text-[11px] text-slate-500">{mod.duration}</span>
                      </div>
                    </div>
                    <GoogleIcon
                      name={isOpen ? 'expand_less' : 'expand_more'}
                      size={20}
                      className="text-blue-600"
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 border-t border-blue-100 text-xs space-y-3">
                      <div>
                        <span className="font-bold text-slate-800 block mb-1.5">Topics Covered:</span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                          {mod.topics.map((t, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-slate-700">
                        <strong>Skills Acquired:</strong> {mod.skillsGained}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capstone Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="video-section-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white font-display">
            Industry Capstone Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.capstoneProjects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-white/95 rounded-2xl p-6 space-y-3 hover:border-blue-400 transition-all border-2 border-blue-100 shadow-sm text-slate-900"
              >
                <h4 className="font-bold text-slate-900 text-base">{proj.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tools.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Roles & Eligibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-2 border-blue-200 shadow-xl text-slate-900">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-lg font-display">
              Eligible Career Roles
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.careerRoles.map((role, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-lg font-display">
              Eligibility Criteria
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {course.eligibility}
            </p>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs text-blue-800 font-semibold">
              * Non-technical & freshers undergo an introductory programming foundation bridge course at zero extra cost.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
