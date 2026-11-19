import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from './firebase';
import { SEED_COURSES } from '../data/catalogSeed';
import {
  Certificate,
  Course,
  Enquiry,
  EnquiryType,
  Enrolment,
  Lesson,
  PaymentType,
  Subscription,
  UserPrivateInfo,
} from '../types';

function clampStr(value: string | undefined, max: number): string {
  return (value ?? '').trim().slice(0, max);
}

function sanitizeId(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
  return cleaned || `id_${Date.now()}`;
}

export function subscribePublishedCourses(
  onData: (courses: Course[]) => void,
  onError?: (err: Error) => void
) {
  const q = query(collection(db, 'courses'), where('status', '==', 'published'));
  return onSnapshot(
    q,
    (snap) => {
      const items: Course[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Course, 'id'>),
      }));
      onData(items);
    },
    (error) => {
      if (onError) onError(error);
      else handleFirestoreError(error, OperationType.LIST, 'courses');
    }
  );
}

export function subscribeInstructorCourses(
  instructorId: string,
  isAdmin: boolean,
  onData: (courses: Course[]) => void
) {
  const q = isAdmin
    ? query(collection(db, 'courses'))
    : query(collection(db, 'courses'), where('instructorId', '==', instructorId));
  return onSnapshot(
    q,
    (snap) => {
      const items: Course[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Course, 'id'>),
      }));
      onData(items);
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'courses')
  );
}

