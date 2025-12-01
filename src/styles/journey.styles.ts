import { Dimensions, StyleSheet } from 'react-native';
import { tokens } from '../constants/tokens';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    headerWrapper: {
      backgroundColor: 'transparent',
    },
    headerGradient: {
      paddingTop: 12,
      paddingBottom: 0,
      paddingHorizontal: 24,
    },
    statusBarSpacer: {
      height: 24,
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginBottom: 24,
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
      fontWeight: '400',
      color: '#FFFFFF',
      lineHeight: 32,
    },
    headerSubtitle: {
      fontSize: 14,
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 20,
      marginTop: 2,
    },
    achievementsButton: {
      width: 40,
      height: 40,
      borderRadius: 999,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    levelCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      padding: 20,
      gap: 16,
      marginBottom: 24,
    },
    levelHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    levelInfo: {
      gap: 4,
    },
    levelLabel: {
      fontSize: 14,
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 20
    },
    levelValue: {
      fontSize: 30,
      fontWeight: '400',
      color: '#FFFFFF',
      lineHeight: 36
    },
    trendingIconContainer: {
      width: 64,
      height: 64,
      borderRadius: 999,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    xpSection: {
      gap: 12,
      marginTop: 4,
    },
    xpHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    xpLabel: {
      fontSize: 14,
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 20
    },
    xpValue: {
      fontSize: 14,
      fontWeight: '400',
      color: '#FFFFFF',
      lineHeight: 20
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 999,
      overflow: 'hidden'
    },
    progressBarFill: {
      height: 8,
      borderRadius: 999,
    },
    xpToNextLevel: {
      fontSize: 12,
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: 16
    },
    contentScroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 32,
    },
    section: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '400',
      color: tokens.colors.foreground,
      lineHeight: 28,
      marginBottom: 16,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    statCard: {
      width: (Dimensions.get('window').width - 60) / 2, // (total width - paddings) / 2 cards
      backgroundColor: '#FFFFFF',
      marginBottom: 12,
    },
    statCardContent: {
      padding: 16,
      gap: 12,
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 64,
    },
    statIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statTextContainer: {
      flex: 1,
      gap: 0,
    },
    statValue: {
      fontSize: 24,
      fontWeight: '400',
      color: tokens.colors.foreground,
      lineHeight: 32,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: '400',
      color: '#717182',
      lineHeight: 16,
    },
    achievementsContainer: {
      gap: 12,
    },
    achievementCard: {
      overflow: 'hidden',
    },
    achievementCardLocked: {
      opacity: 0.7,
    },
    achievementCardContent: {
      padding: 16,
      flexDirection: 'row',
      gap: 12,
    },
    achievementIcon: {
      width: 56,
      height: 56,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    achievementInfo: {
      flex: 1,
      gap: 4,
    },
    achievementHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    achievementTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: tokens.colors.foreground,
      flex: 1,
    },
    achievementTitleLocked: {
      color: tokens.colors.mutedForeground,
    },
    unlockedBadge: {
      backgroundColor: '#FDE047',
      borderWidth: 0,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    unlockedBadgeText: {
      fontSize: 11,
      fontWeight: '500',
      color: '#854D0E',
    },
    achievementDescription: {
      fontSize: 14,
      fontWeight: '400',
      color: tokens.colors.mutedForeground,
    },
    achievementDescriptionLocked: {
      color: tokens.colors.mutedForeground,
    },
    achievementProgressContainer: {
      marginTop: 8,
      gap: 4,
    },
    achievementProgressText: {
      fontSize: 12,
      fontWeight: '400',
      color: tokens.colors.mutedForeground,
    },
    achievementProgressBar: {
      height: 6,
      backgroundColor: tokens.colors.muted,
    },
    activitiesContainer: {
      gap: 12,
    },
    activityCard: {
      overflow: 'hidden',
    },
    activityCardContent: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    activityIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 999,
      backgroundColor: '#D1FAE5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    activityInfo: {
      flex: 1,
      gap: 2,
    },
    activityTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: tokens.colors.foreground,
    },
    activityDate: {
      fontSize: 12,
      fontWeight: '400',
      color: tokens.colors.mutedForeground,
    },
    xpBadge: {
      backgroundColor: tokens.colors.primary,
      borderWidth: 0,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    xpBadgeText: {
      fontSize: 12,
      fontWeight: '500',
      color: '#FFFFFF',
    },
  });