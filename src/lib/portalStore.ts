import { PROVIDED_IMAGES } from '../data/mediaAssets';

export interface SharedCapstone {
  id: string;
  studentName: string;
  studentEmail: string;
  city: string;
  track: string;
  projectTitle: string;
  deliverableUrl: string;
  notes: string;
  submittedOn: string;
  status: 'Pending Audit' | 'Approved for Placement' | 'Needs Revision';
  score: number;
  rubric: {
    architecture: number;
    codeQuality: number;
    impact: number;
    documentation: number;
  };
  mentorFeedback: string;
}

export interface SharedDoubtTicket {
  id: string;
  studentName: string;
  studentEmail: string;
  track: string;
  subject: string;
  question: string;
  priority: 'Normal' | 'Urgent';
  status: 'Open' | 'Resolved';
  createdAt: string;
  mentorReply?: string;
  repliedBy?: string;
  repliedAt?: string;
}

export interface MentorSlotBooking {
  id: string;
  studentName: string;
  mentorName: string;
  date: string;
  timeSlot: string;
  topic: string;
  mode: 'Live Online (Zoom)' | 'Campus Cabin';
  status: 'Confirmed' | 'Completed';
}

export interface SharedHiringDrive {
  id: string;
  company: string;
  role: string;
  packageLPA: string;
  mode: string;
  city: string;
  skills: string[];
  positions: string;
  deadline: string;
  eligibility: string;
  postedBy: string;
}

export type CandidateStage =
  | 'Applied'
  | 'Shortlisted'
  | 'Technical Round'
  | 'HR Round'
  | 'Offer Issued';

export interface SharedApplication {
  id: string;
  driveId: string;
  company: string;
  role: string;
  packageLPA: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  city: string;
  track: string;
  stack: string;
  readiness: number;
  expectedCtc: string;
  notice: string;
  photo: string;
  stage: CandidateStage;
  appliedOn: string;
  interviewDate?: string;
  interviewTime?: string;
  interviewPanel?: string;
  interviewLink?: string;
  offerPackage?: string;
  offerJoiningDate?: string;
  recruiterNotes?: string;
}

export interface SharedAnnouncement {
  id: string;
  title: string;
  message: string;
  author: string;
  audience: 'All Students' | 'Placement Batch' | 'Faculty & Students';
  createdAt: string;
}

export interface CohortAttendanceRecord {
  id: string;
  studentName: string;
  rollNo: string;
  batch: string;
  city: string;
  progress: number;
  attendancePercent: number;
  todayStatus: 'Present' | 'Late' | 'Absent';
}

export interface MockInterviewEval {
  id: string;
  studentName: string;
  track: string;
  date: string;
  dsaScore: number;
  systemDesignScore: number;
  communicationScore: number;
  verdict: 'Placement Ready' | 'Needs 1 More Mock' | 'Strong Hire';
  notes: string;
}

export interface CodingAssignment {
  id: string;
  title: string;
  track: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  dueDate: string;
  points: number;
  prompt: string;
  starterCode: string;
  expectedKeyword: string;
  createdBy: string;
  submissionsCount: number;
  studentSubmitted?: boolean;
  studentScore?: number;
}

export interface RecruiterAssessment {
  id: string;
  title: string;
  role: string;
  durationMins: number;
  passingScore: number;
  skills: string[];
  invitedCandidates: string[];
  status: 'Active' | 'Draft' | 'Closed';
  createdAt: string;
}

export interface CampusBatchOperation {
  id: string;
  batchCode: string;
  campus: string;
  track: string;
  leadMentor: string;
  enrolledSeats: number;
  maxSeats: number;
  startDate: string;
  mode: 'Hybrid' | 'Classroom' | 'Live Online';
  status: 'Enrolling' | 'Running' | 'Placement Phase';
}

export interface ScholarshipRequest {
  id: string;
  studentName: string;
  studentEmail: string;
  track: string;
  type: 'Merit Scholarship (25%)' | 'Women in Tech Grant (20%)' | '0% EMI Extension';
  amountINR: number;
  reason: string;
  status: 'Pending Review' | 'Approved' | 'Declined';
  submittedOn: string;
}

