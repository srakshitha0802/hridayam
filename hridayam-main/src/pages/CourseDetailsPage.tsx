import React, { useState } from 'react';
import { Course } from '../types';
import { storageService } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { navigateTo } from '../utils/navigation';
import { VideoModal } from '../components/common/VideoModal';
import { RazorpayCheckoutModal } from '../components/common/RazorpayCheckoutModal';
import { CourseCard } from '../components/common/CourseCard';
import {
  Clock,
  BookOpen,
  Globe,
  Award,
  CheckCircle2,
  Play,
  Lock,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  CreditCard,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const CourseDetailsPage: React.FC<{ courseId: string }> = ({ courseId }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [course] = useState<Course | undefined>(() => storageService.getCourseById(courseId));
  const [allCourses] = useState<Course[]>(() => storageService.getCourses());

  // Enrolment state
  const isEnrolled = currentUser ? !!storageService.getEnrolment(currentUser.id, courseId) : false;

  // Video preview modal
  const [activeVideoModal, setActiveVideoModal] = useState<{
    isOpen: boolean;
    title: string;
    videoUrl: string;
    subtitle?: string;
  }>({
    isOpen: false,
    title: '',
    videoUrl: ''
  });

  // Razorpay payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Expanded modules state
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1-1': true,
    'mod-1-2': true,
    'mod-2-1': true,
    'mod-3-1': true,
    'mod-4-1': true,
    'mod-5-1': true,
    'mod-6-1': true,
    'mod-7-1': true,
    'mod-8-1': true,
    'mod-9-1': true,
    'mod-10-1': true,
    'mod-11-1': true,
  });

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#21131B]">Course Not Found</h2>
        <p className="text-sm text-[#756572]">The requested course could not be located or has been archived.</p>
        <button
          onClick={() => navigateTo('/courses')}
          className="px-5 py-2.5 text-xs font-bold text-white bg-[#C2185B] rounded-xl hover:bg-[#760D3B] transition-colors cursor-pointer"
        >
          Back to Catalogue
        </button>
      </div>
    );
  }

  const isFree = course.price === 0;
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const relatedCourses = allCourses.filter((c) => c.categoryId === course.categoryId && c.id !== course.id);

  const handleEnrollmentAction = () => {
    if (!isAuthenticated || !currentUser) {
      navigateTo('/login');
      return;
    }

    if (isEnrolled) {
      navigateTo(`/learn/${course.id}`);
      return;
    }

    if (isFree) {
      storageService.enrolInCourse(currentUser.id, currentUser.name, currentUser.email, course.id);
      navigateTo(`/learn/${course.id}`);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handleOpenTrailer = () => {
    const trailerUrl =
      course.previewVideoUrl ||
      course.modules[0]?.lessons[0]?.videoUrl ||
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    setActiveVideoModal({
      isOpen: true,
      title: `${course.title} — Official Course Trailer`,
      videoUrl: trailerUrl,
      subtitle: `Instructed by ${course.instructor.name} (${course.instructor.agency})`
    });
  };

  const handleOpenLessonPreview = (lessonTitle: string, videoUrl: string) => {
    setActiveVideoModal({
      isOpen: true,
      title: lessonTitle,
      videoUrl,
      subtitle: `Course: ${course.title}`
    });
  };

  return (
    <div className="pb-24">
      {/* ----------------- Header Banner with Media Composition ----------------- */}
      <section className="bg-[#21131B] text-white border-b border-[#760D3B]/40 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 cols: Course Info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E83E8C]">
                <span>{course.categoryName}</span>
                <span className="text-[#756572]">/</span>
                <span className="text-[#FCE7F3]">{course.level} Level</span>
                {course.format && (
                  <>
                    <span className="text-[#756572]">/</span>
                    <span className="bg-[#760D3B]/80 border border-[#C2185B]/60 text-[#FCE7F3] px-2 py-0.5 rounded text-[10px]">
                      {course.format}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-[#FCE7F3]/80 leading-relaxed max-w-2xl">
                {course.shortDescription}
              </p>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-[#FCE7F3]/70 border-t border-[#760D3B]/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#E83E8C]" />
                  <span>{course.durationHours} hours on-demand</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#E83E8C]" />
                  <span>{totalLessons} lessons & practical exercises</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#E83E8C]" />
                  <span>Language: {course.language}</span>
                </span>
                {course.certificateEligible && (
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#E83E8C]" />
                    <span>Verifiable Belvo Certificate</span>
                  </span>
                )}
              </div>

              {/* Instructor profile snippet */}
              <div className="flex items-center gap-3 pt-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#C2185B]/60"
                />
                <div>
                  <p className="text-xs font-bold text-white">{course.instructor.name}</p>
                  <p className="text-[11px] text-[#FCE7F3]/70">{course.instructor.role} · {course.instructor.agency}</p>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Interactive Thumbnail / Trailer Card */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-2xl overflow-hidden border border-[#760D3B]/60 shadow-2xl aspect-16/9 bg-[#21131B] cursor-pointer">
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {/* Vignette */}
                <div className="absolute inset-0 bg-[#21131B]/60 group-hover:bg-[#21131B]/40 transition-colors flex items-center justify-center" onClick={handleOpenTrailer}>
                  <div className="w-16 h-16 rounded-full bg-[#C2185B] hover:bg-[#E83E8C] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10 pointer-events-none">
                  <span className="bg-[#21131B]/80 px-2.5 py-1 rounded backdrop-blur-xs font-medium border border-white/10">
                    Watch Course Preview Trailer
                  </span>
                  <span className="bg-[#760D3B] px-2.5 py-1 rounded backdrop-blur-xs font-mono text-[#FCE7F3] font-bold">
                    HD 1080p
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- Sticky Purchase Strip / Two Column Layout ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main 8 Columns: Curriculum & Deep Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Full Description */}
            <section className="bg-white rounded-2xl border border-[#F0D6E3] p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-[#21131B]">About This Program</h2>
              <p className="text-xs sm:text-sm text-[#756572] leading-relaxed whitespace-pre-line">
                {course.fullDescription}
              </p>
            </section>

            {/* What You Will Master */}
            <section className="bg-white rounded-2xl border border-[#F0D6E3] p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C2185B]" />
                <h2 className="text-xl font-bold text-[#21131B]">What You Will Master</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#21131B] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#C2185B] shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Syllabus / Interactive Curriculum Accordion */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#21131B]">Curriculum Syllabus</h2>
                  <p className="text-xs text-[#756572] mt-0.5">
                    {course.modules.length} modules · {totalLessons} lessons with video playback & source files
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {course.modules.map((mod) => {
                  const isExpanded = expandedModules[mod.id] ?? true;
                  return (
                    <div key={mod.id} className="bg-white rounded-2xl border border-[#F0D6E3] overflow-hidden shadow-xs">
                      {/* Module Header Toggle */}
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full px-5 py-4 bg-[#FFF5F9] hover:bg-[#FCE7F3]/60 flex items-center justify-between text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#C2185B] bg-[#FCE7F3] px-2.5 py-0.5 rounded-md border border-[#F0D6E3]">
                            Module {mod.order}
                          </span>
                          <span className="text-sm font-bold text-[#21131B]">{mod.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#756572]">
                          <span>{mod.lessons.length} {mod.lessons.length === 1 ? 'lesson' : 'lessons'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-[#760D3B]" /> : <ChevronDown className="w-4 h-4 text-[#760D3B]" />}
                        </div>
                      </button>

                      {/* Lessons list */}
                      {isExpanded && (
                        <div className="divide-y divide-[#F0D6E3]/50">
                          {mod.lessons.map((lesson) => (
                            <div key={lesson.id} className="p-4 sm:px-6 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                {lesson.isPreview ? (
                                  <button
                                    onClick={() => handleOpenLessonPreview(lesson.title, lesson.videoUrl)}
                                    className="w-8 h-8 rounded-full bg-[#FCE7F3] text-[#C2185B] hover:bg-[#C2185B] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-[#F0D6E3]"
                                    title="Watch Preview Lesson"
                                  >
                                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                                  </button>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-[#FFFBFD] text-[#756572] flex items-center justify-center shrink-0 border border-[#F0D6E3]">
                                    <Lock className="w-3.5 h-3.5" />
                                  </div>
                                )}
                                <div className="truncate">
                                  <p className="text-xs font-semibold text-[#21131B] truncate">{lesson.title}</p>
                                  <p className="text-[11px] text-[#756572] truncate mt-0.5">{lesson.description}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                {lesson.isPreview && (
                                  <button
                                    onClick={() => handleOpenLessonPreview(lesson.title, lesson.videoUrl)}
                                    className="text-[11px] font-bold text-[#C2185B] hover:underline cursor-pointer bg-[#FCE7F3] px-2.5 py-0.5 rounded-md"
                                  >
                                    Preview Video
                                  </button>
                                )}
                                <span className="text-xs font-mono text-[#756572] tabular-nums">
                                  {lesson.durationMinutes}m
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Assessment & Certification Requirements */}
            <section className="bg-white rounded-2xl border border-[#F0D6E3] p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-[#21131B]">Assessments & Certification Standard</h2>
              <div className="space-y-3.5 text-xs text-[#756572] leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <FileCheck className="w-4 h-4 text-[#C2185B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#21131B]">Module Quizzes:</strong> Contains multiple-choice & scenario tests. Passing grade:{' '}
                    <span className="font-semibold text-[#21131B]">{course.quiz?.passingScorePercent || 80}%</span>. Graded server-side with instant feedback.
                  </div>
                </div>

                {course.hasAssignment && (
                  <div className="flex items-start gap-2.5">
                    <FileCheck className="w-4 h-4 text-[#C2185B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#21131B]">Hands-on Assignment:</strong> {course.assignmentPrompt}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#E83E8C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#21131B]">Digital Certificate:</strong> Generated upon 100% video completion + passing quiz score. Comes with an immutable verification record ID verifiable publicly.
                  </div>
                </div>
              </div>
            </section>

            {/* Prerequisites */}
            <section className="bg-white rounded-2xl border border-[#F0D6E3] p-6 sm:p-8 space-y-3 shadow-xs">
              <h2 className="text-lg font-bold text-[#21131B]">Prerequisites</h2>
              <ul className="space-y-2 text-xs text-[#756572] list-disc list-inside">
                {course.prerequisites.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right 4 Columns: Sticky Purchase Card & Instructor */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sticky Card */}
            <div className="bg-white border border-[#F0D6E3] rounded-2xl p-6 shadow-md space-y-5 sticky top-24">
              {/* Price display */}
              <div className="border-b border-[#F0D6E3]/60 pb-4">
                {isFree ? (
                  <div>
                    <span className="text-2xl font-extrabold text-[#C2185B]">100% Free Course</span>
                    <p className="text-xs text-[#756572] mt-0.5">Complimentary foundational curriculum</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#21131B] tabular-nums">
                        ₹{course.price.toLocaleString('en-IN')}
                      </span>
                      {course.discountPercent && (
                        <span className="text-sm text-[#756572] line-through tabular-nums">
                          ₹{Math.round(course.price / (1 - course.discountPercent / 100)).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#756572] mt-1">One-time payment · Full lifetime access & updates</p>
                  </div>
                )}
              </div>

              {/* Primary CTA */}
              <button
                onClick={handleEnrollmentAction}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#C2185B] hover:bg-[#760D3B] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
              >
                {isEnrolled ? (
                  <>
                    <span>Go to Learning Classroom</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : !isAuthenticated ? (
                  <>
                    <span>Log In to Enrol</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : isFree ? (
                  <>
                    <span>Enrol Free & Start Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-[#FCE7F3]" />
                    <span>Enrol in Masterclass</span>
                  </>
                )}
              </button>

              {/* Preview Button */}
              <button
                onClick={handleOpenTrailer}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#760D3B] hover:text-[#C2185B] bg-[#FFF5F9] hover:bg-[#FCE7F3] border border-[#F0D6E3] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Free Video Trailer</span>
              </button>

              {/* Assurance details */}
              <div className="space-y-2 text-xs text-[#756572] pt-2 border-t border-[#F0D6E3]/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C2185B] shrink-0" />
                  <span>Full on-demand video access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C2185B] shrink-0" />
                  <span>Graded assessments & assignments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C2185B] shrink-0" />
                  <span>Verifiable Belvo Certificate upon completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C2185B] shrink-0" />
                  <span>7-Day Refund Policy Protected</span>
                </div>
              </div>
            </div>

            {/* Instructor Bio Box */}
            <div className="bg-white rounded-2xl border border-[#F0D6E3] p-6 space-y-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#760D3B]">
                Your Instructor
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#F0D6E3]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#21131B]">{course.instructor.name}</h4>
                  <p className="text-xs text-[#C2185B] font-bold">{course.instructor.role}</p>
                  <p className="text-[11px] text-[#756572]">{course.instructor.agency}</p>
                </div>
              </div>
              <p className="text-xs text-[#756572] leading-relaxed">
                {course.instructor.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Related Courses Carousel/Grid */}
        {relatedCourses.length > 0 && (
          <div className="pt-20 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#C2185B] font-bold">
                More in this Domain
              </span>
              <h3 className="text-2xl font-bold text-[#21131B] mt-1">
                Related Courses & Masterclasses
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.slice(0, 3).map((rel) => (
                <CourseCard key={rel.id} course={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      <VideoModal
        isOpen={activeVideoModal.isOpen}
        onClose={() => setActiveVideoModal({ ...activeVideoModal, isOpen: false })}
        title={activeVideoModal.title}
        videoUrl={activeVideoModal.videoUrl}
        subtitle={activeVideoModal.subtitle}
        categoryName={course.categoryName}
      />

      {/* Razorpay Indian Checkout Modal */}
      {currentUser && (
        <RazorpayCheckoutModal
          course={course}
          user={currentUser}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            setShowPaymentModal(false);
            navigateTo(`/learn/${course.id}`);
          }}
        />
      )}
    </div>
  );
};
