import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storage';
import { Enrolment, Course, Certificate, Resource } from '../../types';
import { navigateTo } from '../../utils/navigation';
import { CertificateModal } from './CertificateModal';
import {
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Play,
  FileCheck,
  Search,
  ExternalLink,
  Sparkles,
  Download,
  FileText,
  Code,
  HelpCircle,
  CheckCircle,
  XCircle,
  Layers
} from 'lucide-react';

export const StudentDashboard: React.FC<{ initialTab?: string }> = ({ initialTab = 'overview' }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'materials' | 'assessments' | 'certificates'>(
    initialTab === 'certificates'
      ? 'certificates'
      : initialTab === 'materials'
      ? 'materials'
      : initialTab === 'assessments'
      ? 'assessments'
      : initialTab === 'courses'
      ? 'courses'
      : 'overview'
  );

  const [enrolments] = useState<Enrolment[]>(() => {
    if (!currentUser) return [];
    return storageService.getEnrolments(currentUser.id);
  });

  const [courses] = useState<Course[]>(() => storageService.getCourses());
  const [certificates] = useState<Certificate[]>(() => storageService.getCertificates().filter((c) => c.userId === currentUser?.id));
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  const [courseFilter, setCourseFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Student Sign In Required</h2>
        <p className="text-xs text-slate-500">Please sign in to access your learning dashboard and progress.</p>
        <button
          onClick={() => navigateTo('/login')}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Active courses map
  const enrichedEnrolments = enrolments.map((enrol) => {
    const courseObj = courses.find((c) => c.id === enrol.courseId);
    return {
      ...enrol,
      course: courseObj
    };
  });

  // Calculate statistics from genuine recorded data
  const totalEnrolled = enrolments.length;
  const completedCount = enrolments.filter((e) => e.status === 'completed' || e.progressPercent === 100).length;
  const inProgressCount = totalEnrolled - completedCount;
  const totalCertificates = certificates.length;

  // Extract all learning materials from enrolled courses
  const enrolledMaterials = enrichedEnrolments.flatMap((enrol) => {
    if (!enrol.course) return [];
    return enrol.course.modules.flatMap((m) =>
      m.lessons.flatMap((l) =>
        l.resources.map((res) => ({
          ...res,
          courseId: enrol.courseId,
          courseTitle: enrol.courseTitle,
          lessonTitle: l.title,
        }))
      )
    );
  });

  // Extract all assessments across enrolled courses
  const allAssessments = enrichedEnrolments.map((enrol) => {
    const latestAttempt = enrol.quizAttempts[0];
    const quizObj = enrol.course?.quiz;
    return {
      courseId: enrol.courseId,
      courseTitle: enrol.courseTitle,
      quiz: quizObj,
      latestAttempt,
      assignment: enrol.assignmentSubmission,
      certificateId: enrol.certificateId,
      progressPercent: enrol.progressPercent,
    };
  });

  // Recent in-progress course for the "Continue Learning" hero card
  const mostRecentInProgress = enrichedEnrolments.find((e) => e.progressPercent < 100) || enrichedEnrolments[0];

  const filteredEnrolments = enrichedEnrolments.filter((e) => {
    if (courseFilter === 'in-progress' && e.progressPercent === 100) return false;
    if (courseFilter === 'completed' && e.progressPercent < 100) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = e.courseTitle.toLowerCase().includes(q);
      if (!matchTitle) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Student Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-teal-500/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                Welcome back, {currentUser.name}
              </h1>
              <span className="text-[10px] font-mono uppercase bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-semibold border border-teal-200/60">
                Student
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Track your course lessons, assessment grades, and verified Belvo certificates.
            </p>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
          <div>
            <p className="text-[11px] font-medium text-slate-500">Enrolled</p>
            <p className="text-xl font-extrabold text-slate-900 tabular-nums">{totalEnrolled}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Completed</p>
            <p className="text-xl font-extrabold text-teal-700 tabular-nums">{completedCount}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Certificates</p>
            <p className="text-xl font-extrabold text-amber-600 tabular-nums">{totalCertificates}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'text-teal-700 border-b-2 border-teal-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Overview & Continue
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'courses'
              ? 'text-teal-700 border-b-2 border-teal-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          My Enrolled Courses ({totalEnrolled})
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'materials'
              ? 'text-teal-700 border-b-2 border-teal-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Learning Materials ({enrolledMaterials.length})
        </button>
        <button
          onClick={() => setActiveTab('assessments')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'assessments'
              ? 'text-teal-700 border-b-2 border-teal-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Assessments & Quizzes ({allAssessments.length})
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'certificates'
              ? 'text-teal-700 border-b-2 border-teal-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Issued Certificates ({totalCertificates})
        </button>
      </div>

      {/* ----------------- Tab 1: Overview ----------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Continue Learning Spotlight */}
          {mostRecentInProgress && (
            <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Continue Your Learning</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {mostRecentInProgress.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {mostRecentInProgress.completedLessonIds.length} lessons completed · {mostRecentInProgress.progressPercent}% of curriculum finished
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full sm:w-80 bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                    <div
                      className="bg-teal-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${mostRecentInProgress.progressPercent}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => navigateTo(`/learn/${mostRecentInProgress.courseId}`)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume Classroom</span>
                </button>
              </div>
            </div>
          )}

          {/* Enrolled Courses Grid Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">Active Courses</h2>
              <button
                onClick={() => setActiveTab('courses')}
                className="text-xs font-semibold text-teal-700 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrichedEnrolments.map((enrol) => (
                <div
                  key={enrol.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
                >
                  {enrol.course?.thumbnail && (
                    <div className="relative aspect-16/9 bg-slate-900 overflow-hidden">
                      <img
                        src={enrol.course.thumbnail}
                        alt={enrol.courseTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                        <span className="font-mono bg-slate-950/80 px-2 py-0.5 rounded text-teal-300 font-semibold">
                          {enrol.course.categoryName.split('&')[0]}
                        </span>
                        <span className="font-mono bg-teal-950/80 text-teal-300 px-2 py-0.5 rounded border border-teal-800/80 font-bold">
                          {enrol.progressPercent}% Complete
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span>Enrolled {new Date(enrol.enrolledAt).toLocaleDateString()}</span>
                        {enrol.paymentId && (
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                            Paid Order
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mb-2">
                        {enrol.courseTitle}
                      </h3>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${enrol.progressPercent === 100 ? 'bg-emerald-500' : 'bg-teal-500'}`}
                          style={{ width: `${enrol.progressPercent}%` }}
                        />
                      </div>
                    </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    {enrol.certificateId ? (
                      <button
                        onClick={() => {
                          const cert = storageService.getCertificateById(enrol.certificateId!);
                          if (cert) setActiveCertificate(cert);
                        }}
                        className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">
                        {enrol.completedLessonIds.length} lessons finished
                      </span>
                    )}

                    <button
                      onClick={() => navigateTo(`/learn/${enrol.courseId}`)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-900 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open Course</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- Tab 2: All Courses ----------------- */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your courses..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setCourseFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${courseFilter === 'all' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                All ({totalEnrolled})
              </button>
              <button
                onClick={() => setCourseFilter('in-progress')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${courseFilter === 'in-progress' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                In Progress ({inProgressCount})
              </button>
              <button
                onClick={() => setCourseFilter('completed')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${courseFilter === 'completed' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEnrolments.map((enrol) => (
              <div
                key={enrol.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>Enrolled: {new Date(enrol.enrolledAt).toLocaleDateString()}</span>
                    <span className="font-mono font-bold text-teal-800">{enrol.progressPercent}%</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 leading-snug">
                    {enrol.courseTitle}
                  </h3>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full ${enrol.progressPercent === 100 ? 'bg-emerald-500' : 'bg-teal-500'}`}
                      style={{ width: `${enrol.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {enrol.certificateId ? (
                    <button
                      onClick={() => {
                        const cert = storageService.getCertificateById(enrol.certificateId!);
                        if (cert) setActiveCertificate(cert);
                      }}
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Certificate</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      {enrol.completedLessonIds.length} lessons completed
                    </span>
                  )}

                  <button
                    onClick={() => navigateTo(`/learn/${enrol.courseId}`)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Resume</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- Tab 3: Learning Materials & Downloads ----------------- */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-1">
                Enrolled Learning Materials & Downloadable Assets
              </h2>
              <p className="text-xs text-slate-500">
                Centralized repository of starter code repositories, cheat sheets, roadmaps, and templates from all your enrolled tracks.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/80">
              {enrolledMaterials.length} Downloadable Files
            </span>
          </div>

          {enrolledMaterials.length > 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Asset & Type</th>
                      <th className="p-3.5">Course Discipline</th>
                      <th className="p-3.5">Lesson Reference</th>
                      <th className="p-3.5">File Size</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enrolledMaterials.map((mat, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-700 shrink-0">
                              {mat.type === 'pdf' ? (
                                <FileText className="w-4 h-4" />
                              ) : mat.type === 'code' ? (
                                <Code className="w-4 h-4" />
                              ) : (
                                <Download className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{mat.title}</p>
                              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                                {mat.type.toUpperCase()} DOCUMENT
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-600 font-medium">{mat.courseTitle}</td>
                        <td className="p-3.5 text-slate-500 truncate max-w-[180px]">{mat.lessonTitle}</td>
                        <td className="p-3.5 font-mono text-slate-500">{mat.size || 'Direct Link'}</td>
                        <td className="p-3.5 text-right">
                          <a
                            href={mat.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <Download className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No downloadable materials found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore the course catalogue and enrol in tracks to unlock project blueprints, Figma libraries, and checklists.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ----------------- Tab 4: Assessments, Quizzes & Assignments ----------------- */}
      {activeTab === 'assessments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-1">
                Curriculum Assessments & Practical Evaluation
              </h2>
              <p className="text-xs text-slate-500">
                Track your multiple-choice quiz grades, passing benchmarks, and portfolio assignment submissions across enrolled tracks.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allAssessments.map((item, idx) => {
              const hasAttempt = !!item.latestAttempt;
              const isPassed = item.latestAttempt?.passed;
              const passingThreshold = item.quiz?.passingScorePercent || 80;

              return (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono uppercase text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">
                        Evaluation Track
                      </span>
                      {hasAttempt ? (
                        <span className={`inline-flex items-center gap-1 font-bold text-xs px-2 py-0.5 rounded ${
                          isPassed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {isPassed ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          <span>{item.latestAttempt?.scorePercent}% Score ({isPassed ? 'PASSED' : 'RETAKE RECOMMENDED'})</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">Not Attempted Yet</span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.courseTitle}
                    </h3>

                    {/* Quiz Spec */}
                    {item.quiz ? (
                      <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1.5 border border-slate-100">
                        <div className="flex justify-between text-slate-600">
                          <span>Assessment Title:</span>
                          <span className="font-semibold text-slate-800">{item.quiz.title}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Total Questions:</span>
                          <span className="font-mono">{item.quiz.questions.length} questions</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Passing Requirement:</span>
                          <span className="font-mono font-semibold text-teal-700">{passingThreshold}% minimum score</span>
                        </div>
                        {hasAttempt && (
                          <div className="flex justify-between text-slate-500 text-[11px] border-t border-slate-200 pt-1 mt-1">
                            <span>Last Evaluation Date:</span>
                            <span>{new Date(item.latestAttempt!.date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No automated quiz configured for this track.</p>
                    )}

                    {/* Assignment Submission Status if present */}
                    {item.assignment && (
                      <div className="bg-indigo-50/70 border border-indigo-200/60 rounded-lg p-3 text-xs space-y-1">
                        <span className="text-[10px] uppercase font-bold text-indigo-800">Portfolio Brief Submission</span>
                        <p className="text-slate-700 line-clamp-2 italic">"{item.assignment.content}"</p>
                        <div className="flex justify-between text-[11px] text-indigo-700 pt-1 font-semibold">
                          <span>Status: {item.assignment.status === 'reviewed' ? `Graded (${item.assignment.gradePercent}%)` : 'Under Review'}</span>
                          <span>{new Date(item.assignment.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-mono">
                      Course Progress: {item.progressPercent}%
                    </span>

                    <button
                      onClick={() => navigateTo(`/learn/${item.courseId}`)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{hasAttempt ? 'Retake / Review' : 'Start Assessment'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------- Tab 5: Certificates ----------------- */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Your Official Certificates of Completion
            </h2>
            <p className="text-xs text-slate-500">
              Each certificate is permanently stored on the Belvo verification registry with a cryptographic verification code.
            </p>
          </div>

          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl border border-amber-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-amber-700 font-bold">{cert.id}</span>
                      <span className="text-slate-400">Issued: {cert.issueDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {cert.courseTitle}
                    </h3>

                    <p className="text-xs text-slate-500">
                      Discipline: <strong className="text-slate-700">{cert.categoryName}</strong>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => navigateTo(`/verify-certificate?id=${cert.id}`)}
                      className="text-xs font-medium text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Public Verification Link</span>
                    </button>

                    <button
                      onClick={() => setActiveCertificate(cert)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                    >
                      View & Print
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <Award className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No certificates earned yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Complete 100% of the lessons in a course and score at least 80% on the final assessment quiz to earn your verifiable certificate.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Certificate Modal */}
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}
    </div>
  );
};
