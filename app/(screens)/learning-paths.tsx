import { FadeIn } from '@/src/components/animated';
import { Badge, Card, CardContent, Progress } from '@/src/components/ui';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Award, BookOpen, Clock, Play } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CATEGORIES, LEARNING_PATHS, STATS } from '@/src/mocks/learning-paths.mock';
import { styles } from '@/src/styles/learning-paths.styles';
import { CategoryType } from '@/src/types/categoryType';





export default function LearningPathsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Todas');

  const filteredPaths =
    selectedCategory === 'Todas'
      ? LEARNING_PATHS
      : LEARNING_PATHS.filter((path) => path.category === selectedCategory);

  const handlePathPress = (path: typeof LEARNING_PATHS[0]) => {
    router.push({
      pathname: '/(screens)/learning-path-lessons',
      params: {
        pathId: path.id,
        pathTitle: path.title,
        pathLevel: path.level,
        pathDuration: path.duration,
        totalLessons: path.totalLessons,
        completedLessons: path.progress,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      {/* Header com Gradiente Roxo */}
      <View style={styles.headerWrapper}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6', '#a855f7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
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
                <Text style={styles.headerTitle}>Trilhas de Aprendizado</Text>
                <Text style={styles.headerSubtitle}>Personalize sua jornada</Text>
              </View>
              <TouchableOpacity style={styles.achievementsButton} activeOpacity={0.7}>
                <Award size={20} color="#FFDF20" />
              </TouchableOpacity>
            </View>

            {/* Category Tabs */}
            <View style={styles.categoryContainer}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryTab,
                    selectedCategory === category.id && styles.categoryTabActive,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category.id && styles.categoryTextActive,
                    ]}
                  >
                    {category.id}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </FadeIn>
        </LinearGradient>

        {/* Stats Section - Fora do gradiente mas sem gap */}
        <View style={styles.statsContainer}>
          <FadeIn delay={100} duration={400}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{STATS.activePaths}</Text>
                <Text style={styles.statLabel}>Trilhas ativas</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{STATS.averageProgress}%</Text>
                <Text style={styles.statLabel}>Progresso médio</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{STATS.lessonsWatched}</Text>
                <Text style={styles.statLabel}>Aulas assistidas</Text>
              </View>
            </View>
          </FadeIn>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Learning Path Cards */}
        <View style={styles.pathsSection}>
          {filteredPaths.map((path, index) => (
            <FadeIn key={path.id} delay={200 + index * 100} duration={400}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => handlePathPress(path)}>
                <Card style={styles.pathCard}>
                  <CardContent style={styles.pathCardContent}>
                    {/* Level Badge */}
                    <Badge variant="outline" style={styles.levelBadge}>
                      <Text style={styles.levelBadgeText}>{path.level}</Text>
                    </Badge>

                    {/* Title */}
                    <Text style={styles.pathTitle}>{path.title}</Text>

                    {/* Info Row */}
                    <View style={styles.pathInfoRow}>
                      <View style={styles.pathInfoItem}>
                        <BookOpen size={16} color="#717182" />
                        <Text style={styles.pathInfoText}>
                          {path.totalLessons} aulas
                        </Text>
                      </View>
                      <View style={styles.pathInfoItem}>
                        <Clock size={16} color="#717182" />
                        <Text style={styles.pathInfoText}>{path.duration}</Text>
                      </View>
                    </View>

                    {/* Progress Section */}
                    <View style={styles.progressSection}>
                      <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>Progresso</Text>
                        <Text style={styles.progressValue}>
                          {path.progress}/{path.totalLessons} aulas
                        </Text>
                      </View>
                      <Progress
                        value={(path.progress / path.totalLessons) * 100}
                        style={styles.progressBar}
                      />
                    </View>

                    {/* Next Lesson */}
                    {path.progress > 0 && (
                      <View style={styles.nextLessonContainer}>
                        <View style={styles.nextLessonContent}>
                          <Text style={styles.nextLessonLabel}>Próxima aula</Text>
                          <Text style={styles.nextLessonTitle} numberOfLines={1}>
                            {path.nextLesson}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.playButton}
                          activeOpacity={0.8}
                          onPress={() => handlePathPress(path)}
                        >
                          <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </CardContent>
                </Card>
              </TouchableOpacity>
            </FadeIn>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}