import { FadeIn } from '@/src/components/animated';
import { Badge, Card, CardContent } from '@/src/components/ui';
import { UniversalVideoPlayer } from '@/src/components/UniversalVideoPlayer';
import { tokens } from '@/src/constants//tokens';
import { extractDomain, isValidUrl } from '@/src/utils/media-utils';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle, Clock, ExternalLink, ThumbsDown, ThumbsUp } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { styles } from '@/src/styles/universalVideoPlayer.styles';


export default function VideoPlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse video data from params
  const video = {
    id: Number(params.id) || 0,
    title: params.title as string || '',
    author: params.author as string || '',
    duration: params.duration as string || '',
    category: params.category as string || '',
    image: params.image as string || '',
    description: params.description as string || params.content as string || '',
    videoUrl: params.videoUrl as string || '', // URL real do vídeo
  };

  const [liked, setLiked] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);

  // Verifica se tem URL válida de vídeo
  const hasValidVideoUrl = isValidUrl(video.videoUrl);

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header - Absolute over video */}
      <FadeIn delay={0} duration={300}>
        <View style={styles.headerAbsolute}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            {hasValidVideoUrl && (
              <View style={styles.sourceIndicator}>
                <ExternalLink size={14} color="#fff" />
                <Text style={styles.sourceText}>{extractDomain(video.videoUrl)}</Text>
              </View>
            )}
            <View style={styles.durationContainer}>
              <Clock size={18} color="#fff" />
              <Text style={styles.durationText}>{video.duration}</Text>
            </View>
          </View>
        </View>
      </FadeIn>

      {/* Video Player universal */}
      {hasValidVideoUrl ? (
        <FadeIn delay={100} duration={400}>
          <UniversalVideoPlayer
            url={video.videoUrl}
            onError={(error) => console.error('Video error:', error)}
            style={styles.videoContainer}
          />
        </FadeIn>
      ) : (
        // Fallback: Placeholder com imagem
        <FadeIn delay={100} duration={400}>
          <View style={styles.videoContainer}>
            <Image 
              source={{ uri: video.image }}
              style={styles.videoPoster}
              contentFit="cover"
              transition={300}
            />
            <View style={styles.videoOverlay}>
              <View style={styles.placeholderBadge}>
                <Text style={styles.placeholderText}>Vídeo de demonstração</Text>
              </View>
            </View>
          </View>
        </FadeIn>
      )}

      {/* Content - Scrollable */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FadeIn delay={200} duration={400}>
          <View style={styles.content}>
            {/* Category Badge */}
            <Badge variant="default" style={styles.categoryBadge}>
              {video.category}
            </Badge>

            {/* Title */}
            <Text style={styles.title}>{video.title}</Text>

            {/* Author */}
            <Text style={styles.author}>Por {video.author}</Text>

            {/* Description Section */}
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionTitle}>Sobre este vídeo</Text>
              <Text style={styles.descriptionText}>{video.description}</Text>
            </View>

            {/* Interaction Section */}
            <Card style={styles.interactionCard}>
              <CardContent style={styles.interactionContent}>
                {/* Like/Dislike */}
                <FadeIn delay={300} duration={400}>
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
                <FadeIn delay={400} duration={400}>
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
    </View>
  );
}

