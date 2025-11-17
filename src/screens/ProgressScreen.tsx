import { Badge, Card, CardContent, Progress } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import {
  Award,
  ChevronLeft,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProgressScreenProps {
  navigation: any;
}

const PROGRESS_DATA = {
  level: 12,
  xp: 2450,
  nextLevelXp: 3000,
  totalCourses: 18,
  completedCourses: 15,
  totalLessons: 167,
  completedLessons: 124,
  totalHours: 127,
  thisWeekHours: 12,
  avgDailyHours: 1.7,
  streak: 7,
  longestStreak: 14,
};

const CATEGORIES_STATS = [
  { name: 'Tecnologia', courses: 6, hours: 45, progress: 75, color: colors.primary },
  { name: 'Design', courses: 4, hours: 32, progress: 90, color: '#8b5cf6' },
  { name: 'Marketing', courses: 3, hours: 24, progress: 60, color: '#f59e0b' },
  { name: 'Negócios', courses: 3, hours: 18, progress: 50, color: colors.success },
  { name: 'Dados', courses: 2, hours: 8, progress: 30, color: '#06b6d4' },
];

const WEEKLY_ACTIVITY = [
  { day: 'Dom', hours: 0, label: 'D' },
  { day: 'Seg', hours: 2.5, label: 'S' },
  { day: 'Ter', hours: 1.8, label: 'T' },
  { day: 'Qua', hours: 2.2, label: 'Q' },
  { day: 'Qui', hours: 1.5, label: 'Q' },
  { day: 'Sex', hours: 2.3, label: 'S' },
  { day: 'Sáb', hours: 1.7, label: 'S' },
];

const ACHIEVEMENTS = [
  { id: '1', title: 'Primeira Trilha', icon: '🎯', unlocked: true },
  { id: '2', title: '10 Cursos', icon: '⭐', unlocked: true },
  { id: '3', title: 'Dedicação Semanal', icon: '🔥', unlocked: true },
  { id: '4', title: '50 Horas', icon: '⏰', unlocked: true },
  { id: '5', title: '100 Lições', icon: '📚', unlocked: true },
  { id: '6', title: 'Expert React', icon: '⚛️', unlocked: true },
  { id: '7', title: '15 Cursos', icon: '🏆', unlocked: true },
  { id: '8', title: '100 Horas', icon: '💎', unlocked: false },
];

export function ProgressScreen({ navigation }: ProgressScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const levelProgress = (PROGRESS_DATA.xp / PROGRESS_DATA.nextLevelXp) * 100;
  const coursesProgress = (PROGRESS_DATA.completedCourses / PROGRESS_DATA.totalCourses) * 100;
  const lessonsProgress = (PROGRESS_DATA.completedLessons / PROGRESS_DATA.totalLessons) * 100;

  const maxWeeklyHours = Math.max(...WEEKLY_ACTIVITY.map(d => d.hours));

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
        <Text style={styles.headerTitle}>Meu Progresso</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Level Card */}
        <Card style={styles.levelCard}>
          <CardContent style={styles.levelContent}>
            <View style={styles.levelHeader}>
              <View>
                <Text style={styles.levelLabel}>Nível Atual</Text>
                <Text style={styles.levelValue}>{PROGRESS_DATA.level}</Text>
              </View>
              <View style={styles.levelBadge}>
                <TrendingUp size={20} color="#ffffff" />
              </View>
            </View>

            <View style={styles.xpInfo}>
              <Text style={styles.xpText}>
                {PROGRESS_DATA.xp} / {PROGRESS_DATA.nextLevelXp} XP
              </Text>
              <Text style={styles.xpRemaining}>
                {PROGRESS_DATA.nextLevelXp - PROGRESS_DATA.xp} XP para o próximo nível
              </Text>
            </View>
            <Progress value={levelProgress} />
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Target size={24} color={colors.primary} />
            <Text style={styles.statValue}>{PROGRESS_DATA.completedCourses}</Text>
            <Text style={styles.statLabel}>Cursos Completos</Text>
            <Progress value={coursesProgress} style={styles.miniProgress} />
          </View>

          <View style={styles.statCard}>
            <Award size={24} color="#f59e0b" />
            <Text style={styles.statValue}>{PROGRESS_DATA.completedLessons}</Text>
            <Text style={styles.statLabel}>Lições Completas</Text>
            <Progress value={lessonsProgress} style={styles.miniProgress} />
          </View>

          <View style={styles.statCard}>
            <Clock size={24} color={colors.success} />
            <Text style={styles.statValue}>{PROGRESS_DATA.totalHours}h</Text>
            <Text style={styles.statLabel}>Tempo Total</Text>
            <Text style={styles.statSubtext}>Média: {PROGRESS_DATA.avgDailyHours}h/dia</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.fireEmoji}>🔥</Text>
            <Text style={styles.statValue}>{PROGRESS_DATA.streak}</Text>
            <Text style={styles.statLabel}>Dias Seguidos</Text>
            <Text style={styles.statSubtext}>Record: {PROGRESS_DATA.longestStreak}</Text>
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Atividade Semanal</Text>
            <Badge variant="secondary">{PROGRESS_DATA.thisWeekHours}h esta semana</Badge>
          </View>

          <Card style={styles.chartCard}>
            <CardContent style={styles.chartContent}>
              <View style={styles.weekChart}>
                {WEEKLY_ACTIVITY.map((day, index) => (
                  <View key={index} style={styles.dayColumn}>
                    <View style={styles.barContainer}>
                      <View
                        style={[
                          styles.activityBar,
                          {
                            height: day.hours > 0 
                              ? `${(day.hours / maxWeeklyHours) * 100}%`
                              : 4,
                            backgroundColor: day.hours > 0 ? colors.primary : colors.border,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.dayLabel}>{day.label}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Categories Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progresso por Categoria</Text>
          
          {CATEGORIES_STATS.map((category, index) => (
            <Card key={index} style={styles.categoryCard}>
              <CardContent style={styles.categoryContent}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryStats}>
                      {category.courses} cursos · {category.hours}h
                    </Text>
                  </View>
                  <Text style={styles.categoryProgress}>{category.progress}%</Text>
                </View>
                <Progress 
                  value={category.progress} 
                  indicatorColor={category.color}
                />
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.achievementsGrid}>
            {ACHIEVEMENTS.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementBadge,
                  !achievement.unlocked && styles.achievementLocked,
                ]}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text
                  style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.achievementTitleLocked,
                  ]}
                  numberOfLines={2}
                >
                  {achievement.title}
                </Text>
              </View>
            ))}
          </View>
        </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  levelCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: colors.primary,
  },
  levelContent: {
    padding: 20,
    gap: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  levelLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  levelValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
  },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xpInfo: {
    gap: 4,
  },
  xpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  xpRemaining: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  fireEmoji: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  statSubtext: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  miniProgress: {
    width: '100%',
    height: 4,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  chartCard: {
    marginBottom: 0,
  },
  chartContent: {
    padding: 20,
  },
  weekChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barContainer: {
    flex: 1,
    width: '60%',
    justifyContent: 'flex-end',
  },
  activityBar: {
    width: '100%',
    borderRadius: 4,
  },
  dayLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  categoryCard: {
    marginBottom: 12,
  },
  categoryContent: {
    padding: 16,
    gap: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  categoryStats: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  categoryProgress: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementBadge: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 6,
  },
  achievementLocked: {
    borderColor: colors.border,
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
  },
  achievementTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: colors.textSecondary,
  },
});