export async function fetchLessonsForCourse(courseId: string, includeUnpublished = false): Promise<Lesson[]> {
  const path = `courses/${courseId}/lessons`;
  try {
    const q = includeUnpublished
      ? query(collection(db, path), orderBy('orderIndex', 'asc'))
      : query(collection(db, path), where('isPublished', '==', true));
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Lesson, 'id'>),
    }));
    return list.sort((a, b) => a.orderIndex - b.orderIndex);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function seedStarterCatalogToFirestore(user: User, isAdmin: boolean): Promise<number> {
  let count = 0;
  for (const item of SEED_COURSES) {
    const courseRef = doc(db, 'courses', item.id);
    try {
      const existing = await getDoc(courseRef);
      if (existing.exists()) continue;

      const batch = writeBatch(db);
      const effectiveInstructorId = isAdmin ? item.instructorId : user.uid;

      batch.set(courseRef, {
        title: clampStr(item.title, 140),
        category: clampStr(item.category, 100),
        level: item.level,
        summary: clampStr(item.summary, 300),
        description: clampStr(item.description, 3000),
        price: item.price,
        currency: item.currency,
        isFree: item.isFree,
        includedInSubscription: item.includedInSubscription,
        durationHours: item.durationHours,
        thumbnailUrl: clampStr(item.thumbnailUrl, 500),
        instructorId: effectiveInstructorId,
        instructorName: clampStr(item.instructorName, 100),
        status: 'published',
        outcomes: item.outcomes.slice(0, 10),
        modulesCount: item.lessons.length,
        enrolledCount: item.enrolledCount,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      for (const lesson of item.lessons) {
        const lessonRef = doc(db, `courses/${item.id}/lessons`, lesson.id);
        const lessonPayload: Record<string, unknown> = {
          courseId: item.id,
          instructorId: effectiveInstructorId,
          isPublished: true,
          orderIndex: lesson.orderIndex,
          title: clampStr(lesson.title, 140),
          type: lesson.type,
          durationMinutes: lesson.durationMinutes,
          contentSummary: clampStr(lesson.contentSummary, 2000),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        if (lesson.videoUrl) lessonPayload.videoUrl = clampStr(lesson.videoUrl, 500);
        if (lesson.materialUrl) lessonPayload.materialUrl = clampStr(lesson.materialUrl, 500);
        if (lesson.quizQuestion) lessonPayload.quizQuestion = clampStr(lesson.quizQuestion, 300);
        if (lesson.quizOptions) lessonPayload.quizOptions = lesson.quizOptions.slice(0, 5);
        if (typeof lesson.quizCorrectIndex === 'number') {
          lessonPayload.quizCorrectIndex = lesson.quizCorrectIndex;
        }
        batch.set(lessonRef, lessonPayload);
      }

      await batch.commit();
      count++;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `courses/${item.id}`);
    }
  }
  return count;
}

export async function ensureStarterCourseInFirestore(
  course: Course,
  user: User,
  isAdmin: boolean
): Promise<Course> {
  const courseRef = doc(db, 'courses', course.id);
  try {
    const snap = await getDoc(courseRef);
    if (snap.exists()) {
      return { id: snap.id, ...(snap.data() as Omit<Course, 'id'>) };
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `courses/${course.id}`);
  }

  const seedMatch = SEED_COURSES.find((c) => c.id === course.id);
  const effectiveInstructorId = isAdmin ? course.instructorId : user.uid;
  const batch = writeBatch(db);

  batch.set(courseRef, {
    title: clampStr(course.title, 140),
    category: clampStr(course.category, 100),
    level: course.level,
    summary: clampStr(course.summary, 300),
    description: clampStr(course.description, 3000),
    price: course.price,
    currency: course.currency,
    isFree: course.isFree,
    includedInSubscription: course.includedInSubscription,
    durationHours: course.durationHours,
    thumbnailUrl: clampStr(course.thumbnailUrl, 500),
    instructorId: effectiveInstructorId,
    instructorName: clampStr(course.instructorName, 100),
    status: 'published',
    outcomes: course.outcomes.slice(0, 10),
    modulesCount: seedMatch ? seedMatch.lessons.length : course.modulesCount,
    enrolledCount: course.enrolledCount,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  if (seedMatch) {
    for (const lesson of seedMatch.lessons) {
      const lessonRef = doc(db, `courses/${course.id}/lessons`, lesson.id);
      const lessonPayload: Record<string, unknown> = {
        courseId: course.id,
        instructorId: effectiveInstructorId,
        isPublished: true,
        orderIndex: lesson.orderIndex,
        title: clampStr(lesson.title, 140),
        type: lesson.type,
        durationMinutes: lesson.durationMinutes,
        contentSummary: clampStr(lesson.contentSummary, 2000),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      if (lesson.videoUrl) lessonPayload.videoUrl = clampStr(lesson.videoUrl, 500);
      if (lesson.materialUrl) lessonPayload.materialUrl = clampStr(lesson.materialUrl, 500);
      if (lesson.quizQuestion) lessonPayload.quizQuestion = clampStr(lesson.quizQuestion, 300);
      if (lesson.quizOptions) lessonPayload.quizOptions = lesson.quizOptions.slice(0, 5);
      if (typeof lesson.quizCorrectIndex === 'number') {
        lessonPayload.quizCorrectIndex = lesson.quizCorrectIndex;
      }
      batch.set(lessonRef, lessonPayload);
    }
  }

  try {
    await batch.commit();
    return { ...course, instructorId: effectiveInstructorId };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `courses/${course.id}`);
  }
}

export async function saveCourse(
  user: User,
  courseInput: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'enrolledCount' | 'modulesCount'> & {
    id?: string;
    modulesCount?: number;
    enrolledCount?: number;
  }
): Promise<string> {
  const courseId = sanitizeId(courseInput.id || `course_${Date.now()}`);
  const ref = doc(db, 'courses', courseId);
  const isNew = !courseInput.id;

  try {
    if (isNew) {
      await setDoc(ref, {
        title: clampStr(courseInput.title, 140),
        category: clampStr(courseInput.category, 100),
        level: courseInput.level,
        summary: clampStr(courseInput.summary, 300),
        description: clampStr(courseInput.description, 3000),
        price: Number(courseInput.price) || 0,
        currency: courseInput.currency,
        isFree: Boolean(courseInput.isFree),
        includedInSubscription: Boolean(courseInput.includedInSubscription),
        durationHours: Math.max(1, Number(courseInput.durationHours) || 1),
        thumbnailUrl: clampStr(courseInput.thumbnailUrl, 500),
        instructorId: user.uid,
        instructorName: clampStr(courseInput.instructorName || user.displayName || 'Belvo Instructor', 100),
        status: courseInput.status,
        outcomes: (courseInput.outcomes || []).slice(0, 10).map((o) => clampStr(o, 200)),
        modulesCount: courseInput.modulesCount ?? 0,
        enrolledCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(ref, {
        title: clampStr(courseInput.title, 140),
        category: clampStr(courseInput.category, 100),
        level: courseInput.level,
        summary: clampStr(courseInput.summary, 300),
        description: clampStr(courseInput.description, 3000),
        price: Number(courseInput.price) || 0,
        currency: courseInput.currency,
        isFree: Boolean(courseInput.isFree),
        includedInSubscription: Boolean(courseInput.includedInSubscription),
        durationHours: Math.max(1, Number(courseInput.durationHours) || 1),
        thumbnailUrl: clampStr(courseInput.thumbnailUrl, 500),
        instructorName: clampStr(courseInput.instructorName, 100),
        status: courseInput.status,
        outcomes: (courseInput.outcomes || []).slice(0, 10).map((o) => clampStr(o, 200)),
        modulesCount: courseInput.modulesCount ?? 0,
        updatedAt: serverTimestamp(),
      });
    }
    return courseId;
  } catch (error) {
    handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, `courses/${courseId}`);
  }
}

export async function removeCourse(courseId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'courses', courseId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `courses/${courseId}`);
  }
}

export async function saveLesson(
  course: Course,
  lessonInput: Omit<Lesson, 'id' | 'courseId' | 'instructorId' | 'createdAt' | 'updatedAt'> & { id?: string }
): Promise<string> {
  const lessonId = sanitizeId(lessonInput.id || `lesson_${Date.now()}`);
  const ref = doc(db, `courses/${course.id}/lessons`, lessonId);
  const isNew = !lessonInput.id;

  const payload: Record<string, unknown> = {
    isPublished: Boolean(lessonInput.isPublished),
    orderIndex: Math.max(1, Number(lessonInput.orderIndex) || 1),
    title: clampStr(lessonInput.title, 140),
    type: lessonInput.type,
    durationMinutes: Math.max(1, Number(lessonInput.durationMinutes) || 10),
    contentSummary: clampStr(lessonInput.contentSummary, 2000),
    updatedAt: serverTimestamp(),
  };

  if (lessonInput.videoUrl?.trim()) payload.videoUrl = clampStr(lessonInput.videoUrl, 500);
  if (lessonInput.materialUrl?.trim()) payload.materialUrl = clampStr(lessonInput.materialUrl, 500);
  if (lessonInput.quizQuestion?.trim()) payload.quizQuestion = clampStr(lessonInput.quizQuestion, 300);
  if (lessonInput.quizOptions && lessonInput.quizOptions.length > 0) {
    payload.quizOptions = lessonInput.quizOptions.slice(0, 5).map((opt) => clampStr(opt, 160));
  }
  if (typeof lessonInput.quizCorrectIndex === 'number') {
    payload.quizCorrectIndex = lessonInput.quizCorrectIndex;
  }

  try {
    if (isNew) {
      await setDoc(ref, {
        ...payload,
        courseId: course.id,
        instructorId: course.instructorId,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, 'courses', course.id), {
        modulesCount: (course.modulesCount || 0) + 1,
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(ref, payload);
    }
    return lessonId;
  } catch (error) {
    handleFirestoreError(
      error,
      isNew ? OperationType.CREATE : OperationType.UPDATE,
      `courses/${course.id}/lessons/${lessonId}`
    );
  }
}

export async function enrolStudentInCourse(
  user: User,
  isAdmin: boolean,
  course: Course,
  paymentType: PaymentType,
  amountPaid: number
): Promise<Enrolment> {
  const syncedCourse = await ensureStarterCourseInFirestore(course, user, isAdmin);
  const enrolmentId = `${user.uid}_${syncedCourse.id}`;
  const enrolmentRef = doc(db, 'enrolments', enrolmentId);

  try {
    const existing = await getDoc(enrolmentRef);
    if (existing.exists()) {
      return { id: existing.id, ...(existing.data() as Omit<Enrolment, 'id'>) };
    }

    const batch = writeBatch(db);
    const newRecord = {
      userId: user.uid,
      studentName: clampStr(user.displayName || user.email?.split('@')[0] || 'Student', 100),
      courseId: syncedCourse.id,
      courseTitle: clampStr(syncedCourse.title, 140),
      instructorId: syncedCourse.instructorId,
      paymentType,
      amountPaid,
      paymentStatus: 'completed' as const,
      completedLessonIds: [] as string[],
      progressPercent: 0,
      status: 'active' as const,
      enrolledAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    batch.set(enrolmentRef, newRecord);
    batch.update(doc(db, 'courses', syncedCourse.id), {
      enrolledCount: increment(1),
      updatedAt: serverTimestamp(),
    });

    await batch.commit();
    return {
      id: enrolmentId,
      ...newRecord,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `enrolments/${enrolmentId}`);
  }
}

export function subscribeStudentEnrolments(
  userId: string,
  onData: (enrolments: Enrolment[]) => void
) {
  const q = query(collection(db, 'enrolments'), where('userId', '==', userId));
  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Enrolment, 'id'>),
        }))
      );
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'enrolments')
  );
}

