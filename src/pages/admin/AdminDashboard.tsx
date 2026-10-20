import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storage';
import { Course, Category, Enrolment, Certificate, Announcement, PlatformSettings, EmailNotification, Module, Lesson, Resource } from '../../types';
import { navigateTo } from '../../utils/navigation';
import { EmailPreviewModal } from '../../components/common/EmailPreviewModal';
import { BRAND_ASSETS } from '../../utils/brand';
import {
  Layers,
  BookOpen,
  Users,
  Award,
  Settings,
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Eye,
  ShieldCheck,
  Megaphone,
  CreditCard,
  Mail,
  X,
  Video,
  FileText,
  Send,
  Check,
  ExternalLink,
  Sparkles,
  Clock,
  Play,
  Download,
  RefreshCw,
  Tag
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'categories' | 'enrolments' | 'certificates' | 'emails' | 'settings'>('overview');

  const [courses, setCourses] = useState<Course[]>(() => storageService.getCourses());
  const [categories, setCategories] = useState<Category[]>(() => storageService.getCategories());
  const [enrolments, setEnrolments] = useState<Enrolment[]>(() => storageService.getEnrolments());
  const [certificates, setCertificates] = useState<Certificate[]>(() => storageService.getCertificates());
  const [announcement, setAnnouncement] = useState<Announcement>(() => storageService.getAnnouncement());
  const [settings, setSettings] = useState<PlatformSettings>(() => storageService.getSettings());

  // Email notifications state
  const [notifications, setNotifications] = useState<EmailNotification[]>(() => storageService.getNotifications());
  const [selectedEmail, setSelectedEmail] = useState<EmailNotification | null>(null);

  // Curriculum & Materials Management Modal State
  const [managingCurriculumCourse, setManagingCurriculumCourse] = useState<Course | null>(null);
  const [newModuleName, setNewModuleName] = useState('');
  const [selectedModuleIdForLesson, setSelectedModuleIdForLesson] = useState<string>('');
  const [lessonFormData, setLessonFormData] = useState({
    title: '',
    durationMinutes: 20,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isPreview: false,
    description: '',
  });
  const [resourceFormData, setResourceFormData] = useState({
    title: '',
    type: 'pdf' as 'pdf' | 'code' | 'sheet' | 'link',
    url: 'https://example.com/curriculum-spec.pdf',
    size: '1.8 MB'
  });
  const [selectedModuleIdForResource, setSelectedModuleIdForResource] = useState<string>('');
  const [quickPrice, setQuickPrice] = useState<number>(0);

  // Modal for Course Creation / Editing
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    format: 'Cohort-Based' as 'Self-Paced' | 'Cohort-Based' | 'Weekend Intensive',
    categoryId: categories[0]?.id || 'cat-1',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    language: 'English',
    durationHours: 12,
    price: 0,
    isFeatured: false,
    status: 'published' as 'published' | 'draft' | 'archived',
    instructorName: 'Aditya Verma',
    instructorRole: 'Principal Engineer',
    instructorAgency: 'Belvo Engineering Lab'
  });

  // Modal for Category Editing
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Protected Administrative Area</h2>
        <p className="text-xs text-slate-500">
          You must be signed in with an administrative account to access the platform management console.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('/login')}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Sign In as Admin
          </button>
        </div>
      </div>
    );
  }

  // Calculate genuine statistics
  const totalStudents = new Set(enrolments.map((e) => e.userId)).size;
  const publishedCoursesCount = courses.filter((c) => c.status === 'published').length;
  const totalEnrolmentsCount = enrolments.length;
  const completedCoursesCount = enrolments.filter((e) => e.status === 'completed' || e.progressPercent === 100).length;
  const totalRevenue = enrolments.reduce((sum, e) => {
    const c = courses.find((crs) => crs.id === e.courseId);
    return sum + (c ? c.price : 0);
  }, 0);

  // Handlers
  const handleOpenCreateCourse = () => {
    setEditingCourse(null);
    setCourseFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      format: 'Cohort-Based',
      categoryId: categories[0]?.id || 'cat-1',
      level: 'Beginner',
      language: 'English',
      durationHours: 12,
      price: 0,
      isFeatured: false,
      status: 'published',
      instructorName: 'Aditya Verma',
      instructorRole: 'Principal Engineer',
      instructorAgency: 'Belvo Engineering Lab'
    });
    setIsCourseModalOpen(true);
  };

  // Curriculum & Materials Management Handlers
  const handleOpenCurriculumManager = (course: Course) => {
    setManagingCurriculumCourse({ ...course });
    setQuickPrice(course.price);
    setSelectedModuleIdForLesson(course.modules[0]?.id || '');
    setSelectedModuleIdForResource(course.modules[0]?.id || '');
  };

  const handleUpdatePrice = () => {
    if (!managingCurriculumCourse) return;
    const updated = { ...managingCurriculumCourse, price: Number(quickPrice) };
    storageService.saveCourse(updated);
    setManagingCurriculumCourse(updated);
    setCourses(storageService.getCourses());
  };

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managingCurriculumCourse || !newModuleName.trim()) return;
    const newMod: Module = {
      id: `mod-${Date.now()}`,
      title: newModuleName.trim(),
      order: managingCurriculumCourse.modules.length + 1,
      lessons: []
    };
    const updated = {
      ...managingCurriculumCourse,
      modules: [...managingCurriculumCourse.modules, newMod]
    };
    storageService.saveCourse(updated);
    setManagingCurriculumCourse(updated);
    setCourses(storageService.getCourses());
    setNewModuleName('');
    setSelectedModuleIdForLesson(newMod.id);
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managingCurriculumCourse || !selectedModuleIdForLesson || !lessonFormData.title.trim()) return;
    const newLesson: Lesson = {
      id: `les-${Date.now()}`,
      title: lessonFormData.title.trim(),
      durationMinutes: Number(lessonFormData.durationMinutes) || 15,
      videoUrl: lessonFormData.videoUrl,
      isPreview: lessonFormData.isPreview,
      description: lessonFormData.description || 'Hands-on guided practice lesson.',
      order: 1,
      resources: []
    };
    const updatedModules = managingCurriculumCourse.modules.map((m) => {
      if (m.id === selectedModuleIdForLesson) {
        return {
          ...m,
          lessons: [...m.lessons, { ...newLesson, order: m.lessons.length + 1 }]
        };
      }
      return m;
    });
    const updated = {
      ...managingCurriculumCourse,
      modules: updatedModules
    };
    storageService.saveCourse(updated);
    setManagingCurriculumCourse(updated);
    setCourses(storageService.getCourses());
    setLessonFormData({
      title: '',
      durationMinutes: 20,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      isPreview: false,
      description: '',
    });
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managingCurriculumCourse || !selectedModuleIdForResource || !resourceFormData.title.trim()) return;
    const newRes: Resource = {
      id: `res-${Date.now()}`,
      title: resourceFormData.title.trim(),
      type: resourceFormData.type,
      url: resourceFormData.url,
      size: resourceFormData.size
    };
    const updatedModules = managingCurriculumCourse.modules.map((m) => {
      if (m.id === selectedModuleIdForResource && m.lessons.length > 0) {
        const firstLesson = m.lessons[0];
        const updatedLessons = [
          { ...firstLesson, resources: [...firstLesson.resources, newRes] },
          ...m.lessons.slice(1)
        ];
        return { ...m, lessons: updatedLessons };
      }
      return m;
    });
    const updated = {
      ...managingCurriculumCourse,
      modules: updatedModules
    };
    storageService.saveCourse(updated);
    setManagingCurriculumCourse(updated);
    setCourses(storageService.getCourses());
    setResourceFormData({
      title: '',
      type: 'pdf',
      url: 'https://example.com/curriculum-spec.pdf',
      size: '1.8 MB'
    });
  };

  const handleSendTestEmail = (type: 'welcome' | 'payment' | 'certificate') => {
    if (type === 'welcome') {
      const notif = storageService.sendNotification({
        userId: 'user-student-1',
        recipientEmail: 'rahul.sharma@example.com',
        recipientName: 'Rahul Sharma',
        subject: '🎉 Enrolment Confirmed: AI, Machine Learning & Automation Masterclass',
        category: 'enrolment',
        previewText: 'Welcome to Hridayam! Your enrolment has been authenticated.',
        metadata: {
          courseId: 'course-2',
          courseTitle: 'AI, Machine Learning & Automation Masterclass',
          amount: 3499
        }
      });
      setNotifications(storageService.getNotifications());
      setSelectedEmail(notif);
    } else if (type === 'payment') {
      const notif = storageService.sendNotification({
        userId: 'user-student-1',
        recipientEmail: 'rahul.sharma@example.com',
        recipientName: 'Rahul Sharma',
        subject: '💳 Official Tax Invoice & Payment Receipt: Full-Stack SaaS Track',
        category: 'payment',
        previewText: 'Payment of ₹2,999 received successfully. Transaction ID: pay_rzp_test_88412.',
        metadata: {
          courseId: 'course-1',
          courseTitle: 'Full-Stack Web Development with React & Node.js',
          amount: 2999,
          paymentId: 'pay_rzp_test_88412',
          orderId: 'order_test_9921'
        }
      });
      setNotifications(storageService.getNotifications());
      setSelectedEmail(notif);
    } else {
      const notif = storageService.sendNotification({
        userId: 'user-student-1',
        recipientEmail: 'rahul.sharma@example.com',
        recipientName: 'Rahul Sharma',
        subject: '📜 Official Belvo Certificate Issued: HRD-2026-9812',
        category: 'certificate',
        previewText: 'Your verified certificate for UI/UX Design Systems has been minted.',
        metadata: {
          courseId: 'course-3',
          courseTitle: 'Graphic Design, Branding & UI/UX',
          certificateId: 'HRD-2026-9812',
          verificationCode: 'VERIFIED-HRD-9812-BELVO-AUTH'
        }
      });
      setNotifications(storageService.getNotifications());
      setSelectedEmail(notif);
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseFormData({
      title: course.title,
      shortDescription: course.shortDescription,
      fullDescription: course.fullDescription,
      thumbnail: course.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      previewVideoUrl: course.previewVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      format: (course.format as any) || 'Cohort-Based',
      categoryId: course.categoryId,
      level: course.level,
      language: course.language,
      durationHours: course.durationHours,
      price: course.price,
      isFeatured: course.isFeatured,
      status: course.status,
      instructorName: course.instructor.name,
      instructorRole: course.instructor.role,
      instructorAgency: course.instructor.agency
    });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCategory = categories.find((c) => c.id === courseFormData.categoryId);

    if (editingCourse) {
      const updated: Course = {
        ...editingCourse,
        title: courseFormData.title,
        shortDescription: courseFormData.shortDescription,
        fullDescription: courseFormData.fullDescription,
        thumbnail: courseFormData.thumbnail,
        previewVideoUrl: courseFormData.previewVideoUrl,
        format: courseFormData.format,
        categoryId: courseFormData.categoryId,
        categoryName: targetCategory?.name || 'General',
        level: courseFormData.level,
        language: courseFormData.language,
        durationHours: Number(courseFormData.durationHours),
        price: Number(courseFormData.price),
        isFeatured: courseFormData.isFeatured,
        status: courseFormData.status,
        instructor: {
          ...editingCourse.instructor,
          name: courseFormData.instructorName,
          role: courseFormData.instructorRole,
          agency: courseFormData.instructorAgency
        }
      };
      storageService.saveCourse(updated);
    } else {
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: courseFormData.title,
        slug: courseFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        shortDescription: courseFormData.shortDescription,
        fullDescription: courseFormData.fullDescription,
        thumbnail: courseFormData.thumbnail,
        previewVideoUrl: courseFormData.previewVideoUrl,
        format: courseFormData.format,
        categoryId: courseFormData.categoryId,
        categoryName: targetCategory?.name || 'General',
        level: courseFormData.level,
        language: courseFormData.language,
        durationHours: Number(courseFormData.durationHours),
        price: Number(courseFormData.price),
        currency: 'INR',
        isFeatured: courseFormData.isFeatured,
        status: courseFormData.status,
        instructor: {
          name: courseFormData.instructorName,
          role: courseFormData.instructorRole,
          agency: courseFormData.instructorAgency,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          bio: 'Faculty practitioner at Belvo.'
        },
        learningOutcomes: [
          'Practical industry-standard implementation skills',
          'Production-tested architecture and workflows'
        ],
        prerequisites: ['Basic computer & internet access'],
        modules: [
          {
            id: `mod-${Date.now()}`,
            title: 'Module 1: Core Fundamentals & Setup',
            order: 1,
            lessons: [
              {
                id: `les-${Date.now()}-1`,
                title: 'Introduction & Setup',
                durationMinutes: 15,
                videoUrl: courseFormData.previewVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                isPreview: true,
                description: 'Course orientation and workspace setup.',
                resources: [],
                order: 1
              }
            ]
          }
        ],
        certificateEligible: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      storageService.saveCourse(newCourse);
    }

    setCourses(storageService.getCourses());
    setIsCourseModalOpen(false);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      storageService.deleteCourse(id);
      setCourses(storageService.getCourses());
    }
  };

  const handleTogglePublish = (course: Course) => {
    const updated: Course = {
      ...course,
      status: course.status === 'published' ? 'draft' : 'published'
    };
    storageService.saveCourse(updated);
    setCourses(storageService.getCourses());
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveAnnouncement(announcement);
    alert('Announcement settings updated.');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveSettings(settings);
    alert('Platform integration settings updated.');
  };

  const handleRevokeCert = (certId: string) => {
    const reason = prompt('Please enter the reason for revoking this certificate:');
    if (reason) {
      storageService.revokeCertificate(certId, reason);
      setCertificates(storageService.getCertificates());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Admin Header */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 p-1.5 flex items-center justify-center border border-white/15 shadow-xs shrink-0 mt-0.5">
            <img
              src={BRAND_ASSETS.logoMark}
              alt="Hridayam Logo"
              className="w-9 h-9 object-contain"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400">
                Belvo Governance
              </span>
              <span className="text-[10px] font-mono bg-teal-950 text-teal-300 border border-teal-800/80 px-2 py-0.5 rounded">
                Super Admin
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Hridayam Management Console
            </h1>
            <p className="text-xs text-slate-400">
              Real-time curriculum management, student progress verification, and gateway configurations.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenCreateCourse}
          className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'overview' ? 'text-teal-700 border-b-2 border-teal-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Overview & Metrics
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'courses' ? 'text-teal-700 border-b-2 border-teal-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Courses ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'categories' ? 'text-teal-700 border-b-2 border-teal-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Categories ({categories.length})
        </button>
        <button
          onClick={() => setActiveTab('enrolments')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'enrolments' ? 'text-teal-700 border-b-2 border-teal-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Enrolments ({enrolments.length})
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'certificates' ? 'text-teal-700 border-b-2 border-teal-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Certificates ({certificates.length})
        </button>
        <button
          onClick={() => setActiveTab('emails')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'emails' ? 'text-teal-700 border-b-2 border-teal-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Emails & Integrations ({notifications.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'settings' ? 'text-teal-700 border-b-2 border-teal-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
        >
          Platform & Gateways
        </button>
      </div>

      {/* ----------------- Tab 1: Overview & Metrics ----------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Registered Students</span>
                <Users className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{totalStudents}</p>
              <p className="text-[11px] text-slate-400">Unique student accounts</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Published Courses</span>
                <BookOpen className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{publishedCoursesCount}</p>
              <p className="text-[11px] text-slate-400">Of {courses.length} total curriculums</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Active Enrolments</span>
                <Layers className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{totalEnrolmentsCount}</p>
              <p className="text-[11px] text-slate-400">{completedCoursesCount} completed</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Gross Course Value</span>
                <DollarSign className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 tabular-nums">₹{totalRevenue.toLocaleString('en-IN')}</p>
              <p className="text-[11px] text-slate-400">Total value from paid enrollments</p>
            </div>
          </div>

          {/* Recent Enrolments Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-5">
            <h3 className="text-sm font-bold text-slate-900">Recent Student Enrolments</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Progress</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enrolments.slice(0, 5).map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-medium text-slate-900">{e.userName}</td>
                      <td className="p-3 text-slate-700">{e.courseTitle}</td>
                      <td className="p-3 text-slate-500">{new Date(e.enrolledAt).toLocaleDateString()}</td>
                      <td className="p-3 font-mono font-semibold text-teal-700">{e.progressPercent}%</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${e.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                          {e.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- Tab 2: Courses Management ----------------- */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Manage courses, syllabus modules, pricing, and publication states.
            </p>
            <button
              onClick={handleOpenCreateCourse}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Course</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Course Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Level</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/50">
                      <td className="p-3.5">
                        <p className="font-semibold text-slate-900">{course.title}</p>
                        <p className="text-[11px] text-slate-400">{course.instructor.name} · {course.durationHours}h</p>
                      </td>
                      <td className="p-3.5 text-slate-600">{course.categoryName}</td>
                      <td className="p-3.5 text-slate-600">{course.level}</td>
                      <td className="p-3.5 font-mono font-medium text-slate-900">
                        {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`}
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleTogglePublish(course)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase cursor-pointer ${
                            course.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          }`}
                        >
                          {course.status}
                        </button>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenCurriculumManager(course)}
                          className="p-1 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                          title="Manage Lessons, Materials & Pricing"
                        >
                          <Video className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigateTo(`/course/${course.id}`)}
                          className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                          title="Preview Course"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="p-1 text-teal-600 hover:text-teal-800 cursor-pointer"
                          title="Edit Course Metadata"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- Tab 3: Categories ----------------- */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            The 11 core categories powering discovery filters. Administrators can edit metadata and order.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">Order: {cat.displayOrder}</span>
                  <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{cat.description}</p>
                <div className="pt-2 flex flex-wrap gap-1">
                  {cat.subtopics.map((s, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- Tab 4: Enrolments ----------------- */}
      {activeTab === 'enrolments' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Enrolment ID</th>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Course</th>
                  <th className="p-3.5">Progress</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Enrolled Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enrolments.map((enrol) => (
                  <tr key={enrol.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-mono text-slate-400">{enrol.id}</td>
                    <td className="p-3.5">
                      <p className="font-semibold text-slate-900">{enrol.userName}</p>
                      <p className="text-[11px] text-slate-400">{enrol.userEmail}</p>
                    </td>
                    <td className="p-3.5 text-slate-800 font-medium">{enrol.courseTitle}</td>
                    <td className="p-3.5 font-mono font-semibold text-teal-700">{enrol.progressPercent}%</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${enrol.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                        {enrol.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500">{new Date(enrol.enrolledAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- Tab 5: Certificates ----------------- */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Certificate ID</th>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Course</th>
                  <th className="p-3.5">Issued Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-mono font-bold text-teal-800">{cert.id}</td>
                    <td className="p-3.5 font-medium text-slate-900">{cert.userName}</td>
                    <td className="p-3.5 text-slate-700">{cert.courseTitle}</td>
                    <td className="p-3.5 text-slate-500">{cert.issueDate}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${cert.status === 'valid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => navigateTo(`/verify-certificate?id=${cert.id}`)}
                        className="text-xs text-teal-700 hover:underline cursor-pointer"
                      >
                        Verify Record
                      </button>
                      {cert.status === 'valid' && (
                        <button
                          onClick={() => handleRevokeCert(cert.id)}
                          className="text-xs text-rose-600 hover:underline cursor-pointer"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- Tab 6: Settings & Gateway Setup ----------------- */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Announcement Bar Form */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Megaphone className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">Announcement Bar Configuration</h3>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Banner Announcement Text:</label>
                <input
                  type="text"
                  value={announcement.message}
                  onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Call to Action Link Label:</label>
                <input
                  type="text"
                  value={announcement.linkText || ''}
                  onChange={(e) => setAnnouncement({ ...announcement, linkText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="annPublished"
                  checked={announcement.isPublished}
                  onChange={(e) => setAnnouncement({ ...announcement, isPublished: e.target.checked })}
                  className="rounded text-teal-600"
                />
                <label htmlFor="annPublished" className="text-slate-800 font-semibold cursor-pointer">
                  Publish announcement bar on top of all pages
                </label>
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Save Announcement
              </button>
            </form>
          </div>

          {/* Payment Gateway: Razorpay Setup Guide & Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <CreditCard className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">Razorpay Payment Gateway</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 space-y-1">
                <p className="font-bold">Sandbox Mode is currently active.</p>
                <p className="text-[11px]">
                  All paid course enrollments safely initiate the sandbox verification workflow. Real transactions require your Razorpay Live Merchant Key ID & Webhook secret in server environment variables.
                </p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Test Key ID (Configured):</label>
                <input
                  type="text"
                  disabled
                  value={settings.razorpayKeyId}
                  className="w-full p-2 bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-600"
                />
              </div>

              <p className="text-[11px] text-slate-500">
                To switch to live payment processing in production, provide <code className="bg-slate-100 px-1 py-0.5 rounded">RAZORPAY_KEY_ID</code> and <code className="bg-slate-100 px-1 py-0.5 rounded">RAZORPAY_KEY_SECRET</code> in <code className="bg-slate-100 px-1 py-0.5 rounded">.env</code>.
              </p>
            </div>
          </div>

          {/* Email Provider: Resend Setup Guide */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Mail className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">Transactional Email (Resend)</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Configured sender domain: <strong className="font-mono text-slate-800">{settings.resendSenderDomain}</strong>
              </p>
              <p className="text-[11px] text-slate-500">
                Transactional notifications (enrolment receipts, password reset links, certificate issuance emails) remain logged in audit records until a verified production <code className="bg-slate-100 px-1 py-0.5 rounded">RESEND_API_KEY</code> is supplied.
              </p>
            </div>
          </div>

          {/* Platform Identity */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Settings className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">Platform Identity & Contact</h3>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Support Email:</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Campus / Office Address:</label>
                <input
                  type="text"
                  value={settings.officeAddress}
                  onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Save Identity Settings
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- Tab 6: Transactional Emails & Integrations Hub ----------------- */}
      {activeTab === 'emails' && (
        <div className="space-y-8">
          {/* Integration Status Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                  PAYMENT GATEWAY
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ONLINE</span>
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-teal-600" />
                <span>Razorpay Sandbox & Webhooks</span>
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Merchant Key: <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">{settings.razorpayKeyId}</code>. Webhook events automatically enroll students upon payment authorization.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200/60">
                  TRANSACTIONAL EMAIL
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>DKIM / SPF READY</span>
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-sky-600" />
                <span>Resend Transactional Engine</span>
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Authenticated Sender Domain: <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">{settings.resendSenderDomain}</code>. Dispatches enrollment confirmations, invoices, and certificates.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                  STREAMING CDN
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>EDGE CACHED</span>
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-indigo-600" />
                <span>Direct Lesson Video Delivery</span>
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Multi-bitrate HTML5 video delivery with automated progress detection and offline-friendly local state persistence.
              </p>
            </div>
          </div>

          {/* Test Dispatch Console */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Test Email Dispatch & Notification Simulator
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verify HTML templates, styling, and metadata encoding by triggering test emails to the demo student account.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleSendTestEmail('welcome')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Send Welcome Email</span>
              </button>

              <button
                onClick={() => handleSendTestEmail('payment')}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Send Tax Invoice Receipt</span>
              </button>

              <button
                onClick={() => handleSendTestEmail('certificate')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Send Certificate Award</span>
              </button>
            </div>
          </div>

          {/* Dispatched Emails Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Dispatched Transactional Emails Log</h3>
                <p className="text-xs text-slate-500 mt-0.5">Click "View Email" on any record to inspect the delivered email layout.</p>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                {notifications.length} Sent Records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Recipient</th>
                    <th className="p-3.5">Subject & Preview</th>
                    <th className="p-3.5">Date Dispatched</th>
                    <th className="p-3.5">Delivery Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {notifications.map((notif) => (
                    <tr key={notif.id} className="hover:bg-slate-50/50">
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                          notif.category === 'payment'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : notif.category === 'certificate'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : notif.category === 'quiz'
                            ? 'bg-sky-50 text-sky-700 border border-sky-200'
                            : 'bg-teal-50 text-teal-700 border border-teal-200'
                        }`}>
                          {notif.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <p className="font-semibold text-slate-900">{notif.recipientName}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{notif.recipientEmail}</p>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <p className="font-medium text-slate-900 truncate">{notif.subject}</p>
                        <p className="text-[11px] text-slate-500 truncate">{notif.previewText}</p>
                      </td>
                      <td className="p-3.5 text-slate-500 whitespace-nowrap">
                        {new Date(notif.sentAt).toLocaleString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <Check className="w-3.5 h-3.5" />
                          <span>Delivered</span>
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setSelectedEmail(notif)}
                          className="px-3 py-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Email</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- Create / Edit Course Modal ----------------- */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingCourse ? 'Edit Course Curriculum' : 'Create New Course'}
              </h3>
              <button onClick={() => setIsCourseModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Title:</label>
                <input
                  type="text"
                  required
                  value={courseFormData.title}
                  onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                  placeholder="e.g. Full-Stack Web Development with React & Node.js"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category:</label>
                  <select
                    value={courseFormData.categoryId}
                    onChange={(e) => setCourseFormData({ ...courseFormData, categoryId: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Skill Level:</label>
                  <select
                    value={courseFormData.level}
                    onChange={(e) => setCourseFormData({ ...courseFormData, level: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration (Hours):</label>
                  <input
                    type="number"
                    min="1"
                    value={courseFormData.durationHours}
                    onChange={(e) => setCourseFormData({ ...courseFormData, durationHours: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price (₹, 0 for Free):</label>
                  <input
                    type="number"
                    min="0"
                    value={courseFormData.price}
                    onChange={(e) => setCourseFormData({ ...courseFormData, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status:</label>
                  <select
                    value={courseFormData.status}
                    onChange={(e) => setCourseFormData({ ...courseFormData, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Format:</label>
                  <select
                    value={courseFormData.format}
                    onChange={(e) => setCourseFormData({ ...courseFormData, format: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    <option value="Cohort-Based">Cohort-Based</option>
                    <option value="Self-Paced">Self-Paced</option>
                    <option value="Weekend Intensive">Weekend Intensive</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Thumbnail Image URL:</label>
                  <input
                    type="url"
                    value={courseFormData.thumbnail}
                    onChange={(e) => setCourseFormData({ ...courseFormData, thumbnail: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preview Video URL (MP4 stream):</label>
                <input
                  type="url"
                  value={courseFormData.previewVideoUrl}
                  onChange={(e) => setCourseFormData({ ...courseFormData, previewVideoUrl: e.target.value })}
                  placeholder="https://commondatastorage.googleapis.com/.../sample.mp4"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description:</label>
                <textarea
                  rows={2}
                  required
                  value={courseFormData.shortDescription}
                  onChange={(e) => setCourseFormData({ ...courseFormData, shortDescription: e.target.value })}
                  placeholder="One or two sentences explaining the core outcome..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Curriculum Overview:</label>
                <textarea
                  rows={3}
                  required
                  value={courseFormData.fullDescription}
                  onChange={(e) => setCourseFormData({ ...courseFormData, fullDescription: e.target.value })}
                  placeholder="Detailed course description..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Instructor Name:</label>
                  <input
                    type="text"
                    required
                    value={courseFormData.instructorName}
                    onChange={(e) => setCourseFormData({ ...courseFormData, instructorName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Instructor Role & Agency:</label>
                  <input
                    type="text"
                    required
                    value={courseFormData.instructorRole}
                    onChange={(e) => setCourseFormData({ ...courseFormData, instructorRole: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="courseFeatured"
                  checked={courseFormData.isFeatured}
                  onChange={(e) => setCourseFormData({ ...courseFormData, isFeatured: e.target.checked })}
                  className="rounded text-teal-600"
                />
                <label htmlFor="courseFeatured" className="text-slate-800 font-semibold cursor-pointer">
                  Feature this course on the homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- Curriculum, Video Lessons & Materials Manager Modal ----------------- */}
      {managingCurriculumCourse && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setManagingCurriculumCourse(null);
          }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 text-slate-900">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                  Curriculum & Materials Studio
                </span>
                <h3 className="text-xl font-extrabold text-slate-950 mt-1">
                  {managingCurriculumCourse.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Upload video lessons, configure downloadable resources, and adjust pricing.
                </p>
              </div>
              <button
                onClick={() => setManagingCurriculumCourse(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Pricing & Enrolment Settings */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Course Pricing & Enrolment Mode</h4>
                  <p className="text-[11px] text-slate-500">Set to 0 for free open access or configure paid amount in INR.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs font-semibold text-slate-700">₹</span>
                <input
                  type="number"
                  min="0"
                  value={quickPrice}
                  onChange={(e) => setQuickPrice(Number(e.target.value))}
                  className="w-28 px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-bold"
                />
                <button
                  type="button"
                  onClick={handleUpdatePrice}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
                >
                  Update Price
                </button>
              </div>
            </div>

            {/* Action Panels Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Forms to Add Module, Lesson & Resource */}
              <div className="space-y-5">
                {/* 1. Add Module Form */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-teal-600" />
                    <span>Create Curriculum Module</span>
                  </h4>
                  <form onSubmit={handleAddModule} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={newModuleName}
                      onChange={(e) => setNewModuleName(e.target.value)}
                      placeholder="e.g. Module 3: Advanced API Patterns"
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg cursor-pointer shrink-0"
                    >
                      Add Module
                    </button>
                  </form>
                </div>

                {/* 2. Upload / Add Video Lesson Form */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-indigo-600" />
                    <span>Upload / Add Video Lesson</span>
                  </h4>
                  <form onSubmit={handleAddLesson} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Module:</label>
                      <select
                        value={selectedModuleIdForLesson}
                        onChange={(e) => setSelectedModuleIdForLesson(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                      >
                        {managingCurriculumCourse.modules.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Lesson Title:</label>
                      <input
                        type="text"
                        required
                        value={lessonFormData.title}
                        onChange={(e) => setLessonFormData({ ...lessonFormData, title: e.target.value })}
                        placeholder="e.g. Building Resilient Database Queries"
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Duration (Mins):</label>
                        <input
                          type="number"
                          min="1"
                          value={lessonFormData.durationMinutes}
                          onChange={(e) => setLessonFormData({ ...lessonFormData, durationMinutes: Number(e.target.value) })}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>
                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={lessonFormData.isPreview}
                            onChange={(e) => setLessonFormData({ ...lessonFormData, isPreview: e.target.checked })}
                            className="rounded text-teal-600"
                          />
                          <span className="text-slate-700 font-semibold text-[11px]">Free Preview Lesson</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Video Stream URL (MP4 / HLS):</label>
                      <input
                        type="url"
                        required
                        value={lessonFormData.videoUrl}
                        onChange={(e) => setLessonFormData({ ...lessonFormData, videoUrl: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                      />
                      <div className="flex gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setLessonFormData({ ...lessonFormData, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' })}
                          className="text-[10px] text-teal-700 underline"
                        >
                          Preset 1 (Elephants)
                        </button>
                        <span className="text-[10px] text-slate-400">·</span>
                        <button
                          type="button"
                          onClick={() => setLessonFormData({ ...lessonFormData, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' })}
                          className="text-[10px] text-teal-700 underline"
                        >
                          Preset 2 (Blazes)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Lesson Brief / Description:</label>
                      <input
                        type="text"
                        value={lessonFormData.description}
                        onChange={(e) => setLessonFormData({ ...lessonFormData, description: e.target.value })}
                        placeholder="Brief summary of what the learner will code or build..."
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold cursor-pointer transition-colors"
                    >
                      Attach Video Lesson
                    </button>
                  </form>
                </div>

                {/* 3. Upload / Attach Learning Material Form */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Upload Learning Material & Downloadable Asset</span>
                  </h4>
                  <form onSubmit={handleAddResource} className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Module:</label>
                        <select
                          value={selectedModuleIdForResource}
                          onChange={(e) => setSelectedModuleIdForResource(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                        >
                          {managingCurriculumCourse.modules.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Resource Type:</label>
                        <select
                          value={resourceFormData.type}
                          onChange={(e) => setResourceFormData({ ...resourceFormData, type: e.target.value as any })}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                        >
                          <option value="pdf">PDF Handbook / Guide</option>
                          <option value="code">Starter Code Repository</option>
                          <option value="sheet">Spreadsheet Model / Sheet</option>
                          <option value="link">Figma Library / External Spec</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Document Title:</label>
                      <input
                        type="text"
                        required
                        value={resourceFormData.title}
                        onChange={(e) => setResourceFormData({ ...resourceFormData, title: e.target.value })}
                        placeholder="e.g. Belvo Agency Full-Stack Roadmap (PDF)"
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">File URL:</label>
                        <input
                          type="text"
                          required
                          value={resourceFormData.url}
                          onChange={(e) => setResourceFormData({ ...resourceFormData, url: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Size (e.g. 2.4 MB):</label>
                        <input
                          type="text"
                          value={resourceFormData.size}
                          onChange={(e) => setResourceFormData({ ...resourceFormData, size: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold cursor-pointer transition-colors"
                    >
                      Attach Learning Material
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Live Syllabus Tree & Material List */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 max-h-[650px] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Live Course Modules ({managingCurriculumCourse.modules.length})
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Total Lessons: {managingCurriculumCourse.modules.reduce((sum, m) => sum + m.lessons.length, 0)}
                  </span>
                </div>

                <div className="space-y-4">
                  {managingCurriculumCourse.modules.map((mod, mIdx) => (
                    <div key={mod.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-900">
                          {mod.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {mod.lessons.length} lessons
                        </span>
                      </div>

                      <div className="space-y-2">
                        {mod.lessons.map((les) => (
                          <div key={les.id} className="p-2.5 bg-slate-50 rounded-lg text-xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                                <Play className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                                <span>{les.title}</span>
                              </span>
                              <div className="flex items-center gap-2">
                                {les.isPreview && (
                                  <span className="text-[9px] font-bold text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                                    FREE PREVIEW
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-500 font-mono">{les.durationMinutes}m</span>
                              </div>
                            </div>

                            <p className="text-[11px] text-slate-500 font-mono truncate">{les.videoUrl}</p>

                            {les.resources && les.resources.length > 0 && (
                              <div className="pt-1.5 border-t border-slate-200/60 flex flex-wrap gap-1">
                                {les.resources.map((res) => (
                                  <span key={res.id} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                                    <FileText className="w-3 h-3 text-emerald-600" />
                                    <span>{res.title} ({res.size || res.type})</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Close */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setManagingCurriculumCourse(null)}
                className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Close & Complete Studio Edits
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transactional Email Modal Viewer */}
      <EmailPreviewModal
        isOpen={!!selectedEmail}
        notification={selectedEmail}
        onClose={() => setSelectedEmail(null)}
      />
    </div>
  );
};
