import { Logo } from '@/src/components/Logo';
import { Badge, Card, CardContent, Progress } from '@/src/components/ui';
import { colors } from '@/src/utils/colors';
import { Bell, ChevronRight, Map, Newspaper, TrendingUp } from 'lucide-react-native';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

// Mock data
const FEATURED_CONTENT = [
  { id: '1', title: 'Introdução ao React Native', category: 'Tecnologia', progress: 75 },
  { id: '2', title: 'Design Thinking na Prática', category: 'Design', progress: 30 },
  { id: '3', title: 'Marketing Digital Avançado', category: 'Marketing', progress: 50 },
];

const CONTINUE_WATCHING = [
  {
    id: '1',
    title: 'React Native Avançado',
    progress: 45,
    duration: '2h 30min',
    thumbnail: 'https://via.placeholder.com/120x80',
  },
  {
    id: '2',
    title: 'UX/UI Design',
    progress: 70,
    duration: '1h 45min',
    thumbnail: 'https://via.placeholder.com/120x80',
  },
];

export function HomeScreen({ navigation }: HomeScreenProps) {
  const renderFeaturedItem = ({ item, index }: any) => (
    <Card style={[styles.featuredCard, index === 0 && styles.firstCard]}>
      <CardContent style={styles.featuredContent}>
        <View style={styles.featuredHeader}>
          <Badge variant="default">{item.category}</Badge>
          <Text style={styles.featuredProgress}>{item.progress}%</Text>
        </View>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <Progress value={item.progress} style={styles.progress} />
      </CardContent>
    </Card>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Logo variant="icon" size="md" />
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={colors.text} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Olá, João! 👋</Text>
          <Text style={styles.subgreeting}>O que vamos aprender hoje?</Text>
        </View>

        {/* Featured Carousel */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destaques</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            horizontal
            data={FEATURED_CONTENT}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
          />
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity style={styles.quickAccessCard}>
              <View style={[styles.quickAccessIcon, { backgroundColor: '#e0e7ff' }]}>
                <Newspaper size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickAccessText}>Notícias</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessCard}>
              <View style={[styles.quickAccessIcon, { backgroundColor: '#f3e8ff' }]}>
                <Map size={24} color={colors.secondary} />
              </View>
              <Text style={styles.quickAccessText}>Trilhas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessCard}>
              <View style={[styles.quickAccessIcon, { backgroundColor: '#dcfce7' }]}>
                <TrendingUp size={24} color={colors.success} />
              </View>
              <Text style={styles.quickAccessText}>Jornada</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Watching */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continuar Assistindo</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {CONTINUE_WATCHING.map((item) => (
            <Card key={item.id} style={styles.contentCard}>
              <CardContent style={styles.contentCardContent}>
                <View style={styles.thumbnail} />
                <View style={styles.contentInfo}>
                  <Text style={styles.contentTitle}>{item.title}</Text>
                  <Text style={styles.contentDuration}>{item.duration}</Text>
                  <Progress value={item.progress} style={styles.contentProgress} />
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Upcoming Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximos Cursos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.upcomingCard}>
            <CardContent style={styles.upcomingContent}>
              <Badge variant="secondary">Em breve</Badge>
              <Text style={styles.upcomingTitle}>IA Generativa para Desenvolvedores</Text>
              <Text style={styles.upcomingDate}>Lançamento: 15 de Dezembro</Text>
            </CardContent>
          </Card>
        </View>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  greetingContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subgreeting: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  carouselContent: {
    paddingLeft: 24,
    paddingRight: 12,
  },
  featuredCard: {
    width: 280,
    marginRight: 12,
  },
  firstCard: {
    marginLeft: 0,
  },
  featuredContent: {
    padding: 16,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  progress: {
    marginTop: 4,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAccessText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  contentCard: {
    marginHorizontal: 24,
    marginBottom: 12,
  },
  contentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  contentDuration: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  contentProgress: {
    height: 4,
  },
  upcomingCard: {
    marginHorizontal: 24,
  },
  upcomingContent: {
    padding: 16,
    gap: 8,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  upcomingDate: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
