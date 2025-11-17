import { Badge, Card, CardContent } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import { Bookmark, ChevronLeft, Clock, TrendingUp } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface NewsScreenProps {
  navigation: any;
}

const NEWS_ARTICLES = [
  {
    id: '1',
    title: 'React Native 0.74 Released: What\'s New',
    summary: 'Confira as novidades da última versão do React Native, incluindo melhorias de performance e novos recursos.',
    category: 'Tecnologia',
    readTime: '5 min',
    publishedAt: '2 horas atrás',
    trending: true,
    saved: false,
    thumbnail: 'https://via.placeholder.com/400x200',
  },
  {
    id: '2',
    title: 'Design Thinking: Como Aplicar no Dia a Dia',
    summary: 'Metodologias práticas para incorporar design thinking em seus projetos e resolver problemas complexos.',
    category: 'Design',
    readTime: '8 min',
    publishedAt: '5 horas atrás',
    trending: true,
    saved: true,
    thumbnail: 'https://via.placeholder.com/400x200',
  },
  {
    id: '3',
    title: 'IA Generativa Revoluciona o Marketing Digital',
    summary: 'Como ferramentas de inteligência artificial estão transformando estratégias de marketing e criação de conteúdo.',
    category: 'Marketing',
    readTime: '6 min',
    publishedAt: '1 dia atrás',
    trending: false,
    saved: false,
    thumbnail: 'https://via.placeholder.com/400x200',
  },
  {
    id: '4',
    title: 'Tendências de Data Science para 2025',
    summary: 'As principais tendências e tecnologias que vão dominar o mundo de dados nos próximos anos.',
    category: 'Dados',
    readTime: '10 min',
    publishedAt: '2 dias atrás',
    trending: true,
    saved: false,
    thumbnail: 'https://via.placeholder.com/400x200',
  },
  {
    id: '5',
    title: 'Product Management: OKRs na Prática',
    summary: 'Guia completo para implementar OKRs efetivos e medir o sucesso do seu produto.',
    category: 'Negócios',
    readTime: '7 min',
    publishedAt: '3 dias atrás',
    trending: false,
    saved: true,
    thumbnail: 'https://via.placeholder.com/400x200',
  },
  {
    id: '6',
    title: 'TypeScript 5.3: Recursos Avançados',
    summary: 'Explore os novos recursos do TypeScript que vão melhorar sua produtividade e qualidade de código.',
    category: 'Tecnologia',
    readTime: '9 min',
    publishedAt: '4 dias atrás',
    trending: false,
    saved: false,
    thumbnail: 'https://via.placeholder.com/400x200',
  },
];

export function NewsScreen({ navigation }: NewsScreenProps) {
  const [savedArticles, setSavedArticles] = useState<string[]>(
    NEWS_ARTICLES.filter(a => a.saved).map(a => a.id)
  );
  const [filter, setFilter] = useState<'all' | 'trending' | 'saved'>('all');

  const toggleSaved = (id: string) => {
    setSavedArticles(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredArticles = NEWS_ARTICLES.filter(article => {
    if (filter === 'trending') return article.trending;
    if (filter === 'saved') return savedArticles.includes(article.id);
    return true;
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
        <Text style={styles.headerTitle}>Notícias</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
          onPress={() => setFilter('all')}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            Todas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filter === 'trending' && styles.filterChipActive]}
          onPress={() => setFilter('trending')}
          activeOpacity={0.7}
        >
          <TrendingUp size={14} color={filter === 'trending' ? '#ffffff' : colors.text} />
          <Text style={[styles.filterText, filter === 'trending' && styles.filterTextActive]}>
            Em Alta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filter === 'saved' && styles.filterChipActive]}
          onPress={() => setFilter('saved')}
          activeOpacity={0.7}
        >
          <Bookmark size={14} color={filter === 'saved' ? '#ffffff' : colors.text} />
          <Text style={[styles.filterText, filter === 'saved' && styles.filterTextActive]}>
            Salvos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredArticles.map((article) => {
          const isSaved = savedArticles.includes(article.id);
          
          return (
            <TouchableOpacity
              key={article.id}
              activeOpacity={0.7}
              onPress={() => {
                // TODO: Navigate to article detail
              }}
            >
              <Card style={styles.articleCard}>
                <CardContent style={styles.cardContent}>
                  {/* Thumbnail */}
                  <View style={styles.thumbnail}>
                    {article.trending && (
                      <View style={styles.trendingBadge}>
                        <TrendingUp size={12} color="#ffffff" />
                        <Text style={styles.trendingText}>Em Alta</Text>
                      </View>
                    )}
                  </View>

                  {/* Content */}
                  <View style={styles.articleContent}>
                    <View style={styles.articleHeader}>
                      <Badge variant="secondary">{article.category}</Badge>
                      <TouchableOpacity
                        onPress={() => toggleSaved(article.id)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Bookmark
                          size={20}
                          color={isSaved ? colors.primary : colors.textSecondary}
                          fill={isSaved ? colors.primary : 'transparent'}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.articleTitle} numberOfLines={2}>
                      {article.title}
                    </Text>

                    <Text style={styles.articleSummary} numberOfLines={2}>
                      {article.summary}
                    </Text>

                    <View style={styles.articleFooter}>
                      <View style={styles.timeInfo}>
                        <Clock size={14} color={colors.textSecondary} />
                        <Text style={styles.timeText}>{article.readTime} leitura</Text>
                      </View>
                      <Text style={styles.publishedText}>{article.publishedAt}</Text>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </TouchableOpacity>
          );
        })}

        {filteredArticles.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {filter === 'saved' 
                ? 'Nenhum artigo salvo' 
                : 'Nenhuma notícia encontrada'}
            </Text>
            <Text style={styles.emptySubtext}>
              {filter === 'saved'
                ? 'Salve artigos interessantes para ler depois'
                : 'Tente outro filtro'}
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
  filtersContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  filterTextActive: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  articleCard: {
    marginBottom: 16,
  },
  cardContent: {
    padding: 0,
  },
  thumbnail: {
    width: '100%',
    height: 160,
    backgroundColor: '#e5e7eb',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'relative',
  },
  trendingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
  articleContent: {
    padding: 16,
    gap: 10,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 22,
  },
  articleSummary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  publishedText: {
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
