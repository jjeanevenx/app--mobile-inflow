import { FadeIn } from '@/src/components/animated';
import { Badge, Card, CardContent } from '@/src/components/ui';
import { tokens } from '@/src/constants/tokens';
import { ArticleReader } from '@/src/models/Article';
import { styles } from '@/src/styles/article-reader.styles';
import { extractDomain, isValidUrl } from '@/src/utils/media-utils';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle, Clock, ExternalLink, ThumbsDown, ThumbsUp } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';



export default function ArticleReaderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  
  // Parse article data from params
  const article = {
    id: Number(params.id) || 0,
    title: params.title as string || '',
    author: params.author as string || '',
    duration: params.duration as string || '',
    timeAgo: params.timeAgo as string || '',
    category: params.category as string || '',
    image: params.image as string || '',
    description: params.description as string || params.summary as string || '',
    articleUrl: params.articleUrl as string || params.url || ''
  } as ArticleReader;

  const [liked, setLiked] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [webViewKey, setWebViewKey] = useState(0);

  // Verifica se tem URL válida de artigo
  const hasValidArticleUrl = isValidUrl(article.articleUrl);

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked(liked === true ? null : true);
  };

  const handleDislike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked(liked === false ? null : false);
  };

  const handleComplete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCompleted(!completed);
  };

