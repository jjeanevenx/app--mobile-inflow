import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { auth, UserProfile } from '@/src/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

import {
  signIn as authSignIn,
  signOut as authSignOut,
  signUp as authSignUp,
  getUserProfile,
  SignInData,
  SignUpData,
} from '@/src/services/auth';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser?.uid);
      setUser(firebaseUser);

      if (firebaseUser) {
        await loadProfile(firebaseUser.uid);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function loadProfile(userId: string) {
    try {
      const profileData = await getUserProfile(userId);
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(data: SignInData) {
    try {
      setLoading(true);
      await authSignIn(data);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function signUp(data: SignUpData) {
    try {
      setLoading(true);
      await authSignUp(data);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function signOut() {
    try {
      setLoading(true);
      await authSignOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function refreshProfile() {
    if (user) {
      await loadProfile(user.uid);
    }
  }

  const contextValue: AuthContextType = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  const Provider = AuthContext.Provider;

  return React.createElement(
    Provider,
    { value: contextValue },
    props.children
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}