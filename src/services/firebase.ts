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

// Iniciar Firebase
export const app = initializeApp(firebaseConfig);

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
} catch (error: any) {
  // Se já foi inicializado, usa getAuth
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    // Fallback: usa getAuth que no React Native já tem persistência por padrão
    auth = getAuth(app);
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

