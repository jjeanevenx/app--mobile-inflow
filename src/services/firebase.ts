import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
};

// Verificar se as configurações do Firebase estão presentes
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.warn('Firebase configuration is missing. Please check your environment variables.');
  console.warn('Required: FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID');
}

// Iniciar Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error: any) {
  console.error('Firebase initialization error:', error);
  // Tentar com configuração mínima para não quebrar o app
  try {
    app = initializeApp({
      apiKey: 'demo-api-key',
      authDomain: 'demo-project.firebaseapp.com',
      projectId: 'demo-project',
    });
    console.warn('Using fallback Firebase configuration');
  } catch (fallbackError) {
    console.error('Failed to initialize Firebase even with fallback config:', fallbackError);
    throw fallbackError;
  }
}

export { app };

const DATABASE = 'db-content-curation';

// Iniciar Auth com persistência AsyncStorage
let auth: Auth;
try {
  // getReactNativePersistence existe no runtime do Firebase v12 para React Native
  // mas pode não estar nos tipos do TypeScript. Comentado por enquanto.
  const firebaseAuth = require('firebase/auth') as typeof import('firebase/auth') & {
    getReactNativePersistence: (storage: typeof ReactNativeAsyncStorage) => any;
  };
  const getReactNativePersistence = firebaseAuth.getReactNativePersistence;
  
  auth = initializeAuth(app, {
     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  console.log('Firebase Auth initialized with AsyncStorage persistence');
} catch (error: any) {
  console.warn('Firebase Auth initialization error:', error);
  // Se já foi inicializado, usa getAuth
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
    console.log('Firebase Auth already initialized, using getAuth');
  } else {
    // Fallback: usa getAuth que no React Native já tem persistência por padrão
    auth = getAuth(app);
    console.log('Using fallback Firebase Auth (getAuth)');
  }
}
export { auth };

// Iniciar firestore
export const db = getFirestore(app, DATABASE);

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

