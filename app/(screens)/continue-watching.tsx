import { Card, Progress } from '@//src/components/ui';
import { FadeIn } from '@/src/components/animated';
import { tokens } from '@/src/constants/tokens';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  BookOpen,
  ChevronLeft,
  Clock,
  FileText,
  Play,
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

import { CONTINUE_WATCHING_DATA } from "@/src/mocks/ContinueWatchingScreen.mock";


export default function ContinueWatchingScreen() {
  const router = useRouter();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Vídeo':
        return <Play size={16} color={tokens.colors.primary} />;
      case 'Artigo':
        return <FileText size={16} color={tokens.colors.primary} />;
      case 'Curso':
      case 'Workshop':
        return <BookOpen size={16} color={tokens.colors.primary} />;
      default:
        return <FileText size={16} color={tokens.colors.primary} />;
    }
  };

  const handleContentClick = (item: any) => {
    if (item.type === 'Vídeo') {
      router.push({
        pathname: '/(screens)/video-player',
        params: {
          id: item.id,
          title: item.title,
          author: item.author,
          duration: item.duration,
          category: item.category,
          image: item.image,
          description: item.content,
          videoUrl: item.videoUrl || '',
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
          content: item.content,
          articleUrl: item.articleUrl || '',
        },
      });
    }
  };

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
              <Text style={styles.headerTitle}>
                Continue de onde parou
              </Text>
              <Text style={styles.headerSubtitle}>
                {CONTINUE_WATCHING_DATA.length} conteúdos em progresso
              </Text>
            </View>

            <View style={styles.headerSpacer} />
          </View>
        </FadeIn>
      </LinearGradient>

      {/* Lista de conteúdos */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CONTINUE_WATCHING_DATA.map((item, index) => (
          <FadeIn key={item.id} delay={100 + index * 50} duration={400}>
            <TouchableOpacity
              style={styles.contentCard}
              onPress={() => handleContentClick(item)}
              activeOpacity={0.7}
            >
              <Card style={styles.cardInner}>
                <View style={styles.cardContent}>
                  {/* Thumbnail com Progress Badge */}
                  <View style={styles.thumbnailContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.thumbnail}
                      contentFit="cover"
                    />
                    <View style={styles.progressBadge}>
                      <Text style={styles.progressBadgeText}>
                        {item.progress}%
                      </Text>
                    </View>
                  </View>

                  {/* Info Section */}
                  <View style={styles.infoSection}>
                    {/* Type Badge */}
                    <View style={styles.typeBadge}>
                      {getTypeIcon(item.type)}
                      <Text style={styles.typeBadgeText}>
                        {item.type}
                      </Text>
                    </View>

                    {/* Title */}
                    <Text style={styles.contentTitle} numberOfLines={2}>
                      {item.title}
                    </Text>

                    {/* Author */}
                    <Text style={styles.contentAuthor} numberOfLines={1}>
                      {item.author}
                    </Text>

                    {/* Duration */}
                    <View style={styles.durationContainer}>
                      <Clock
                        size={12}
                        color={tokens.colors.mutedForeground}
                      />
                      <Text style={styles.durationText}>
                        {item.duration}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                  <Progress
                    value={item.progress}
                    style={styles.progressBar}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          </FadeIn>
        ))}

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: tokens.colors.primaryForeground,
    lineHeight: 28,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  contentCard: {
    marginBottom: 16,
  },
  cardInner: {
    backgroundColor: tokens.colors.card,
    borderRadius: 14,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  thumbnailContainer: {
    width: 96,
    height: 128,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  progressBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#F0B100',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  progressBadgeText: {
    fontSize: 12,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 16,
  },
  infoSection: {
    flex: 1,
    paddingTop: 4,
    gap: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typeBadgeText: {
    fontSize: 14,
    fontWeight: '400',
    color: tokens.colors.primary,
    lineHeight: 20,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: tokens.colors.foreground,
    lineHeight: 20,
  },
  contentAuthor: {
    fontSize: 12,
    fontWeight: '400',
    color: tokens.colors.mutedForeground,
    lineHeight: 16,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '400',
    color: tokens.colors.mutedForeground,
    lineHeight: 16,
  },
  progressBarContainer: {
    height: 6,
  },
  progressBar: {
    height: 6,
    borderRadius: 0,
  },
  bottomSpacer: {
    height: 24,
  },
});
