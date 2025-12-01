import { FadeIn } from "@/src/components/animated";
import { tokens } from "@/src/constants/tokens";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  TrendingUp,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { getCategoryImage } from "@/src/constants/images";
import { useRecommendedContent } from '@/src/hooks/useRecommendedContent';
import { styles } from '@/src/styles/discover.styles';

// Mapeamento de categorias para emojis
const CATEGORY_EMOJIS: Record<string, string> = {
  'Tecnologia': '💻',
  'Educação': '📚',
  'Negócios': '💼',
  'Design': '🎨',
  'Marketing': '📢',
  'Saúde': '🏥',
  'Ciência': '🔬',
  'Outros': '📄',
};

export default function DiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { contentsByCategory, loading, error } = useRecommendedContent();

  // Filtrar e agrupar conteúdos por categoria com base na busca
  const filteredCategories = useMemo(() => {
    const filtered: Record<string, typeof contentsByCategory[string]> = {};
    
    Object.entries(contentsByCategory).forEach(([category, items]) => {
      const filteredItems = items.filter((item) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.summary.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      });
      
      if (filteredItems.length > 0) {
        filtered[category] = filteredItems;
      }
    });
    
    return filtered;
  }, [contentsByCategory, searchQuery]);

  // Converter para array de categorias para renderização
  const categoriesArray = useMemo(() => {
    return Object.entries(filteredCategories).map(([category, items]) => {
      // A categoria já está normalizada pelo hook, usar diretamente
      const categoryName = category;
      return {
        id: categoryName.toLowerCase().replace(/\s+/g, '-'),
        name: categoryName,
        emoji: CATEGORY_EMOJIS[categoryName] || CATEGORY_EMOJIS['Outros'],
        contents: items,
      };
    });
  }, [filteredCategories]);

  const renderContentCard = (item: any, index: number) => (
    <TouchableOpacity
      key={`${item.url}-${index}`}
      style={styles.contentCard}
      activeOpacity={0.9}
      onPress={() => {
        // Navegar para o conteúdo
        if (item.type === 'video') {
          router.push({
            pathname: '/(screens)/video-player',
            params: {
              id: item.url,
              title: item.title,
              author: item.author,
              url: item.url,
            },
          });
        } else {
          router.push({
            pathname: '/(screens)/article-reader',
            params: {
              id: item.url,
              title: item.title,
              author: item.author,
              category: item.category,
              duration: item.duration,
              timeAgo: item.timeAgo,
              image: item.image || getCategoryImage(item.category),
              url: item.url,
              summary: item.summary,
            },
          });
        }
      }}
    >
      {/* Imagem com overlay - usar uma imagem padrão ou placeholder */}
      <View style={styles.cardImageContainer}>
        <Image
          source={{ 
            uri: getCategoryImage(item.category)
          }}
          style={styles.cardImage}
          contentFit="cover"
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
          locations={[0, 0.5, 1]}
          style={styles.cardImageGradient}
        />
      </View>

      {/* Conteúdo do card */}
      <View style={styles.cardContent}>
        {/* Badges */}
        <View style={styles.cardBadges}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{item.category}</Text>
          </View>
          <View
            style={[
              styles.levelBadge,
              {
                backgroundColor:
                  item.temperature >= 0.7
                    ? tokens.colors.primary
                    : tokens.colors.muted,
              },
            ]}
          >
            <Text
              style={[
                styles.levelBadgeText,
                {
                  color:
                    item.temperature >= 0.7
                      ? tokens.colors.primaryForeground
                      : tokens.colors.foreground,
                },
              ]}
            >
              {item.temperature >= 0.7 ? 'Alta' : 'Média'}
            </Text>
          </View>
        </View>

        {/* Título */}
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Descrição (usando summary) */}
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.summary}
        </Text>

        {/* Duração */}
        <View style={styles.cardDuration}>
          <Clock size={12} color={tokens.colors.mutedForeground} />
          <Text style={styles.cardDurationText}>{item.readTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header com gradiente roxo */}
      <LinearGradient
        colors={[
          tokens.colors.primary,
          '#8b5cf6',
          tokens.colors.secondary,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <FadeIn delay={0} duration={300}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ChevronLeft
                size={24}
                color={tokens.colors.primaryForeground}
              />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Descobrir</Text>
              <Text style={styles.headerSubtitle}>
                Explore novos conteúdos
              </Text>
            </View>

            <TouchableOpacity style={styles.trendingButton}>
              <TrendingUp size={20} color="#FFDF20" />
            </TouchableOpacity>
          </View>
        </FadeIn>

        {/* Campo de busca */}
        <FadeIn delay={100} duration={300}>
          <View style={styles.searchContainer}>
            <Search
              size={20}
              color={tokens.colors.mutedForeground}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar conteúdos..."
              placeholderTextColor={tokens.colors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </FadeIn>
      </LinearGradient>

      {/* Conteúdo scrollável */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={tokens.colors.primary} />
            <Text style={{ marginTop: 16, color: tokens.colors.mutedForeground }}>
              Carregando conteúdos...
            </Text>
          </View>
        ) : error ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ color: tokens.colors.destructive }}>
              Erro ao carregar conteúdos
            </Text>
          </View>
        ) : categoriesArray.length === 0 ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ color: tokens.colors.mutedForeground, textAlign: 'center' }}>
              Nenhum conteúdo recomendado encontrado.{'\n'}
              Complete o onboarding para receber recomendações personalizadas.
            </Text>
          </View>
        ) : (
          categoriesArray.map((category, categoryIndex) => (
            <FadeIn
              key={category.id}
              delay={200 + categoryIndex * 100}
              duration={400}
            >
              <View style={styles.categorySection}>
                {/* Header da categoria */}
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryTitleContainer}>
                    <Text style={styles.categoryEmoji}>
                      {category.emoji}
                    </Text>
                    <Text style={styles.categoryTitle}>
                      {category.name}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.viewAllButton}
                    onPress={() => router.push({
                      pathname: '/(screens)/category-content',
                      params: { categoryId: category.id, categoryName: category.name },
                    })}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.viewAllText}>
                      Ver todos
                    </Text>
                    <ChevronRight
                      size={16}
                      color={tokens.colors.primary}
                    />
                  </TouchableOpacity>
                </View>

                {/* Lista horizontal de cards */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.cardsContainer}
                >
                  {category.contents.map((item, index) =>
                    renderContentCard(item, index),
                  )}
                </ScrollView>
              </View>
            </FadeIn>
          ))
        )}
      </ScrollView>
    </View>
  );
}

