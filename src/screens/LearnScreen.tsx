import { Badge, Card, CardContent, Progress } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import { Award, BookOpen, ChevronRight, Target } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface LearnScreenProps {
  navigation: any;
}

const LEARNING_PATHS = [
  {
    id: '1',
    title: 'Desenvolvedor React Native',
    description: 'Domine o desenvolvimento mobile multiplataforma',
    modules: 12,
    completed: 5,
    totalHours: 40,
    difficulty: 'Intermediário',
    category: 'Tecnologia',
  },
  {
    id: '2',
    title: 'UX/UI Design Profissional',
    description: 'Aprenda a criar experiências incríveis',
    modules: 8,
    completed: 8,
    totalHours: 25,
    difficulty: 'Iniciante',
    category: 'Design',
  },
  {
    id: '3',
    title: 'Growth Marketing',
    description: 'Estratégias para crescimento acelerado',
    modules: 10,
    completed: 2,
    totalHours: 30,
    difficulty: 'Avançado',
    category: 'Marketing',
  },
];

const ACHIEVEMENTS = [
  { id: '1', title: 'Primeira Trilha', icon: '🎯', unlocked: true },
  { id: '2', title: '5 Módulos Completos', icon: '⭐', unlocked: true },
  { id: '3', title: 'Dedicação Semanal', icon: '🔥', unlocked: true },
  { id: '4', title: 'Expert em React', icon: '💎', unlocked: false },
];

export function LearnScreen({ navigation }: LearnScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'active' | 'completed'>('active');

  const activePaths = LEARNING_PATHS.filter(p => p.completed < p.modules);
  const completedPaths = LEARNING_PATHS.filter(p => p.completed === p.modules);

  const pathsToShow = selectedTab === 'active' ? activePaths : completedPaths;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return colors.success;
      case 'Intermediário':
        return colors.warning;
      case 'Avançado':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aprender</Text>
        <TouchableOpacity style={styles.achievementsButton}>
          <Award size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Card */}
        <Card style={styles.statsCard}>
          <CardContent style={styles.statsContent}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Trilhas Ativas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Módulos Completos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>95h</Text>
              <Text style={styles.statLabel}>Tempo Total</Text>
            </View>
          </CardContent>
        </Card>

        {/* Achievements Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsContainer}
          >
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
          </ScrollView>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'active' && styles.tabActive]}
            onPress={() => setSelectedTab('active')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'active' && styles.tabTextActive,
              ]}
            >
              Em Progresso ({activePaths.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'completed' && styles.tabActive]}
            onPress={() => setSelectedTab('completed')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'completed' && styles.tabTextActive,
              ]}
            >
              Concluídas ({completedPaths.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Learning Paths */}
        <View style={styles.pathsList}>
          {pathsToShow.map((path) => {
            const progress = (path.completed / path.modules) * 100;
            
            return (
              <TouchableOpacity
                key={path.id}
                activeOpacity={0.7}
                onPress={() => {
                  // TODO: Navigate to PathDetail
                }}
              >
                <Card style={styles.pathCard}>
                  <CardContent style={styles.pathContent}>
                    <View style={styles.pathHeader}>
                      <Badge variant="secondary">{path.category}</Badge>
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: getDifficultyColor(path.difficulty),
                        }}
                        textStyle={{
                          color: getDifficultyColor(path.difficulty),
                        }}
                      >
                        {path.difficulty}
                      </Badge>
                    </View>

                    <Text style={styles.pathTitle}>{path.title}</Text>
                    <Text style={styles.pathDescription} numberOfLines={2}>
                      {path.description}
                    </Text>

                    <View style={styles.pathStats}>
                      <View style={styles.pathStat}>
                        <BookOpen size={14} color={colors.textSecondary} />
                        <Text style={styles.pathStatText}>
                          {path.modules} módulos
                        </Text>
                      </View>
                      <View style={styles.pathStat}>
                        <Target size={14} color={colors.textSecondary} />
                        <Text style={styles.pathStatText}>
                          {path.totalHours}h
                        </Text>
                      </View>
                    </View>

                    <View style={styles.progressContainer}>
                      <Progress value={progress} />
                      <Text style={styles.progressText}>
                        {path.completed}/{path.modules} módulos
                      </Text>
                    </View>

                    <View style={styles.pathFooter}>
                      <Text style={styles.continueText}>
                        {progress === 100 ? 'Revisitar' : 'Continuar aprendendo'}
                      </Text>
                      <ChevronRight size={20} color={colors.primary} />
                    </View>
                  </CardContent>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        {pathsToShow.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {selectedTab === 'active'
                ? 'Nenhuma trilha em progresso'
                : 'Nenhuma trilha concluída ainda'}
            </Text>
            <Text style={styles.emptySubtext}>
              {selectedTab === 'active'
                ? 'Explore novas trilhas na aba Descobrir'
                : 'Complete suas trilhas ativas para vê-las aqui'}
            </Text>
          </View>
        )}
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  achievementsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statsCard: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  statsContent: {
    flexDirection: 'row',
    padding: 20,
  },
  statItem: {
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
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
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
  achievementsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  achievementBadge: {
    width: 100,
    height: 100,
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
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  tabTextActive: {
    color: '#ffffff',
  },
  pathsList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  pathCard: {
    marginBottom: 0,
  },
  pathContent: {
    padding: 16,
    gap: 12,
  },
  pathHeader: {
    flexDirection: 'row',
    gap: 8,
  },
  pathTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  pathDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  pathStats: {
    flexDirection: 'row',
    gap: 16,
  },
  pathStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pathStatText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  progressContainer: {
    gap: 6,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    alignSelf: 'flex-end',
  },
  pathFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  continueText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
