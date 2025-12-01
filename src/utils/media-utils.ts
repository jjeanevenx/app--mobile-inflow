/**
 * MEDIA UTILITIES
 * Funções para detectar e processar URLs de vídeos e artigos
 */

export type VideoType = 'youtube' | 'vimeo' | 'direct' | 'webview';
export type ContentType = 'video' | 'article';

/**
 * Detecta o tipo de vídeo baseado na URL
 */
export function getVideoType(url: string): VideoType {
  if (!url) return 'webview';
  
  const urlLower = url.toLowerCase();
  
  // YouTube
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return 'youtube';
  }
  
  // Vimeo
  if (urlLower.includes('vimeo.com')) {
    return 'vimeo';
  }
  
  // Vídeo direto (mp4, mov, webm, m3u8)
  if (urlLower.match(/\.(mp4|mov|webm|m3u8|mkv|avi)(\?.*)?$/i)) {
    return 'direct';
  }
  
  // Fallback para WebView
  return 'webview';
}

/**
 * Extrai o ID do vídeo do YouTube
 * Suporta vários formatos:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/i,
    /(?:youtu\.be\/)([^?]+)/i,
    /(?:youtube\.com\/embed\/)([^?]+)/i,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Extrai o ID do vídeo do Vimeo
 * Suporta vários formatos:
 * - https://vimeo.com/VIDEO_ID
 * - https://player.vimeo.com/video/VIDEO_ID
 */
export function extractVimeoId(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:vimeo\.com\/)(\d+)/i,
    /(?:player\.vimeo\.com\/video\/)(\d+)/i,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Valida se a URL é válida
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Normaliza URL de vídeo para formato embed
 */
export function normalizeVideoUrl(url: string): string {
  const type = getVideoType(url);
  
  if (type === 'youtube') {
    const videoId = extractYouTubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }
  
  if (type === 'vimeo') {
    const videoId = extractVimeoId(url);
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  }
  
  return url;
}

/**
 * Extrai domínio da URL para exibição
 */
export function extractDomain(url: string): string {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}
