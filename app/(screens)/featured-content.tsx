import { FadeIn } from '@/src/components/animated';
import { Badge, Card, CardContent } from '@/src/components/ui';
import { tokens } from '@/src/constants/tokens';
import { Video } from '@/src/models/Video';
import { styles } from '@/src/styles/Featured-content.styles';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle, Clock, ThumbsDown, ThumbsUp } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { ALL_FEATURED_CONTENT, CATEGORIES } from '@/src/mocks/featuredContent.mock';

export default function FeaturedContentScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Estado para likes/dislikes e completed
  const [userActions, setUserActions] = useState<{
    [key: string]: { liked?: boolean; disliked?: boolean; completed?: boolean };
  }>({});

  const filteredContent =
    selectedCategory === 'all'
      ? ALL_FEATURED_CONTENT
      : ALL_FEATURED_CONTENT.filter((item) => item.categoryId === selectedCategory);

  const handleCardPress = (item: typeof ALL_FEATURED_CONTENT[0]) => {
    if (item.type === 'video') {
      const video: Omit<Video, 'id'> & { id: string | number } = {
        id: item.id,
        title: item.title,
        author: item.author,
        duration: item.duration,
        category: item.category,
        image: item.image,
        description: 'Este é um vídeo completo sobre ' + item.title + '. Aprenda com especialistas e desenvolva suas habilidades de forma prática e envolvente.',
        videoUrl: (item as any).videoUrl || '',
      };
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
    } else {
      router.push({
        pathname: '/(screens)/article-reader',
        params: {
          id: item.id,
          title: item.title,
          author: item.author,
          duration: item.duration,
          category: item.category,
          image: item.image,
          content: 'Este é um artigo completo sobre ' + item.title + '. Neste conteúdo, você encontrará informações valiosas e práticas para aprimorar seus conhecimentos na área. O material foi cuidadosamente preparado por ' + item.author + ' com foco em qualidade e aplicação prática.\n\nAproveite a leitura e bons estudos!',
        },
      });
    }
  };

  const handleLike = (itemId: string, e: any) => {
    e.stopPropagation();
    setUserActions((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        liked: !prev[itemId]?.liked,
        disliked: false, // Remove dislike se existir
      },
    }));
  };

  const handleDislike = (itemId: string, e: any) => {
    e.stopPropagation();
    setUserActions((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        disliked: !prev[itemId]?.disliked,
        liked: false, // Remove like se existir
      },
    }));
  };

  const handleToggleCompleted = (itemId: string, e: any) => {
    e.stopPropagation();
    setUserActions((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        completed: !prev[itemId]?.completed,
      },
    }));
  };

  const renderCard = (item: typeof ALL_FEATURED_CONTENT[0], index: number) => {
    const actions = userActions[item.id] || {};
    
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleCardPress(item)}
      >
        <Card style={styles.card}>
          <CardContent style={styles.cardContent}>
            {/* Imagem grande em cima */}
            <Image source={{ uri: item.image }} style={styles.cardImage} contentFit="cover" transition={300} />
            {/* Gradient overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              locations={[0.3, 1]}
              style={styles.imageGradient}
            />

            {/* Badge de categoria no canto superior esquerdo da imagem */}
            <View style={styles.imageBadgeContainer}>
              <Badge variant="default" style={styles.categoryBadge}>
                {item.category}
              </Badge>
            </View>

            {/* Informações embaixo */}
            <View style={styles.cardInfo}>
              {/* Título */}
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>

              {/* Autor */}
              <Text style={styles.cardAuthor} numberOfLines={1}>
                por {item.author}
              </Text>

              {/* Meta com duração */}
              <View style={styles.cardMeta}>
                <View style={styles.metaItem}>
                  <Clock size={12} color={tokens.colors.mutedForeground} />
                  <Text style={styles.metaText}>{item.duration}</Text>
                </View>
              </View>

              {/* Action buttons - Like, Dislike, Completed */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={(e) => handleLike(item.id, e)}
                  activeOpacity={0.7}
                >
                  <ThumbsUp
                    size={16}
                    color={actions.liked ? tokens.colors.primary : tokens.colors.mutedForeground}
                    fill={actions.liked ? tokens.colors.primary : 'transparent'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={(e) => handleDislike(item.id, e)}
                  activeOpacity={0.7}
                >
                  <ThumbsDown
                    size={16}
                    color={actions.disliked ? tokens.colors.destructive : tokens.colors.mutedForeground}
                    fill={actions.disliked ? tokens.colors.destructive : 'transparent'}
                  />
                </TouchableOpacity>

                <View style={styles.actionDivider} />

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={(e) => handleToggleCompleted(item.id, e)}
                  activeOpacity={0.7}
                >
                  <CheckCircle
                    size={16}
                    color={actions.completed ? tokens.colors.success : tokens.colors.mutedForeground}
                    fill={actions.completed ? tokens.colors.success : 'transparent'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </CardContent>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7c3aed" />

      {/* Header com Gradiente Roxo - Fixed */}
      <LinearGradient
        colors={['#7c3aed', '#8b5cf6', '#a855f7']}
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
              <Text style={styles.headerTitle}>Conteúdo Destacado</Text>
              <Text style={styles.headerSubtitle}>{filteredContent.length} conteúdos disponíveis</Text>
            </View>
          </View>

          {/* Category Tabs dentro do header roxo */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}
            style={styles.tabsScroll}
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.tab,
                    isSelected ? styles.tabActive : styles.tabInactive,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                  activeOpacity={0.7}
                >
                  <Text style={isSelected ? styles.tabTextActive : styles.tabTextInactive}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </FadeIn>
      </LinearGradient>

      {/* Content Grid */}
      <ScrollView
        //style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {filteredContent.map((item, index) => {
            if (index % 2 === 0) {
              const nextItem = filteredContent[index + 1];
              return (
                <View key={`row-${index}`} style={styles.row}>
                  <View style={styles.cardWrapper}>
                    {renderCard(item, index)}
                  </View>
                  {nextItem && (
                    <View style={styles.cardWrapper}>
                      {renderCard(nextItem, index + 1)}
                    </View>
                  )}
                </View>
              );
            }
            return null;
          })}
        </View>
      </ScrollView>
    </View>
  );
}