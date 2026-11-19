import React, { useState, useMemo } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { PLACED_STUDENTS } from '../data/itvedantData';
import { CompanyLogosInlineStrip } from './CompaniesSlidingMarquee';

interface PlacementsViewProps {
  onRequestCallback: (courseInterest?: string) => void;
}

export const PlacementsView: React.FC<PlacementsViewProps> = ({ onRequestCallback }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');
  const [selectedTransitionFilter, setSelectedTransitionFilter] = useState('All');
  const [corporateFormSubmitted, setCorporateFormSubmitted] = useState(false);
  const [corporateForm, setCorporateForm] = useState({
    companyName: '',
    hrName: '',
    email: '',
    phone: '',
    hiringRole: 'Data Analyst / Scientist',
    positionsCount: '1-5',
  });

  const courseCategories = [
    'All',
    'Data Science & AI',
    'Full Stack Development',
    'Cloud & DevOps',
    'Software Testing',
    'Java Development',
    'Python Development',
    'Cyber Security',
    'Digital Marketing',
  ];

  const transitionTypes = [
    'All',
    'Non-IT to IT',
    'Fresher',
    'Career Gap',
    'Domain Switch',
    'Upskilling',
  ];

  const filteredStudents = useMemo(() => {
    return PLACED_STUDENTS.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.previousBackground.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCourse =
        selectedCourseFilter === 'All' || student.courseCategory === selectedCourseFilter;

      const matchesTransition =
        selectedTransitionFilter === 'All' ||
        student.transitionType === selectedTransitionFilter;

      return matchesSearch && matchesCourse && matchesTransition;
    });
  }, [searchTerm, selectedCourseFilter, selectedTransitionFilter]);

  const handleCorporateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corporateForm.companyName || !corporateForm.email) return;
    setCorporateFormSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20 relative z-10 text-slate-900">
      {/* 1. PLACEMENTS HERO (BLUE-WHITE PREMIUM TEXTURE) */}
      <section className="pt-8 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="frame-waves-dark rounded-3xl p-8 sm:p-12 relative overflow-hidden text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#94BCF1]">
                  100% Placement Support · NSDC Skill India Partner
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-tight">
                  Verified Indian Placements &amp; Corporate Hiring Drives
                </h1>

                <p className="text-[#D3E5FD] text-sm sm:text-base leading-relaxed max-w-2xl">
                  We bridge fresh graduates, career switchers, and India’s leading IT and product recruiters. Over 40,000+ alumni have transitioned into engineering, analytics, and cloud roles.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-tabular">
                      40,000+
                    </div>
                    <div className="text-xs text-[#D3E5FD]">Careers Transformed</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#94BCF1] font-mono-tabular">
                      2,000+
                    </div>
                    <div className="text-xs text-[#D3E5FD]">Hiring Partners</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-tabular">
                      ₹30 LPA
                    </div>
                    <div className="text-xs text-[#D3E5FD]">Highest Package</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#94BCF1] font-mono-tabular">
                      98.4%
                    </div>
                    <div className="text-xs text-[#D3E5FD]">Placement Success</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => onRequestCallback('Placement Assurance Inquiry')}
                    className="px-6 py-3 rounded-xl bg-white text-[#0B1B3D] hover:bg-[#E8F1FD] text-xs font-extrabold uppercase tracking-wider shadow-lg cursor-pointer"
                  >
                    Download Placement Report
                  </button>
                  <a
                    href="#placed-directory"
                    className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors border border-white/30 flex items-center gap-1.5"
                  >
                    <span>Browse Placed Students</span>
                    <GoogleIcon name="arrow_downward" size={16} />
                  </a>
                </div>
              </div>

              {/* Right Side: Placement Facts Card */}
              <div className="lg:col-span-5">
                <div className="bg-white/95 rounded-2xl p-6 border border-[#D3E5FD] shadow-xl space-y-4 text-[#0B1B3D]">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <GoogleIcon name="verified_user" size={20} className="text-[#1E428E]" />
                      <span className="font-extrabold text-[#0B1B3D] text-sm">Placement FAQs &amp; Facts</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#1E428E]">Verified 2026</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="bg-[#F4F8FF] p-3.5 rounded-xl space-y-1 border border-[#D3E5FD]">
                      <div className="font-bold text-[#132C63]">How many interview calls do I get?</div>
                      <div className="text-slate-600">
                        Unlimited interview calls until you secure your offer letter across campus and virtual drives.
                      </div>
                    </div>
                    <div className="bg-[#F4F8FF] p-3.5 rounded-xl space-y-1 border border-[#D3E5FD]">
                      <div className="font-bold text-[#132C63]">What if I am from a Non-IT stream?</div>
                      <div className="text-slate-600">
                        65% of our placed Indian students graduated in B.Com, B.Sc, Mechanical, Civil, or Arts streams.
                      </div>
                    </div>
                    <div className="bg-[#F4F8FF] p-3.5 rounded-xl space-y-1 border border-[#D3E5FD]">
                      <div className="font-bold text-[#132C63]">When does placement assistance begin?</div>
                      <div className="text-slate-600">
                        Placement cell engages at 75% curriculum completion with ATS resume grooming and 15+ mock interviews.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1B. REAL HIRING PARTNER LOGOS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="frame-border-blue rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase text-[#1E428E] tracking-widest">
              2,000+ Hiring Partners Across India
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1B3D] font-display">
              Trusted by India’s Top IT Services, Product &amp; FinTech Leaders
            </h2>
          </div>
          <CompanyLogosInlineStrip />
        </div>
      </section>

      {/* 2. CAMPUS PLACEMENT DRIVES GALLERY (PROVIDED INDIAN IMAGES ONLY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="video-section-panel rounded-3xl p-6 sm:p-8 space-y-6 text-white">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase text-[#94BCF1] tracking-widest">
            Weekly Recruitment Drives
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Indian Campus Placement Drives in Action
          </h2>
          <p className="text-xs sm:text-sm text-[#D3E5FD]">
            On-campus and virtual recruitment sprints across Thane, Mumbai, Pune, and Bengaluru hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl overflow-hidden h-64 bg-white relative">
            <img
              src="/assets/aistudio/Indians-Germany_8d220e87.jpg"
              alt="Thane Campus Recruitment Day"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/55 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-bold text-[#94BCF1]">Thane Main Campus</span>
              <h4 className="font-extrabold text-base text-white">Capgemini &amp; TCS Mega Recruitment Day</h4>
              <p className="text-[11px] text-[#D3E5FD]">32 Indian graduates shortlisted in a single drive</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden h-64 bg-white relative">
            <img
              src="/assets/aistudio/college-Admission-Guidance-1024x653.jpg_88c5e37a.webp"
              alt="Pune FC Road Campus Hiring Sprint"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/55 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-bold text-[#94BCF1]">Pune FC Road Campus</span>
              <h4 className="font-extrabold text-base text-white">FinTech &amp; Cloud Startup Hiring Sprint</h4>
              <p className="text-[11px] text-[#D3E5FD]">Highest offer ₹12.5 LPA awarded on-spot</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden h-64 bg-white relative">
            <img
              src="/assets/aistudio/images-3_93f13b2d.jpeg"
              alt="Andheri Campus Offer Letter Celebration"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/55 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-bold text-[#94BCF1]">Andheri Campus</span>
              <h4 className="font-extrabold text-base text-white">Offer Letter Felicitations</h4>
              <p className="text-[11px] text-[#D3E5FD]">Celebrating verified career transitions weekly</p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PLACEMENT RECORD DIRECTORY */}
      <section id="placed-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border-2 border-blue-200 space-y-6 shadow-xl text-slate-900">
          <div>
            <span className="text-xs font-semibold uppercase text-blue-600 tracking-widest">
              Live Verified Alumni
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Recent Student Placements Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Search and filter our real placed graduates by program, previous background, or hiring organization.
            </p>
          </div>

          {/* Search & Filters Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <GoogleIcon
                name="search"
                size={18}
                className="text-blue-500 absolute left-3.5 top-3"
              />
              <input
                type="text"
                placeholder="Search student, role, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
              />
            </div>

            {/* Course Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 bg-white"
              >
                {courseCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-white text-slate-900">
                    Course: {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Transition Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedTransitionFilter}
                onChange={(e) => setSelectedTransitionFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 bg-white"
              >
                {transitionTypes.map((t) => (
                  <option key={t} value={t} className="bg-white text-slate-900">
                    Background: {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-xs font-semibold text-slate-600 flex items-center justify-between border-t border-blue-100 pt-3">
            <span>
              Showing <strong className="text-blue-600">{filteredStudents.length}</strong> placed students
            </span>
            {(searchTerm || selectedCourseFilter !== 'All' || selectedTransitionFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCourseFilter('All');
                  setSelectedTransitionFilter('All');
                }}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Placed Students Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-2xl p-5 hover:border-blue-500 transition-all duration-200 flex flex-col justify-between group border-2 border-blue-100 shadow-md text-slate-900"
              >
                <div className="space-y-3">
                  {/* Student Photo & Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={student.photoUrl}
                      alt={student.name}
                      className="w-13 h-13 rounded-full object-cover border-2 border-blue-300 group-hover:border-blue-500 transition-colors shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        {student.name}
                      </h4>
                      <p className="text-xs text-slate-500">{student.role}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-bold text-slate-800">
                          {student.company}
                        </span>
                        <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.2 rounded-full border border-blue-200">
                          {student.packageLPA} LPA
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Previous Background Badge */}
                  <div className="bg-blue-50/70 p-2.5 rounded-xl border border-blue-100 text-xs space-y-0.5">
                    <div className="text-[10px] font-semibold text-blue-700 uppercase">
                      Previous Background:
                    </div>
                    <div className="text-xs font-semibold text-slate-800">
                      {student.previousBackground}
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">
                      Transition: {student.transitionType}
                    </div>
                  </div>

                  {student.quote && (
                    <p className="text-[11px] text-slate-600 italic line-clamp-3">
                      "{student.quote}"
                    </p>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-blue-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="truncate max-w-[140px] font-medium text-slate-700">{student.courseCategory}</span>
                  <span className="font-semibold text-blue-700">{student.year} Batch</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE 5-PILLAR PLACEMENT PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="frame-border-blue rounded-3xl p-6 sm:p-10 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase text-[#1E428E] tracking-widest">
              Dedicated Placement Cell
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] font-display">
              Prepared by Latest Industry Curriculum &amp; 5-Pillar Placement Cell
            </h2>
            <p className="text-xs sm:text-sm text-slate-700">
              Our 50+ member full-time placement operations team coaches you from day 1 to offer letter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                number: '01',
                title: 'ATS-Friendly Resume & LinkedIn Optimization',
                desc: 'Tailor your profile with industry-validated keywords and GitHub repositories that pass corporate Applicant Tracking Systems.',
              },
              {
                number: '02',
                title: '15+ Mock Technical & Coding Interviews',
                desc: 'Simulate high-pressure live coding tests and technical problem solving with seasoned architects.',
              },
              {
                number: '03',
                title: 'Soft Skills & Corporate Grooming',
                desc: 'Business communication, body language, email etiquette, and behavioural HR interview preparation.',
              },
              {
                number: '04',
                title: 'Unlimited Campus & Virtual Drives',
                desc: 'Exclusive recruitment drives scheduled weekly with top tier-1 MNCs and high-growth funded tech companies.',
              },
              {
                number: '05',
                title: 'Salary Negotiation & Offer Guidance',
                desc: 'Expert mentors guide you in evaluating offer letters, job roles, and negotiating the highest compensation package.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border-2 border-blue-100 shadow-sm space-y-2 relative group hover:border-blue-400 transition-all text-slate-900"
              >
                <span className="text-2xl font-bold text-blue-600 font-display">
                  {pillar.number}
                </span>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">{pillar.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORPORATE HIRING INQUIRY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 border-2 border-blue-200 shadow-2xl relative overflow-hidden text-slate-900">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
            <span className="text-xs font-semibold uppercase text-blue-600 tracking-widest">
              Zero Cost Hiring Partner Program
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Are You Looking for the Right Talent for Your Organization?
            </h2>
            <p className="text-xs text-slate-600">
              Hire pre-vetted, job-ready Full Stack Developers, Data Scientists, Cloud Engineers, and QA Specialists at zero recruitment fees.
            </p>
          </div>

          {corporateFormSubmitted ? (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-sky-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <GoogleIcon name="check" size={24} weight={600} />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Thank You, {corporateForm.hrName}!</h4>
              <p className="text-xs text-slate-600">
                Our Corporate Placement Officer has received your requirements for <strong>{corporateForm.companyName}</strong>. We will share curated student resumes within 4 business hours.
              </p>
              <button
                onClick={() => setCorporateFormSubmitted(false)}
                className="text-xs font-semibold text-blue-600 underline cursor-pointer hover:text-blue-800"
              >
                Post another opening
              </button>
            </div>
          ) : (
            <form onSubmit={handleCorporateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company / Organization Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Tech Solutions"
                    value={corporateForm.companyName}
                    onChange={(e) => setCorporateForm({ ...corporateForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">HR / Recruiter Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={corporateForm.hrName}
                    onChange={(e) => setCorporateForm({ ...corporateForm, hrName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="hr@company.com"
                    value={corporateForm.email}
                    onChange={(e) => setCorporateForm({ ...corporateForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={corporateForm.phone}
                    onChange={(e) => setCorporateForm({ ...corporateForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hiring Role Needed</label>
                  <select
                    value={corporateForm.hiringRole}
                    onChange={(e) => setCorporateForm({ ...corporateForm, hiringRole: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 bg-white"
                  >
                    <option value="Data Analyst / Scientist" className="bg-white text-slate-900">Data Analyst / Scientist</option>
                    <option value="Full Stack Developer (MERN / Python / Java)" className="bg-white text-slate-900">Full Stack Developer</option>
                    <option value="AWS Cloud & DevOps Engineer" className="bg-white text-slate-900">AWS Cloud & DevOps Engineer</option>
                    <option value="Software QA & Automation Engineer" className="bg-white text-slate-900">Software QA & Automation Engineer</option>
                    <option value="Cyber Security SOC Analyst" className="bg-white text-slate-900">Cyber Security SOC Analyst</option>
                    <option value="Digital Marketing Specialist" className="bg-white text-slate-900">Digital Marketing Specialist</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Positions Needed</label>
                  <select
                    value={corporateForm.positionsCount}
                    onChange={(e) => setCorporateForm({ ...corporateForm, positionsCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 bg-white"
                  >
                    <option value="1-5" className="bg-white text-slate-900">1 - 5 Openings</option>
                    <option value="6-15" className="bg-white text-slate-900">6 - 15 Openings</option>
                    <option value="15+" className="bg-white text-slate-900">15+ Mass Hiring Drive</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-blue-primary font-semibold text-xs uppercase tracking-wider text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                Hire Trained Talent (Zero Cost)
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
