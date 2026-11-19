import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  BookOpen,
  CloudUpload,
  Users,
  PhoneCall,
  Plus,
  Download,
  Megaphone,
  Building2,
  Receipt,
  ShieldCheck,
  CheckCircle2,
  X,
  ArrowRight,
  Gift,
} from 'lucide-react';
import { ITV_COURSES, ITvedantCourse } from '../data/itvedantData';
import { AppView, BELVO_CATEGORIES, BelvoCategory, CallbackLead, ReferralSubmission } from '../types';
import {
  AdminAuditEvent,
  CampusBatchOperation,
  exportRowsToCsv,
  PortalStore,
  ScholarshipRequest,
  SharedAnnouncement,
} from '../lib/portalStore';
import { FIXED_DEMO_ACCOUNTS, useAuth } from '../context/AuthContext';
import { PortalKpi, PortalNavItem, PortalWorkspaceShell } from './PortalWorkspaceShell';

interface CounselorAdminViewProps {
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
  onLogout: () => void;
  onNavigate?: (view: AppView) => void;
}

type AdminTab =
  | 'analytics'
  | 'batches'
  | 'courses'
  | 'materials'
  | 'students'
  | 'leads'
  | 'revenue'
  | 'access';

export const CounselorAdminView: React.FC<CounselorAdminViewProps> = ({
  onToast,
  onLogout,
  onNavigate,
}) => {
  const { user, signOutUser } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

  // Courses state
  const [coursesList, setCoursesList] = useState<ITvedantCourse[]>(ITV_COURSES);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [selectedCourseForLesson, setSelectedCourseForLesson] = useState<string>(ITV_COURSES[0].id);

  // New Course Form state
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: BELVO_CATEGORIES[0] as BelvoCategory,
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
    videoUrl: '/assets/aistudio/gemini_generated_video_6b621472_6fc879d0.mp4',
    materialUrl: 'https://belvo.edu/materials/starter-guide.pdf',
    summary: '',
  });

  // Cross-portal Admin data
  const [leads, setLeads] = useState<CallbackLead[]>([]);
  const [leadFilter, setLeadFilter] = useState<string>('all');
  const [referrals, setReferrals] = useState<ReferralSubmission[]>([]);
  const [batches, setBatches] = useState<CampusBatchOperation[]>(() => PortalStore.getBatches());
  const [scholarships, setScholarships] = useState<ScholarshipRequest[]>(() => PortalStore.getScholarships());
  const [auditLog, setAuditLog] = useState<AdminAuditEvent[]>(() => PortalStore.getAuditLog());
  const [attendance] = useState(() => PortalStore.getAttendance());

  // New Campus Batch Form
  const [batchCode, setBatchCode] = useState('AI-2026-B5');
  const [batchCampus, setBatchCampus] = useState('Pune FC Road Campus');
  const [batchTrack, setBatchTrack] = useState('Artificial Intelligence, Machine Learning, and Automation');
  const [batchMentor, setBatchMentor] = useState('Prof. Kavita Nair');
  const [batchSeats, setBatchSeats] = useState(30);
  const [batchStart, setBatchStart] = useState('07 Dec 2026');

  // Broadcast & Settings state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [paymentGatewayActive, setPaymentGatewayActive] = useState(true);

  const appendAudit = (action: string, target: string) => {
    const entry: AdminAuditEvent = {
      id: `aud_${Date.now()}`,
      actor: `${user?.displayName || 'Siddharth Menon'} (Admin)`,
      action,
      target,
      timestamp: 'Just now',
    };
    const next = [entry, ...auditLog].slice(0, 12);
    PortalStore.saveAuditLog(next);
    setAuditLog(next);
  };

  useEffect(() => {
    setScholarships(PortalStore.getScholarships());
    setBatches(PortalStore.getBatches());
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
  }, [activeTab]);

  const handleUpdateLeadStatus = (id: string, status: CallbackLead['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    setLeads(updated);
    try {
      localStorage.setItem('itv_leads_v1', JSON.stringify(updated));
    } catch {}
    const lead = leads.find((l) => l.id === id);
    appendAudit(`Updated CRM Lead to ${status.toUpperCase()}`, lead?.name || id);
    onToast('success', 'CRM Status Updated', `Lead status set to "${status.toUpperCase()}".`);
  };

  const handleDispatchVoucher = (refId: string) => {
    const code = `AMZ-5000-HRID-${Math.floor(1000 + Math.random() * 9000)}`;
    const updated = referrals.map((r) =>
      r.id === refId ? { ...r, rewardStatus: 'Voucher Dispatched (₹5,000)', voucherCode: code } : r
    );
    setReferrals(updated);
    try {
      localStorage.setItem('itv_referrals_v1', JSON.stringify(updated));
    } catch {}
    appendAudit('Dispatched ₹5,000 Amazon Voucher', code);
    onToast('success', 'Voucher Dispatched', `Amazon gift code ${code} issued.`);
  };

  const handleScholarshipDecision = (id: string, status: 'Approved' | 'Declined') => {
    const updated = scholarships.map((s) => (s.id === id ? { ...s, status } : s));
    PortalStore.saveScholarships(updated);
    setScholarships(updated);
    const target = scholarships.find((s) => s.id === id);
    appendAudit(`${status} ${target?.type || 'Grant'}`, target?.studentName || id);
    onToast('success', `Scholarship ${status}`, `${target?.studentName} notified in Student LMS.`);
  };

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchCode.trim()) return;
    const created: CampusBatchOperation = {
      id: `bat_${Date.now()}`,
      batchCode: batchCode.trim(),
      campus: batchCampus,
      track: batchTrack,
      leadMentor: batchMentor,
      enrolledSeats: 4,
      maxSeats: Number(batchSeats) || 30,
      startDate: batchStart,
      mode: 'Hybrid',
      status: 'Enrolling',
    };
    const next = [created, ...batches];
    PortalStore.saveBatches(next);
    setBatches(next);
    appendAudit('Launched Campus Batch', `${created.batchCode} · ${created.campus}`);
    onToast('success', 'Batch Opened', `${created.batchCode} is now enrolling at ${created.campus}.`);
  };

  const handleCycleBatchStatus = (id: string) => {
    const order: CampusBatchOperation['status'][] = ['Enrolling', 'Running', 'Placement Phase'];
    const updated = batches.map((b) => {
      if (b.id !== id) return b;
      const nextStatus = order[(order.indexOf(b.status) + 1) % order.length];
      return { ...b, status: nextStatus };
    });
    PortalStore.saveBatches(updated);
    setBatches(updated);
    onToast('info', 'Batch Phase Updated', 'Campus operations status refreshed.');
  };

  const handleExportLeads = () => {
    exportRowsToCsv(
      'hridayam-counselor-leads.csv',
      ['Name', 'Phone', 'Email', 'Program Interest', 'Campus', 'Status'],
      leads.map((l) => [l.name || '', l.phone || '', l.email || '', l.courseInterest || '', l.cityOrCenter || '', l.status || 'new'])
    );
    onToast('success', 'Leads CSV Exported', 'Counselor admissions sheet downloaded.');
  };

  const handleExportRevenueCsv = () => {
    exportRowsToCsv(
      'hridayam-revenue-ledger.csv',
      ['Program', 'Category', 'Fee INR', 'Learners', 'Gross Tuition INR'],
      coursesList.map((c) => [c.title, c.category, c.fee || 0, c.reviewCount || 10, (c.fee || 0) * (c.reviewCount || 10)])
    );
    onToast('success', 'Financial Ledger Exported', 'GST & tuition revenue CSV downloaded.');
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastBody.trim()) return;
    const ann: SharedAnnouncement = {
      id: `ann_${Date.now()}`,
      title: broadcastTitle.trim(),
      message: broadcastBody.trim(),
      author: 'Institute Admin · Academic Operations',
      audience: 'All Students',
      createdAt: 'Just now',
    };
    const next = [ann, ...PortalStore.getAnnouncements()];
    PortalStore.saveAnnouncements(next);
    setBroadcastTitle('');
    setBroadcastBody('');
    appendAudit('Published Platform Broadcast', ann.title);
    onToast('success', 'Platform Notice Published', 'Visible immediately at the top of the Student LMS.');
  };

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
    appendAudit('Published Career Program', created.title);
    onToast('success', 'Course Published', `${created.title} is now live on the platform catalogue.`);
  };

  const handleUploadLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLesson.title) return;
    const courseTitle = coursesList.find((c) => c.id === selectedCourseForLesson)?.title || 'course';
    appendAudit(`Uploaded ${newLesson.type.toUpperCase()} Module`, `${newLesson.title} (${courseTitle})`);
    onToast('success', 'Learning Material Uploaded', `Added "${newLesson.title}" to ${courseTitle}.`);
    setNewLesson({
      title: '',
      type: 'video',
      duration: '30 mins',
      videoUrl: '',
      materialUrl: '',
      summary: '',
    });
  };

  const handlePriceUpdate = (courseId: string, newPrice: number) => {
    setCoursesList(coursesList.map((c) => (c.id === courseId ? { ...c, fee: newPrice } : c)));
    const target = coursesList.find((c) => c.id === courseId);
    appendAudit('Updated INR Fee', `${target?.shortTitle || courseId} → ₹${newPrice.toLocaleString('en-IN')}`);
    onToast('info', 'Pricing Updated', `Course fee updated to ₹${newPrice.toLocaleString('en-IN')}.`);
  };

  const totalRevenue = coursesList.reduce((sum, c) => sum + (c.fee || 0) * (c.reviewCount || 10), 0);
  const filteredLeads = leadFilter === 'all' ? leads : leads.filter((l) => l.status === leadFilter);
  const pendingScholarships = scholarships.filter((s) => s.status === 'Pending Review').length;

  const navItems: PortalNavItem[] = [
    { id: 'analytics', label: 'Executive Overview', icon: BarChart3, group: 'Executive Ops' },
    { id: 'batches', label: 'Campus & Batches', icon: Building2, badge: batches.length, group: 'Executive Ops' },
    { id: 'courses', label: 'Programs & Pricing', icon: BookOpen, badge: coursesList.length, group: 'Academics' },
    { id: 'materials', label: 'Studio Lesson Upload', icon: CloudUpload, group: 'Academics' },
    { id: 'students', label: 'Students & Grants', icon: Users, badge: pendingScholarships || undefined, group: 'Admissions & Finance' },
    { id: 'leads', label: 'CRM & Referrals', icon: PhoneCall, badge: leads.length, group: 'Admissions & Finance' },
    { id: 'revenue', label: 'Revenue & GST Ledger', icon: Receipt, group: 'Admissions & Finance' },
    { id: 'access', label: 'Role Access & Portals', icon: ShieldCheck, group: 'Governance' },
  ];

  const kpis: PortalKpi[] = [
    { label: 'Total Tuition Ledger', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, hint: 'UPI & 0% EMI rails active', pastelClass: 'pastel-sky-card' },
    { label: 'Live Belvo Tracks', value: `${coursesList.length} Programs`, hint: `${batches.length} active campus batches`, pastelClass: 'pastel-lavender-card' },
    { label: 'Admissions CRM Leads', value: leads.length, hint: `${referrals.length} referral vouchers tracked`, pastelClass: 'pastel-mint-card' },
    { label: 'Pending Grant Reviews', value: pendingScholarships, hint: `${scholarships.length} total requests`, pastelClass: 'pastel-rose-card' },
  ];

  return (
    <PortalWorkspaceShell
      portalName="Institute Admin Console"
      portalSubtitle="Executive oversight across curriculum pricing, Indian campus batches, admissions CRM, scholarships, and all role portals."
      userName={user?.displayName || 'Siddharth Menon'}
      userEmail={user?.email || 'admin@hridayam.in'}
      userBadgeCode={user?.badgeCode || 'HRD-ADM-2026-001'}
      userCampus={user?.campus || 'Thane West Head Office'}
      roleAccent="rose"
      navItems={navItems}
      activeId={activeTab}
      onSelectNav={(id) => setActiveTab(id as AdminTab)}
      kpis={kpis}
      headerActions={
        <>
          <button
            type="button"
            onClick={() => setIsCreatingCourse(true)}
            className="px-4 py-2.5 rounded-xl bg-white/95 text-[#0B1B3D] hover:bg-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Program</span>
          </button>
          <button
            type="button"
            onClick={handleExportLeads}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CRM CSV</span>
          </button>
        </>
      }
      quickPortalLinks={
        onNavigate
          ? [
              { label: 'Student LMS', view: 'student' },
              { label: 'Mentor Hub', view: 'mentor-portal' },
              { label: 'Recruiter', view: 'recruiter-portal' },
              { label: 'Admin', view: 'instructor', active: true },
            ]
          : undefined
      }
      onQuickSwitchPortal={onNavigate}
      onLogout={() => {
        signOutUser();
        onLogout();
      }}
    >
      {/* CREATE COURSE MODAL */}
      {isCreatingCourse && (
        <div className="fixed inset-0 z-50 bg-[#071433]/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D3E5FD]">
              <h3 className="font-extrabold text-lg text-[#0B1B3D]">Publish New Career Program</h3>
              <button
                type="button"
                onClick={() => setIsCreatingCourse(false)}
                className="p-2 rounded-xl hover:bg-white text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-3.5 text-xs">
              <input
                type="text"
                required
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                placeholder="Program Title (e.g., Master in Generative AI Engineering)"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input font-medium"
              />
              <select
                value={newCourse.category}
                onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value as BelvoCategory })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input font-bold"
              >
                {BELVO_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  placeholder="Duration"
                  className="px-3.5 py-2.5 rounded-xl glass-input font-medium"
                />
                <input
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
                  placeholder="Tuition Fee (INR)"
                  className="px-3.5 py-2.5 rounded-xl glass-input font-mono-tabular font-bold"
                />
              </div>
              <input
                type="text"
                value={newCourse.tools}
                onChange={(e) => setNewCourse({ ...newCourse, tools: e.target.value })}
                placeholder="Tools covered (comma separated)"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input font-medium"
              />
              <textarea
                rows={3}
                value={newCourse.summary}
                onChange={(e) => setNewCourse({ ...newCourse, summary: e.target.value })}
                placeholder="Curriculum summary..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input font-medium"
              />
              <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary font-extrabold cursor-pointer">
                Publish to Live Catalogue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. ANALYTICS & BROADCASTS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <form onSubmit={handleBroadcast} className="xl:col-span-6 glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#2B4EA2]" />
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Publish Institute-Wide Announcement</h2>
            </div>
            <p className="text-xs text-slate-600">
              Pushes an official notice banner immediately into every logged-in Student LMS dashboard.
            </p>
            <input
              type="text"
              required
              value={broadcastTitle}
              onChange={(e) => setBroadcastTitle(e.target.value)}
              placeholder="Headline (e.g., Infosys & Deloitte Mega Campus Drive)"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <textarea
              rows={4}
              required
              value={broadcastBody}
              onChange={(e) => setBroadcastBody(e.target.value)}
              placeholder="Enter official circular, scholarship window, or exam schedule..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Broadcast Notice to All Learners
            </button>
          </form>

          <div className="xl:col-span-6 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Recent Executive Actions</h2>
            <div className="space-y-2.5">
              {auditLog.map((ev) => (
                <div key={ev.id} className="metallic-chrome-surface rounded-2xl p-4 text-xs space-y-1">
                  <div className="flex justify-between gap-2 font-extrabold text-[#0B1B3D]">
                    <span>{ev.action}</span>
                    <span className="font-mono-tabular text-[11px] text-[#334873]">{ev.timestamp}</span>
                  </div>
                  <div className="text-slate-600">{ev.target} · {ev.actor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. CAMPUS & BATCH OPERATIONS */}
      {activeTab === 'batches' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <form onSubmit={handleAddBatch} className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-3.5">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Launch New Indian Campus Batch</h2>
            <input
              type="text"
              required
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
              placeholder="Batch Code (e.g., AI-2026-B5)"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono-tabular font-bold"
            />
            <select
              value={batchCampus}
              onChange={(e) => setBatchCampus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold"
            >
              <option>Pune FC Road Campus</option>
              <option>Bengaluru Koramangala Hub</option>
              <option>Thane West Head Office</option>
              <option>Hyderabad HITEC City</option>
              <option>Mumbai Andheri West</option>
            </select>
            <input
              type="text"
              value={batchTrack}
              onChange={(e) => setBatchTrack(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={batchMentor}
                onChange={(e) => setBatchMentor(e.target.value)}
                placeholder="Lead Mentor"
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <input
                type="number"
                value={batchSeats}
                onChange={(e) => setBatchSeats(Number(e.target.value))}
                placeholder="Max Seats"
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono-tabular font-bold"
              />
            </div>
            <input
              type="text"
              value={batchStart}
              onChange={(e) => setBatchStart(e.target.value)}
              placeholder="Start Date"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Create &amp; Open Batch
            </button>
          </form>

          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Active Campus Cohorts ({batches.length})</h2>
            {batches.map((b) => {
              const pct = Math.round((b.enrolledSeats / Math.max(b.maxSeats, 1)) * 100);
              return (
                <div key={b.id} className="metallic-chrome-surface rounded-2xl p-5 space-y-2.5 text-xs">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="font-mono-tabular font-extrabold text-[#2B4EA2]">{b.batchCode} · {b.mode}</div>
                      <h3 className="text-sm font-extrabold text-[#0B1B3D]">{b.campus}</h3>
                      <div className="text-slate-600">{b.track} · Mentor: {b.leadMentor}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCycleBatchStatus(b.id)}
                      className="px-3 py-1.5 rounded-xl btn-blue-glass text-[11px] font-extrabold cursor-pointer"
                    >
                      Phase: {b.status}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#334873]">
                    <span>Starts {b.startDate}</span>
                    <span>Seats Filled: {b.enrolledSeats}/{b.maxSeats} ({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. COURSES & INR PRICING */}
      {activeTab === 'courses' && (
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Belvo Career Programs &amp; Live INR Pricing</h2>
              <p className="text-xs text-slate-600">Adjust tuition fees and review EMI structure across all {coursesList.length} tracks.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreatingCourse(true)}
              className="px-4 py-2 rounded-xl btn-blue-primary text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Program</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coursesList.map((course) => (
              <div key={course.id} className="metallic-chrome-surface rounded-2xl p-5 flex flex-col justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-[#2B4EA2]">{course.categoryLabel} · {course.duration}</div>
                  <h3 className="text-sm font-extrabold text-[#0B1B3D] mt-0.5">{course.title}</h3>
                  <div className="text-slate-600 mt-1">
                    Highest CTC: {course.highestPackage} · Next Batch: {course.nextBatch}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#D3E2FA]">
                  <span className="font-mono-tabular font-extrabold text-sm text-[#0B1B3D]">
                    ₹{(course.fee || 0).toLocaleString('en-IN')}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => handlePriceUpdate(course.id, Math.max(25000, (course.fee || 48000) - 2000))}
                      className="px-2.5 py-1.5 rounded-lg btn-blue-glass text-[11px] font-bold cursor-pointer"
                    >
                      -₹2k
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePriceUpdate(course.id, (course.fee || 48000) + 2000)}
                      className="px-2.5 py-1.5 rounded-lg btn-blue-glass text-[11px] font-bold cursor-pointer"
                    >
                      +₹2k
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. STUDIO LESSON PUBLISHER */}
      {activeTab === 'materials' && (
        <form onSubmit={handleUploadLesson} className="glass-panel rounded-3xl p-6 max-w-3xl space-y-4">
          <h2 className="text-lg font-extrabold text-[#0B1B3D]">Upload Studio Video / Reading / Assessment Module</h2>
          <select
            value={selectedCourseForLesson}
            onChange={(e) => setSelectedCourseForLesson(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold"
          >
            {coursesList.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={newLesson.title}
              onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
              placeholder="Module Title"
              className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <select
              value={newLesson.type}
              onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value as typeof newLesson.type })}
              className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold"
            >
              <option value="video">Studio Video Lesson</option>
              <option value="reading">Architecture Reading Guide</option>
              <option value="assignment">Capstone Lab Brief</option>
              <option value="quiz">Timed Skill Quiz</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={newLesson.duration}
              onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
              placeholder="Duration (e.g., 45 mins)"
              className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <input
              type="text"
              value={newLesson.materialUrl}
              onChange={(e) => setNewLesson({ ...newLesson, materialUrl: e.target.value })}
              placeholder="Workbook / Slide Deck URL"
              className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
          </div>
          <textarea
            rows={3}
            value={newLesson.summary}
            onChange={(e) => setNewLesson({ ...newLesson, summary: e.target.value })}
            placeholder="Key takeaways and lab deliverables..."
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
          />
          <button type="submit" className="px-6 py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
            Publish Module to Student LMS
          </button>
        </form>
      )}

      {/* 5. ENROLLED STUDENTS & SCHOLARSHIP APPROVALS */}
      {activeTab === 'students' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-6 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Scholarship &amp; EMI Relief Queue ({scholarships.length})</h2>
            <div className="space-y-3">
              {scholarships.map((s) => (
                <div key={s.id} className="metallic-chrome-surface rounded-2xl p-5 space-y-2.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-extrabold text-sm text-[#0B1B3D]">{s.studentName}</div>
                      <div className="text-[#2B4EA2] font-bold">{s.type} · ₹{s.amountINR.toLocaleString('en-IN')}</div>
                    </div>
                    <span className="font-mono-tabular font-extrabold text-[#132C63]">{s.status}</span>
                  </div>
                  <p className="text-slate-700">{s.reason}</p>
                  {s.status === 'Pending Review' && (
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleScholarshipDecision(s.id, 'Approved')}
                        className="px-3.5 py-1.5 rounded-xl btn-blue-primary text-xs font-bold cursor-pointer"
                      >
                        Approve Grant
                      </button>
                      <button
                        type="button"
                        onClick={() => handleScholarshipDecision(s.id, 'Declined')}
                        className="px-3.5 py-1.5 rounded-xl btn-blue-glass text-xs font-bold cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-6 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Active Student Roster ({attendance.length})</h2>
            <div className="space-y-2.5">
              {attendance.map((st) => (
                <div key={st.id} className="pastel-sky-card rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-extrabold text-[#0B1B3D]">{st.studentName}</div>
                    <div className="text-slate-700">{st.batch} · {st.rollNo}</div>
                  </div>
                  <div className="text-right font-mono-tabular">
                    <div className="font-extrabold text-[#0B1B3D]">{st.progress}% LMS</div>
                    <div className="text-[11px] text-[#334873]">{st.attendancePercent}% Attendance</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. ADMISSIONS CRM & REFERRAL VOUCHERS */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Admissions Counseling Leads ({filteredLeads.length})</h2>
              <div className="flex flex-wrap gap-1.5">
                {['all', 'new', 'contacted', 'counseled', 'enrolled'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setLeadFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize cursor-pointer ${
                      leadFilter === st ? 'btn-blue-primary text-white' : 'bg-white border border-[#D3E2FA] text-[#132C63]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="metallic-chrome-surface rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-extrabold text-sm text-[#0B1B3D]">{lead.name} · {lead.phone}</div>
                    <div className="text-slate-600">{lead.courseInterest} · {lead.cityOrCenter}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(['new', 'contacted', 'counseled', 'enrolled'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleUpdateLeadStatus(lead.id, st)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize cursor-pointer ${
                          lead.status === st ? 'btn-blue-primary text-white' : 'bg-white border border-[#D3E2FA] text-slate-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#2B4EA2]" />
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Referral Payout &amp; Amazon Voucher Queue ({referrals.length})</h2>
            </div>
            <div className="space-y-3">
              {referrals.map((ref) => (
                <div key={ref.id} className="pastel-lavender-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-extrabold text-sm text-[#0B1B3D]">
                      {ref.referrerName} referred {ref.friendName}
                    </div>
                    <div className="text-slate-700">
                      Code: <span className="font-mono-tabular font-bold">{ref.referralCode}</span> · {ref.interestedCourse}
                    </div>
                    <div className="font-mono-tabular text-[11px] text-[#334873]">
                      {ref.rewardStatus} ({ref.voucherCode})
                    </div>
                  </div>
                  {ref.voucherCode === 'PENDING_ADMISSION' ? (
                    <button
                      type="button"
                      onClick={() => handleDispatchVoucher(ref.id)}
                      className="px-4 py-2 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer"
                    >
                      Dispatch ₹5,000 Voucher
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-extrabold text-emerald-900">
                      <CheckCircle2 className="w-4 h-4" />
                      Issued
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. REVENUE & GST LEDGER */}
      {activeTab === 'revenue' && (
        <div className="glass-panel rounded-3xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Tuition Collections &amp; GST Financial Ledger</h2>
              <p className="text-xs text-slate-600">Breakdown by Belvo career program with 18% GST reconciliation.</p>
            </div>
            <button
              type="button"
              onClick={handleExportRevenueCsv}
              className="px-4 py-2 rounded-xl btn-blue-primary text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Ledger CSV</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D3E2FA] text-[#334873]">
                  <th className="py-3 pr-4 font-extrabold">Program</th>
                  <th className="py-3 px-4 font-extrabold text-right">Fee (INR)</th>
                  <th className="py-3 px-4 font-extrabold text-right">Learners</th>
                  <th className="py-3 pl-4 font-extrabold text-right">Gross Collection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4EEFC]">
                {coursesList.slice(0, 8).map((c) => {
                  const learners = c.reviewCount || 10;
                  const gross = (c.fee || 0) * learners;
                  return (
                    <tr key={c.id}>
                      <td className="py-3 pr-4 font-bold text-[#0B1B3D]">{c.title}</td>
                      <td className="py-3 px-4 text-right font-mono-tabular">₹{(c.fee || 0).toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4 text-right font-mono-tabular">{learners}</td>
                      <td className="py-3 pl-4 text-right font-mono-tabular font-extrabold text-[#1E428E]">
                        ₹{(gross / 100000).toFixed(2)}L
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. ROLE ACCESS & PLATFORM CONTROLS */}
      {activeTab === 'access' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Role-Protected Workspaces Directory</h2>
            <p className="text-xs text-slate-600">
              As Institute Admin, you hold elevated single-sign-on oversight and can open any workspace directly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FIXED_DEMO_ACCOUNTS.map((acc) => (
                <div key={acc.id} className="metallic-chrome-surface rounded-2xl p-5 flex flex-col justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="font-extrabold text-sm text-[#0B1B3D]">{acc.roleLabel}</div>
                    <div className="font-mono-tabular text-[#2B4EA2] font-bold">
                      {acc.email} · {acc.password}
                    </div>
                    <div className="text-slate-600">{acc.displayName} · {acc.campus}</div>
                  </div>
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate(acc.defaultView)}
                      className="self-start px-4 py-2 rounded-xl btn-blue-primary text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Open {acc.roleLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-3">
            <h3 className="text-base font-extrabold text-[#0B1B3D]">Operational Rail Toggles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="pastel-sky-card rounded-2xl p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-[#0B1B3D]">Automated Admissions Emails</div>
                  <div className="text-slate-600">Send syllabus PDFs &amp; fee receipts automatically</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmailNotificationsEnabled((v) => !v);
                    onToast('info', 'Email Rail Updated', `Automated emails ${!emailNotificationsEnabled ? 'enabled' : 'paused'}.`);
                  }}
                  className="px-3.5 py-2 rounded-xl btn-blue-primary text-xs font-bold cursor-pointer"
                >
                  {emailNotificationsEnabled ? 'Enabled' : 'Paused'}
                </button>
              </div>

              <div className="pastel-mint-card rounded-2xl p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-[#0B1B3D]">UPI &amp; 0% EMI Gateway</div>
                  <div className="text-slate-600">Checkout enrollment settlement rail</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentGatewayActive((v) => !v);
                    onToast('info', 'Payment Rail Updated', `Gateway ${!paymentGatewayActive ? 'activated' : 'set to maintenance'}.`);
                  }}
                  className="px-3.5 py-2 rounded-xl btn-blue-primary text-xs font-bold cursor-pointer"
                >
                  {paymentGatewayActive ? 'Active' : 'Maintenance'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PortalWorkspaceShell>
  );
};