export function subscribeAllEnrolmentsForInstructorOrAdmin(
  userId: string,
  isAdmin: boolean,
  onData: (enrolments: Enrolment[]) => void
) {
  const q = isAdmin
    ? query(collection(db, 'enrolments'))
    : query(collection(db, 'enrolments'), where('instructorId', '==', userId));
  return onSnapshot(
    q,
    (snap) => {
      onData(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Enrolment, 'id'>),
        }))
      );
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'enrolments')
  );
}

export async function updateEnrolmentProgress(
  enrolment: Enrolment,
  completedLessonIds: string[],
  totalLessons: number
): Promise<void> {
  const safeTotal = Math.max(1, totalLessons);
  const progressPercent = Math.min(100, Math.round((completedLessonIds.length / safeTotal) * 100));
  const nextStatus = progressPercent === 100 ? 'completed' : 'active';
  const ref = doc(db, 'enrolments', enrolment.id);

  try {
    await updateDoc(ref, {
      completedLessonIds: completedLessonIds.slice(0, 200),
      progressPercent,
      status: nextStatus,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `enrolments/${enrolment.id}`);
  }
}

export async function issueCertificateForEnrolment(
  user: User,
  enrolment: Enrolment,
  instructorName: string
): Promise<Certificate> {
  const certId = `cert_${user.uid}_${enrolment.courseId}`.slice(0, 120);
  const certRef = doc(db, 'certificates', certId);
  const code = `HB-${enrolment.courseId.slice(7, 13).toUpperCase()}-${user.uid.slice(0, 6).toUpperCase()}`.replace(
    /[^A-Z0-9-]/g,
    'X'
  );

  try {
    const existing = await getDoc(certRef);
    if (existing.exists()) {
      return { id: existing.id, ...(existing.data() as Omit<Certificate, 'id'>) };
    }

    const payload = {
      certificateCode: code,
      userId: user.uid,
      studentName: clampStr(user.displayName || enrolment.studentName, 100),
      courseId: enrolment.courseId,
      courseTitle: clampStr(enrolment.courseTitle, 140),
      instructorName: clampStr(instructorName, 100),
      issuedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };

    await setDoc(certRef, payload);

    if (enrolment.status !== 'completed') {
      await updateDoc(doc(db, 'enrolments', enrolment.id), {
        progressPercent: 100,
        status: 'completed',
        certificateId: certId,
        updatedAt: serverTimestamp(),
      });
    }

    return { id: certId, ...payload };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `certificates/${certId}`);
  }
}