//   const handleRefresh = () => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     setLoading(true);
//     setWebViewKey(prev => prev + 1);
//   };

  const handleOpenArticleUrl = () => {
    Linking.openURL(article.articleUrl).catch(err => {
      Alert.alert(
        'Erro ao abrir o artigo',
        'Não foi possível abrir o artigo no navegador. Tente novamente mais tarde.',
        [
          { text: 'OK', style: 'cancel' },
        ]
      );
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={tokens.colors.card} />

      {/* Header - Fixed */}
      <FadeIn delay={0} duration={300}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={tokens.colors.foreground} />
          </TouchableOpacity>
          <View style={styles.durationContainer}>
            <Clock size={18} color={tokens.colors.mutedForeground} />
            <Text style={styles.durationText}>{article.timeAgo}</Text>
          </View>
        </View>
      </FadeIn>

      {/* Content - WebView ou Static */}
      {hasValidArticleUrl ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <FadeIn delay={100} duration={400}>
            <View style={styles.content}>
              {/* Category Badge */}
              <Badge variant="default" style={styles.categoryBadge}>
                {article.category}
              </Badge>

              {/* Title */}
              <Text style={styles.title}>{article.title}</Text>

              {/* Author */}
              <Text style={styles.author}>Por {article.author}</Text>

              {/* Featured Image */}
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: article.image }}
                  style={styles.image}
                  contentFit="cover"
                  transition={300}
                />
              </View>
               {/* Article Preview/Summary */}
               <View style={styles.summarySection}>
                <Text style={styles.summaryTitle}>Descrição</Text>
                <Text style={styles.articleContent}>{article.description}</Text>
              </View>

              {/* External Article Notice */}
              <Card style={styles.externalArticleCard}>
                <CardContent style={styles.externalArticleContent}>
                  <View style={styles.externalIconContainer}>
                    <ExternalLink size={24} color={tokens.colors.primary} />
                  </View>
                  <Text style={styles.externalArticleTitle}>Ler a versão completa no site</Text>
                  <Text style={styles.externalArticleDescription}>
                    <Text style={styles.externalArticleDomain}>{extractDomain(article.articleUrl)}</Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.openExternalButton}
                    onPress={handleOpenArticleUrl}
                    activeOpacity={0.8}
                  >
                    <ExternalLink size={18} color="#fff" />
                    <Text style={styles.openExternalButtonText}>Abrir Artigo Completo</Text>
                  </TouchableOpacity>
                  <Text style={styles.externalArticleNote}>
                    O artigo será aberto no navegador
                  </Text>
                </CardContent>
              </Card>

              {/* Interaction Section */}
              <Card style={styles.interactionCard}>
                <CardContent style={styles.interactionContent}>
                  {/* Like/Dislike */}
                  <FadeIn delay={200} duration={400}>
                    <View style={styles.feedbackSection}>
                      <Text style={styles.feedbackLabel}>
                        Este conteúdo foi útil para você?
                      </Text>
                      <View style={styles.feedbackButtons}>
                        <TouchableOpacity
                          style={[
                            styles.feedbackButton,
                            liked === true && styles.likeButtonActive,
                          ]}
                          onPress={handleLike}
                          activeOpacity={0.8}
                        >
                          <ThumbsUp
                            size={20}
                            color={liked === true ? '#fff' : tokens.colors.foreground}
                            fill={liked === true ? '#fff' : 'none'}
                          />
                          <Text
                            style={[
                              styles.feedbackButtonText,
                              liked === true && styles.feedbackButtonTextActive,
                            ]}
                          >
                            Gostei
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.feedbackButton,
                            liked === false && styles.dislikeButtonActive,
                          ]}
                          onPress={handleDislike}
                          activeOpacity={0.8}
                        >
                          <ThumbsDown
                            size={20}
                            color={liked === false ? '#fff' : tokens.colors.foreground}
                            fill={liked === false ? '#fff' : 'none'}
                          />
                          <Text
                            style={[
                              styles.feedbackButtonText,
                              liked === false && styles.feedbackButtonTextActive,
                            ]}
                          >
                            Não gostei
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </FadeIn>

                  {/* Mark as Complete */}
                  <FadeIn delay={300} duration={400}>
                    <TouchableOpacity
                      style={[
                        styles.completeButton,
                        completed && styles.completeButtonActive,
                      ]}
                      onPress={handleComplete}
                      activeOpacity={0.8}
                    >
                      <CheckCircle
                        size={20}
                        color={completed ? '#fff' : tokens.colors.primary}
                        fill={completed ? '#fff' : 'none'}
                      />
                      <Text
                        style={[
                          styles.completeButtonText,
                          completed && styles.completeButtonTextActive,
                        ]}
                      >
                        {completed ? 'Marcado como concluído' : 'Marcar como concluído'}
                      </Text>
                    </TouchableOpacity>
                  </FadeIn>
                </CardContent>
              </Card>

              {/* Bottom Spacing */}
              <View style={styles.bottomSpacer} />
            </View>
          </FadeIn>
        </ScrollView>
      ) : (
        // Fallback: Static content display
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <FadeIn delay={100} duration={400}>
            <View style={styles.content}>
              {/* Category Badge */}
              <Badge variant="default" style={styles.categoryBadge}>
                {article.category}
              </Badge>

              {/* Title */}
              <Text style={styles.title}>{article.title}</Text>

              {/* Author */}
              <Text style={styles.author}>Por {article.author}</Text>

              {/* Featured Image */}
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: article.image }}
                  style={styles.image}
                  contentFit="cover"
                  transition={300}
                />
              </View>
              {/* Interaction Section */}
              <Card style={styles.interactionCard}>
                <CardContent style={styles.interactionContent}>
                  {/* Like/Dislike */}
                  <FadeIn delay={200} duration={400}>
                    <View style={styles.feedbackSection}>
                      <Text style={styles.feedbackLabel}>
                        Este conteúdo foi útil para você?
                      </Text>
                      <View style={styles.feedbackButtons}>
                        <TouchableOpacity
                          style={[
                            styles.feedbackButton,
                            liked === true && styles.likeButtonActive,
                          ]}
                          onPress={handleLike}
                          activeOpacity={0.8}
                        >
                          <ThumbsUp
                            size={20}
                            color={liked === true ? '#fff' : tokens.colors.foreground}
                            fill={liked === true ? '#fff' : 'none'}
                          />
                          <Text
                            style={[
                              styles.feedbackButtonText,
                              liked === true && styles.feedbackButtonTextActive,
                            ]}
                          >
                            Gostei
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.feedbackButton,
                            liked === false && styles.dislikeButtonActive,
                          ]}
                          onPress={handleDislike}
                          activeOpacity={0.8}
                        >
                          <ThumbsDown
                            size={20}
                            color={liked === false ? '#fff' : tokens.colors.foreground}
                            fill={liked === false ? '#fff' : 'none'}
                          />
                          <Text
                            style={[
                              styles.feedbackButtonText,
                              liked === false && styles.feedbackButtonTextActive,
                            ]}
                          >
                            Não gostei
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </FadeIn>

                  {/* Mark as Complete */}
                  <FadeIn delay={300} duration={400}>
                    <TouchableOpacity
                      style={[
                        styles.completeButton,
                        completed && styles.completeButtonActive,
                      ]}
                      onPress={handleComplete}
                      activeOpacity={0.8}
                    >
                      <CheckCircle
                        size={20}
                        color={completed ? '#fff' : tokens.colors.primary}
                        fill={completed ? '#fff' : 'none'}
                      />
                      <Text
                        style={[
                          styles.completeButtonText,
                          completed && styles.completeButtonTextActive,
                        ]}
                      >
                        {completed ? 'Marcado como concluído' : 'Marcar como concluído'}
                      </Text>
                    </TouchableOpacity>
                  </FadeIn>
                </CardContent>
              </Card>

              {/* Bottom Spacing */}
              <View style={styles.bottomSpacer} />
            </View>
          </FadeIn>
        </ScrollView>
      )}
    </View>
  );
}

