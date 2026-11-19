export const BELVO_CATEGORIES = [
  'Tech, AI & Product Lab',
  'Design, Studio & Spatial Craft',
  'Growth, Marketing & Creator Economy',
  'Business, Startup & Leadership',
  'Finance, Accounting & Tax Mastery',
  'Career Acceleration & Communication',
] as const;

export type BelvoCategory = (typeof BELVO_CATEGORIES)[number] | string;

export type AuthRole = 'student' | 'mentor' | 'recruiter' | 'admin';

export type AppView =
  | 'home'
  | 'placements'
  | 'refer-earn'
  | 'contact'
  | 'hire-from-us'
  | 'centers'
  | 'reviews'
  | 'catalogue'
  | 'course'
  | 'student'
  | 'mentor-portal'
  | 'recruiter-portal'
  | 'instructor'
  | 'portal-login'
  | 'admin-login'
  | 'student-login'
  | 'mentor-login'
  | 'recruiter-login';

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseStatus = 'draft' | 'published' | 'archived';
export type LessonType = 'video' | 'reading' | 'assignment' | 'quiz';
export type PaymentType = 'free' | 'one_time' | 'subscription';
export type EnquiryType =
  | 'course_enquiry'
  | 'corporate_training'
  | 'university_partnership'
  | 'instructor_application';

export interface DemoAccount {
  id: string;
  role: AuthRole;
  roleLabel: string;
  email: string;
  password: string;
  displayName: string;
  title: string;
  campus: string;
  badgeCode: string;
  description: string;
  defaultView: AppView;
}

export interface UserPublicProfile {
  uid: string;
  displayName: string;
  headline?: string;
  photoURL?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface UserPrivateInfo {
  uid: string;
  email: string;
  phone?: string;
  organization?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: CourseLevel;
  summary: string;
  description: string;
  price: number;
  currency: 'USD' | 'INR';
  isFree: boolean;
  includedInSubscription: boolean;
  durationHours: number;
  thumbnailUrl: string;
  instructorId: string;
  instructorName: string;
  status: CourseStatus;
  outcomes: string[];
  modulesCount: number;
  enrolledCount: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Lesson {
  id: string;
  courseId: string;
  instructorId: string;
  isPublished: boolean;
  orderIndex: number;
  title: string;
  type: LessonType;
  durationMinutes: number;
  videoUrl?: string;
  materialUrl?: string;
  contentSummary: string;
  quizQuestion?: string;
  quizOptions?: string[];
  quizCorrectIndex?: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Enrolment {
  id: string;
  userId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  instructorId: string;
  paymentType: PaymentType;
  amountPaid: number;
  paymentStatus: 'completed' | 'pending';
  completedLessonIds: string[];
  progressPercent: number;
  status: 'active' | 'completed';
  certificateId?: string;
  enrolledAt?: unknown;
  updatedAt?: unknown;
}

export interface Certificate {
  id: string;
  certificateCode: string;
  userId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  issuedAt?: unknown;
  createdAt?: unknown;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: 'starter_monthly' | 'pro_annual' | 'enterprise_team';
  planName: string;
  billingCycle: 'monthly' | 'annual';
  amount: number;
  currency: 'USD' | 'INR';
  paymentMethodLast4: string;
  status: 'active' | 'cancelled';
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Enquiry {
  id: string;
  enquiryType: EnquiryType;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  courseInterest?: string;
  message: string;
  userId?: string;
  status: 'new' | 'reviewed' | 'resolved';
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CallbackLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  courseInterest: string;
  cityOrCenter?: string;
  status: 'new' | 'contacted' | 'counseled' | 'enrolled' | string;
  createdAt: string;
}

export interface ReferralSubmission {
  id: string;
  referrerName: string;
  referrerPhone: string;
  referrerEmail: string;
  referrerRole: string;
  friendName: string;
  friendPhone: string;
  friendEmail: string;
  interestedCourse: string;
  preferredCenter: string;
  rewardStatus: string;
  voucherCode: string;
  referralCode: string;
  createdAt: string;
}
