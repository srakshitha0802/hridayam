import React, { useState, useMemo } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { PLACED_STUDENTS } from '../data/itvedantData';

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
    <div className="space-y-16 pb-20 relative z-10 text-white">
      {/* 1. PLACEMENTS HERO (GLASSY PINK & WINE AESTHETIC) */}
      <section className="pt-8 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border-2 border-pink-400/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/80 border border-pink-400/40 text-pink-200 text-xs font-semibold">
                  <GoogleIcon name="workspace_premium" size={17} className="text-pink-300" />
                  <span>100% Placement Support Record</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
                  Placements at Hridayam by Belvo -{' '}
                  <span className="text-pink-300">Empowering Careers</span> with 100% Placement Support
                </h1>

                <p className="text-pink-100 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  We bridge the gap between fresh graduates, career switchers, and leading IT recruiters. Over 40,000+ alumni have transitioned into high-paying engineering, analytics, and cloud careers.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-pink-400/30">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white font-display">
                      40,000+
                    </div>
                    <div className="text-xs text-pink-200">Careers Transformed</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-pink-200 font-display">
                      2,000+
                    </div>
                    <div className="text-xs text-pink-200">Hiring Partners</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white font-display">
                      ₹30 LPA
                    </div>
                    <div className="text-xs text-pink-200">Highest Package</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-pink-100 font-display">
                      98.4%
                    </div>
                    <div className="text-xs text-pink-200">Placement Success</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => onRequestCallback('Placement Assurance Inquiry')}
                    className="btn-pink-primary px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-xl cursor-pointer"
                  >
                    Download Placement Report
                  </button>
                  <a
                    href="#placed-directory"
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-pink-400/30 flex items-center gap-1.5"
                  >
                    <span>Browse Placed Students</span>
                    <GoogleIcon name="arrow_downward" size={16} />
                  </a>
                </div>
              </div>

              {/* Right Side: Graphic Card Illustrating Placement FAQs */}
              <div className="lg:col-span-5">
                <div className="bg-black/35 backdrop-blur-xl rounded-2xl p-6 border border-pink-400/30 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-pink-400/25">
                    <div className="flex items-center gap-2">
                      <GoogleIcon name="verified_user" size={20} className="text-pink-300" />
                      <span className="font-semibold text-white text-sm">Placement FAQs & Facts</span>
                    </div>
                    <span className="text-[10px] bg-pink-900/90 text-pink-200 font-bold px-2 py-0.5 rounded border border-pink-400/40">
                      Verified Stats
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="bg-black/30 p-3.5 rounded-xl space-y-1 border border-pink-400/20">
                      <div className="font-semibold text-pink-300">How many interview calls do I get?</div>
                      <div className="text-pink-100">
                        Unlimited interview calls until you secure your desired offer letter! No arbitrary cap.
                      </div>
                    </div>
                    <div className="bg-black/30 p-3.5 rounded-xl space-y-1 border border-pink-400/20">
                      <div className="font-semibold text-pink-300">What if I am from a non-IT stream?</div>
                      <div className="text-pink-100">
                        65% of our placed students come from B.Sc, B.Com, Mechanical, Civil, or Arts backgrounds.
                      </div>
                    </div>
                    <div className="bg-black/30 p-3.5 rounded-xl space-y-1 border border-pink-400/20">
                      <div className="font-semibold text-pink-300">When does placement assistance start?</div>
                      <div className="text-pink-100">
                        Placement cell engages after 75% curriculum completion with resume grooming & 15+ mock interviews.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAMPUS PLACEMENT DRIVES PHOTO CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase text-pink-300 tracking-widest">
            Weekly Recruitment Drives
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Campus Placement Drives in Action
          </h2>
          <p className="text-xs sm:text-sm text-pink-200">
            Witness our on-campus and virtual hiring drives where top tech recruiters recruit directly from our training campuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-dark rounded-2xl overflow-hidden shadow-xl group h-64 bg-black/40 relative border border-pink-400/40">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80"
              alt="Campus Drive Felicitation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#180212] via-[#24031B]/40 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-semibold text-pink-300">Thane Main Campus</span>
              <h4 className="font-bold text-base text-white">Capgemini & TCS Mega Recruitment Day</h4>
              <p className="text-[11px] text-pink-200">32 Candidates Shortlisted in single drive</p>
            </div>
          </div>

          <div className="glass-dark rounded-2xl overflow-hidden shadow-xl group h-64 bg-black/40 relative border border-pink-400/40">
            <img
              src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=700&q=80"
              alt="Pune Campus Drive"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#180212] via-[#24031B]/40 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-semibold text-pink-300">Pune FC Road Campus</span>
              <h4 className="font-bold text-base text-white">FinTech & Cloud Startup Hiring Sprint</h4>
              <p className="text-[11px] text-pink-200">Highest Offer ₹12.5 LPA awarded on-spot</p>
            </div>
          </div>

          <div className="glass-dark rounded-2xl overflow-hidden shadow-xl group h-64 bg-black/40 relative border border-pink-400/40">
            <img
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=700&q=80"
              alt="Offer Letter Celebration"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#180212] via-[#24031B]/40 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs font-semibold text-pink-300">Andheri Campus</span>
              <h4 className="font-bold text-base text-white">Offer Letter Felicitations</h4>
              <p className="text-[11px] text-pink-200">Celebrating career transformations weekly</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PLACEMENT RECORD DIRECTORY */}
      <section id="placed-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="glass-dark rounded-3xl p-6 sm:p-8 border-2 border-pink-400/40 space-y-6 shadow-2xl">
          <div>
            <span className="text-xs font-semibold uppercase text-pink-300 tracking-widest">
              Live Verified Alumni
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Recent Student Placements Directory
            </h2>
            <p className="text-xs sm:text-sm text-pink-200 mt-1">
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
                className="text-pink-300 absolute left-3.5 top-3"
              />
              <input
                type="text"
                placeholder="Search student, role, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>

            {/* Course Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              >
                {courseCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#24031B] text-white">
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
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              >
                {transitionTypes.map((t) => (
                  <option key={t} value={t} className="bg-[#24031B] text-white">
                    Background: {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-xs font-semibold text-pink-200 flex items-center justify-between border-t border-pink-400/30 pt-3">
            <span>
              Showing <strong className="text-white">{filteredStudents.length}</strong> placed students
            </span>
            {(searchTerm || selectedCourseFilter !== 'All' || selectedTransitionFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCourseFilter('All');
                  setSelectedTransitionFilter('All');
                }}
                className="text-pink-300 font-semibold hover:underline"
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
                className="glass-dark rounded-2xl p-5 hover:border-pink-300 transition-all duration-200 flex flex-col justify-between group border border-pink-400/35 shadow-xl"
              >
                <div className="space-y-3">
                  {/* Student Photo & Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={student.photoUrl}
                      alt={student.name}
                      className="w-13 h-13 rounded-full object-cover border-2 border-pink-400/50 group-hover:border-pink-300 transition-colors shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-white text-sm group-hover:text-pink-200 transition-colors">
                        {student.name}
                      </h4>
                      <p className="text-xs text-pink-200">{student.role}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-bold text-pink-100">
                          {student.company}
                        </span>
                        <span className="text-[10px] bg-pink-900/80 text-pink-200 font-bold px-1.5 py-0.2 rounded-full border border-pink-400/40">
                          {student.packageLPA} LPA
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Previous Background Badge */}
                  <div className="bg-black/35 p-2.5 rounded-xl border border-pink-400/30 text-xs space-y-0.5">
                    <div className="text-[10px] font-semibold text-pink-300 uppercase">
                      Previous Background:
                    </div>
                    <div className="text-xs font-semibold text-white">
                      {student.previousBackground}
                    </div>
                    <div className="text-[10px] text-pink-200 font-semibold">
                      Transition: {student.transitionType}
                    </div>
                  </div>

                  {student.quote && (
                    <p className="text-[11px] text-pink-100 italic line-clamp-3">
                      "{student.quote}"
                    </p>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-pink-400/30 flex items-center justify-between text-[10px] text-pink-200">
                  <span className="truncate max-w-[140px]">{student.courseCategory}</span>
                  <span className="font-semibold text-pink-100">{student.year} Batch</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE 5-PILLAR PLACEMENT PROCESS */}
      <section className="py-14 glass-dark border-y border-pink-400/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase text-pink-300 tracking-widest">
              Dedicated Placement Cell
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Prepared by Latest Industry Curriculum & 5-Pillar Placement Cell
            </h2>
            <p className="text-xs sm:text-sm text-pink-200">
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
                className="glass-dark rounded-2xl p-5 border border-pink-400/40 shadow-xl space-y-2 relative group hover:border-pink-300 transition-all text-white"
              >
                <span className="text-2xl font-bold text-pink-300 font-display">
                  {pillar.number}
                </span>
                <h4 className="font-bold text-white text-sm leading-snug">{pillar.title}</h4>
                <p className="text-xs text-pink-200 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORPORATE HIRING INQUIRY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-dark rounded-3xl p-8 border-2 border-pink-400/40 shadow-2xl relative overflow-hidden text-white backdrop-blur-2xl">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
            <span className="text-xs font-semibold uppercase text-pink-300 tracking-widest">
              Zero Cost Hiring Partner Program
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Are You Looking for the Right Talent for Your Organization?
            </h2>
            <p className="text-xs text-pink-200">
              Hire pre-vetted, job-ready Full Stack Developers, Data Scientists, Cloud Engineers, and QA Specialists at zero recruitment fees.
            </p>
          </div>

          {corporateFormSubmitted ? (
            <div className="bg-pink-950/80 border border-pink-400/40 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-tr from-pink-500 to-rose-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <GoogleIcon name="check" size={24} weight={600} />
              </div>
              <h4 className="font-bold text-white text-lg">Thank You, {corporateForm.hrName}!</h4>
              <p className="text-xs text-pink-200">
                Our Corporate Placement Officer has received your requirements for <strong>{corporateForm.companyName}</strong>. We will share curated student resumes within 4 business hours.
              </p>
              <button
                onClick={() => setCorporateFormSubmitted(false)}
                className="text-xs font-semibold text-pink-300 underline cursor-pointer hover:text-white"
              >
                Post another opening
              </button>
            </div>
          ) : (
            <form onSubmit={handleCorporateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-pink-200 mb-1">Company / Organization Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Tech Solutions"
                    value={corporateForm.companyName}
                    onChange={(e) => setCorporateForm({ ...corporateForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-pink-200 mb-1">HR / Recruiter Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={corporateForm.hrName}
                    onChange={(e) => setCorporateForm({ ...corporateForm, hrName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-pink-200 mb-1">Official Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="hr@company.com"
                    value={corporateForm.email}
                    onChange={(e) => setCorporateForm({ ...corporateForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-pink-200 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={corporateForm.phone}
                    onChange={(e) => setCorporateForm({ ...corporateForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-pink-200 mb-1">Hiring Role Needed</label>
                  <select
                    value={corporateForm.hiringRole}
                    onChange={(e) => setCorporateForm({ ...corporateForm, hiringRole: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                  >
                    <option value="Data Analyst / Scientist" className="bg-[#24031B] text-white">Data Analyst / Scientist</option>
                    <option value="Full Stack Developer (MERN / Python / Java)" className="bg-[#24031B] text-white">Full Stack Developer</option>
                    <option value="AWS Cloud & DevOps Engineer" className="bg-[#24031B] text-white">AWS Cloud & DevOps Engineer</option>
                    <option value="Software QA & Automation Engineer" className="bg-[#24031B] text-white">Software QA & Automation Engineer</option>
                    <option value="Cyber Security SOC Analyst" className="bg-[#24031B] text-white">Cyber Security SOC Analyst</option>
                    <option value="Digital Marketing Specialist" className="bg-[#24031B] text-white">Digital Marketing Specialist</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-pink-200 mb-1">Positions Needed</label>
                  <select
                    value={corporateForm.positionsCount}
                    onChange={(e) => setCorporateForm({ ...corporateForm, positionsCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                  >
                    <option value="1-5" className="bg-[#24031B] text-white">1 - 5 Openings</option>
                    <option value="6-15" className="bg-[#24031B] text-white">6 - 15 Openings</option>
                    <option value="15+" className="bg-[#24031B] text-white">15+ Mass Hiring Drive</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-pink-primary font-semibold text-xs uppercase tracking-wider text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer"
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
