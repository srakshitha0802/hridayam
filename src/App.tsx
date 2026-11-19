import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, Search, Sparkles, Star } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppView, AuthRole, ReferralSubmission } from './types';
import { Navbar } from './components/Navbar';
import { MetallicCursorAura } from './components/MetallicCursorAura';
import { HomeView } from './components/HomeView';
import { PlacementsView } from './components/PlacementsView';
import { ReferEarnView } from './components/ReferEarnView';
import { ClassroomCentersView } from './components/ClassroomCentersView';
import { ReviewsView } from './components/ReviewsView';
import { ContactView } from './components/ContactView';
import { CatalogueView } from './components/CatalogueView';
import { CourseDetailView } from './components/CourseDetailView';
import { StudentPortalView } from './components/StudentPortalView';
import { MentorPortalView } from './components/MentorPortalView';
import { RecruiterPortalView } from './components/RecruiterPortalView';
import { CounselorAdminView } from './components/CounselorAdminView';
import { PortalLoginView } from './components/PortalLoginView';
import { FrontPageChatbot } from './components/FrontPageChatbot';
import { CommandPalette } from './components/CommandPalette';
import { CallbackModal } from './components/CallbackModal';
import { BrochureModal } from './components/BrochureModal';
import { CheckoutModal, CheckoutTarget } from './components/CheckoutModal';
import { ToastMessage, ToastStack } from './components/Toast';
import { Footer } from './components/Footer';
import { ITV_COURSES, ITvedantCourse } from './data/itvedantData';
import { SITE_BACKGROUND_VIDEO } from './data/mediaAssets';
import { useSeoMetadata } from './hooks/useSeoMetadata';

class AppErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#071433] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white text-[#0B1B3D] rounded-3xl p-8 text-center shadow-2xl space-y-4">
            <h1 className="font-display text-xl font-extrabold">
              Something interrupted the session
            </h1>
            <p className="text-sm text-slate-600">
              Please reload the page to restore your Hridayam by Belvo session.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-blue-primary px-5 py-2.5 text-xs font-bold rounded-xl text-white cursor-pointer"
            >
              Reload Platform
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function PlatformShell() {
  const { user, hasAccessToRole } = useAuth();
  const [view, setView] = useState<AppView>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(ITV_COURSES[0].id);

  // Dynamic route-aware SEO metadata, canonical URL, OpenGraph & Course JSON-LD
  useSeoMetadata(view, selectedCourseId);

  // Chatbot, Cursor FX & Global Quick-Find Command Palette state
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [cursorFxEnabled, setCursorFxEnabled] = useState(true);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced && bgVideoRef.current) {
      bgVideoRef.current.pause();
      setVideoPaused(true);
    }
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const toggleAmbientVideo = () => {
    const videoEl = bgVideoRef.current;
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play().catch(() => {});
      setVideoPaused(false);
    } else {
      videoEl.pause();
      setVideoPaused(true);
    }
  };

  // Modals
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [callbackPresetCourse, setCallbackPresetCourse] = useState<string | undefined>();
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [brochurePresetCourse, setBrochurePresetCourse] = useState<string | undefined>();

  // Payment & Enrolment Checkout Modal
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutTarget, setCheckoutTarget] = useState<CheckoutTarget | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback(
    (type: ToastMessage['type'], title: string, description?: string) => {
      const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, type, title, description }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 4500);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const navigate = (nextView: AppView) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCallback = (courseInterest?: string) => {
    setCallbackPresetCourse(courseInterest);
    setCallbackModalOpen(true);
  };

  const handleOpenBrochure = (courseTitle?: string) => {
    setBrochurePresetCourse(courseTitle);
    setBrochureModalOpen(true);
  };

  const handleOpenCheckout = (course: ITvedantCourse) => {
    if (!user) {
      pushToast(
        'info',
        'Student Login Required',
        'Sign in with the fixed Student Demo account to complete enrollment.'
      );
      navigate('student-login');
      return;
    }

    setCheckoutTarget({
      kind: 'course',
      course: {
        id: course.id,
        title: course.title,
        category: course.category,
        level: 'Intermediate',
        summary: course.summary,
        description: course.description,
        price: course.fee || 48000,
        currency: 'INR',
        isFree: course.fee === 0,
        includedInSubscription: true,
        durationHours: 120,
        thumbnailUrl: '/logo.png',
        instructorId: 'belvo_faculty',
        instructorName: 'Belvo Faculty',
        status: 'published',
        outcomes: course.keyHighlights || [],
        modulesCount: course.curriculum?.length || 4,
        enrolledCount: course.reviewCount || 100,
      },
    });
    setCheckoutModalOpen(true);
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    navigate('course');
  };

  const handleReferralRegistered = (submission: ReferralSubmission) => {
    pushToast(
      'success',
      'Referral Logged Successfully',
      `Referral code ${submission.referralCode} registered. ₹5,000 Amazon Voucher due on enrollment.`
    );
  };

  const renderProtectedOrLogin = (
    requiredRole: AuthRole,
    targetView: AppView,
    portalLabel: string,
    content: React.ReactNode
  ) => {
    if (hasAccessToRole(requiredRole)) {
      return content;
    }

    const reason = user
      ? `You are currently signed in as ${user.roleLabel}. Sign in with the ${portalLabel} fixed demo account (or Institute Admin) to open this page.`
      : `Authentication required: Sign in with the fixed ${portalLabel} demo credentials to access this portal.`;

    return (
      <PortalLoginView
        initialRole={requiredRole}
        targetViewAfterLogin={targetView}
        lockedReason={reason}
        onAuthenticated={(dest) => navigate(dest)}
        onBackHome={() => navigate('home')}
        onToast={pushToast}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col text-[#132C63] relative selection:bg-[#94BCF1]/45 overflow-x-hidden">
      {/* FULL-SITE ANIMATED VIDEO BACKGROUND */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#5B93E6]"
        aria-hidden="true"
      >
        <video
          ref={bgVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
          src={SITE_BACKGROUND_VIDEO}
        />
        {/* Airy luminous pastel-sky veil so live waves glow vividly behind white-blue glass */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6FA6EE]/20 via-[#9AC8FF]/16 to-[#2B59B5]/24" />
      </div>

      {/* Interactive 60fps Metallic White-Blue Glitter Cursor & Specular Card Sheen */}
      <MetallicCursorAura enabled={cursorFxEnabled} />

      {/* Right-Edge Vertical Google Reviews Floating Tab (matches target design) */}
      <button
        type="button"
        onClick={() => navigate('reviews')}
        className="hidden md:flex fixed right-0 top-[34%] z-30 flex-col items-center gap-1.5 px-2 py-3.5 rounded-l-2xl bg-white/90 hover:bg-white backdrop-blur-lg border-y-2 border-l-2 border-white text-[#1E428E] shadow-lg transition-all hover:-translate-x-0.5 cursor-pointer"
        aria-label="Read 5,280+ Verified Google Reviews (4.9 Stars)"
      >
        <span className="text-[10px] font-extrabold tracking-wide [writing-mode:vertical-rl] rotate-180">
          Google Reviews
        </span>
        <span className="text-[11px] font-extrabold font-mono-tabular text-[#1E428E]">4.9</span>
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      </button>

      {/* Main Navbar */}
      <Navbar
        currentView={view}
        onNavigate={navigate}
        onRequestCallback={handleOpenCallback}
        onSelectCourse={handleSelectCourse}
      />

      {/* Main View Router */}
      <main className="flex-1 pt-[74px] relative z-10">
        {view === 'home' && (
          <HomeView
            onNavigate={navigate}
            onSelectCourse={handleSelectCourse}
            onRequestCallback={handleOpenCallback}
            onDownloadBrochure={handleOpenBrochure}
            onOpenChatbot={() => setChatbotOpen(true)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          />
        )}

        {view === 'placements' && (
          <PlacementsView onRequestCallback={handleOpenCallback} />
        )}

        {view === 'hire-from-us' &&
          renderProtectedOrLogin(
            'recruiter',
            'recruiter-portal',
            'Hiring Partner',
            <RecruiterPortalView
              onLogout={() => navigate('home')}
              onNavigate={navigate}
              onToast={pushToast}
            />
          )}

        {view === 'refer-earn' &&
          renderProtectedOrLogin(
            'student',
            'refer-earn',
            'Student LMS',
            <ReferEarnView onReferralSuccess={handleReferralRegistered} onNavigate={navigate} />
          )}

        {view === 'contact' && <ContactView onToast={pushToast} />}

        {view === 'centers' && (
          <ClassroomCentersView onRequestCallback={handleOpenCallback} />
        )}

        {view === 'reviews' && (
          <ReviewsView
            onRequestCallback={() => handleOpenCallback('General Inquiry')}
          />
        )}

        {view === 'catalogue' && (
          <CatalogueView
            onSelectCourse={handleSelectCourse}
            onRequestCallback={handleOpenCallback}
            onEnrollCourse={handleOpenCheckout}
          />
        )}

        {view === 'course' && (
          <CourseDetailView
            courseId={selectedCourseId}
            onBack={() => navigate('catalogue')}
            onRequestCallback={handleOpenCallback}
            onDownloadBrochure={handleOpenBrochure}
          />
        )}

        {/* Role-Protected Portals */}
        {view === 'student' &&
          renderProtectedOrLogin(
            'student',
            'student',
            'Student LMS',
            <StudentPortalView
              onNavigateHome={() => navigate('home')}
              onExploreCourses={() => navigate('catalogue')}
              onNavigate={navigate}
              onToast={pushToast}
            />
          )}

        {view === 'mentor-portal' &&
          renderProtectedOrLogin(
            'mentor',
            'mentor-portal',
            'Faculty & Mentor',
            <MentorPortalView
              onLogout={() => navigate('home')}
              onNavigate={navigate}
              onToast={pushToast}
            />
          )}

        {view === 'recruiter-portal' &&
          renderProtectedOrLogin(
            'recruiter',
            'recruiter-portal',
            'Hiring Partner',
            <RecruiterPortalView
              onLogout={() => navigate('home')}
              onNavigate={navigate}
              onToast={pushToast}
            />
          )}

        {view === 'instructor' &&
          renderProtectedOrLogin(
            'admin',
            'instructor',
            'Institute Admin',
            <CounselorAdminView
              onToast={pushToast}
              onLogout={() => navigate('home')}
              onNavigate={navigate}
            />
          )}

        {/* Explicit Login Views */}
        {view === 'portal-login' && (
          <PortalLoginView
            initialRole="student"
            onAuthenticated={(dest) => navigate(dest)}
            onBackHome={() => navigate('home')}
            onToast={pushToast}
          />
        )}

        {view === 'student-login' && (
          <PortalLoginView
            initialRole="student"
            targetViewAfterLogin="student"
            onAuthenticated={(dest) => navigate(dest)}
            onBackHome={() => navigate('home')}
            onToast={pushToast}
          />
        )}

        {view === 'mentor-login' && (
          <PortalLoginView
            initialRole="mentor"
            targetViewAfterLogin="mentor-portal"
            onAuthenticated={(dest) => navigate(dest)}
            onBackHome={() => navigate('home')}
            onToast={pushToast}
          />
        )}

        {view === 'recruiter-login' && (
          <PortalLoginView
            initialRole="recruiter"
            targetViewAfterLogin="recruiter-portal"
            onAuthenticated={(dest) => navigate(dest)}
            onBackHome={() => navigate('home')}
            onToast={pushToast}
          />
        )}

        {view === 'admin-login' && (
          <PortalLoginView
            initialRole="admin"
            targetViewAfterLogin="instructor"
            onAuthenticated={(dest) => navigate(dest)}
            onBackHome={() => navigate('home')}
            onToast={pushToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigate}
        onRequestCallback={handleOpenCallback}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Desktop Ambient Video, Mouse Sparkle FX & Quick-Find Control Dock */}
      <div className="hidden md:flex fixed bottom-5 left-5 z-30 items-center gap-2">
        <button
          type="button"
          onClick={toggleAmbientVideo}
          className="metallic-btn-ice px-3 py-2 rounded-xl text-[11px] font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
          aria-label={videoPaused ? 'Play background video' : 'Pause background video'}
          title={videoPaused ? 'Play background video' : 'Pause background video'}
        >
          {videoPaused ? (
            <Play className="w-3.5 h-3.5 text-[#2B59B5]" />
          ) : (
            <Pause className="w-3.5 h-3.5 text-[#2B59B5]" />
          )}
          <span>{videoPaused ? 'Play Video' : 'Pause Video'}</span>
        </button>

        <button
          type="button"
          onClick={() => setCursorFxEnabled((prev) => !prev)}
          className="metallic-btn-ice px-3 py-2 rounded-xl text-[11px] font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
          aria-label={cursorFxEnabled ? 'Disable metallic mouse effects' : 'Enable metallic mouse effects'}
        >
          <Sparkles
            className={`w-3.5 h-3.5 ${cursorFxEnabled ? 'text-[#2563EB]' : 'text-slate-400'}`}
          />
          <span>{cursorFxEnabled ? 'Mouse FX On' : 'Mouse FX Off'}</span>
        </button>

        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="metallic-btn-ice px-3 py-2 rounded-xl text-[11px] font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
          aria-label="Open Quick Find Command Palette"
        >
          <Search className="w-3.5 h-3.5 text-[#2B59B5]" />
          <span>Quick Find</span>
          <kbd className="font-mono-tabular text-[10px] text-[#3869C3] ml-0.5">⌘K</kbd>
        </button>
      </div>

      {/* Global Quick-Find Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={navigate}
        onSelectCourse={handleSelectCourse}
        onRequestCallback={handleOpenCallback}
        onDownloadBrochure={handleOpenBrochure}
        onOpenChatbot={() => setChatbotOpen(true)}
      />

      {/* Front-Page & Site-Wide Career Advisor Chatbot */}
      <FrontPageChatbot
        isOpen={chatbotOpen}
        onToggle={setChatbotOpen}
        onNavigate={navigate}
        onRequestCallback={handleOpenCallback}
      />

      {/* Modals */}
      <CallbackModal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        presetCourse={callbackPresetCourse}
      />

      <BrochureModal
        isOpen={brochureModalOpen}
        onClose={() => setBrochureModalOpen(false)}
        courseTitle={brochurePresetCourse}
      />

      {/* Payment & Enrolment Checkout Modal */}
      {checkoutModalOpen && checkoutTarget && (
        <CheckoutModal
          target={checkoutTarget}
          onClose={() => setCheckoutModalOpen(false)}
          onSuccessCourse={() => {
            setCheckoutModalOpen(false);
            navigate('student');
          }}
          onSuccessSubscription={() => {
            setCheckoutModalOpen(false);
            navigate('student');
          }}
          onToast={pushToast}
        />
      )}

      {/* Global Toast Stack */}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <AuthProvider>
        <PlatformShell />
      </AuthProvider>
    </AppErrorBoundary>
  );
}
