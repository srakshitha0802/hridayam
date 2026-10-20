import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { navigateTo } from '../../utils/navigation';
import { Menu, X, ChevronDown, User, ShieldCheck, BookOpen, LogOut, Award, Layers } from 'lucide-react';
import { NotificationBell } from './NotificationBell';

export const Navbar: React.FC<{ currentPath: string }> = ({ currentPath }) => {
  const { currentUser, role, isAuthenticated, isAdmin, isStudent, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const navLinks = [
    { label: 'Explore Courses', href: '#/courses' },
    { label: 'Learning Paths', href: '#/paths' },
    { label: 'Categories', href: '#/categories' },
    { label: 'Instructors', href: '#/instructors' },
    { label: 'Resources', href: '#/resources' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    navigateTo(href.replace('#', ''));
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      {/* Role Preview Bar for seamless testing */}
      <div className="bg-slate-100 border-b border-slate-200/60 px-4 py-1 text-xs text-slate-600 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Viewing as:</span>
            <span className="font-semibold text-slate-900 capitalize">
              {role === 'guest' ? 'Guest (Public)' : role === 'student' ? 'Enrolled Student' : 'Platform Administrator'}
            </span>
            {currentUser && (
              <span className="text-slate-400 hidden sm:inline">
                ({currentUser.email})
              </span>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="inline-flex items-center gap-1 font-medium text-teal-700 hover:text-teal-900 hover:underline cursor-pointer"
            >
              Switch Role View
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {roleSwitcherOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 text-left">
                <button
                  onClick={() => { switchRole('guest'); setRoleSwitcherOpen(false); }}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-slate-50 flex items-center justify-between ${role === 'guest' ? 'font-semibold text-teal-600 bg-teal-50/50' : 'text-slate-700'}`}
                >
                  <span>Guest (Public Mode)</span>
                  {role === 'guest' && <span>✓</span>}
                </button>
                <button
                  onClick={() => { switchRole('student'); setRoleSwitcherOpen(false); }}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-slate-50 flex items-center justify-between ${role === 'student' ? 'font-semibold text-teal-600 bg-teal-50/50' : 'text-slate-700'}`}
                >
                  <span>Student (Rahul Sharma)</span>
                  {role === 'student' && <span>✓</span>}
                </button>
                <button
                  onClick={() => { switchRole('admin'); setRoleSwitcherOpen(false); }}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-slate-50 flex items-center justify-between ${role === 'admin' ? 'font-semibold text-teal-600 bg-teal-50/50' : 'text-slate-700'}`}
                >
                  <span>Administrator (Belvo Admin)</span>
                  {role === 'admin' && <span>✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Strict 3-Zone Top Navigation Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center shrink-0">
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); handleNavClick('#/'); }}
            className="flex items-center gap-2.5 text-slate-900 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-slate-950 via-slate-900 to-teal-800 flex items-center justify-center text-white shadow-sm ring-1 ring-slate-800/10">
              {/* Custom Hridayam Geometric Monogram */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-teal-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-950 leading-tight">
                Hridayam
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                by Belvo
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: 4-5 Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                    : 'hover:text-slate-950'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action / Profile Zone */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Public Verification Shortcut */}
          <button
            onClick={() => handleNavClick('#/verify-certificate')}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            title="Verify Certificate"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Verify Certificate</span>
          </button>

          {/* Notification & Transactional Email Center */}
          <NotificationBell />

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white shadow-xs transition-colors cursor-pointer"
              >
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="text-xs font-medium text-slate-800 hidden sm:inline whitespace-nowrap max-w-[120px] truncate">
                  {currentUser?.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 truncate">{currentUser?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {role}
                    </span>
                  </div>

                  {isStudent && (
                    <>
                      <button
                        onClick={() => handleNavClick('#/dashboard')}
                        className="w-full px-4 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 text-teal-600" />
                        <span>Student Dashboard</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('#/dashboard?tab=certificates')}
                        className="w-full px-4 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>My Certificates</span>
                      </button>
                    </>
                  )}

                  {isAdmin && (
                    <button
                      onClick={() => handleNavClick('#/admin')}
                      className="w-full px-4 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer font-medium text-teal-800"
                    >
                      <Layers className="w-4 h-4 text-teal-600" />
                      <span>Admin Management Console</span>
                    </button>
                  )}

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={() => { logout(); setProfileDropdownOpen(false); handleNavClick('#/'); }}
                    className="w-full px-4 py-2 text-xs text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('#/login')}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => handleNavClick('#/courses')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
              >
                Explore Courses
              </button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-sm font-medium text-slate-800 py-2 border-b border-slate-100 hover:text-teal-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#/verify-certificate"
              onClick={(e) => { e.preventDefault(); handleNavClick('#/verify-certificate'); }}
              className="text-sm font-medium text-teal-700 py-2 border-b border-slate-100 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Certificate</span>
            </a>
            {isAdmin && (
              <a
                href="#/admin"
                onClick={(e) => { e.preventDefault(); handleNavClick('#/admin'); }}
                className="text-sm font-medium text-teal-800 py-2 border-b border-slate-100"
              >
                Admin Management Console
              </a>
            )}
            {isStudent && (
              <a
                href="#/dashboard"
                onClick={(e) => { e.preventDefault(); handleNavClick('#/dashboard'); }}
                className="text-sm font-medium text-teal-800 py-2 border-b border-slate-100"
              >
                Student Learning Dashboard
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
