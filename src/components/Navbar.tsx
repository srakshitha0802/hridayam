import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  LogOut,
  GraduationCap,
  Users,
  Briefcase,
  ShieldCheck,
  Gift,
  Lock,
  ArrowUpRight,
  Award,
  Building2,
  Star,
  PhoneCall,
  MessageCircle,
  Compass,
  Contact,
} from 'lucide-react';
import { AppView } from '../types';
import { useAuth } from '../context/AuthContext';
import { ITV_COURSES } from '../data/itvedantData';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onRequestCallback: (courseInterest?: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onRequestCallback,
  onSelectCourse,
}) => {
  const { user, signOutUser } = useAuth();
  const [coursesMenuOpen, setCoursesMenuOpen] = useState(false);
  const [portalsMenuOpen, setPortalsMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCoursesExpanded, setDrawerCoursesExpanded] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const coursesRef = useRef<HTMLDivElement>(null);
  const portalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (coursesRef.current && !coursesRef.current.contains(event.target as Node)) {
        setCoursesMenuOpen(false);
      }
      if (portalsRef.current && !portalsRef.current.contains(event.target as Node)) {
        setPortalsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setCoursesMenuOpen(false);
        setPortalsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, Math.max(0, (y / docHeight) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (view: AppView) => {
    onNavigate(view);
    setCoursesMenuOpen(false);
    setPortalsMenuOpen(false);
    setDrawerOpen(false);
  };

  const handlePickCourse = (courseId: string) => {
    onSelectCourse(courseId);
    setCoursesMenuOpen(false);
    setDrawerOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'nav-pastel-glass-scrolled' : 'nav-pastel-glass'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
          {/* Left Zone: Logo Tile + Explore Courses Dropdown */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
              aria-label="Hridayam by Belvo Home"
            >
              <span className="w-11 h-11 rounded-2xl bg-white/95 border-2 border-white flex items-center justify-center p-1.5 shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
                <img
                  src="/logo.png"
                  alt="Hridayam by Belvo"
                  className="h-full w-full object-contain"
                />
              </span>
            </button>

            {/* Explore Courses Pill Dropdown (matches screenshot exactly) */}
            <div className="relative" ref={coursesRef}>
              <button
                type="button"
                onClick={() => {
                  setCoursesMenuOpen((prev) => !prev);
                  setPortalsMenuOpen(false);
                }}
                aria-expanded={coursesMenuOpen}
                className="metallic-btn-ice px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-[#2B59B5]" />
                <span>Explore Courses</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#3869C3] transition-transform duration-200 ${
                    coursesMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {coursesMenuOpen && (
                <div className="absolute left-0 mt-3 w-[340px] sm:w-[390px] pastel-glass-panel rounded-3xl p-3 z-50 shadow-2xl animate-fade-up-soft">
                  <div className="px-3 py-2 border-b border-[#BFD6F6]/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold text-[#1E428E]">
                        All {ITV_COURSES.length} Creative &amp; Career Programs
                      </p>
                      <p className="text-[11px] text-[#4C6B9E]">
                        6 Schools · Dual Certified · 100% Placement Support
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNav('catalogue')}
                      className="text-[11px] font-extrabold text-[#2B59B5] hover:text-[#132C63] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <span>Catalogue</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto pastel-scrollbar py-1.5 space-y-1 pr-1">
                    {ITV_COURSES.map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => handlePickCourse(course.id)}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/90 border border-transparent hover:border-[#BFD6F6] transition-all flex items-center justify-between gap-2 cursor-pointer group"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#132C63] group-hover:text-[#1E428E] truncate">
                            {course.title}
                          </div>
                          <div className="text-[10px] font-semibold text-[#5A79AD] truncate">
                            {course.duration} · Max {course.highestPackage}
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#3869C3] opacity-60 group-hover:opacity-100 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Zone: Student Hub, Portals/Admin, Get Career Guidance CTA, Slide-Out Drawer Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Student Hub */}
            <button
              type="button"
              onClick={() => handleNav('student')}
              className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                currentView === 'student'
                  ? 'metallic-btn-primary'
                  : 'metallic-btn-ice'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Hub</span>
            </button>

            {/* Portals / Admin Dropdown */}
            <div className="relative hidden md:block" ref={portalsRef}>
              <button
                type="button"
                onClick={() => {
                  setPortalsMenuOpen((prev) => !prev);
                  setCoursesMenuOpen(false);
                }}
                aria-expanded={portalsMenuOpen}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  ['instructor', 'mentor-portal', 'recruiter-portal', 'portal-login'].includes(
                    currentView
                  )
                    ? 'metallic-btn-primary'
                    : 'metallic-btn-ice'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{user ? user.roleLabel.split(' ')[0] : 'Admin & Portals'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    portalsMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {portalsMenuOpen && (
                <div className="absolute right-0 mt-3 w-[340px] pastel-glass-panel rounded-3xl p-3 space-y-1.5 z-50 shadow-2xl animate-fade-up-soft">
                  <div className="px-3 py-2 border-b border-[#BFD6F6]/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold text-[#1E428E]">
                        Role-Protected Workspaces
                      </p>
                      <p className="text-[11px] text-[#4C6B9E]">
                        Fixed demo auth · Left-sidebar suites
                      </p>
                    </div>
                    {user ? (
                      <button
                        type="button"
                        onClick={() => {
                          signOutUser();
                          handleNav('home');
                        }}
                        className="text-[11px] font-extrabold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Sign Out</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleNav('portal-login')}
                        className="text-[11px] font-extrabold text-[#2B59B5] hover:text-[#132C63] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Login</span>
                      </button>
                    )}
                  </div>

                  {[
                    {
                      view: 'student' as AppView,
                      title: 'Student LMS Portal',
                      email: 'student@hridayam.in',
                      desc: '10 Modules · Sandbox · ATS Resume · Drives',
                      icon: <GraduationCap className="w-4 h-4 text-[#2B59B5] mt-0.5 shrink-0" />,
                      badge: 'Portal',
                    },
                    {
                      view: 'mentor-portal' as AppView,
                      title: 'Faculty & Mentor Hub',
                      email: 'mentor@hridayam.in',
                      desc: '8 Modules · Code Audits · Lab Authoring',
                      icon: <Users className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />,
                      badge: 'Mentor',
                    },
                    {
                      view: 'recruiter-portal' as AppView,
                      title: 'Recruiter & Hiring Desk',
                      email: 'recruiter@hridayam.in',
                      desc: '7 Modules · ATS Pipeline · Campus Drives',
                      icon: <Briefcase className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />,
                      badge: 'Hire',
                    },
                    {
                      view: 'instructor' as AppView,
                      title: 'Admin Management Console',
                      email: 'admin@hridayam.in',
                      desc: '8 Modules · Batches · Grants · GST Ledger',
                      icon: <ShieldCheck className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />,
                      badge: 'Admin',
                    },
                    {
                      view: 'refer-earn' as AppView,
                      title: 'Refer & Earn (₹5,000)',
                      email: 'student@hridayam.in',
                      desc: '5 Modules · Voucher Tracker & Referral Code',
                      icon: <Gift className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />,
                      badge: '₹5000',
                    },
                  ].map((item) => (
                    <button
                      key={item.view}
                      type="button"
                      onClick={() => handleNav(item.view)}
                      className="w-full text-left px-3 py-2.5 rounded-2xl bg-white/60 hover:bg-white border border-white/80 hover:border-[#94BCF1] flex items-start gap-3 transition-all cursor-pointer"
                    >
                      {item.icon}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-[#132C63] truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#E8F1FD] text-[#1E428E] shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono-tabular text-[#2B59B5]">
                          {item.email}
                        </div>
                        <div className="text-[10px] text-[#5A79AD] truncate">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Metallic CTA: Get Career Guidance */}
            <button
              type="button"
              onClick={() => onRequestCallback('Navbar Career Guidance')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl metallic-btn-primary text-xs font-extrabold whitespace-nowrap cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get Career Guidance</span>
            </button>

            {/* Hamburger Slide-Out Drawer Toggle (Desktop & Mobile — matches screenshot) */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="w-10 h-10 rounded-xl metallic-btn-ice flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Open full navigation drawer"
              title="Open Menu"
            >
              <Menu className="w-5 h-5 text-[#1E428E]" />
            </button>
          </div>
        </div>

        {/* Metallic Sapphire Scroll Progress Hairline */}
        <div className="h-[2px] w-full bg-white/40 overflow-hidden pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#2B59B5] via-[#60A5FA] to-[#1E428E] transition-[transform] duration-100 ease-out origin-left"
            style={{ transform: `scaleX(${scrollProgress / 100})` }}
          />
        </div>
      </header>

      {/* RIGHT SLIDE-OUT PASTEL-BLUE GLASS NAVIGATION DRAWER (exact match to screenshot) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          {/* Frosted Backdrop Blur */}
          <div
            className="fixed inset-0 bg-[#0B1B3D]/35 backdrop-blur-md transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Right Pastel-Blue Glass Drawer Panel */}
          <aside className="relative z-10 w-full max-w-[380px] h-full drawer-pastel-blue flex flex-col justify-between animate-drawer-in">
            {/* Drawer Header */}
            <div className="px-6 py-4 bg-white/65 border-b border-white/90 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => handleNav('home')}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <span className="w-11 h-11 rounded-2xl bg-white border border-[#D3E5FD] p-1.5 shadow-sm flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Hridayam by Belvo"
                    className="w-full h-full object-contain"
                  />
                </span>
                <div className="text-left leading-tight">
                  <span className="block font-display text-sm font-extrabold text-[#1E428E]">
                    Hridayam by Belvo
                  </span>
                  <span className="block text-[10px] font-semibold text-[#5273A8]">
                    Next-Gen Career EdTech
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/80 hover:bg-white border border-white text-[#1E428E] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto pastel-scrollbar px-5 py-5 space-y-2.5">
              {/* Collapsible All Courses Section */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setDrawerCoursesExpanded((prev) => !prev)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/50 text-[#1E428E] font-bold text-sm cursor-pointer transition-colors"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#2B59B5]" />
                    <span>All Courses</span>
                  </span>
                  {drawerCoursesExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#3869C3]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#3869C3]" />
                  )}
                </button>

                {drawerCoursesExpanded && (
                  <div className="ml-4 pl-4 border-l-2 border-[#3869C3]/45 max-h-52 overflow-y-auto pastel-scrollbar space-y-1 pr-2">
                    {ITV_COURSES.map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => handlePickCourse(course.id)}
                        className="w-full text-left py-2 px-2.5 rounded-lg text-[13px] font-semibold text-[#1E428E] hover:bg-white/75 hover:text-[#132C63] transition-colors cursor-pointer block"
                      >
                        {course.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary Drawer Links */}
              <div className="space-y-1 pt-1">
                <button
                  type="button"
                  onClick={() => handleNav('placements')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/65 text-[#132C63] font-bold text-sm cursor-pointer transition-colors"
                >
                  <span className="inline-flex items-center gap-3">
                    <Award className="w-4 h-4 text-[#2B59B5]" />
                    <span>Placements</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-[#1E428E] border border-[#BFD6F6] text-[11px] font-extrabold font-mono-tabular">
                    100%
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('hire-from-us')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/65 text-[#132C63] font-bold text-sm cursor-pointer transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-[#2B59B5]" />
                  <span>Hire From Us</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('centers')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/65 text-[#132C63] font-bold text-sm cursor-pointer transition-colors"
                >
                  <Building2 className="w-4 h-4 text-[#2B59B5]" />
                  <span>Classroom Centers</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('refer-earn')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/65 text-[#132C63] font-bold text-sm cursor-pointer transition-colors"
                >
                  <span className="inline-flex items-center gap-3">
                    <Gift className="w-4 h-4 text-[#2B59B5]" />
                    <span>Refer &amp; Earn</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white text-[11px] font-extrabold font-mono-tabular shadow-xs">
                    ₹5000
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('reviews')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/65 text-[#132C63] font-bold text-sm cursor-pointer transition-colors"
                >
                  <Star className="w-4 h-4 text-[#2B59B5]" />
                  <span>Reviews &amp; Success Stories</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/65 text-[#132C63] font-bold text-sm cursor-pointer transition-colors"
                >
                  <Contact className="w-4 h-4 text-[#2B59B5]" />
                  <span>Contact Us</span>
                </button>
              </div>

              {/* Role-Protected Workspace Cards */}
              <div className="pt-3 border-t border-white/80 space-y-2">
                <button
                  type="button"
                  onClick={() => handleNav('student')}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-white/95 hover:bg-white border border-white shadow-sm text-[#132C63] font-bold text-sm cursor-pointer transition-all"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                    <span>Student Dashboard &amp; LMS</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white text-[11px] font-extrabold">
                    Portal
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('mentor-portal')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white/70 hover:bg-white border border-white/85 text-[#132C63] font-bold text-sm cursor-pointer transition-all"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>Faculty &amp; Mentor Hub</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F1FD] text-[#1E428E] text-[11px] font-extrabold">
                    Mentor
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('recruiter-portal')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white/70 hover:bg-white border border-white/85 text-[#132C63] font-bold text-sm cursor-pointer transition-all"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span>Recruiter &amp; Hiring Desk</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-extrabold">
                    Recruiter
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('instructor')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white/70 hover:bg-white border border-white/85 text-[#132C63] font-bold text-sm cursor-pointer transition-all"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#1E428E]" />
                    <span>Admin Management Console</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-[#1E428E] border border-[#BFD6F6] text-[11px] font-extrabold">
                    Admin
                  </span>
                </button>
              </div>
            </div>

            {/* Sticky Bottom Counseling CTA & Helpline */}
            <div className="px-6 py-5 bg-white/70 border-t border-white/90 space-y-3 text-center shrink-0">
              <p className="text-xs font-semibold text-[#3C5B8F]">
                Confused about which course to select?
              </p>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onRequestCallback('Drawer Career Expert Counseling');
                }}
                className="w-full py-3.5 rounded-2xl metallic-btn-primary text-xs font-extrabold uppercase tracking-wider cursor-pointer"
              >
                TALK TO CAREER EXPERT
              </button>
              <div className="space-y-1 pt-1 text-xs font-bold text-[#1E428E]">
                <a
                  href="tel:+918928466820"
                  className="block hover:text-[#2563EB] transition-colors font-mono-tabular"
                >
                  Call Helpline: +91 89284 66820
                </a>
                <a
                  href="https://wa.me/918928466820?text=Hi%20Hridayam%20by%20Belvo,%20I%20need%20course%20guidance."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-[#2563EB] hover:text-[#132C63] transition-colors font-mono-tabular"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: +91 89284 66820</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
