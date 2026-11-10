import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { navigateTo } from '../../utils/navigation';
import { Menu, X, ChevronDown, User, ShieldCheck, BookOpen, LogOut, Award, Layers } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { BRAND_ASSETS } from '../../utils/brand';

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F0D6E3]">
      {/* Role Preview Bar for seamless testing */}
      <div className="bg-[#FFF5F9] border-b border-[#F0D6E3] px-4 py-1 text-xs text-[#756572] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#756572] font-medium">Viewing as:</span>
            <span className="font-semibold text-[#760D3B] capitalize">
              {role === 'guest' ? 'Guest (Public)' : role === 'student' ? 'Enrolled Student' : 'Platform Administrator'}
            </span>
            {currentUser && (
              <span className="text-[#756572]/70 hidden sm:inline">
                ({currentUser.email})
              </span>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="inline-flex items-center gap-1 font-semibold text-[#C2185B] hover:text-[#760D3B] hover:underline cursor-pointer"
            >
              <span>Switch Role View</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {roleSwitcherOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-[#F0D6E3] py-1 z-50 text-left">
                <button
                  onClick={() => { switchRole('guest'); setRoleSwitcherOpen(false); }}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-[#FFF5F9] flex items-center justify-between cursor-pointer ${role === 'guest' ? 'font-bold text-[#C2185B] bg-[#FCE7F3]/60' : 'text-[#21131B]'}`}
                >
                  <span>Guest (Public Mode)</span>
                  {role === 'guest' && <span className="text-[#C2185B]">✓</span>}
                </button>
                <button
                  onClick={() => { switchRole('student'); setRoleSwitcherOpen(false); }}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-[#FFF5F9] flex items-center justify-between cursor-pointer ${role === 'student' ? 'font-bold text-[#C2185B] bg-[#FCE7F3]/60' : 'text-[#21131B]'}`}
                >
                  <span>Student (Rahul Sharma)</span>
                  {role === 'student' && <span className="text-[#C2185B]">✓</span>}
                </button>
                <button
                  onClick={() => { switchRole('admin'); setRoleSwitcherOpen(false); }}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-[#FFF5F9] flex items-center justify-between cursor-pointer ${role === 'admin' ? 'font-bold text-[#C2185B] bg-[#FCE7F3]/60' : 'text-[#21131B]'}`}
                >
                  <span>Administrator (Belvo Admin)</span>
                  {role === 'admin' && <span className="text-[#C2185B]">✓</span>}
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
            className="flex items-center gap-2.5 text-[#21131B] group select-none"
          >
            <img
              src={BRAND_ASSETS.logoMark}
              alt="Hridayam Logo"
              className="w-10 h-10 object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#21131B] leading-tight group-hover:text-[#C2185B] transition-colors">
                Hridayam
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#756572]">
                by Belvo
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#756572]">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-[#C2185B] font-bold border-b-2 border-[#C2185B]'
                    : 'hover:text-[#21131B]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions / Profile Zone */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Public Verification Shortcut */}
          <button
            onClick={() => handleNavClick('#/verify-certificate')}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-[#756572] hover:text-[#C2185B] px-3 py-1.5 rounded-lg hover:bg-[#FCE7F3]/40 transition-colors cursor-pointer"
            title="Verify Certificate"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C2185B]" />
            <span>Verify Certificate</span>
          </button>

          {/* Notification Center */}
          <NotificationBell />

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-[#F0D6E3] hover:border-[#C2185B]/50 bg-white shadow-xs transition-colors cursor-pointer"
              >
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#F0D6E3]"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#760D3B] text-white flex items-center justify-center text-xs font-bold">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="text-xs font-semibold text-[#21131B] hidden sm:inline whitespace-nowrap max-w-[120px] truncate">
                  {currentUser?.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#756572]" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#F0D6E3] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-[#F0D6E3]/60">
                    <p className="text-xs font-bold text-[#21131B] truncate">{currentUser?.name}</p>
                    <p className="text-[11px] text-[#756572] truncate">{currentUser?.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-[#FCE7F3] text-[#760D3B]">
                      {role}
                    </span>
                  </div>

                  {isStudent && (
                    <>
                      <button
                        onClick={() => handleNavClick('#/dashboard')}
                        className="w-full px-4 py-2 text-xs text-left text-[#21131B] hover:bg-[#FFF5F9] flex items-center gap-2.5 cursor-pointer transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-[#C2185B]" />
                        <span>Student Dashboard</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('#/dashboard?tab=certificates')}
                        className="w-full px-4 py-2 text-xs text-left text-[#21131B] hover:bg-[#FFF5F9] flex items-center gap-2.5 cursor-pointer transition-colors"
                      >
                        <Award className="w-4 h-4 text-[#E83E8C]" />
                        <span>My Certificates</span>
                      </button>
                    </>
                  )}

                  {isAdmin && (
                    <button
                      onClick={() => handleNavClick('#/admin')}
                      className="w-full px-4 py-2 text-xs text-left text-[#760D3B] hover:bg-[#FFF5F9] flex items-center gap-2.5 cursor-pointer font-bold transition-colors"
                    >
                      <Layers className="w-4 h-4 text-[#C2185B]" />
                      <span>Admin Management Console</span>
                    </button>
                  )}

                  <div className="border-t border-[#F0D6E3]/60 my-1"></div>

                  <button
                    onClick={() => { logout(); setProfileDropdownOpen(false); handleNavClick('#/'); }}
                    className="w-full px-4 py-2 text-xs text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer transition-colors"
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
                className="px-3.5 py-2 text-xs font-semibold text-[#756572] hover:text-[#21131B] rounded-xl hover:bg-[#FCE7F3]/40 transition-colors whitespace-nowrap cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => handleNavClick('#/courses')}
                className="px-4 py-2 text-xs font-bold text-white bg-[#C2185B] hover:bg-[#760D3B] rounded-xl transition-all whitespace-nowrap shadow-xs hover:shadow cursor-pointer"
              >
                Explore Courses
              </button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#21131B] hover:bg-[#FCE7F3]/40 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F0D6E3] bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-sm font-semibold text-[#21131B] py-2 border-b border-[#F0D6E3]/60 hover:text-[#C2185B] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#/verify-certificate"
              onClick={(e) => { e.preventDefault(); handleNavClick('#/verify-certificate'); }}
              className="text-sm font-semibold text-[#C2185B] py-2 border-b border-[#F0D6E3]/60 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#C2185B]" />
              <span>Verify Certificate</span>
            </a>
            {isAdmin && (
              <a
                href="#/admin"
                onClick={(e) => { e.preventDefault(); handleNavClick('#/admin'); }}
                className="text-sm font-bold text-[#760D3B] py-2 border-b border-[#F0D6E3]/60 flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#C2185B]" />
                <span>Admin Management Console</span>
              </a>
            )}
            {isStudent && (
              <a
                href="#/dashboard"
                onClick={(e) => { e.preventDefault(); handleNavClick('#/dashboard'); }}
                className="text-sm font-bold text-[#760D3B] py-2 border-b border-[#F0D6E3]/60 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#C2185B]" />
                <span>Student Learning Dashboard</span>
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
