import { FadeIn } from "@/src/components/animated";
import {
  Badge,
  Card,
  Progress
} from "@/src/components/ui";
import { images } from "@/src/constants/images";
import { tokens } from "@/src/constants/tokens";
import { useAuth } from "@/src/hooks/useAuth";
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
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get("window");

// Mock Data - Continue de onde parou
const CONTINUE_WATCHING = [
  {
    id: "1",
    title: "Inteligência Artificial para Negócios",
    author: "Dr. Ana Paula Santos",
    progress: 65,
    duration: "45 min",
    image: images.business,
    type: "Vídeo",
    category: "Negócios",
    content:
      "Aprenda como a Inteligência Artificial está transformando o mundo dos negócios.",
    videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
  },
  {
    id: "2",
    title: "Blockchain e Web3",
    author: "Prof. Ricardo Lima",
    progress: 40,
    duration: "1h 15min",
    image: images.blockchain,
    type: "Artigo",
    category: "Tecnologia",
    content: "Explore os fundamentos da tecnologia blockchain.",
    articleUrl: "https://www.cnnbrasil.com.br/tecnologia/",
  },
];

// Mock Data - Conteúdo Destacado (categorias)
const FEATURED_CATEGORIES = [
  { id: "1", name: "Todos", active: true },
  { id: "2", name: "Tecnologia", active: false },
  { id: "3", name: "Negócios", active: false },
  { id: "4", name: "Design", active: false },
];

const FEATURED_CONTENT = [
  {
    id: "1",
    title: "IA Generativa: Fundamentos",
    category: "Tecnologia",
    image: images.ai,
  },
  {
    id: "2",
    title: "Liderança Moderna",
    category: "Negócios",
    image: images.business,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] =
    React.useState("1");

  const handleNavigateToVideo = (item: any) => {
    router.push({
      pathname: "/(screens)/video-player",
      params: {
        id: item.id,
        title: item.title,
        author: item.author,
        duration: item.duration,
        category: item.category,
        image: item.image,
        description: item.content,
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
                Olá,{"\n"}
                {user?.displayName || "Usuário Google"}!
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
                onPress={() => router.push("/(tabs)/profile")}
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
              onPress={() => router.push("/(tabs)/discover")}
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
              onPress={() => router.push("/(screens)/learn")}
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
              <TouchableOpacity style={styles.seeAllButton}>
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
              <TouchableOpacity style={styles.seeAllButton}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  headerGradient: {
    paddingTop: 48,
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.lg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: tokens.spacing["2xl"],
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#fff",
    lineHeight: 32,
  },
  headerIcons: {
    flexDirection: "row",
    gap: tokens.spacing.md,
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FB2C36",
    borderWidth: 1.333,
    borderColor: "#fff",
  },
  quickAccessContainer: {
    flexDirection: "row",
    gap: tokens.spacing.md,
    justifyContent: "space-between",
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 0,
    alignItems: "center",
    gap: tokens.spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    minHeight: 131,
  },
  quickAccessIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  quickAccessLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.colors.foreground,
    textAlign: "center",
    lineHeight: 17.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: tokens.spacing.xl,
    paddingBottom: tokens.spacing["2xl"],
  },
  section: {
    marginBottom: tokens.spacing["2xl"],
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: tokens.colors.foreground,
    marginBottom: 4,
    lineHeight: 28,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.colors.mutedForeground,
    lineHeight: 20,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.colors.primary,
  },
  horizontalScroll: {
    paddingHorizontal: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  continueCard: {
    width: 320,
  },
  continueCardInner: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
  },
  continueCardContent: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
  },
  thumbnailContainer: {
    width: 96,
    height: 128,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  progressBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#F0B100",
    borderWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  continueInfo: {
    flex: 1,
    paddingTop: 4,
    gap: tokens.spacing.sm,
  },
  typeBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.xs,
  },
  typeBadgeText: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.colors.primary,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: tokens.colors.foreground,
    lineHeight: 20,
  },
  continueAuthor: {
    fontSize: 12,
    fontWeight: "400",
    color: tokens.colors.mutedForeground,
    lineHeight: 16,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    fontWeight: "400",
    color: tokens.colors.mutedForeground,
  },
  progressBarContainer: {
    height: 6,
  },
  progressBar: {
    height: 6,
    borderRadius: 0,
  },
  categoryScroll: {
    paddingHorizontal: tokens.spacing.lg,
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.lg,
  },
  categoryPill: {
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.sm,
    borderRadius: 20,
    backgroundColor: tokens.colors.muted,
  },
  categoryPillActive: {
    backgroundColor: tokens.colors.primary,
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: "500",
    color: tokens.colors.mutedForeground,
  },
  categoryPillTextActive: {
    color: "#fff",
  },
  featuredGrid: {
    flexDirection: "row",
    paddingHorizontal: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  featuredCard: {
    width:
      (width - tokens.spacing.lg * 2 - tokens.spacing.md) / 2,
    aspectRatio: 1,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: tokens.colors.primary + "90",
    borderWidth: 0,
  },
  bottomSpacer: {
    height: tokens.spacing["2xl"],
  },
});