export interface StudentResumeProfile {
  fullName: string;
  headline: string;
  location: string;
  phone: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  summary: string;
  skills: string;
  education: string;
  projects: string;
}

export interface AdminAuditEvent {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
}

const KEYS = {
  CAPSTONES: 'hrd_capstones_v2',
  DOUBTS: 'hrd_doubts_v2',
  SLOTS: 'hrd_mentor_slots_v2',
  DRIVES: 'hrd_hiring_drives_v2',
  APPLICATIONS: 'hrd_applications_v2',
  ANNOUNCEMENTS: 'hrd_announcements_v2',
  ATTENDANCE: 'hrd_attendance_v2',
  MOCKS: 'hrd_mock_evals_v2',
  STUDENT_NOTES: 'hrd_student_notes_v2',
  ASSIGNMENTS: 'hrd_assignments_v3',
  ASSESSMENTS: 'hrd_recruiter_assessments_v3',
  BATCHES: 'hrd_campus_batches_v3',
  SCHOLARSHIPS: 'hrd_scholarships_v3',
  RESUME: 'hrd_student_resume_v3',
  AUDIT_LOG: 'hrd_admin_audit_v3',
};

const SEED_CAPSTONES: SharedCapstone[] = [
  {
    id: 'cap_1',
    studentName: 'Aarav Deshmukh',
    studentEmail: 'student@hridayam.in',
    city: 'Pune FC Road',
    track: 'Artificial Intelligence, Machine Learning, and Automation',
    projectTitle: 'UPI Fraud Anomaly Detector using XGBoost & FastAPI',
    deliverableUrl: 'https://github.com/aarav-deshmukh/upi-fraud-guard-ml',
    notes: 'Deployed with sub-40ms inference latency and SHAP explainability dashboard.',
    submittedOn: 'Today, 10:15 AM IST',
    status: 'Pending Audit',
    score: 0,
    rubric: { architecture: 0, codeQuality: 0, impact: 0, documentation: 0 },
    mentorFeedback: '',
  },
  {
    id: 'cap_2',
    studentName: 'Ananya Iyer',
    studentEmail: 'ananya.iyer@hridayam.in',
    city: 'Bengaluru Koramangala',
    track: 'Web, App, and Software Development',
    projectTitle: 'Multi-Campus LMS & Attendance SaaS (React + Node)',
    deliverableUrl: 'https://github.com/ananya-iyer/campus-lms-saas',
    notes: 'Includes RBAC, JWT auth, automated attendance reports, and Razorpay test checkout.',
    submittedOn: 'Yesterday, 6:40 PM IST',
    status: 'Pending Audit',
    score: 0,
    rubric: { architecture: 0, codeQuality: 0, impact: 0, documentation: 0 },
    mentorFeedback: '',
  },
  {
    id: 'cap_3',
    studentName: 'Rohan Joshi',
    studentEmail: 'rohan.joshi@hridayam.in',
    city: 'Thane West HQ',
    track: 'Cloud & DevOps',
    projectTitle: 'Zero-Downtime AWS EKS Pipeline with Terraform',
    deliverableUrl: 'https://github.com/rohan-joshi/eks-blue-green-terraform',
    notes: 'Blue-green deployment with Prometheus + Grafana alerting.',
    submittedOn: '2 days ago',
    status: 'Approved for Placement',
    score: 94,
    rubric: { architecture: 24, codeQuality: 23, impact: 24, documentation: 23 },
    mentorFeedback: 'Production-grade Terraform modules and clean rollback strategy. Cleared for Tier-1 drives.',
  },
  {
    id: 'cap_4',
    studentName: 'Neha Kulkarni',
    studentEmail: 'neha.kulkarni@hridayam.in',
    city: 'Hyderabad HITEC City',
    track: 'Data Analytics & BI',
    projectTitle: 'Pan-India Retail Supply Chain Power BI Suite',
    deliverableUrl: 'https://github.com/neha-kulkarni/india-retail-powerbi',
    notes: 'Interactive DAX measures across 18 Indian states with inventory forecasting.',
    submittedOn: '3 days ago',
    status: 'Approved for Placement',
    score: 91,
    rubric: { architecture: 22, codeQuality: 23, impact: 24, documentation: 22 },
    mentorFeedback: 'Strong executive storytelling and clean star-schema modeling.',
  },
];

