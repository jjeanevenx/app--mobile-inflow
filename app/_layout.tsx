import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '../src/components/ErrorBoundary';
import { AuthProvider } from '../src/hooks/useAuth';

// Manter o splash screen visível enquanto busca recursos
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Esconder splash screen quando pronto
    SplashScreen.hideAsync();
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
