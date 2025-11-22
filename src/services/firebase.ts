import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
};

// Iniciar Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Iniciar firestore
export const db = getFirestore(app);

// Firestore Coleções
export const COLLECTIONS = {
  User: 'users',
  USER_PROFILES: 'usuarios',
  RECOMMENDED_CONTENT: 'conteudos_recomendados',
  LEARNING_PATHS: 'trilhas',
  USER_PROGRESS: 'usuario_progresso',
  ACHIEVEMENTS: 'conquistas',
  NEWS: 'ultimas_noticias',
  USER_BOOKMARKS: 'usuario_bookmarks',
} as const;

// Tipos
export interface User {
  uid: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  level: number;
  xp: number;
  interests: string[];
  goals: string[];
  currentStreak: number;
  longestStreak: number;
  lastActiveAt: string;
}

export interface CuratedContent {
  id: string;
  title: string;
  url: string;
  type: string;
  duration: number;
  temperature: number;
  category: string;
  summary: string;
}

export interface LearningPath {
  id: string;
  completed: boolean;
  title: string;
  goal: string;
  description: string;
  moduleCount: number;
  totalHours: number;
  difficulty: string;
  steps: LearningPathModule[];
}


export interface LearningPathModule {
  id: string;
  completed: boolean;
  goal: string;
  description: string;
  contentCount: number;
  totalHours: number;
  difficulty: string;
  modules: PathContent[];
}


export interface PathContent {
  id: string;
  order: number;
  title: string;
  url: string;
  duration: string;
  summary: string;
  completed: boolean;
}

export interface UserProgress {
  id: string;
  userId: string;
  contentId: string;
  progressPercentage: number;
  completed: boolean;
  lastAccessedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  points: number;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  link: string;
  summary: string;
  interest: string;
  category: string;
  readTime: string;
  publishedAt: string;
  trending: boolean;
  author: string;
}

export interface UserBookmark {
  id: string;
  userId: string;
  articleId: string;
  createdAt: string;
}