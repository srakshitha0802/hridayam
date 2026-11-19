import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ExternalLink,
  FileText,
  HelpCircle,
  NotebookPen,
  PlayCircle,
  Printer,
  User as UserIcon,
} from 'lucide-react';
import { SEED_COURSES } from '../data/catalogSeed';
import {
  fetchLessonsForCourse,
  fetchUserPrivateDetails,
  issueCertificateForEnrolment,
  updateEnrolmentProgress,
  updateUserPrivateDetails,
} from '../lib/firestoreService';
import { Certificate, Course, Enrolment, Lesson } from '../types';
import { useAuth } from '../context/AuthContext';

const NOTES_STORAGE_KEY = 'hridayam_study_notes_v1';

interface StudentDashboardProps {
  courses: Course[];
  enrolments: Enrolment[];
  certificates: Certificate[];
  initialCourseId?: string | null;
  onExploreCatalogue: () => void;
  onOpenStudentLogin: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export function StudentDashboard({
  courses,
  enrolments,
  certificates,
  initialCourseId,
  onExploreCatalogue,
  onOpenStudentLogin,
  onToast,
}: StudentDashboardProps) {
  const { user, subscription } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'certificates' | 'profile'>('courses');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(initialCourseId || null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [loadingLessons, setLoadingLessons] = useState(false);

  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [assignmentNote, setAssignmentNote] = useState('');
  const [issuingCert, setIssuingCert] = useState(false);

  // Persistent personal module study notes
  const [studyNotesMap, setStudyNotesMap] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(NOTES_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });
  const [noteDraft, setNoteDraft] = useState('');

  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
      setActiveTab('courses');
    } else if (!selectedCourseId && enrolments.length > 0) {
      setSelectedCourseId(enrolments[0].courseId);
    }
  }, [initialCourseId, enrolments, selectedCourseId]);

  useEffect(() => {
    if (!user) return;
    fetchUserPrivateDetails(user.uid)
      .then((info) => {
        if (info) {
          setPhone(info.phone || '');
          setOrganization(info.organization || '');
        }
      })
      .catch(() => {});
  }, [user]);

  const activeEnrolment = useMemo(
    () => enrolments.find((e) => e.courseId === selectedCourseId) || null,
    [enrolments, selectedCourseId]
  );

  const activeCourse = useMemo(
    () => courses.find((c) => c.id === selectedCourseId) || null,
    [courses, selectedCourseId]
  );

  useEffect(() => {
    if (!selectedCourseId) {
      setLessons([]);
      setActiveLessonId(null);
      return;
    }
    let active = true;
    const loadLessons = async () => {
      setLoadingLessons(true);
      try {
        const dbLessons = await fetchLessonsForCourse(selectedCourseId, false);
        if (!active) return;
        const resolved =
          dbLessons.length > 0
            ? dbLessons
            : SEED_COURSES.find((c) => c.id === selectedCourseId)?.lessons || [];
        setLessons(resolved);
        setActiveLessonId(resolved[0]?.id || null);
      } catch {
        const fallback = SEED_COURSES.find((c) => c.id === selectedCourseId)?.lessons || [];
        if (active) {
          setLessons(fallback);
          setActiveLessonId(fallback[0]?.id || null);
        }
      } finally {
        if (active) setLoadingLessons(false);
      }
    };
    void loadLessons();
    return () => {
      active = false;
    };
  }, [selectedCourseId]);

  const activeLesson = useMemo(
    () => lessons.find((l) => l.id === activeLessonId) || lessons[0] || null,
    [lessons, activeLessonId]
  );

  useEffect(() => {
    setSelectedQuizOption(null);
    setQuizFeedback(null);
    setAssignmentNote('');
    if (activeLessonId) {
      setNoteDraft(studyNotesMap[activeLessonId] || '');
    }
  }, [activeLessonId, studyNotesMap]);

  if (!user) {
    return (
      <section className="max-w-[760px] mx-auto px-5 py-20 text-center relative z-10">
        <div className="edu-panel rounded-2xl p-10">
          <p className="text-xs font-semibold text-[#1D4ED8]">Hridayam Student Portal</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">
            Sign in to access your learning workspace
          </h1>
          <p className="text-sm text-[#475569] mt-3 max-w-md mx-auto leading-relaxed">
            Track enrolled courses, watch video lessons, complete assessments and quizzes, and download verified completion certificates.
          </p>
          <button
            type="button"
            onClick={onOpenStudentLogin}
            className="btn-edu-primary mt-6 px-6 py-3 text-sm font-bold rounded-xl min-h-[44px]"
          >
            Go to Student Login
          </button>
        </div>
      </section>
    );
  }

  const avgProgress =
    enrolments.length === 0
      ? 0
      : Math.round(enrolments.reduce((sum, e) => sum + e.progressPercent, 0) / enrolments.length);

  const toggleLessonComplete = async (lessonId: string) => {
    if (!activeEnrolment) return;
    if (activeEnrolment.status === 'completed') {
      onToast('info', 'Course already completed', 'Your completion certificate is ready.');
      return;
    }

    const currentSet = new Set(activeEnrolment.completedLessonIds || []);
    if (currentSet.has(lessonId)) {
      currentSet.delete(lessonId);
    } else {
      currentSet.add(lessonId);
    }
    try {
      await updateEnrolmentProgress(activeEnrolment, Array.from(currentSet), lessons.length);
      onToast('success', 'Progress saved');
    } catch {
      onToast('error', 'Could not update lesson progress');
    }
  };

  const handleSaveStudyNote = () => {
    if (!activeLesson) return;
    const next = { ...studyNotesMap, [activeLesson.id]: noteDraft.trim() };
    setStudyNotesMap(next);
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota error
    }
    onToast('success', 'Study note saved for this module');
  };

  const handleCheckQuiz = async () => {
    if (!activeLesson || selectedQuizOption === null) return;
    const isRight = selectedQuizOption === activeLesson.quizCorrectIndex;
    setQuizFeedback(isRight ? 'correct' : 'incorrect');
    if (isRight && activeEnrolment && !activeEnrolment.completedLessonIds.includes(activeLesson.id)) {
      await toggleLessonComplete(activeLesson.id);
    }
  };

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLesson || assignmentNote.trim().length < 5) {
      onToast('error', 'Please enter a brief project link or reflection note.');
      return;
    }
    if (activeEnrolment && !activeEnrolment.completedLessonIds.includes(activeLesson.id)) {
      await toggleLessonComplete(activeLesson.id);
    }
    onToast('success', 'Assignment recorded', 'Module marked complete in your progress tracker.');
  };

  const handleIssueCertificate = async () => {
    if (!activeEnrolment || !activeCourse) return;
    setIssuingCert(true);
    try {
      const cert = await issueCertificateForEnrolment(
        user,
        activeEnrolment,
        activeCourse.instructorName
      );
      onToast(
        'success',
        'Certificate generated',
        `Credential ID ${cert.id} is now available in your Certificates tab.`
      );
      setActiveTab('certificates');
    } catch {
      onToast('error', 'Unable to issue certificate right now');
    } finally {
      setIssuingCert(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await updateUserPrivateDetails(user.uid, user.email || '', phone, organization);
      onToast('success', 'Profile preferences updated');
    } catch {
      onToast('error', 'Could not update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-10 relative z-10">
      <div className="edu-panel rounded-2xl p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#1D4ED8]">Student Learning Workspace</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] mt-1">
            Welcome back, {user.displayName?.split(' ')[0] || 'Learner'}
          </h1>
        </div>

        <div className="inline-flex p-1 bg-slate-100 border border-slate-200 rounded-xl self-start">
          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'courses' ? 'bg-[#1D4ED8] text-white shadow-sm' : 'text-[#475569]'
            }`}
          >
            My Courses
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('certificates')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'certificates' ? 'bg-[#1D4ED8] text-white shadow-sm' : 'text-[#475569]'
            }`}
          >
            Certificates ({certificates.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'profile' ? 'bg-[#1D4ED8] text-white shadow-sm' : 'text-[#475569]'
            }`}
          >
            Account
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 edu-panel rounded-2xl divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        <div className="p-4 sm:p-5">
          <p className="text-xs text-[#64748B]">Enrolled Courses</p>
          <p className="font-mono-tabular text-2xl font-bold text-[#0F172A] mt-1">
            {enrolments.length}
          </p>
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-xs text-[#64748B]">Average Progress</p>
          <p className="font-mono-tabular text-2xl font-bold text-[#0F172A] mt-1">
            {avgProgress}%
          </p>
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-xs text-[#64748B]">Certificates Earned</p>
          <p className="font-mono-tabular text-2xl font-bold text-[#0F172A] mt-1">
            {certificates.length}
          </p>
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-xs text-[#64748B]">Membership Plan</p>
          <p className="font-display text-base font-bold text-[#1D4ED8] mt-1.5 truncate">
            {subscription ? subscription.planName : 'Free / Pay-per-course'}
          </p>
        </div>
      </div>

      {activeTab === 'courses' && (
        <div className="mt-8">
          {enrolments.length === 0 ? (
            <div className="edu-panel rounded-2xl p-12 text-center">
              <BookOpen className="w-8 h-8 text-[#1D4ED8] mx-auto mb-3" />
              <h2 className="font-display text-xl font-bold text-[#0F172A]">
                No course enrolments yet
              </h2>
              <p className="text-sm text-[#475569] mt-2 max-w-md mx-auto">
                Start with one of our free foundational courses or unlock all eleven Belvo disciplines with an All-Access membership.
              </p>
              <button
                type="button"
                onClick={onExploreCatalogue}
                className="btn-edu-primary mt-6 px-6 py-2.5 text-sm font-bold rounded-xl"
              >
                Browse Course Catalogue
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-4">
                <div className="edu-panel rounded-2xl p-4">
                  <label htmlFor="enrolled-switcher" className="block text-xs font-semibold text-[#64748B] mb-2">
                    Active Enrolled Course
                  </label>
                  <select
                    id="enrolled-switcher"
                    value={selectedCourseId || ''}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-medium edu-input rounded-xl"
                  >
                    {enrolments.map((enr) => (
                      <option key={enr.id} value={enr.courseId}>
                        {enr.courseTitle} ({enr.progressPercent}%)
                      </option>
                    ))}
                  </select>

                  {activeEnrolment && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[#64748B]">Completion</span>
                        <span className="font-mono-tabular font-semibold text-[#0F172A]">
                          {activeEnrolment.progressPercent}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#059669] transition-all duration-300"
                          style={{ width: `${activeEnrolment.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="edu-panel rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0F172A]">Course Modules</span>
                    <span className="font-mono-tabular text-xs text-[#64748B]">
                      {activeEnrolment?.completedLessonIds.length || 0}/{lessons.length}
                    </span>
                  </div>

                  {loadingLessons ? (
                    <div className="p-4 space-y-2">
                      <div className="h-10 bg-slate-100 rounded animate-pulse" />
                      <div className="h-10 bg-slate-100 rounded animate-pulse" />
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-200">
                      {lessons.map((lesson, idx) => {
                        const isDone = activeEnrolment?.completedLessonIds.includes(lesson.id);
                        const isCurrent = activeLesson?.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            onClick={() => setActiveLessonId(lesson.id)}
                            className={`w-full px-4 py-3 text-left flex items-start gap-3 transition-colors ${
                              isCurrent ? 'bg-indigo-50/90' : 'hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                                isDone
                                  ? 'bg-emerald-50 border-emerald-200 text-[#059669]'
                                  : 'border-slate-300 text-[#64748B]'
                              }`}
                            >
                              {isDone ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <span className="font-mono-tabular text-[10px]">{idx + 1}</span>
                              )}
                            </span>
                            <div className="min-w-0">
                              <p
                                className={`text-xs font-semibold leading-snug ${
                                  isCurrent ? 'text-[#1D4ED8]' : 'text-[#0F172A]'
                                }`}
                              >
                                {lesson.title}
                              </p>
                              <p className="font-mono-tabular text-[11px] text-[#64748B] mt-0.5">
                                {lesson.type} · {lesson.durationMinutes}m
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {activeEnrolment && activeEnrolment.progressPercent === 100 && (
                    <div className="p-4 border-t border-slate-200 bg-slate-50">
                      <button
                        type="button"
                        disabled={issuingCert}
                        onClick={() => void handleIssueCertificate()}
                        className="w-full py-2.5 px-4 text-xs font-bold text-[#059669] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Award className="w-4 h-4" />
                        {issuingCert
                          ? 'Generating...'
                          : activeEnrolment.certificateId
                          ? 'View Completion Certificate'
                          : 'Claim Completion Certificate'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-8 edu-panel rounded-2xl overflow-hidden">
                {activeLesson ? (
                  <div>
                    <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs text-[#64748B]">
                          {activeLesson.type === 'video' && <PlayCircle className="w-3.5 h-3.5 text-[#1D4ED8]" />}
                          {activeLesson.type === 'reading' && <FileText className="w-3.5 h-3.5 text-[#64748B]" />}
                          {activeLesson.type === 'quiz' && <HelpCircle className="w-3.5 h-3.5 text-amber-600" />}
                          {activeLesson.type === 'assignment' && <Award className="w-3.5 h-3.5 text-[#059669]" />}
                          <span className="capitalize">{activeLesson.type} Module</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">{activeLesson.durationMinutes} min</span>
                        </div>
                        <h2 className="font-display text-xl font-bold text-[#0F172A] mt-1">
                          {activeLesson.title}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => void toggleLessonComplete(activeLesson.id)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                          activeEnrolment?.completedLessonIds.includes(activeLesson.id)
                            ? 'bg-emerald-50 text-[#059669] border-emerald-200'
                            : 'btn-edu-secondary'
                        }`}
                      >
                        {activeEnrolment?.completedLessonIds.includes(activeLesson.id)
                          ? 'Completed'
                          : 'Mark Complete'}
                      </button>
                    </div>

                    <div className="p-6 space-y-6">
                      {activeLesson.type === 'video' && activeLesson.videoUrl && (
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200">
                          <video
                            key={activeLesson.videoUrl}
                            src={activeLesson.videoUrl}
                            controls
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}

                      <div className="text-sm text-[#475569] leading-relaxed">
                        <h3 className="font-display text-sm font-semibold text-[#0F172A] mb-2">
                          Module Overview &amp; Study Notes
                        </h3>
                        <p>{activeLesson.contentSummary}</p>
                      </div>

                      {activeLesson.materialUrl && (
                        <div className="p-4 edu-subpanel rounded-xl flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold text-[#0F172A]">
                              Companion Study Material
                            </p>
                            <p className="text-xs text-[#64748B] truncate max-w-md">
                              {activeLesson.materialUrl}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] shrink-0">
                            <ExternalLink className="w-3.5 h-3.5" />
                            Workbook Resource
                          </span>
                        </div>
                      )}

                      {activeLesson.type === 'quiz' && activeLesson.quizQuestion && (
                        <div className="p-5 edu-subpanel rounded-xl space-y-4">
                          <p className="text-xs font-semibold text-amber-700">
                            Module Assessment Question
                          </p>
                          <p className="text-sm font-semibold text-[#0F172A]">
                            {activeLesson.quizQuestion}
                          </p>
                          <div className="space-y-2">
                            {(activeLesson.quizOptions || []).map((opt, idx) => (
                              <label
                                key={idx}
                                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-sm transition-colors ${
                                  selectedQuizOption === idx
                                    ? 'bg-indigo-50 border-[#1D4ED8] text-[#0F172A] font-medium'
                                    : 'bg-white border-slate-200 text-[#475569]'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`quiz-${activeLesson.id}`}
                                  checked={selectedQuizOption === idx}
                                  onChange={() => {
                                    setSelectedQuizOption(idx);
                                    setQuizFeedback(null);
                                  }}
                                  className="accent-[#1D4ED8]"
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <button
                              type="button"
                              disabled={selectedQuizOption === null}
                              onClick={() => void handleCheckQuiz()}
                              className="btn-edu-primary px-5 py-2 text-xs font-bold disabled:opacity-50 rounded-xl"
                            >
                              Submit Answer
                            </button>
                            {quizFeedback === 'correct' && (
                              <span className="text-xs font-semibold text-[#059669] inline-flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" />
                                Correct — Module marked complete
                              </span>
                            )}
                            {quizFeedback === 'incorrect' && (
                              <span className="text-xs font-semibold text-[#B91C1C]">
                                Not quite — review the module summary and try again.
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {activeLesson.type === 'assignment' && (
                        <form
                          onSubmit={handleSubmitAssignment}
                          className="p-5 edu-subpanel rounded-xl space-y-3"
                        >
                          <label
                            htmlFor="assignment-note"
                            className="block text-xs font-semibold text-[#0F172A]"
                          >
                            Practical Assignment Submission (Project URL or Brief)
                          </label>
                          <textarea
                            id="assignment-note"
                            rows={3}
                            value={assignmentNote}
                            onChange={(e) => setAssignmentNote(e.target.value)}
                            placeholder="Paste your Figma/GitHub/Docs deliverable URL or summary notes..."
                            className="w-full px-3.5 py-2.5 text-sm edu-input rounded-xl"
                          />
                          <button
                            type="submit"
                            className="btn-edu-primary px-5 py-2 text-xs font-bold rounded-xl"
                          >
                            Submit Deliverable &amp; Complete Module
                          </button>
                        </form>
                      )}

                      {/* Personal Study Notes Scratchpad */}
                      <div className="p-5 edu-subpanel rounded-xl space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <label
                            htmlFor="module-study-notes"
                            className="text-xs font-semibold text-[#0F172A] inline-flex items-center gap-1.5"
                          >
                            <NotebookPen className="w-3.5 h-3.5 text-[#1D4ED8]" />
                            Personal Study Notes (Saved Locally)
                          </label>
                          <button
                            type="button"
                            onClick={handleSaveStudyNote}
                            className="btn-edu-secondary px-3 py-1 text-[11px] font-semibold rounded-lg"
                          >
                            Save Note
                          </button>
                        </div>
                        <textarea
                          id="module-study-notes"
                          rows={2}
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          placeholder="Jot down key takeaways, timestamps, or questions for mentor office hours..."
                          className="w-full px-3.5 py-2 text-xs edu-input rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-10 text-center text-sm text-[#64748B]">
                    Select a module on the left to start learning.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="mt-8">
          {certificates.length === 0 ? (
            <div className="edu-panel rounded-2xl p-12 text-center">
              <Award className="w-8 h-8 text-[#1D4ED8] mx-auto mb-3" />
              <h2 className="font-display text-lg font-bold text-[#0F172A]">
                No certificates earned yet
              </h2>
              <p className="text-sm text-[#475569] mt-2">
                Complete all modules and assessments in any enrolled course to issue your verifiable Hridayam by Belvo credential.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="edu-panel rounded-2xl p-7 flex flex-col justify-between border border-indigo-200"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/logo.png"
                          alt="Hridayam by Belvo"
                          className="h-8 w-auto rounded-lg bg-white p-0.5 border border-slate-200 object-contain"
                        />
                        <span className="font-display text-sm font-bold text-[#0F172A]">
                          Hridayam by Belvo
                        </span>
                      </div>
                      <span className="font-mono-tabular text-xs text-[#059669] font-semibold">
                        Verified Credential
                      </span>
                    </div>

                    <p className="text-xs text-[#64748B] mt-5">Awarded to</p>
                    <h3 className="font-display text-2xl font-bold text-[#0F172A] mt-0.5">
                      {cert.studentName}
                    </h3>
                    <p className="text-sm text-[#475569] mt-2">
                      For successfully completing all coursework and assessments in
                    </p>
                    <p className="font-display text-lg font-semibold text-[#1D4ED8] mt-1">
                      {cert.courseTitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] text-[#64748B]">
                        Instructor: {cert.instructorName}
                      </p>
                      <p className="font-mono-tabular text-[11px] text-[#0F172A] mt-0.5">
                        ID: {cert.id} · Code: {cert.certificateCode}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn-edu-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="mt-8 max-w-xl edu-panel rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <UserIcon className="w-5 h-5 text-[#1D4ED8]" />
            <div>
              <h2 className="font-display text-lg font-bold text-[#0F172A]">
                Learner Account &amp; Contact Details
              </h2>
              <p className="text-xs text-[#64748B]">
                Private profile details isolated in encrypted user subcollections.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Verified Email
              </label>
              <input
                type="text"
                disabled
                value={user.email || ''}
                className="w-full px-3.5 py-2.5 text-sm edu-input rounded-xl opacity-75"
              />
            </div>
            <div>
              <label htmlFor="prof-phone" className="block text-xs font-semibold text-[#0F172A] mb-1">
                Phone Number
              </label>
              <input
                id="prof-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98000 00000"
                className="w-full px-3.5 py-2.5 text-sm edu-input rounded-xl"
              />
            </div>
            <div>
              <label htmlFor="prof-org" className="block text-xs font-semibold text-[#0F172A] mb-1">
                College or Organization
              </label>
              <input
                id="prof-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Belvo Studio / University"
                className="w-full px-3.5 py-2.5 text-sm edu-input rounded-xl"
              />
            </div>
            <button
              type="submit"
              disabled={savingProfile}
              className="btn-edu-primary px-5 py-2.5 text-xs font-bold rounded-xl"
            >
              {savingProfile ? 'Saving...' : 'Save Account Details'}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