const SEED_DOUBTS: SharedDoubtTicket[] = [
  {
    id: 'dbt_1',
    studentName: 'Aarav Deshmukh',
    studentEmail: 'student@hridayam.in',
    track: 'AI & Machine Learning',
    subject: 'Handling class imbalance in UPI fraud dataset (0.2% positives)',
    question: 'Should I apply SMOTE before or inside each StratifiedKFold split to avoid data leakage during cross-validation?',
    priority: 'Urgent',
    status: 'Resolved',
    createdAt: 'Yesterday, 4:20 PM IST',
    mentorReply: 'Always apply SMOTE strictly INSIDE each training fold using an imbalanced-learn Pipeline. Applying it before splitting leaks synthetic samples into validation folds and inflates recall.',
    repliedBy: 'Prof. Kavita Nair',
    repliedAt: 'Yesterday, 4:52 PM IST',
  },
  {
    id: 'dbt_2',
    studentName: 'Aarav Deshmukh',
    studentEmail: 'student@hridayam.in',
    track: 'Full Stack Development',
    subject: 'Optimizing React re-renders on live placement filter table',
    question: 'My filter input lags slightly when filtering 500+ rows with nested badges. Should I combine useMemo with useDeferredValue?',
    priority: 'Normal',
    status: 'Open',
    createdAt: 'Today, 11:05 AM IST',
  },
  {
    id: 'dbt_3',
    studentName: 'Shruti Deshpande',
    studentEmail: 'shruti.d@hridayam.in',
    track: 'Cloud & DevOps',
    subject: 'Docker multi-stage build reducing Node image from 900MB to 140MB',
    question: 'Can we safely switch the runtime stage to node:20-alpine when using native bcrypt bindings?',
    priority: 'Normal',
    status: 'Open',
    createdAt: 'Today, 9:30 AM IST',
  },
];

const SEED_SLOTS: MentorSlotBooking[] = [
  {
    id: 'slot_1',
    studentName: 'Aarav Deshmukh',
    mentorName: 'Prof. Kavita Nair',
    date: 'Saturday, 22 Nov 2026',
    timeSlot: '11:00 AM – 11:30 AM IST',
    topic: 'Capstone Architecture & Resume Review for Infosys / Razorpay Drive',
    mode: 'Live Online (Zoom)',
    status: 'Confirmed',
  },
];

const SEED_DRIVES: SharedHiringDrive[] = [
  {
    id: 'drive_1',
    company: 'Infosys',
    role: 'Specialist Programmer — AI & Full Stack',
    packageLPA: '₹9.5 LPA',
    mode: 'Bengaluru / Pune · Hybrid',
    city: 'Bengaluru / Pune',
    skills: ['Python', 'React', 'SQL', 'FastAPI'],
    positions: '18 Openings',
    deadline: 'Tomorrow, 5:00 PM IST',
    eligibility: '75%+ LMS completion & 1 approved capstone',
    postedBy: 'Infosys Campus Hiring Desk',
  },
  {
    id: 'drive_2',
    company: 'Razorpay',
    role: 'Frontend & Full Stack Product Engineer',
    packageLPA: '₹14.0 LPA',
    mode: 'Bengaluru · Hybrid',
    city: 'Bengaluru',
    skills: ['React', 'TypeScript', 'Node.js', 'System Design'],
    positions: '6 Openings',
    deadline: 'In 3 Days',
    eligibility: '80%+ LMS completion & live deployed GitHub portfolio',
    postedBy: 'Razorpay Talent Acquisition',
  },
  {
    id: 'drive_3',
    company: 'Capgemini',
    role: 'Data Analyst & BI Consultant',
    packageLPA: '₹7.5 LPA',
    mode: 'Mumbai / Pune · Classroom Drive',
    city: 'Mumbai / Pune',
    skills: ['SQL', 'Power BI', 'Python', 'Excel'],
    positions: '25 Openings',
    deadline: 'In 4 Days',
    eligibility: 'Open to Non-IT & IT graduates (2023–2026)',
    postedBy: 'Capgemini India University Relations',
  },
  {
    id: 'drive_4',
    company: 'Zoho',
    role: 'Software Developer & Automation Engineer',
    packageLPA: '₹8.8 LPA',
    mode: 'Chennai / Pan-India Virtual',
    city: 'Chennai / Remote',
    skills: ['Java', 'JavaScript', 'DSA', 'REST APIs'],
    positions: '12 Openings',
    deadline: 'In 5 Days',
    eligibility: 'Strong problem solving & 2 mock interviews cleared',
    postedBy: 'Zoho Labs Recruiting',
  },
  {
    id: 'drive_5',
    company: 'Deloitte India',
    role: 'Cloud & GenAI Analyst',
    packageLPA: '₹10.5 LPA',
    mode: 'Hyderabad / Mumbai · Hybrid',
    city: 'Hyderabad / Mumbai',
    skills: ['AWS', 'Python', 'LLMs', 'Docker'],
    positions: '10 Openings',
    deadline: 'In 6 Days',
    eligibility: 'NSDC / AWS Academy track learners',
    postedBy: 'Deloitte India Campus Team',
  },
];

