import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart3 } from 'lucide-react-native';
import { tokens } from '@/src/constants/tokens';

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <BarChart3 size={64} color={tokens.colors.primary} />
      <Text style={styles.title}>Estatísticas</Text>
      <Text style={styles.subtitle}>Em breve: gráficos e análises detalhadas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: tokens.fontSize['2xl'],
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.foreground,
    marginTop: tokens.spacing.md,
    marginBottom: tokens.spacing.sm,
  },
  subtitle: {
    fontSize: tokens.fontSize.base,
    color: tokens.colors.mutedForeground,
    textAlign: 'center',
  },
});
