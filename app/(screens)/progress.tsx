import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart3 } from 'lucide-react-native';
import { colors } from '@/src/constants/colors';

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <BarChart3 size={64} color={colors.primary} />
      <Text style={styles.title}>Estatísticas</Text>
      <Text style={styles.subtitle}>Em breve: gráficos e análises detalhadas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
