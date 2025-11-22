import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updatePassword as firebaseUpdatePassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, COLLECTIONS, db, UserProfile } from './firebase';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  interests?: string[];
}

export interface SignInData {
  email: string;
  password: string;
}

/**
 * Sign up a new user
 */
export async function signUp({ email, password, name, interests = [] }: SignUpData) {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: name });

    // Create user profile in Firestore
    const userProfile: Omit<UserProfile, 'uid'> = {
      email,
      name,
      level: 1,
      xp: 0,
      interests,
      goals: [],
      currentStreak: 0,
      longestStreak: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    await setDoc(doc(db, COLLECTIONS.USER_PROFILES, user.uid), {
      ...userProfile,
      uid: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
    });

    return { user };
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw new Error(error.message || 'Falha ao criar conta');
  }
}

/**
 * Sign in an existing user
 */
export async function signIn({ email, password }: SignInData) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last active
    await updateDoc(doc(db, COLLECTIONS.USER_PROFILES, userCredential.user.uid), {
      lastActiveAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { user: userCredential.user };
  } catch (error: any) {
    console.error('Sign in error:', error);
    
    // Translate Firebase errors to Portuguese
    let message = 'Falha no login';
    if (error.code === 'auth/user-not-found') {
      message = 'Usuário não encontrado';
    } else if (error.code === 'auth/wrong-password') {
      message = 'Senha incorreta';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Email inválido';
    } else if (error.code === 'auth/user-disabled') {
      message = 'Conta desabilitada';
    }
    
    throw new Error(message);
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error('Falha ao sair');
  }
}

/**
 * Get the current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, COLLECTIONS.USER_PROFILES, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
) {
  try {
    const docRef = doc(db, COLLECTIONS.USER_PROFILES, userId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    // If name changed, update auth profile
    if (updates.name && auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: updates.name,
      });
    }

    // Return updated profile
    return await getUserProfile(userId);
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
}

/**
 * Reset password
 */
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Reset password error:', error);
    
    let message = 'Falha ao enviar email de recuperação';
    if (error.code === 'auth/user-not-found') {
      message = 'Usuário não encontrado';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Email inválido';
    }
    
    throw new Error(message);
  }
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  try {
    if (!auth.currentUser) {
      throw new Error('Usuário não autenticado');
    }
    await firebaseUpdatePassword(auth.currentUser, newPassword);
  } catch (error: any) {
    console.error('Update password error:', error);
    
    let message = 'Falha ao atualizar senha';
    if (error.code === 'auth/weak-password') {
      message = 'Senha muito fraca';
    } else if (error.code === 'auth/requires-recent-login') {
      message = 'Por favor, faça login novamente';
    }
    
    throw new Error(message);
  }
}

/**
 * Update XP and level
 */
export async function updateUserXP(userId: string, xpGained: number) {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) throw new Error('Perfil não encontrado');

    const newXP = profile.xp + xpGained;
    const newLevel = calculateLevel(newXP);

    await updateDoc(doc(db, COLLECTIONS.USER_PROFILES, userId), {
      xp: newXP,
      level: newLevel,
      updatedAt: serverTimestamp(),
    });

    return { xp: newXP, level: newLevel };
  } catch (error) {
    console.error('Update XP error:', error);
    throw error;
  }
}

/**
 * Calculate level from XP
 */
function calculateLevel(xp: number): number {
  // Formula: level = floor(xp / 1000) + 1
  // Every 1000 XP = 1 level
  return Math.floor(xp / 1000) + 1;
}

/**
 * Update user streak
 */
export async function updateUserStreak(userId: string) {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) throw new Error('Perfil não encontrado');

    const lastActive = new Date(profile.lastActiveAt);
    const now = new Date();
    const daysDiff = Math.floor(
      (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
    );

    let newStreak = profile.currentStreak;
    
    if (daysDiff === 1) {
      // Consecutive day
      newStreak += 1;
    } else if (daysDiff > 1) {
      // Streak broken
      newStreak = 1;
    }
    // If daysDiff === 0, same day, keep current streak

    const longestStreak = Math.max(profile.longestStreak, newStreak);

    await updateDoc(doc(db, COLLECTIONS.USER_PROFILES, userId), {
      currentStreak: newStreak,
      longestStreak,
      lastActiveAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { currentStreak: newStreak, longestStreak };
  } catch (error) {
    console.error('Update streak error:', error);
    throw error;
  }
}