const SEED_APPLICATIONS: SharedApplication[] = [
  {
    id: 'app_1',
    driveId: 'drive_1',
    company: 'Infosys',
    role: 'Specialist Programmer — AI & Full Stack',
    packageLPA: '₹9.5 LPA',
    candidateId: 'cand_student_demo',
    candidateName: 'Aarav Deshmukh',
    candidateEmail: 'student@hridayam.in',
    city: 'Pune, Maharashtra',
    track: 'AI, Machine Learning & Full Stack',
    stack: 'Python · React · FastAPI · SQL · AWS',
    readiness: 95,
    expectedCtc: '₹9.0 LPA',
    notice: 'Immediate Joiner',
    photo: PROVIDED_IMAGES.indianCampusSteps,
    stage: 'Technical Round',
    appliedOn: '2 days ago',
    interviewDate: 'Friday, 21 Nov 2026',
    interviewTime: '3:30 PM IST',
    interviewPanel: 'Raghavendra Rao (Principal Architect, Infosys)',
    interviewLink: 'https://meet.hridayam.in/infosys-tech-r2',
    recruiterNotes: 'Strong UPI fraud detection capstone; shortlisted directly for Round 2.',
  },
  {
    id: 'app_2',
    driveId: 'drive_2',
    company: 'Razorpay',
    role: 'Frontend & Full Stack Product Engineer',
    packageLPA: '₹14.0 LPA',
    candidateId: 'cand_1',
    candidateName: 'Shruti Deshpande',
    candidateEmail: 'shruti.d@hridayam.in',
    city: 'Pune, Maharashtra',
    track: 'Data Science & AI Engineering',
    stack: 'Python · SQL · LangChain · Power BI',
    readiness: 96,
    expectedCtc: '₹8.5 LPA',
    notice: 'Immediate Joiner',
    photo: PROVIDED_IMAGES.indianStudentLaptop,
    stage: 'Shortlisted',
    appliedOn: 'Yesterday',
    recruiterNotes: 'Top 5% cohort rank with clean GitHub history.',
  },
  {
    id: 'app_3',
    driveId: 'drive_3',
    company: 'Capgemini',
    role: 'Data Analyst & BI Consultant',
    packageLPA: '₹7.5 LPA',
    candidateId: 'cand_2',
    candidateName: 'Karthik Subramanian',
    candidateEmail: 'karthik.s@hridayam.in',
    city: 'Bengaluru, Karnataka',
    track: 'Full Stack Development (MERN + Java)',
    stack: 'React · TypeScript · Spring Boot · AWS',
    readiness: 94,
    expectedCtc: '₹9.0 LPA',
    notice: 'Immediate Joiner',
    photo: PROVIDED_IMAGES.indianClassroomTeam,
    stage: 'HR Round',
    appliedOn: '3 days ago',
    interviewDate: 'Monday, 24 Nov 2026',
    interviewTime: '11:00 AM IST',
    interviewPanel: 'Sneha Menon (HR Lead)',
    interviewLink: 'https://meet.hridayam.in/capgemini-hr-08',
    recruiterNotes: 'Cleared technical round with 9/10 rating.',
  },
  {
    id: 'app_4',
    driveId: 'drive_5',
    company: 'Deloitte India',
    role: 'Cloud & GenAI Analyst',
    packageLPA: '₹10.5 LPA',
    candidateId: 'cand_3',
    candidateName: 'Meera Nair',
    candidateEmail: 'meera.n@hridayam.in',
    city: 'Mumbai / Thane',
    track: 'Cloud & DevOps Engineering',
    stack: 'AWS · Docker · Kubernetes · Terraform',
    readiness: 93,
    expectedCtc: '₹8.0 LPA',
    notice: '15 Days',
    photo: PROVIDED_IMAGES.indianLibraryGroup,
    stage: 'Offer Issued',
    appliedOn: '5 days ago',
    offerPackage: '₹10.5 LPA (Fixed + Performance Bonus)',
    offerJoiningDate: '15 December 2026',
    recruiterNotes: 'Provisional offer dispatched via Hridayam Placement Desk.',
  },
];

