import React, { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FolderGit2,
  Code2,
  Briefcase,
  FileText,
  MessageSquare,
  Receipt,
  Award,
  CheckCircle2,
  Download,
  ExternalLink,
  Clock,
  Save,
  Send,
  Search,
  Megaphone,
  PlayCircle,
  Check,
  Printer,
  GraduationCap,
} from 'lucide-react';
import { ITV_COURSES } from '../data/itvedantData';
import { useAuth } from '../context/AuthContext';
import {
  CodingAssignment,
  MentorSlotBooking,
  PortalStore,
  ScholarshipRequest,
  SharedAnnouncement,
  SharedApplication,
  SharedCapstone,
  SharedDoubtTicket,
  SharedHiringDrive,
  StudentResumeProfile,
} from '../lib/portalStore';
import { PROVIDED_IMAGES } from '../data/mediaAssets';
import { PortalKpi, PortalNavItem, PortalWorkspaceShell } from './PortalWorkspaceShell';
import { AppView } from '../types';

interface StudentPortalViewProps {
  onNavigateHome: () => void;
  onExploreCourses: () => void;
  onNavigate?: (view: AppView) => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

type StudentTab =
  | 'overview'
  | 'classroom'
  | 'schedule'
  | 'capstones'
  | 'coding-lab'
  | 'placements'
  | 'resume'
  | 'doubts'
  | 'fees'
  | 'certificate';

const QUIZ_BANK = [
  {
    q: 'Before deploying an AI or Full Stack production service for Indian fintech users, what is the critical first engineering checkpoint?',
    options: [
      'Automated regression tests, OWASP security audit, and p95 latency benchmarking',
      'Deploying straight to production without staging to inspect live errors',
      'Disabling authentication middleware to accelerate initial onboarding',
      'Removing database indexes to speed up initial seed scripts',
    ],
    answer: 0,
    explanation: 'Production releases require staging validation, automated regression checks, security verification, and latency guardrails.',
  },
  {
    q: 'When working with an imbalanced fraud-detection dataset (0.2% positive cases), which evaluation metric and validation strategy is best?',
    options: [
      'Raw accuracy with random train/test split',
      'Precision-Recall AUC (PR-AUC) with StratifiedKFold and resampling strictly inside each fold',
      'Mean Squared Error computed on training data only',
      'Sorting by timestamp and discarding minority class records',
    ],
    answer: 1,
    explanation: 'PR-AUC captures minority-class performance accurately, and in-fold resampling prevents synthetic data leakage.',
  },
  {
    q: 'Which SQL / indexing technique most reliably speeds up repeated analytical queries filtered by tenant_id and created_at?',
    options: [
      'Composite B-Tree index on (tenant_id, created_at DESC)',
      'Storing all columns inside a single unindexed JSON text blob',
      'Running SELECT * without WHERE clauses and filtering in the browser',
      'Creating duplicate tables for every individual day of the year',
    ],
    answer: 0,
    explanation: 'A composite B-Tree index aligned with filter equality (tenant_id) followed by range/order (created_at) avoids full table scans.',
  },
  {
    q: 'In an NSDC & Belvo capstone delivery, what makes a candidate portfolio stand out during technical hiring rounds?',
    options: [
      'Clean README with architecture diagram, deployed live demo URL, tests, and measurable metrics',
      'Uploading a zip file without commit history or setup instructions',
      'Copying tutorial boilerplate without custom domain problem solving',
      'Hardcoding API keys directly inside client-side source files',
    ],
    answer: 0,
    explanation: 'Recruiters evaluate real engineering judgment: clear architecture notes, reproducible setup, tests, and deployed outcomes.',
  },
];

const WEEKLY_SCHEDULE = [
  { id: 'w1', day: 'Monday', time: '7:00 PM – 9:00 PM IST', topic: 'Core Architecture & Live Coding Lab', mentor: 'Prof. Kavita Nair', mode: 'Hybrid (Pune + Live Zoom)' },
  { id: 'w2', day: 'Wednesday', time: '7:00 PM – 9:00 PM IST', topic: 'System Design & API Optimization Studio', mentor: 'Siddharth Kulkarni', mode: 'Live Online Classroom' },
  { id: 'w3', day: 'Friday', time: '6:30 PM – 8:30 PM IST', topic: 'SQL, Data Modeling & Case Study Sprint', mentor: 'Prof. Kavita Nair', mode: 'Hybrid (Thane + Live Zoom)' },
  { id: 'w4', day: 'Saturday', time: '10:30 AM – 1:00 PM IST', topic: 'Capstone Code Audit & Mock Technical Panel', mentor: 'Industry Hiring Panel', mode: 'Campus & Virtual Breakout' },
];

const FEE_LEDGER = [
  { id: 'INV-2026-101', label: 'Admission & NSDC Registration Fee', date: '12 Jan 2026', amount: '₹12,000', mode: 'UPI AutoPay', status: 'Paid' },
  { id: 'INV-2026-204', label: 'EMI Installment 1 of 4 (0% Interest)', date: '12 Feb 2026', amount: '₹9,000', mode: 'HDFC Debit Card', status: 'Paid' },
  { id: 'INV-2026-312', label: 'EMI Installment 2 of 4 (0% Interest)', date: '12 Mar 2026', amount: '₹9,000', mode: 'UPI AutoPay', status: 'Paid' },
  { id: 'INV-2026-419', label: 'EMI Installment 3 of 4 (0% Interest)', date: '12 Apr 2026', amount: '₹9,000', mode: 'Upcoming AutoPay', status: 'Scheduled' },
];

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  onNavigateHome,
  onExploreCourses,
  onNavigate,
  onToast,
}) => {
  const { user, isAdmin, signOutUser } = useAuth();
  const [activeTab, setActiveTab] = useState<StudentTab>('overview');
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0, 1]);
  const [rsvpIds, setRsvpIds] = useState<string[]>(['w1', 'w4']);
  const [dailyGoals, setDailyGoals] = useState([
    { id: 'g1', label: 'Complete Module 2 Live Lab exercise', done: true },
    { id: 'g2', label: 'Submit SQL Window Function coding challenge', done: false },
    { id: 'g3', label: 'Run ATS check on Resume before Infosys Round 2', done: false },
  ]);

  // Persistent Personal Study Notes per course+lesson
  const [notesMap, setNotesMap] = useState<Record<string, string>>(() => PortalStore.getStudentNotes());
  const noteKey = `${selectedCourseIndex}_${activeLessonIndex}`;

  // Multi-Question Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Shared Cross-Portal Data
  const [capstones, setCapstones] = useState<SharedCapstone[]>(() => PortalStore.getCapstones());
  const [doubts, setDoubts] = useState<SharedDoubtTicket[]>(() => PortalStore.getDoubts());
  const [slots, setSlots] = useState<MentorSlotBooking[]>(() => PortalStore.getSlots());
  const [drives, setDrives] = useState<SharedHiringDrive[]>(() => PortalStore.getDrives());
  const [applications, setApplications] = useState<SharedApplication[]>(() => PortalStore.getApplications());
  const [announcements, setAnnouncements] = useState<SharedAnnouncement[]>(() => PortalStore.getAnnouncements());
  const [assignments, setAssignments] = useState<CodingAssignment[]>(() => PortalStore.getAssignments());
  const [scholarships, setScholarships] = useState<ScholarshipRequest[]>(() => PortalStore.getScholarships());
  const [resume, setResume] = useState<StudentResumeProfile>(() => PortalStore.getResume());

  // Coding Sandbox state
  const [activeAssignmentId, setActiveAssignmentId] = useState<string>(() => PortalStore.getAssignments()[0]?.id || '');
  const [codeDraft, setCodeDraft] = useState<string>(() => PortalStore.getAssignments()[0]?.starterCode || '');

  // Capstone Form
  const [projectTitle, setProjectTitle] = useState('');
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [projectNotes, setProjectNotes] = useState('');

  // Doubt Ticket Form
  const [doubtSubject, setDoubtSubject] = useState('');
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [doubtPriority, setDoubtPriority] = useState<'Normal' | 'Urgent'>('Normal');

  // 1-on-1 Mentor Booking Form
  const [slotDate, setSlotDate] = useState('Saturday, 29 Nov 2026');
  const [slotTime, setSlotTime] = useState('4:00 PM – 4:30 PM IST');
  const [slotTopic, setSlotTopic] = useState('');
  const [slotMode, setSlotMode] = useState<'Live Online (Zoom)' | 'Campus Cabin'>('Live Online (Zoom)');

  // Placement Drive Search & Receipt
  const [driveSearch, setDriveSearch] = useState('');
  const [receiptInvoiceId, setReceiptInvoiceId] = useState<string | null>(null);

  // Scholarship Request Form
  const [schType, setSchType] = useState<ScholarshipRequest['type']>('Merit Scholarship (25%)');
  const [schReason, setSchReason] = useState('');

  useEffect(() => {
    setCapstones(PortalStore.getCapstones());
    setDoubts(PortalStore.getDoubts());
    setSlots(PortalStore.getSlots());
    setDrives(PortalStore.getDrives());
    setApplications(PortalStore.getApplications());
    setAnnouncements(PortalStore.getAnnouncements());
    const freshAsg = PortalStore.getAssignments();
    setAssignments(freshAsg);
    setScholarships(PortalStore.getScholarships());
    if (!activeAssignmentId && freshAsg[0]) {
      setActiveAssignmentId(freshAsg[0].id);
      setCodeDraft(freshAsg[0].starterCode);
    }
  }, [activeTab]);

  const currentCourse = ITV_COURSES[selectedCourseIndex] || ITV_COURSES[0];

  const studentProfile = {
    name: user?.displayName || 'Aarav Deshmukh',
    email: user?.email || 'student@hridayam.in',
    rollNo: user?.badgeCode || 'HRD-STU-2026-4108',
    enrolledAt: '12 January 2026',
    attendance: '96%',
    mentor: 'Prof. Kavita Nair (Principal Mentor)',
    campus: user?.campus || 'Pune FC Road Campus',
  };

  const lessons = useMemo(
    () => [
      {
        title: `Module 1: ${currentCourse.shortTitle} — Studio Architecture & Setup`,
        duration: '34 mins',
        type: 'video',
        videoUrl: '/assets/aistudio/gemini_generated_video_6b621472_6fc879d0.mp4',
        description:
          'Complete studio walkthrough covering repository layout, Indian fintech/enterprise architecture conventions, and automated linting guardrails.',
        materialName: `${currentCourse.slug}-module-01-starter-kit.pdf`,
      },
      {
        title: `Module 2: Hands-On Live Lab — ${currentCourse.toolsCovered.slice(0, 3).join(', ')}`,
        duration: '48 mins',
        type: 'video',
        videoUrl: '/hridayam-video-bg.mp4',
        description:
          'Step-by-step live engineering sprint building real production components with Mentor code review checkpoints.',
        materialName: `${currentCourse.slug}-live-lab-workbook.pdf`,
      },
      {
        title: 'Module 3: System Performance, Optimization & Interview Patterns',
        duration: '30 mins',
        type: 'reading',
        videoUrl: '',
        description:
          'Deep dive into caching, latency budgets, SQL indexing, and real Indian MNC technical interview patterns.',
        materialName: 'Interview_Patterns_and_System_Benchmarks.pdf',
      },
      {
        title: 'Module 4: Production Capstone Spec & Recruiter Portfolio Rubric',
        duration: '55 mins',
        type: 'assignment',
        videoUrl: '',
        description:
          'Review the 100-point Mentor Audit Rubric (Architecture, Code Quality, Impact, Documentation) and prepare for Placement Desk unlock.',
        materialName: 'NSDC_Belvo_Capstone_Rubric_2026.pdf',
      },
    ],
    [currentCourse]
  );

  const progressPercent = Math.round((completedLessons.length / lessons.length) * 100);
  const myCapstones = capstones.filter(
    (c) => c.studentEmail === studentProfile.email || c.studentName === studentProfile.name
  );
  const myDoubts = doubts.filter(
    (d) => d.studentEmail === studentProfile.email || d.studentName === studentProfile.name
  );
  const myApplications = applications.filter(
    (a) => a.candidateEmail === studentProfile.email || a.candidateName === studentProfile.name
  );
  const myScholarships = scholarships.filter(
    (s) => s.studentEmail === studentProfile.email || s.studentName === studentProfile.name
  );

  const activeAssignment =
    assignments.find((a) => a.id === activeAssignmentId) || assignments[0];

  const quizScoreCount = QUIZ_BANK.reduce(
    (acc, item, idx) => acc + (quizAnswers[idx] === item.answer ? 1 : 0),
    0
  );
  const quizPercent = Math.round((quizScoreCount / QUIZ_BANK.length) * 100);

  // ATS Resume Match Calculator against all live drives
  const atsAnalysis = useMemo(() => {
    const resumeText = `${resume.headline} ${resume.summary} ${resume.skills} ${resume.projects}`.toLowerCase();
    const targetKeywords = Array.from(
      new Set(drives.flatMap((d) => d.skills.map((s) => s.trim())))
    );
    const matched = targetKeywords.filter((kw) => resumeText.includes(kw.toLowerCase()));
    const missing = targetKeywords.filter((kw) => !resumeText.includes(kw.toLowerCase()));
    const score = targetKeywords.length > 0 ? Math.round((matched.length / targetKeywords.length) * 100) : 85;
    return { score, matched, missing };
  }, [resume, drives]);

  const toggleLessonComplete = (idx: number) => {
    if (completedLessons.includes(idx)) {
      setCompletedLessons(completedLessons.filter((i) => i !== idx));
    } else {
      setCompletedLessons([...completedLessons, idx]);
      onToast('success', 'Lesson Completed', 'Curriculum mastery progress saved.');
    }
  };

  const handleSaveNote = () => {
    PortalStore.saveStudentNotes(notesMap);
    onToast('success', 'Study Notes Saved', `Saved locally for Module ${activeLessonIndex + 1}.`);
  };

  const handleDownloadResource = (filename: string) => {
    const content = [
      'HRIDAYAM BY BELVO — OFFICIAL STUDENT STUDY RESOURCE',
      `Student: ${studentProfile.name} (${studentProfile.rollNo})`,
      `Program: ${currentCourse.title}`,
      `Resource: ${filename}`,
      '',
      'Key Learning Objectives:',
      ...(currentCourse.keyHighlights || []).map((h, i) => `${i + 1}. ${h}`),
      '',
      'Tools Covered: ' + currentCourse.toolsCovered.join(', '),
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace(/\.pdf$/i, '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onToast('success', 'Study Kit Downloaded', `${filename} saved to your device.`);
  };

  const handleSubmitCapstone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !deliverableUrl.trim()) return;
    const item: SharedCapstone = {
      id: `cap_${Date.now()}`,
      studentName: studentProfile.name,
      studentEmail: studentProfile.email,
      city: studentProfile.campus,
      track: currentCourse.category,
      projectTitle: projectTitle.trim(),
      deliverableUrl: deliverableUrl.trim(),
      notes: projectNotes.trim() || 'Submitted via Student LMS Capstone Lab.',
      submittedOn: 'Just now',
      status: 'Pending Audit',
      score: 0,
      rubric: { architecture: 0, codeQuality: 0, impact: 0, documentation: 0 },
      mentorFeedback: '',
    };
    const next = [item, ...capstones];
    PortalStore.saveCapstones(next);
    setCapstones(next);
    setProjectTitle('');
    setDeliverableUrl('');
    setProjectNotes('');
    onToast('success', 'Capstone Submitted to Mentor Hub', `"${item.projectTitle}" is queued for rubric review.`);
  };

  const handleRunCodingSubmission = () => {
    if (!activeAssignment) return;
    const passed = codeDraft.toLowerCase().includes(activeAssignment.expectedKeyword.toLowerCase());
    const earned = passed ? Math.min(100, activeAssignment.points) : 55;
    const updated = assignments.map((a) =>
      a.id === activeAssignment.id
        ? {
            ...a,
            studentSubmitted: true,
            studentScore: earned,
            submissionsCount: a.studentSubmitted ? a.submissionsCount : a.submissionsCount + 1,
          }
        : a
    );
    PortalStore.saveAssignments(updated);
    setAssignments(updated);
    if (passed) {
      onToast(
        'success',
        'All Automated Checks Passed',
        `Scored ${earned}/${activeAssignment.points} pts on "${activeAssignment.title}".`
      );
    } else {
      onToast(
        'info',
        'Partial Test Match',
        `Hint: Include "${activeAssignment.expectedKeyword}" in your implementation to pass all hidden test cases.`
      );
    }
  };

  const handleSubmitDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtSubject.trim() || !doubtQuestion.trim()) return;
    const ticket: SharedDoubtTicket = {
      id: `dbt_${Date.now()}`,
      studentName: studentProfile.name,
      studentEmail: studentProfile.email,
      track: currentCourse.category,
      subject: doubtSubject.trim(),
      question: doubtQuestion.trim(),
      priority: doubtPriority,
      status: 'Open',
      createdAt: 'Just now',
    };
    const next = [ticket, ...doubts];
    PortalStore.saveDoubts(next);
    setDoubts(next);
    setDoubtSubject('');
    setDoubtQuestion('');
    onToast('success', 'Doubt Ticket Raised', 'Synced to Faculty & Mentor Hub.');
  };

  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slotTopic.trim()) return;
    const booking: MentorSlotBooking = {
      id: `slot_${Date.now()}`,
      studentName: studentProfile.name,
      mentorName: 'Prof. Kavita Nair',
      date: slotDate,
      timeSlot: slotTime,
      topic: slotTopic.trim(),
      mode: slotMode,
      status: 'Confirmed',
    };
    const next = [booking, ...slots];
    PortalStore.saveSlots(next);
    setSlots(next);
    setSlotTopic('');
    onToast('success', '1-on-1 Session Confirmed', `${slotDate} · ${slotTime}`);
  };

  const handleApplyDrive = (drive: SharedHiringDrive) => {
    const already = myApplications.some((a) => a.driveId === drive.id);
    if (already) {
      onToast('info', 'Already Applied', `Your application for ${drive.company} is active.`);
      return;
    }
    const app: SharedApplication = {
      id: `app_${Date.now()}`,
      driveId: drive.id,
      company: drive.company,
      role: drive.role,
      packageLPA: drive.packageLPA,
      candidateId: 'cand_student_demo',
      candidateName: studentProfile.name,
      candidateEmail: studentProfile.email,
      city: studentProfile.campus,
      track: currentCourse.category,
      stack: currentCourse.toolsCovered.slice(0, 5).join(' · '),
      readiness: Math.max(88, progressPercent),
      expectedCtc: drive.packageLPA,
      notice: 'Immediate Joiner',
      photo: PROVIDED_IMAGES.indianCampusSteps,
      stage: 'Applied',
      appliedOn: 'Just now',
    };
    const next = [app, ...applications];
    PortalStore.saveApplications(next);
    setApplications(next);
    onToast('success', `Applied to ${drive.company}`, 'Your profile is now live in the Recruiter ATS Pipeline.');
  };

  const handleSaveResume = (e: React.FormEvent) => {
    e.preventDefault();
    PortalStore.saveResume(resume);
    onToast('success', 'Resume Saved', `ATS keyword readiness is now ${atsAnalysis.score}%.`);
  };

  const handleDownloadResumeText = () => {
    const content = [
      resume.fullName.toUpperCase(),
      resume.headline,
      `${resume.location} | ${resume.phone} | ${resume.email}`,
      `GitHub: ${resume.githubUrl} | LinkedIn: ${resume.linkedinUrl}`,
      '',
      'PROFESSIONAL SUMMARY',
      resume.summary,
      '',
      'TECHNICAL SKILLS',
      resume.skills,
      '',
      'KEY PROJECTS',
      resume.projects,
      '',
      'EDUCATION',
      resume.education,
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.fullName.toLowerCase().replace(/\s+/g, '-')}-hridayam-resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onToast('success', 'Resume Exported', 'ATS-friendly resume file downloaded.');
  };

  const handleApplyScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schReason.trim()) return;
    const amountMap: Record<ScholarshipRequest['type'], number> = {
      'Merit Scholarship (25%)': 12000,
      'Women in Tech Grant (20%)': 9600,
      '0% EMI Extension': 6000,
    };
    const req: ScholarshipRequest = {
      id: `sch_${Date.now()}`,
      studentName: studentProfile.name,
      studentEmail: studentProfile.email,
      track: currentCourse.category,
      type: schType,
      amountINR: amountMap[schType],
      reason: schReason.trim(),
      status: 'Pending Review',
      submittedOn: 'Just now',
    };
    const next = [req, ...scholarships];
    PortalStore.saveScholarships(next);
    setScholarships(next);
    setSchReason('');
    onToast('success', 'Scholarship Application Sent', 'Synced to Institute Admin Console for approval.');
  };

  const filteredDrives = drives.filter((d) => {
    const q = driveSearch.toLowerCase();
    return (
      d.company.toLowerCase().includes(q) ||
      d.role.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q) ||
      d.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  const navItems: PortalNavItem[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, group: 'Learning Hub' },
    { id: 'classroom', label: 'Classroom & Videos', icon: BookOpen, badge: `${progressPercent}%`, group: 'Learning Hub' },
    { id: 'schedule', label: 'Live Schedule & RSVP', icon: Calendar, badge: rsvpIds.length, group: 'Learning Hub' },
    { id: 'capstones', label: 'Capstone Lab & Audits', icon: FolderGit2, badge: myCapstones.length, group: 'Labs & Assessments' },
    { id: 'coding-lab', label: 'Coding Sandbox & Quiz', icon: Code2, badge: assignments.length, group: 'Labs & Assessments' },
    { id: 'placements', label: 'Live Placement Drives', icon: Briefcase, badge: drives.length, group: 'Career & Placement' },
    { id: 'resume', label: 'Resume & ATS Checker', icon: FileText, badge: `${atsAnalysis.score}%`, group: 'Career & Placement' },
    { id: 'doubts', label: 'Doubts & 1:1 Mentor', icon: MessageSquare, badge: myDoubts.filter((d) => d.status === 'Open').length || undefined, group: 'Career & Placement' },
    { id: 'fees', label: 'Fees, EMI & Grants', icon: Receipt, group: 'Account & Credentials' },
    { id: 'certificate', label: 'NSDC Certificates', icon: Award, group: 'Account & Credentials' },
  ];

  const kpis: PortalKpi[] = [
    { label: 'Curriculum Mastery', value: `${progressPercent}%`, hint: `${completedLessons.length}/${lessons.length} modules`, pastelClass: 'pastel-sky-card' },
    { label: 'Cohort Attendance', value: studentProfile.attendance, hint: 'Eligible for Tier-1 drives', pastelClass: 'pastel-mint-card' },
    { label: 'Active Applications', value: myApplications.length, hint: `${drives.length} live drives open`, pastelClass: 'pastel-lavender-card' },
    { label: 'ATS Resume Match', value: `${atsAnalysis.score}%`, hint: `${atsAnalysis.matched.length} skills matched`, pastelClass: 'pastel-rose-card' },
  ];

  return (
    <PortalWorkspaceShell
      portalName="Student LMS Portal"
      portalSubtitle={`${currentCourse.title} · Mentor: ${studentProfile.mentor}`}
      userName={studentProfile.name}
      userEmail={studentProfile.email}
      userBadgeCode={studentProfile.rollNo}
      userCampus={studentProfile.campus}
      roleAccent="sky"
      navItems={navItems}
      activeId={activeTab}
      onSelectNav={(id) => setActiveTab(id as StudentTab)}
      kpis={kpis}
      headerActions={
        <>
          <button
            type="button"
            onClick={onExploreCourses}
            className="px-4 py-2.5 rounded-xl bg-white/95 text-[#0B1B3D] hover:bg-white text-xs font-extrabold cursor-pointer whitespace-nowrap"
          >
            Browse Programs
          </button>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('refer-earn')}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold cursor-pointer whitespace-nowrap"
            >
              Refer &amp; Earn (₹5,000)
            </button>
          )}
        </>
      }
      quickPortalLinks={
        isAdmin && onNavigate
          ? [
              { label: 'Student LMS', view: 'student', active: true },
              { label: 'Mentor Hub', view: 'mentor-portal' },
              { label: 'Recruiter', view: 'recruiter-portal' },
              { label: 'Admin', view: 'instructor' },
            ]
          : undefined
      }
      onQuickSwitchPortal={onNavigate}
      onLogout={() => {
        signOutUser();
        onNavigateHome();
      }}
    >
      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {announcements[0] && (
            <div className="metallic-chrome-surface rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#0B1B3D]">
              <div className="flex items-start gap-3">
                <Megaphone className="w-5 h-5 text-[#2B4EA2] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-extrabold">{announcements[0].title}</div>
                  <p className="text-xs text-slate-700 mt-0.5">{announcements[0].message}</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#334873] whitespace-nowrap shrink-0">
                {announcements[0].author} · {announcements[0].createdAt}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Active Study Goals & Quick Resume */}
            <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold text-[#0B1B3D]">Daily Sprint Checklist</h2>
                  <p className="text-xs text-slate-600">Track today&apos;s cohort milestones for placement readiness.</p>
                </div>
                <span className="text-xs font-mono-tabular font-extrabold text-[#2B4EA2]">
                  {dailyGoals.filter((g) => g.done).length}/{dailyGoals.length} Done
                </span>
              </div>

              <div className="space-y-2.5">
                {dailyGoals.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() =>
                      setDailyGoals((prev) =>
                        prev.map((g) => (g.id === goal.id ? { ...g, done: !g.done } : g))
                      )
                    }
                    className={`w-full text-left px-4 py-3 rounded-2xl border flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      goal.done ? 'pastel-mint-card' : 'bg-white/85 border-[#D3E2FA] hover:border-[#3F5FC4]'
                    }`}
                  >
                    <span className={`text-xs font-bold ${goal.done ? 'line-through text-slate-600' : 'text-[#0B1B3D]'}`}>
                      {goal.label}
                    </span>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${goal.done ? 'text-emerald-700' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-[#D6E4FA] flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('classroom')}
                  className="px-4 py-2.5 rounded-xl btn-blue-primary text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Resume Module {activeLessonIndex + 1}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('coding-lab')}
                  className="px-4 py-2.5 rounded-xl btn-blue-glass text-xs font-bold cursor-pointer"
                >
                  Open Coding Sandbox
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('placements')}
                  className="px-4 py-2.5 rounded-xl btn-blue-glass text-xs font-bold cursor-pointer"
                >
                  View {drives.length} Hiring Drives
                </button>
              </div>
            </div>

            {/* Upcoming Interviews & 1:1 Bookings */}
            <div className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Upcoming Calls &amp; Sessions</h2>
              {myApplications.filter((a) => a.interviewDate).map((app) => (
                <div key={app.id} className="pastel-lavender-card rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="font-extrabold text-[#0B1B3D]">
                    {app.company} · {app.stage}
                  </div>
                  <div className="text-slate-700 font-semibold">{app.role}</div>
                  <div className="text-[11px] font-mono-tabular text-[#334873]">
                    {app.interviewDate} · {app.interviewTime}
                  </div>
                  {app.interviewPanel && (
                    <div className="text-[11px] text-slate-600">Panel: {app.interviewPanel}</div>
                  )}
                </div>
              ))}

              {slots.slice(0, 2).map((s) => (
                <div key={s.id} className="pastel-sky-card rounded-2xl p-4 space-y-1 text-xs">
                  <div className="font-extrabold text-[#0B1B3D]">1:1 Mentorship · {s.mentorName}</div>
                  <div className="text-slate-700">{s.topic}</div>
                  <div className="text-[11px] font-mono-tabular text-[#334873]">
                    {s.date} · {s.timeSlot} · {s.mode}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. CLASSROOM & VIDEO MODULES */}
      {activeTab === 'classroom' && (
        <div className="space-y-5">
          <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#334873]">Active Program Track</span>
              <div className="text-sm font-extrabold text-[#0B1B3D]">{currentCourse.title}</div>
            </div>
            <select
              value={selectedCourseIndex}
              onChange={(e) => {
                setSelectedCourseIndex(Number(e.target.value));
                setActiveLessonIndex(0);
              }}
              className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold max-w-md cursor-pointer"
            >
              {ITV_COURSES.map((c, idx) => (
                <option key={c.id} value={idx}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div className="xl:col-span-8 space-y-5">
              <div className="glass-dark rounded-3xl overflow-hidden text-white">
                <div className="aspect-video bg-[#071433] relative flex items-center justify-center">
                  {lessons[activeLessonIndex].type === 'video' ? (
                    <video
                      key={lessons[activeLessonIndex].videoUrl}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                      src={lessons[activeLessonIndex].videoUrl}
                      poster="/hridayam-theme-bg.jpg"
                    />
                  ) : (
                    <div className="p-8 text-center space-y-4 max-w-lg">
                      <FileText className="w-10 h-10 text-[#C7D8FC] mx-auto" />
                      <h3 className="text-xl font-extrabold text-white">
                        {lessons[activeLessonIndex].title}
                      </h3>
                      <p className="text-sm text-[#D6E4FF] leading-relaxed">
                        {lessons[activeLessonIndex].description}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleDownloadResource(lessons[activeLessonIndex].materialName)}
                        className="px-5 py-2.5 rounded-xl bg-white text-[#0B1B3D] text-xs font-extrabold inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Workbook</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#C7D8FC]">
                      Module {activeLessonIndex + 1} · {lessons[activeLessonIndex].duration} · {lessons[activeLessonIndex].type}
                    </div>
                    <h2 className="text-lg font-extrabold text-white">
                      {lessons[activeLessonIndex].title}
                    </h2>
                    <p className="text-xs text-[#DCE8FF] leading-relaxed">
                      {lessons[activeLessonIndex].description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDownloadResource(lessons[activeLessonIndex].materialName)}
                      className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Study Kit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleLessonComplete(activeLessonIndex)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer ${
                        completedLessons.includes(activeLessonIndex)
                          ? 'bg-emerald-200 text-[#0B1B3D]'
                          : 'bg-white text-[#0B1B3D]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{completedLessons.includes(activeLessonIndex) ? 'Completed' : 'Mark Complete'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Persistent Module Notes */}
              <div className="glass-panel rounded-3xl p-6 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0B1B3D]">Personal Module Study Notes</h3>
                    <p className="text-xs text-slate-600">Saved automatically per course module in your workspace.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveNote}
                    className="px-4 py-2 rounded-xl btn-blue-primary text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Notes</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={notesMap[noteKey] || ''}
                  onChange={(e) => setNotesMap({ ...notesMap, [noteKey]: e.target.value })}
                  placeholder="Capture key interview formulas, architecture takeaways, or timestamps..."
                  className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-medium"
                />
              </div>
            </div>

            {/* Module Playlist */}
            <div className="xl:col-span-4 glass-panel rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#0B1B3D]">Course Modules</h3>
                <span className="text-xs font-mono-tabular font-bold text-[#2B4EA2]">{progressPercent}%</span>
              </div>
              <div className="space-y-2">
                {lessons.map((lesson, idx) => {
                  const isActive = idx === activeLessonIndex;
                  const isDone = completedLessons.includes(idx);
                  return (
                    <button
                      key={lesson.title}
                      type="button"
                      onClick={() => setActiveLessonIndex(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isActive
                          ? 'btn-blue-primary text-white border-transparent'
                          : 'bg-white/85 border-[#D6E4FA] hover:border-[#3F5FC4] text-[#0B1B3D]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tabular opacity-85">
                        <span>Module 0{idx + 1} · {lesson.duration}</span>
                        {isDone && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="text-xs font-extrabold mt-1 leading-snug">{lesson.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. LIVE SCHEDULE & RSVP */}
      {activeTab === 'schedule' && (
        <div className="glass-panel rounded-3xl p-6 space-y-5">
          <div>
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Weekly Indian Hybrid Cohort Timetable</h2>
            <p className="text-xs text-slate-600">RSVP to lock your physical lab seat or receive automated Zoom join links.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WEEKLY_SCHEDULE.map((item, idx) => {
              const joined = rsvpIds.includes(item.id);
              const tones = ['pastel-sky-card', 'pastel-lavender-card', 'pastel-mint-card', 'pastel-peach-card'];
              return (
                <div key={item.id} className={`${tones[idx % tones.length]} rounded-2xl p-5 flex flex-col justify-between gap-4`}>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono-tabular font-bold text-[#334873]">
                      <span>{item.day}</span>
                      <span>{item.time}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-[#0B1B3D]">{item.topic}</h3>
                    <p className="text-xs text-slate-700">
                      Faculty: {item.mentor} · {item.mode}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-black/8">
                    <span className="text-xs font-bold text-[#132C63]">
                      {joined ? 'Seat Confirmed' : 'Open for RSVP'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setRsvpIds((prev) =>
                          prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                        );
                        onToast(
                          'success',
                          joined ? 'RSVP Cancelled' : 'Live Seat Confirmed',
                          `${item.day} · ${item.topic}`
                        );
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                        joined ? 'bg-white text-[#0B1B3D] border border-[#94BCF1]' : 'btn-blue-primary text-white'
                      }`}
                    >
                      {joined ? 'Cancel RSVP' : 'Confirm Seat'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. CAPSTONE LAB & MENTOR RUBRIC AUDITS */}
      {activeTab === 'capstones' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <form onSubmit={handleSubmitCapstone} className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Submit Capstone for Faculty Audit</h2>
              <p className="text-xs text-slate-600">Submissions sync immediately to Prof. Kavita Nair in the Mentor Hub.</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B1B3D] mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g., Real-Time UPI Fraud Guard using XGBoost"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B1B3D] mb-1">GitHub / Live Demo URL *</label>
              <input
                type="url"
                required
                value={deliverableUrl}
                onChange={(e) => setDeliverableUrl(e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B1B3D] mb-1">Architecture Notes &amp; Latency Metrics</label>
              <textarea
                rows={3}
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                placeholder="Describe tech stack, tests, and deployment benchmarks..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Submit Capstone Deliverable
            </button>
          </form>

          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Your Capstone Audit History ({myCapstones.length})</h2>
            <div className="space-y-3">
              {myCapstones.map((cap) => (
                <div key={cap.id} className="metallic-chrome-surface rounded-2xl p-5 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0B1B3D]">{cap.projectTitle}</h3>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {cap.track} · Submitted {cap.submittedOn}
                      </div>
                    </div>
                    <span className="text-xs font-mono-tabular font-extrabold text-[#1E428E]">
                      {cap.status} {cap.score > 0 ? `· ${cap.score}/100` : ''}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">{cap.notes}</p>
                  {cap.score > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono-tabular">
                      <div className="pastel-sky-card rounded-xl px-3 py-2">Arch: {cap.rubric.architecture}/25</div>
                      <div className="pastel-lavender-card rounded-xl px-3 py-2">Code: {cap.rubric.codeQuality}/25</div>
                      <div className="pastel-mint-card rounded-xl px-3 py-2">Impact: {cap.rubric.impact}/25</div>
                      <div className="pastel-peach-card rounded-xl px-3 py-2">Docs: {cap.rubric.documentation}/25</div>
                    </div>
                  )}
                  {cap.mentorFeedback && (
                    <div className="text-xs text-[#132C63] bg-white/80 rounded-xl p-3 border border-[#D3E5FD]">
                      <strong>Mentor Verdict:</strong> {cap.mentorFeedback}
                    </div>
                  )}
                  <a
                    href={cap.deliverableUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2B4EA2] hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Repository</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. CODING SANDBOX & TIMED MOCK QUIZ */}
      {activeTab === 'coding-lab' && (
        <div className="space-y-6">
          {/* Interactive Mentor-Assigned Coding Sandbox */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div className="xl:col-span-4 glass-panel rounded-3xl p-5 space-y-3">
              <h2 className="text-base font-extrabold text-[#0B1B3D]">Cohort Coding Assignments</h2>
              <p className="text-xs text-slate-600">Published directly by Faculty in the Mentor Hub.</p>
              <div className="space-y-2">
                {assignments.map((asg) => {
                  const active = asg.id === activeAssignment?.id;
                  return (
                    <button
                      key={asg.id}
                      type="button"
                      onClick={() => {
                        setActiveAssignmentId(asg.id);
                        setCodeDraft(asg.starterCode);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-colors cursor-pointer ${
                        active
                          ? 'btn-blue-primary text-white border-transparent'
                          : 'bg-white/85 border-[#D6E4FA] text-[#0B1B3D] hover:border-[#3F5FC4]'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{asg.title}</div>
                      <div className="text-[11px] opacity-85 mt-1 font-mono-tabular">
                        {asg.difficulty} · {asg.points} pts · Due {asg.dueDate}
                      </div>
                      {asg.studentSubmitted && (
                        <div className="text-[11px] font-bold mt-1">
                          Submitted ({asg.studentScore}/{asg.points})
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeAssignment && (
              <div className="xl:col-span-8 glass-panel rounded-3xl p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-[#334873]">
                      {activeAssignment.track} · Authored by {activeAssignment.createdBy}
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0B1B3D]">{activeAssignment.title}</h3>
                  </div>
                  <span className="text-xs font-mono-tabular font-extrabold text-[#2B4EA2]">
                    {activeAssignment.points} Points · Due {activeAssignment.dueDate}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed pastel-sky-card rounded-2xl p-4">
                  {activeAssignment.prompt}
                </p>
                <textarea
                  rows={8}
                  value={codeDraft}
                  onChange={(e) => setCodeDraft(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-[#0B1636] text-[#E6F0FF] font-mono-tabular text-xs border border-[#3869C3]/50 focus:outline-none focus:ring-2 focus:ring-[#94BCF1]"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCodeDraft(activeAssignment.starterCode)}
                    className="px-4 py-2 rounded-xl btn-blue-glass text-xs font-bold cursor-pointer"
                  >
                    Reset Starter Code
                  </button>
                  <button
                    type="button"
                    onClick={handleRunCodingSubmission}
                    className="px-5 py-2.5 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer"
                  >
                    Run Automated Tests &amp; Submit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4-Question Readiness Quiz */}
          <div className="glass-panel rounded-3xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-[#0B1B3D]">NSDC Placement Readiness Assessment</h2>
                <p className="text-xs text-slate-600">Score 75%+ to unlock verified priority shortlisting.</p>
              </div>
              {quizSubmitted && (
                <div className="pastel-mint-card px-4 py-2 rounded-xl text-xs font-mono-tabular font-extrabold text-[#0B1B3D]">
                  Score: {quizScoreCount}/{QUIZ_BANK.length} ({quizPercent}%)
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {QUIZ_BANK.map((item, qIdx) => (
                <div key={item.q} className="bg-white/85 rounded-2xl p-4 border border-[#D6E4FA] space-y-3">
                  <div className="text-xs font-extrabold text-[#0B1B3D]">
                    {qIdx + 1}. {item.q}
                  </div>
                  <div className="space-y-1.5">
                    {item.options.map((opt, optIdx) => {
                      const chosen = quizAnswers[qIdx] === optIdx;
                      const isCorrect = quizSubmitted && optIdx === item.answer;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs border transition-colors cursor-pointer ${
                            isCorrect
                              ? 'pastel-mint-card font-bold text-[#0B1B3D]'
                              : chosen
                                ? 'pastel-lavender-card font-bold text-[#0B1B3D]'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-[#3F5FC4]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <p className="text-[11px] text-[#1E428E] bg-[#EFF5FF] rounded-lg p-2.5">{item.explanation}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              {quizSubmitted ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="px-5 py-2.5 rounded-xl btn-blue-glass text-xs font-bold cursor-pointer"
                >
                  Retake Quiz
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setQuizSubmitted(true);
                    onToast('success', 'Assessment Graded', `You scored ${quizPercent}% on the placement readiness quiz.`);
                  }}
                  className="px-5 py-2.5 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer"
                >
                  Submit Quiz Answers
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. LIVE PLACEMENT DRIVES */}
      {activeTab === 'placements' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={driveSearch}
                onChange={(e) => setDriveSearch(e.target.value)}
                placeholder="Search by company, city, or skill (React, Python, AWS)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>
            <div className="text-xs font-mono-tabular font-bold text-[#1E428E]">
              {filteredDrives.length} Open Drives · {myApplications.length} Applications Active
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredDrives.map((drive) => {
              const appliedApp = myApplications.find((a) => a.driveId === drive.id);
              return (
                <div key={drive.id} className="metallic-chrome-surface rounded-3xl p-6 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-[#2B4EA2]">{drive.company} · {drive.mode}</div>
                        <h3 className="text-base font-extrabold text-[#0B1B3D] mt-0.5">{drive.role}</h3>
                      </div>
                      <div className="text-sm font-mono-tabular font-extrabold text-[#132C63] shrink-0">
                        {drive.packageLPA}
                      </div>
                    </div>
                    <div className="text-xs text-slate-600">
                      Skills: {drive.skills.join(' · ')}
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {drive.positions} · Deadline: {drive.deadline} · {drive.eligibility}
                    </div>
                    {appliedApp?.interviewDate && (
                      <div className="pastel-lavender-card rounded-xl p-3 text-xs space-y-1">
                        <div className="font-extrabold text-[#0B1B3D]">
                          Interview Scheduled · {appliedApp.interviewDate} ({appliedApp.interviewTime})
                        </div>
                        <div className="text-slate-700">Panel: {appliedApp.interviewPanel}</div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#D3E2FA]">
                    <span className="text-xs font-bold text-[#334873]">
                      {appliedApp ? `Stage: ${appliedApp.stage}` : 'Zero-Cost Placement Drive'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleApplyDrive(drive)}
                      disabled={Boolean(appliedApp)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${
                        appliedApp
                          ? 'pastel-mint-card text-[#0B1B3D] cursor-default'
                          : 'btn-blue-primary text-white'
                      }`}
                    >
                      {appliedApp ? 'Applied' : 'One-Click Apply'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. RESUME BUILDER & ATS CHECKER */}
      {activeTab === 'resume' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <form onSubmit={handleSaveResume} className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-extrabold text-[#0B1B3D]">Placement Resume Editor</h2>
                <p className="text-xs text-slate-600">Edit your profile and instantly verify keyword alignment against live drives.</p>
              </div>
              <button
                type="button"
                onClick={handleDownloadResumeText}
                className="px-4 py-2 rounded-xl btn-blue-glass text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Resume</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0B1B3D] mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.fullName}
                  onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0B1B3D] mb-1">Location &amp; Mobility</label>
                <input
                  type="text"
                  value={resume.location}
                  onChange={(e) => setResume({ ...resume, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1B3D] mb-1">Role Headline</label>
              <input
                type="text"
                value={resume.headline}
                onChange={(e) => setResume({ ...resume, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1B3D] mb-1">Skills (Comma Separated)</label>
              <input
                type="text"
                value={resume.skills}
                onChange={(e) => setResume({ ...resume, skills: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1B3D] mb-1">Executive Summary</label>
              <textarea
                rows={3}
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1B3D] mb-1">Capstone &amp; Production Projects</label>
              <textarea
                rows={4}
                value={resume.projects}
                onChange={(e) => setResume({ ...resume, projects: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>

            <button type="submit" className="px-5 py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Save Resume to Placement Profile
            </button>
          </form>

          <div className="xl:col-span-5 space-y-5">
            <div className="metallic-chrome-surface rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#0B1B3D]">Live ATS Keyword Match</h3>
                <span className="text-2xl font-mono-tabular font-extrabold text-[#1E428E]">
                  {atsAnalysis.score}%
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Benchmarked dynamically against required skills across all {drives.length} open Hridayam hiring drives.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-800">
                  Matched Skills ({atsAnalysis.matched.length})
                </div>
                <div className="text-xs text-slate-700 leading-relaxed">
                  {atsAnalysis.matched.join(' · ') || 'None yet'}
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-[#D3E2FA]">
                <div className="text-xs font-bold text-amber-800">
                  Recommended Keywords to Add ({atsAnalysis.missing.length})
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {atsAnalysis.missing.join(' · ') || 'All active drive skills covered!'}
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 space-y-2 text-xs">
              <div className="text-base font-extrabold text-[#0B1B3D]">{resume.fullName}</div>
              <div className="font-semibold text-[#2B4EA2]">{resume.headline}</div>
              <div className="text-slate-600">{resume.location} · {resume.email}</div>
              <p className="text-slate-700 pt-2 border-t border-slate-200 leading-relaxed">{resume.summary}</p>
              <div className="pt-2 text-slate-700 whitespace-pre-line">{resume.projects}</div>
            </div>
          </div>
        </div>
      )}

      {/* 8. DOUBT DESK & 1:1 MENTOR BOOKING */}
      {activeTab === 'doubts' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-6 space-y-5">
            <form onSubmit={handleSubmitDoubt} className="glass-panel rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Raise Technical Doubt Ticket</h2>
              <input
                type="text"
                required
                value={doubtSubject}
                onChange={(e) => setDoubtSubject(e.target.value)}
                placeholder="Topic or error summary"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <textarea
                rows={3}
                required
                value={doubtQuestion}
                onChange={(e) => setDoubtQuestion(e.target.value)}
                placeholder="Describe your code issue, dataset error, or concept question..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <div className="flex items-center justify-between gap-3">
                <select
                  value={doubtPriority}
                  onChange={(e) => setDoubtPriority(e.target.value as 'Normal' | 'Urgent')}
                  className="px-3 py-2 rounded-xl glass-input text-xs font-bold"
                >
                  <option value="Normal">Normal Priority</option>
                  <option value="Urgent">Urgent (Before Mock / Drive)</option>
                </select>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl btn-blue-primary text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post to Faculty Desk</span>
                </button>
              </div>
            </form>

            <div className="glass-panel rounded-3xl p-6 space-y-3">
              <h3 className="text-base font-extrabold text-[#0B1B3D]">Your Doubt Threads ({myDoubts.length})</h3>
              {myDoubts.map((d) => (
                <div key={d.id} className="bg-white/85 rounded-2xl p-4 border border-[#D6E4FA] space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-[#0B1B3D]">{d.subject}</span>
                    <span className="font-mono-tabular font-bold text-[#2B4EA2]">{d.status} · {d.priority}</span>
                  </div>
                  <p className="text-slate-600">{d.question}</p>
                  {d.mentorReply && (
                    <div className="pastel-mint-card rounded-xl p-3 text-[#0B1B3D]">
                      <strong>{d.repliedBy}:</strong> {d.mentorReply}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-6 space-y-5">
            <form onSubmit={handleBookSlot} className="glass-panel rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Book 1-on-1 Mentorship Cabin / Zoom</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                />
                <input
                  type="text"
                  value={slotTime}
                  onChange={(e) => setSlotTime(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                />
              </div>
              <select
                value={slotMode}
                onChange={(e) => setSlotMode(e.target.value as 'Live Online (Zoom)' | 'Campus Cabin')}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold"
              >
                <option value="Live Online (Zoom)">Live Online (Zoom)</option>
                <option value="Campus Cabin">Campus Cabin (Pune / Bengaluru / Thane)</option>
              </select>
              <input
                type="text"
                required
                value={slotTopic}
                onChange={(e) => setSlotTopic(e.target.value)}
                placeholder="Agenda (e.g., System Design Mock Review / Resume Feedback)"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
                Confirm 1:1 Mentor Slot
              </button>
            </form>

            <div className="glass-panel rounded-3xl p-6 space-y-3">
              <h3 className="text-base font-extrabold text-[#0B1B3D]">Confirmed Bookings ({slots.length})</h3>
              {slots.map((s) => (
                <div key={s.id} className="pastel-sky-card rounded-2xl p-4 text-xs space-y-1">
                  <div className="flex justify-between font-extrabold text-[#0B1B3D]">
                    <span>{s.mentorName}</span>
                    <span>{s.status}</span>
                  </div>
                  <div className="text-slate-700">{s.topic}</div>
                  <div className="font-mono-tabular text-[11px] text-[#334873]">
                    {s.date} · {s.timeSlot} · {s.mode}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 9. FEES, 0% EMI & SCHOLARSHIPS */}
      {activeTab === 'fees' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Tuition Fee &amp; 0% EMI Ledger</h2>
            <div className="space-y-2.5">
              {FEE_LEDGER.map((row) => (
                <div
                  key={row.id}
                  className="bg-white/85 rounded-2xl p-4 border border-[#D6E4FA] flex flex-wrap items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-extrabold text-[#0B1B3D]">{row.label}</div>
                    <div className="text-slate-600 font-mono-tabular">
                      {row.id} · {row.date} · {row.mode}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tabular font-extrabold text-sm text-[#0B1B3D]">{row.amount}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setReceiptInvoiceId(row.id);
                        onToast('info', 'Receipt Loaded', `Viewing GST receipt for ${row.id}.`);
                      }}
                      className="px-3 py-1.5 rounded-lg btn-blue-glass text-[11px] font-bold cursor-pointer"
                    >
                      {row.status === 'Paid' ? 'View GST Receipt' : 'Schedule Info'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {receiptInvoiceId && (
              <div className="metallic-chrome-surface rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-extrabold text-[#0B1B3D]">Verified GST Invoice · {receiptInvoiceId}</div>
                  <div className="text-slate-600">Hridayam by Belvo EdTech Pvt. Ltd. · GSTIN 27AABCH8192K1Z4</div>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl btn-blue-primary text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            )}
          </div>

          <div className="xl:col-span-5 space-y-5">
            <form onSubmit={handleApplyScholarship} className="glass-panel rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Apply for Merit Scholarship / EMI Grant</h2>
              <p className="text-xs text-slate-600">Requests route directly to Institute Admin Console for review.</p>
              <select
                value={schType}
                onChange={(e) => setSchType(e.target.value as ScholarshipRequest['type'])}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold"
              >
                <option value="Merit Scholarship (25%)">Merit Scholarship (25% · ₹12,000)</option>
                <option value="Women in Tech Grant (20%)">Women in Tech Grant (20% · ₹9,600)</option>
                <option value="0% EMI Extension">0% EMI Extension (₹6,000 relief)</option>
              </select>
              <textarea
                rows={3}
                required
                value={schReason}
                onChange={(e) => setSchReason(e.target.value)}
                placeholder="Briefly explain academic performance, attendance, or grant eligibility..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
                Submit Grant Request
              </button>
            </form>

            <div className="glass-panel rounded-3xl p-6 space-y-2.5">
              <h3 className="text-sm font-extrabold text-[#0B1B3D]">Your Grant Status ({myScholarships.length})</h3>
              {myScholarships.map((s) => (
                <div key={s.id} className="pastel-lavender-card rounded-2xl p-3.5 text-xs space-y-1">
                  <div className="flex justify-between font-extrabold text-[#0B1B3D]">
                    <span>{s.type}</span>
                    <span className="font-mono-tabular">₹{s.amountINR.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-slate-700">Status: <strong>{s.status}</strong> · {s.submittedOn}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 10. NSDC CERTIFICATES & TRANSCRIPT */}
      {activeTab === 'certificate' && (
        <div className="metallic-chrome-surface rounded-3xl p-8 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl btn-blue-primary flex items-center justify-center mx-auto">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2 max-w-2xl mx-auto">
            <div className="text-xs font-bold tracking-widest uppercase text-[#2B4EA2]">
              NSDC · Skill India · ISO 9001:2015 Verified Credential
            </div>
            <h2 className="text-3xl font-extrabold text-[#0B1B3D]">Certificate of Industry Mastery</h2>
            <p className="text-sm text-slate-700">
              Awarded to <strong className="text-[#0B1B3D]">{studentProfile.name}</strong> ({studentProfile.rollNo}) for demonstrating verified studio engineering proficiency in{' '}
              <strong className="text-[#0B1B3D]">{currentCourse.title}</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-xs">
            <div className="pastel-sky-card rounded-2xl p-4">
              <div className="text-slate-600">Curriculum Mastery</div>
              <div className="text-lg font-mono-tabular font-extrabold text-[#0B1B3D]">{progressPercent}%</div>
            </div>
            <div className="pastel-mint-card rounded-2xl p-4">
              <div className="text-slate-600">Attendance Verified</div>
              <div className="text-lg font-mono-tabular font-extrabold text-[#0B1B3D]">{studentProfile.attendance}</div>
            </div>
            <div className="pastel-lavender-card rounded-2xl p-4">
              <div className="text-slate-600">Credential ID</div>
              <div className="text-sm font-mono-tabular font-extrabold text-[#0B1B3D] mt-1">{studentProfile.rollNo}</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl btn-blue-primary text-xs font-extrabold inline-flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Verified Certificate</span>
            </button>
            <button
              type="button"
              onClick={() => handleDownloadResource(`Hridayam_NSDC_Transcript_${studentProfile.rollNo}.pdf`)}
              className="px-6 py-3 rounded-xl btn-blue-glass text-xs font-extrabold inline-flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Academic Transcript</span>
            </button>
          </div>
        </div>
      )}
    </PortalWorkspaceShell>
  );
};
