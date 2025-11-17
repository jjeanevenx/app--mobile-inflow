import { Avatar, Badge, Card, CardContent } from '@/src/components/ui';
import { CATEGORIES } from '@/src/dataSources/sys_datas/categories';
import { colors } from '@/src/utils/colors';
import { Filter, Search, TrendingUp } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface DiscoverScreenProps {
  navigation: any;
}



const CONTENT = [
  {
    id: '1',
    title: 'Introdução ao React Native',
    category: 'Tecnologia',
    author: 'Ana Silva',
    duration: '3h 30min',
    rating: 4.8,
    students: 1250,
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'Design System do Zero',
    category: 'Design',
    author: 'Carlos Mendes',
    duration: '2h 15min',
    rating: 4.9,
    students: 890,
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Growth Hacking Avançado',
    category: 'Marketing',
    author: 'Maria Santos',
    duration: '4h 00min',
    rating: 4.7,
    students: 2100,
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: 'Data Science com Python',
    category: 'Dados',
    author: 'Pedro Costa',
    duration: '5h 45min',
    rating: 4.9,
    students: 3400,
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: '5',
    title: 'Estratégias de Produto',
    category: 'Negócios',
    author: 'Julia Martins',
    duration: '3h 20min',
    rating: 4.6,
    students: 1680,
    thumbnail: 'https://via.placeholder.com/150',
  },
];

export function DiscoverScreen({ navigation }: DiscoverScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredContent = CONTENT.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      item.category.toLowerCase().includes(CATEGORIES.find(c => c.id === selectedCategory)?.label.toLowerCase() || '');
    return matchesSearch && matchesCategory;
  });

  const renderCategoryChip = (category: typeof CATEGORIES[0]) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryChip,
        selectedCategory === category.id && {
          backgroundColor: category.color,
          borderColor: category.color,
        },
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
    </TouchableOpacity>
  );

  const renderContentCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.contentCard}
      activeOpacity={0.7}
      onPress={() => {
        // TODO: Navegar para detalhes
      }}
    >
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <View style={styles.thumbnail} />
          
          <View style={styles.contentInfo}>
            <View style={styles.contentHeader}>
              <Badge variant="secondary">{item.category}</Badge>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>⭐ {item.rating}</Text>
              </View>
            </View>

            <Text style={styles.contentTitle} numberOfLines={2}>
              {item.title}
            </Text>

            <View style={styles.authorRow}>
              <Avatar size={24} fallback={item.author[0]} />
              <Text style={styles.authorText}>{item.author}</Text>
            </View>

            <View style={styles.statsRow}>
              <Text style={styles.statText}>👥 {item.students.toLocaleString()}</Text>
              <Text style={styles.statDivider}>•</Text>
              <Text style={styles.statText}>⏱️ {item.duration}</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Descobrir</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar conteúdos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map(renderCategoryChip)}
      </ScrollView>

      {/* Trending Tag */}
      <View style={styles.trendingContainer}>
        <TrendingUp size={16} color={colors.primary} />
        <Text style={styles.trendingText}>
          {filteredContent.length} conteúdos disponíveis
        </Text>
      </View>

      {/* Content Grid */}
      <FlatList
        data={filteredContent}
        renderItem={renderContentCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum conteúdo encontrado</Text>
            <Text style={styles.emptySubtext}>
              Tente buscar por outro termo ou categoria
            </Text>
          </View>
        }
      />
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
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  categoriesContainer: {
    maxHeight: 50,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  trendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  trendingText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  contentList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  contentCard: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 0,
  },
  cardContent: {
    padding: 12,
  },
  thumbnail: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    marginBottom: 12,
  },
  contentInfo: {
    gap: 8,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 22,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
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