export function subscribeUserCertificates(userId: string, onData: (certs: Certificate[]) => void) {
  const q = query(collection(db, 'certificates'), where('userId', '==', userId));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Certificate, 'id'>) })));
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'certificates')
  );
}

export async function verifyCertificateById(certificateId: string): Promise<Certificate | null> {
  const cleanId = sanitizeId(certificateId);
  try {
    const snap = await getDoc(doc(db, 'certificates', cleanId));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<Certificate, 'id'>) };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `certificates/${cleanId}`);
  }
}

export async function createOrUpdateSubscription(
  user: User,
  planId: Subscription['planId'],
  planName: string,
  billingCycle: 'monthly' | 'annual',
  amount: number,
  last4: string
): Promise<Subscription> {
  const subId = `sub_${user.uid}`;
  const ref = doc(db, 'subscriptions', subId);
  try {
    const existing = await getDoc(ref);
    if (existing.exists() && existing.data().status !== 'cancelled') {
      await updateDoc(ref, {
        planId,
        planName: clampStr(planName, 80),
        billingCycle,
        amount,
        status: 'active',
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        userId: user.uid,
        planId,
        planName: clampStr(planName, 80),
        billingCycle,
        amount,
        currency: 'USD',
        paymentMethodLast4: last4.slice(0, 4).padStart(4, '0'),
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    const fresh = await getDoc(ref);
    return { id: fresh.id, ...(fresh.data() as Omit<Subscription, 'id'>) };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `subscriptions/${subId}`);
  }
}

export async function submitEnquiry(payload: {
  enquiryType: EnquiryType;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  courseInterest?: string;
  message: string;
  userId?: string;
}): Promise<string> {
  const enquiryId = `enq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const ref = doc(db, 'enquiries', enquiryId);
  try {
    const docData: Record<string, unknown> = {
      enquiryType: payload.enquiryType,
      fullName: clampStr(payload.fullName, 100),
      email: clampStr(payload.email, 200),
      message: clampStr(payload.message, 2000),
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    if (payload.phone?.trim()) docData.phone = clampStr(payload.phone, 40);
    if (payload.organization?.trim()) docData.organization = clampStr(payload.organization, 120);
    if (payload.courseInterest?.trim()) docData.courseInterest = clampStr(payload.courseInterest, 140);
    if (payload.userId) docData.userId = clampStr(payload.userId, 128);

    await setDoc(ref, docData);
    return enquiryId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `enquiries/${enquiryId}`);
  }
}

export function subscribeEnquiries(
  userId: string,
  isAdmin: boolean,
  onData: (enquiries: Enquiry[]) => void
) {
  const q = isAdmin
    ? query(collection(db, 'enquiries'))
    : query(collection(db, 'enquiries'), where('userId', '==', userId));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Enquiry, 'id'>) })));
    },
    (error) => handleFirestoreError(error, OperationType.LIST, 'enquiries')
  );
}

export async function updateEnquiryStatus(
  enquiryId: string,
  status: Enquiry['status']
): Promise<void> {
  try {
    await updateDoc(doc(db, 'enquiries', enquiryId), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `enquiries/${enquiryId}`);
  }
}

export async function updateUserPrivateDetails(
  userId: string,
  email: string,
  phone: string,
  organization: string
): Promise<void> {
  const ref = doc(db, `users/${userId}/private`, 'info');
  try {
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await updateDoc(ref, {
        email: clampStr(email, 200),
        phone: clampStr(phone, 40),
        organization: clampStr(organization, 120),
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        uid: userId,
        email: clampStr(email, 200),
        phone: clampStr(phone, 40),
        organization: clampStr(organization, 120),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${userId}/private/info`);
  }
}

export async function fetchUserPrivateDetails(userId: string): Promise<UserPrivateInfo | null> {
  try {
    const snap = await getDoc(doc(db, `users/${userId}/private`, 'info'));
    if (!snap.exists()) return null;
    return snap.data() as UserPrivateInfo;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${userId}/private/info`);
  }
}
