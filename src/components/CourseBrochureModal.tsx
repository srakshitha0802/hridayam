import React, { useMemo, useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { COURSE_EXTRAS, PARTNER_UNIVERSITIES, SUBSCRIPTION_PLANS } from '../data/catalogSeed';
import { BELVO_CATEGORIES, Course } from '../types';

interface CourseBrochureModalProps {
  courses: Course[];
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
  onExploreCatalogue: (category?: string) => void;
  onRequestAdmissions: () => void;
}

export function CourseBrochureModal({
  courses,
  onClose,
  onSelectCourse,
  onExploreCatalogue,
  onRequestAdmissions,
}: CourseBrochureModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tracks' | 'admissions'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const totalHours = useMemo(
    () => courses.reduce((sum, c) => sum + c.durationHours, 0),
    [courses]
  );

  const filteredCourses = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return courses.filter((course) => {
      if (selectedCategory !== 'All' && course.category !== selectedCategory) return false;
      if (!q) return true;
      const meta = COURSE_EXTRAS[course.id];
      const hay = `${course.title} ${course.category} ${course.summary} ${course.instructorName} ${meta?.toolsCovered.join(' ') || ''
        }`.toLowerCase();
      return hay.includes(q);
    });
  }, [courses, searchTerm, selectedCategory]);

  const handleDownloadProspectus = () => {
    const lines: string[] = [
      '========================================================================',
      'HRIDAYAM BY BELVO — 2026 OFFICIAL COURSE BROCHURE & ACADEMIC PROSPECTUS',
      'GenZ learning By a GenZ',
      '========================================================================',
      '',
      'About Hridayam by Belvo:',
      'Practical, mentor-guided education across 11 digital, creative, engineering,',
      'and business verticals built directly from Belvo client delivery playbooks.',
      '',
      `Catalogue Snapshot: ${courses.length} Flagship Courses · ${totalHours}+ Total Hours · ${PARTNER_UNIVERSITIES.length} Partner Universities`,
      '',
      '------------------------------------------------------------------------',
      'COMPLETE 11-TRACK COURSE DIRECTORY',
      '------------------------------------------------------------------------',
      '',
    ];

    courses.forEach((course, idx) => {
      const extra = COURSE_EXTRAS[course.id];
      lines.push(
        `${String(idx + 1).padStart(2, '0')}. ${course.title}`,
        `    Category: ${course.category} | Level: ${course.level} | Runtime: ${course.durationHours}h`,
        `    Instructor: ${course.instructorName}${extra ? ` (${extra.instructorRole})` : ''}`,
        `    Fee: ${course.isFree ? 'Free Open Access' : `$${course.price} one-time (Included in All-Access Pro)`}`,
        extra ? `    Tools: ${extra.toolsCovered.join(', ')} | Next Cohort: ${extra.nextCohortDate}` : '',
        extra ? `    Capstone: ${extra.capstoneProject}` : '',
        `    Summary: ${course.summary}`,
        `    Learning Outcomes:`,
        ...course.outcomes.map((o) => `      - ${o}`),
        ''
      );
    });

    lines.push(
      '------------------------------------------------------------------------',
      'MEMBERSHIP & CAMPUS OPTIONS',
      '------------------------------------------------------------------------',
      ...SUBSCRIPTION_PLANS.map(
        (plan) =>
          `* ${plan.name} (${plan.audience}): $${plan.annualMonthlyEquivalent}/mo billed annually ($${plan.annualTotal}/yr) or $${plan.monthlyPrice}/mo\n  Access: ${plan.limits.courseAccess} | Credentials: ${plan.limits.certificates}`
      ),
      '',
      'Admissions Desk: admissions@hridayam.belvo.edu | Bengaluru & Global Remote',
      ''
    );

    const blob = new Blob([lines.filter((l) => l !== undefined).join('\n')], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hridayam-by-belvo-2026-course-brochure.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
    >
      <div className="edu-panel rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Brochure Top Header with Uploaded Logo */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src="/assets/aistudio/image_60047325.png"
              alt="Hridayam by Belvo"
              className="h-11 w-auto rounded-xl bg-white p-1 border border-slate-200 object-contain shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#1D4ED8]">
                Hridayam by Belvo · Academic Prospectus 2026
              </p>
              <h2
                id="brochure-modal-title"
                className="font-display text-xl sm:text-2xl font-bold text-[#0F172A] truncate"
              >
                Course Brochure &amp; Curriculum Details
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadProspectus}
              className="btn-pink-primary px-4 py-2 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 whitespace-nowrap min-h-[38px] text-white shadow-xs cursor-pointer"
            >
              <GoogleIcon name="download" size={16} />
              Download Brochure
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="glass-card hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold rounded-xl items-center gap-1.5 whitespace-nowrap min-h-[38px] text-pink-700 hover:border-pink-300 cursor-pointer"
            >
              <GoogleIcon name="print" size={16} className="text-pink-600" />
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close brochure"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-pink-100/60 rounded-xl transition-colors cursor-pointer"
            >
              <GoogleIcon name="close" size={20} />
            </button>
          </div>
        </div>

        {/* Brochure Navigation Tabs */}
        <div className="px-6 py-3 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'overview', label: '01. Academy Overview & Pedagogy' },
                { id: 'tracks', label: `02. All ${courses.length} Courses & Fees` },
                { id: 'admissions', label: '03. Plans, Credits & Admissions' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-[#1D4ED8] text-white shadow-xs'
                    : 'text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p className="font-mono-tabular text-xs text-[#64748B]">
            {courses.length} Courses · {totalHours}+ Hours · Verified Certificates
          </p>
        </div>

        {/* Scrollable Brochure Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="rounded-2xl p-6 edu-panel grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <p className="text-xs font-semibold text-pink-700 inline-flex items-center gap-1.5">
                    <GoogleIcon name="school" size={16} />
                    GenZ learning By a GenZ · Why Hridayam by Belvo
                  </p>
                  <h3 className="font-display text-2xl font-bold text-[#0F172A] mt-1.5 text-balance">
                    Real agency workflows, 3A career assurance, and direct faculty mentorship
                  </h3>
                  <p className="text-sm text-[#475569] mt-2.5 leading-relaxed">
                    Every program inside Hridayam by Belvo is authored by active practitioners across Belvo’s engineering, product design, marketing, media, and analytics studios. Learners graduate with audited portfolio deliverables rather than passive video hours.
                  </p>
                </div>
                <div className="md:col-span-4 grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl edu-subpanel">
                    <p className="font-mono-tabular text-xl font-bold text-pink-700">11</p>
                    <p className="text-[11px] font-medium text-[#475569] mt-0.5">Core Disciplines</p>
                  </div>
                  <div className="p-3.5 rounded-xl edu-subpanel">
                    <p className="font-mono-tabular text-xl font-bold text-pink-700">{totalHours}h+</p>
                    <p className="text-[11px] font-medium text-[#475569] mt-0.5">Studio Runtime</p>
                  </div>
                  <div className="p-3.5 rounded-xl edu-subpanel">
                    <p className="font-mono-tabular text-xl font-bold text-pink-700">80%</p>
                    <p className="text-[11px] font-medium text-[#475569] mt-0.5">Practical Ratio</p>
                  </div>
                  <div className="p-3.5 rounded-xl edu-subpanel">
                    <p className="font-mono-tabular text-xl font-bold text-pink-700">8</p>
                    <p className="text-[11px] font-medium text-[#475569] mt-0.5">Uni Alliances</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl glass-card">
                  <GoogleIcon name="menu_book" size={20} className="text-pink-600" />
                  <h4 className="font-display text-base font-semibold text-[#0F172A] mt-2.5">
                    01. Studio Video &amp; Workbooks
                  </h4>
                  <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                    Concise 15–35 minute HD walkthroughs paired with downloadable templates, SQL schemas, Figma starter files, and ad budgets.
                  </p>
                </div>
                <div className="p-5 rounded-2xl glass-card">
                  <GoogleIcon name="calendar_month" size={20} className="text-pink-600" />
                  <h4 className="font-display text-base font-semibold text-[#0F172A] mt-2.5">
                    02. Weekly Office Hours
                  </h4>
                  <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                    Bring live client or student projects to weekly mentor critiques with Arjun Deshmukh, Meera Nair, and Dr. Ananya Sen.
                  </p>
                </div>
                <div className="p-5 rounded-2xl glass-card">
                  <GoogleIcon name="verified" size={20} className="text-pink-600" />
                  <h4 className="font-display text-base font-semibold text-[#0F172A] mt-2.5">
                    03. Verifiable Credentials
                  </h4>
                  <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                    Every completed course issues a printable certificate with an employer-verifiable Credential ID backed by Belvo registry records.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-display text-base font-semibold text-[#0F172A] mb-3">
                  Included Across All 11 Verticals
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {BELVO_CATEGORIES.map((cat, idx) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setActiveTab('tracks');
                      }}
                      className="text-left px-3.5 py-2.5 rounded-xl edu-card flex items-center justify-between gap-2"
                    >
                      <span className="text-xs font-medium text-[#0F172A] truncate">
                        <span className="font-mono-tabular text-pink-700 mr-1.5">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        {cat}
                      </span>
                      <GoogleIcon name="arrow_forward" size={14} className="text-pink-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tracks' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-7 relative">
                  <GoogleIcon name="search" size={18} className="text-pink-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filter brochure by course, tool (Figma, SQL, AI), or faculty..."
                    className="w-full pl-10 pr-4 py-2 text-xs edu-input rounded-xl"
                  />
                </div>
                <div className="sm:col-span-5">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs edu-input rounded-xl"
                  >
                    <option value="All">All 11 Disciplines</option>
                    {BELVO_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filteredCourses.map((course) => {
                  const extra = COURSE_EXTRAS[course.id];
                  return (
                    <div
                      key={course.id}
                      className="p-4 sm:p-5 rounded-2xl edu-card flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#64748B]">
                          <span className="font-semibold text-[#1D4ED8]">{course.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{course.level}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">{course.durationHours}h</span>
                          {extra && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>Next Cohort: {extra.nextCohortDate}</span>
                            </>
                          )}
                        </div>
                        <h4 className="font-display text-base font-bold text-[#0F172A]">
                          {course.title}
                        </h4>
                        <p className="text-xs text-[#475569] leading-relaxed">{course.summary}</p>
                        {extra && (
                          <p className="text-[11px] text-[#64748B]">
                            <span className="font-semibold text-[#0F172A]">Capstone:</span> {extra.capstoneProject}{' '}
                            · <span className="font-semibold text-[#0F172A]">Tools:</span>{' '}
                            {extra.toolsCovered.join(', ')}
                          </p>
                        )}
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                        <div className="text-right">
                          <p className="font-mono-tabular text-base font-bold text-[#0F172A]">
                            {course.isFree ? 'Free Access' : `$${course.price}`}
                          </p>
                          {!course.isFree && course.includedInSubscription && (
                            <p className="text-[11px] text-[#1D4ED8] font-semibold">Included in Pro</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectCourse(course);
                          }}
                          className="btn-edu-primary px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap"
                        >
                          Open Syllabus
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'admissions' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-5 rounded-2xl edu-card flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#1D4ED8]">{plan.audience}</p>
                      <h4 className="font-display text-lg font-bold text-[#0F172A] mt-1">{plan.name}</h4>
                      <p className="font-mono-tabular text-2xl font-bold text-[#0F172A] mt-3">
                        ${plan.annualMonthlyEquivalent}
                        <span className="text-xs font-normal text-[#64748B]"> / mo (annual)</span>
                      </p>
                      <ul className="mt-4 space-y-2 text-xs text-[#475569]">
                        <li className="flex items-start gap-2">
                          <GoogleIcon name="check" size={14} className="text-pink-600 shrink-0 mt-0.5" />
                          <span>{plan.limits.courseAccess}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <GoogleIcon name="check" size={14} className="text-pink-600 shrink-0 mt-0.5" />
                          <span>{plan.limits.assessments}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <GoogleIcon name="check" size={14} className="text-pink-600 shrink-0 mt-0.5" />
                          <span>{plan.limits.certificates}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <GoogleIcon name="check" size={14} className="text-pink-600 shrink-0 mt-0.5" />
                          <span>{plan.limits.mentorship}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl glass-card">
                <h4 className="font-display text-base font-bold text-[#0F172A]">
                  Partner University &amp; Accreditation Network
                </h4>
                <p className="text-xs text-[#475569] mt-1">
                  Elective studio modules and capstone juries are co-reviewed with our 8 academic partners:
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {PARTNER_UNIVERSITIES.map((uni) => (
                    <div key={uni.id} className="flex items-center justify-between py-1.5 border-b border-pink-100">
                      <span className="font-medium text-[#0F172A]">{uni.name}</span>
                      <span className="font-mono-tabular text-pink-700">
                        {uni.shortCode} · {uni.location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Brochure Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#475569]">
            Admissions Desk: <span className="font-semibold text-pink-700">admissions@hridayam.belvo.edu</span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onExploreCatalogue();
              }}
              className="glass-card px-4 py-2 text-xs font-semibold rounded-xl text-slate-700 hover:border-pink-300 cursor-pointer"
            >
              Browse Full Catalogue
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestAdmissions();
              }}
              className="btn-pink-primary px-5 py-2 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 text-white shadow-xs cursor-pointer"
            >
              Speak with Admissions
              <GoogleIcon name="arrow_forward" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