const SEED_ANNOUNCEMENTS: SharedAnnouncement[] = [
  {
    id: 'ann_1',
    title: 'Mega Campus Placement Drive — Infosys, Capgemini & Razorpay (Nov 2026)',
    message: 'Students with 75%+ curriculum progress and an approved capstone can one-click apply under Live Placement Drives. Saturday mock interview clinic starts at 10:30 AM IST.',
    author: 'Prof. Kavita Nair · Placement & Academic Cell',
    audience: 'All Students',
    createdAt: 'Today, 9:00 AM IST',
  },
];

const SEED_ATTENDANCE: CohortAttendanceRecord[] = [
  {
    id: 'att_1',
    studentName: 'Aarav Deshmukh',
    rollNo: 'HRD-STU-2026-4108',
    batch: 'AI-2026-B4 (Pune + Online)',
    city: 'Pune',
    progress: 82,
    attendancePercent: 96,
    todayStatus: 'Present',
  },
  {
    id: 'att_2',
    studentName: 'Ananya Iyer',
    rollNo: 'HRD-STU-2026-4119',
    batch: 'FSD-2026-M2 (Bengaluru)',
    city: 'Bengaluru',
    progress: 88,
    attendancePercent: 94,
    todayStatus: 'Present',
  },
  {
    id: 'att_3',
    studentName: 'Rohan Joshi',
    rollNo: 'HRD-STU-2026-4082',
    batch: 'CLD-2026-T1 (Thane HQ)',
    city: 'Thane',
    progress: 94,
    attendancePercent: 98,
    todayStatus: 'Present',
  },
  {
    id: 'att_4',
    studentName: 'Neha Kulkarni',
    rollNo: 'HRD-STU-2026-4145',
    batch: 'DA-2026-H3 (Hyderabad)',
    city: 'Hyderabad',
    progress: 91,
    attendancePercent: 92,
    todayStatus: 'Late',
  },
  {
    id: 'att_5',
    studentName: 'Siddharth Nair',
    rollNo: 'HRD-STU-2026-4201',
    batch: 'AI-2026-B4 (Mumbai)',
    city: 'Mumbai',
    progress: 74,
    attendancePercent: 86,
    todayStatus: 'Present',
  },
];

const SEED_MOCKS: MockInterviewEval[] = [
  {
    id: 'mock_1',
    studentName: 'Aarav Deshmukh',
    track: 'AI & Full Stack',
    date: '16 Nov 2026',
    dsaScore: 88,
    systemDesignScore: 92,
    communicationScore: 94,
    verdict: 'Strong Hire',
    notes: 'Explained RAG chunking tradeoffs and SQL indexing clearly.',
  },
  {
    id: 'mock_2',
    studentName: 'Ananya Iyer',
    track: 'Full Stack MERN',
    date: '17 Nov 2026',
    dsaScore: 84,
    systemDesignScore: 89,
    communicationScore: 91,
    verdict: 'Placement Ready',
    notes: 'Strong React architecture; practice Redis caching edge cases.',
  },
];

