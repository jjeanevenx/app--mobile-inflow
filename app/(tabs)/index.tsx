import { FadeIn } from "@/src/components/animated";
import {
  Badge,
  Card,
  Progress
} from "@/src/components/ui";
import { tokens } from "@/src/constants/tokens";
import { useAuth } from "@/src/hooks/useAuth";
import { Video } from "@/src/models/Video";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  Clock,
  FileText,
  Map,
  Newspaper,
  Play,
  Search,
  Settings,
  Trophy,
} from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CONTINUE_WATCHING,
  FEATURED_CATEGORIES,
  FEATURED_CONTENT,
} from "@/src/mocks/HomeScreen.mock";

import { styles } from '@/src/styles/homeScreen.styles';




export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] =
    React.useState("1");

  const handleNavigateToVideo = (item: Omit<Video, 'id'> & { id: string | number }) => {
    router.push({
      pathname: "/(screens)/video-player",
      params: {
        id: String(item.id),
        title: item.title,
        author: item.author,
        duration: item.duration,
        category: item.category,
        image: item.image,
        description: item.description || (item as any).content || '',
        videoUrl: item.videoUrl || "",
      },
    });
  };

  const handleNavigateToArticle = (item: any) => {
    router.push({
      pathname: "/(screens)/article-reader",
      params: {
        id: item.id,
        title: item.title,
        author: item.author,
        duration: item.duration,
        category: item.category,
        image: item.image,
        content: item.content,
        articleUrl: item.articleUrl || "",
      },
    });
  };

  const handleContinueItem = (item: any) => {
    if (item.type === "Vídeo") {
      handleNavigateToVideo(item);
    } else {
      handleNavigateToArticle(item);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6366F1"
      />

      {/* Header com Gradiente Roxo */}
      <LinearGradient
        colors={["#6366F1", "#8B5CF6", "#A855F7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <FadeIn delay={0} duration={300}>
          {/* Top Bar: Título + Ícones */}
          <View style={styles.topBar}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>
                Oi{"\n"}
                {user?.displayName || ""}
              </Text>
            </View>

            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.push("/(tabs)/discover")}
              >
                <Search size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.push("/(screens)/settings")}
              >
                <Settings size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <Bell size={24} color="#fff" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
            </View>
          </View>
        </FadeIn>

        <FadeIn delay={100} duration={400}>
          {/* Quick Access Cards */}
          <View style={styles.quickAccessContainer}>
            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() => router.push("/(screens)/news")}
            >
              <View style={styles.quickAccessIconContainer}>
                <Newspaper
                  size={24}
                  color={tokens.colors.primary}
                />
              </View>
              <Text style={styles.quickAccessLabel}>
                Notícias
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() => router.push("/(screens)/learning-paths")}
            >
              <View style={styles.quickAccessIconContainer}>
                <Map size={24} color={tokens.colors.primary} />
              </View>
              <Text style={styles.quickAccessLabel}>
                Trilhas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() =>
                router.push("/(screens)/journey")
              }
            >
              <View style={styles.quickAccessIconContainer}>
                <Trophy
                  size={24}
                  color={tokens.colors.primary}
                />
              </View>
              <Text style={styles.quickAccessLabel}>
                Minha{"\n"}Jornada
              </Text>
            </TouchableOpacity>
          </View>
        </FadeIn>
      </LinearGradient>

      {/* Content Area - Scrollável */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: tokens.spacing["2xl"] + 60 + Math.max(insets.bottom - 8, 0) }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Continue de onde parou */}
        <FadeIn delay={200} duration={400}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  Continue de onde parou
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Retome a leitura de onde parou
                </Text>
              </View>
              <TouchableOpacity style={styles.seeAllButton}
                onPress={() => router.push('/(screens)/continue-watching')}
                  activeOpacity={0.7}
              >
                <Text style={styles.seeAllText}>Ver todos</Text>
                <ChevronRight
                  size={16}
                  color={tokens.colors.primary}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {CONTINUE_WATCHING.map((item, index) => (
                <FadeIn
                  key={item.id}
                  delay={300 + index * 50}
                  duration={400}
                >
                  <TouchableOpacity
                    style={styles.continueCard}
                    onPress={() => handleContinueItem(item)}
                    activeOpacity={0.7}
                  >
                    <Card
                      style={styles.continueCardInner}
                    >
                      <View style={styles.continueCardContent}>
                        {/* Thumbnail com Badge de Progresso */}
                        <View style={styles.thumbnailContainer}>
                          <Image
                            source={{ uri: item.image }}
                            style={styles.thumbnail}
                            contentFit="cover"
                          />
                          <Badge
                            variant="default"
                            style={styles.progressBadge}
                          >
                            {item.progress}%
                          </Badge>
                        </View>

                        {/* Info Section */}
                        <View style={styles.continueInfo}>
                          {/* Type Badge */}
                          <View
                            style={styles.typeBadgeContainer}
                          >
                            {item.type === "Vídeo" ? (
                              <Play
                                size={16}
                                color={tokens.colors.primary}
                              />
                            ) : (
                              <FileText
                                size={16}
                                color={tokens.colors.primary}
                              />
                            )}
                            <Text style={styles.typeBadgeText}>
                              {item.type}
                            </Text>
                          </View>

                          {/* Title */}
                          <Text
                            style={styles.continueTitle}
                            numberOfLines={2}
                          >
                            {item.title}
                          </Text>

                          {/* Author */}
                          <Text
                            style={styles.continueAuthor}
                            numberOfLines={1}
                          >
                            {item.author}
                          </Text>

                          {/* Duration */}
                          <View
                            style={styles.durationContainer}
                          >
                            <Clock
                              size={12}
                              color={
                                tokens.colors.mutedForeground
                              }
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
            </ScrollView>
          </View>
        </FadeIn>

        {/* Conteúdo Destacado */}
        <FadeIn delay={400} duration={400}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  Conteúdo Destacado
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Explore por categoria
                </Text>
              </View>
              <TouchableOpacity
                style={styles.seeAllButton}
                onPress={() => router.push('/(screens)/featured-content')}
                activeOpacity={0.7}
              >
                <Text style={styles.seeAllText}>Ver todos</Text>
                <ChevronRight
                  size={16}
                  color={tokens.colors.primary}
                />
              </TouchableOpacity>
            </View>

            {/* Category Pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {FEATURED_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryPill,
                    selectedCategory === cat.id &&
                      styles.categoryPillActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text
                    style={[
                      styles.categoryPillText,
                      selectedCategory === cat.id &&
                        styles.categoryPillTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Featured Cards */}
            <View style={styles.featuredGrid}>
              {FEATURED_CONTENT.map((item, index) => (
                <FadeIn
                  key={item.id}
                  delay={500 + index * 50}
                  duration={400}
                >
                  <TouchableOpacity
                    style={styles.featuredCard}
                    activeOpacity={0.7}
                  >
                    <Card style={styles.featuredCardInner}>
                      {/* Imagem com badge de categoria */}
                      <View style={styles.featuredImageContainer}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.featuredImage}
                          contentFit="cover"
                        />
                        <Badge
                          variant="default"
                          style={styles.categoryBadge}
                        >
                          {item.category}
                        </Badge>
                      </View>

                      {/* Informações do card */}
                      <View style={styles.featuredInfo}>
                        <Text
                          style={styles.featuredTitle}
                          numberOfLines={2}
                        >
                          {item.title}
                        </Text>
                        <Text
                          style={styles.featuredAuthor}
                          numberOfLines={1}
                        >
                          {item.author}
                        </Text>
                        <View style={styles.featuredDuration}>
                          <Clock
                            size={12}
                            color={tokens.colors.mutedForeground}
                          />
                          <Text style={styles.featuredDurationText}>
                            {item.duration}
                          </Text>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                </FadeIn>
              ))}
            </View>
          </View>
        </FadeIn>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

