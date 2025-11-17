import { Card, CardContent, Progress } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import {
  Award,
  Calendar,
  CheckCircle,
  ChevronLeft,
  Clock,
  Target,
  TrendingUp,
} from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface JourneyScreenProps {
  navigation: any;
}

const JOURNEY_STATS = {
  totalDays: 45,
  activeDays: 32,
  currentStreak: 7,
  longestStreak: 14,
  completedLessons: 124,
  totalHours: 87,
};

const MONTHLY_PROGRESS = [
  { month: 'Jan', hours: 12, lessons: 18 },
  { month: 'Fev', hours: 18, lessons: 24 },
  { month: 'Mar', hours: 24, lessons: 35 },
  { month: 'Abr', hours: 33, lessons: 47 },
];

const MILESTONES = [
  {
    id: '1',
    title: 'Primeira Trilha Completa',
    description: 'UX/UI Design Profissional',
    date: '15 Nov 2024',
    icon: Award,
    color: '#f59e0b',
    completed: true,
  },
  {
    id: '2',
    title: 'Semana de Dedicação',
    description: '7 dias consecutivos de estudo',
    date: '12 Nov 2024',
    icon: TrendingUp,
    color: colors.primary,
    completed: true,
  },
  {
    id: '3',
    title: '50 Lições Completas',
    description: 'Meio caminho para 100 lições',
    date: '8 Nov 2024',
    icon: Target,
    color: colors.success,
    completed: true,
  },
  {
    id: '4',
    title: '100 Lições Completas',
    description: 'Continue assim!',
    date: 'Em progresso',
    icon: Target,
    color: colors.textSecondary,
    completed: false,
    progress: 74,
  },
];

const RECENT_ACTIVITY = [
  {
    id: '1',
    title: 'Concluiu: APIs e Backend',
    course: 'React Native Avançado',
    date: 'Hoje, 14:30',
    type: 'completed',
  },
  {
    id: '2',
    title: 'Iniciou: Animações',
    course: 'React Native Avançado',
    date: 'Hoje, 10:15',
    type: 'started',
  },
  {
    id: '3',
    title: 'Concluiu: Trilha UX/UI Design',
    course: 'UX/UI Design Profissional',
    date: 'Ontem, 16:45',
    type: 'achievement',
  },
  {
    id: '4',
    title: '7 dias de sequência!',
    course: 'Inflow',
    date: '12 Nov, 09:00',
    type: 'streak',
  },
];

export function JourneyScreen({ navigation }: JourneyScreenProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed':
        return <CheckCircle size={16} color={colors.success} fill={colors.success} />;
      case 'started':
        return <Clock size={16} color={colors.primary} />;
      case 'achievement':
        return <Award size={16} color="#f59e0b" />;
      case 'streak':
        return <Text style={styles.streakIcon}>🔥</Text>;
      default:
        return null;
    }
  };

  const maxHours = Math.max(...MONTHLY_PROGRESS.map(m => m.hours));

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
        <Text style={styles.headerTitle}>Minha Jornada</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Calendar size={24} color={colors.primary} />
            <Text style={styles.statValue}>{JOURNEY_STATS.activeDays}</Text>
            <Text style={styles.statLabel}>Dias Ativos</Text>
            <Text style={styles.statSubtext}>de {JOURNEY_STATS.totalDays} dias</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.fireEmoji}>🔥</Text>
            <Text style={styles.statValue}>{JOURNEY_STATS.currentStreak}</Text>
            <Text style={styles.statLabel}>Sequência Atual</Text>
            <Text style={styles.statSubtext}>Record: {JOURNEY_STATS.longestStreak}</Text>
          </View>

          <View style={styles.statCard}>
            <CheckCircle size={24} color={colors.success} />
            <Text style={styles.statValue}>{JOURNEY_STATS.completedLessons}</Text>
            <Text style={styles.statLabel}>Lições Completas</Text>
          </View>

          <View style={styles.statCard}>
            <Clock size={24} color="#f59e0b" />
            <Text style={styles.statValue}>{JOURNEY_STATS.totalHours}h</Text>
            <Text style={styles.statLabel}>Tempo Total</Text>
          </View>
        </View>

        {/* Monthly Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progresso Mensal</Text>
          <Card style={styles.chartCard}>
            <CardContent style={styles.chartContent}>
              <View style={styles.chart}>
                {MONTHLY_PROGRESS.map((month, index) => (
                  <View key={index} style={styles.chartBar}>
                    <View style={styles.barContainer}>
                      <View
                        style={[
                          styles.bar,
                          { height: `${(month.hours / maxHours) * 100}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.barLabel}>{month.month}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                  <Text style={styles.legendText}>Horas de estudo</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conquistas</Text>
          
          {MILESTONES.map((milestone) => (
            <Card key={milestone.id} style={styles.milestoneCard}>
              <CardContent style={styles.milestoneContent}>
                <View style={[styles.milestoneIcon, { backgroundColor: `${milestone.color}20` }]}>
                  <milestone.icon size={20} color={milestone.color} />
                </View>

                <View style={styles.milestoneInfo}>
                  <View style={styles.milestoneHeader}>
                    <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                    {milestone.completed && (
                      <CheckCircle size={18} color={colors.success} fill={colors.success} />
                    )}
                  </View>
                  <Text style={styles.milestoneDescription}>
                    {milestone.description}
                  </Text>
                  <Text style={styles.milestoneDate}>{milestone.date}</Text>
                  
                  {!milestone.completed && milestone.progress !== undefined && (
                    <View style={styles.milestoneProgress}>
                      <Progress value={milestone.progress} />
                      <Text style={styles.progressPercentage}>{milestone.progress}%</Text>
                    </View>
                  )}
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atividade Recente</Text>
          
          <Card style={styles.activityCard}>
            <CardContent style={styles.activityContent}>
              {RECENT_ACTIVITY.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  {index > 0 && <View style={styles.activityDivider} />}
                  
                  <View style={styles.activityItem}>
                    <View style={styles.activityIcon}>
                      {getActivityIcon(activity.type)}
                    </View>
                    <View style={styles.activityInfo}>
                      <Text style={styles.activityTitle}>{activity.title}</Text>
                      <Text style={styles.activityCourse}>{activity.course}</Text>
                      <Text style={styles.activityDate}>{activity.date}</Text>
                    </View>
                  </View>
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
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
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  statSubtext: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  chartCard: {
    marginBottom: 0,
  },
  chartContent: {
    padding: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 16,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barContainer: {
    flex: 1,
    width: '60%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
    minHeight: 8,
  },
  barLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chartLegend: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  milestoneCard: {
    marginBottom: 12,
  },
  milestoneContent: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  milestoneIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneInfo: {
    flex: 1,
    gap: 4,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  milestoneTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  milestoneDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  milestoneDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  milestoneProgress: {
    marginTop: 8,
    gap: 6,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    alignSelf: 'flex-end',
  },
  activityCard: {
    marginBottom: 0,
  },
  activityContent: {
    padding: 0,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakIcon: {
    fontSize: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  activityCourse: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activityDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
});
