import { Category, Course, Enrolment, Certificate, LearningPath, Announcement, PlatformSettings, StudentNote, EmailNotification, EnquiryLead } from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_COURSES,
  INITIAL_ENROLMENTS,
  INITIAL_CERTIFICATES,
  INITIAL_LEARNING_PATHS,
  INITIAL_ANNOUNCEMENT,
  INITIAL_SETTINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ENQUIRIES
} from '../data/initialData';

const STORAGE_KEYS = {
  CATEGORIES: 'hridayam_categories_v2',
  COURSES: 'hridayam_courses_v2',
  ENROLMENTS: 'hridayam_enrolments_v2',
  CERTIFICATES: 'hridayam_certificates_v2',
  LEARNING_PATHS: 'hridayam_learning_paths_v2',
  ANNOUNCEMENT: 'hridayam_announcement_v2',
  SETTINGS: 'hridayam_settings_v2',
  NOTIFICATIONS: 'hridayam_notifications_v2',
  ENQUIRIES: 'hridayam_enquiries_v2',
};

function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item) as T;
    // If it's an array and empty, return fallback
    if (Array.isArray(parsed) && parsed.length === 0 && Array.isArray(fallback) && fallback.length > 0) {
      return fallback;
    }
    return parsed;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

// ----------------- Storage Service -----------------
export const storageService = {
  // ----------------- Categories -----------------
  getCategories(): Category[] {
    return getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  saveCategory(category: Category): void {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => c.id === category.id);
    if (index >= 0) {
      categories[index] = category;
    } else {
      categories.push(category);
    }
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
  },

  deleteCategory(id: string): void {
    const categories = this.getCategories().filter((c) => c.id !== id);
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
  },

  // ----------------- Courses -----------------
  getCourses(): Course[] {
    const courses = getFromStorage<Course[]>(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    // Ensure all initial courses exist and have valid thumbnails
    if (courses.length < INITIAL_COURSES.length || courses.some((c) => !c.thumbnail)) {
      saveToStorage(STORAGE_KEYS.COURSES, INITIAL_COURSES);
      return INITIAL_COURSES;
    }
    return courses;
  },

  getCourseById(id: string): Course | undefined {
    return this.getCourses().find((c) => c.id === id);
  },

  getCourseBySlug(slug: string): Course | undefined {
    return this.getCourses().find((c) => c.slug === slug);
  },

  saveCourse(course: Course): void {
    const courses = this.getCourses();
    const index = courses.findIndex((c) => c.id === course.id);
    if (index >= 0) {
      courses[index] = { ...course, updatedAt: new Date().toISOString() };
    } else {
      courses.unshift({
        ...course,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    saveToStorage(STORAGE_KEYS.COURSES, courses);
  },

  deleteCourse(id: string): void {
    const courses = this.getCourses().filter((c) => c.id !== id);
    saveToStorage(STORAGE_KEYS.COURSES, courses);
  },

  // ----------------- Enrolments & Progress -----------------
  getEnrolments(userId?: string): Enrolment[] {
    const enrolments = getFromStorage<Enrolment[]>(STORAGE_KEYS.ENROLMENTS, INITIAL_ENROLMENTS);
    if (userId) {
      return enrolments.filter((e) => e.userId === userId);
    }
    return enrolments;
  },

  getEnrolment(userId: string, courseId: string): Enrolment | undefined {
    return this.getEnrolments().find((e) => e.userId === userId && e.courseId === courseId);
  },

  enrolInCourse(userId: string, userName: string, userEmail: string, courseId: string, paymentId?: string, paymentAmount?: number): Enrolment {
    const enrolments = this.getEnrolments();
    const existing = enrolments.find((e) => e.userId === userId && e.courseId === courseId);
    if (existing) {
      if (paymentId) {
        existing.paymentId = paymentId;
        existing.paymentAmount = paymentAmount;
        saveToStorage(STORAGE_KEYS.ENROLMENTS, enrolments);
      }
      return existing;
    }

    const course = this.getCourseById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const newEnrolment: Enrolment = {
      id: `enrol-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      userName,
      userEmail,
      courseId,
      courseTitle: course.title,
      enrolledAt: new Date().toISOString(),
      completedLessonIds: [],
      progressPercent: 0,
      status: 'active',
      quizAttempts: [],
      paymentId,
      paymentAmount,
      notes: []
    };

    enrolments.unshift(newEnrolment);
    saveToStorage(STORAGE_KEYS.ENROLMENTS, enrolments);

    // 1. Send Enrolment Confirmation Notification & Email
    this.sendNotification({
      userId,
      recipientEmail: userEmail,
      recipientName: userName,
      subject: `🎉 Enrolment Confirmed: ${course.title}`,
      category: 'enrolment',
      previewText: `Welcome to Hridayam by Belvo! Your access to ${course.title} is now active.`,
      metadata: {
        courseId: course.id,
        courseTitle: course.title,
        amount: paymentAmount || 0,
        paymentId
      }
    });

    // 2. If Paid Course, send Tax Invoice / Payment Receipt
    if (paymentId && paymentAmount && paymentAmount > 0) {
      this.sendNotification({
        userId,
        recipientEmail: userEmail,
        recipientName: userName,
        subject: `💳 Official Tax Invoice & Payment Receipt: ${course.title}`,
        category: 'payment',
        previewText: `Payment of ₹${paymentAmount.toLocaleString('en-IN')} received. Transaction ID: ${paymentId}`,
        metadata: {
          courseId: course.id,
          courseTitle: course.title,
          amount: paymentAmount,
          paymentId,
          orderId: `order_${Date.now().toString(36)}`
        }
      });
    }

    // 3. Notify Admin regarding new enrolment
    this.sendNotification({
      userId: 'user-admin-1',
      recipientEmail: 'admin@belvo.com',
      recipientName: 'Belvo Platform Administrator',
      subject: `📊 Platform Activity: ${userName} enrolled in ${course.title}`,
      category: 'system',
      previewText: `New student registration for ${course.title} (${paymentId ? `₹${paymentAmount}` : 'Free Course'}).`,
      metadata: {
        courseId: course.id,
        courseTitle: course.title,
        amount: paymentAmount || 0
      }
    });

    return newEnrolment;
  },

  markLessonComplete(userId: string, courseId: string, lessonId: string): Enrolment {
    const enrolments = this.getEnrolments();
    const index = enrolments.findIndex((e) => e.userId === userId && e.courseId === courseId);
    if (index === -1) {
      throw new Error('Enrolment not found');
    }

    const enrolment = enrolments[index];
    const completedSet = new Set(enrolment.completedLessonIds);
    completedSet.add(lessonId);
    enrolment.completedLessonIds = Array.from(completedSet);

    // Calculate total lessons in course
    const course = this.getCourseById(courseId);
    let totalLessons = 1;
    if (course && course.modules) {
      totalLessons = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
    }

    const progress = Math.min(100, Math.round((enrolment.completedLessonIds.length / totalLessons) * 100));
    enrolment.progressPercent = progress;

    if (progress === 100 && enrolment.status !== 'completed') {
      enrolment.status = 'completed';
      enrolment.completedAt = new Date().toISOString();

      // Check if certificate should be issued
      const quizPassed = enrolment.quizAttempts.some((q) => q.passed);
      if (course?.certificateEligible && (quizPassed || !course.quiz)) {
        const cert = this.issueCertificate(userId, enrolment.userName, courseId);
        enrolment.certificateId = cert.id;
      }
    }

    enrolments[index] = enrolment;
    saveToStorage(STORAGE_KEYS.ENROLMENTS, enrolments);
    return enrolment;
  },

  submitQuizAttempt(userId: string, courseId: string, scorePercent: number, passed: boolean): Enrolment {
    const enrolments = this.getEnrolments();
    const index = enrolments.findIndex((e) => e.userId === userId && e.courseId === courseId);
    if (index === -1) throw new Error('Enrolment not found');

    const enrolment = enrolments[index];
    enrolment.quizAttempts.unshift({
      date: new Date().toISOString(),
      scorePercent,
      passed
    });

    const course = this.getCourseById(courseId);
    if (passed && enrolment.progressPercent === 100 && !enrolment.certificateId && course?.certificateEligible) {
      const cert = this.issueCertificate(userId, enrolment.userName, courseId);
      enrolment.certificateId = cert.id;
      enrolment.status = 'completed';
      enrolment.completedAt = enrolment.completedAt || new Date().toISOString();
    }

    enrolments[index] = enrolment;
    saveToStorage(STORAGE_KEYS.ENROLMENTS, enrolments);

    // Send Quiz Result Notification
    this.sendNotification({
      userId,
      recipientEmail: enrolment.userEmail,
      recipientName: enrolment.userName,
      subject: passed
        ? `🎯 Assessment Passed: ${course?.title || 'Course'} (${scorePercent}%)`
        : `📝 Assessment Completed: ${course?.title || 'Course'} (${scorePercent}%)`,
      category: 'quiz',
      previewText: passed
        ? `Congratulations! You scored ${scorePercent}% and passed the final curriculum evaluation.`
        : `You achieved ${scorePercent}%. Review course modules and retake whenever ready.`,
      metadata: {
        courseId,
        courseTitle: course?.title,
        quizScore: scorePercent
      }
    });

    return enrolment;
  },

  submitAssignment(userId: string, courseId: string, content: string): Enrolment {
    const enrolments = this.getEnrolments();
    const index = enrolments.findIndex((e) => e.userId === userId && e.courseId === courseId);
    if (index === -1) throw new Error('Enrolment not found');

    const enrolment = enrolments[index];
    enrolment.assignmentSubmission = {
      submittedAt: new Date().toISOString(),
      content,
      status: 'submitted'
    };

    enrolments[index] = enrolment;
    saveToStorage(STORAGE_KEYS.ENROLMENTS, enrolments);
    return enrolment;
  },

  reviewAssignment(enrolmentId: string, gradePercent: number, feedback: string): Enrolment {
    const enrolments = this.getEnrolments();
    const index = enrolments.findIndex((e) => e.id === enrolmentId);
    if (index === -1) throw new Error('Enrolment not found');

    const enrolment = enrolments[index];
    if (enrolment.assignmentSubmission) {
      enrolment.assignmentSubmission.status = 'reviewed';
      enrolment.assignmentSubmission.gradePercent = gradePercent;
      enrolment.assignmentSubmission.feedback = feedback;
    }

    enrolments[index] = enrolment;
    saveToStorage(STORAGE_KEYS.ENROLMENTS, enrolments);
    return enrolment;
  },

  // ----------------- Notes System -----------------
  addNote(userId: string, courseId: string, lessonId: string, lessonTitle: string, timestamp: number, text: string): StudentNote {
    const enrolments = this.getEnrolments();
    const index = enrolments.findIndex((e) => e.userId === userId && e.courseId === courseId);
    if (index === -1) throw new Error('Enrolment not found');

    const newNote: StudentNote = {
      id: `note-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      lessonId,
      lessonTitle,
      timestamp,
      text,
      createdAt: new Date().toISOString()
    };

    if (!enrolments[index].notes) {
      enrolments[index].notes = [];
    }
    enrolments[index].notes!.unshift(newNote);
    saveToStorage(STORAGE_KEYS.ENROLMENTS, enrolments);
    return newNote;
  },

  getNotes(userId: string, courseId: string): StudentNote[] {
    const enrolment = this.getEnrolment(userId, courseId);
    return enrolment?.notes || [];
  },

  deleteNote(userId: string, courseId: string, noteId: string): void {
    const enrolments = this.getEnrolments();
    const index = enrolments.findIndex((e) => e.userId === userId && e.courseId === courseId);
    if (index >= 0 && enrolments[index].notes) {
      enrolments[index].notes = enrolments[index].notes!.filter((n) => n.id !== noteId);
      saveToStorage(STORAGE_KEYS.ENROLMENTS, enrolments);
    }
  },

  // ----------------- Certificates -----------------
  getCertificates(): Certificate[] {
    return getFromStorage<Certificate[]>(STORAGE_KEYS.CERTIFICATES, INITIAL_CERTIFICATES);
  },

  getCertificateById(id: string): Certificate | undefined {
    return this.getCertificates().find((c) => c.id.toUpperCase() === id.trim().toUpperCase());
  },

  issueCertificate(userId: string, userName: string, courseId: string): Certificate {
    const certificates = this.getCertificates();
    const existing = certificates.find((c) => c.userId === userId && c.courseId === courseId);
    if (existing) return existing;

    const course = this.getCourseById(courseId);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCert: Certificate = {
      id: `HRD-2026-${randomSuffix}`,
      userId,
      userName,
      courseId,
      courseTitle: course?.title || 'Certified Course',
      categoryName: course?.categoryName || 'Professional Skill Track',
      issueDate: new Date().toISOString().split('T')[0],
      instructorName: course?.instructor.name || 'Belvo Faculty',
      verificationCode: `VERIFIED-HRD-${randomSuffix}-BELVO-AUTH`,
      status: 'valid'
    };

    certificates.unshift(newCert);
    saveToStorage(STORAGE_KEYS.CERTIFICATES, certificates);

    // Send Certificate Issuance Notification & Transactional Email
    const enrolment = this.getEnrolment(userId, courseId);
    this.sendNotification({
      userId,
      recipientEmail: enrolment?.userEmail || 'student@hridayam.belvo.com',
      recipientName: userName,
      subject: `📜 Official Belvo Certificate Issued: ${newCert.id}`,
      category: 'certificate',
      previewText: `Congratulations! Your authenticated credential for ${newCert.courseTitle} has been verified and registered.`,
      metadata: {
        courseId,
        courseTitle: newCert.courseTitle,
        certificateId: newCert.id,
        verificationCode: newCert.verificationCode
      }
    });

    return newCert;
  },

  revokeCertificate(certificateId: string, reason: string): void {
    const certificates = this.getCertificates();
    const index = certificates.findIndex((c) => c.id === certificateId);
    if (index >= 0) {
      certificates[index].status = 'revoked';
      certificates[index].revocationReason = reason;
      saveToStorage(STORAGE_KEYS.CERTIFICATES, certificates);
    }
  },

  // ----------------- Notifications & Transactional Emails -----------------
  getNotifications(userId?: string): EmailNotification[] {
    const notifications = getFromStorage<EmailNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    if (userId) {
      return notifications.filter((n) => n.userId === userId);
    }
    return notifications;
  },

  sendNotification(notification: Omit<EmailNotification, 'id' | 'sentAt' | 'isRead'>): EmailNotification {
    const notifications = this.getNotifications();
    const newNotif: EmailNotification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sentAt: new Date().toISOString(),
      isRead: false
    };
    notifications.unshift(newNotif);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
    return newNotif;
  },

  markNotificationRead(id: string): void {
    const notifications = this.getNotifications();
    const index = notifications.findIndex((n) => n.id === id);
    if (index >= 0) {
      notifications[index].isRead = true;
      saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
    }
  },

  markAllNotificationsRead(userId: string): void {
    const notifications = this.getNotifications();
    notifications.forEach((n) => {
      if (n.userId === userId) {
        n.isRead = true;
      }
    });
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  },

  deleteNotification(id: string): void {
    const notifications = this.getNotifications().filter((n) => n.id !== id);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  },

  // ----------------- Learning Paths -----------------
  getLearningPaths(): LearningPath[] {
    return getFromStorage<LearningPath[]>(STORAGE_KEYS.LEARNING_PATHS, INITIAL_LEARNING_PATHS);
  },

  // ----------------- Announcement -----------------
  getAnnouncement(): Announcement {
    return getFromStorage<Announcement>(STORAGE_KEYS.ANNOUNCEMENT, INITIAL_ANNOUNCEMENT);
  },

  saveAnnouncement(announcement: Announcement): void {
    saveToStorage(STORAGE_KEYS.ANNOUNCEMENT, announcement);
  },

  // ----------------- Settings -----------------
  getSettings(): PlatformSettings {
    return getFromStorage<PlatformSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  saveSettings(settings: PlatformSettings): void {
    saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  },

  // ----------------- Enquiries / Admissions Leads -----------------
  getEnquiries(): EnquiryLead[] {
    return getFromStorage<EnquiryLead[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  },

  saveEnquiry(enquiry: Omit<EnquiryLead, 'id' | 'submittedAt' | 'status'>): EnquiryLead {
    const enquiries = this.getEnquiries();
    const newLead: EnquiryLead = {
      ...enquiry,
      id: `ENQ-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    enquiries.unshift(newLead);
    saveToStorage(STORAGE_KEYS.ENQUIRIES, enquiries);

    // Send high-priority notification to platform administrator
    this.sendNotification({
      userId: 'user-admin-1',
      recipientEmail: 'admissions@hridayam.belvo.com',
      recipientName: 'Hridayam Admissions Faculty',
      subject: `🎯 New Admissions Enquiry: ${newLead.fullName} (${newLead.areaOfInterest})`,
      category: 'system',
      previewText: `${newLead.fullName} (${newLead.currentStatus}) submitted an enquiry for ${newLead.areaOfInterest}. Phone: ${newLead.phone} | Email: ${newLead.email}`,
      metadata: {
        orderId: newLead.id
      }
    });

    return newLead;
  },

  updateEnquiryStatus(id: string, status: EnquiryLead['status']): void {
    const enquiries = this.getEnquiries();
    const index = enquiries.findIndex((e) => e.id === id);
    if (index >= 0) {
      enquiries[index].status = status;
      saveToStorage(STORAGE_KEYS.ENQUIRIES, enquiries);
    }
  },

  // ----------------- Reset -----------------
  resetAll(): void {
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.ENROLMENTS);
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATES);
    localStorage.removeItem(STORAGE_KEYS.LEARNING_PATHS);
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENT);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
  }
};
