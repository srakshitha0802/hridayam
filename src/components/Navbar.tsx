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
      {/* Sticky Floating Google Reviews Tab Moved to Right Edge (Darkest Transparent Pink Glass) */}
      <aside aria-label="Student review highlights">
        <button
          onClick={() => onNavigate('reviews')}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 glass-dark rounded-l-2xl py-3.5 px-2.5 flex flex-col items-center gap-1.5 cursor-pointer hover:border-pink-300 transition-all shadow-2xl group border-r-0"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          title="Google Reviews 4.9 Rating"
          aria-label="View Google Reviews with 4.9 rating"
        >
          <span className="text-[11px] font-bold text-white tracking-wide group-hover:text-pink-200">
            Google Reviews
          </span>
          <span className="flex items-center text-pink-300 text-[11px] font-extrabold">
            ★ 4.9
          </span>
        </button>
      </aside>

      {/* Fixed Darkest Transparent Pink Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-pink-400/35 shadow-2xl backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Left: Official Hridayam by Belvo Logo */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-3 cursor-pointer text-left shrink-0 group"
              >
                <div className="p-1.5 sm:p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-pink-300/30 group-hover:border-pink-300/60 transition-all">
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
                  className="btn-pink-dark text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer shadow-md text-white border border-pink-400/40"
                >
                  <GoogleIcon name="menu_book" size={16} className="text-pink-200" />
                  <span className="text-white">Explore Courses</span>
                  <GoogleIcon
                    name="keyboard_arrow_down"
                    size={16}
                    className={`transition-transform duration-200 text-pink-200 ${
                      coursesDropdownOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {/* Glass Dropdown Menu */}
                {coursesDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 glass-dark rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150 border border-pink-400/40">
                    <div className="text-[10px] font-bold text-pink-200 uppercase tracking-wider px-3 py-1.5 border-b border-pink-400/30">
                      All Career Programs
                    </div>
                    <div className="space-y-1 mt-1 max-h-80 overflow-y-auto pr-1">
                      {ITV_COURSES.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => handleCourseClick(course.id)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-white/15 transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <div className="text-xs font-semibold text-white group-hover:text-pink-200">
                              {course.title}
                            </div>
                            <div className="text-[10px] text-pink-200">
                              {course.duration} • 100% Placement
                            </div>
                          </div>
                          <GoogleIcon
                            name="chevron_right"
                            size={16}
                            className="text-pink-300 group-hover:text-white"
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
                className="btn-pink-glass hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white hover:border-pink-300 cursor-pointer shadow-md"
                title="Student Dashboard"
              >
                <GoogleIcon name="school" size={16} className="text-pink-200" />
                <span className="text-white">Student Hub</span>
              </button>

              {/* Admin Portal Quick Access */}
              <button
                onClick={() => handleNavClick('instructor')}
                className="btn-pink-dark hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white hover:border-pink-300 cursor-pointer border border-pink-400/30"
                title="Admin Console"
              >
                <GoogleIcon name="admin_panel_settings" size={16} className="text-pink-200" />
                <span className="text-white">Admin</span>
              </button>

              <button
                onClick={() => onRequestCallback()}
                className="btn-pink-primary px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-lg text-white"
              >
                <GoogleIcon name="headset_mic" size={17} className="text-white" />
                <span className="hidden sm:inline text-white">Get Career Guidance</span>
                <span className="sm:hidden text-white">Guidance</span>
              </button>

              {/* Hamburger Button that opens the right drawer */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2.5 rounded-xl bg-pink-900/60 hover:bg-pink-800/80 text-white transition-colors cursor-pointer border border-pink-400/30"
                title="Open Navigation Menu"
              >
                <GoogleIcon name="menu" size={22} weight={500} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-Over Right Drawer Menu (Glassy Darkest Transparent Pink & White) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm sm:max-w-md glass-dark h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 border-l border-pink-400/40">
            {/* Drawer Header with Logo */}
            <div>
              <div className="flex items-center justify-between p-5 border-b border-pink-400/30 bg-black/20">
                <div className="p-1 rounded-xl bg-white/10 backdrop-blur-md">
                  <img
                    src="/logo.png"
                    alt="Hridayam by Belvo"
                    className="h-9 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-white/15 text-pink-200 transition-colors cursor-pointer"
                  title="Close Menu"
                >
                  <GoogleIcon name="close" size={20} className="text-white" />
                </button>
              </div>

              {/* Drawer Menu Links */}
              <nav className="p-4 space-y-1 text-sm font-medium text-white">
                {/* All Courses Accordion */}
                <div>
                  <button
                    onClick={() => setDrawerCoursesExpanded(!drawerCoursesExpanded)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <span className="font-semibold text-white flex items-center gap-2">
                      <GoogleIcon name="school" size={18} className="text-pink-300" />
                      All Courses
                    </span>
                    <GoogleIcon
                      name="keyboard_arrow_down"
                      size={18}
                      className={`transition-transform text-pink-300 ${
                        drawerCoursesExpanded ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  {drawerCoursesExpanded && (
                    <div className="pl-4 pr-2 py-1 space-y-1 text-xs border-l-2 border-pink-400/40 ml-4 mt-1 max-h-60 overflow-y-auto">
                      {ITV_COURSES.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => handleCourseClick(course.id)}
                          className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/15 text-pink-100 hover:text-white transition-colors block font-medium"
                        >
                          {course.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleNavClick('placements')}
                  className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between text-white"
                >
                  <span className="flex items-center gap-2">
                    <GoogleIcon name="workspace_premium" size={18} className="text-pink-300" />
                    Placements
                  </span>
                  <span className="text-[11px] bg-pink-900/80 text-pink-200 font-semibold px-2 py-0.5 rounded-full border border-pink-400/40">
                    100%
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('placements')}
                  className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-white"
                >
                  <GoogleIcon name="business_center" size={18} className="text-pink-300" />
                  Hire From Us
                </button>

                <button
                  onClick={() => handleNavClick('centers')}
                  className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-white"
                >
                  <GoogleIcon name="domain" size={18} className="text-pink-300" />
                  Classroom Centers
                </button>

                <button
                  onClick={() => handleNavClick('refer-earn')}
                  className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between text-white font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <GoogleIcon name="redeem" size={18} className="text-pink-300" />
                    Refer & Earn
                  </span>
                  <span className="text-[11px] bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold px-2 py-0.5 rounded-full shadow-md">
                    ₹5000
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('reviews')}
                  className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-white"
                >
                  <GoogleIcon name="star_rate" size={18} className="text-pink-300" />
                  Reviews & Success Stories
                </button>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 font-semibold text-white"
                >
                  <GoogleIcon name="contact_phone" size={18} className="text-pink-300" />
                  Contact Us
                </button>

                <div className="pt-2 pb-1 border-t border-pink-400/30 my-1">
                  <button
                    onClick={() => handleNavClick('student')}
                    className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between font-bold text-white"
                  >
                    <span className="flex items-center gap-2">
                      <GoogleIcon name="school" size={18} className="text-pink-300" />
                      Student Dashboard &amp; LMS
                    </span>
                    <span className="text-[10px] bg-pink-800 text-white font-bold px-2 py-0.5 rounded-full border border-pink-400/40">
                      Portal
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick('instructor')}
                    className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between font-bold text-white mt-1"
                  >
                    <span className="flex items-center gap-2">
                      <GoogleIcon name="admin_panel_settings" size={18} className="text-pink-300" />
                      Admin Management Console
                    </span>
                    <span className="text-[10px] bg-pink-900 text-pink-200 font-bold px-2 py-0.5 rounded-full border border-pink-400/30">
                      Admin
                    </span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Bottom of Drawer: "Confused about which course to select? Talk to Career Expert" */}
            <div className="p-5 border-t border-pink-400/30 bg-black/30 space-y-3">
              <div className="text-xs text-pink-200 text-center font-medium">
                Confused about which course to select?
              </div>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onRequestCallback();
                }}
                className="w-full py-3 rounded-xl btn-pink-primary font-semibold text-xs uppercase tracking-wider shadow-md cursor-pointer text-white"
              >
                Talk to Career Expert
              </button>
              <div className="text-center space-y-1">
                <a
                  href="tel:+918928466820"
                  className="text-xs font-semibold text-pink-200 hover:text-white block"
                >
                  Call Helpline: +91 89284 66820
                </a>
                <a
                  href="https://wa.me/918928466820?text=Hi%20Hridayam%20by%20Belvo,%20I%20am%20interested%20in%20learning%20more%20about%20your%20courses."
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold text-pink-300 hover:underline flex items-center justify-center gap-1"
                >
                  <GoogleIcon name="chat" size={13} className="text-pink-400" filled />
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
