import React, { Component, useCallback, useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppView, Certificate, Course, Enrolment, ReferralSubmission } from './types';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { PlacementsView } from './components/PlacementsView';
import { ReferEarnView } from './components/ReferEarnView';
import { ClassroomCentersView } from './components/ClassroomCentersView';
import { ReviewsView } from './components/ReviewsView';
import { ContactView } from './components/ContactView';
import { CatalogueView } from './components/CatalogueView';
import { CourseDetailView } from './components/CourseDetailView';
import { StudentPortalView } from './components/StudentPortalView';
import { CounselorAdminView } from './components/CounselorAdminView';
import { AdminLoginView } from './components/AdminLoginView';
import { StudentLoginView } from './components/StudentLoginView';
import { CallbackModal } from './components/CallbackModal';
import { BrochureModal } from './components/BrochureModal';
import { CheckoutModal, CheckoutTarget } from './components/CheckoutModal';
import { ToastMessage, ToastStack } from './components/Toast';
import { Footer } from './components/Footer';
import { GoogleIcon } from './components/GoogleIcon';
import { GlitterCursor } from './components/GlitterCursor';
import { BackgroundDoodles } from './components/ThemeDoodles';
import { ITV_COURSES, ITvedantCourse } from './data/itvedantData';

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
        <div className="min-h-screen bg-[#060D1E] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-panel rounded-3xl p-8 text-center shadow-xl">
            <h1 className="font-display text-xl font-bold text-white">
              Something interrupted the session
            </h1>
            <p className="text-sm text-sky-200 mt-2">
              Please reload the page to restore your Hridayam by Belvo session.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-blue-primary mt-5 px-5 py-2.5 text-xs font-bold rounded-xl text-white shadow-md cursor-pointer"
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
  const { user } = useAuth();
  const [view, setView] = useState<AppView>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(ITV_COURSES[0].id);

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
      } as any,
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
      'Referral Logged Successfully!',
      `Referral code ${submission.referralCode} registered. ₹5,000 Amazon Voucher due on enrollment.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-900 relative selection:bg-blue-500/20 overflow-x-hidden bg-[#FFFFFF]">
      {/* Shiny & Glittering Mouse Cursor with Particle Trails */}
      <GlitterCursor />

      {/* Suitable Education Theme Background with Animated Doodles & Blueprint Grid */}
      <BackgroundDoodles />

      {/* Background Looping Education Media Canvas (Subtle High-Key Texture on White) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-12 filter contrast-[1.2] brightness-[1.1] scale-105"
          src="/site-bg.mp4"
        />
        {/* Soft Pristine White Gradient Overlay for High Readability and Blue-White Premium Aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/88 to-white/98 pointer-events-none" />
      </div>

      {/* Main Navbar */}
      <div className="relative z-30">
        <Navbar
          currentView={view}
          onNavigate={navigate}
          onRequestCallback={handleOpenCallback}
          onSelectCourse={handleSelectCourse}
        />
      </div>

      {/* Main View Router */}
      <main className="flex-1 pt-20">
        {view === 'home' && (
          <HomeView
            onNavigate={navigate}
            onSelectCourse={handleSelectCourse}
            onRequestCallback={handleOpenCallback}
            onDownloadBrochure={handleOpenBrochure}
          />
        )}

        {view === 'placements' && (
          <PlacementsView onRequestCallback={handleOpenCallback} />
        )}

        {view === 'refer-earn' && (
          <ReferEarnView onReferralSuccess={handleReferralRegistered} />
        )}

        {view === 'contact' && (
          <ContactView onToast={pushToast} />
        )}

        {view === 'hire-from-us' && (
          <PlacementsView onRequestCallback={handleOpenCallback} />
        )}

        {view === 'centers' && (
          <ClassroomCentersView onRequestCallback={handleOpenCallback} />
        )}

        {view === 'reviews' && (
          <ReviewsView onRequestCallback={() => handleOpenCallback('General Inquiry')} />
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

        {view === 'student' && (
          <StudentPortalView
            onNavigateHome={() => navigate('home')}
            onExploreCourses={() => navigate('catalogue')}
            onToast={pushToast}
          />
        )}

        {view === 'instructor' && (
          <CounselorAdminView
            onToast={pushToast}
            onLogout={() => navigate('home')}
          />
        )}

        {view === 'admin-login' && (
          <AdminLoginView
            onEnterAdminConsole={() => navigate('instructor')}
            onGoStudentHub={() => navigate('student')}
            onToast={pushToast}
          />
        )}

        {view === 'student-login' && (
          <StudentLoginView
            onSuccess={() => navigate('student')}
            onGoAdminLogin={() => navigate('admin-login')}
            onToast={pushToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} onRequestCallback={handleOpenCallback} />

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

      {/* WhatsApp Quick Floating Action Button */}
      <aside aria-label="Support &amp; quick chat options">
        <a
          href="https://wa.me/918928466820?text=Hi%20Hridayam%20by%20Belvo,%20I%20am%20interested%20in%20learning%20more%20about%20your%20courses%20and%20100%25%20placement%20assurance."
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 group cursor-pointer border-2 border-white"
          title="Chat on WhatsApp (+91 89284 66820)"
          aria-label="Chat on WhatsApp"
        >
          <GoogleIcon name="chat" size={24} className="text-white" filled />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
            Chat on WhatsApp
          </span>
        </a>

        {/* Sticky Mobile Quick Callback Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 text-slate-900 p-3 border-t-2 border-blue-200 flex items-center justify-between gap-3 shadow-2xl backdrop-blur-md">
          <a
            href="tel:+918928466820"
            className="flex-1 py-2.5 rounded-xl border border-blue-300 text-center font-bold text-xs flex items-center justify-center gap-1.5 text-blue-700 bg-blue-50/70"
            aria-label="Call Hridayam Admissions at +91 89284 66820"
          >
            <GoogleIcon name="call" size={16} className="text-blue-600" />
            Call Admissions
          </a>
          <button
            onClick={() => handleOpenCallback()}
            className="flex-1 py-2.5 rounded-xl btn-blue-primary text-white text-center font-bold text-xs uppercase tracking-wider shadow-md"
          >
            Book Free Demo
          </button>
        </div>
      </aside>

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
