import { Avatar, Badge, Card, CardContent, Progress } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import {
    Award,
    BookOpen,
    ChevronRight,
    Clock,
    Edit2,
    Settings,
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

interface ProfileScreenProps {
  navigation: any;
}

const USER_STATS = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  level: 12,
  xp: 2450,
  nextLevelXp: 3000,
  completedCourses: 15,
  inProgressCourses: 3,
  totalHours: 127,
  currentStreak: 7,
};

const USER_INTERESTS = [
  'Tecnologia',
  'Design',
  'Negócios',
  'Marketing',
  'Dados',
];

const RECENT_ACHIEVEMENTS = [
  { id: '1', title: 'Primeira Trilha Completa', icon: '🎯', date: '2 dias atrás' },
  { id: '2', title: 'Semana de Dedicação', icon: '🔥', date: '1 semana atrás' },
  { id: '3', title: 'Expert em React', icon: '⚛️', date: '2 semanas atrás' },
];

const MENU_ITEMS = [
  {
    id: 'progress',
    icon: TrendingUp,
    title: 'Meu Progresso',
    subtitle: 'Veja suas estatísticas detalhadas',
    color: colors.primary,
  },
  {
    id: 'achievements',
    icon: Award,
    title: 'Conquistas',
    subtitle: `${RECENT_ACHIEVEMENTS.length} conquistas desbloqueadas`,
    color: '#f59e0b',
  },
  {
    id: 'settings',
    icon: Settings,
    title: 'Configurações',
    subtitle: 'Preferências e notificações',
    color: colors.textSecondary,
  },
];

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const levelProgress = (USER_STATS.xp / USER_STATS.nextLevelXp) * 100;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity style={styles.editButton}>
          <Edit2 size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <CardContent style={styles.profileContent}>
            <View style={styles.profileHeader}>
              <Avatar size={80} fallback={USER_STATS.name[0]} />
              
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{USER_STATS.name}</Text>
                <Text style={styles.profileEmail}>{USER_STATS.email}</Text>
                
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>Nível {USER_STATS.level}</Text>
                </View>
              </View>
            </View>

            {/* Level Progress */}
            <View style={styles.levelProgress}>
              <View style={styles.levelProgressHeader}>
                <Text style={styles.levelProgressLabel}>
                  {USER_STATS.xp} / {USER_STATS.nextLevelXp} XP
                </Text>
                <Text style={styles.levelProgressNext}>
                  Próximo nível: {USER_STATS.nextLevelXp - USER_STATS.xp} XP
                </Text>
              </View>
              <Progress value={levelProgress} />
            </View>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#e0e7ff' }]}>
              <BookOpen size={20} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{USER_STATS.completedCourses}</Text>
            <Text style={styles.statLabel}>Concluídos</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#fef3c7' }]}>
              <Target size={20} color="#f59e0b" />
            </View>
            <Text style={styles.statValue}>{USER_STATS.inProgressCourses}</Text>
            <Text style={styles.statLabel}>Em Progresso</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
              <Clock size={20} color={colors.success} />
            </View>
            <Text style={styles.statValue}>{USER_STATS.totalHours}h</Text>
            <Text style={styles.statLabel}>Tempo Total</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#fee2e2' }]}>
              <Text style={styles.fireIcon}>🔥</Text>
            </View>
            <Text style={styles.statValue}>{USER_STATS.currentStreak}</Text>
            <Text style={styles.statLabel}>Dias Seguidos</Text>
          </View>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Áreas de Interesse</Text>
          <View style={styles.interestsContainer}>
            {USER_INTERESTS.map((interest, index) => (
              <Badge key={index} variant="secondary">
                {interest}
              </Badge>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Conquistas Recentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {RECENT_ACHIEVEMENTS.map((achievement) => (
            <Card key={achievement.id} style={styles.achievementCard}>
              <CardContent style={styles.achievementContent}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => {
                if (item.id === 'progress') {
                  // TODO: Navigate to Progress screen
                } else if (item.id === 'achievements') {
                  // TODO: Navigate to Achievements screen
                } else if (item.id === 'settings') {
                  // TODO: Navigate to Settings screen
                }
              }}
            >
              <Card style={styles.menuCard}>
                <CardContent style={styles.menuContent}>
                  <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                    <item.icon size={20} color={item.color} />
                  </View>
                  <View style={styles.menuInfo}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  <ChevronRight size={20} color={colors.textSecondary} />
                </CardContent>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
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
  editButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileCard: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  profileContent: {
    padding: 20,
    gap: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  levelProgress: {
    gap: 8,
  },
  levelProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelProgressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  levelProgressNext: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
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
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
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
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  achievementCard: {
    marginBottom: 12,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  achievementIcon: {
    fontSize: 32,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  achievementDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  menuSection: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  menuCard: {
    marginBottom: 0,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  logoutButton: {
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.error,
  },
});
