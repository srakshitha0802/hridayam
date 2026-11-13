import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/initialData';

interface AuthContextType {
  currentUser: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  login: (email: string) => boolean;
  register: (name: string, email: string) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = 'hridayam_auth_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    // Default to the student user so learning dashboard and progress are immediately testable
    return INITIAL_USERS[0];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [currentUser]);

  const role: UserRole = currentUser ? currentUser.role : 'guest';
  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';
  const isStudent = currentUser?.role === 'student';

  const login = (email: string): boolean => {
    const normalized = email.trim().toLowerCase();
    if (normalized.includes('admin') || normalized === 'admin@belvo.com') {
      setCurrentUser(INITIAL_USERS[1]);
      return true;
    }
    const student = INITIAL_USERS.find((u) => u.email.toLowerCase() === normalized) || {
      id: `user-${Date.now()}`,
      name: normalized.split('@')[0],
      email: normalized,
      role: 'student' as UserRole,
      enrolledCourseIds: [],
      createdAt: new Date().toISOString()
    };
    setCurrentUser(student);
    return true;
  };

  const register = (name: string, email: string): boolean => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      role: 'student',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      enrolledCourseIds: [],
      createdAt: new Date().toISOString()
    };
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'guest') {
      setCurrentUser(null);
    } else if (newRole === 'student') {
      setCurrentUser(INITIAL_USERS[0]);
    } else if (newRole === 'admin') {
      setCurrentUser(INITIAL_USERS[1]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAuthenticated,
        isAdmin,
        isStudent,
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
