export type UserRole = 'guest' | 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  enrolledCourseIds: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  subtopics: string[];
  iconName: string;
  colorAccent: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'code' | 'sheet' | 'link';
  url: string;
  size?: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl: string; // real video stream or preview
  isPreview: boolean;
  description: string;
  resources: Resource[];
  order: number;
  transcript?: { time: number; text: string }[];
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  type: 'multiple_choice' | 'true_false';
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  passingScorePercent: number;
  timeLimitMinutes?: number;
  questions: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  previewVideoUrl?: string;
  format?: 'Self-Paced' | 'Cohort-Based' | 'Weekend Intensive';
  shortDescription: string;
  fullDescription: string;
  categoryId: string;
  categoryName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  durationHours: number;
  price: number; // 0 for free
  currency: string;
  discountPercent?: number;
  isFeatured: boolean;
  status: 'published' | 'draft' | 'archived';
  instructor: {
    name: string;
    role: string;
    agency: string;
    avatar: string;
    bio: string;
  };
  learningOutcomes: string[];
  prerequisites: string[];
  modules: Module[];
  quiz?: Quiz;
  hasAssignment?: boolean;
  assignmentPrompt?: string;
  certificateEligible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudentNote {
  id: string;
  lessonId: string;
  lessonTitle: string;
  timestamp: number;
  text: string;
  createdAt: string;
}

export interface Enrolment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  enrolledAt: string;
  completedLessonIds: string[];
  progressPercent: number;
  status: 'active' | 'completed';
  quizAttempts: {
    date: string;
    scorePercent: number;
    passed: boolean;
  }[];
  assignmentSubmission?: {
    submittedAt: string;
    content: string;
    status: 'submitted' | 'reviewed';
    gradePercent?: number;
    feedback?: string;
  };
  certificateId?: string;
  completedAt?: string;
  paymentId?: string;
  paymentAmount?: number;
  notes?: StudentNote[];
}

export interface Certificate {
  id: string; // e.g. HRD-2026-8941
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  categoryName: string;
  issueDate: string;
  instructorName: string;
  verificationCode: string;
  status: 'valid' | 'revoked';
  revocationReason?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  targetRole: string;
  totalDurationHours: number;
  courseIds: string[];
  outcomes: string[];
  badgeColor: string;
}

export interface Announcement {
  id: string;
  message: string;
  linkText?: string;
  linkUrl?: string;
  isPublished: boolean;
  updatedAt: string;
}

export interface PlatformSettings {
  organizationName: string;
  brandTagline: string;
  supportEmail: string;
  supportPhone: string;
  officeAddress: string;
  razorpayKeyId: string;
  razorpayKeySecretConfigured: boolean;
  razorpaySandboxMode: boolean;
  resendApiKeyConfigured: boolean;
  resendSenderDomain: string;
  videoDeliveryMode: 'direct' | 'vimeo' | 'cloudflare';
}

export interface EmailNotification {
  id: string;
  userId: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  category: 'enrolment' | 'payment' | 'certificate' | 'quiz' | 'system';
  previewText: string;
  sentAt: string;
  isRead: boolean;
  metadata?: {
    courseId?: string;
    courseTitle?: string;
    amount?: number;
    paymentId?: string;
    orderId?: string;
    certificateId?: string;
    quizScore?: number;
    verificationCode?: string;
    downloadUrl?: string;
  };
}

