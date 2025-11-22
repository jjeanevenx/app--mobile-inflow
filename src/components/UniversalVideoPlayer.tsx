/**
 * Reproduz vídeos de qualquer fonte (YouTube, Vimeo, URLs diretos, etc)
 */

import { tokens } from '@/src/constants//tokens';
import {
    extractVimeoId,
    extractYouTubeId,
    getVideoType,
    normalizeVideoUrl
} from '@/src/utils/media-utils';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';

interface UniversalVideoPlayerProps {
  url: string;
  onReady?: () => void;
  onError?: (error: string) => void;
  style?: any;
}

export function UniversalVideoPlayer({
  url,
  onReady,
  onError,
  style,
}: UniversalVideoPlayerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const playing = false;

  const videoType = getVideoType(url);

  const handleError = (errorMsg: string) => {
    setError(errorMsg);
    setLoading(false);
    onError?.(errorMsg);
  };

  const handleReady = () => {
    setLoading(false);
    onReady?.();
  };

  // YouTube Player
  if (videoType === 'youtube') {
    const videoId = extractYouTubeId(url);
    
    if (!videoId) {
      return (
        <View style={[styles.container, style]}>
          <Text style={styles.errorText}>ID do YouTube inválido</Text>
        </View>
      );
    }

    return (
      <View style={[styles.container, style]}>
        <YoutubePlayer
          height={300}
          videoId={videoId}
          play={playing}
          onReady={handleReady}
          onError={(e: string) => handleError(`Erro ao carregar vídeo: ${e}`)}
          webViewProps={{
            androidLayerType: 'hardware',
          }}
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={tokens.colors.primary} />
          </View>
        )}
      </View>
    );
  }

  // Vimeo Player
  if (videoType === 'vimeo') {
    const videoId = extractVimeoId(url);
    
    if (!videoId) {
      return (
        <View style={[styles.container, style]}>
          <Text style={styles.errorText}>ID do Vimeo inválido</Text>
        </View>
      );
    }

    const vimeoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=0&title=0&byline=0&portrait=0`;

    return (
      <View style={[styles.container, style]}>
        <WebView
          source={{ uri: vimeoUrl }}
          style={styles.webview}
          allowsFullscreenVideo
          mediaPlaybackRequiresUserAction={false}
          onLoadEnd={handleReady}
          onError={() => handleError('Erro ao carregar vídeo do Vimeo')}
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={tokens.colors.primary} />
          </View>
        )}
      </View>
    );
  }

  // Direct Video (MP4, MOV, etc)
  if (videoType === 'direct') {
    return (
      <View style={[styles.container, style]}>
        <Video
          source={{ uri: url }}
          style={styles.video}
          controls={true}
          resizeMode="contain"
          onLoad={handleReady}
          onError={() => handleError('Erro ao carregar vídeo')}
          paused={!playing}
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={tokens.colors.primary} />
          </View>
        )}
      </View>
    );
  }

  // WebView Fallback (para outras plataformas)
  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ uri: normalizeVideoUrl(url) }}
        style={styles.webview}
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={false}
        onLoadEnd={handleReady}
        onError={() => handleError('Erro ao carregar vídeo')}
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={tokens.colors.primary} />
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
