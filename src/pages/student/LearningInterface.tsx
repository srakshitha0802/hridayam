import React, { useState, useEffect, useRef } from 'react';
import { Course, Lesson, Enrolment, Certificate, StudentNote } from '../../types';
import { storageService } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import { navigateTo } from '../../utils/navigation';
import { CertificateModal } from './CertificateModal';
import {
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Download,
  Award,
  HelpCircle,
  FileText,
  ArrowLeft,
  Send,
  AlertCircle,
  BookOpen,
  Clock,
  Sparkles,
  MessageSquare,
  Trash2,
  BookmarkPlus
} from 'lucide-react';

export const LearningInterface: React.FC<{ courseId: string }> = ({ courseId }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [course, setCourse] = useState<Course | undefined>(() => storageService.getCourseById(courseId));
  const [enrolment, setEnrolment] = useState<Enrolment | undefined>(() => {
    if (!currentUser) return undefined;
    return storageService.getEnrolment(currentUser.id, courseId);
  });

  // Video Ref & Custom Controls State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Current active lesson
  const allLessons: Lesson[] = course?.modules.flatMap((m) => m.lessons) || [];
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    if (allLessons.length > 0) return allLessons[0].id;
    return '';
  });

  // Active view tab: 'overview' | 'transcript' | 'notes' | 'quiz' | 'assignment'
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'notes' | 'quiz' | 'assignment'>('overview');

  // Notes state
  const [newNoteText, setNewNoteText] = useState('');
  const [notes, setNotes] = useState<StudentNote[]>(() => {
    if (!currentUser) return [];
    return storageService.getNotes(currentUser.id, courseId);
  });

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizPassed, setQuizPassed] = useState(false);

  // Assignment state
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // Certificate Modal
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      navigateTo('/login');
    }
  }, [isAuthenticated, currentUser]);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-white">
        <h2 className="text-xl font-bold">Course Not Found</h2>
        <button onClick={() => navigateTo('/courses')} className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg">
          Back to Courses
        </button>
      </div>
    );
  }

  // Auto-enrol if somehow missing
  const currentEnrolment = enrolment || (currentUser ? storageService.enrolInCourse(currentUser.id, currentUser.name, currentUser.email, course.id) : undefined);
  const completedLessonIds = currentEnrolment?.completedLessonIds || [];
  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const activeLesson = allLessons[currentLessonIndex] || allLessons[0];

  // Video Time Updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);

      // Auto mark complete when reaching 95%
      if (
        videoRef.current.duration > 0 &&
        videoRef.current.currentTime / videoRef.current.duration > 0.95 &&
        !completedLessonIds.includes(activeLesson.id) &&
        currentUser
      ) {
        const updated = storageService.markLessonComplete(currentUser.id, course.id, activeLesson.id);
        setEnrolment({ ...updated });
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const seekRelative = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleSeekSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleMarkComplete = (lessonId: string) => {
    if (!currentUser) return;
    const updated = storageService.markLessonComplete(currentUser.id, course.id, lessonId);
    setEnrolment({ ...updated });

    // Advance automatically if available
    if (currentLessonIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[currentLessonIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setActiveLessonId(allLessons[currentLessonIndex - 1].id);
      setActiveTab('overview');
      setIsPlaying(false);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[currentLessonIndex + 1].id);
      setActiveTab('overview');
      setIsPlaying(false);
    } else if (course.quiz) {
      setActiveTab('quiz');
    }
  };

  // Add Timestamped Note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !currentUser) return;

    const note = storageService.addNote(
      currentUser.id,
      course.id,
      activeLesson.id,
      activeLesson.title,
      Math.floor(currentTime),
      newNoteText.trim()
    );

    setNotes([note, ...notes]);
    setNewNoteText('');
  };

  const handleDeleteNote = (noteId: string) => {
    if (!currentUser) return;
    storageService.deleteNote(currentUser.id, course.id, noteId);
    setNotes(notes.filter((n) => n.id !== noteId));
  };

  // Quiz submission
  const handleQuizOptionSelect = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course.quiz || !currentUser) return;

    let correctCount = 0;
    course.quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });

    const percent = Math.round((correctCount / course.quiz.questions.length) * 100);
    const passed = percent >= course.quiz.passingScorePercent;

    setQuizScore(percent);
    setQuizPassed(passed);
    setQuizSubmitted(true);

    const updated = storageService.submitQuizAttempt(currentUser.id, course.id, percent, passed);
    setEnrolment({ ...updated });

    if (passed && updated.certificateId) {
      const cert = storageService.getCertificateById(updated.certificateId);
      if (cert) setActiveCertificate(cert);
    }
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentText.trim() || !currentUser) return;
    const updated = storageService.submitAssignment(currentUser.id, course.id, assignmentText);
    setEnrolment({ ...updated });
    setAssignmentSubmitted(true);
  };

  const handleViewCertificate = () => {
    if (currentEnrolment?.certificateId) {
      const cert = storageService.getCertificateById(currentEnrolment.certificateId);
      if (cert) setActiveCertificate(cert);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Top Classroom Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigateTo('/dashboard')}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title="Back to Student Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-semibold">
              {course.categoryName}
            </span>
            <h1 className="text-sm font-bold text-white truncate max-w-md sm:max-w-xl">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Progress & Certificate Badge */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>Progress:</span>
            <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-teal-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${currentEnrolment?.progressPercent || 0}%` }}
              />
            </div>
            <span className="font-mono text-white font-bold">{currentEnrolment?.progressPercent || 0}%</span>
          </div>

          {currentEnrolment?.certificateId && (
            <button
              onClick={handleViewCertificate}
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Award className="w-4 h-4" />
              <span>View Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Classroom Layout (Left Video & Content, Right Syllabus Sidebar) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Player & Interactive Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto w-full">
            {/* Custom Enhanced Video Player Container */}
            <div className="bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative group">
              <div className="aspect-16/9 relative flex items-center justify-center bg-black">
                {activeLesson ? (
                  <video
                    ref={videoRef}
                    key={activeLesson.id}
                    src={activeLesson.videoUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full h-full object-contain"
                    playsInline
                  />
                ) : (
                  <div className="text-slate-500 text-xs">No video configured for this lesson.</div>
                )}

                {/* Big Center Play Overlay when Paused */}
                {!isPlaying && activeLesson && (
                  <button
                    onClick={togglePlay}
                    className="absolute w-16 h-16 rounded-full bg-teal-500/90 text-slate-950 flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer"
                  >
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </button>
                )}
              </div>

              {/* Player Controls Bar */}
              <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-2.5 flex flex-col gap-2">
                {/* Seekbar */}
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeekSlider}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  {/* Left Controls: Play/Pause, Replay 10s, Forward 10s, Time */}
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="text-white hover:text-teal-400 cursor-pointer">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button onClick={() => seekRelative(-10)} className="text-slate-400 hover:text-white cursor-pointer" title="Rewind 10s">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button onClick={() => seekRelative(10)} className="text-slate-400 hover:text-white cursor-pointer" title="Forward 10s">
                      <RotateCw className="w-4 h-4" />
                    </button>

                    <span className="font-mono text-[11px] text-slate-400">
                      {formatTime(currentTime)} / {formatTime(duration || activeLesson.durationMinutes * 60)}
                    </span>
                  </div>

                  {/* Right Controls: Speed Selector, Volume */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[11px] font-mono">
                      <span className="text-slate-400">Speed:</span>
                      {[1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handleRateChange(rate)}
                          className={`px-1.5 py-0.5 rounded transition-colors ${
                            playbackRate === rate ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Title & Navigation Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Lesson {currentLessonIndex + 1} of {allLessons.length}</span>
                  <span>·</span>
                  <span>{activeLesson?.durationMinutes} minutes</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                  {activeLesson?.title}
                </h2>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                {completedLessonIds.includes(activeLesson?.id) ? (
                  <div className="px-3 py-2 text-xs font-semibold text-teal-400 bg-teal-950/60 border border-teal-800/80 rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    <span>Completed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleMarkComplete(activeLesson.id)}
                    className="px-4 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </button>
                )}

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentLessonIndex === 0}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 transition-colors cursor-pointer"
                    title="Previous Lesson"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextLesson}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    title="Next Lesson"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Tabs Header */}
            <div className="flex border-b border-slate-800 gap-6 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-teal-500 text-teal-400 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Overview & Assets</span>
              </button>

              <button
                onClick={() => setActiveTab('transcript')}
                className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'transcript'
                    ? 'border-b-2 border-teal-500 text-teal-400 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Interactive Transcript</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'notes'
                    ? 'border-b-2 border-teal-500 text-teal-400 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>My Notes ({notes.length})</span>
              </button>

              {course.quiz && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
                    activeTab === 'quiz'
                      ? 'border-b-2 border-teal-500 text-teal-400 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Assessment Quiz</span>
                </button>
              )}

              {course.hasAssignment && (
                <button
                  onClick={() => setActiveTab('assignment')}
                  className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
                    activeTab === 'assignment'
                      ? 'border-b-2 border-teal-500 text-teal-400 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Assignment</span>
                </button>
              )}
            </div>

            {/* Tab 1: Overview & Resources */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Lesson Overview
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {activeLesson?.description}
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Downloads & References
                  </h3>
                  {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                    <div className="space-y-2">
                      {activeLesson.resources.map((res) => (
                        <a
                          key={res.id}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 bg-slate-950 border border-slate-800 hover:border-teal-500/50 rounded-lg flex items-center justify-between text-xs text-slate-300 transition-colors"
                        >
                          <span className="truncate pr-2">{res.title}</span>
                          <Download className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      No external attachments required for this session.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Transcript */}
            {activeTab === 'transcript' && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                      Timestamped Audio Transcript
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Click any timestamp to navigate the video player directly to that segment.
                    </p>
                  </div>
                </div>

                {activeLesson.transcript && activeLesson.transcript.length > 0 ? (
                  <div className="space-y-3">
                    {activeLesson.transcript.map((cue, idx) => (
                      <div
                        key={idx}
                        onClick={() => seekTo(cue.time)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                          currentTime >= cue.time && (idx === activeLesson.transcript!.length - 1 || currentTime < activeLesson.transcript![idx + 1].time)
                            ? 'bg-teal-950/60 border-teal-500/60 text-white'
                            : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-mono text-xs font-bold text-teal-400 bg-slate-900 px-2 py-0.5 rounded shrink-0">
                          {formatTime(cue.time)}
                        </span>
                        <p className="text-xs leading-relaxed">{cue.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-500 space-y-1">
                    <p>Automated transcript sync is processing for this lesson.</p>
                    <p className="text-[11px] text-slate-600">Audio playback and subtitles remain available via player controls.</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Student Notes */}
            {activeTab === 'notes' && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Personal Learning Notes
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Save private timestamps and code insights for this course. Persisted in your student profile.
                  </p>
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="space-y-3 bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      <span>Tagging current time: <strong className="font-mono text-teal-300">{formatTime(currentTime)}</strong></span>
                    </span>
                    <button
                      type="submit"
                      disabled={!newNoteText.trim()}
                      className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>
                  <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Type your note, syntax reminder, or key takeaway here..."
                    rows={3}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </form>

                {/* Notes List */}
                <div className="space-y-3">
                  {notes.length > 0 ? (
                    notes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px]">
                            <button
                              onClick={() => seekTo(note.timestamp)}
                              className="font-mono text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Play className="w-2.5 h-2.5 fill-current" />
                              <span>{formatTime(note.timestamp)}</span>
                            </button>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-400 font-medium">{note.lessonTitle}</span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                            {note.text}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors cursor-pointer shrink-0"
                          title="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-500">
                      You haven't recorded any notes for this course yet. Use the form above to bookmark key insights.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: Quiz Assessment */}
            {activeTab === 'quiz' && course.quiz && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">{course.quiz.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Pass criteria: At least {course.quiz.passingScorePercent}% correct answers required for digital certificate issuance.
                  </p>
                </div>

                {quizSubmitted ? (
                  <div className="space-y-6">
                    <div
                      className={`p-6 rounded-xl border text-center space-y-2 ${
                        quizPassed ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200' : 'bg-rose-950/60 border-rose-500/80 text-rose-200'
                      }`}
                    >
                      <h4 className="text-xl font-extrabold">
                        {quizPassed ? 'Assessment Passed! Congratulations!' : 'Passing Threshold Not Met'}
                      </h4>
                      <p className="text-sm">
                        You scored <strong className="font-mono text-lg">{quizScore}%</strong> (Passing requirement: {course.quiz.passingScorePercent}%)
                      </p>
                      {quizPassed && (
                        <p className="text-xs text-emerald-300">
                          Your verified digital credential from Hridayam by Belvo has been unlocked and verified in the registry!
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedAnswers({});
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
                      >
                        Retake Assessment
                      </button>

                      {quizPassed && currentEnrolment?.certificateId && (
                        <button
                          onClick={handleViewCertificate}
                          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
                        >
                          <Award className="w-4 h-4" />
                          <span>View Official Certificate</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuizSubmit} className="space-y-6">
                    {course.quiz.questions.map((q, idx) => (
                      <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                        <p className="text-xs font-semibold text-slate-300">
                          Question {idx + 1} of {course.quiz?.questions.length}:
                        </p>
                        <p className="text-sm font-bold text-white">{q.prompt}</p>

                        <div className="space-y-2 pt-2">
                          {q.options.map((opt, optIdx) => (
                            <label
                              key={optIdx}
                              onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                              className={`p-3 rounded-lg border text-xs flex items-center gap-3 transition-colors cursor-pointer ${
                                selectedAnswers[q.id] === optIdx
                                  ? 'bg-teal-950/70 border-teal-500 text-white font-medium'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                  selectedAnswers[q.id] === optIdx ? 'border-teal-400 bg-teal-500' : 'border-slate-600'
                                }`}
                              >
                                {selectedAnswers[q.id] === optIdx && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                              </div>
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      type="submit"
                      disabled={Object.keys(selectedAnswers).length < course.quiz.questions.length}
                      className="px-6 py-3 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 text-xs font-extrabold uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      Submit Assessment for Verification
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Tab 5: Assignment */}
            {activeTab === 'assignment' && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
                <div>
                  <h3 className="text-base font-bold text-white">Course Practical Assignment</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {course.assignmentPrompt || 'Implement the course deliverables and submit your GitHub repository or Figma prototype URL for faculty review.'}
                  </p>
                </div>

                {assignmentSubmitted ? (
                  <div className="p-4 bg-emerald-950/60 border border-emerald-500/80 rounded-xl text-xs text-emerald-200 space-y-1">
                    <p className="font-bold">Assignment successfully submitted!</p>
                    <p>Status: Under faculty review. You will receive an email confirmation once reviewed.</p>
                  </div>
                ) : (
                  <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400">Submission Deliverables & Links</label>
                      <textarea
                        rows={4}
                        value={assignmentText}
                        onChange={(e) => setAssignmentText(e.target.value)}
                        placeholder="Paste your GitHub repository link, deployed live URL, or Figma specs here..."
                        className="w-full mt-1.5 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Assignment</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Curriculum Syllabus Sidebar */}
        <div className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Course Content
            </span>
            <span className="text-xs font-mono text-teal-400">
              {completedLessonIds.length} / {allLessons.length} completed
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80">
            {course.modules.map((mod) => (
              <div key={mod.id} className="p-4 space-y-2">
                <p className="text-xs font-bold text-slate-300">
                  {mod.title}
                </p>

                <div className="space-y-1 pt-1">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    const isCompleted = completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveLessonId(lesson.id);
                          setActiveTab('overview');
                        }}
                        className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                          isActive
                            ? 'bg-teal-950/80 border border-teal-500/80 text-white font-semibold'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 shrink-0">
                          {lesson.durationMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
