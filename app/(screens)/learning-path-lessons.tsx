import { FadeIn } from '@/src/components/animated';
import { Badge, Card, CardContent, Progress } from '@/src/components/ui';
import { tokens } from '@/src/constants/tokens';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  PlayCircle
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MOCK_PATH_DATA } from '@/src/mocks/learning-path-lessons.mock';
import { Article } from '@/src/models/Article';
import { Video } from '@/src/models/Video';
import { styles } from '@/src/styles/learning-path-lessons.styles';
import { LessonType } from '@/src/types/LessonType';



export default function LearningPathLessonsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const pathId = (params.pathId as string) || '1';

  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const pathData = MOCK_PATH_DATA[pathId as keyof typeof MOCK_PATH_DATA] || MOCK_PATH_DATA['1'];

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (type: LessonType, completed: boolean) => {
    if (completed) {
      return <CheckCircle2 size={20} color="#10B981" fill="#10B981" />;
    }
    switch (type) {
      case 'video':
        return <PlayCircle size={20} color="#717182" />;
      case 'reading':
        return <BookOpen size={20} color="#717182" />;
      case 'quiz':
        return <HelpCircle size={20} color="#717182" />;
      default:
        return <PlayCircle size={20} color="#717182" />;
    }
  };

  const getLessonTypeLabel = (type: LessonType) => {
    switch (type) {
      case 'video':
        return 'Vídeo';
      case 'reading':
        return 'Leitura';
      case 'quiz':
        return 'Quiz';
      default:
        return 'Conteúdo';
    }
  };

  const createVideoFromLesson = (lesson: typeof pathData.modules[0]['lessons'][0]): Omit<Video, 'id'> & { id: string | number } => {
    // Converte string ID para number se possível, senão usa hash simples
    const numericId = parseInt(lesson.id.replace(/\D/g, '')) || lesson.id.charCodeAt(0);
    
    return {
      id: numericId,
      title: lesson.title,
      author: 'InFlow Academy',
      duration: lesson.duration,
      category: pathData.level || 'Educação',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      description: `Aprenda sobre ${lesson.title}. Este conteúdo faz parte da trilha "${pathData.title}".`,
      videoUrl: '',
    };
  };

  const createArticleFromLesson = (lesson: typeof pathData.modules[0]['lessons'][0]): Omit<Article, 'id'> & { id: string | number } => {
    // Converte string ID para number se possível, senão usa hash simples
    const numericId = parseInt(lesson.id.replace(/\D/g, '')) || lesson.id.charCodeAt(0);
    
    return {
      id: numericId,
      title: lesson.title,
      author: 'InFlow Academy',
      duration: lesson.duration,
      timeAgo: 'Agora',
      category: pathData.level || 'Educação',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      description: `Aprenda sobre ${lesson.title}. Este conteúdo faz parte da trilha "${pathData.title}".`,
      articleUrl: '',
    };
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      {/* Header com Gradiente Roxo/Azul */}
      <View style={styles.headerWrapper}>
        <LinearGradient
          colors={['#6366f1', '#7c3aed', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <FadeIn delay={0} duration={300}>
            {/* Status Bar Spacer */}
            <View style={styles.statusBarSpacer} />

            {/* Top Bar com Botão Voltar */}
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
                activeOpacity={0.7}
              >
                <ArrowLeft size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.headerContent}>
                {/* Badge de Nível */}
                <Badge
                  variant="outline"
                  style={[styles.levelBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                >
                  <Text style={styles.levelBadgeText}>{pathData.level}</Text>
                </Badge>

                {/* Título */}
                <Text style={styles.pathTitle}>{pathData.title}</Text>

                {/* Descrição */}
                <Text style={styles.pathDescription}>{pathData.description}</Text>
              </View>
            </View>

            {/* Card de Progresso */}
            <View style={styles.progressCard}>
              <View style={styles.progressStats}>
                <View style={styles.progressStatItem}>
                  <Text style={styles.progressStatLabel}>Seu Progresso</Text>
                  <Text style={styles.progressStatValue}>{pathData.progressPercentage}%</Text>
                </View>
                <View style={styles.progressStatItemRight}>
                  <Text style={styles.progressStatLabelRight}>Concluído</Text>
                  <Text style={styles.progressStatValueRight}>
                    {pathData.completedLessons}/{pathData.totalLessons}
                  </Text>
                </View>
              </View>
              <Progress
                value={pathData.progressPercentage}
                style={styles.progressBar}
                indicatorColor="#FFFFFF"
              />
            </View>
          </FadeIn>
        </LinearGradient>
      </View>

      {/* Módulos */}
      <ScrollView
        style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.modulesContainer}>
          {pathData.modules.map((module, index) => {
            const isExpanded = expandedModules.has(module.id);
            const progressPercent = (module.completedLessons / module.totalLessons) * 100;

            return (
              <FadeIn key={module.id} delay={100 + index * 50} duration={300}>
                <Card style={styles.moduleCard}>
                  <CardContent style={styles.moduleCardContent}>
                    {/* Header do Módulo - Clicável para expandir/colapsar */}
                    <TouchableOpacity
                      onPress={() => toggleModule(module.id)}
                      activeOpacity={0.7}
                      style={styles.moduleHeader}
                    >
                      <View style={styles.moduleHeaderContent}>
                        <Text style={styles.moduleTitle}>{module.title}</Text>
                        <Badge variant="outline" style={styles.moduleBadge}>
                          <Text style={styles.moduleBadgeText}>
                            {module.completedLessons}/{module.totalLessons}
                          </Text>
                        </Badge>
                      </View>
                      {module.lessons.length > 0 && (
                        <View style={styles.expandIcon}>
                          {isExpanded ? (
                            <ChevronUp size={20} color={tokens.colors.mutedForeground} />
                          ) : (
                            <ChevronDown size={20} color={tokens.colors.mutedForeground} />
                          )}
                        </View>
                      )}
                    </TouchableOpacity>

                    {/* Progress Bar */}
                    <Progress
                      value={progressPercent}
                      style={styles.moduleProgressBar}
                      indicatorColor={tokens.colors.primary}
                    />

                    {/* Lista de Aulas - Expandível */}
                    {isExpanded && module.lessons.length > 0 && (
                      <View style={styles.lessonsContainer}>
                        {module.lessons.map((lesson, lessonIndex) => (
                          <TouchableOpacity
                            key={lesson.id}
                            style={[
                              styles.lessonItem,
                              lesson.completed && styles.lessonItemCompleted,
                            ]}
                            activeOpacity={0.7}
                            onPress={() => {
                              // Navegar para a aula
                              if (lesson.type === 'video') {
                                const video = createVideoFromLesson(lesson);
                                router.push({
                                  pathname: '/(screens)/video-player',
                                  params: {
                                    id: String(video.id),
                                    title: video.title,
                                    author: video.author,
                                    duration: video.duration,
                                    category: video.category,
                                    image: video.image,
                                    description: video.description,
                                    videoUrl: video.videoUrl,
                                  },
                                });
                              } else if (lesson.type === 'reading') {
                                const article = createArticleFromLesson(lesson);
                                router.push({
                                  pathname: '/(screens)/article-reader',
                                  params: {
                                    id: String(article.id),
                                    title: article.title,
                                    author: article.author,
                                    duration: article.duration,
                                    timeAgo: article.timeAgo,
                                    category: article.category,
                                    image: article.image,
                                    description: article.description,
                                    articleUrl: article.articleUrl,
                                  },
                                });
                              }
                            }}
                          >
                            {/* Ícone de Status */}
                            <View style={styles.lessonIcon}>
                              {getLessonIcon(lesson.type, lesson.completed)}
                            </View>

                            {/* Conteúdo da Aula */}
                            <View style={styles.lessonContent}>
                              <Text
                                style={[
                                  styles.lessonTitle,
                                  lesson.completed && styles.lessonTitleCompleted,
                                ]}
                              >
                                {lesson.title}
                              </Text>
                              <View style={styles.lessonMeta}>
                                <Text style={styles.lessonMetaText}>
                                  {getLessonTypeLabel(lesson.type)}
                                </Text>
                                <View style={styles.lessonMetaDot} />
                                <Text style={styles.lessonMetaText}>{lesson.duration}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

