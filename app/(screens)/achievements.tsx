import { colors } from '@/src/constants/colors';
import { Award } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AchievementsScreen() {
  return (
    <View style={styles.container}>
      <Award size={64} color={colors.primary} />
      <Text style={styles.title}>Conquistas</Text>
      <Text style={styles.subtitle}>Em breve: suas conquistas e troféus</Text>
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