function readStore<T>(key: string, seed: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw);
    return parsed as T;
  } catch {
    return seed;
  }
}

function writeStore<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

const SEED_ASSIGNMENTS: CodingAssignment[] = [
  {
    id: 'asg_1',
    title: 'SQL Window Function — Cohort Retention Query',
    track: 'AI & Data Science',
    difficulty: 'Intermediate',
    dueDate: '24 Nov 2026',
    points: 100,
    prompt: 'Write a SQL query using ROW_NUMBER() or DENSE_RANK() partitioned by city to rank top 3 learners by readiness_score.',
    starterCode: 'SELECT student_name, city, readiness_score,\n  -- add window ranking function here\nFROM cohort_learners;',
    expectedKeyword: 'OVER',
    createdBy: 'Prof. Kavita Nair',
    submissionsCount: 24,
    studentSubmitted: false,
  },
  {
    id: 'asg_2',
    title: 'FastAPI Rate-Limited UPI Fraud Endpoint',
    track: 'Full Stack & AI',
    difficulty: 'Advanced',
    dueDate: '27 Nov 2026',
    points: 120,
    prompt: 'Implement an async FastAPI route that validates transaction amount and returns a JSON risk score dictionary.',
    starterCode: 'async def score_transaction(amount: float, merchant_id: str):\n    # return risk score dictionary\n    pass',
    expectedKeyword: 'return',
    createdBy: 'Prof. Kavita Nair',
    submissionsCount: 19,
    studentSubmitted: true,
    studentScore: 96,
  },
  {
    id: 'asg_3',
    title: 'React Memoized Search Filter Hook',
    track: 'Full Stack Development',
    difficulty: 'Foundation',
    dueDate: '30 Nov 2026',
    points: 80,
    prompt: 'Use useMemo to filter a list of placement drives by city and stack without recalculating on unrelated renders.',
    starterCode: 'const filtered = useMemo(() => {\n  // filter drives by query\n}, [drives, query]);',
    expectedKeyword: 'filter',
    createdBy: 'Siddharth Kulkarni',
    submissionsCount: 31,
    studentSubmitted: false,
  },
];

const SEED_ASSESSMENTS: RecruiterAssessment[] = [
  {
    id: 'test_1',
    title: 'Infosys Specialist Programmer — Python & SQL Screening',
    role: 'Specialist Programmer — AI & Full Stack',
    durationMins: 60,
    passingScore: 75,
    skills: ['Python', 'SQL', 'FastAPI', 'Data Structures'],
    invitedCandidates: ['Aarav Deshmukh', 'Shruti Deshpande', 'Ananya Iyer'],
    status: 'Active',
    createdAt: '2 days ago',
  },
  {
    id: 'test_2',
    title: 'Razorpay React & TypeScript UI Architecture Challenge',
    role: 'Frontend & Full Stack Product Engineer',
    durationMins: 75,
    passingScore: 80,
    skills: ['React', 'TypeScript', 'State Machines', 'Performance'],
    invitedCandidates: ['Karthik Subramanian', 'Ananya Iyer'],
    status: 'Active',
    createdAt: '4 days ago',
  },
];

