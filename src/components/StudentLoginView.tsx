import React, { useState } from 'react';
import { GoogleIcon } from './GoogleIcon';
import { useAuth } from '../context/AuthContext';

interface StudentLoginViewProps {
  onSuccess: () => void;
  onGoAdminLogin: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export function StudentLoginView({
  onSuccess,
  onGoAdminLogin,
  onToast,
}: StudentLoginViewProps) {
  const { signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleStudentSignIn = async () => {
    setBusy(true);
    try {
      const signed = await signInWithGoogle();
      if (signed) {
        onToast('success', `Welcome to Hridayam, ${signed.displayName?.split(' ')[0] || 'Learner'}!`);
        onSuccess();
      }
    } catch {
      onToast('error', 'Sign-in cancelled or blocked');
    } finally {
      setBusy(false);
    }
  };

  const handleDemoLearner = () => {
    onToast('success', 'Logged in as Demo Learner', 'Accessing all enrolled courses and interactive quizzes.');
    onSuccess();
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onToast('success', isRegisterMode ? 'Account Created Successfully!' : 'Welcome Back!', `Signed in as ${name || email.split('@')[0]}`);
    onSuccess();
  };

  return (
    <section className="max-w-[640px] mx-auto px-5 py-12 sm:py-20 relative z-10 text-white">
      <div className="glass-dark rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-sky-400/40 relative backdrop-blur-2xl">
        <div className="flex items-center gap-3.5 pb-6 border-b border-sky-400/30">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <GoogleIcon name="school" size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-sky-300 uppercase tracking-wider">
              {isRegisterMode ? 'Student Registration' : 'Student & Learner Login'}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
              Hridayam by Belvo Portal
            </h1>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <p className="text-xs sm:text-sm text-sky-200 leading-relaxed">
            Access your 11 Belvo enrolled courses, video studio lessons, interactive quizzes, assignments, and claim your verifiable completion certificates.
          </p>

          {/* PRIMARY GOOGLE LOGIN BUTTON */}
          <button
            type="button"
            disabled={busy}
            onClick={() => void handleStudentSignIn()}
            className="w-full py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-sky-400/40 hover:border-sky-300 shadow-xl text-white font-bold text-sm transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#F472B6" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#EC4899" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBCFE8" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#38BDF8" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>{busy ? 'Connecting with Google...' : 'Sign in with Google Account'}</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-sky-400/30" />
            <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">
              Or Sign In with Email / Demo
            </span>
            <div className="flex-1 border-t border-sky-400/30" />
          </div>

          {/* Email / Registration form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-sky-200 mb-1">
                  Full Name <span className="text-sky-400 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-sky-200 mb-1">
                Student Email <span className="text-sky-400 font-bold">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="learner@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sky-200 mb-1">
                Password <span className="text-sky-400 font-bold">*</span>
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                defaultValue="password123"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-pink-primary font-bold text-xs uppercase tracking-wider text-white shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isRegisterMode ? 'Complete Registration' : 'Sign In with Email'}</span>
              <GoogleIcon name="arrow_forward" size={16} />
            </button>
          </form>

          {/* Fast One-Click Demo Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleDemoLearner}
              className="w-full py-2.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md border border-sky-400/40"
            >
              <GoogleIcon name="rocket_launch" size={16} className="text-sky-300" />
              <span>Explore as Demo Student (Instant Sandbox)</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-sky-400/30 text-xs">
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="font-semibold text-sky-300 hover:text-white underline cursor-pointer"
            >
              {isRegisterMode ? 'Already have an account? Sign in' : "Don't have an account? Register now"}
            </button>

            <button
              type="button"
              onClick={onGoAdminLogin}
              className="font-semibold text-sky-200 hover:text-white cursor-pointer flex items-center gap-1"
            >
              <GoogleIcon name="admin_panel_settings" size={14} className="text-sky-300" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
