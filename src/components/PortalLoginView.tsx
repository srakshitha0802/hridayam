import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, GraduationCap, Users, Briefcase, Eye, EyeOff, ArrowRight, CheckCircle2, Copy, Check } from 'lucide-react';
import { FIXED_DEMO_ACCOUNTS, useAuth } from '../context/AuthContext';
import { AppView, AuthRole } from '../types';
import { PROVIDED_IMAGES } from '../data/mediaAssets';

interface PortalLoginViewProps {
  initialRole?: AuthRole;
  targetViewAfterLogin?: AppView;
  lockedReason?: string;
  onAuthenticated: (nextView: AppView) => void;
  onBackHome: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

const ROLE_META: Record<
  AuthRole,
  {
    shortLabel: string;
    portalTitle: string;
    icon: React.ReactNode;
    highlights: string[];
  }
> = {
  student: {
    shortLabel: 'Student LMS',
    portalTitle: 'Student Learning & Placement Hub (10 Modules)',
    icon: <GraduationCap className="w-4 h-4" />,
    highlights: [
      'Studio video classroom, persistent module notes & hybrid RSVP timetable',
      'Interactive Coding Sandbox, timed NSDC quiz & Mentor-audited Capstone Lab',
      'Live Resume Builder with real-time ATS keyword match & 1-click hiring drives',
      '0% EMI ledger, GST receipts, scholarship requests & printable NSDC certificate',
    ],
  },
  mentor: {
    shortLabel: 'Faculty & Mentor',
    portalTitle: 'Faculty & Mentor Cohort Workspace (8 Modules)',
    icon: <Users className="w-4 h-4" />,
    highlights: [
      '4-pillar Capstone Rubric Auditor synced live to Student LMS',
      'Coding Lab Challenge Authoring that publishes tasks directly to cohorts',
      'Technical Doubt Ticket Desk, Live Attendance CSV & Mock Interview Scorer',
      '1:1 student mentorship slot tracker & platform-wide cohort broadcasts',
    ],
  },
  recruiter: {
    shortLabel: 'Hiring Partner',
    portalTitle: 'Recruiter & Campus Placement Desk (7 Modules)',
    icon: <Briefcase className="w-4 h-4" />,
    highlights: [
      'Pre-vetted Indian graduate pool with stack, city, CTC & readiness filters',
      'Technical Screening Assessment Builder with instant candidate invites',
      'End-to-end ATS Pipeline, interview room scheduler & provisional offer letters',
      'Zero-cost campus venue reservation across Pune, Bengaluru, Thane & Hyderabad',
    ],
  },
  admin: {
    shortLabel: 'Institute Admin',
    portalTitle: 'Admissions & Academic Admin Console (8 Modules)',
    icon: <ShieldCheck className="w-4 h-4" />,
    highlights: [
      'Dynamic INR curriculum pricing, new course publishing & studio uploads',
      'Indian Campus & Batch Operations seat tracker + Scholarship grant approvals',
      'Admissions CRM, ₹5,000 Amazon referral voucher dispatch & GST revenue ledger',
      'Elevated SSO quick-switch across Student, Mentor, Recruiter & Referral hubs',
    ],
  },
};

export const PortalLoginView: React.FC<PortalLoginViewProps> = ({
  initialRole = 'student',
  targetViewAfterLogin,
  lockedReason,
  onAuthenticated,
  onBackHome,
  onToast,
}) => {
  const { user, loginWithDemoCredentials, signOutUser } = useAuth();
  const [selectedRole, setSelectedRole] = useState<AuthRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    setSelectedRole(initialRole);
    setErrorMessage('');
  }, [initialRole]);

  const activeAccount =
    FIXED_DEMO_ACCOUNTS.find((acc) => acc.role === selectedRole) || FIXED_DEMO_ACCOUNTS[0];
  const roleMeta = ROLE_META[selectedRole];

  const handleFillDemo = () => {
    setEmail(activeAccount.email);
    setPassword(activeAccount.password);
    setErrorMessage('');
  };

  const handleCopy = (value: string, fieldKey: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const result = loginWithDemoCredentials(email, password, selectedRole);
    if (!result.ok || !result.user) {
      setErrorMessage(result.error || 'Authentication failed. Please check your credentials.');
      return;
    }

    onToast(
      'success',
      `Signed in as ${result.user.displayName}`,
      `${result.user.roleLabel} session verified (${result.user.badgeCode}).`
    );

    const destination =
      targetViewAfterLogin ||
      FIXED_DEMO_ACCOUNTS.find((acc) => acc.role === result.user!.role)?.defaultView ||
      'student';
    onAuthenticated(destination);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative z-10">
      {lockedReason && (
        <div className="bg-amber-50 border border-amber-300 text-amber-950 rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{lockedReason}</span>
          </div>
          {user && (
            <button
              type="button"
              onClick={() => {
                signOutUser();
                onToast('info', 'Signed Out', 'You can now authenticate with another portal account.');
              }}
              className="text-xs font-bold text-[#1E428E] underline cursor-pointer"
            >
              Sign out current role ({user.roleLabel})
            </button>
          )}
        </div>
      )}

      {/* Role Switcher Strip */}
      <div className="frame-border-blue rounded-3xl p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#2B59B5]">
              Hridayam Unified Authentication
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
              Select Portal &amp; Sign In with Fixed Demo Account
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {FIXED_DEMO_ACCOUNTS.map((acc) => {
              const active = selectedRole === acc.role;
              return (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(acc.role);
                    setEmail('');
                    setPassword('');
                    setErrorMessage('');
                  }}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#132C63] text-white shadow-md'
                      : 'bg-white text-[#132C63] border border-[#BFD6F6] hover:border-[#1E428E]'
                  }`}
                >
                  {ROLE_META[acc.role].icon}
                  <span>{acc.roleLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Split Auth Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Blue Frame Role Brief + Fixed Credentials Box */}
        <div className="lg:col-span-5 frame-waves-dark rounded-3xl p-7 sm:p-8 text-white flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="bg-white px-3 py-1.5 rounded-xl inline-flex items-center">
                <img src="/logo.png" alt="Hridayam by Belvo" className="h-7 w-auto object-contain" />
              </div>
              <span className="text-xs font-bold tracking-wider uppercase text-[#BFD6F6]">
                {activeAccount.badgeCode}
              </span>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#94BCF1]">
                {activeAccount.roleLabel} Portal
              </p>
              <h2 className="text-2xl font-extrabold text-white mt-1 leading-tight">
                {roleMeta.portalTitle}
              </h2>
              <p className="text-sm text-[#D3E5FD] mt-2 leading-relaxed">
                {activeAccount.description}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/25 h-40">
              <img
                src={
                  selectedRole === 'student'
                    ? PROVIDED_IMAGES.indianStudentLaptop
                    : selectedRole === 'mentor'
                      ? PROVIDED_IMAGES.indianLibraryGroup
                      : selectedRole === 'recruiter'
                        ? PROVIDED_IMAGES.indianClassroomTeam
                        : PROVIDED_IMAGES.indianCampusSteps
                }
                alt={`${activeAccount.roleLabel} at Hridayam by Belvo`}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <ul className="space-y-2.5 text-xs text-[#E8F1FD]">
              {roleMeta.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#94BCF1] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs text-[#BFD6F6]">
            <span>Session-Verified Role Guard</span>
            <button
              type="button"
              onClick={onBackHome}
              className="text-white font-bold hover:underline cursor-pointer"
            >
              Return to Home
            </button>
          </div>
        </div>

        {/* Right: Strict Credential Login Form + Fixed Demo Credentials Reference */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-7 sm:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0B1B3D]">
                Sign in to {activeAccount.roleLabel}
              </h2>
              <p className="text-sm text-slate-700 mt-1">
                Enter the authorized fixed demo email and password below to enter your left-sidebar workspace.
              </p>
            </div>

            {/* Fixed Credentials Card */}
            <div className="rounded-2xl pastel-lavender-card p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#1E428E]">
                    Fixed Demo Credentials · {activeAccount.roleLabel}
                  </p>
                  <p className="text-xs text-slate-600">
                    Persona: <strong className="text-[#0B1B3D]">{activeAccount.displayName}</strong> ({activeAccount.campus})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="px-3.5 py-2 rounded-xl bg-[#1E428E] hover:bg-[#132C63] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Fill Credentials
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white rounded-xl border border-[#D3E5FD] px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Email ID</span>
                    <span className="font-mono-tabular font-bold text-[#0B1B3D] truncate block">
                      {activeAccount.email}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeAccount.email, 'email')}
                    className="p-1.5 text-[#2B59B5] hover:bg-[#EFF5FF] rounded-lg cursor-pointer"
                    title="Copy demo email"
                  >
                    {copiedField === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-[#D3E5FD] px-3.5 py-2.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Password</span>
                    <span className="font-mono-tabular font-bold text-[#0B1B3D] truncate block">
                      {activeAccount.password}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeAccount.password, 'password')}
                    className="p-1.5 text-[#2B59B5] hover:bg-[#EFF5FF] rounded-lg cursor-pointer"
                    title="Copy demo password"
                  >
                    {copiedField === 'password' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs font-semibold text-red-800"
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0B1B3D] mb-1.5">
                  Registered Demo Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeAccount.email}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1B3D] mb-1.5">
                  Account Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter fixed demo password"
                    className="w-full px-4 py-3 pr-11 rounded-xl glass-input text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#1E428E] cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-blue-primary text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Authenticate &amp; Open {activeAccount.roleLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* All 4 Fixed Accounts Quick Reference Table */}
          <div className="pt-5 border-t border-slate-200">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              All Authorized Fixed Portal Logins
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {FIXED_DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => {
                    setSelectedRole(acc.role);
                    setEmail(acc.email);
                    setPassword(acc.password);
                    setErrorMessage('');
                  }}
                  className={`text-left px-3 py-2 rounded-xl border transition-colors cursor-pointer ${
                    selectedRole === acc.role
                      ? 'bg-[#EFF5FF] border-[#1E428E]'
                      : 'bg-slate-50 border-slate-200 hover:border-[#3869C3]'
                  }`}
                >
                  <div className="font-bold text-[#0B1B3D]">{acc.roleLabel}</div>
                  <div className="font-mono-tabular text-[11px] text-slate-600">
                    {acc.email} · {acc.password}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
