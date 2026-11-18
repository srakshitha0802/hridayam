import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { AppView } from '../types';
import { ITV_COURSES } from '../data/itvedantData';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onRequestCallback: (courseInterest?: string) => void;
  onSelectCourse?: (courseId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onRequestCallback,
  onSelectCourse,
}) => {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCoursesExpanded, setDrawerCoursesExpanded] = useState(true);

  const handleNavClick = (view: AppView) => {
    setDrawerOpen(false);
    setCoursesDropdownOpen(false);
    onNavigate(view);
  };

  const handleCourseClick = (courseId: string) => {
    setDrawerOpen(false);
    setCoursesDropdownOpen(false);
    if (onSelectCourse) {
      onSelectCourse(courseId);
    } else {
      onNavigate('catalogue');
    }
  };

  return (
    <>
      {/* Sticky Floating Google Reviews Tab at Right Edge */}
      <aside aria-label="Student review highlights">
        <button
          onClick={() => onNavigate('reviews')}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-white/95 text-slate-900 rounded-l-2xl py-3.5 px-2.5 flex flex-col items-center gap-1.5 cursor-pointer hover:border-blue-500 transition-all shadow-xl group border-2 border-r-0 border-blue-200 backdrop-blur-md"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          title="Google Reviews 4.9 Rating"
          aria-label="View Google Reviews with 4.9 rating"
        >
          <span className="text-[11px] font-bold text-slate-800 tracking-wide group-hover:text-blue-600">
            Google Reviews
          </span>
          <span className="flex items-center text-blue-600 text-[11px] font-extrabold">
            ★ 4.9
          </span>
        </button>
      </aside>

      {/* Fixed Modern Bold Frame Header (Frosted White Glass & Blue Texture) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-b-2 border-blue-100 shadow-sm text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Left: Official Hridayam by Belvo Logo */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-3 cursor-pointer text-left shrink-0 group"
              >
                <div className="p-1.5 sm:p-2 rounded-2xl bg-blue-50/80 backdrop-blur-md border border-blue-200 group-hover:border-blue-400 transition-all shadow-xs">
                  <img
                    src="/logo.png"
                    alt="Hridayam by Belvo"
                    className="h-8 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                  />
                </div>
              </button>

              {/* "Explore Courses ▼" Glass Pill Button */}
              <div
                className="relative hidden sm:block"
                onMouseEnter={() => setCoursesDropdownOpen(true)}
                onMouseLeave={() => setCoursesDropdownOpen(false)}
              >
                <button
                  onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                  className="bg-blue-50 hover:bg-blue-100/80 text-blue-800 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer shadow-xs border-2 border-blue-200/80 hover:border-blue-400 transition-all"
                >
                  <GoogleIcon name="menu_book" size={16} className="text-blue-600" />
                  <span className="font-bold">Explore Courses</span>
                  <GoogleIcon
                    name="keyboard_arrow_down"
                    size={16}
                    className={`transition-transform duration-200 text-blue-600 ${
                      coursesDropdownOpen ? 'rotate-180 text-blue-800' : ''
                    }`}
                  />
                </button>

                {/* Glass Dropdown Menu */}
                {coursesDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150 border-2 border-blue-200">
                    <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider px-3 py-1.5 border-b border-blue-100">
                      All Career Programs
                    </div>
                    <div className="space-y-1 mt-1 max-h-80 overflow-y-auto pr-1">
                      {ITV_COURSES.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => handleCourseClick(course.id)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                              {course.title}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {course.duration} • 100% Placement
                            </div>
                          </div>
                          <GoogleIcon
                            name="chevron_right"
                            size={16}
                            className="text-blue-500 group-hover:translate-x-0.5 transition-transform"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Portal Access + Guidance Button + Hamburger Menu */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Student Portal Quick Access */}
              <button
                onClick={() => handleNavClick('student')}
                className="btn-blue-glass hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-700 hover:border-blue-500 cursor-pointer shadow-xs"
                title="Student Dashboard"
              >
                <GoogleIcon name="school" size={16} className="text-blue-600" />
                <span>Student Hub</span>
              </button>

              {/* Admin Portal Quick Access */}
              <button
                onClick={() => handleNavClick('instructor')}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 cursor-pointer border border-slate-300"
                title="Admin Console"
              >
                <GoogleIcon name="admin_panel_settings" size={16} className="text-slate-600" />
                <span>Admin</span>
              </button>

              <button
                onClick={() => onRequestCallback()}
                className="btn-blue-primary px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-md text-white"
              >
                <GoogleIcon name="headset_mic" size={17} className="text-white" />
                <span className="hidden sm:inline text-white">Get Career Guidance</span>
                <span className="sm:hidden text-white">Guidance</span>
              </button>

              {/* Hamburger Button that opens the right drawer */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer border-2 border-blue-200"
                title="Open Navigation Menu"
              >
                <GoogleIcon name="menu" size={22} weight={500} className="text-blue-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-Over Right Drawer Menu (Clean White & Blue Accents) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm sm:max-w-md bg-white text-slate-900 h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 border-l-2 border-blue-200">
            {/* Drawer Header with Logo */}
            <div>
              <div className="flex items-center justify-between p-5 border-b border-blue-100 bg-blue-50/50">
                <div className="p-1 rounded-xl bg-white border border-blue-200">
                  <img
                    src="/logo.png"
                    alt="Hridayam by Belvo"
                    className="h-9 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-blue-100 text-slate-600 transition-colors cursor-pointer"
                  title="Close Menu"
                >
                  <GoogleIcon name="close" size={20} className="text-slate-800" />
                </button>
              </div>

              {/* Drawer Menu Links */}
              <nav className="p-4 space-y-1 text-sm font-medium text-slate-800">
                {/* All Courses Accordion */}
                <div>
                  <button
                    onClick={() => setDrawerCoursesExpanded(!drawerCoursesExpanded)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-colors text-left"
                  >
                    <span className="font-semibold text-slate-900 flex items-center gap-2">
                      <GoogleIcon name="school" size={18} className="text-blue-600" />
                      All Courses
                    </span>
                    <GoogleIcon
                      name="keyboard_arrow_down"
                      size={18}
                      className={`transition-transform text-blue-600 ${
                        drawerCoursesExpanded ? 'rotate-180 text-blue-800' : ''
                      }`}
                    />
                  </button>

                  {drawerCoursesExpanded && (
                    <div className="pl-4 pr-2 py-1 space-y-1 text-xs border-l-2 border-blue-200 ml-4 mt-1 max-h-60 overflow-y-auto">
                      {ITV_COURSES.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => handleCourseClick(course.id)}
                          className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors block font-medium"
                        >
                          {course.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleNavClick('placements')}
                  className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between text-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <GoogleIcon name="workspace_premium" size={18} className="text-blue-600" />
                    Placements
                  </span>
                  <span className="text-[11px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                    100%
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('placements')}
                  className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 text-slate-800"
                >
                  <GoogleIcon name="business_center" size={18} className="text-blue-600" />
                  Hire From Us
                </button>

                <button
                  onClick={() => handleNavClick('centers')}
                  className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 text-slate-800"
                >
                  <GoogleIcon name="domain" size={18} className="text-blue-600" />
                  Classroom Centers
                </button>

                <button
                  onClick={() => handleNavClick('refer-earn')}
                  className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between text-slate-800 font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <GoogleIcon name="redeem" size={18} className="text-blue-600" />
                    Refer & Earn
                  </span>
                  <span className="text-[11px] bg-gradient-to-r from-blue-600 to-sky-600 text-white font-bold px-2 py-0.5 rounded-full shadow-xs">
                    ₹5000
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('reviews')}
                  className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 text-slate-800"
                >
                  <GoogleIcon name="star_rate" size={18} className="text-blue-600" />
                  Reviews & Success Stories
                </button>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 font-semibold text-slate-800"
                >
                  <GoogleIcon name="contact_phone" size={18} className="text-blue-600" />
                  Contact Us
                </button>

                <div className="pt-2 pb-1 border-t border-blue-100 my-1">
                  <button
                    onClick={() => handleNavClick('student')}
                    className="w-full text-left p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-between font-bold text-blue-900"
                  >
                    <span className="flex items-center gap-2">
                      <GoogleIcon name="school" size={18} className="text-blue-600" />
                      Student Dashboard &amp; LMS
                    </span>
                    <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                      Portal
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick('instructor')}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-between font-bold text-slate-800 mt-1"
                  >
                    <span className="flex items-center gap-2">
                      <GoogleIcon name="admin_panel_settings" size={18} className="text-slate-600" />
                      Admin Management Console
                    </span>
                    <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded-full border border-slate-300">
                      Admin
                    </span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Bottom of Drawer: Talk to Career Expert */}
            <div className="p-5 border-t border-blue-100 bg-blue-50/50 space-y-3">
              <div className="text-xs text-slate-600 text-center font-medium">
                Confused about which course to select?
              </div>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onRequestCallback();
                }}
                className="w-full py-3 rounded-xl btn-blue-primary font-semibold text-xs uppercase tracking-wider shadow-md cursor-pointer text-white"
              >
                Talk to Career Expert
              </button>
              <div className="text-center space-y-1">
                <a
                  href="tel:+918928466820"
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 block"
                >
                  Call Helpline: +91 89284 66820
                </a>
                <a
                  href="https://wa.me/918928466820?text=Hi%20Hridayam%20by%20Belvo,%20I%20am%20interested%20in%20learning%20more%20about%20your%20courses."
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold text-blue-600 hover:underline flex items-center justify-center gap-1"
                >
                  <GoogleIcon name="chat" size={13} className="text-blue-600" filled />
                  <span>WhatsApp: +91 89284 66820</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
