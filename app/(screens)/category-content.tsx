import { FadeIn } from '@/src/components/animated';
import { Badge, Card, CardContent } from '@/src/components/ui';
import { images } from '@/src/constants/images';
import { tokens } from '@/src/constants/tokens';
import { Video } from '@/src/models/Video';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Clock } from 'lucide-react-native';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Mock data - Mesmo conteúdo da tela de Descobrir
const CONTENT_BY_CATEGORY: { [key: string]: any[] } = {
  tech: [
    {
      id: '1',
      title: 'IA Generativa: Fundamentos e Aplicações',
      category: 'Tecnologia',
      categoryId: 'tech',
      author: 'Dr. Roberto Almeida',
      duration: '45 min',
      image: images.aiGenerative,
      level: 'Intermediário',
      type: 'video',
      description: 'Aprenda os conceitos básicos de IA e Machine Learning',
    },
    {
      id: '2',
      title: 'Blockchain e Web3',
      category: 'Tecnologia',
      categoryId: 'tech',
      author: 'Prof. Ricardo Lima',
      duration: '4h 15min',
      image: images.blockchain,
      level: 'Avançado',
      type: 'article',
      description: 'Introdução completa ao mundo blockchain',
    },
    {
      id: '3',
      title: 'Cloud Computing e AWS',
      category: 'Tecnologia',
      categoryId: 'tech',
      author: 'Carlos Henrique',
      duration: '30 min',
      image: images.blockchain,
      level: 'Intermediário',
      type: 'video',
      description: 'Introdução aos serviços AWS essenciais',
    },
  ],
  design: [
    {
      id: '4',
      title: 'Design System do Zero',
      category: 'Design',
      categoryId: 'design',
      author: 'Marina Costa',
      duration: '2h 30min',
      image: images.designSystem,
      level: 'Avançado',
      type: 'article',
      description: 'Crie design systems escaláveis e consistentes',
    },
    {
      id: '5',
      title: 'UX Design Moderno',
      category: 'Design',
      categoryId: 'design',
      author: 'Marina Costa',
      duration: '3h 00min',
      image: images.uxDesign,
      level: 'Iniciante',
      type: 'video',
      description: 'Fundamentos de experiência do usuário',
    },
  ],
  business: [
    {
      id: '6',
      title: 'Estratégias de Produto Digital',
      category: 'Negócios',
      categoryId: 'business',
      author: 'Paula Ferreira',
      duration: '3h 20min',
      image: images.business,
      level: 'Intermediário',
      type: 'video',
      description: 'Técnicas para negociações eficazes',
    },
  ],
  marketing: [
    {
      id: '7',
      title: 'Growth Hacking Avançado',
      category: 'Marketing',
      categoryId: 'marketing',
      author: 'Carlos Henrique',
      duration: '1h 45min',
      image: images.marketing,
      level: 'Intermediário',
      type: 'video',
      description: 'Conquiste clientes na era digital',
    },
    {
      id: '8',
      title: 'Marketing Digital Estratégico',
      category: 'Marketing',
      categoryId: 'marketing',
      author: 'Roberto Santos',
      duration: '2h 45min',
      image: images.digitalMarketing,
      level: 'Intermediário',
      type: 'article',
      description: 'Estratégias avançadas de marketing digital',
    },
  ],
  data: [
    {
      id: '9',
      title: 'Data Science com Python',
      category: 'Dados',
      categoryId: 'data',
      author: 'Dr. João Silva',
      duration: '5h 45min',
      image: images.dataPython,
      level: 'Avançado',
      type: 'article',
      description: 'Análise de dados com Python e Pandas',
    },
  ],
  education: [
    {
      id: '10',
      title: 'Metodologia Ativa de Ensino',
      category: 'Educação',
      categoryId: 'education',
      author: 'Profa. Ana Paula',
      duration: '2h 15min',
      image: images.education,
      level: 'Intermediário',
      type: 'video',
      description: 'Técnicas modernas de ensino e aprendizagem',
    },
    {
      id: '11',
      title: 'Psicologia da Aprendizagem',
      category: 'Educação',
      categoryId: 'education',
      author: 'Dr. Pedro Santos',
      duration: '3h 30min',
      image: images.learning,
      level: 'Avançado',
      type: 'article',
      description: 'Como funciona o processo de aprendizado',
    },
    {
      id: '12',
      title: 'Tecnologia na Sala de Aula',
      category: 'Educação',
      categoryId: 'education',
      author: 'Prof. Marcos Lima',
      duration: '1h 45min',
      image: images.workspace,
      level: 'Iniciante',
      type: 'video',
      description: 'Ferramentas digitais para educadores',
    },
  ],
};

