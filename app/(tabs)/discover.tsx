import { FadeIn } from "@/src/components/animated";
import { images } from "@/src/constants/images";
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
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { styles } from '@/src/styles/discover.styles';

// Dados mock das categorias
const CATEGORIES_DATA = [
  {
    id: "tech",
    name: "Tecnologia",
    emoji: "💻",
    contents: [
      {
        id: "1",
        title: "Fundamentos de Inteligência Artificial",
        description:
          "Aprenda os conceitos básicos de IA e Machine Learning",
        image: images.aiGenerative,
        category: "Tecnologia",
        level: "Alta",
        duration: "25 min",
      },
      {
        id: "2",
        title: "Desenvolvimento Web Frontend",
        description:
          "React, TypeScript e melhores práticas modernas",
        image: images.designSystem,
        category: "Tecnologia",
        level: "Alta",
        duration: "35 min",
      },
      {
        id: "3",
        title: "Python para Data Science",
        description: "Análise de dados com Python e Pandas",
        image: images.dataPython,
        category: "Tecnologia",
        level: "Alta",
        duration: "40 min",
      },
      {
        id: "4",
        title: "Cloud Computing e AWS",
        description: "Introdução aos serviços AWS essenciais",
        image: images.blockchain,
        category: "Tecnologia",
        level: "Média",
        duration: "30 min",
      },
    ],
  },
  {
    id: "education",
    name: "Educação",
    emoji: "📚",
    contents: [
      {
        id: "5",
        title: "Metodologias Ativas de Ensino",
        description:
          "Transforme sua sala de aula com novas técnicas",
        image: images.marketing,
        category: "Educação",
        level: "Média",
        duration: "28 min",
      },
      {
        id: "6",
        title: "Pedagogia Digital",
        description: "Ferramentas digitais para educadores",
        image: images.business,
        category: "Educação",
        level: "Alta",
        duration: "42 min",
      },
    ],
  },
];

export default function DiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const renderContentCard = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.contentCard}
      activeOpacity={0.9}
    >
      {/* Imagem com overlay */}
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          contentFit="cover"
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
                  item.level === 'Alta'
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
                    item.level === 'Alta'
                      ? tokens.colors.primaryForeground
                      : tokens.colors.foreground,
                },
              ]}
            >
              {item.level}
            </Text>
          </View>
        </View>

        {/* Título */}
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Descrição */}
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Duração */}
        <View style={styles.cardDuration}>
          <Clock size={12} color={tokens.colors.mutedForeground} />
          <Text style={styles.cardDurationText}>{item.duration}</Text>
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
        {CATEGORIES_DATA.map((category, categoryIndex) => (
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
                <TouchableOpacity style={styles.viewAllButton}
                onPress={() => router.push({
                  pathname: '/(screens)/category-content',
                  params: { categoryId: category.id },
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
                {category.contents.map((item) =>
                  renderContentCard(item),
                )}
              </ScrollView>
            </View>
          </FadeIn>
        ))}
      </ScrollView>
    </View>
  );
}

