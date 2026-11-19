import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  ClipboardCheck,
  MessageSquare,
  Users,
  Award,
  Code2,
  Calendar,
  Megaphone,
  Download,
  Send,
  ExternalLink,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  CodingAssignment,
  CohortAttendanceRecord,
  exportRowsToCsv,
  MentorSlotBooking,
  MockInterviewEval,
  PortalStore,
  SharedAnnouncement,
  SharedCapstone,
  SharedDoubtTicket,
} from '../lib/portalStore';
import { PortalKpi, PortalNavItem, PortalWorkspaceShell } from './PortalWorkspaceShell';
import { AppView } from '../types';

interface MentorPortalViewProps {
  onLogout: () => void;
  onNavigate?: (view: AppView) => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

type MentorTab =
  | 'overview'
  | 'reviews'
  | 'doubts'
  | 'attendance'
  | 'mocks'
  | 'assignments'
  | 'sessions'
  | 'mentorship';

interface CohortSession {
  id: string;
  batch: string;
  topic: string;
  schedule: string;
  learners: number;
  recordingUrl?: string;
}

const INITIAL_SESSIONS: CohortSession[] = [
  {
    id: 'ses_1',
    batch: 'AI-2026-B4 (Pune + Live Online)',
    topic: 'RAG Architecture & Prompt Evaluation Clinic',
    schedule: 'Today · 7:00 PM – 9:00 PM IST',
    learners: 28,
    recordingUrl: 'https://studio.hridayam.in/rec/rag-clinic-b4',
  },
  {
    id: 'ses_2',
    batch: 'FSD-2026-M2 (Mumbai & Thane)',
    topic: 'System Design Mock Interview Panel (Round 2)',
    schedule: 'Tomorrow · 11:00 AM – 1:00 PM IST',
    learners: 22,
  },
  {
    id: 'ses_3',
    batch: 'DA-2026-BLR1 (Bengaluru Hub)',
    topic: 'SQL Window Functions & Case Study Walkthrough',
    schedule: 'Friday · 6:30 PM – 8:30 PM IST',
    learners: 25,
    recordingUrl: 'https://studio.hridayam.in/rec/sql-windows-blr1',
  },
];

export const MentorPortalView: React.FC<MentorPortalViewProps> = ({
  onLogout,
  onNavigate,
  onToast,
}) => {
  const { user, isAdmin, signOutUser } = useAuth();
  const [activeTab, setActiveTab] = useState<MentorTab>('overview');

  // Shared Store States
  const [submissions, setSubmissions] = useState<SharedCapstone[]>(() => PortalStore.getCapstones());
  const [doubts, setDoubts] = useState<SharedDoubtTicket[]>(() => PortalStore.getDoubts());
  const [attendance, setAttendance] = useState<CohortAttendanceRecord[]>(() => PortalStore.getAttendance());
  const [mocks, setMocks] = useState<MockInterviewEval[]>(() => PortalStore.getMockEvals());
  const [assignments, setAssignments] = useState<CodingAssignment[]>(() => PortalStore.getAssignments());
  const [slots, setSlots] = useState<MentorSlotBooking[]>(() => PortalStore.getSlots());
  const [announcements, setAnnouncements] = useState<SharedAnnouncement[]>(() => PortalStore.getAnnouncements());
  const [sessions, setSessions] = useState<CohortSession[]>(INITIAL_SESSIONS);

  // Rubric Grading State
  const [gradingId, setGradingId] = useState<string | null>(null);
  const [rubric, setRubric] = useState({ architecture: 23, codeQuality: 23, impact: 24, documentation: 22 });
  const [feedbackText, setFeedbackText] = useState('');

  // Doubt Desk State
  const [doubtFilter, setDoubtFilter] = useState<'all' | 'Open' | 'Resolved'>('all');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  // Assignment Authoring Form
  const [asgTitle, setAsgTitle] = useState('');
  const [asgTrack, setAsgTrack] = useState('AI & Data Science');
  const [asgDiff, setAsgDiff] = useState<CodingAssignment['difficulty']>('Intermediate');
  const [asgDue, setAsgDue] = useState('02 Dec 2026');
  const [asgPoints, setAsgPoints] = useState(100);
  const [asgPrompt, setAsgPrompt] = useState('');
  const [asgStarter, setAsgStarter] = useState('// Write your solution here\n');
  const [asgKeyword, setAsgKeyword] = useState('return');

  // New Session & Announcement Forms
  const [newSessionBatch, setNewSessionBatch] = useState('AI-2026-B4 (Pune + Online)');
  const [newSessionTopic, setNewSessionTopic] = useState('');
  const [newSessionTime, setNewSessionTime] = useState('Saturday · 5:00 PM – 6:30 PM IST');
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');

  // Mock Interview Scorer Form
  const [mockStudent, setMockStudent] = useState('Aarav Deshmukh');
  const [mockTrack, setMockTrack] = useState('AI & Full Stack');
  const [mockDsa, setMockDsa] = useState(86);
  const [mockSd, setMockSd] = useState(90);
  const [mockComm, setMockComm] = useState(92);
  const [mockNotes, setMockNotes] = useState('');

  useEffect(() => {
    setSubmissions(PortalStore.getCapstones());
    setDoubts(PortalStore.getDoubts());
    setSlots(PortalStore.getSlots());
    setAssignments(PortalStore.getAssignments());
    setAnnouncements(PortalStore.getAnnouncements());
  }, [activeTab]);

  const totalRubricScore =
    rubric.architecture + rubric.codeQuality + rubric.impact + rubric.documentation;

  const openRubricEditor = (item: SharedCapstone) => {
    setGradingId(item.id);
    if (item.score > 0) {
      setRubric(item.rubric);
      setFeedbackText(item.mentorFeedback);
    } else {
      setRubric({ architecture: 23, codeQuality: 23, impact: 24, documentation: 22 });
      setFeedbackText('Well-structured repository and real business use case. Cleared for campus placement drives.');
    }
  };

  const handleSaveGrade = (id: string, nextStatus: SharedCapstone['status']) => {
    const score = nextStatus === 'Approved for Placement' ? totalRubricScore : Math.min(totalRubricScore, 70);
    const updated = submissions.map((item) =>
      item.id === id
        ? {
            ...item,
            status: nextStatus,
            score,
            rubric,
            mentorFeedback: feedbackText.trim() || 'Reviewed by Hridayam Faculty Panel.',
          }
        : item
    );
    PortalStore.saveCapstones(updated);
    setSubmissions(updated);
    setGradingId(null);
    const target = submissions.find((s) => s.id === id);
    onToast('success', 'Rubric Synced to Student LMS', `${target?.studentName} marked "${nextStatus}" (${score}/100).`);
  };

  const handleReplyDoubt = (id: string) => {
    const reply = (replyDrafts[id] || '').trim();
    if (!reply) return;
    const updated = doubts.map((d) =>
      d.id === id
        ? {
            ...d,
            status: 'Resolved' as const,
            mentorReply: reply,
            repliedBy: user?.displayName || 'Prof. Kavita Nair',
            repliedAt: 'Just now',
          }
        : d
    );
    PortalStore.saveDoubts(updated);
    setDoubts(updated);
    setReplyDrafts((prev) => ({ ...prev, [id]: '' }));
    onToast('success', 'Doubt Ticket Resolved', 'Answer is now live inside the Student LMS.');
  };

  const handleAttendanceToggle = (id: string, status: CohortAttendanceRecord['todayStatus']) => {
    const updated = attendance.map((row) => {
      if (row.id !== id) return row;
      const delta = status === 'Present' ? 96 : status === 'Late' ? 91 : 82;
      return { ...row, todayStatus: status, attendancePercent: delta };
    });
    PortalStore.saveAttendance(updated);
    setAttendance(updated);
    onToast('info', 'Attendance Updated', `Saved status as "${status}".`);
  };

  const handleExportAttendance = () => {
    exportRowsToCsv(
      'hridayam-cohort-attendance.csv',
      ['Roll No', 'Student Name', 'Batch', 'City', 'LMS Progress %', 'Attendance %', 'Today Status'],
      attendance.map((r) => [r.rollNo, r.studentName, r.batch, r.city, r.progress, r.attendancePercent, r.todayStatus])
    );
    onToast('success', 'Attendance CSV Exported', 'Cohort attendance sheet downloaded.');
  };

  const handlePublishAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asgTitle.trim() || !asgPrompt.trim()) return;
    const created: CodingAssignment = {
      id: `asg_${Date.now()}`,
      title: asgTitle.trim(),
      track: asgTrack,
      difficulty: asgDiff,
      dueDate: asgDue,
      points: Number(asgPoints) || 100,
      prompt: asgPrompt.trim(),
      starterCode: asgStarter,
      expectedKeyword: asgKeyword.trim() || 'return',
      createdBy: user?.displayName || 'Prof. Kavita Nair',
      submissionsCount: 0,
      studentSubmitted: false,
    };
    const next = [created, ...assignments];
    PortalStore.saveAssignments(next);
    setAssignments(next);
    setAsgTitle('');
    setAsgPrompt('');
    onToast('success', 'Coding Challenge Published', `"${created.title}" is now live in the Student LMS Coding Sandbox.`);
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessionTopic.trim()) return;
    setSessions((prev) => [
      {
        id: `ses_${Date.now()}`,
        batch: newSessionBatch,
        topic: newSessionTopic.trim(),
        schedule: newSessionTime,
        learners: 26,
      },
      ...prev,
    ]);
    setNewSessionTopic('');
    onToast('success', 'Live Session Scheduled', `Added "${newSessionTopic}" to the Indian cohort calendar.`);
  };

  const handleCompleteSlot = (slotId: string) => {
    const updated = slots.map((s) => (s.id === slotId ? { ...s, status: 'Completed' as const } : s));
    PortalStore.saveSlots(updated);
    setSlots(updated);
    onToast('success', '1:1 Session Marked Completed', 'Student slot log updated.');
  };

  const handleBroadcastAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;
    const item: SharedAnnouncement = {
      id: `ann_${Date.now()}`,
      title: annTitle.trim(),
      message: annMessage.trim(),
      author: `${user?.displayName || 'Prof. Kavita Nair'} · Faculty Mentor`,
      audience: 'All Students',
      createdAt: 'Just now',
    };
    const next = [item, ...announcements];
    PortalStore.saveAnnouncements(next);
    setAnnouncements(next);
    setAnnTitle('');
    setAnnMessage('');
    onToast('success', 'Announcement Published Live', 'Visible immediately at the top of the Student LMS.');
  };

  const handleAddMockEval = (e: React.FormEvent) => {
    e.preventDefault();
    const avg = Math.round((mockDsa + mockSd + mockComm) / 3);
    const verdict: MockInterviewEval['verdict'] =
      avg >= 88 ? 'Strong Hire' : avg >= 75 ? 'Placement Ready' : 'Needs 1 More Mock';
    const nextEval: MockInterviewEval = {
      id: `mock_${Date.now()}`,
      studentName: mockStudent,
      track: mockTrack,
      date: 'Today',
      dsaScore: mockDsa,
      systemDesignScore: mockSd,
      communicationScore: mockComm,
      verdict,
      notes: mockNotes.trim() || 'Completed timed whiteboard & behavioral panel.',
    };
    const next = [nextEval, ...mocks];
    PortalStore.saveMockEvals(next);
    setMocks(next);
    setMockNotes('');
    onToast('success', 'Mock Panel Score Saved', `${mockStudent} evaluated as "${verdict}" (${avg}/100 avg).`);
  };

  const pendingAudits = submissions.filter((s) => s.status === 'Pending Audit').length;
  const openDoubtsCount = doubts.filter((d) => d.status === 'Open').length;
  const avgAttendance = Math.round(
    attendance.reduce((sum, r) => sum + r.attendancePercent, 0) / Math.max(attendance.length, 1)
  );
  const filteredDoubts =
    doubtFilter === 'all' ? doubts : doubts.filter((d) => d.status === doubtFilter);

  const navItems: PortalNavItem[] = [
    { id: 'overview', label: 'Faculty Overview', icon: LayoutDashboard, group: 'Academic Delivery' },
    { id: 'assignments', label: 'Coding Lab Authoring', icon: Code2, badge: assignments.length, group: 'Academic Delivery' },
    { id: 'sessions', label: 'Live Sessions & Reels', icon: Calendar, badge: sessions.length, group: 'Academic Delivery' },
    { id: 'reviews', label: 'Capstone Rubric Audit', icon: ClipboardCheck, badge: pendingAudits || undefined, group: 'Student Evaluation' },
    { id: 'attendance', label: 'Cohort Attendance', icon: Users, badge: `${avgAttendance}%`, group: 'Student Evaluation' },
    { id: 'mocks', label: 'Mock Interview Scorer', icon: Award, badge: mocks.length, group: 'Student Evaluation' },
    { id: 'doubts', label: 'Doubt Ticket Desk', icon: MessageSquare, badge: openDoubtsCount || undefined, group: 'Mentorship & Comms' },
    { id: 'mentorship', label: '1:1 Slots & Broadcasts', icon: Megaphone, badge: slots.length, group: 'Mentorship & Comms' },
  ];

  const kpis: PortalKpi[] = [
    { label: 'Pending Capstone Audits', value: pendingAudits, hint: `${submissions.length} total submitted`, pastelClass: 'pastel-lavender-card' },
    { label: 'Open Technical Doubts', value: openDoubtsCount, hint: 'Synced with Student LMS', pastelClass: 'pastel-rose-card' },
    { label: 'Cohort Avg Attendance', value: `${avgAttendance}%`, hint: `${attendance.length} tracked learners`, pastelClass: 'pastel-mint-card' },
    { label: 'Published Lab Challenges', value: assignments.length, hint: `${mocks.length} mock panels logged`, pastelClass: 'pastel-sky-card' },
  ];

  return (
    <PortalWorkspaceShell
      portalName="Faculty & Mentor Hub"
      portalSubtitle={`${user?.title || 'Principal Mentor · AI & Full Stack Engineering'} · ${user?.campus || 'Bengaluru Koramangala Hub'}`}
      userName={user?.displayName || 'Prof. Kavita Nair'}
      userEmail={user?.email || 'mentor@hridayam.in'}
      userBadgeCode={user?.badgeCode || 'HRD-FAC-2026-109'}
      userCampus={user?.campus || 'Bengaluru Hub'}
      roleAccent="lavender"
      navItems={navItems}
      activeId={activeTab}
      onSelectNav={(id) => setActiveTab(id as MentorTab)}
      kpis={kpis}
      headerActions={
        <>
          <button
            type="button"
            onClick={() => setActiveTab('assignments')}
            className="px-4 py-2.5 rounded-xl bg-white/95 text-[#0B1B3D] hover:bg-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Lab Challenge</span>
          </button>
          <button
            type="button"
            onClick={handleExportAttendance}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Attendance CSV</span>
          </button>
        </>
      }
      quickPortalLinks={
        isAdmin && onNavigate
          ? [
              { label: 'Student LMS', view: 'student' },
              { label: 'Mentor Hub', view: 'mentor-portal', active: true },
              { label: 'Recruiter', view: 'recruiter-portal' },
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
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Priority Grading Queue</h2>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className="text-xs font-bold text-[#2B4EA2] hover:underline cursor-pointer"
              >
                Open Full Auditor
              </button>
            </div>
            <div className="space-y-3">
              {submissions.slice(0, 3).map((item) => (
                <div key={item.id} className="metallic-chrome-surface rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-extrabold text-[#0B1B3D]">{item.projectTitle}</div>
                    <div className="text-xs text-slate-600">
                      {item.studentName} · {item.city} · {item.submittedOn}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      openRubricEditor(item);
                      setActiveTab('reviews');
                    }}
                    className="px-3.5 py-2 rounded-xl btn-blue-primary text-xs font-bold cursor-pointer"
                  >
                    {item.score > 0 ? `Score: ${item.score}/100` : 'Grade Rubric'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Upcoming 1:1 &amp; Open Doubts</h2>
              <button
                type="button"
                onClick={() => setActiveTab('doubts')}
                className="text-xs font-bold text-[#2B4EA2] hover:underline cursor-pointer"
              >
                Resolve Doubts
              </button>
            </div>
            {doubts.filter((d) => d.status === 'Open').slice(0, 2).map((d) => (
              <div key={d.id} className="pastel-rose-card rounded-2xl p-4 text-xs space-y-1">
                <div className="font-extrabold text-[#0B1B3D]">{d.subject}</div>
                <div className="text-slate-700">{d.studentName} · {d.priority} Priority</div>
              </div>
            ))}
            {slots.slice(0, 2).map((s) => (
              <div key={s.id} className="pastel-sky-card rounded-2xl p-4 text-xs space-y-1">
                <div className="font-extrabold text-[#0B1B3D]">1:1 with {s.studentName}</div>
                <div className="text-slate-700">{s.topic}</div>
                <div className="font-mono-tabular text-[11px] text-[#334873]">{s.date} · {s.timeSlot}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. CAPSTONE RUBRIC AUDIT */}
      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Student Capstone Deliverables ({submissions.length})</h2>
            <div className="space-y-3">
              {submissions.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl p-5 border space-y-2.5 ${
                    gradingId === item.id ? 'pastel-lavender-card' : 'metallic-chrome-surface'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0B1B3D]">{item.projectTitle}</h3>
                      <div className="text-xs text-slate-600">
                        {item.studentName} · {item.city} · {item.track}
                      </div>
                    </div>
                    <span className="text-xs font-mono-tabular font-extrabold text-[#1E428E]">
                      {item.status} {item.score > 0 ? `· ${item.score}/100` : ''}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">{item.notes}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D3E2FA]">
                    <a
                      href={item.deliverableUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-[#2B4EA2] inline-flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Inspect Repository</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => openRubricEditor(item)}
                      className="px-4 py-2 rounded-xl btn-blue-primary text-xs font-bold cursor-pointer"
                    >
                      {item.score > 0 ? 'Edit Rubric Score' : 'Start Rubric Audit'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">4-Pillar Rubric Scorer</h2>
            {gradingId ? (
              <div className="space-y-4">
                {(
                  [
                    ['architecture', 'System Architecture (max 25)'],
                    ['codeQuality', 'Code Quality & Tests (max 25)'],
                    ['impact', 'Real-World Impact (max 25)'],
                    ['documentation', 'README & Demo Clarity (max 25)'],
                  ] as const
                ).map(([field, label]) => (
                  <div key={field} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-[#0B1B3D]">
                      <span>{label}</span>
                      <span className="font-mono-tabular">{rubric[field]}/25</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={25}
                      value={rubric[field]}
                      onChange={(e) => setRubric({ ...rubric, [field]: Number(e.target.value) })}
                      className="w-full accent-[#2B4EA2]"
                    />
                  </div>
                ))}
                <div className="pastel-sky-card rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B1B3D]">Composite Audit Score</span>
                  <span className="text-2xl font-mono-tabular font-extrabold text-[#1E428E]">
                    {totalRubricScore}/100
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Write detailed feedback for the learner..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                />
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleSaveGrade(gradingId, 'Needs Revision')}
                    className="py-2.5 rounded-xl btn-blue-glass text-xs font-extrabold cursor-pointer"
                  >
                    Request Revision
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveGrade(gradingId, 'Approved for Placement')}
                    className="py-2.5 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer"
                  >
                    Approve Placement
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">
                Select any student capstone on the left to evaluate Architecture, Code Quality, Business Impact, and Documentation.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 3. DOUBT TICKET DESK */}
      {activeTab === 'doubts' && (
        <div className="glass-panel rounded-3xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Student Doubt Ticket Desk</h2>
              <p className="text-xs text-slate-600">Replies appear immediately in the Student LMS Doubt Desk.</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 p-1 rounded-xl border border-[#D3E2FA]">
              {(['all', 'Open', 'Resolved'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setDoubtFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    doubtFilter === f ? 'btn-blue-primary text-white' : 'text-[#132C63] hover:bg-[#EFF5FF]'
                  }`}
                >
                  {f === 'all' ? 'All Tickets' : f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredDoubts.map((d) => (
              <div key={d.id} className="metallic-chrome-surface rounded-2xl p-5 space-y-3 text-xs">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1B3D]">{d.subject}</h3>
                    <div className="text-slate-600 mt-0.5">
                      {d.studentName} · {d.track} · {d.createdAt}
                    </div>
                  </div>
                  <span className="font-mono-tabular font-extrabold text-[#2B4EA2]">
                    {d.status} · {d.priority}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">{d.question}</p>
                {d.mentorReply ? (
                  <div className="pastel-mint-card rounded-xl p-3.5 text-[#0B1B3D]">
                    <strong>Resolved by {d.repliedBy} ({d.repliedAt}):</strong> {d.mentorReply}
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={replyDrafts[d.id] || ''}
                      onChange={(e) => setReplyDrafts({ ...replyDrafts, [d.id]: e.target.value })}
                      placeholder="Write a clear technical explanation..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => handleReplyDoubt(d.id)}
                      className="px-4 py-2.5 rounded-xl btn-blue-primary text-xs font-extrabold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send &amp; Resolve</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. COHORT ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Live Cohort Attendance &amp; Readiness Register</h2>
              <p className="text-xs text-slate-600">Mark Present, Late, or Absent across active Indian batches.</p>
            </div>
            <button
              type="button"
              onClick={handleExportAttendance}
              className="px-4 py-2 rounded-xl btn-blue-glass text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D3E2FA] text-[#334873]">
                  <th className="py-3 pr-4 font-extrabold">Learner</th>
                  <th className="py-3 px-4 font-extrabold">Batch &amp; City</th>
                  <th className="py-3 px-4 font-extrabold text-right">LMS %</th>
                  <th className="py-3 px-4 font-extrabold text-right">Attendance</th>
                  <th className="py-3 pl-4 font-extrabold text-right">Mark Today</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4EEFC]">
                {attendance.map((row) => (
                  <tr key={row.id} className="hover:bg-white/60">
                    <td className="py-3.5 pr-4">
                      <div className="font-extrabold text-[#0B1B3D]">{row.studentName}</div>
                      <div className="font-mono-tabular text-[11px] text-slate-500">{row.rollNo}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {row.batch} · {row.city}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono-tabular font-bold text-[#0B1B3D]">
                      {row.progress}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono-tabular font-extrabold text-[#1E428E]">
                      {row.attendancePercent}%
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <div className="inline-flex gap-1">
                        {(['Present', 'Late', 'Absent'] as const).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleAttendanceToggle(row.id, st)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                              row.todayStatus === st
                                ? 'btn-blue-primary text-white'
                                : 'bg-white border border-[#D3E2FA] text-slate-700 hover:border-[#2B4EA2]'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. MOCK INTERVIEW SCORER */}
      {activeTab === 'mocks' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <form onSubmit={handleAddMockEval} className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Log Mock Interview Evaluation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={mockStudent}
                onChange={(e) => setMockStudent(e.target.value)}
                placeholder="Student Name"
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <input
                type="text"
                value={mockTrack}
                onChange={(e) => setMockTrack(e.target.value)}
                placeholder="Track"
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>

            {(
              [
                ['DSA & Problem Solving', mockDsa, setMockDsa],
                ['System Design & Architecture', mockSd, setMockSd],
                ['Communication & Clarity', mockComm, setMockComm],
              ] as const
            ).map(([label, val, setter]) => (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-[#0B1B3D]">
                  <span>{label}</span>
                  <span className="font-mono-tabular">{val}/100</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={100}
                  value={val}
                  onChange={(e) => setter(Number(e.target.value))}
                  className="w-full accent-[#2B4EA2]"
                />
              </div>
            ))}

            <textarea
              rows={3}
              value={mockNotes}
              onChange={(e) => setMockNotes(e.target.value)}
              placeholder="Interviewer observations & improvement notes..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Save Mock Interview Verdict
            </button>
          </form>

          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Recent Mock Panel Verdicts ({mocks.length})</h2>
            {mocks.map((m) => (
              <div key={m.id} className="metallic-chrome-surface rounded-2xl p-5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-extrabold text-[#0B1B3D]">{m.studentName}</div>
                    <div className="text-slate-600">{m.track} · {m.date}</div>
                  </div>
                  <span className="font-mono-tabular font-extrabold text-[#1E428E]">{m.verdict}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono-tabular">
                  <div className="pastel-sky-card rounded-xl p-2.5 text-center">DSA: {m.dsaScore}</div>
                  <div className="pastel-lavender-card rounded-xl p-2.5 text-center">Design: {m.systemDesignScore}</div>
                  <div className="pastel-mint-card rounded-xl p-2.5 text-center">Comm: {m.communicationScore}</div>
                </div>
                <p className="text-slate-700">{m.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. CODING ASSIGNMENT & QUIZ AUTHORING */}
      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <form onSubmit={handlePublishAssignment} className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#0B1B3D]">Publish Coding Challenge to Student LMS</h2>
              <p className="text-xs text-slate-600">Appears instantly inside Student LMS → Coding Sandbox.</p>
            </div>
            <input
              type="text"
              required
              value={asgTitle}
              onChange={(e) => setAsgTitle(e.target.value)}
              placeholder="Challenge Title (e.g., PostgreSQL Indexing Lab)"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={asgTrack}
                onChange={(e) => setAsgTrack(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <select
                value={asgDiff}
                onChange={(e) => setAsgDiff(e.target.value as CodingAssignment['difficulty'])}
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-bold"
              >
                <option value="Foundation">Foundation</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={asgDue}
                onChange={(e) => setAsgDue(e.target.value)}
                placeholder="Due Date"
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
              <input
                type="number"
                value={asgPoints}
                onChange={(e) => setAsgPoints(Number(e.target.value))}
                placeholder="Points"
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono-tabular font-bold"
              />
            </div>
            <textarea
              rows={2}
              required
              value={asgPrompt}
              onChange={(e) => setAsgPrompt(e.target.value)}
              placeholder="Problem specification for students..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <textarea
              rows={3}
              value={asgStarter}
              onChange={(e) => setAsgStarter(e.target.value)}
              placeholder="Starter code template..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono-tabular"
            />
            <input
              type="text"
              value={asgKeyword}
              onChange={(e) => setAsgKeyword(e.target.value)}
              placeholder="Auto-grader required token (e.g., OVER, return, filter)"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono-tabular"
            />
            <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Publish Live Challenge
            </button>
          </form>

          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Active Cohort Coding Labs ({assignments.length})</h2>
            {assignments.map((a) => (
              <div key={a.id} className="metallic-chrome-surface rounded-2xl p-5 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1B3D]">{a.title}</h3>
                    <div className="text-slate-600">{a.track} · {a.difficulty} · Due {a.dueDate}</div>
                  </div>
                  <span className="font-mono-tabular font-extrabold text-[#2B4EA2]">
                    {a.submissionsCount} Submissions · {a.points} pts
                  </span>
                </div>
                <p className="text-slate-700">{a.prompt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. LIVE SESSIONS & RECORDINGS */}
      {activeTab === 'sessions' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <form onSubmit={handleCreateSession} className="xl:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Schedule Live Cohort Session</h2>
            <input
              type="text"
              value={newSessionBatch}
              onChange={(e) => setNewSessionBatch(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <input
              type="text"
              required
              value={newSessionTopic}
              onChange={(e) => setNewSessionTopic(e.target.value)}
              placeholder="Workshop / Clinic Topic"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <input
              type="text"
              value={newSessionTime}
              onChange={(e) => setNewSessionTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Add to Cohort Timetable
            </button>
          </form>

          <div className="xl:col-span-7 glass-panel rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Scheduled Clinics &amp; Recordings ({sessions.length})</h2>
            {sessions.map((s) => (
              <div key={s.id} className="pastel-sky-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-extrabold text-sm text-[#0B1B3D]">{s.topic}</div>
                  <div className="text-slate-700">{s.batch} · {s.schedule}</div>
                </div>
                <span className="font-mono-tabular font-bold text-[#1E428E]">
                  {s.learners} Learners Enrolled
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. 1:1 MENTORSHIP SLOTS & BROADCASTS */}
      {activeTab === 'mentorship' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-6 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Booked Student 1:1 Sessions ({slots.length})</h2>
            <div className="space-y-3">
              {slots.map((s) => (
                <div key={s.id} className="metallic-chrome-surface rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="font-extrabold text-sm text-[#0B1B3D]">{s.studentName} · {s.mode}</div>
                    <div className="text-slate-700">{s.topic}</div>
                    <div className="font-mono-tabular text-[#334873]">{s.date} · {s.timeSlot}</div>
                  </div>
                  {s.status === 'Completed' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4" />
                      Completed
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCompleteSlot(s.id)}
                      className="px-3.5 py-2 rounded-xl btn-blue-primary text-xs font-bold cursor-pointer"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleBroadcastAnnouncement} className="xl:col-span-6 glass-panel rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0B1B3D]">Publish Live Student LMS Notice</h2>
            <p className="text-xs text-slate-600">Broadcasts immediately appear in the Student LMS Overview banner.</p>
            <input
              type="text"
              required
              value={annTitle}
              onChange={(e) => setAnnTitle(e.target.value)}
              placeholder="Notice Headline"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <textarea
              rows={4}
              required
              value={annMessage}
              onChange={(e) => setAnnMessage(e.target.value)}
              placeholder="Announcement details, Zoom link, or drive instructions..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
            />
            <button type="submit" className="w-full py-3 rounded-xl btn-blue-primary text-xs font-extrabold cursor-pointer">
              Publish Broadcast Live
            </button>
          </form>
        </div>
      )}
    </PortalWorkspaceShell>
  );
};
