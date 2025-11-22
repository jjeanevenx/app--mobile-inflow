import { FadeIn } from '@/src/components/animated';
import { Badge, Card, CardContent } from '@/src/components/ui';
import { RECENT_NEWS, TRENDING_NEWS } from '@/src/mocks/news.mock';
import { Article } from '@/src/models/Article';
import { styles } from '@/src/styles/news.styles';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, Eye, TrendingUp, Zap } from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';





export default function NewsScreen() {
  const router = useRouter();

  const handleNewsPress = (newsItem: Omit<Article, 'id'> & { id: string | number }) => {
    router.push({
      pathname: '/(screens)/article-reader',
      params: {
        id: String(newsItem.id),
        title: newsItem.title,
        author: newsItem.author,
        timeAgo: newsItem.timeAgo,
        duration: newsItem.duration,
        category: newsItem.category,
        description: newsItem.description,
        image: newsItem.image,
        articleUrl: newsItem.articleUrl,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      {/* Header com Gradiente Roxo */}
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
              <Text style={styles.headerTitle}>Notícias</Text>
              <Text style={styles.headerSubtitle}>Últimas atualizações</Text>
            </View>
            <TouchableOpacity style={styles.trendingButton} activeOpacity={0.7}>
              <Zap size={20} color="#FFDF20" fill="#FFDF20" />
            </TouchableOpacity>
          </View>
        </FadeIn>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Última Hora Section */}
        <FadeIn delay={100} duration={400}>
          <View style={styles.sectionHeader}>
            <View style={styles.redBar} />
            <Text style={styles.sectionTitle}>Última Hora</Text>
          </View>
        </FadeIn>

        {/* Trending News Cards */}
        <View style={styles.trendingSection}>
          {TRENDING_NEWS.map((news, index) => (
            <FadeIn key={news.id} delay={200 + index * 100} duration={400}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleNewsPress(news)}
              >
                <Card style={styles.trendingCard}>
                  <CardContent style={styles.trendingCardContent}>
                    {/* Image Container */}
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: news.image }}
                        style={styles.trendingImage}
                        contentFit="cover"
                        transition={300}
                      />
                      {news.trending && (
                        <View style={styles.trendingBadge}>
                          <TrendingUp size={12} color="#FFFFFF" />
                          <Text style={styles.trendingBadgeText}>Em alta</Text>
                        </View>
                      )}
                    </View>

                    {/* Content */}
                    <View style={styles.trendingContent}>
                      <Badge variant="outline" style={styles.categoryBadge}>
                        {news.category}
                      </Badge>
                      <Text style={styles.trendingTitle} numberOfLines={2}>
                        {news.title}
                      </Text>
                      <View style={styles.metaContainer}>
                        <View style={styles.metaItem}>
                          <Clock size={14} color="#717182" />
                          <Text style={styles.metaText}>{news.timeAgo}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Eye size={14} color="#717182" />
                          <Text style={styles.metaText}>{news.views} visualizações</Text>
                        </View>
                      </View>
                    </View>
                  </CardContent>
                </Card>
              </TouchableOpacity>
            </FadeIn>
          ))}
        </View>

        {/* Recentes Section */}
        <FadeIn delay={500} duration={400}>
          <Text style={styles.recentTitle}>Recentes</Text>
        </FadeIn>

        {/* Recent News Cards */}
        <View style={styles.recentSection}>
          {RECENT_NEWS.map((news, index) => (
            <FadeIn key={news.id} delay={600 + index * 100} duration={400}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleNewsPress(news)}
              >
                <Card style={styles.recentCard}>
                  <CardContent style={styles.recentCardContent}>
                    {/* Image */}
                    <Image
                      source={{ uri: news.image }}
                      style={styles.recentImage}
                      contentFit="cover"
                      transition={300}
                    />

                    {/* Content */}
                    <View style={styles.recentContent}>
                      <Badge variant="outline" style={styles.categoryBadgeSmall}>
                        {news.category}
                      </Badge>
                      <Text style={styles.recentNewsTitle} numberOfLines={2}>
                        {news.title}
                      </Text>
                      <View style={styles.recentMeta}>
                        <View style={styles.metaItem}>
                          <Clock size={14} color="#717182" />
                          <Text style={styles.metaText}>{news.timeAgo}</Text>
                        </View>
                        <Text style={styles.metaText}>{news.views}</Text>
                      </View>
                    </View>
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