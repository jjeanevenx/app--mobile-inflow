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
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, COLLECTIONS, db } from './firebase';
import { UserProfile } from '@/src/models/User';

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
 * Apenas cria o usuário no Firebase Auth.
 * A cloud function newUserTrigger criará o documento básico na tabela usuarios.
 */
export async function signUp({ email, password, name }: SignUpData) {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name no Auth
    await updateProfile(user, { displayName: name });

    // A cloud function newUserTrigger vai criar o documento básico em usuarios
    // com {uid, email, name} automaticamente quando o usuário for criado

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
    
    // Update last active (se o perfil existir)
    try {
      const docId = await findUserProfileDocId(userCredential.user.uid);
      if (docId) {
        const profileDoc = doc(db, COLLECTIONS.USER_PROFILES, docId);
        await updateDoc(profileDoc, {
          lastActiveAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      // Se o perfil não existir, a cloud function pode criar depois
    } catch (profileError) {
      // Ignora erro se o perfil não existir ainda
      console.warn('Could not update lastActiveAt:', profileError);
    }
    
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
    } else if (error.code === 'auth/network-request-failed') {
      message = 'Erro de conexão. Verifique sua internet.';
    } else if (error.code === 'auth/invalid-api-key') {
      message = 'Configuração do Firebase inválida. Verifique as credenciais.';
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
 * Helper function to find user profile document ID by uid field
 * A cloud function cria o documento com ID aleatório, então precisamos buscar pelo campo uid
 */
async function findUserProfileDocId(userId: string): Promise<string | null> {
  try {
    console.log('[findUserProfileDocId] Searching for user profile:', userId);
    
    // Tentar primeiro usando o userId como document ID (para compatibilidade)
    const docRef = doc(db, COLLECTIONS.USER_PROFILES, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('[findUserProfileDocId] Found document with userId as ID:', docSnap.id);
      return docSnap.id;
    }

    // Se não encontrou, buscar pelo campo uid usando query
    console.log('[findUserProfileDocId] Document not found with userId as ID, searching by uid field...');
    const q = query(
      collection(db, COLLECTIONS.USER_PROFILES),
      where('uid', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const foundDocId = querySnapshot.docs[0].id;
      console.log('[findUserProfileDocId] Found document by uid field:', foundDocId);
      return foundDocId;
    }
    
    console.warn('[findUserProfileDocId] No document found for user:', userId);
    return null;
  } catch (error: any) {
    console.error('[findUserProfileDocId] Error finding document:', error);
    console.error('[findUserProfileDocId] Error code:', error.code);
    console.error('[findUserProfileDocId] Error message:', error.message);
    throw error;
  }
}

/**
 * Get user profile from Firestore
 * Busca pelo campo uid, pois a cloud function cria o documento com ID aleatório
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    // Tentar primeiro usando o userId como document ID (para compatibilidade)
    const docRef = doc(db, COLLECTIONS.USER_PROFILES, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }

    // Se não encontrou, buscar pelo campo uid usando query
    const q = query(
      collection(db, COLLECTIONS.USER_PROFILES),
      where('uid', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
}

/**
 * Update user profile
 * Encontra o documento pelo campo uid e atualiza
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
) {
  try {
    // Encontrar o document ID real (pode ser aleatório ou o próprio userId)
    const docId = await findUserProfileDocId(userId);
    
    if (!docId) {
      throw new Error('Perfil do usuário não encontrado');
    }

    const docRef = doc(db, COLLECTIONS.USER_PROFILES, docId);
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
 * Update user interests
 * Atualiza apenas os interesses do usuário
 */
export async function updateUserInterests(userId: string, interests: string[]) {
  try {
    console.log('[updateUserInterests] Updating interests for user:', userId);
    console.log('[updateUserInterests] Interests to save:', interests);
    
    const docId = await findUserProfileDocId(userId);
    
    if (!docId) {
      console.error('[updateUserInterests] Document ID not found for user:', userId);
      throw new Error('Perfil do usuário não encontrado');
    }

    console.log('[updateUserInterests] Found document ID:', docId);

    const docRef = doc(db, COLLECTIONS.USER_PROFILES, docId);
    
    // Verificar se o documento existe antes de atualizar
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.error('[updateUserInterests] Document does not exist:', docId);
      throw new Error('Documento do perfil não encontrado no Firestore');
    }
    
    console.log('[updateUserInterests] Document exists, current data:', docSnap.data());
    
    // Sempre atualizar, mesmo se o array estiver vazio
    const updateData: any = {
      interests: interests || [], // Garantir que seja um array
      updatedAt: serverTimestamp(),
    };
    
    console.log('[updateUserInterests] Update data:', updateData);
    
    await updateDoc(docRef, updateData);
    
    // Verificar se a atualização foi bem-sucedida
    const verifySnap = await getDoc(docRef);
    if (verifySnap.exists()) {
      const updatedData = verifySnap.data();
      console.log('[updateUserInterests] Verification - Document after update:', updatedData);
      console.log('[updateUserInterests] Verification - Interests field:', updatedData.interests);
    }
    
    console.log('[updateUserInterests] Successfully updated interests');

    const updatedProfile = await getUserProfile(userId);
    console.log('[updateUserInterests] Updated profile interests:', updatedProfile?.interests);
    
    return updatedProfile;
  } catch (error: any) {
    console.error('[updateUserInterests] Error updating interests:', error);
    console.error('[updateUserInterests] Error code:', error.code);
    console.error('[updateUserInterests] Error message:', error.message);
    throw error;
  }
}

/**
 * Update user goals
 * Atualiza apenas as metas do usuário
 */
export async function updateUserGoals(userId: string, goals: string[]) {
  try {
    console.log('[updateUserGoals] Updating goals for user:', userId);
    console.log('[updateUserGoals] Goals to save:', goals);
    
    const docId = await findUserProfileDocId(userId);
    
    if (!docId) {
      console.error('[updateUserGoals] Document ID not found for user:', userId);
      throw new Error('Perfil do usuário não encontrado');
    }

    console.log('[updateUserGoals] Found document ID:', docId);

    const docRef = doc(db, COLLECTIONS.USER_PROFILES, docId);
    
    // Verificar se o documento existe antes de atualizar
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.error('[updateUserGoals] Document does not exist:', docId);
      throw new Error('Documento do perfil não encontrado no Firestore');
    }
    
    console.log('[updateUserGoals] Document exists, current data:', docSnap.data());
    
    // Sempre atualizar, mesmo se o array estiver vazio
    const updateData: any = {
      goals: goals || [], // Garantir que seja um array
      updatedAt: serverTimestamp(),
    };
    
    console.log('[updateUserGoals] Update data:', updateData);
    
    await updateDoc(docRef, updateData);
    
    // Verificar se a atualização foi bem-sucedida
    const verifySnap = await getDoc(docRef);
    if (verifySnap.exists()) {
      const updatedData = verifySnap.data();
      console.log('[updateUserGoals] Verification - Document after update:', updatedData);
      console.log('[updateUserGoals] Verification - Goals field:', updatedData.goals);
    }
    
    console.log('[updateUserGoals] Successfully updated goals');

    const updatedProfile = await getUserProfile(userId);
    console.log('[updateUserGoals] Updated profile goals:', updatedProfile?.goals);
    
    return updatedProfile;
  } catch (error: any) {
    console.error('[updateUserGoals] Error updating goals:', error);
    console.error('[updateUserGoals] Error code:', error.code);
    console.error('[updateUserGoals] Error message:', error.message);
    throw error;
  }
}

/**
 * Update user profile with onboarding data
 * Atualiza o perfil do usuário com todas as informações do onboarding
 */
export interface OnboardingData {
  name?: string;
  profession?: string;
  experienceLevel?: string;
  interests: string[];
  goals: string[];
}

export async function updateUserProfileWithOnboarding(
  userId: string,
  onboardingData: OnboardingData
) {
  try {
    // Buscar o perfil existente (criado pela cloud function)
    const currentProfile = await getUserProfile(userId);
    
    if (!currentProfile) {
      throw new Error('Perfil do usuário não encontrado. Certifique-se de que a cloud function criou o documento básico.');
    }

    // Encontrar o document ID real (a cloud function cria com ID aleatório)
    const docId = await findUserProfileDocId(userId);
    
    if (!docId) {
      throw new Error('Document ID do perfil não encontrado');
    }

    const docRef = doc(db, COLLECTIONS.USER_PROFILES, docId);
    
    // Preparar dados para atualização
    const updates: any = {
      updatedAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
    };

    // Adicionar campos do onboarding se fornecidos
    if (onboardingData.name) {
      updates.name = onboardingData.name;
      // Atualizar também o displayName no Auth
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: onboardingData.name,
        });
      }
    }
    
    if (onboardingData.profession) {
      updates.profession = onboardingData.profession;
    }
    
    if (onboardingData.experienceLevel) {
      updates.experienceLevel = onboardingData.experienceLevel;
    }
    
    if (onboardingData.interests && onboardingData.interests.length > 0) {
      updates.interests = onboardingData.interests; // Corrigido: era 'interesses', agora é 'interests'
    }
    
    if (onboardingData.goals && onboardingData.goals.length > 0) {
      updates.goals = onboardingData.goals; // Corrigido: era 'metas', agora é 'goals'
    }

    // Inicializar campos padrão se não existirem no documento
    if (!currentProfile.level) {
      updates.level = 1;
    }
    if (currentProfile.xp === undefined || currentProfile.xp === null) {
      updates.xp = 0;
    }
    if (!currentProfile.currentStreak && currentProfile.currentStreak !== 0) {
      updates.currentStreak = 0;
    }
    if (!currentProfile.longestStreak && currentProfile.longestStreak !== 0) {
      updates.longestStreak = 0;
    }

    // Atualizar o documento existente (criado pela cloud function)
    await updateDoc(docRef, updates);

    // Retornar perfil atualizado
    return await getUserProfile(userId);
  } catch (error) {
    console.error('Update user profile with onboarding error:', error);
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

    const docId = await findUserProfileDocId(userId);
    if (!docId) throw new Error('Document ID do perfil não encontrado');

    const newXP = profile.xp + xpGained;
    const newLevel = calculateLevel(newXP);

    await updateDoc(doc(db, COLLECTIONS.USER_PROFILES, docId), {
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

    const docId = await findUserProfileDocId(userId);
    if (!docId) throw new Error('Document ID do perfil não encontrado');

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

    await updateDoc(doc(db, COLLECTIONS.USER_PROFILES, docId), {
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
