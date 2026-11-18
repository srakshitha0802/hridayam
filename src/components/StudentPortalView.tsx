import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { ITV_COURSES } from '../data/itvedantData';

interface StudentPortalViewProps {
  onNavigateHome: () => void;
  onExploreCourses: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  onExploreCourses,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'lms' | 'assessments' | 'placements' | 'certificate'>('lms');
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0, 1]);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [appliedDrives, setAppliedDrives] = useState<string[]>(['drive_1']);

  const currentCourse = ITV_COURSES[selectedCourseIndex] || ITV_COURSES[0];

  const studentProfile = {
    name: 'Priya Sharma',
    email: 'priya.sharma@student.belvo.edu',
    rollNo: 'BELVO-2026-8942',
    enrolledAt: '12 January 2026',
    attendance: '96%',
    mentor: 'Arjun Deshmukh (Head of Growth, Belvo)',
  };

  const sampleLessons = [
    {
      title: 'Module 1: Foundations, Architecture & Setting up Your Studio Environment',
      duration: '32 mins',
      type: 'video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      description: 'Comprehensive setup walkthrough, recommended extensions, configuration tokens, and understanding the core workflow.',
      materialName: 'Course_Starter_Kit_and_Architecture_Spec.pdf',
    },
    {
      title: 'Module 2: Practical Studio Walkthrough & Real-World Live Problem Solving',
      duration: '45 mins',
      type: 'video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Hands-on live problem-solving step by step using industry frameworks and best practices.',
      materialName: 'Live_Project_Cheatsheet_and_Templates.pdf',
    },
    {
      title: 'Module 3: Code / Strategy Lab — Interactive Implementation',
      duration: '28 mins',
      type: 'reading',
      description: 'Deep dive into performance optimizations, system benchmarks, and production-grade architectures.',
      materialName: 'Architecture_Deep_Dive_and_Code_Snippets.zip',
    },
    {
      title: 'Module 4: Enterprise Capstone Project & Delivery Spec',
      duration: '50 mins',
      type: 'assignment',
      description: 'Review client acceptance criteria, build the end-to-end deliverable, and submit for faculty audit.',
      materialName: 'Capstone_Deliverable_Rubric_v2.pdf',
    },
  ];

  const quizQuestion = {
    question: `In ${currentCourse.title}, what is the critical first step before moving a prototype or system into production deployment?`,
    options: [
      'Conducting regression tests, security audit, and benchmarking performance guardrails',
      'Deploying immediately without staging to gather live error logs',
      'Deleting all historical documentation and code comments',
      'Skipping user feedback loops and relying solely on assumptions',
    ],
    correctAnswer: 0,
    explanation: 'Production architectures require strict test coverage, security verification, and performance benchmark adherence before live traffic.',
  };

  const progressPercent = Math.round((completedLessons.length / sampleLessons.length) * 100);

  const toggleLessonComplete = (idx: number) => {
    if (completedLessons.includes(idx)) {
      setCompletedLessons(completedLessons.filter((i) => i !== idx));
    } else {
      setCompletedLessons([...completedLessons, idx]);
      onToast('success', 'Lesson Marked Complete!', 'Your overall course progress has been updated.');
    }
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuizAnswer === null) return;
    setQuizSubmitted(true);
    if (selectedQuizAnswer === quizQuestion.correctAnswer) {
      onToast('success', 'Quiz Passed! (100%)', 'Great job! Your score has been logged to your transcript.');
      if (!completedLessons.includes(activeLessonIndex)) {
        setCompletedLessons([...completedLessons, activeLessonIndex]);
      }
    } else {
      onToast('error', 'Incorrect Answer', 'Review the concept and try again.');
    }
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentText) return;
    setAssignmentSubmitted(true);
    onToast('success', 'Assignment Submitted for Review!', 'Your mentor will evaluate your deliverable within 24 hours.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10 text-white">
      {/* Student Welcome & Profile Header Banner */}
      <div className="glass-dark rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border-2 border-sky-400/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-rose-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-xs">
                Active Student
              </span>
              <span className="text-xs text-sky-200 font-mono">Roll: {studentProfile.rollNo}</span>
              <span className="text-xs text-sky-200 font-mono">• Enrolled: {studentProfile.enrolledAt}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Welcome back, {studentProfile.name}
            </h1>
            <p className="text-xs sm:text-sm text-sky-100">
              Assigned Mentor: <strong>{studentProfile.mentor}</strong> • Attendance: <strong>{studentProfile.attendance}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-black/35 border border-sky-400/30 rounded-2xl p-4 backdrop-blur-xl">
            <div className="text-center pr-4 border-r border-sky-400/25">
              <div className="text-2xl font-bold text-sky-300 font-display">
                {progressPercent}%
              </div>
              <div className="text-[10px] text-sky-200 uppercase font-semibold">Course Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-display">
                {completedLessons.length} / {sampleLessons.length}
              </div>
              <div className="text-[10px] text-sky-200 uppercase font-semibold">Modules Done</div>
            </div>
          </div>
        </div>

        {/* Course Progress Bar */}
        <div className="mt-6 pt-4 border-t border-sky-400/30">
          <div className="flex items-center justify-between text-xs text-sky-200 mb-1.5">
            <span>Overall Curriculum Mastery: {currentCourse.title}</span>
            <span className="font-bold text-white">{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-sky-400/25">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-sky-200 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-sky-400/30">
        {[
          { id: 'lms', label: '01. Video Lessons & Study Materials', icon: 'menu_book' },
          { id: 'assessments', label: '02. Quizzes & Assignments', icon: 'quiz' },
          { id: 'certificate', label: '03. Verifiable Certificate', icon: 'workspace_premium' },
          { id: 'placements', label: '04. Live Placement Drives', icon: 'work' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md border border-sky-300/40'
                : 'glass-dark text-sky-200 hover:text-white border border-sky-400/30'
            }`}
          >
            <GoogleIcon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Enrolled Course Selector (Belvo 11 Verticals) */}
      <div className="glass-dark rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border border-sky-400/40">
        <div className="flex items-center gap-2">
          <GoogleIcon name="school" size={20} className="text-sky-300" />
          <span className="text-xs font-bold text-white">Switch Enrolled Track:</span>
        </div>
        <div className="flex-1 max-w-md">
          <select
            value={selectedCourseIndex}
            onChange={(e) => {
              setSelectedCourseIndex(Number(e.target.value));
              setActiveLessonIndex(0);
              setQuizSubmitted(false);
              setSelectedQuizAnswer(null);
            }}
            className="w-full px-3 py-2 text-xs rounded-xl glass-input font-semibold text-white focus:outline-none"
          >
            {ITV_COURSES.slice(0, 11).map((course, idx) => (
              <option key={course.id} value={idx} className="bg-[#0A1633] text-white">
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onExploreCourses}
          className="text-xs font-bold text-sky-300 hover:text-white underline flex items-center gap-1 cursor-pointer"
        >
          <span>Explore All 11 Belvo Courses</span>
          <GoogleIcon name="north_east" size={14} />
        </button>
      </div>

      {/* TAB 1: LMS (VIDEO LESSONS & LEARNING MATERIALS) */}
      {activeTab === 'lms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video & Lesson Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-dark rounded-3xl overflow-hidden shadow-xl border border-sky-400/40">
              {/* Interactive Video Player */}
              <div className="aspect-video bg-black relative overflow-hidden flex items-center justify-center">
                {sampleLessons[activeLessonIndex].type === 'video' ? (
                  <video
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                    src={sampleLessons[activeLessonIndex].videoUrl}
                    poster="/logo.png"
                  />
                ) : (
                  <div className="p-8 text-center text-white space-y-3">
                    <GoogleIcon name="description" size={48} className="text-sky-300 mx-auto" />
                    <h3 className="font-bold text-lg text-white">{sampleLessons[activeLessonIndex].title}</h3>
                    <p className="text-xs text-sky-200 max-w-md mx-auto">
                      {sampleLessons[activeLessonIndex].description}
                    </p>
                  </div>
                )}
              </div>

              {/* Lesson Description & Actions */}
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-sky-200 bg-blue-900/80 px-2.5 py-0.5 rounded-full uppercase border border-sky-400/30">
                      Module {activeLessonIndex + 1}
                    </span>
                    <h2 className="text-lg font-bold text-white font-display mt-1">
                      {sampleLessons[activeLessonIndex].title}
                    </h2>
                  </div>

                  <button
                    onClick={() => toggleLessonComplete(activeLessonIndex)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      completedLessons.includes(activeLessonIndex)
                        ? 'bg-blue-900/80 text-sky-200 border border-sky-400/40'
                        : 'btn-pink-primary text-white shadow-xs'
                    }`}
                  >
                    <GoogleIcon
                      name={completedLessons.includes(activeLessonIndex) ? 'check_circle' : 'radio_button_unchecked'}
                      size={16}
                      filled={completedLessons.includes(activeLessonIndex)}
                    />
                    <span>
                      {completedLessons.includes(activeLessonIndex) ? 'Completed' : 'Mark as Complete'}
                    </span>
                  </button>
                </div>

                <p className="text-xs text-sky-100 leading-relaxed">
                  {sampleLessons[activeLessonIndex].description}
                </p>

                {/* Downloadable Learning Materials */}
                <div className="p-4 bg-black/35 rounded-2xl border border-sky-400/30 space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <GoogleIcon name="folder_zip" size={16} className="text-sky-300" />
                    <span>Downloadable Learning Materials &amp; Templates</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-sky-200 truncate max-w-xs font-mono text-[11px]">
                      {sampleLessons[activeLessonIndex].materialName}
                    </span>
                    <button
                      onClick={() =>
                        onToast(
                          'info',
                          'Downloading Learning Material',
                          `${sampleLessons[activeLessonIndex].materialName} is saving to your downloads.`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-blue-900/80 border border-sky-400/40 text-sky-100 font-semibold text-xs hover:bg-blue-800 transition-colors flex items-center gap-1 cursor-pointer shadow-md"
                    >
                      <GoogleIcon name="download" size={14} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Module Playlist */}
          <div className="lg:col-span-4 glass-dark rounded-3xl p-5 border border-sky-400/40 space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-sky-400/30">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Curriculum Modules ({sampleLessons.length})
              </span>
              <span className="text-xs text-sky-300 font-semibold">
                {progressPercent}% Complete
              </span>
            </div>

            <div className="space-y-2">
              {sampleLessons.map((lesson, idx) => {
                const isSelected = activeLessonIndex === idx;
                const isCompleted = completedLessons.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-900/80 border-sky-300 shadow-md'
                        : 'bg-black/30 border-sky-400/30 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5">
                        <GoogleIcon
                          name={isCompleted ? 'check_circle' : 'play_circle'}
                          size={18}
                          className="text-sky-300"
                          filled={isCompleted}
                        />
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-sky-200">
                          <span>{lesson.duration}</span>
                          <span>•</span>
                          <span className="capitalize">{lesson.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ASSESSMENTS, QUIZZES & ASSIGNMENTS */}
      {activeTab === 'assessments' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Interactive Quiz Module */}
          <div className="glass-dark rounded-3xl p-6 sm:p-8 space-y-6 border border-sky-400/40 shadow-xl">
            <div>
              <span className="text-[10px] font-bold text-sky-200 bg-blue-900/80 px-3 py-1 rounded-full uppercase tracking-wider border border-sky-400/30">
                Module Assessment Quiz
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-2">
                Knowledge Check: {currentCourse.title}
              </h3>
              <p className="text-xs text-sky-200 mt-1">
                Score 80% or higher to qualify for your verifiable course graduation certificate.
              </p>
            </div>

            <form onSubmit={handleQuizSubmit} className="space-y-4">
              <div className="p-4 bg-black/35 rounded-2xl border border-sky-400/30 text-xs font-semibold text-white leading-relaxed">
                Q1. {quizQuestion.question}
              </div>

              <div className="space-y-2">
                {quizQuestion.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs flex items-center gap-3 cursor-pointer transition-all ${
                      selectedQuizAnswer === idx
                        ? 'border-sky-300 bg-blue-900/80 font-semibold text-white'
                        : 'bg-black/30 border-sky-400/30 hover:border-sky-300 text-sky-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="quiz"
                      checked={selectedQuizAnswer === idx}
                      onChange={() => setSelectedQuizAnswer(idx)}
                      className="accent-pink-400"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              {quizSubmitted && (
                <div
                  className={`p-4 rounded-2xl text-xs space-y-1 ${
                    selectedQuizAnswer === quizQuestion.correctAnswer
                      ? 'bg-blue-900/80 border border-sky-400/40 text-sky-100'
                      : 'bg-rose-950/80 border border-sky-500/40 text-rose-200'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1">
                    <GoogleIcon
                      name={selectedQuizAnswer === quizQuestion.correctAnswer ? 'check_circle' : 'cancel'}
                      size={16}
                    />
                    <span>
                      {selectedQuizAnswer === quizQuestion.correctAnswer
                        ? 'Correct! Explanation:'
                        : 'Incorrect. Key Insight:'}
                    </span>
                  </div>
                  <p>{quizQuestion.explanation}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl btn-pink-primary font-bold text-xs uppercase tracking-wider text-white shadow-xl cursor-pointer"
              >
                Submit Quiz for Grading
              </button>
            </form>
          </div>

          {/* Project Assignment Submission */}
          <div className="glass-dark rounded-3xl p-6 sm:p-8 space-y-6 border border-sky-400/40 shadow-xl">
            <div>
              <span className="text-[10px] font-bold text-sky-200 bg-blue-900/80 px-3 py-1 rounded-full uppercase tracking-wider border border-sky-400/30">
                Capstone Assignment
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-2">
                Submit Production Deliverable
              </h3>
              <p className="text-xs text-sky-200 mt-1">
                Upload your GitHub repo, Figma link, ad-account report, or video portfolio for faculty evaluation.
              </p>
            </div>

            {assignmentSubmitted ? (
              <div className="p-6 bg-blue-950/80 border border-sky-400/40 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <GoogleIcon name="check" size={24} />
                </div>
                <h4 className="font-bold text-white text-base">Assignment Received!</h4>
                <p className="text-xs text-sky-200">
                  Your project has been queued for faculty review by <strong>{studentProfile.mentor}</strong>. Detailed rubric feedback will be sent within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setAssignmentSubmitted(false)}
                  className="text-xs font-bold text-sky-300 underline cursor-pointer hover:text-white"
                >
                  Edit / Re-submit
                </button>
              </div>
            ) : (
              <form onSubmit={handleAssignmentSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-sky-200 mb-1">
                    Deliverable URL (GitHub / Figma / Drive / Live Web)
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/priya-sharma/belvo-capstone"
                    value={assignmentText}
                    onChange={(e) => setAssignmentText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-sky-200 mb-1">
                    Student Notes &amp; Implementation Walkthrough
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your design decisions, architecture choices, and metrics achieved..."
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl btn-pink-primary font-bold text-xs uppercase tracking-wider text-white shadow-xl cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <GoogleIcon name="cloud_upload" size={16} />
                  <span>Submit Assignment for Faculty Audit</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: VERIFIABLE COURSE COMPLETION CERTIFICATE */}
      {activeTab === 'certificate' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="glass-dark rounded-3xl p-6 sm:p-10 border-2 border-sky-400/40 relative shadow-2xl backdrop-blur-2xl">
            {/* Certificate Header */}
            <div className="text-center space-y-3 border-b border-sky-400/30 pb-6">
              <div className="p-2 rounded-2xl bg-white/10 w-fit mx-auto border border-sky-400/30">
                <img
                  src="/logo.png"
                  alt="Hridayam by Belvo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="text-[11px] font-bold text-sky-300 uppercase tracking-widest">
                Certificate of Professional Mastery &amp; Completion
              </div>
            </div>

            {/* Certificate Body */}
            <div className="py-8 text-center space-y-4">
              <p className="text-xs text-sky-200 uppercase tracking-widest font-semibold">
                This is proudly presented to
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
                {studentProfile.name}
              </h2>
              <p className="text-xs sm:text-sm text-sky-100 max-w-lg mx-auto leading-relaxed">
                for successfully completing the rigorous 8-month curriculum and practical industry capstones in
              </p>
              <div className="p-4 bg-blue-900/80 rounded-2xl border border-sky-400/40 text-lg sm:text-xl font-bold text-white inline-block font-display shadow-md">
                {currentCourse.title}
              </div>
              <p className="text-xs text-sky-200 max-w-md mx-auto">
                Accredited under Belvo Educational Systems &amp; National Skill Development Corporation (NSDC) dual certification standards.
              </p>
            </div>

            {/* Certificate Signatures & Verification Code */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-sky-400/30 text-center text-xs">
              <div className="space-y-1">
                <div className="font-mono text-sky-300 font-bold">BELVO-CERT-2026-X992</div>
                <div className="text-[10px] text-sky-200">Verifiable Credential ID</div>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-white">Arjun Deshmukh</div>
                <div className="text-[10px] text-sky-200">Head of Curriculum &amp; Pedagogy</div>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-white">{studentProfile.mentor}</div>
                <div className="text-[10px] text-sky-200">Faculty Lead</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="btn-pink-primary px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <GoogleIcon name="print" size={16} />
              Print / Save Official Certificate PDF
            </button>
            <button
              onClick={() =>
                onToast('success', 'Credential Link Copied', 'Share this on LinkedIn or add to your resume.')
              }
              className="px-6 py-3 rounded-xl btn-pink-glass text-white hover:border-sky-300 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <GoogleIcon name="share" size={16} />
              Share Credential on LinkedIn
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: LIVE PLACEMENT DRIVES */}
      {activeTab === 'placements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-display">
              Upcoming Corporate Placement Drives (2026 Batch)
            </h3>
            <span className="text-xs text-sky-300 font-semibold">
              3,500+ Placed by Our Placement Cell
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: 'drive_1',
                company: 'Microsoft',
                role: 'Applied AI & Cloud Associate',
                package: '₹14 LPA',
                mode: 'Bangalore / Hybrid',
                deadline: 'Tomorrow, 5 PM',
              },
              {
                id: 'drive_2',
                company: 'Amazon',
                role: 'Frontend & Full Stack Software Engineer',
                package: '₹16 LPA',
                mode: 'Hyderabad / Pune',
                deadline: 'In 3 Days',
              },
              {
                id: 'drive_3',
                company: 'Capgemini',
                role: 'Data Analyst & BI Specialist',
                package: '₹7.5 LPA',
                mode: 'Mumbai / Pune',
                deadline: 'In 4 Days',
              },
              {
                id: 'drive_4',
                company: 'Accenture',
                role: 'Growth Marketing & Analytics Consultant',
                package: '₹8.2 LPA',
                mode: 'Gurugram / Hybrid',
                deadline: 'In 5 Days',
              },
            ].map((drive) => {
              const hasApplied = appliedDrives.includes(drive.id);
              return (
                <div
                  key={drive.id}
                  className="glass-dark rounded-2xl p-5 hover:border-sky-300 transition-all flex flex-col justify-between border border-sky-400/40 shadow-xl text-white"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-base">{drive.company}</h4>
                      <span className="font-bold text-sky-200 text-xs bg-blue-900/80 px-2 py-0.5 rounded-full border border-sky-400/30">
                        {drive.package}
                      </span>
                    </div>
                    <p className="text-xs text-sky-100 font-medium">{drive.role}</p>
                    <div className="text-[11px] text-sky-200 flex items-center gap-3">
                      <span>{drive.mode}</span>
                      <span>•</span>
                      <span>Closes: {drive.deadline}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-sky-400/30 mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-sky-300 font-semibold flex items-center gap-1">
                      <GoogleIcon name="verified" size={14} />
                      Eligible: 80%+ Modules Completed
                    </span>
                    <button
                      onClick={() => {
                        setAppliedDrives([...appliedDrives, drive.id]);
                        onToast('success', `Applied to ${drive.company}!`, 'Your portfolio has been routed to HR.');
                      }}
                      disabled={hasApplied}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        hasApplied
                          ? 'bg-black/40 text-sky-300/60 cursor-not-allowed border border-sky-400/20'
                          : 'btn-pink-primary text-white shadow-md'
                      }`}
                    >
                      {hasApplied ? 'Applied ✓' : 'One-Click Apply'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
