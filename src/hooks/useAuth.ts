import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { UserProfile } from '@/src/models/User';
import { auth } from '@/src/services/firebase';
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
  
  // Refs para rastrear o último userId e profileId e evitar atualizações desnecessárias
  const lastUserIdRef = useRef<string | null>(null);
  const userRef = useRef<User | null>(null);
  const lastProfileIdRef = useRef<string | null>(null);
  const profileRef = useRef<UserProfile | null>(null);
  
  // Usar ref para garantir que setProfile e setLoading sejam sempre os mais recentes
  const stateRef = useRef({ setProfile, setLoading });
  stateRef.current = { setProfile, setLoading };
  
  // Usar ref para loadProfile para evitar recriação do useEffect
  const loadProfileRef = useRef(async (userId: string) => {
    try {
      const profileData = await getUserProfile(userId);
      stateRef.current.setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      stateRef.current.setLoading(false);
    }
  });

  useEffect(() => {
    let isMounted = true;
    let hasInitialized = false;
    
    console.log('[useAuth] Setting up auth state listener...');
    
    // Timeout de segurança: se após 5 segundos ainda não tiver inicializado, definir loading como false
    const timeoutId = setTimeout(() => {
      if (!hasInitialized && isMounted) {
        console.warn('[useAuth] Auth initialization timeout (5s) - setting loading to false');
        stateRef.current.setLoading(false);
        hasInitialized = true;
      }
    }, 5000);
    
    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          console.log('[useAuth] onAuthStateChanged callback triggered', {
            hasUser: !!firebaseUser,
            userId: firebaseUser?.uid,
            isMounted,
            hasInitialized,
          });
          
          if (!isMounted) {
            console.log('[useAuth] Component unmounted, ignoring callback');
            return;
          }
          
          const currentUserId = firebaseUser?.uid ?? null;
          const previousUserId = lastUserIdRef.current;
          
          // Verificar se é a primeira inicialização ANTES de marcar como inicializado
          const isFirstInit = !hasInitialized;
          
          // Marcar como inicializado na primeira chamada
          if (!hasInitialized) {
            console.log('[useAuth] First initialization, clearing timeout');
            hasInitialized = true;
            clearTimeout(timeoutId);
          }
          
          // Na primeira inicialização, sempre processar mesmo se userId não mudou
          // (porque ambos serão null na primeira vez sem usuário: null !== null é false)
          const shouldProcess = isFirstInit || (currentUserId !== previousUserId);
          
          if (shouldProcess) {
            console.log('[useAuth] Processing auth state:', {
              previous: previousUserId,
              current: currentUserId,
              isFirstInit,
            });
            lastUserIdRef.current = currentUserId;
            userRef.current = firebaseUser;
            
            if (isMounted) {
              setUser(firebaseUser);
            }

            if (firebaseUser) {
              console.log('[useAuth] User authenticated, loading profile...');
              try {
                await loadProfileRef.current(firebaseUser.uid);
                console.log('[useAuth] Profile loaded successfully');
              } catch (error) {
                console.error('[useAuth] Error loading profile in onAuthStateChanged:', error);
                if (isMounted) {
                  stateRef.current.setLoading(false);
                }
              }
            } else {
              console.log('[useAuth] No user authenticated, setting loading to false');
              if (isMounted) {
                stateRef.current.setProfile(null);
                stateRef.current.setLoading(false);
              }
            }
          } else if (firebaseUser && userRef.current !== firebaseUser) {
            // Se o userId não mudou mas a referência do objeto mudou, atualizar apenas a ref
            // sem causar re-renders
            console.log('[useAuth] User object reference changed, updating ref only');
            userRef.current = firebaseUser;
          } else {
            console.log('[useAuth] No changes detected, skipping update');
          }
        },
        (error) => {
          console.error('[useAuth] Error in onAuthStateChanged:', error);
          if (isMounted && !hasInitialized) {
            hasInitialized = true;
            clearTimeout(timeoutId);
            stateRef.current.setLoading(false);
          }
        }
      );

      console.log('[useAuth] Auth state listener registered successfully');
      
      return () => {
        console.log('[useAuth] Cleaning up auth state listener');
        isMounted = false;
        clearTimeout(timeoutId);
        unsubscribe();
      };
    } catch (error) {
      console.error('[useAuth] Error setting up auth state listener:', error);
      if (isMounted) {
        stateRef.current.setLoading(false);
      }
      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
      };
    }
  }, []);

  const signIn = useCallback(async (data: SignInData) => {
    try {
      setLoading(true);
      await authSignIn(data);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, []);

  const signUp = useCallback(async (data: SignUpData) => {
    try {
      setLoading(true);
      await authSignUp(data);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      await authSignOut();
      // Atualizar refs e estado
      lastUserIdRef.current = null;
      userRef.current = null;
      lastProfileIdRef.current = null;
      profileRef.current = null;
      setUser(null);
      setProfile(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoizar user?.uid e profile?.uid para evitar mudanças desnecessárias
  const userId = user?.uid ?? null;
  const profileId = profile?.uid ?? null;
  
  // Atualizar profileRef quando profileId mudar
  if (profileId !== lastProfileIdRef.current) {
    lastProfileIdRef.current = profileId;
    profileRef.current = profile;
  } else if (profile !== profileRef.current) {
    // Se profileId não mudou mas a referência do objeto mudou, atualizar a ref
    profileRef.current = profile;
  }
  
  // Refs para estabilizar o contextValue
  const contextValueRef = useRef<AuthContextType | null>(null);
  const lastContextValuesRef = useRef({
    userId: null as string | null,
    profileId: null as string | null,
    loading: true,
  });

  const refreshProfile = useCallback(async () => {
    const currentUserId = lastUserIdRef.current;
    if (currentUserId) {
      await loadProfileRef.current(currentUserId);
    }
  }, []);

  // Criar contextValue apenas quando valores primitivos realmente mudarem
  const contextValue = useMemo(() => {
    const currentValues = {
      userId,
      profileId,
      loading,
    };

    // Comparar valores primitivos
    const hasChanged = 
      currentValues.userId !== lastContextValuesRef.current.userId ||
      currentValues.profileId !== lastContextValuesRef.current.profileId ||
      currentValues.loading !== lastContextValuesRef.current.loading;

    // Só recriar se valores realmente mudaram
    if (hasChanged || !contextValueRef.current) {
      lastContextValuesRef.current = currentValues;
      contextValueRef.current = {
        user: userRef.current, // Sempre usar userRef que é atualizado apenas quando userId muda
        profile: profileRef.current, // Sempre usar profileRef que é atualizado apenas quando profileId muda
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      };
    }

    return contextValueRef.current;
  }, [userId, profileId, loading, signIn, signUp, signOut, refreshProfile]);

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