import { Badge, Card, CardContent, Progress } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import { CheckCircle, ChevronLeft, Clock, Play } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface ContinueWatchingScreenProps {
  navigation: any;
}

const CONTINUE_WATCHING = [
  {
    id: '1',
    title: 'React Native Avançado',
    subtitle: 'Módulo 5: Navegação Complexa',
    category: 'Tecnologia',
    progress: 45,
    duration: '2h 30min',
    remaining: '1h 22min',
    thumbnail: 'https://via.placeholder.com/150',
    lastWatched: '2 horas atrás',
  },
  {
    id: '2',
    title: 'UX/UI Design Masterclass',
    subtitle: 'Módulo 3: Prototipagem',
    category: 'Design',
    progress: 70,
    duration: '1h 45min',
    remaining: '32min',
    thumbnail: 'https://via.placeholder.com/150',
    lastWatched: '5 horas atrás',
  },
  {
    id: '3',
    title: 'Growth Marketing',
    subtitle: 'Módulo 2: Métricas de Sucesso',
    category: 'Marketing',
    progress: 30,
    duration: '3h 15min',
    remaining: '2h 16min',
    thumbnail: 'https://via.placeholder.com/150',
    lastWatched: 'Ontem',
  },
  {
    id: '4',
    title: 'Data Science com Python',
    subtitle: 'Módulo 4: Machine Learning',
    category: 'Dados',
    progress: 85,
    duration: '4h 00min',
    remaining: '36min',
    thumbnail: 'https://via.placeholder.com/150',
    lastWatched: 'Há 3 dias',
  },
  {
    id: '5',
    title: 'Estratégia de Produto',
    subtitle: 'Módulo 1: Discovery',
    category: 'Negócios',
    progress: 20,
    duration: '2h 20min',
    remaining: '1h 52min',
    thumbnail: 'https://via.placeholder.com/150',
    lastWatched: 'Há 1 semana',
  },
];

export function ContinueWatchingScreen({ navigation }: ContinueWatchingScreenProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'progress'>('recent');

  const sortedContent = [...CONTINUE_WATCHING].sort((a, b) => {
    if (sortBy === 'progress') {
      return b.progress - a.progress;
    }
    return 0; // Mantém ordem original (recente)
  });

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
        <Text style={styles.headerTitle}>Continuar Assistindo</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'recent' && styles.sortButtonActive]}
          onPress={() => setSortBy('recent')}
          activeOpacity={0.7}
        >
          <Text style={[styles.sortText, sortBy === 'recent' && styles.sortTextActive]}>
            Recentes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'progress' && styles.sortButtonActive]}
          onPress={() => setSortBy('progress')}
          activeOpacity={0.7}
        >
          <Text style={[styles.sortText, sortBy === 'progress' && styles.sortTextActive]}>
            Por Progresso
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sortedContent.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => {
              // TODO: Navigate to video player
            }}
          >
            <Card style={styles.contentCard}>
              <CardContent style={styles.cardContent}>
                {/* Thumbnail */}
                <View style={styles.thumbnailContainer}>
                  <View style={styles.thumbnail} />
                  <View style={styles.playOverlay}>
                    <View style={styles.playButton}>
                      <Play size={20} color="#ffffff" fill="#ffffff" />
                    </View>
                  </View>
                  {item.progress === 100 && (
                    <View style={styles.completedBadge}>
                      <CheckCircle size={16} color="#ffffff" fill={colors.success} />
                    </View>
                  )}
                </View>

                {/* Content Info */}
                <View style={styles.contentInfo}>
                  <View style={styles.contentHeader}>
                    <Badge variant="secondary">{item.category}</Badge>
                    <Text style={styles.lastWatched}>{item.lastWatched}</Text>
                  </View>

                  <Text style={styles.contentTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.contentSubtitle} numberOfLines={1}>
                    {item.subtitle}
                  </Text>

                  <View style={styles.progressSection}>
                    <Progress value={item.progress} />
                    <View style={styles.progressInfo}>
                      <Text style={styles.progressText}>{item.progress}% concluído</Text>
                      <View style={styles.timeInfo}>
                        <Clock size={12} color={colors.textSecondary} />
                        <Text style={styles.timeText}>{item.remaining} restantes</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          </TouchableOpacity>
        ))}

        {/* Empty State (when filtered) */}
        {sortedContent.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum conteúdo em andamento</Text>
            <Text style={styles.emptySubtext}>
              Comece um novo curso para vê-lo aqui
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
  sortContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  sortTextActive: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  contentCard: {
    marginBottom: 16,
  },
  cardContent: {
    padding: 12,
    gap: 12,
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e7eb',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentInfo: {
    gap: 8,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastWatched: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  contentSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressSection: {
    gap: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});