const CATEGORY_COLORS: { [key: string]: string[] } = {
  tech: [tokens.colors.primary, '#8b5cf6'],
  design: ['#3b82f6', '#06b6d4'],
  business: ['#f97316', '#ef4444'],
  marketing: ['#ec4899', '#f43f5e'],
  data: ['#10b981', '#14b8a6'],
  education: ['#65a30d', '#84cc16'],
};

const CATEGORY_NAMES: { [key: string]: string } = {
  tech: 'Tecnologia',
  design: 'Design',
  business: 'Negócios',
  marketing: 'Marketing',
  data: 'Dados',
  education: 'Educação',
};

const CATEGORY_ICONS: { [key: string]: string } = {
  tech: '💻',
  design: '🎨',
  business: '💼',
  marketing: '📊',
  data: '📈',
  education: '📚',
};

export default function CategoryContentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const categoryId = params.categoryId as string;

  const contents = CONTENT_BY_CATEGORY[categoryId] || [];
  const categoryName = CATEGORY_NAMES[categoryId] || 'Categoria';
  const categoryIcon = CATEGORY_ICONS[categoryId] || '📚';
  const colors = (CATEGORY_COLORS[categoryId] || [tokens.colors.primary, '#8b5cf6']) as [string, string, ...string[]];

  const handleCardPress = (item: typeof contents[0]) => {
    if (item.type === 'video') {
      const video: Omit<Video, 'id'> & { id: string | number } = {
        id: item.id,
        title: item.title,
        author: item.author,
        duration: item.duration,
        category: item.category,
        image: item.image,
        description: `Este é um vídeo completo sobre ${item.title}. ${item.description}`,
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
          content: `Este é um artigo completo sobre ${item.title}. ${item.description} O material foi cuidadosamente preparado por ${item.author} com foco em qualidade e aplicação prática.\n\nAproveite a leitura e bons estudos!`,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors[0]} />
      
      {/* Header com gradiente */}
      <LinearGradient
        colors={colors}
        style={styles.header}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ChevronLeft size={28} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.categoryIcon}>{categoryIcon}</Text>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>{categoryName}</Text>
              <Text style={styles.headerSubtitle}>
                {contents.length} conteúdos disponíveis
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {contents.map((item, index) => (
          <FadeIn key={item.id} delay={index * 60} duration={400} direction="up">
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.contentCardWrapper}
              onPress={() => handleCardPress(item)}
            >
              <Card style={styles.contentCard}>
                <CardContent style={styles.cardContent}>
                  {/* Imagem grande em cima */}
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                    contentFit="cover"
                    transition={300}
                  />
                  {/* Gradient overlay na imagem */}
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    locations={[0.3, 1]}
                    style={styles.imageGradient}
                  />
                  {/* Informações embaixo */}
                  <View style={styles.cardInfo}>
                    <View style={styles.cardHeader}>
                      <Badge variant="default" style={styles.categoryBadge}>
                        {item.category}
                      </Badge>
                      <Badge variant="secondary" style={styles.levelBadge}>
                        {item.level}
                      </Badge>
                    </View>
                    <Text style={styles.cardTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.cardDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                    <Text style={styles.cardAuthor} numberOfLines={1}>
                      por {item.author}
                    </Text>
                    <View style={styles.cardMeta}>
                      <View style={styles.metaItem}>
                        <Clock size={12} color={tokens.colors.mutedForeground} />
                        <Text style={styles.metaText}>{item.duration}</Text>
                      </View>
                    </View>
                  </View>
                </CardContent>
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
    paddingBottom: tokens.spacing.xl,
    paddingHorizontal: tokens.spacing.lg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  categoryIcon: {
    fontSize: 48,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.lg,
    paddingBottom: tokens.spacing['2xl'],
  },
  contentCardWrapper: {
    marginBottom: tokens.spacing.md,
  },
  contentCard: {
    overflow: 'hidden',
  },
  cardContent: {
    padding: 0,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: tokens.colors.muted,
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  cardInfo: {
    padding: tokens.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: tokens.colors.foreground,
    marginBottom: 4,
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: 13,
    color: tokens.colors.mutedForeground,
    marginBottom: 4,
    lineHeight: 18,
  },
  cardAuthor: {
    fontSize: 13,
    color: tokens.colors.mutedForeground,
    marginBottom: tokens.spacing.sm,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: tokens.colors.mutedForeground,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: tokens.spacing.xl,
  },
});