import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthRole, DemoAccount, Subscription } from '../types';

export interface AuthenticatedUser {
  uid: string;
  email: string;
  displayName: string;
  role: AuthRole;
  roleLabel: string;
  title: string;
  campus: string;
  badgeCode: string;
  photoURL?: string;
}

export const FIXED_DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'demo_student_01',
    role: 'student',
    roleLabel: 'Student LMS',
    email: 'student@hridayam.in',
    password: 'Student@2026',
    displayName: 'Aarav Deshmukh',
    title: 'Master in Data Science & AI · Batch 2026',
    campus: 'Pune FC Road Campus',
    badgeCode: 'HRD-STU-2026-4108',
    description: 'Access live classes, recorded modules, capstone labs, quizzes, certificates, and referral rewards.',
    defaultView: 'student',
  },
  {
    id: 'demo_mentor_01',
    role: 'mentor',
    roleLabel: 'Faculty & Mentor',
    email: 'mentor@hridayam.in',
    password: 'Mentor@2026',
    displayName: 'Prof. Kavita Nair',
    title: 'Principal Mentor · AI & Full Stack Engineering',
    campus: 'Bengaluru Koramangala Hub',
    badgeCode: 'HRD-FAC-2026-109',
    description: 'Review Indian cohort capstones, grade mock interviews, track attendance, and host doubt clinics.',
    defaultView: 'mentor-portal',
  },
  {
    id: 'demo_recruiter_01',
    role: 'recruiter',
    roleLabel: 'Hiring Partner',
    email: 'recruiter@hridayam.in',
    password: 'Hire@2026',
    displayName: 'Rohan Kulkarni',
    title: 'Campus Talent Partner · Indian IT & Product Hiring',
    campus: 'Mumbai & Pan-India Hiring Desk',
    badgeCode: 'HRD-REC-2026-774',
    description: 'Shortlist pre-vetted Indian graduates, inspect project portfolios, and schedule zero-cost campus drives.',
    defaultView: 'recruiter-portal',
  },
  {
    id: 'demo_admin_01',
    role: 'admin',
    roleLabel: 'Institute Admin',
    email: 'admin@hridayam.in',
    password: 'Admin@2026',
    displayName: 'Siddharth Menon',
    title: 'Director of Academics & Admissions',
    campus: 'Thane West Head Office',
    badgeCode: 'HRD-ADM-2026-001',
    description: 'Full administrative control over curriculum publishing, admissions leads, referrals, and all portals.',
    defaultView: 'instructor',
  },
];

const SESSION_STORAGE_KEY = 'hridayam_demo_auth_session_v2';

interface LoginResult {
  ok: boolean;
  user?: AuthenticatedUser;
  error?: string;
}

interface AuthContextValue {
  user: AuthenticatedUser | null;
  loading: boolean;
  isAdmin: boolean;
  subscription: Subscription | null;
  activeSubscription: Subscription | null;
  loginWithDemoCredentials: (
    email: string,
    password: string,
    expectedRole?: AuthRole
  ) => LoginResult;
  hasAccessToRole: (requiredRole: AuthRole) => boolean;
  signOutUser: () => void;
  setActiveSubscription: (sub: Subscription | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSubscription, setActiveSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AuthenticatedUser;
        const matched = FIXED_DEMO_ACCOUNTS.find(
          (acc) => acc.email.toLowerCase() === parsed.email?.toLowerCase() && acc.role === parsed.role
        );
        if (matched) {
          setUser({
            uid: matched.id,
            email: matched.email,
            displayName: matched.displayName,
            role: matched.role,
            roleLabel: matched.roleLabel,
            title: matched.title,
            campus: matched.campus,
            badgeCode: matched.badgeCode,
          });
        } else {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithDemoCredentials = (
    email: string,
    password: string,
    expectedRole?: AuthRole
  ): LoginResult => {
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!normalizedEmail || !trimmedPassword) {
      return { ok: false, error: 'Please enter both your registered demo email and password.' };
    }

    const account = FIXED_DEMO_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === normalizedEmail
    );

    if (!account) {
      return {
        ok: false,
        error: 'Account not found. Only authorized Hridayam fixed demo credentials are permitted.',
      };
    }

    if (account.password !== trimmedPassword) {
      return {
        ok: false,
        error: 'Incorrect password for this account. Check the fixed demo credentials shown below.',
      };
    }

    // Admin can sign into any portal; other roles must match expectedRole if specified
    if (expectedRole && account.role !== expectedRole && account.role !== 'admin') {
      const needed = FIXED_DEMO_ACCOUNTS.find((a) => a.role === expectedRole);
      return {
        ok: false,
        error: `This portal requires ${needed?.roleLabel || expectedRole} credentials (${needed?.email}) or Institute Admin access.`,
      };
    }

    const authenticated: AuthenticatedUser = {
      uid: account.id,
      email: account.email,
      displayName: account.displayName,
      role: account.role,
      roleLabel: account.roleLabel,
      title: account.title,
      campus: account.campus,
      badgeCode: account.badgeCode,
    };

    setUser(authenticated);
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authenticated));
    } catch {}

    return { ok: true, user: authenticated };
  };

  const hasAccessToRole = (requiredRole: AuthRole): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.role === requiredRole;
  };

  const signOutUser = () => {
    setUser(null);
    setActiveSubscription(null);
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {}
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        subscription: activeSubscription,
        activeSubscription,
        loginWithDemoCredentials,
        hasAccessToRole,
        signOutUser,
        setActiveSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
