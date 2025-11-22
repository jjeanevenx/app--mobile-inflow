import { StyleSheet } from 'react-native';
import { tokens } from '../constants/tokens';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    headerGradient: {
      paddingTop: 12,
      paddingBottom: 32,
      paddingHorizontal: 24,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    statusBarSpacer: {
      height: 24,
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    backButton: {
      padding: 8,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderRadius: 999,
    },
    headerTextContainer: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    headerSubtitle: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
      marginTop: 2,
    },
    trendingButton: {
      width: 40,
      height: 40,
      borderRadius: 999,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentScroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 32,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 24,
      paddingVertical: 24,
      backgroundColor: '#f8f9fa',
    },
    redBar: {
      width: 8,
      height: 24,
      borderRadius: 999,
      backgroundColor: '#fb2c36',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '400',
      color: tokens.colors.foreground,
    },
    trendingSection: {
      gap: 16,
      paddingHorizontal: 24,
      paddingTop: 8,
    },
    trendingCard: {
      overflow: 'hidden',
    },
    trendingCardContent: {
      padding: 16,
      flexDirection: 'row',
      gap: 16,
    },
    imageContainer: {
      position: 'relative',
      borderRadius: 14,
      overflow: 'hidden',
    },
    trendingImage: {
      width: 128,
      height: 128,
      backgroundColor: tokens.colors.muted,
      borderRadius: 14,
    },
    trendingBadge: {
      position: 'absolute',
      top: 8,
      left: 44,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: '#fb2c36',
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderRadius: 8,
    },
    trendingBadgeText: {
      fontSize: 12,
      color: '#FFFFFF',
      fontWeight: '400',
    },
    trendingContent: {
      flex: 1,
      paddingTop: 4,
      gap: 8,
    },
    categoryBadge: {
      alignSelf: 'flex-start',
      backgroundColor: 'transparent',
      borderWidth: 1.33,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    trendingTitle: {
      fontSize: 16,
      fontWeight: '400',
      color: tokens.colors.foreground,
      lineHeight: 20,
    },
    metaContainer: {
      gap: 4,
      marginTop: 'auto',
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    metaText: {
      fontSize: 12,
      color: '#717182',
    },
    recentTitle: {
      fontSize: 20,
      fontWeight: '400',
      color: tokens.colors.foreground,
      paddingHorizontal: 24,
      paddingTop: 32,
      paddingBottom: 16,
    },
    recentSection: {
      gap: 16,
      paddingHorizontal: 24,
    },
    recentCard: {
      overflow: 'hidden',
    },
    recentCardContent: {
      padding: 16,
      flexDirection: 'row',
      gap: 16,
    },
    recentImage: {
      width: 112,
      height: 112,
      backgroundColor: tokens.colors.muted,
      borderRadius: 14,
    },
    recentContent: {
      flex: 1,
      paddingTop: 4,
      gap: 6,
    },
    categoryBadgeSmall: {
      alignSelf: 'flex-start',
      backgroundColor: 'transparent',
      borderWidth: 1.33,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    recentNewsTitle: {
      fontSize: 14,
      fontWeight: '400',
      color: tokens.colors.foreground,
      lineHeight: 17.5,
    },
    recentMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto',
    },
  });  