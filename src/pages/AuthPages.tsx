import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { navigateTo } from '../utils/navigation';
import { Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BRAND_ASSETS } from '../utils/brand';

export const LoginPage: React.FC = () => {
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your registered email and password.');
      return;
    }
    const success = login(email);
    if (success) {
      if (email.toLowerCase().includes('admin')) {
        navigateTo('/admin');
      } else {
        navigateTo('/dashboard');
      }
    }
  };

  const handleDemoStudent = () => {
    switchRole('student');
    navigateTo('/dashboard');
  };

  const handleDemoAdmin = () => {
    switchRole('admin');
    navigateTo('/admin');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <a href="#/" className="inline-block group mb-1">
          <img
            src={BRAND_ASSETS.logoMark}
            alt="Hridayam Logo"
            className="w-12 h-12 mx-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </a>
        <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">
          Sign In to Hridayam
        </h1>
        <p className="text-xs text-slate-500">
          Access your courses, track your lessons, and review earned certificates.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#F0D6E3] p-6 sm:p-8 shadow-xs space-y-5">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">Password:</label>
              <button
                type="button"
                onClick={() => navigateTo('/forgot-password')}
                className="text-[#C2185B] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs font-bold text-white bg-[#C2185B] hover:bg-[#760D3B] rounded-xl transition-colors cursor-pointer shadow-md shadow-[#C2185B]/20"
          >
            Sign In
          </button>
        </form>

        {/* 1-Click Fast Preview Sign In for Reviewers */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide text-center">
            Quick Preview Access:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDemoStudent}
              className="py-2 px-3 text-xs font-semibold text-[#760D3B] bg-[#FCE7F3]/70 hover:bg-[#FCE7F3] rounded-lg border border-[#F0D6E3] transition-colors cursor-pointer text-center"
            >
              Sign In as Student
            </button>
            <button
              onClick={handleDemoAdmin}
              className="py-2 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer text-center"
            >
              Sign In as Admin
            </button>
          </div>
        </div>

        <div className="pt-2 text-center text-xs text-slate-500">
          Don’t have an account yet?{' '}
          <button
            onClick={() => navigateTo('/register')}
            className="text-[#C2185B] font-semibold hover:underline"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      register(name, email);
      navigateTo('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <a href="#/" className="inline-block group mb-1">
          <img
            src={BRAND_ASSETS.logoMark}
            alt="Hridayam Logo"
            className="w-12 h-12 mx-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </a>
        <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">
          Student Registration
        </h1>
        <p className="text-xs text-slate-500">
          Create your free Hridayam learner account and start building real-world skills.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#F0D6E3] p-6 sm:p-8 shadow-xs space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Name:</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs font-bold text-white bg-[#C2185B] hover:bg-[#760D3B] rounded-xl transition-colors cursor-pointer shadow-md shadow-[#C2185B]/20"
          >
            Create Free Account
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          Already registered?{' '}
          <button
            onClick={() => navigateTo('/login')}
            className="text-[#C2185B] font-semibold hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">
          Reset Your Password
        </h1>
        <p className="text-xs text-slate-500">
          Enter your registered email address to receive password recovery instructions.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#F0D6E3] p-6 sm:p-8 shadow-xs">
        {sent ? (
          <div className="text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#C2185B] mx-auto" />
            <h3 className="text-sm font-bold text-slate-900">Recovery Link Dispatched</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If an account is associated with <strong className="text-slate-900">{email}</strong>, a secure expiring token has been prepared.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('/login')}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#C2185B] hover:bg-[#760D3B] rounded-lg shadow-md shadow-[#C2185B]/20 cursor-pointer"
              >
                Return to Login
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#C2185B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-white bg-[#C2185B] hover:bg-[#760D3B] rounded-xl transition-colors cursor-pointer shadow-md shadow-[#C2185B]/20"
            >
              Send Recovery Link
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => navigateTo('/login')}
                className="text-slate-500 hover:text-slate-900 text-xs"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
