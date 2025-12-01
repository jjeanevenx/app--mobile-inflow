import { StyleSheet } from 'react-native';
import { tokens } from '../constants/tokens';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    headerWrapper: {
      backgroundColor: tokens.colors.background,
    },
    headerGradient: {
      paddingTop: 12,
      paddingBottom: 24,
      paddingHorizontal: 24,
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
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
      fontWeight: '700',
      color: '#FFFFFF',
    },
    headerSubtitle: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
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
    categoryContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    categoryTab: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingLeft: 16,
      paddingRight: 16,
      height: 40,
      borderRadius: 999,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    categoryTabActive: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    categoryIcon: {
      fontSize: 16,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '400',
      color: '#FFFFFF',
    },
    categoryTextActive: {
      color: tokens.colors.primary,
    },
    statsContainer: {
      backgroundColor: '#FFFFFF',
      paddingVertical: 24,
      paddingHorizontal: 24,
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 32,
      fontWeight: '700',
      color: tokens.colors.foreground,
      lineHeight: 40,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: '400',
      color: tokens.colors.mutedForeground,
      marginTop: 4,
      textAlign: 'center',
    },
    statDivider: {
      width: 1,
      height: 40,
      backgroundColor: tokens.colors.border,
      opacity: 0.3,
    },
    contentScroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 32,
    },
    pathsSection: {
      gap: 16,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    pathCard: {
      overflow: 'hidden',
    },
    pathCardContent: {
      padding: 20,
      gap: 16,
    },
    levelBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderWidth: 0,
      borderRadius: 8,
      backgroundColor: '#fef9c2',
    },
    levelBadgeText: {
      fontSize: 12,
      fontWeight: '400',
      color: '#a65f00',
    },
    pathTitle: {
      fontSize: 18,
      fontWeight: '400',
      color: tokens.colors.foreground,
      lineHeight: 28,
    },
    pathInfoRow: {
      flexDirection: 'row',
      gap: 16,
    },
    pathInfoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    pathInfoText: {
      fontSize: 14,
      color: '#717182',
    },
    progressSection: {
      gap: 8,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    progressLabel: {
      fontSize: 14,
      fontWeight: '400',
      color: tokens.colors.mutedForeground,
    },
    progressValue: {
      fontSize: 14,
      fontWeight: '500',
      color: tokens.colors.primary,
    },
    progressBar: {
      height: 8,
      backgroundColor: tokens.colors.muted,
    },
    nextLessonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: tokens.colors.border,
    },
    nextLessonContent: {
      flex: 1,
      gap: 4,
    },
    nextLessonLabel: {
      fontSize: 12,
      fontWeight: '400',
      color: tokens.colors.mutedForeground,
    },
    nextLessonTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: tokens.colors.foreground,
    },
    playButton: {
      width: 40,
      height: 40,
      borderRadius: 999,
      backgroundColor: tokens.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: tokens.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
  });