const SEED_BATCHES: CampusBatchOperation[] = [
  {
    id: 'bat_1',
    batchCode: 'AI-2026-B4',
    campus: 'Pune FC Road Campus',
    track: 'Artificial Intelligence, Machine Learning, and Automation',
    leadMentor: 'Prof. Kavita Nair',
    enrolledSeats: 28,
    maxSeats: 30,
    startDate: '12 Jan 2026',
    mode: 'Hybrid',
    status: 'Placement Phase',
  },
  {
    id: 'bat_2',
    batchCode: 'FSD-2026-M2',
    campus: 'Bengaluru Koramangala Hub',
    track: 'Web, App, and Software Development',
    leadMentor: 'Siddharth Kulkarni',
    enrolledSeats: 24,
    maxSeats: 30,
    startDate: '02 Feb 2026',
    mode: 'Classroom',
    status: 'Running',
  },
  {
    id: 'bat_3',
    batchCode: 'CLD-2026-T1',
    campus: 'Thane West Head Office',
    track: 'Cloud & DevOps Engineering',
    leadMentor: 'Anirudh Deshpande',
    enrolledSeats: 22,
    maxSeats: 25,
    startDate: '18 Nov 2026',
    mode: 'Hybrid',
    status: 'Enrolling',
  },
  {
    id: 'bat_4',
    batchCode: 'DA-2026-H3',
    campus: 'Hyderabad HITEC City',
    track: 'Data Analytics & BI',
    leadMentor: 'Meenakshi Rao',
    enrolledSeats: 26,
    maxSeats: 30,
    startDate: '25 Nov 2026',
    mode: 'Live Online',
    status: 'Enrolling',
  },
];

const SEED_SCHOLARSHIPS: ScholarshipRequest[] = [
  {
    id: 'sch_1',
    studentName: 'Aarav Deshmukh',
    studentEmail: 'student@hridayam.in',
    track: 'Artificial Intelligence, Machine Learning, and Automation',
    type: 'Merit Scholarship (25%)',
    amountINR: 12000,
    reason: '96% cohort attendance & top 5% mock interview score.',
    status: 'Approved',
    submittedOn: '10 Nov 2026',
  },
  {
    id: 'sch_2',
    studentName: 'Ananya Iyer',
    studentEmail: 'ananya.iyer@hridayam.in',
    track: 'Web, App, and Software Development',
    type: 'Women in Tech Grant (20%)',
    amountINR: 9600,
    reason: 'Final-year B.E. graduate transitioning to Full Stack engineering.',
    status: 'Pending Review',
    submittedOn: '17 Nov 2026',
  },
  {
    id: 'sch_3',
    studentName: 'Siddharth Nair',
    studentEmail: 'siddharth.n@hridayam.in',
    track: 'Artificial Intelligence, Machine Learning, and Automation',
    type: '0% EMI Extension',
    amountINR: 6000,
    reason: 'Requesting 6-month zero-cost EMI split for final capstone module.',
    status: 'Pending Review',
    submittedOn: '18 Nov 2026',
  },
];

const SEED_RESUME: StudentResumeProfile = {
  fullName: 'Aarav Deshmukh',
  headline: 'Applied AI & Full Stack Engineer · Python · React · FastAPI · AWS',
  location: 'Pune, Maharashtra (Open to Bengaluru / Mumbai / Hybrid)',
  phone: '+91 98204 51920',
  email: 'student@hridayam.in',
  githubUrl: 'https://github.com/aarav-deshmukh',
  linkedinUrl: 'https://linkedin.com/in/aarav-deshmukh-dev',
  summary:
    'NSDC-certified AI & Full Stack graduate with hands-on experience building low-latency ML inference services, React TypeScript applications, and production PostgreSQL/FastAPI architectures.',
  skills: 'Python, TypeScript, React, FastAPI, SQL, XGBoost, LangChain, Docker, AWS, Tailwind CSS, Git',
  education: 'B.E. Computer Engineering · Savitribai Phule Pune University (2025) · 8.7 CGPA',
  projects:
    '1. UPI Fraud Anomaly Detector (XGBoost + FastAPI, sub-40ms p95 latency, SHAP dashboard)\n2. Multi-Tenant Campus Placement Tracker (React, TypeScript, PostgreSQL, Role-Based Auth)',
};

const SEED_AUDIT_LOG: AdminAuditEvent[] = [
  {
    id: 'aud_1',
    actor: 'Siddharth Menon (Admin)',
    action: 'Approved Merit Scholarship (₹12,000)',
    target: 'Aarav Deshmukh · HRD-STU-2026-4108',
    timestamp: 'Today, 09:40 AM IST',
  },
  {
    id: 'aud_2',
    actor: 'Siddharth Menon (Admin)',
    action: 'Verified Campus Batch Capacity',
    target: 'AI-2026-B4 · Pune FC Road Campus',
    timestamp: 'Yesterday, 06:15 PM IST',
  },
];

