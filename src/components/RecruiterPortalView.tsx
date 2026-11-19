import React, { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Briefcase,
  Code2,
  Building2,
  BarChart3,
  Search,
  Download,
  FileText,
  Plus,
  Video,
  Award,
  X,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PROVIDED_IMAGES } from '../data/mediaAssets';
import {
  CandidateStage,
  exportRowsToCsv,
  PortalStore,
  RecruiterAssessment,
  SharedApplication,
  SharedHiringDrive,
} from '../lib/portalStore';
import { PortalKpi, PortalNavItem, PortalWorkspaceShell } from './PortalWorkspaceShell';
import { AppView } from '../types';

interface RecruiterPortalViewProps {
  onLogout: () => void;
  onNavigate?: (view: AppView) => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

type RecruiterTab =
  | 'overview'
  | 'talent'
  | 'assessments'
  | 'pipeline'
  | 'drives'
  | 'campus-booking'
  | 'analytics';

interface TalentProfile {
  id: string;
  name: string;
  email: string;
  city: string;
  track: string;
  role: string;
  stack: string;
  readiness: number;
  expectedCtc: string;
  notice: string;
  capstone: string;
  photo: string;
}

const VETTED_TALENT: TalentProfile[] = [
  {
    id: 'cand_student_demo',
    name: 'Aarav Deshmukh',
    email: 'student@hridayam.in',
    city: 'Pune, Maharashtra',
    track: 'AI & Full Stack',
    role: 'Applied AI & Full Stack Engineer',
    stack: 'Python · React · FastAPI · SQL · AWS',
    readiness: 95,
    expectedCtc: '₹9.0 LPA',
    notice: 'Immediate Joiner',
    capstone: 'UPI Fraud Anomaly Detector using XGBoost & FastAPI (sub-40ms latency)',
    photo: PROVIDED_IMAGES.indianCampusSteps,
  },
  {
    id: 'cand_1',
    name: 'Shruti Deshpande',
    email: 'shruti.d@hridayam.in',
    city: 'Pune, Maharashtra',
    track: 'Data Science & AI',
    role: 'Data Scientist & AI Engineer',
    stack: 'Python · SQL · LangChain · Power BI',
    readiness: 96,
    expectedCtc: '₹8.5 LPA',
    notice: 'Immediate Joiner',
    capstone: 'Hindi-English Vernacular Support Copilot with RAG Evaluation',
    photo: PROVIDED_IMAGES.indianStudentLaptop,
  },
  {
    id: 'cand_2',
    name: 'Karthik Subramanian',
    email: 'karthik.s@hridayam.in',
    city: 'Bengaluru, Karnataka',
    track: 'Full Stack Development',
    role: 'Full Stack Developer (MERN + Java)',
    stack: 'React · TypeScript · Spring Boot · AWS',
    readiness: 94,
    expectedCtc: '₹9.0 LPA',
    notice: 'Immediate Joiner',
    capstone: 'High-Throughput Order & Inventory Microservices SaaS',
    photo: PROVIDED_IMAGES.indianClassroomTeam,
  },
  {
    id: 'cand_3',
    name: 'Meera Nair',
    email: 'meera.n@hridayam.in',
    city: 'Mumbai / Thane',
    track: 'Cloud & DevOps',
    role: 'Cloud & DevOps Engineer',
    stack: 'AWS · Docker · Kubernetes · Terraform',
    readiness: 93,
    expectedCtc: '₹8.0 LPA',
    notice: '15 Days',
    capstone: 'Zero-Downtime AWS EKS Blue-Green CI/CD Infrastructure',
    photo: PROVIDED_IMAGES.indianLibraryGroup,
  },
  {
    id: 'cand_4',
    name: 'Vivek Verma',
    email: 'vivek.v@hridayam.in',
    city: 'Hyderabad, Telangana',
    track: 'Data Analytics & BI',
    role: 'BI & Data Analytics Specialist',
    stack: 'SQL · Tableau · Power BI · Python',
    readiness: 91,
    expectedCtc: '₹6.8 LPA',
    notice: 'Immediate Joiner',
    capstone: 'Pan-India E-Commerce Supply Chain & Margin Analytics Suite',
    photo: PROVIDED_IMAGES.indianClassroomTeam,
  },
  {
    id: 'cand_5',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@hridayam.in',
    city: 'Bengaluru, Karnataka',
    track: 'Full Stack Development',
    role: 'Frontend & React Systems Engineer',
    stack: 'React 19 · TypeScript · Tailwind · Node.js',
    readiness: 94,
    expectedCtc: '₹8.8 LPA',
    notice: 'Immediate Joiner',
    capstone: 'Multi-Campus LMS & Attendance SaaS with RBAC',
    photo: PROVIDED_IMAGES.indianLibraryGroup,
  },
];

const STAGES: CandidateStage[] = [
  'Applied',
  'Shortlisted',
  'Technical Round',
  'HR Round',
  'Offer Issued',
];

const CAMPUS_VENUES = [
  { id: 'v1', campus: 'Pune FC Road Campus', capacity: '45 Candidates · 3 Interview Cabins', status: 'Available' },
  { id: 'v2', campus: 'Bengaluru Koramangala Hub', capacity: '60 Candidates · 4 Technical Panels', status: 'Available' },
  { id: 'v3', campus: 'Thane West Head Office', capacity: '80 Candidates · Main Auditorium', status: 'Available' },
  { id: 'v4', campus: 'Hyderabad HITEC City', capacity: '40 Candidates · Hybrid Lab', status: 'Available' },
];

export const RecruiterPortalView: React.FC<RecruiterPortalViewProps> = ({
  onLogout,
  onNavigate,
  onToast,
}) => {
  const { user, isAdmin, signOutUser } = useAuth();
  const [activeTab, setActiveTab] = useState<RecruiterTab>('overview');

  // Shared Cross-Portal Data
  const [drives, setDrives] = useState<SharedHiringDrive[]>(() => PortalStore.getDrives());
  const [applications, setApplications] = useState<SharedApplication[]>(() => PortalStore.getApplications());
  const [assessments, setAssessments] = useState<RecruiterAssessment[]>(() => PortalStore.getAssessments());

  // Talent Filters
  const [query, setQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('All');
  const [immediateOnly, setImmediateOnly] = useState(false);
  const [minReadiness, setMinReadiness] = useState(85);
  const [dossierCandidate, setDossierCandidate] = useState<TalentProfile | null>(null);

  // Post New Hiring Drive Form
  const [companyName, setCompanyName] = useState('TechVista India (Partner)');
  const [roleTitle, setRoleTitle] = useState('Full Stack Product Engineer (React + Node)');
  const [packageLPA, setPackageLPA] = useState('₹11.5 LPA');
  const [cityMode, setCityMode] = useState('Bengaluru / Hybrid');
  const [positions, setPositions] = useState('8 Openings');
  const [skillsText, setSkillsText] = useState('React, TypeScript, Node.js, PostgreSQL');
  const [deadline, setDeadline] = useState('Next Friday, 6:00 PM IST');

  // Interview Scheduler & Offer Form
  const [selectedAppId, setSelectedAppId] = useState<string>(() => PortalStore.getApplications()[0]?.id || '');
  const [intDate, setIntDate] = useState('Monday, 24 Nov 2026');
  const [intTime, setIntTime] = useState('2:30 PM IST');
  const [intPanel, setIntPanel] = useState('Vikramaditya Rao (VP Engineering)');
  const [intLink, setIntLink] = useState('https://meet.hridayam.in/recruiter-panel-r2');
  const [offerCtc, setOfferCtc] = useState('₹10.5 LPA (Fixed + Joining Bonus)');
  const [offerDate, setOfferDate] = useState('04 January 2027');

  // Assessment Builder Form
  const [testTitle, setTestTitle] = useState('');
  const [testRole, setTestRole] = useState('Full Stack Engineer');
  const [testDuration, setTestDuration] = useState(60);
  const [testPass, setTestPass] = useState(75);
  const [testSkills, setTestSkills] = useState('React, TypeScript, SQL, System Design');

  // Campus Drive Booking Form
  const [campusBookings, setCampusBookings] = useState([
    { id: 'cb1', campus: 'Bengaluru Koramangala Hub', date: '28 Nov 2026', format: 'On-Campus Drive (3 Panels)', status: 'Confirmed' },
  ]);
  const [bookCampus, setBookCampus] = useState(CAMPUS_VENUES[0].campus);
  const [bookDate, setBookDate] = useState('05 Dec 2026');
  const [bookFormat, setBookFormat] = useState('Hybrid Campus + Virtual Breakout');

  useEffect(() => {
    const freshApps = PortalStore.getApplications();
    setApplications(freshApps);
    setDrives(PortalStore.getDrives());
    setAssessments(PortalStore.getAssessments());
    if (!selectedAppId && freshApps[0]) {
      setSelectedAppId(freshApps[0].id);
    }
  }, [activeTab]);

  const filteredTalent = useMemo(() => {
    return VETTED_TALENT.filter((c) => {
      const q = query.toLowerCase();
      const matchesQ =
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.stack.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q);
      const matchesTrack = trackFilter === 'All' || c.track === trackFilter;
      const matchesNotice = !immediateOnly || c.notice === 'Immediate Joiner';
      const matchesScore = c.readiness >= minReadiness;
      return matchesQ && matchesTrack && matchesNotice && matchesScore;
    });
  }, [query, trackFilter, immediateOnly, minReadiness]);

  const handleShortlistFromPool = (talent: TalentProfile) => {
    const existing = applications.find((a) => a.candidateEmail === talent.email);
    if (existing) {
      onToast('info', 'Already in ATS Pipeline', `${talent.name} is currently at stage "${existing.stage}".`);
      setActiveTab('pipeline');
      return;
    }
    const primaryDrive = drives[0];
    const newApp: SharedApplication = {
      id: `app_${Date.now()}`,
      driveId: primaryDrive?.id || 'drive_1',
      company: primaryDrive?.company || companyName,
      role: talent.role,
      packageLPA: talent.expectedCtc,
      candidateId: talent.id,
      candidateName: talent.name,
      candidateEmail: talent.email,
      city: talent.city,
      track: talent.track,
      stack: talent.stack,
      readiness: talent.readiness,
      expectedCtc: talent.expectedCtc,
      notice: talent.notice,
      photo: talent.photo,
      stage: 'Shortlisted',
      appliedOn: 'Shortlisted just now',
      recruiterNotes: 'Directly shortlisted from Hridayam Pre-Vetted Talent Pool.',
    };
    const next = [newApp, ...applications];
    PortalStore.saveApplications(next);
    setApplications(next);
    setSelectedAppId(newApp.id);
    onToast('success', 'Candidate Shortlisted', `${talent.name} added to your ATS Pipeline.`);
  };

  const handleMoveStage = (appId: string, nextStage: CandidateStage) => {
    const updated = applications.map((a) => (a.id === appId ? { ...a, stage: nextStage } : a));
    PortalStore.saveApplications(updated);
    setApplications(updated);
    const target = applications.find((a) => a.id === appId);
    onToast('success', 'Pipeline Updated', `${target?.candidateName} moved to "${nextStage}".`);
  };

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) return;
    const updated = applications.map((a) =>
      a.id === selectedAppId
        ? {
            ...a,
            stage: a.stage === 'Applied' || a.stage === 'Shortlisted' ? ('Technical Round' as CandidateStage) : a.stage,
            interviewDate: intDate,
            interviewTime: intTime,
            interviewPanel: intPanel,
            interviewLink: intLink,
          }
        : a
    );
    PortalStore.saveApplications(updated);
    setApplications(updated);
    const target = applications.find((a) => a.id === selectedAppId);
    onToast('success', 'Interview Invite Dispatched', `${target?.candidateName} notified in Student LMS.`);
  };

  const handleIssueOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) return;
    const updated = applications.map((a) =>
      a.id === selectedAppId
        ? {
            ...a,
            stage: 'Offer Issued' as CandidateStage,
            offerPackage: offerCtc,
            offerJoiningDate: offerDate,
          }
        : a
    );
    PortalStore.saveApplications(updated);
    setApplications(updated);
    const target = applications.find((a) => a.id === selectedAppId);
    onToast('success', 'Provisional Offer Dispatched', `Offer (${offerCtc}) sent to ${target?.candidateName}.`);
  };

  const handlePublishDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !roleTitle.trim()) return;
    const drive: SharedHiringDrive = {
      id: `drive_${Date.now()}`,
      company: companyName.trim(),
      role: roleTitle.trim(),
      packageLPA: packageLPA.trim(),
      mode: cityMode,
      city: cityMode.split('/')[0].trim(),
      skills: skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      positions,
      deadline,
      eligibility: '75%+ LMS completion & verified capstone project',
      postedBy: user?.displayName || 'Hiring Partner Desk',
    };
    const next = [drive, ...drives];
    PortalStore.saveDrives(next);
    setDrives(next);
    onToast('success', 'Hiring Drive Published Live', `${drive.company} (${drive.role}) is now open in Student LMS.`);
  };

  const handleCreateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) return;
    const created: RecruiterAssessment = {
      id: `test_${Date.now()}`,
      title: testTitle.trim(),
      role: testRole,
      durationMins: Number(testDuration) || 60,
      passingScore: Number(testPass) || 75,
      skills: testSkills.split(',').map((s) => s.trim()).filter(Boolean),
      invitedCandidates: applications.slice(0, 3).map((a) => a.candidateName),
      status: 'Active',
      createdAt: 'Just now',
    };
    const next = [created, ...assessments];
    PortalStore.saveAssessments(next);
    setAssessments(next);
    setTestTitle('');
    onToast('success', 'Screening Test Published', `Sent assessment invites to ${created.invitedCandidates.length} shortlisted candidates.`);
  };

  const handleBookCampusSlot = (e: React.FormEvent) => {
    e.preventDefault();
    setCampusBookings((prev) => [
      { id: `cb_${Date.now()}`, campus: bookCampus, date: bookDate, format: bookFormat, status: 'Confirmed' },
      ...prev,
    ]);
    onToast('success', 'Campus Drive Slot Booked', `${bookCampus} reserved for ${bookDate}.`);
  };

  const handleExportDossierCsv = () => {
    exportRowsToCsv(
      'hridayam-vetted-candidates.csv',
      ['Candidate', 'Email', 'City', 'Role', 'Company', 'Package', 'Stage', 'Readiness %'],
      applications.map((a) => [a.candidateName, a.candidateEmail, a.city, a.role, a.company, a.packageLPA, a.stage, a.readiness])
    );
    onToast('success', 'ATS Pipeline Exported', 'Candidate shortlist CSV downloaded.');
  };

  const offersIssued = applications.filter((a) => a.stage === 'Offer Issued').length;
  const activeSelectedApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  const navItems: PortalNavItem[] = [
    { id: 'overview', label: 'Hiring Command Center', icon: LayoutDashboard, group: 'Talent Acquisition' },
    { id: 'talent', label: 'Verified Talent Pool', icon: Users, badge: VETTED_TALENT.length, group: 'Talent Acquisition' },
    { id: 'assessments', label: 'Technical Screening Lab', icon: Code2, badge: assessments.length, group: 'Talent Acquisition' },
    { id: 'pipeline', label: 'ATS Pipeline & Offers', icon: GitBranch, badge: applications.length, group: 'Pipeline & Drives' },
    { id: 'drives', label: 'Post & Manage Drives', icon: Briefcase, badge: drives.length, group: 'Pipeline & Drives' },
    { id: 'campus-booking', label: 'Campus Drive Scheduler', icon: Building2, badge: campusBookings.length, group: 'Campus & Reporting' },
    { id: 'analytics', label: 'Placement Analytics', icon: BarChart3, group: 'Campus & Reporting' },
  ];

  const kpis: PortalKpi[] = [
    { label: 'Pre-Vetted Talent Pool', value: VETTED_TALENT.length, hint: '91%–96% readiness audited', pastelClass: 'pastel-mint-card' },
    { label: 'Active ATS Pipeline', value: applications.length, hint: 'Zero recruitment fees', pastelClass: 'pastel-sky-card' },
    { label: 'Live Hiring Drives', value: drives.length, hint: 'Synced to Student LMS', pastelClass: 'pastel-lavender-card' },
    { label: 'Provisional Offers', value: offersIssued, hint: 'Immediate & 15-day joiners', pastelClass: 'pastel-peach-card' },
  ];

  return (
    <PortalWorkspaceShell
      portalName="Recruiter & Hiring Desk"
      portalSubtitle={`${user?.title || 'Campus Talent Partner'} · Zero-Fee Verified Indian Engineering & AI Hiring`}
      userName={user?.displayName || 'Rohan Kulkarni'}
      userEmail={user?.email || 'recruiter@hridayam.in'}
      userBadgeCode={user?.badgeCode || 'HRD-REC-2026-774'}
      userCampus={user?.campus || 'Pan-India Hiring Desk'}
      roleAccent="mint"
      navItems={navItems}
      activeId={activeTab}
      onSelectNav={(id) => setActiveTab(id as RecruiterTab)}
      kpis={kpis}
      headerActions={
        <>
          <button
            type="button"
            onClick={() => setActiveTab('drives')}
            className="px-4 py-2.5 rounded-xl bg-white/95 text-[#0B1B3D] hover:bg-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Hiring Drive</span>
          </button>
          <button
            type="button"
            onClick={handleExportDossierCsv}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Pipeline CSV</span>
          </button>
        </>
      }
      quickPortalLinks={
        isAdmin && onNavigate
          ? [
              { label: 'Student LMS', view: 'student' },
              { label: 'Mentor Hub', view: 'mentor-portal' },
              { label: 'Recruiter', view: 'recruiter-portal', active: true },
              { label: 'Admin', view: 'instructor' },
            ]
          : undefined
      }
      onQuickSwitchPortal={onNavigate}
      onLogout={() => {
        signOutUser();
        onLogout();
      }}
    >
      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Active Stage Funnel</h2>
              <button
                type="button"
                onClick={() => setActiveTab('pipeline')}
                className="text-xs font-bold text-[#2B4EA2] hover:underline cursor-pointer"
              >
                Manage ATS Pipeline
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {STAGES.map((stage, i) => {
                const count = applications.filter((a) => a.stage === stage).length;
                const tones = [
                  'pastel-sky-card',
                  'pastel-lavender-card',
                  'pastel-peach-card',
                  'pastel-rose-card',
                  'pastel-mint-card',
                ];
                return (
                  <div key={stage} className={`${tones[i]} rounded-2xl p-3.5 text-center`}>
                    <div className="text-xl font-mono-tabular font-extrabold text-[#0B1B3D]">{count}</div>
                    <div className="text-[11px] font-bold text-[#334873] mt-0.5">{stage}</div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2.5 pt-2">
              {applications.slice(0, 3).map((app) => (
                <div key={app.id} className="metallic-chrome-surface rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-extrabold text-sm text-[#0B1B3D]">{app.candidateName}</div>
                    <div className="text-slate-600">{app.role} · {app.company} · {app.city}</div>
                  </div>
                  <span className="font-mono-tabular font-extrabold text-[#1E428E]">
                    {app.stage} · {app.readiness}% Ready
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Top Immediate-Joiner Recommendations</h2>
            {VETTED_TALENT.slice(0, 3).map((c) => (
              <div key={c.id} className="pastel-sky-card rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <div className="font-extrabold text-sm text-[#0B1B3D] truncate">{c.name}</div>
                  <div className="text-slate-700 truncate">{c.role}</div>
                  <div className="font-mono-tabular text-[11px] text-[#334873]">{c.readiness}% Ready · {c.expectedCtc}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleShortlistFromPool(c)}
                  className="px-3.5 py-2 rounded-xl btn-blue-primary text-xs font-bold shrink-0 cursor-pointer"
                >
                  Shortlist
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. VERIFIED TALENT DIRECTORY */}
      {activeTab === 'talent' && (
        <div className="space-y-5">
          <div className="glass-panel rounded-2xl p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skill, role, candidate, or city..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>
            <div className="md:col-span-3">
              <select
                value={trackFilter}
                onChange={(e) => setTrackFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-bold"
              >
                <option value="All">All Engineering Tracks</option>
                <option value="AI & Full Stack">AI &amp; Full Stack</option>
                <option value="Data Science & AI">Data Science &amp; AI</option>
                <option value="Full Stack Development">Full Stack Development</option>
                <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                <option value="Data Analytics & BI">Data Analytics &amp; BI</option>
              </select>
            </div>
            <div className="md:col-span-2 flex items-center gap-2 text-xs font-bold text-[#0B1B3D]">
              <input
                id="immediate-toggle"
                type="checkbox"
                checked={immediateOnly}
                onChange={(e) => setImmediateOnly(e.target.checked)}
                className="accent-[#2B4EA2]"
              />
              <label htmlFor="immediate-toggle" className="cursor-pointer">Immediate Only</label>
            </div>
            <div className="md:col-span-2 text-xs font-mono-tabular font-bold text-[#1E428E]">
              Min {minReadiness}% Ready
              <input
                type="range"
                min={80}
                max={96}
                value={minReadiness}
                onChange={(e) => setMinReadiness(Number(e.target.value))}
                className="w-full accent-[#2B4EA2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredTalent.map((c) => (
              <div key={c.id} className="metallic-chrome-surface rounded-3xl p-5 flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.photo}
                      alt={c.name}
                      className="w-12 h-12 rounded-2xl object-cover object-top border border-white shadow-sm shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-extrabold text-[#0B1B3D] truncate">{c.name}</h3>
                      <div className="text-xs text-[#2B4EA2] font-bold truncate">{c.role}</div>
                      <div className="text-[11px] text-slate-600 truncate">{c.city} · {c.notice}</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong>Capstone:</strong> {c.capstone}
                  </div>
                  <div className="text-[11px] text-slate-600">{c.stack}</div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-[#D3E2FA]">
                  <div className="flex justify-between text-xs font-mono-tabular font-extrabold text-[#0B1B3D]">
                    <span>Readiness: {c.readiness}%</span>
                    <span>CTC: {c.expectedCtc}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDossierCandidate(c)}
                      className="py-2 rounded-xl btn-blue-glass text-xs font-bold inline-flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Dossier</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShortlistFromPool(c)}
                      className="py-2 rounded-xl btn-blue-primary text-xs font-bold cursor-pointer"
                    >
                      Shortlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. TECHNICAL ASSESSMENT BUILDER */}
      {activeTab === 'assessments' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <form onSubmit={handleCreateAssessment} className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Create Employer Screening Assessment</h2>
            <input
              type="text"
              required
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              placeholder="Assessment Name (e.g., Backend FastAPI + SQL Sprint)"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <input
              type="text"
              value={testRole}
              onChange={(e) => setTestRole(e.target.value)}
              placeholder="Target Role"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#334873] mb-1">Duration (mins)</label>
                <input
                  type="number"
                  value={testDuration}
                  onChange={(e) => setTestDuration(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono-tabular font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#334873] mb-1">Pass Cutoff (%)</label>
                <input
                  type="number"
                  value={testPass}
                  onChange={(e) => setTestPass(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono-tabular font-bold"
                />
              </div>
            </div>
            <input
              type="text"
              value={testSkills}
              onChange={(e) => setTestSkills(e.target.value)}
              placeholder="Skills tested (comma separated)"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold inline-flex items-center justify-center gap-1.5 cursor-pointer">
              <Send className="w-3.5 h-3.5" />
              <span>Publish &amp; Invite Shortlisted Candidates</span>
            </button>
          </form>

          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Active Screening Assessments ({assessments.length})</h2>
            {assessments.map((t) => (
              <div key={t.id} className="metallic-chrome-surface rounded-2xl p-5 space-y-2 text-xs">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1B3D]">{t.title}</h3>
                    <div className="text-slate-600">{t.role} · {t.durationMins} mins · Pass ≥ {t.passingScore}%</div>
                  </div>
                  <span className="font-mono-tabular font-extrabold text-emerald-800">{t.status}</span>
                </div>
                <div className="text-slate-700">Skills: {t.skills.join(' · ')}</div>
                <div className="text-[11px] text-[#334873]">
                  Invited ({t.invitedCandidates.length}): {t.invitedCandidates.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ATS INTERVIEW PIPELINE & OFFERS */}
      {activeTab === 'pipeline' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Live Candidate ATS Pipeline ({applications.length})</h2>
            <div className="space-y-3">
              {applications.map((app) => {
                const selected = app.id === activeSelectedApp?.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`rounded-2xl p-5 border space-y-3 cursor-pointer transition-all ${
                      selected ? 'pastel-lavender-card' : 'metallic-chrome-surface'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-extrabold text-[#0B1B3D]">{app.candidateName}</h3>
                        <div className="text-xs text-slate-600">
                          {app.company} · {app.role} · {app.city}
                        </div>
                      </div>
                      <span className="text-xs font-mono-tabular font-extrabold text-[#1E428E]">
                        {app.stage} · {app.packageLPA}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {STAGES.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveStage(app.id, st);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                            app.stage === st
                              ? 'btn-blue-primary text-white'
                              : 'bg-white/90 border border-[#D3E2FA] text-slate-700 hover:border-[#2B4EA2]'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    {app.interviewDate && (
                      <div className="text-xs text-[#132C63] bg-white/80 rounded-xl p-2.5 font-mono-tabular">
                        Interview: {app.interviewDate} · {app.interviewTime} · {app.interviewPanel}
                      </div>
                    )}
                    {app.offerPackage && (
                      <div className="pastel-mint-card rounded-xl p-2.5 text-xs font-bold text-[#0B1B3D]">
                        Offer Issued: {app.offerPackage} (Joining {app.offerJoiningDate})
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Interview & Offer Console for Selected Candidate */}
          <div className="xl:col-span-5 space-y-5">
            <form onSubmit={handleScheduleInterview} className="glass-panel rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#0B1B3D]">
                <Video className="w-4 h-4 text-[#2B4EA2]" />
                <h3 className="text-base font-extrabold">
                  Schedule Interview {activeSelectedApp ? `· ${activeSelectedApp.candidateName}` : ''}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={intDate}
                  onChange={(e) => setIntDate(e.target.value)}
                  className="px-3 py-2 rounded-xl glass-input text-xs font-medium"
                />
                <input
                  type="text"
                  value={intTime}
                  onChange={(e) => setIntTime(e.target.value)}
                  className="px-3 py-2 rounded-xl glass-input text-xs font-medium"
                />
              </div>
              <input
                type="text"
                value={intPanel}
                onChange={(e) => setIntPanel(e.target.value)}
                placeholder="Panel Lead"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs font-medium"
              />
              <input
                type="url"
                value={intLink}
                onChange={(e) => setIntLink(e.target.value)}
                placeholder="Meeting Room URL"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs font-medium"
              />
              <button type="submit" className="w-full py-2.5 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
                Send Interview Invite to Student LMS
              </button>
            </form>

            <form onSubmit={handleIssueOffer} className="glass-panel rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#0B1B3D]">
                <Award className="w-4 h-4 text-[#2B4EA2]" />
                <h3 className="text-base font-extrabold">Issue Provisional Offer Letter</h3>
              </div>
              <input
                type="text"
                value={offerCtc}
                onChange={(e) => setOfferCtc(e.target.value)}
                placeholder="Offered CTC"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs font-medium"
              />
              <input
                type="text"
                value={offerDate}
                onChange={(e) => setOfferDate(e.target.value)}
                placeholder="Expected Joining Date"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs font-medium"
              />
              <button type="submit" className="w-full py-2.5 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
                Dispatch Official Offer Letter
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. POST & MANAGE DRIVES */}
      {activeTab === 'drives' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <form onSubmit={handlePublishDrive} className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-3.5">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Publish Zero-Cost Hiring Drive</h2>
            <p className="text-xs text-slate-600">Drives appear live inside Student LMS → Live Placement Drives.</p>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <input
              type="text"
              required
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="Role Title"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={packageLPA}
                onChange={(e) => setPackageLPA(e.target.value)}
                placeholder="CTC Package"
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <input
                type="text"
                value={positions}
                onChange={(e) => setPositions(e.target.value)}
                placeholder="Openings"
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>
            <input
              type="text"
              value={cityMode}
              onChange={(e) => setCityMode(e.target.value)}
              placeholder="Location & Mode"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="Required Skills (comma separated)"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Application Deadline"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Publish Live Hiring Drive
            </button>
          </form>

          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Active Campus &amp; Virtual Drives ({drives.length})</h2>
            {drives.map((d) => (
              <div key={d.id} className="metallic-chrome-surface rounded-2xl p-5 space-y-1.5 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1B3D]">{d.company} · {d.role}</h3>
                    <div className="text-slate-600">{d.mode} · {d.positions} · Deadline: {d.deadline}</div>
                  </div>
                  <span className="font-mono-tabular font-extrabold text-[#1E428E]">{d.packageLPA}</span>
                </div>
                <div className="text-slate-700">Skills: {d.skills.join(' · ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. CAMPUS DRIVE SCHEDULER */}
      {activeTab === 'campus-booking' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <form onSubmit={handleBookCampusSlot} className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Reserve Hridayam Campus Drive Venue</h2>
            <select
              value={bookCampus}
              onChange={(e) => setBookCampus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold"
            >
              {CAMPUS_VENUES.map((v) => (
                <option key={v.id} value={v.campus}>
                  {v.campus} ({v.capacity})
                </option>
              ))}
            </select>
            <input
              type="text"
              value={bookDate}
              onChange={(e) => setBookDate(e.target.value)}
              placeholder="Preferred Drive Date"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <input
              type="text"
              value={bookFormat}
              onChange={(e) => setBookFormat(e.target.value)}
              placeholder="Drive Format"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Confirm Zero-Cost Campus Booking
            </button>
          </form>

          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Confirmed Campus Drives ({campusBookings.length})</h2>
            <div className="space-y-2.5">
              {campusBookings.map((b) => (
                <div key={b.id} className="pastel-mint-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="font-extrabold text-sm text-[#0B1B3D]">{b.campus}</div>
                    <div className="text-slate-700">{b.format} · {b.date}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 font-extrabold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4" />
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {CAMPUS_VENUES.map((v) => (
                <div key={v.id} className="bg-white/80 rounded-2xl p-3.5 border border-[#D6E4FA] text-xs">
                  <div className="font-extrabold text-[#0B1B3D]">{v.campus}</div>
                  <div className="text-slate-600">{v.capacity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. PLACEMENT ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="glass-panel rounded-3xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Employer Hiring Funnel &amp; Talent Telemetry</h2>
              <p className="text-xs text-slate-600">Real-time metrics calculated from your active drives and ATS stages.</p>
            </div>
            <button
              type="button"
              onClick={handleExportDossierCsv}
              className="px-4 py-2 rounded-xl btn-blue-primary text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Full ATS Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="pastel-sky-card rounded-2xl p-5 space-y-1">
              <div className="text-xs font-bold text-[#334873]">Avg Candidate Readiness</div>
              <div className="text-3xl font-mono-tabular font-extrabold text-[#0B1B3D]">94.2%</div>
              <div className="text-xs text-slate-700">Verified across 4-pillar mentor rubrics</div>
            </div>
            <div className="pastel-lavender-card rounded-2xl p-5 space-y-1">
              <div className="text-xs font-bold text-[#334873]">Immediate Joiner Ratio</div>
              <div className="text-3xl font-mono-tabular font-extrabold text-[#0B1B3D]">83%</div>
              <div className="text-xs text-slate-700">5 of 6 spotlight engineers ready now</div>
            </div>
            <div className="pastel-mint-card rounded-2xl p-5 space-y-1">
              <div className="text-xs font-bold text-[#334873]">Recruiting Agency Fee</div>
              <div className="text-3xl font-mono-tabular font-extrabold text-[#0B1B3D]">₹0</div>
              <div className="text-xs text-slate-700">100% direct partner hiring access</div>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Dossier Modal */}
      {dossierCandidate && (
        <div className="fixed inset-0 z-50 bg-[#071433]/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={dossierCandidate.photo}
                  alt={dossierCandidate.name}
                  className="w-14 h-14 rounded-2xl object-cover object-top border border-white"
                />
                <div>
                  <h3 className="text-lg font-extrabold text-[#0B1B3D]">{dossierCandidate.name}</h3>
                  <div className="text-xs font-bold text-[#2B4EA2]">{dossierCandidate.role}</div>
                  <div className="text-xs text-slate-600">{dossierCandidate.city} · {dossierCandidate.notice}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDossierCandidate(null)}
                className="p-2 rounded-xl hover:bg-white text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="pastel-sky-card rounded-2xl p-4 text-xs space-y-1.5">
              <div className="font-extrabold text-[#0B1B3D]">Verified Capstone Audit</div>
              <p className="text-slate-700">{dossierCandidate.capstone}</p>
              <div className="font-mono-tabular font-bold text-[#1E428E]">
                Readiness Score: {dossierCandidate.readiness}% · Expected CTC: {dossierCandidate.expectedCtc}
              </div>
            </div>
            <div className="text-xs text-slate-700">
              <strong>Core Stack:</strong> {dossierCandidate.stack}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDossierCandidate(null)}
                className="px-4 py-2 rounded-xl btn-blue-glass text-xs font-bold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleShortlistFromPool(dossierCandidate);
                  setDossierCandidate(null);
                }}
                className="px-4 py-2 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer"
              >
                Add to ATS Shortlist
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalWorkspaceShell>
  );
};
