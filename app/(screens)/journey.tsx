import { FadeIn } from '@/src/components/animated';
import { Badge, Card, CardContent, Progress } from '@/src/components/ui';
import { tokens } from '@/src/constants/tokens';
import { styles } from '@/src/styles/journey.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Lock,
  TrendingUp,
} from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


import { ACHIEVEMENTS, RECENT_ACTIVITIES, STATS, USER_LEVEL } from '@/src/mocks/journey.mock';

export default function JourneyScreen() {
  const router = useRouter();

  const progressPercentage = (USER_LEVEL.currentXP / USER_LEVEL.nextLevelXP) * 100;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      {/* Header com Gradiente Roxo */}
      <View style={styles.headerWrapper}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6', '#a855f7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerGradient}
        >
          <FadeIn delay={0} duration={300}>
            {/* Status Bar Spacer */}
            <View style={styles.statusBarSpacer} />

            {/* Top Bar */}
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
                activeOpacity={0.7}
              >
                <ArrowLeft size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Minha Jornada</Text>
                <Text style={styles.headerSubtitle}>Acompanhe seu progresso</Text>
              </View>
              <TouchableOpacity
                style={styles.achievementsButton}
                activeOpacity={0.7}
                onPress={() => router.push('/(screens)/achievements')}
              >
                <Award size={20} color="#FFDF20" />
              </TouchableOpacity>
            </View>

            {/* Level Card */}
            <View style={styles.levelCard}>
              <View style={styles.levelHeader}>
                <View style={styles.levelInfo}>
                  <Text style={styles.levelLabel}>Nível Atual</Text>
                  <Text style={styles.levelValue}>Nível {USER_LEVEL.current}</Text>
                </View>
                <View style={styles.trendingIconContainer}>
                  <TrendingUp size={32} color="#FFDF20" strokeWidth={2} />
                </View>
              </View>

              <View style={styles.xpSection}>
                <View style={styles.xpHeader}>
                  <Text style={styles.xpLabel}>XP Total</Text>
                  <Text style={styles.xpValue}>
                    {USER_LEVEL.currentXP} / {USER_LEVEL.nextLevelXP}
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <LinearGradient
                    colors={['#ffdf20', '#f0b100']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
                  />
                </View>
                <Text style={styles.xpToNextLevel}>
                  Faltam {USER_LEVEL.xpToNextLevel} XP para o próximo nível
                </Text>
              </View>
            </View>
          </FadeIn>
        </LinearGradient>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Estatísticas */}
        <FadeIn delay={100} duration={400}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estatísticas</Text>
            <View style={styles.statsGrid}>
              {STATS.map((stat, index) => (
                <FadeIn key={stat.id} delay={200 + index * 50} duration={300}>
                  <Card style={styles.statCard}>
                    <CardContent style={styles.statCardContent}>
                      <View style={[styles.statIcon, { backgroundColor: stat.iconBg }]}>
                        <stat.icon size={24} color={stat.iconColor} />
                      </View>
                      <View style={styles.statTextContainer}>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                      </View>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </View>
          </View>
        </FadeIn>

        {/* Conquistas */}
        <FadeIn delay={300} duration={400}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            <View style={styles.achievementsContainer}>
              {ACHIEVEMENTS.map((achievement, index) => (
                <FadeIn key={achievement.id} delay={400 + index * 50} duration={300}>
                  <Card
                    style={[
                      styles.achievementCard,
                      achievement.status === 'locked' && styles.achievementCardLocked,
                    ]}
                   
                  >
                    <CardContent style={styles.achievementCardContent}>
                      <View
                        style={[
                          styles.achievementIcon,
                          { backgroundColor: achievement.iconBg },
                        ]}
                      >
                        <achievement.icon size={28} color={achievement.iconColor} />
                      </View>
                      <View style={styles.achievementInfo}>
                        <View style={styles.achievementHeader}>
                          <Text
                            style={[
                              styles.achievementTitle,
                              achievement.status === 'locked' && styles.achievementTitleLocked,
                            ]}
                          >
                            {achievement.title}
                          </Text>
                          {achievement.status === 'unlocked' && (
                            <Badge style={styles.unlockedBadge}>
                              <Text style={styles.unlockedBadgeText}>{achievement.badgeText}</Text>
                            </Badge>
                          )}
                          {achievement.status === 'locked' && (
                            <Lock size={16} color="#A0A0A0" />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.achievementDescription,
                            achievement.status === 'locked' && styles.achievementDescriptionLocked,
                          ]}
                        >
                          {achievement.description}
                        </Text>
                        {achievement.status === 'locked' && achievement.progress !== undefined && (
                          <View style={styles.achievementProgressContainer}>
                            <Text style={styles.achievementProgressText}>
                              Progresso: {achievement.progress}/{achievement.total}
                            </Text>
                            <Progress
                              value={(achievement.progress / achievement.total) * 100}
                              style={styles.achievementProgressBar}
                              indicatorColor={ tokens.colors.primary }
                              backgroundColor={ tokens.colors.primaryLight }
                            />
                          </View>
                        )}
                      </View>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </View>
          </View>
        </FadeIn>

        {/* Atividade Recente */}
        <FadeIn delay={500} duration={400}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Atividade Recente</Text>
            <View style={styles.activitiesContainer}>
              {RECENT_ACTIVITIES.map((activity, index) => (
                <FadeIn key={activity.id} delay={600 + index * 50} duration={300}>
                  <Card style={styles.activityCard}>
                    <CardContent style={styles.activityCardContent}>
                      <View style={styles.activityIconContainer}>
                        <CheckCircle2 size={24} color="#10B981" fill="#10B981" />
                      </View>
                      <View style={styles.activityInfo}>
                        <Text style={styles.activityTitle}>{activity.title}</Text>
                        <Text style={styles.activityDate}>{activity.date}</Text>
                      </View>
                      <Badge style={styles.xpBadge}>
                        <Text style={styles.xpBadgeText}>+{activity.xp} XP</Text>
                      </Badge>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </View>
          </View>
        </FadeIn>
      </ScrollView>
    </View>
  );
}

