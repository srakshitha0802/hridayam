import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';
import { Subscription } from '../types';

const BOOTSTRAP_ADMIN_EMAIL = 'srakshitha912@gmail.com';

interface AuthContextValue {
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  subscription: Subscription | null;
  signInWithGoogle: () => Promise<User | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    let unsubSub: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (unsubSub) {
        unsubSub();
        unsubSub = null;
      }

      if (!currentUser) {
        setIsAdmin(false);
        setSubscription(null);
        setAuthReady(true);
        return;
      }

      // Check admin privilege safely
      let adminFlag =
        Boolean(currentUser.emailVerified) &&
        currentUser.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL;

      if (!adminFlag) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
          if (adminDoc.exists()) adminFlag = true;
        } catch {
          // Non-admin read denial expected if not in admins collection
        }
      }
      setIsAdmin(adminFlag);

      // Sync split public & private user profiles if verified
      if (currentUser.emailVerified) {
        try {
          const publicRef = doc(db, 'users', currentUser.uid);
          const publicSnap = await getDoc(publicRef);
          if (!publicSnap.exists()) {
            await setDoc(publicRef, {
              uid: currentUser.uid,
              displayName: (currentUser.displayName || 'Belvo Learner').slice(0, 100),
              headline: 'Hridayam by Belvo Member',
              photoURL: (currentUser.photoURL || '').slice(0, 500),
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }

          const privateRef = doc(db, `users/${currentUser.uid}/private`, 'info');
          const privateSnap = await getDoc(privateRef);
          if (!privateSnap.exists() && currentUser.email) {
            await setDoc(privateRef, {
              uid: currentUser.uid,
              email: currentUser.email.slice(0, 200),
              phone: '',
              organization: '',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }
        } catch (error) {
          console.warn('Profile sync notice:', error);
        }
      }

      // Subscribe to user's active membership subscription
      const subRef = doc(db, 'subscriptions', `sub_${currentUser.uid}`);
      unsubSub = onSnapshot(
        subRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data() as Omit<Subscription, 'id'>;
            setSubscription(data.status === 'active' ? { id: snap.id, ...data } : null);
          } else {
            setSubscription(null);
          }
        },
        (error) => {
          if (!error.message.includes('Missing or insufficient permissions')) {
            handleFirestoreError(error, OperationType.GET, `subscriptions/sub_${currentUser.uid}`);
          }
        }
      );

      setAuthReady(true);
    });

    return () => {
      unsubAuth();
      if (unsubSub) unsubSub();
    };
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  };

  const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        isAdmin,
        subscription,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
