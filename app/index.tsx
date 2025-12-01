import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../src/hooks/useAuth';

export default function Index() {
  const { user, loading } = useAuth();
  
  // Usar apenas userId para evitar re-renders causados por mudanças de referência do objeto user
  const userId = user?.uid ?? null;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
        {__DEV__ && (
          <Text style={styles.debugText}>Carregando autenticação...</Text>
        )}
      </View>
    ); 
  }

  if (userId) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  debugText: {
    marginTop: 16,
    fontSize: 14,
    color: '#717182',
  },
});
