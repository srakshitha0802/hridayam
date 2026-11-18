import React, { useState, useEffect } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { ITV_COURSES, ITvedantCourse } from '../data/itvedantData';
import { BELVO_CATEGORIES, CallbackLead, ReferralSubmission } from '../types';

interface CounselorAdminViewProps {
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
  onLogout: () => void;
}

export const CounselorAdminView: React.FC<CounselorAdminViewProps> = ({ onToast, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'courses' | 'materials' | 'students' | 'leads'>('analytics');

  // Courses state
  const [coursesList, setCoursesList] = useState<ITvedantCourse[]>(ITV_COURSES);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [selectedCourseForLesson, setSelectedCourseForLesson] = useState<string>(ITV_COURSES[0].id);

  // New Course Form state
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: BELVO_CATEGORIES[0],
    level: 'Beginner to Advanced',
    duration: '6 Months',
    price: 48000,
    isFree: false,
    summary: '',
    tools: 'Figma, React, Python, AWS',
    highestPackage: '₹18 LPA',
  });

  // Learning Material / Lesson Form state
  const [newLesson, setNewLesson] = useState({
    title: '',
    type: 'video' as 'video' | 'reading' | 'assignment' | 'quiz',
    duration: '35 mins',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    materialUrl: 'https://belvo.edu/materials/starter-guide.pdf',
    summary: '',
    quizQuestion: '',
    quizOptions: 'Option A, Option B, Option C, Option D',
  });

  // Leads & referrals state
  const [leads, setLeads] = useState<CallbackLead[]>([]);
  const [referrals, setReferrals] = useState<ReferralSubmission[]>([]);

  // Integrations state
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [paymentGatewayActive, setPaymentGatewayActive] = useState(true);

  // Load leads and referrals
  useEffect(() => {
    try {
      const storedLeads = JSON.parse(localStorage.getItem('itv_leads_v1') || '[]');
      if (storedLeads.length === 0) {
        const demoLeads: CallbackLead[] = [
          {
            id: 'l_1',
            name: 'Pooja Deshpande',
            phone: '+91 98201 12345',
            email: 'pooja.d@gmail.com',
            courseInterest: 'Artificial Intelligence, Machine Learning, and Automation',
            cityOrCenter: 'Thane Head Office',
            status: 'new',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: 'l_2',
            name: 'Aditya Kulkarni',
            phone: '+91 98192 67890',
            email: 'aditya.k@yahoo.com',
            courseInterest: 'Web, App, and Software Development',
            cityOrCenter: 'Pune FC Road',
            status: 'contacted',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
          },
          {
            id: 'l_3',
            name: 'Snehal More',
            phone: '+91 98334 54321',
            email: 'snehal.m@outlook.com',
            courseInterest: 'Digital Marketing and Social Media Management',
            cityOrCenter: 'Andheri West Campus',
            status: 'counseled',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        localStorage.setItem('itv_leads_v1', JSON.stringify(demoLeads));
        setLeads(demoLeads);
      } else {
        setLeads(storedLeads);
      }

      const storedRef = JSON.parse(localStorage.getItem('itv_referrals_v1') || '[]');
      if (storedRef.length === 0) {
        const demoRef: ReferralSubmission[] = [
          {
            id: 'ref_1',
            referrerName: 'Rohan Shinde',
            referrerPhone: '+91 98200 11223',
            referrerEmail: 'rohan.s@gmail.com',
            referrerRole: 'Current Student (Data Science Batch A)',
            friendName: 'Amit Verma',
            friendPhone: '+91 98111 22334',
            friendEmail: 'amit.v@gmail.com',
            interestedCourse: 'Web, App, and Software Development',
            preferredCenter: 'Thane Head Office',
            rewardStatus: 'Voucher Dispatched (₹5,000)',
            voucherCode: 'AMZ-5000-HRID-4491',
            referralCode: 'REFROH89',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
          },
        ];
        localStorage.setItem('itv_referrals_v1', JSON.stringify(demoRef));
        setReferrals(demoRef);
      } else {
        setReferrals(storedRef);
      }
    } catch {}
  }, []);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title) return;

    const created: ITvedantCourse = {
      id: `course_${Date.now()}`,
      slug: newCourse.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newCourse.title,
      shortTitle: newCourse.title.slice(0, 25),
      category: newCourse.category,
      categoryLabel: newCourse.category.split(' ')[0],
      duration: newCourse.duration,
      mode: 'Classroom & Online Live',
      level: newCourse.level,
      certification: 'Belvo Professional Certified',
      rating: 4.9,
      reviewCount: 1,
      projectsCount: 20,
      highestPackage: newCourse.highestPackage,
      avgPackage: '₹6.5 LPA',
      badge: 'New Belvo Track',
      summary: newCourse.summary || 'Comprehensive master program designed by Belvo industry experts.',
      description: newCourse.summary || 'Real-world practical studio labs with 100% placement support.',
      toolsCovered: newCourse.tools.split(',').map((t) => t.trim()),
      keyHighlights: ['100% Placement Support', 'Studio Lab Access', 'Industry Mentorship'],
      careerRoles: ['Specialist', 'Consultant', 'Lead Engineer'],
      eligibility: 'Open to freshers and graduates.',
      curriculum: [
        {
          moduleNumber: 1,
          title: 'Foundations & Architecture',
          duration: '4 Weeks',
          topics: ['Fundamentals', 'Best Practices', 'Studio Tools'],
          skillsGained: 'Core domain mastery.',
        },
      ],
      capstoneProjects: [
        {
          title: 'Production Capstone Deliverable',
          description: 'Build an end-to-end industry solution and present to jury.',
          tools: newCourse.tools.split(',').map((t) => t.trim()),
        },
      ],
      emiStartsAt: '₹3,499/mo',
      fee: newCourse.isFree ? 0 : Number(newCourse.price),
      originalFee: Number(newCourse.price) * 1.3,
      nextBatch: 'Starting Next Monday',
    };

    setCoursesList([created, ...coursesList]);
    setIsCreatingCourse(false);
    onToast('success', 'Course Published!', `${created.title} is now live on the platform catalogue.`);
  };

  const handleUploadLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLesson.title) return;
    onToast(
      'success',
      'Learning Material Uploaded!',
      `Added "${newLesson.title}" (${newLesson.type.toUpperCase()}) to ${
        coursesList.find((c) => c.id === selectedCourseForLesson)?.title || 'course'
      }.`
    );
    setNewLesson({
      title: '',
      type: 'video',
      duration: '30 mins',
      videoUrl: '',
      materialUrl: '',
      summary: '',
      quizQuestion: '',
      quizOptions: '',
    });
  };

  const handlePriceUpdate = (courseId: string, newPrice: number) => {
    setCoursesList(
      coursesList.map((c) => (c.id === courseId ? { ...c, fee: newPrice } : c))
    );
    onToast('info', 'Pricing Updated', `Course fee updated to ₹${newPrice.toLocaleString()}`);
  };

  const totalRevenue = coursesList.reduce((sum, c) => sum + (c.fee || 0) * (c.reviewCount || 10), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10 text-slate-900">
      {/* Admin Header */}
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-2 border-blue-200 text-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-xs">
                Executive Console
              </span>
              <span className="text-xs text-blue-600 font-mono">Belvo Platform Admin v2.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Hridayam by Belvo Admin &amp; Studio Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Manage all 11 Belvo course tracks, upload video lessons, adjust pricing, and track platform performance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreatingCourse(true)}
              className="btn-blue-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-2 cursor-pointer"
            >
              <GoogleIcon name="add" size={18} />
              <span>Create New Course</span>
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors cursor-pointer"
            >
              Exit Console
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-100 text-xs text-slate-700">
          <div>
            <span className="text-blue-700 block text-[10px] uppercase font-semibold">Total Revenue (Simulated)</span>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
              ₹{(totalRevenue / 100000).toFixed(1)}L
            </span>
          </div>
          <div>
            <span className="text-blue-700 block text-[10px] uppercase font-semibold">Live Belvo Courses</span>
            <span className="text-xl sm:text-2xl font-bold text-blue-600 font-mono">
              {coursesList.length} Tracks
            </span>
          </div>
          <div>
            <span className="text-blue-700 block text-[10px] uppercase font-semibold">Active Inquiries</span>
            <span className="text-xl sm:text-2xl font-bold text-blue-600 font-mono">
              {leads.length} Leads
            </span>
          </div>
          <div>
            <span className="text-blue-700 block text-[10px] uppercase font-semibold">Gateway Status</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-600 font-display flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              UPI &amp; Cards Active
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-sky-200/80">
        {[
          { id: 'analytics', label: '01. Live Analytics & Overview', icon: 'monitoring' },
          { id: 'courses', label: '02. Manage Courses & Pricing', icon: 'menu_book' },
          { id: 'materials', label: '03. Upload Lessons & Quizzes', icon: 'cloud_upload' },
          { id: 'students', label: '04. Enrolled Students', icon: 'group' },
          { id: 'leads', label: '05. Inquiries & Referrals', icon: 'contact_support' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md'
                : 'glass-card text-slate-700 hover:border-sky-300'
            }`}
          >
            <GoogleIcon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* MODAL: CREATE COURSE */}
      {isCreatingCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass-panel rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-sky-300 bg-white/95 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <h3 className="font-bold text-lg text-slate-900 font-display flex items-center gap-2">
                <GoogleIcon name="add_circle" size={20} className="text-blue-400" />
                <span>Publish New Course Track</span>
              </h3>
              <button
                onClick={() => setIsCreatingCourse(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <GoogleIcon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Spatial Computing & Vision Pro Architecture"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Belvo Category *</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs focus:outline-none focus:border-sky-500 font-medium"
                  >
                    {BELVO_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Fee (₹ INR) *</label>
                  <input
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
                    disabled={newCourse.isFree}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs focus:outline-none focus:border-sky-500 disabled:opacity-50"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newCourse.isFree}
                      onChange={(e) => setNewCourse({ ...newCourse, isFree: e.target.checked })}
                      className="rounded accent-[#3869C3] cursor-pointer"
                    />
                    <span className="font-semibold text-sky-300">Make Free / Scholarship Access</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tools &amp; Frameworks (Comma separated)</label>
                <input
                  type="text"
                  value={newCourse.tools}
                  onChange={(e) => setNewCourse({ ...newCourse, tools: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Summary</label>
                <textarea
                  rows={3}
                  value={newCourse.summary}
                  onChange={(e) => setNewCourse({ ...newCourse, summary: e.target.value })}
                  placeholder="Summary of skills, outcomes and who this program is for..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingCourse(false)}
                  className="px-4 py-2.5 rounded-xl border border-sky-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-blue-primary px-6 py-2.5 rounded-xl text-white font-bold uppercase tracking-wider shadow-md"
                >
                  Publish Course Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 1: ANALYTICS & OVERVIEW */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 space-y-2 border-sky-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Platform Enrolments</span>
                <GoogleIcon name="school" size={20} className="text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 font-display">18,490</div>
              <p className="text-xs text-sky-300 font-semibold">+14.2% increase this month across 11 tracks</p>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-2 border-sky-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Course Completion</span>
                <GoogleIcon name="fact_check" size={20} className="text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-sky-300 font-display">89.4%</div>
              <p className="text-xs text-slate-500">Highest completion in AI Automation &amp; UI/UX</p>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-2 border-sky-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Placement Drive Conversion</span>
                <GoogleIcon name="trending_up" size={20} className="text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 font-display">98.4%</div>
              <p className="text-xs text-blue-400 font-semibold">Average salary: ₹7.6 LPA across cohorts</p>
            </div>
          </div>

          {/* Integrations & Notification Settings */}
          <div className="glass-panel rounded-3xl p-6 space-y-4 border-sky-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base font-display">Platform Integrations &amp; Automated Webhooks</h3>
                <p className="text-xs text-slate-500">Essential platform automations, email dispatches, and payment gateways.</p>
              </div>
              <span className="text-[10px] font-bold bg-blue-950 text-sky-200 border border-sky-200 px-3 py-1 rounded-full uppercase">
                All Systems Operational
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 glass-card rounded-2xl border-sky-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Email Notifications</div>
                  <div className="text-[10px] text-slate-500">Enrolment receipts &amp; certificate alerts</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotificationsEnabled}
                  onChange={(e) => {
                    setEmailNotificationsEnabled(e.target.checked);
                    onToast('info', 'Settings Saved', 'Email notification preference updated.');
                  }}
                  className="rounded accent-[#3869C3] cursor-pointer w-4 h-4"
                />
              </div>

              <div className="p-4 glass-card rounded-2xl border-sky-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Payment Gateway</div>
                  <div className="text-[10px] text-slate-500">UPI, Cards, and NetBanking</div>
                </div>
                <input
                  type="checkbox"
                  checked={paymentGatewayActive}
                  onChange={(e) => {
                    setPaymentGatewayActive(e.target.checked);
                    onToast('info', 'Gateway Updated', 'Payment processing status modified.');
                  }}
                  className="rounded accent-[#3869C3] cursor-pointer w-4 h-4"
                />
              </div>

              <div className="p-4 glass-card rounded-2xl border-sky-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Cloud CDN Storage</div>
                  <div className="text-[10px] text-slate-500">High-speed video &amp; PDF delivery</div>
                </div>
                <span className="text-[11px] font-bold text-blue-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE COURSES & PRICING */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-bold text-slate-900 text-lg font-display">
              All {coursesList.length} Active Courses &amp; Pricing Overrides
            </h3>
            <span className="text-xs text-sky-300 font-semibold">
              Changes reflect instantly across the student catalogue.
            </span>
          </div>

          <div className="space-y-3">
            {coursesList.map((course) => (
              <div
                key={course.id}
                className="glass-card rounded-2xl p-5 hover:border-sky-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold text-sky-300 bg-blue-950 px-2 py-0.5 rounded-full uppercase">
                      {course.category}
                    </span>
                    <span className="text-xs text-slate-400">• {course.duration}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{course.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{course.summary}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Course Fee</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900 text-sm">₹</span>
                      <input
                        type="number"
                        defaultValue={course.fee}
                        onBlur={(e) => handlePriceUpdate(course.id, Number(e.target.value))}
                        className="w-24 px-2 py-1 text-xs font-bold rounded-lg border border-sky-200 bg-white text-right focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourseForLesson(course.id);
                      setActiveTab('materials');
                    }}
                    className="btn-blue-glass px-3.5 py-2 rounded-xl text-xs font-bold text-sky-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <GoogleIcon name="cloud_upload" size={16} />
                    <span>Upload Materials</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: UPLOAD LESSONS, VIDEOS & QUIZZES */}
      {activeTab === 'materials' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border-sky-200">
            <div>
              <span className="text-[10px] font-bold text-sky-300 bg-blue-950 px-3 py-1 rounded-full uppercase tracking-wider">
                Curriculum Uploader
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-display mt-2">
                Add Lesson, Video or Quiz
              </h3>
              <p className="text-xs text-slate-500">
                Upload new studio material for the selected course track.
              </p>
            </div>

            <form onSubmit={handleUploadLesson} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Course *</label>
                <select
                  value={selectedCourseForLesson}
                  onChange={(e) => setSelectedCourseForLesson(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                >
                  {coursesList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lesson Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masterclass: Fine-Tuning Open Source LLMs on GPU"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Content Type</label>
                  <select
                    value={newLesson.type}
                    onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs font-medium focus:outline-none focus:border-sky-500"
                  >
                    <option value="video">Interactive Video</option>
                    <option value="reading">Reading / Cheatsheet</option>
                    <option value="assignment">Project Assignment</option>
                    <option value="quiz">Assessment Quiz</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration / Time</label>
                  <input
                    type="text"
                    value={newLesson.duration}
                    onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {newLesson.type === 'video' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Video Stream URL (MP4 / HLS / Cloud)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newLesson.videoUrl}
                    onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Downloadable PDF / Resource URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newLesson.materialUrl}
                  onChange={(e) => setNewLesson({ ...newLesson, materialUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lesson Summary &amp; Key Takeaways</label>
                <textarea
                  rows={3}
                  value={newLesson.summary}
                  onChange={(e) => setNewLesson({ ...newLesson, summary: e.target.value })}
                  placeholder="Brief description of skills acquired in this module..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 bg-white text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl btn-blue-primary font-bold text-xs uppercase tracking-wider text-white shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <GoogleIcon name="cloud_upload" size={16} />
                <span>Upload Lesson &amp; Publish</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border-sky-200">
            <h4 className="font-bold text-slate-900 text-base font-display">
              Curriculum Upload Guidelines
            </h4>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="p-3.5 bg-blue-950/60/70 rounded-xl border border-sky-100 flex items-start gap-2.5">
                <GoogleIcon name="videocam" size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Video Format:</strong>
                  Upload 1080p MP4 or WebM encoded at 60fps with clear audio commentary.
                </div>
              </div>

              <div className="p-3.5 bg-blue-950/60/70 rounded-xl border border-sky-100 flex items-start gap-2.5">
                <GoogleIcon name="quiz" size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Assessment Rubrics:</strong>
                  Every core module must feature a 4-option multiple-choice check and real coding or design assignment.
                </div>
              </div>

              <div className="p-3.5 bg-blue-950/60/70 rounded-xl border border-sky-100 flex items-start gap-2.5">
                <GoogleIcon name="description" size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Templates &amp; Workbooks:</strong>
                  Attach downloadable Figma files, SQL schemas, or ad spreadsheets to maximize hands-on engagement.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ENROLLED STUDENTS */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg font-display">
              Student Directory &amp; Progress Auditing
            </h3>
            <span className="text-xs text-sky-300 font-semibold">18,490 Active Learners</span>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border-sky-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-blue-950/60/70 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-sky-100">
                  <tr>
                    <th className="p-3.5">Student</th>
                    <th className="p-3.5">Course Track</th>
                    <th className="p-3.5">Progress</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D3E5FD] text-slate-700">
                  {[
                    { name: 'Priya Sharma', roll: 'BELVO-2026-8942', course: 'Artificial Intelligence, Machine Learning', progress: '85%', status: 'Active' },
                    { name: 'Rahul Joshi', roll: 'BELVO-2026-4412', course: 'Web, App, and Software Development', progress: '92%', status: 'Active' },
                    { name: 'Sneha Rao', roll: 'BELVO-2026-1189', course: 'Graphic Design, Branding, and UI/UX', progress: '100%', status: 'Graduated' },
                    { name: 'Amit Verma', roll: 'BELVO-2026-7731', course: 'Digital Marketing & Social Media', progress: '74%', status: 'Active' },
                  ].map((s, idx) => (
                    <tr key={idx} className="hover:bg-blue-950/60/40">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{s.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{s.roll}</div>
                      </td>
                      <td className="p-3.5 font-medium">{s.course}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-sky-300">{s.progress}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-sky-200 border border-sky-200">
                          {s.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => onToast('info', 'Certificate Ready', `BELVO-CERT-2026 verified for ${s.name}.`)}
                          className="text-sky-300 hover:text-[#1E428E] font-semibold underline"
                        >
                          View Credential
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: INQUIRIES & LEADS */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg font-display">
              Incoming Callback Inquiries &amp; Referral Payouts
            </h3>
            <span className="text-xs text-sky-300 font-semibold">15-Minute Response SLA</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leads.map((lead) => (
              <div key={lead.id} className="glass-card rounded-2xl p-5 border-sky-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{lead.name}</h4>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-950 text-sky-300">
                    {lead.status || 'New'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{lead.courseInterest}</p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                  <span>{lead.phone}</span>
                  <span>•</span>
                  <span>{lead.email}</span>
                </div>
                <div className="pt-2 flex justify-end">
                  <a
                    href={`tel:${lead.phone}`}
                    className="btn-blue-glass px-3 py-1.5 rounded-lg text-xs font-bold text-sky-300 flex items-center gap-1"
                  >
                    <GoogleIcon name="call" size={14} />
                    <span>Call Back Now</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};