import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  BookOpen,
  Download,
  Inbox,
  Plus,
  Settings,
  Trash2,
  Users,
  Video,
} from 'lucide-react';
import { ASSETS } from '../data/catalogSeed';
import {
  fetchLessonsForCourse,
  removeCourse,
  saveCourse,
  saveLesson,
  seedStarterCatalogToFirestore,
  subscribeAllEnrolmentsForInstructorOrAdmin,
  subscribeEnquiries,
  subscribeInstructorCourses,
  updateEnquiryStatus,
} from '../lib/firestoreService';
import {
  BELVO_CATEGORIES,
  Course,
  CourseLevel,
  CourseStatus,
  Enquiry,
  Enrolment,
  Lesson,
  LessonType,
} from '../types';
import { useAuth } from '../context/AuthContext';

interface InstructorAdminDashboardProps {
  onOpenAdminLogin: () => void;
  onOpenStudentLogin: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

type StudioSection = 'overview' | 'courses' | 'enrolments' | 'enquiries';

export function InstructorAdminDashboard({
  onOpenAdminLogin,
  onOpenStudentLogin,
  onToast,
}: InstructorAdminDashboardProps) {
  const { user, isAdmin } = useAuth();
  const [section, setSection] = useState<StudioSection>('overview');

  const [managedCourses, setManagedCourses] = useState<Course[]>([]);
  const [enrolments, setEnrolments] = useState<Enrolment[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [seeding, setSeeding] = useState(false);

  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>(BELVO_CATEGORIES[0]);
  const [level, setLevel] = useState<CourseLevel>('Intermediate');
  const [price, setPrice] = useState<number>(79);
  const [isFree, setIsFree] = useState(false);
  const [includedInSubscription, setIncludedInSubscription] = useState(true);
  const [durationHours, setDurationHours] = useState<number>(12);
  const [thumbnailUrl, setThumbnailUrl] = useState(ASSETS.marketingAnalytics);
  const [instructorName, setInstructorName] = useState('');
  const [status, setStatus] = useState<CourseStatus>('published');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [outcomesText, setOutcomesText] = useState('');
  const [savingCourse, setSavingCourse] = useState(false);

  const [lessonCourseTarget, setLessonCourseTarget] = useState<Course | null>(null);
  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState<LessonType>('video');
  const [lessonDuration, setLessonDuration] = useState(20);
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonMaterialUrl, setLessonMaterialUrl] = useState('');
  const [lessonSummary, setLessonSummary] = useState('');
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptionsText, setQuizOptionsText] = useState('');
  const [quizCorrectIdx, setQuizCorrectIdx] = useState(0);
  const [savingLesson, setSavingLesson] = useState(false);

  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [webhookEndpoint, setWebhookEndpoint] = useState('https://hooks.belvo.edu/lms-events');

  useEffect(() => {
    if (!user) return;
    setInstructorName(user.displayName || 'Belvo Instructor');
    const unsubCourses = subscribeInstructorCourses(user.uid, isAdmin, setManagedCourses);
    const unsubEnrolments = subscribeAllEnrolmentsForInstructorOrAdmin(
      user.uid,
      isAdmin,
      setEnrolments
    );
    const unsubEnquiries = subscribeEnquiries(user.uid, isAdmin, setEnquiries);
    return () => {
      unsubCourses();
      unsubEnrolments();
      unsubEnquiries();
    };
  }, [user, isAdmin]);

  useEffect(() => {
    if (!lessonCourseTarget) {
      setCourseLessons([]);
      return;
    }
    fetchLessonsForCourse(lessonCourseTarget.id, true)
      .then(setCourseLessons)
      .catch(() => setCourseLessons([]));
  }, [lessonCourseTarget]);

  const totalRevenue = useMemo(
    () => enrolments.reduce((sum, e) => sum + (e.amountPaid || 0), 0),
    [enrolments]
  );

  const avgCompletion = useMemo(() => {
    if (enrolments.length === 0) return 0;
    return Math.round(enrolments.reduce((sum, e) => sum + e.progressPercent, 0) / enrolments.length);
  }, [enrolments]);