export const PortalStore = {
  getCapstones: () => readStore<SharedCapstone[]>(KEYS.CAPSTONES, SEED_CAPSTONES),
  saveCapstones: (items: SharedCapstone[]) => writeStore(KEYS.CAPSTONES, items),

  getDoubts: () => readStore<SharedDoubtTicket[]>(KEYS.DOUBTS, SEED_DOUBTS),
  saveDoubts: (items: SharedDoubtTicket[]) => writeStore(KEYS.DOUBTS, items),

  getSlots: () => readStore<MentorSlotBooking[]>(KEYS.SLOTS, SEED_SLOTS),
  saveSlots: (items: MentorSlotBooking[]) => writeStore(KEYS.SLOTS, items),

  getDrives: () => readStore<SharedHiringDrive[]>(KEYS.DRIVES, SEED_DRIVES),
  saveDrives: (items: SharedHiringDrive[]) => writeStore(KEYS.DRIVES, items),

  getApplications: () => readStore<SharedApplication[]>(KEYS.APPLICATIONS, SEED_APPLICATIONS),
  saveApplications: (items: SharedApplication[]) => writeStore(KEYS.APPLICATIONS, items),

  getAnnouncements: () => readStore<SharedAnnouncement[]>(KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS),
  saveAnnouncements: (items: SharedAnnouncement[]) => writeStore(KEYS.ANNOUNCEMENTS, items),

  getAttendance: () => readStore<CohortAttendanceRecord[]>(KEYS.ATTENDANCE, SEED_ATTENDANCE),
  saveAttendance: (items: CohortAttendanceRecord[]) => writeStore(KEYS.ATTENDANCE, items),

  getMockEvals: () => readStore<MockInterviewEval[]>(KEYS.MOCKS, SEED_MOCKS),
  saveMockEvals: (items: MockInterviewEval[]) => writeStore(KEYS.MOCKS, items),

  getStudentNotes: () => readStore<Record<string, string>>(KEYS.STUDENT_NOTES, {
    '0_0': 'Key takeaway: Configure ESLint + TypeScript strict mode before scaffolding API routes.',
    '0_1': 'Remember to benchmark inference latency using batched inputs before production rollout.',
  }),
  saveStudentNotes: (notes: Record<string, string>) => writeStore(KEYS.STUDENT_NOTES, notes),

  getAssignments: () => readStore<CodingAssignment[]>(KEYS.ASSIGNMENTS, SEED_ASSIGNMENTS),
  saveAssignments: (items: CodingAssignment[]) => writeStore(KEYS.ASSIGNMENTS, items),

  getAssessments: () => readStore<RecruiterAssessment[]>(KEYS.ASSESSMENTS, SEED_ASSESSMENTS),
  saveAssessments: (items: RecruiterAssessment[]) => writeStore(KEYS.ASSESSMENTS, items),

  getBatches: () => readStore<CampusBatchOperation[]>(KEYS.BATCHES, SEED_BATCHES),
  saveBatches: (items: CampusBatchOperation[]) => writeStore(KEYS.BATCHES, items),

  getScholarships: () => readStore<ScholarshipRequest[]>(KEYS.SCHOLARSHIPS, SEED_SCHOLARSHIPS),
  saveScholarships: (items: ScholarshipRequest[]) => writeStore(KEYS.SCHOLARSHIPS, items),

  getResume: () => readStore<StudentResumeProfile>(KEYS.RESUME, SEED_RESUME),
  saveResume: (profile: StudentResumeProfile) => writeStore(KEYS.RESUME, profile),

  getAuditLog: () => readStore<AdminAuditEvent[]>(KEYS.AUDIT_LOG, SEED_AUDIT_LOG),
  saveAuditLog: (items: AdminAuditEvent[]) => writeStore(KEYS.AUDIT_LOG, items),
};

export function exportRowsToCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const escapeCell = (cell: string | number) => {
    const str = String(cell ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  const csv = [headers.map(escapeCell).join(','), ...rows.map((r) => r.map(escapeCell).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
