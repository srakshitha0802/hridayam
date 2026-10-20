import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useLocation } from './utils/navigation';
import { storageService } from './services/storage';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AnnouncementBar } from './components/common/AnnouncementBar';

// Pages
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { LearningPathsPage } from './pages/LearningPathsPage';
import { AboutHridayamPage, AboutBelvoPage } from './pages/AboutPages';
import { InstructorsPage } from './pages/InstructorsPage';
import { ResourcesBlogPage } from './pages/ResourcesBlogPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { CertificateVerifyPage } from './pages/CertificateVerifyPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { LearningInterface } from './pages/student/LearningInterface';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/AuthPages';
import { PrivacyPolicyPage, TermsPage, RefundPolicyPage } from './pages/LegalPages';

function AppContent() {
  const { path, params, query } = useLocation();
  const [announcement] = useState(() => storageService.getAnnouncement());

  // Render current view based on path
  const renderView = () => {
    // 1. Learning Classroom Interface (full-bleed layout)
    if (path.startsWith('/learn/') && params.courseId) {
      return <LearningInterface courseId={params.courseId} />;
    }

    // 2. Course Details Page
    if (path.startsWith('/course/') && params.courseId) {
      return <CourseDetailsPage courseId={params.courseId} />;
    }

    // 3. Other Pages
    switch (path) {
      case '/':
      case '':
        return <HomePage />;

      case '/courses':
        return <CoursesPage initialCategory={query.category} />;

      case '/categories':
        return <CategoriesPage />;

      case '/paths':
        return <LearningPathsPage />;

      case '/about-hridayam':
        return <AboutHridayamPage />;

      case '/about-belvo':
        return <AboutBelvoPage />;

      case '/instructors':
        return <InstructorsPage />;

      case '/resources':
        return <ResourcesBlogPage />;

      case '/contact':
        return <ContactPage />;

      case '/faq':
        return <FAQPage />;

      case '/verify-certificate':
        return <CertificateVerifyPage initialCertId={query.id || params.certificateId} />;

      case '/dashboard':
        return <StudentDashboard initialTab={query.tab} />;

      case '/admin':
        return <AdminDashboard />;

      case '/login':
        return <LoginPage />;

      case '/register':
        return <RegisterPage />;

      case '/forgot-password':
        return <ForgotPasswordPage />;

      case '/privacy':
        return <PrivacyPolicyPage />;

      case '/terms':
        return <TermsPage />;

      case '/refund':
        return <RefundPolicyPage />;

      default:
        return <HomePage />;
    }
  };

  // If in learning interface, render full-bleed without standard header/footer
  const isClassroom = path.startsWith('/learn/');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {!isClassroom && <AnnouncementBar announcement={announcement} />}
      {!isClassroom && <Navbar currentPath={path} />}
      <main className="flex-1">{renderView()}</main>
      {!isClassroom && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