  if (!user) {
    return (
      <section className="max-w-[760px] mx-auto px-5 py-20 text-center relative z-10">
        <div className="edu-panel rounded-2xl p-10">
          <p className="text-xs font-semibold text-[#1D4ED8]">Hridayam Instructor &amp; Admin Console</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">
            Choose your sign-in portal
          </h1>
          <p className="text-sm text-[#475569] mt-3 max-w-md mx-auto leading-relaxed">
            Administrators use the dedicated Admin Login Portal for platform-wide governance; Instructors may sign in to manage their own courses and cohorts.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAdminLogin}
              className="btn-edu-primary px-6 py-3 text-sm font-bold rounded-xl min-h-[44px]"
            >
              Open Admin Login Portal
            </button>
            <button
              type="button"
              onClick={onOpenStudentLogin}
              className="btn-edu-secondary px-5 py-3 text-sm font-semibold rounded-xl min-h-[44px]"
            >
              Instructor / Student Sign In
            </button>
          </div>
        </div>
      </section>
    );
  }

  const resetCourseForm = () => {
    setEditingCourseId(null);
    setTitle('');
    setCategory(BELVO_CATEGORIES[0]);
    setLevel('Intermediate');
    setPrice(79);
    setIsFree(false);
    setIncludedInSubscription(true);
    setDurationHours(12);
    setThumbnailUrl(ASSETS.marketingAnalytics);
    setInstructorName(user.displayName || 'Belvo Instructor');
    setStatus('published');
    setSummary('');
    setDescription('');
    setOutcomesText('');
  };

  const loadCourseIntoForm = (course: Course) => {
    setEditingCourseId(course.id);
    setTitle(course.title);
    setCategory(course.category);
    setLevel(course.level);
    setPrice(course.price);
    setIsFree(course.isFree);
    setIncludedInSubscription(course.includedInSubscription);
    setDurationHours(course.durationHours);
    setThumbnailUrl(course.thumbnailUrl);
    setInstructorName(course.instructorName);
    setStatus(course.status);
    setSummary(course.summary);
    setDescription(course.description);
    setOutcomesText((course.outcomes || []).join('\n'));
    setSection('courses');
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3 || summary.trim().length < 10 || description.trim().length < 20) {
      onToast(
        'error',
        'Incomplete course details',
        'Please provide a title (3+ chars), summary (10+ chars), and description (20+ chars).'
      );
      return;
    }

    setSavingCourse(true);
    try {
      const outcomes = outcomesText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 10);

      const existingCourse = managedCourses.find((c) => c.id === editingCourseId);

      await saveCourse(user, {
        id: editingCourseId || undefined,
        title: title.trim(),
        category,
        level,
        summary: summary.trim(),
        description: description.trim(),
        price: isFree ? 0 : Number(price),
        currency: 'USD',
        isFree,
        includedInSubscription,
        durationHours: Number(durationHours),
        thumbnailUrl,
        instructorId: existingCourse?.instructorId || user.uid,
        instructorName: instructorName.trim() || user.displayName || 'Belvo Instructor',
        status,
        outcomes: outcomes.length > 0 ? outcomes : ['Apply practical Belvo industry workflows'],
        modulesCount: existingCourse?.modulesCount ?? 0,
      });

      onToast(
        'success',
        editingCourseId ? 'Course updated' : 'Course published to catalogue',
        'Changes are live across Hridayam by Belvo.'
      );
      resetCourseForm();
    } catch {
      onToast('error', 'Failed to save course', 'Check permissions and field limits.');
    } finally {
      setSavingCourse(false);
    }
  };

  const handleDeleteCourse = async (course: Course) => {
    try {
      await removeCourse(course.id);
      if (lessonCourseTarget?.id === course.id) setLessonCourseTarget(null);
      onToast('success', 'Course removed', course.title);
    } catch {
      onToast('error', 'Could not delete course');
    }
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonCourseTarget) return;
    if (lessonTitle.trim().length < 2 || lessonSummary.trim().length < 5) {
      onToast('error', 'Please enter a lesson title and overview.');
      return;
    }

    setSavingLesson(true);
    try {
      const options = quizOptionsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5);

      await saveLesson(lessonCourseTarget, {
        isPublished: true,
        orderIndex: courseLessons.length + 1,
        title: lessonTitle.trim(),
        type: lessonType,
        durationMinutes: Number(lessonDuration) || 15,
        videoUrl: lessonType === 'video' ? lessonVideoUrl.trim() : undefined,
        materialUrl: lessonMaterialUrl.trim() || undefined,
        contentSummary: lessonSummary.trim(),
        quizQuestion: lessonType === 'quiz' ? quizQuestion.trim() : undefined,
        quizOptions: lessonType === 'quiz' ? options : undefined,
        quizCorrectIndex: lessonType === 'quiz' ? Number(quizCorrectIdx) : undefined,
      });

      const refreshed = await fetchLessonsForCourse(lessonCourseTarget.id, true);
      setCourseLessons(refreshed);
      setLessonTitle('');
      setLessonVideoUrl('');
      setLessonMaterialUrl('');
      setLessonSummary('');
      setQuizQuestion('');
      setQuizOptionsText('');
      onToast('success', 'Lesson added to curriculum');
    } catch {
      onToast('error', 'Could not add lesson');
    } finally {
      setSavingLesson(false);
    }
  };

  const handleSeedCatalogue = async () => {
    setSeeding(true);
    try {
      const count = await seedStarterCatalogToFirestore(user, isAdmin);
      onToast(
        'success',
        count > 0 ? `Synced ${count} flagship courses to Firestore` : 'Catalogue already synced',
        'All 11 Belvo categories and curriculum lessons are live in Firestore.'
      );
    } catch {
      onToast('error', 'Unable to sync starter courses');
    } finally {
      setSeeding(false);
    }
  };

  const handleExportBackup = () => {
    const snapshot = {
      exportedAt: new Date().toISOString(),
      platform: 'Hridayam by Belvo',
      courses: managedCourses,
      enrolments,
      enquiries,
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hridayam-belvo-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    onToast('success', 'Backup JSON downloaded');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Workspace Navigation */}
        <aside className="lg:col-span-3 edu-panel rounded-2xl p-4 space-y-1">
          <div className="px-3 py-2.5 border-b border-slate-200 mb-2">
            <p className="text-[11px] font-semibold text-[#1D4ED8]">
              {isAdmin ? 'Platform Admin Console' : 'Instructor Studio'}
            </p>
            <p className="font-display text-sm font-bold text-[#0F172A] truncate mt-0.5">
              {user.displayName || user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSection('overview')}
            className={`w-full px-3 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2.5 transition-all ${
              section === 'overview'
                ? 'bg-[#1D4ED8] text-white shadow-sm'
                : 'text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            Overview &amp; Analytics
          </button>

          <button
            type="button"
            onClick={() => setSection('courses')}
            className={`w-full px-3 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2.5 transition-all ${
              section === 'courses'
                ? 'bg-[#1D4ED8] text-white shadow-sm'
                : 'text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            Courses &amp; Lessons ({managedCourses.length})
          </button>

          <button
            type="button"
            onClick={() => setSection('enrolments')}
            className={`w-full px-3 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2.5 transition-all ${
              section === 'enrolments'
                ? 'bg-[#1D4ED8] text-white shadow-sm'
                : 'text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            Students &amp; Enrolments ({enrolments.length})
          </button>

          <button
            type="button"
            onClick={() => setSection('enquiries')}
            className={`w-full px-3 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2.5 transition-all ${
              section === 'enquiries'
                ? 'bg-[#1D4ED8] text-white shadow-sm'
                : 'text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]'
            }`}
          >
            <Inbox className="w-4 h-4 shrink-0" />
            Enquiries &amp; Integrations ({enquiries.length})
          </button>

          <div className="pt-3 mt-3 border-t border-slate-200 space-y-2">
            <button
              type="button"
              disabled={seeding}
              onClick={() => void handleSeedCatalogue()}
              className="btn-edu-secondary w-full px-3 py-2 text-xs font-semibold rounded-xl"
            >
              {seeding ? 'Syncing Catalogue...' : 'Sync 11 Belvo Courses to DB'}
            </button>
            <button
              type="button"
              onClick={handleExportBackup}
              className="w-full px-3 py-2 text-xs font-semibold text-[#0F172A] edu-card rounded-xl flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#1D4ED8]" />
              Export JSON Backup
            </button>
          </div>
        </aside>

        {/* Main Workspace Content */}
        <div className="lg:col-span-9 space-y-6">
          {section === 'overview' && (
            <>
              <div className="edu-panel rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
                  <div>
                    <p className="text-xs font-semibold text-[#1D4ED8]">
                      {isAdmin ? 'Admin / Platform Overview' : 'Instructor / Course Analytics'}
                    </p>
                    <h1 className="font-display text-2xl font-bold text-[#0F172A] mt-0.5">
                      Platform Activity &amp; Course Performance
                    </h1>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      resetCourseForm();
                      setSection('courses');
                    }}
                    className="btn-edu-primary px-4 py-2 text-xs font-bold rounded-xl inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    New Course
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                  <div className="p-4 edu-subpanel rounded-xl">
                    <p className="text-xs text-[#64748B]">Managed Courses</p>
                    <p className="font-mono-tabular text-2xl font-bold text-[#0F172A] mt-1">
                      {managedCourses.length}
                    </p>
                  </div>
                  <div className="p-4 edu-subpanel rounded-xl">
                    <p className="text-xs text-[#64748B]">Active Enrolments</p>
                    <p className="font-mono-tabular text-2xl font-bold text-[#0F172A] mt-1">
                      {enrolments.length}
                    </p>
                  </div>
                  <div className="p-4 edu-subpanel rounded-xl">
                    <p className="text-xs text-[#64748B]">Avg Completion</p>
                    <p className="font-mono-tabular text-2xl font-bold text-[#059669] mt-1">
                      {avgCompletion}%
                    </p>
                  </div>
                  <div className="p-4 edu-subpanel rounded-xl">
                    <p className="text-xs text-[#64748B]">Recorded Tuition</p>
                    <p className="font-mono-tabular text-2xl font-bold text-[#0F172A] mt-1">
                      ${totalRevenue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="edu-panel rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="font-display text-base font-bold text-[#0F172A]">
                    Course Performance Ledger
                  </h2>
                  <span className="font-mono-tabular text-xs text-[#64748B]">
                    {managedCourses.length} records
                  </span>
                </div>
                {managedCourses.length === 0 ? (
                  <div className="p-8 text-center text-sm text-[#475569]">
                    No courses in your Firestore studio yet. Click "New Course" or "Sync 11 Belvo Courses to DB" to populate your workspace.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-[#64748B]">
                          <th className="py-3 px-4 font-semibold">Course Title</th>
                          <th className="py-3 px-4 font-semibold">Category</th>
                          <th className="py-3 px-4 font-semibold">Status</th>
                          <th className="py-3 px-4 font-semibold text-right">Modules</th>
                          <th className="py-3 px-4 font-semibold text-right">Learners</th>
                          <th className="py-3 px-4 font-semibold text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {managedCourses.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-semibold text-[#0F172A]">{c.title}</td>
                            <td className="py-3 px-4 text-[#475569]">{c.category}</td>
                            <td className="py-3 px-4 capitalize text-[#059669] font-semibold">
                              {c.status}
                            </td>
                            <td className="py-3 px-4 text-right font-mono-tabular text-[#0F172A]">{c.modulesCount}</td>
                            <td className="py-3 px-4 text-right font-mono-tabular text-[#0F172A]">{c.enrolledCount}</td>
                            <td className="py-3 px-4 text-right font-mono-tabular font-semibold text-[#1D4ED8]">
                              {c.isFree ? 'Free' : `$${c.price}`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {section === 'courses' && (
            <div className="space-y-6">
              <form
                onSubmit={handleSaveCourse}
                className="edu-panel rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <h2 className="font-display text-lg font-bold text-[#0F172A]">
                      {editingCourseId ? 'Edit Course' : 'Create New Course'}
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      Configure syllabus metadata, pricing model, and publication status.
                    </p>
                  </div>
                  {editingCourseId && (
                    <button
                      type="button"
                      onClick={resetCourseForm}
                      className="text-xs font-semibold text-[#1D4ED8] hover:text-[#0F172A]"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cb-title" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Course Title
                    </label>
                    <input
                      id="cb-title"
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Product Growth & Retention Systems"
                      className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="cb-cat" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Belvo Category
                    </label>
                    <select
                      id="cb-cat"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                    >
                      {BELVO_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="cb-level" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Level
                    </label>
                    <select
                      id="cb-level"
                      value={level}
                      onChange={(e) => setLevel(e.target.value as CourseLevel)}
                      className="w-full px-3 py-2 text-sm edu-input rounded-xl"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cb-dur" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Duration (Hours)
                    </label>
                    <input
                      id="cb-dur"
                      type="number"
                      min={1}
                      max={500}
                      value={durationHours}
                      onChange={(e) => setDurationHours(Number(e.target.value))}
                      className="w-full px-3 py-2 font-mono-tabular text-sm edu-input rounded-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="cb-price" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Price (USD)
                    </label>
                    <input
                      id="cb-price"
                      type="number"
                      min={0}
                      disabled={isFree}
                      value={isFree ? 0 : price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 font-mono-tabular text-sm edu-input rounded-xl disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="cb-status" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Status
                    </label>
                    <select
                      id="cb-status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as CourseStatus)}
                      className="w-full px-3 py-2 text-sm edu-input rounded-xl"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cb-inst" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Instructor Display Name
                    </label>
                    <input
                      id="cb-inst"
                      type="text"
                      value={instructorName}
                      onChange={(e) => setInstructorName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="cb-thumb" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Cover Photography Preset (11 Distinct Studios)
                    </label>
                    <select
                      id="cb-thumb"
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                    >
                      <option value={ASSETS.marketingAnalytics}>Digital Marketing Strategy Desk</option>
                      <option value={ASSETS.digitalAi}>Full-Stack Software Engineering</option>
                      <option value={ASSETS.designMedia}>UI/UX &amp; Brand Design Studio</option>
                      <option value={ASSETS.videoVfx}>Film Editing &amp; Color Grading Suite</option>
                      <option value={ASSETS.aiEngineering}>Applied AI &amp; Workflow Lab</option>
                      <option value={ASSETS.ecommerceStudio}>D2C E-Commerce Boutique Studio</option>
                      <option value={ASSETS.photographySet}>Commercial Photography Set</option>
                      <option value={ASSETS.b2bVenture}>B2B Sales &amp; Venture Boardroom</option>
                      <option value={ASSETS.copySeo}>Copywriting &amp; SEO Editorial Desk</option>
                      <option value={ASSETS.cloudBusiness}>Cloud &amp; Cybersecurity Ops</option>
                      <option value={ASSETS.dataBi}>Data Analytics &amp; BI Desk</option>
                      <option value={ASSETS.heroStudio}>Belvo Collaborative Cohort</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFree}
                      onChange={(e) => setIsFree(e.target.checked)}
                      className="accent-[#1D4ED8]"
                    />
                    <span className="font-semibold text-[#0F172A]">Free Open Access Course</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includedInSubscription}
                      onChange={(e) => setIncludedInSubscription(e.target.checked)}
                      className="accent-[#1D4ED8]"
                    />
                    <span className="font-semibold text-[#0F172A]">Include in Pro Subscription</span>
                  </label>
                </div>

                <div>
                  <label htmlFor="cb-sum" className="block text-xs font-semibold text-[#0F172A] mb-1">
                    One-Line Card Summary
                  </label>
                  <input
                    id="cb-sum"
                    type="text"
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Concise value proposition shown on catalogue cards..."
                    className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cb-desc" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Full Course Description
                    </label>
                    <textarea
                      id="cb-desc"
                      rows={3}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detailed scope, prerequisites, and practical projects..."
                      className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="cb-out" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Learning Outcomes (one per line)
                    </label>
                    <textarea
                      id="cb-out"
                      rows={3}
                      value={outcomesText}
                      onChange={(e) => setOutcomesText(e.target.value)}
                      placeholder="Build full-funnel attribution dashboards&#10;Ship production TypeScript apps"
                      className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={savingCourse}
                    className="btn-edu-primary px-6 py-2.5 text-xs font-bold rounded-xl min-h-[40px]"
                  >
                    {savingCourse
                      ? 'Saving Course...'
                      : editingCourseId
                      ? 'Update Course'
                      : 'Publish Course'}
                  </button>
                </div>
              </form>

              <div className="edu-panel rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="font-display text-base font-bold text-[#0F172A]">
                    Your Managed Courses &amp; Curriculum Builder
                  </h3>
                </div>
                {managedCourses.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#64748B]">
                    Publish your first course above or sync the starter catalogue.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-200">
                    {managedCourses.map((c) => (
                      <div
                        key={c.id}
                        className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-xs text-[#64748B]">
                            {c.category} · {c.status} ·{' '}
                            <span className="font-mono-tabular">{c.modulesCount} modules</span>
                          </p>
                          <p className="font-display text-sm font-bold text-[#0F172A] mt-0.5 truncate">
                            {c.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setLessonCourseTarget(c)}
                            className="btn-edu-secondary px-3 py-1.5 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5"
                          >
                            <Video className="w-3.5 h-3.5 text-[#1D4ED8]" />
                            Manage Lessons
                          </button>
                          <button
                            type="button"
                            onClick={() => loadCourseIntoForm(c)}
                            className="px-3 py-1.5 text-xs font-semibold text-[#0F172A] edu-card rounded-xl"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDeleteCourse(c)}
                            aria-label={`Delete ${c.title}`}
                            className="p-1.5 text-[#B91C1C] hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {lessonCourseTarget && (
                <form
                  onSubmit={handleAddLesson}
                  className="edu-panel rounded-2xl p-6 space-y-4 border-2 border-[#1D4ED8]/40"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <p className="text-xs font-semibold text-[#1D4ED8]">Curriculum Uploader</p>
                      <h3 className="font-display text-base font-bold text-[#0F172A]">
                        {lessonCourseTarget.title} ({courseLessons.length} modules)
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLessonCourseTarget(null)}
                      className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
                    >
                      Close
                    </button>
                  </div>

                  {courseLessons.length > 0 && (
                    <div className="space-y-1.5 pb-3 border-b border-slate-200">
                      {courseLessons.map((l, i) => (
                        <div
                          key={l.id}
                          className="text-xs flex items-center justify-between py-1.5 px-3 edu-subpanel rounded-lg"
                        >
                          <span className="font-semibold text-[#0F172A]">
                            {i + 1}. {l.title}
                          </span>
                          <span className="font-mono-tabular text-[#64748B]">
                            {l.type} · {l.durationMinutes}m
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="ls-title" className="block text-xs font-semibold text-[#0F172A] mb-1">
                        New Lesson / Module Title
                      </label>
                      <input
                        id="ls-title"
                        type="text"
                        required
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        placeholder="e.g. Lesson 4: Funnel Attribution Modeling"
                        className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="ls-type" className="block text-xs font-semibold text-[#0F172A] mb-1">
                          Type
                        </label>
                        <select
                          id="ls-type"
                          value={lessonType}
                          onChange={(e) => setLessonType(e.target.value as LessonType)}
                          className="w-full px-2.5 py-2 text-sm edu-input rounded-xl"
                        >
                          <option value="video">Video</option>
                          <option value="reading">Reading</option>
                          <option value="assignment">Assignment</option>
                          <option value="quiz">Quiz</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="ls-min" className="block text-xs font-semibold text-[#0F172A] mb-1">
                          Minutes
                        </label>
                        <input
                          id="ls-min"
                          type="number"
                          min={1}
                          value={lessonDuration}
                          onChange={(e) => setLessonDuration(Number(e.target.value))}
                          className="w-full px-2.5 py-2 font-mono-tabular text-sm edu-input rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lessonType === 'video' && (
                      <div>
                        <label htmlFor="ls-vid" className="block text-xs font-semibold text-[#0F172A] mb-1">
                          Video Stream URL (MP4 / CDN)
                        </label>
                        <input
                          id="ls-vid"
                          type="url"
                          value={lessonVideoUrl}
                          onChange={(e) => setLessonVideoUrl(e.target.value)}
                          placeholder="https://cdn.belvo.edu/lessons/module1.mp4"
                          className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                        />
                      </div>
                    )}
                    <div>
                      <label htmlFor="ls-mat" className="block text-xs font-semibold text-[#0F172A] mb-1">
                        Learning Material / Workbook URL (Optional)
                      </label>
                      <input
                        id="ls-mat"
                        type="url"
                        value={lessonMaterialUrl}
                        onChange={(e) => setLessonMaterialUrl(e.target.value)}
                        placeholder="https://belvo.edu/workbooks/guide.pdf"
                        className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ls-sum" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Lesson Notes / Summary
                    </label>
                    <textarea
                      id="ls-sum"
                      rows={2}
                      required
                      value={lessonSummary}
                      onChange={(e) => setLessonSummary(e.target.value)}
                      placeholder="Key concepts and instructions for this module..."
                      className="w-full px-3.5 py-2 text-sm edu-input rounded-xl"
                    />
                  </div>

                  {lessonType === 'quiz' && (
                    <div className="p-4 edu-subpanel rounded-xl space-y-3">
                      <div>
                        <label htmlFor="ls-q" className="block text-xs font-semibold text-[#0F172A] mb-1">
                          Quiz Question
                        </label>
                        <input
                          id="ls-q"
                          type="text"
                          value={quizQuestion}
                          onChange={(e) => setQuizQuestion(e.target.value)}
                          placeholder="Enter the assessment question..."
                          className="w-full px-3 py-2 text-sm edu-input rounded-xl"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label htmlFor="ls-opts" className="block text-xs font-semibold text-[#0F172A] mb-1">
                            Answer Options (one per line, max 5)
                          </label>
                          <textarea
                            id="ls-opts"
                            rows={3}
                            value={quizOptionsText}
                            onChange={(e) => setQuizOptionsText(e.target.value)}
                            placeholder="Option A&#10;Option B&#10;Option C"
                            className="w-full px-3 py-2 text-sm edu-input rounded-xl"
                          />
                        </div>
                        <div>
                          <label htmlFor="ls-idx" className="block text-xs font-semibold text-[#0F172A] mb-1">
                            Correct Option Index (0-based)
                          </label>
                          <input
                            id="ls-idx"
                            type="number"
                            min={0}
                            max={4}
                            value={quizCorrectIdx}
                            onChange={(e) => setQuizCorrectIdx(Number(e.target.value))}
                            className="w-full px-3 py-2 font-mono-tabular text-sm edu-input rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={savingLesson}
                    className="btn-edu-primary px-5 py-2 text-xs font-bold rounded-xl"
                  >
                    {savingLesson ? 'Uploading Module...' : 'Add Module to Course'}
                  </button>
                </form>
              )}
            </div>
          )}

          {section === 'enrolments' && (
            <div className="edu-panel rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-bold text-[#0F172A]">
                    Student Enrolments &amp; Progress
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Live tracking of student payments, lesson completion, and credential status.
                  </p>
                </div>
                <span className="font-mono-tabular text-xs text-[#64748B]">
                  {enrolments.length} records
                </span>
              </div>
              {enrolments.length === 0 ? (
                <div className="p-10 text-center text-sm text-[#475569]">
                  No student enrolments recorded yet for your courses.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[#64748B]">
                        <th className="py-3 px-4 font-semibold">Student</th>
                        <th className="py-3 px-4 font-semibold">Course</th>
                        <th className="py-3 px-4 font-semibold">Access Model</th>
                        <th className="py-3 px-4 font-semibold text-right">Amount</th>
                        <th className="py-3 px-4 font-semibold text-right">Progress</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {enrolments.map((enr) => (
                        <tr key={enr.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-semibold text-[#0F172A]">
                            {enr.studentName}
                          </td>
                          <td className="py-3 px-4 text-[#475569]">{enr.courseTitle}</td>
                          <td className="py-3 px-4 capitalize text-[#64748B]">
                            {enr.paymentType.replace('_', ' ')}
                          </td>
                          <td className="py-3 px-4 text-right font-mono-tabular text-[#0F172A]">
                            ${enr.amountPaid}
                          </td>
                          <td className="py-3 px-4 text-right font-mono-tabular font-semibold text-[#1D4ED8]">
                            {enr.progressPercent}%
                          </td>
                          <td className="py-3 px-4 capitalize font-semibold text-[#059669]">
                            {enr.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {section === 'enquiries' && (
            <div className="space-y-6">
              <div className="edu-panel rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-lg font-bold text-[#0F172A]">
                      Admissions, Corporate &amp; Partnership Enquiries
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      {isAdmin
                        ? 'Triage incoming enquiries across all intake & referral forms.'
                        : 'Enquiries submitted under your account.'}
                    </p>
                  </div>
                </div>

                {enquiries.length === 0 ? (
                  <div className="p-10 text-center text-sm text-[#475569]">
                    No enquiries logged yet.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-200">
                    {enquiries.map((enq) => (
                      <div key={enq.id} className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                            <span className="font-semibold text-[#1D4ED8] capitalize">
                              {enq.enquiryType.replace('_', ' ')}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{enq.fullName}</span>
                            <span aria-hidden="true">·</span>
                            <span>{enq.email}</span>
                          </div>
                          {enq.courseInterest && (
                            <p className="text-xs font-semibold text-[#0F172A]">
                              Interest: {enq.courseInterest}
                            </p>
                          )}
                          <p className="text-sm text-[#475569] leading-relaxed">{enq.message}</p>
                        </div>

                        {isAdmin && (
                          <select
                            aria-label={`Status for ${enq.fullName}`}
                            value={enq.status}
                            onChange={(e) => {
                              void updateEnquiryStatus(
                                enq.id,
                                e.target.value as Enquiry['status']
                              ).then(() => onToast('success', 'Enquiry status updated'));
                            }}
                            className="px-3 py-1.5 text-xs font-semibold edu-input rounded-xl shrink-0"
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="edu-panel rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                  <Settings className="w-4 h-4 text-[#1D4ED8]" />
                  <h3 className="font-display text-base font-bold text-[#0F172A]">
                    Email Notifications &amp; LMS Integrations
                  </h3>
                </div>

                <label className="flex items-center gap-3 text-xs font-medium text-[#0F172A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotificationsEnabled}
                    onChange={(e) => {
                      setEmailNotificationsEnabled(e.target.checked);
                      onToast('info', 'Email notification preference saved');
                    }}
                    className="accent-[#1D4ED8]"
                  />
                  <span>
                    Dispatch automated enrolment receipts, certificate alerts, and enquiry notifications
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <div className="sm:col-span-2">
                    <label htmlFor="lms-webhook" className="block text-xs font-semibold text-[#0F172A] mb-1">
                      CRM / LMS Webhook Endpoint
                    </label>
                    <input
                      id="lms-webhook"
                      type="url"
                      value={webhookEndpoint}
                      onChange={(e) => setWebhookEndpoint(e.target.value)}
                      className="w-full px-3.5 py-2 font-mono-tabular text-xs edu-input rounded-xl"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onToast('success', 'Integration settings verified', 'Webhook endpoint active.')
                    }
                    className="btn-edu-primary px-4 py-2 text-xs font-bold rounded-xl"
                  >
                    Save Integration
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
