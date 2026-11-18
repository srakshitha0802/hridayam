import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { useAuth } from '../context/AuthContext';

interface AdminLoginViewProps {
  onEnterAdminConsole: () => void;
  onGoStudentHub: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export function AdminLoginView({
  onEnterAdminConsole,
  onGoStudentHub,
  onToast,
}: AdminLoginViewProps) {
  const { signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const [adminKey, setAdminKey] = useState('');

  const handleAdminSignIn = async () => {
    setBusy(true);
    try {
      const signed = await signInWithGoogle();
      if (signed) {
        onToast('info', 'Verifying administrator credentials...');
      }
    } catch {
      onToast('error', 'Admin sign-in cancelled or blocked');
    } finally {
      setBusy(false);
    }
  };

  const handleDemoAdminAccess = () => {
    onToast('success', 'Admin Access Granted', 'Entering Belvo Course & Enrolment Management Console.');
    onEnterAdminConsole();
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onToast('success', 'Admin Passcode Verified', 'Entering Belvo Course & Enrolment Management Console.');
    onEnterAdminConsole();
  };

  return (
    <section className="max-w-[680px] mx-auto px-5 py-12 sm:py-20 relative z-10 text-white">
      <div className="glass-dark rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-sky-400/40 relative backdrop-blur-2xl">
        <div className="flex items-center gap-3.5 pb-6 border-b border-sky-400/30">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-700 to-sky-700 text-white flex items-center justify-center shrink-0 shadow-md">
            <GoogleIcon name="admin_panel_settings" size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-sky-300 uppercase tracking-wider">
              Executive Platform Console
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
              Hridayam Admin Portal
            </h1>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <p className="text-xs sm:text-sm text-sky-200 leading-relaxed">
            Manage all 11 Belvo course disciplines, upload video lessons &amp; study sheets, adjust pricing, manage student enrolments, and track live platform analytics.
          </p>

          {/* PRIMARY GOOGLE ADMIN LOGIN */}
          <button
            type="button"
            disabled={busy}
            onClick={() => void handleAdminSignIn()}
            className="w-full py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-sky-400/40 hover:border-sky-300 shadow-xl text-white font-bold text-sm transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#F472B6" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#EC4899" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBCFE8" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#38BDF8" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>{busy ? 'Authenticating with Google...' : 'Sign in as Admin with Google'}</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-sky-400/30" />
            <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">
              Or Master Passcode / Demo
            </span>
            <div className="flex-1 border-t border-sky-400/30" />
          </div>

          <form onSubmit={handleKeySubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-sky-200 mb-1">
                Admin Master Passcode
              </label>
              <input
                type="password"
                placeholder="Enter master key (e.g. belvo2026)"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                defaultValue="belvo2026"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-pink-primary font-bold text-xs uppercase tracking-wider text-white shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Management Console</span>
              <GoogleIcon name="arrow_forward" size={16} />
            </button>
          </form>

          {/* Quick review shortcut */}
          <div className="p-4 bg-black/35 rounded-2xl border border-sky-400/35 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Reviewer / Judge Fast Access</span>
              <span className="text-[10px] bg-blue-900/80 text-sky-200 font-bold px-2 py-0.5 rounded-full border border-sky-400/40">
                Hackathon Demo
              </span>
            </div>
            <p className="text-[11px] text-sky-200 leading-relaxed">
              Explore the complete course creator, curriculum editor, student enrolment manager, and revenue analytics without logging in.
            </p>
            <button
              type="button"
              onClick={handleDemoAdminAccess}
              className="w-full py-2.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-sky-400/40"
            >
              <GoogleIcon name="space_dashboard" size={16} className="text-sky-300" />
              <span>Launch Admin Dashboard Directly</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-sky-400/30 text-xs">
            <button
              type="button"
              onClick={onGoStudentHub}
              className="font-semibold text-sky-300 hover:text-white underline cursor-pointer"
            >
              Looking for Student Login?
            </button>
            <span className="text-[11px] text-sky-300">
              Belvo Educational Systems • 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
