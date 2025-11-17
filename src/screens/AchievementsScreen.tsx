import { Badge, Card, CardContent, Progress } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import { ChevronLeft, Lock } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ACHIEVEMENT_CATEGORIES } from '@/src/dataSources/sys_datas/categories';

interface AchievementsScreenProps {
  navigation: any;
}



const ACHIEVEMENTS = [
  {
    id: '1',
    title: 'Bem-vindo!',
    description: 'Complete seu perfil',
    icon: '👋',
    category: 'Início',
    points: 10,
    unlocked: true,
    unlockedAt: '1 Nov 2024',
  },
  {
    id: '2',
    title: 'Primeira Lição',
    description: 'Complete sua primeira lição',
    icon: '📚',
    category: 'Aprendizado',
    points: 20,
    unlocked: true,
    unlockedAt: '2 Nov 2024',
  },
  {
    id: '3',
    title: 'Primeira Trilha',
    description: 'Complete sua primeira trilha',
    icon: '🎯',
    category: 'Trilhas',
    points: 100,
    unlocked: true,
    unlockedAt: '15 Nov 2024',
  },
  {
    id: '4',
    title: 'Dedicação',
    description: 'Estude por 3 dias consecutivos',
    icon: '🔥',
    category: 'Sequência',
    points: 50,
    unlocked: true,
    unlockedAt: '8 Nov 2024',
  },
  {
    id: '5',
    title: 'Semana Completa',
    description: '7 dias de estudo seguidos',
    icon: '⭐',
    category: 'Sequência',
    points: 150,
    unlocked: true,
    unlockedAt: '12 Nov 2024',
  },
  {
    id: '6',
    title: '10 Cursos',
    description: 'Complete 10 cursos',
    icon: '📖',
    category: 'Aprendizado',
    points: 200,
    unlocked: true,
    unlockedAt: '10 Nov 2024',
  },
  {
    id: '7',
    title: '50 Lições',
    description: 'Complete 50 lições',
    icon: '🌟',
    category: 'Aprendizado',
    points: 100,
    unlocked: true,
    unlockedAt: '8 Nov 2024',
  },
  {
    id: '8',
    title: '50 Horas',
    description: 'Estude por 50 horas',
    icon: '⏰',
    category: 'Tempo',
    points: 150,
    unlocked: true,
    unlockedAt: '14 Nov 2024',
  },
  {
    id: '9',
    title: 'Expert React',
    description: 'Complete a trilha React Native',
    icon: '⚛️',
    category: 'Especialização',
    points: 250,
    unlocked: true,
    unlockedAt: '13 Nov 2024',
  },
  {
    id: '10',
    title: 'Designer Pro',
    description: 'Complete a trilha UX/UI Design',
    icon: '🎨',
    category: 'Especialização',
    points: 250,
    unlocked: true,
    unlockedAt: '15 Nov 2024',
  },
  {
    id: '11',
    title: 'Networking',
    description: 'Conecte-se com 10 pessoas',
    icon: '🤝',
    category: 'Social',
    points: 100,
    unlocked: true,
    unlockedAt: '7 Nov 2024',
  },
  {
    id: '12',
    title: 'Compartilhador',
    description: 'Compartilhe 5 conteúdos',
    icon: '📤',
    category: 'Social',
    points: 75,
    unlocked: true,
    unlockedAt: '9 Nov 2024',
  },
  // Locked achievements
  {
    id: '13',
    title: '15 Cursos',
    description: 'Complete 15 cursos',
    icon: '🏆',
    category: 'Aprendizado',
    points: 300,
    unlocked: false,
    progress: 80,
  },
  {
    id: '14',
    title: '100 Lições',
    description: 'Complete 100 lições',
    icon: '💯',
    category: 'Aprendizado',
    points: 200,
    unlocked: false,
    progress: 74,
  },
  {
    id: '15',
    title: '100 Horas',
    description: 'Estude por 100 horas',
    icon: '💎',
    category: 'Tempo',
    points: 300,
    unlocked: false,
    progress: 87,
  },
  {
    id: '16',
    title: 'Mestre React',
    description: 'Complete todos os módulos avançados de React',
    icon: '👑',
    category: 'Especialização',
    points: 500,
    unlocked: false,
    progress: 42,
  },
  {
    id: '17',
    title: '30 Dias',
    description: '30 dias de sequência',
    icon: '🎖️',
    category: 'Sequência',
    points: 500,
    unlocked: false,
    progress: 23,
  },
  {
    id: '18',
    title: 'Madrugador',
    description: 'Estude antes das 7h da manhã',
    icon: '🌅',
    category: 'Especial',
    points: 100,
    unlocked: false,
    progress: 0,
  },
  {
    id: '19',
    title: 'Noturno',
    description: 'Estude depois das 23h',
    icon: '🌙',
    category: 'Especial',
    points: 100,
    unlocked: false,
    progress: 0,
  },
  {
    id: '20',
    title: 'Fim de Semana',
    description: 'Estude no sábado e domingo',
    icon: '📅',
    category: 'Especial',
    points: 150,
    unlocked: false,
    progress: 50,
  },
];

export function AchievementsScreen({ navigation }: AchievementsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAchievements = ACHIEVEMENTS.filter(achievement => {
    if (selectedCategory === 'unlocked') return achievement.unlocked;
    if (selectedCategory === 'locked') return !achievement.unlocked;
    return true;
  });

  const totalPoints = ACHIEVEMENTS
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conquistas</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stats Card */}
      <Card style={styles.statsCard}>
        <CardContent style={styles.statsContent}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{unlockedCount}/{ACHIEVEMENTS.length}</Text>
            <Text style={styles.statLabel}>Desbloqueadas</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{totalPoints}</Text>
            <Text style={styles.statLabel}>Pontos Totais</Text>
          </View>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {ACHIEVEMENT_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.label}
            </Text>
            <Badge
              variant={selectedCategory === category.id ? 'default' : 'secondary'}
              style={styles.countBadge}
            >
              {category.count}
            </Badge>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            style={[
              styles.achievementCard,
              !achievement.unlocked ? styles.achievementCardLocked : undefined
            ]}
          >
            <CardContent style={styles.achievementContent}>
              <View style={styles.achievementLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    achievement.unlocked && styles.iconContainerUnlocked,
                  ]}
                >
                  {achievement.unlocked ? (
                    <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  ) : (
                    <Lock size={24} color={colors.textSecondary} />
                  )}
                </View>

                <View style={styles.achievementInfo}>
                  <Text
                    style={[
                      styles.achievementTitle,
                      !achievement.unlocked && styles.achievementTitleLocked,
                    ]}
                  >
                    {achievement.title}
                  </Text>
                  <Text
                    style={[
                      styles.achievementDescription,
                      !achievement.unlocked && styles.achievementDescriptionLocked,
                    ]}
                  >
                    {achievement.description}
                  </Text>

                  <View style={styles.achievementFooter}>
                    <Badge variant="outline" style={styles.categoryBadge}>
                      {achievement.category}
                    </Badge>
                    <View style={styles.pointsBadge}>
                      <Text style={styles.pointsText}>+{achievement.points} pts</Text>
                    </View>
                  </View>

                  {achievement.unlocked ? (
                    <Text style={styles.unlockedDate}>
                      Desbloqueada em {achievement.unlockedAt}
                    </Text>
                  ) : achievement.progress !== undefined && achievement.progress > 0 ? (
                    <View style={styles.progressContainer}>
                      <Progress value={achievement.progress} />
                      <Text style={styles.progressText}>{achievement.progress}%</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </CardContent>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  statsCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  statsContent: {
    flexDirection: 'row',
    padding: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  categoriesContainer: {
    maxHeight: 50,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  achievementCard: {
    marginBottom: 12,
  },
  achievementCardLocked: {
    opacity: 0.7,
  },
  achievementContent: {
    padding: 16,
  },
  achievementLeft: {
    flexDirection: 'row',
    gap: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  iconContainerUnlocked: {
    backgroundColor: `${colors.primary}15`,
    borderColor: colors.primary,
  },
  achievementIcon: {
    fontSize: 28,
  },
  achievementInfo: {
    flex: 1,
    gap: 6,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  achievementTitleLocked: {
    color: colors.textSecondary,
  },
  achievementDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  achievementDescriptionLocked: {
    opacity: 0.7,
  },
  achievementFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pointsBadge: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  pointsText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  unlockedDate: {
    fontSize: 11,
    color: colors.success,
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 8,
    gap: 4,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
    alignSelf: 'flex-end',
  },
});
