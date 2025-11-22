import { StyleSheet } from 'react-native';
import { tokens } from '../constants/tokens';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing.lg,
      paddingTop: 48,
      paddingBottom: tokens.spacing.md,
      backgroundColor: tokens.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border + '40',
    },
    backButton: {
      padding: tokens.spacing.xs,
      marginLeft: -tokens.spacing.xs,
    },
    durationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.xs,
    },
    durationText: {
      fontSize: 14,
      color: tokens.colors.mutedForeground,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: tokens.spacing['2xl'],
    },
    content: {
      paddingHorizontal: tokens.spacing.lg,
      paddingTop: tokens.spacing.xl,
    },
    categoryBadge: {
      alignSelf: 'flex-start',
      marginBottom: tokens.spacing.md,
      backgroundColor: tokens.colors.primary + '15',
      borderWidth: 0,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: tokens.colors.foreground,
      marginBottom: tokens.spacing.md,
      lineHeight: 36,
    },
    author: {
      fontSize: 15,
      color: tokens.colors.mutedForeground,
      marginBottom: tokens.spacing.lg,
    },
    imageContainer: {
      width: '100%',
      aspectRatio: 16 / 9,
      borderRadius: tokens.radius.xl,
      overflow: 'hidden',
      marginBottom: tokens.spacing.xl,
      backgroundColor: tokens.colors.muted,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    articleContent: {
      fontSize: 16,
      lineHeight: 26,
      color: tokens.colors.foreground,
      marginBottom: tokens.spacing.xl,
    },
    interactionCard: {
      marginTop: tokens.spacing.lg,
      backgroundColor: tokens.colors.card,
    },
    interactionContent: {
      padding: tokens.spacing.lg,
    },
    feedbackSection: {
      marginBottom: tokens.spacing.lg,
    },
    feedbackLabel: {
      fontSize: 14,
      color: tokens.colors.foreground,
      marginBottom: tokens.spacing.md,
      fontWeight: '500',
    },
    feedbackButtons: {
      flexDirection: 'row',
      gap: tokens.spacing.md,
    },
    feedbackButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      backgroundColor: tokens.colors.background,
    },
    feedbackButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: tokens.colors.foreground,
    },
    feedbackButtonTextActive: {
      color: '#fff',
    },
    likeButtonActive: {
      backgroundColor: tokens.colors.primary,
      borderColor: tokens.colors.primary,
    },
    dislikeButtonActive: {
      backgroundColor: tokens.colors.destructive,
      borderColor: tokens.colors.destructive,
    },
    completeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.background,
    },
    completeButtonActive: {
      backgroundColor: tokens.colors.success,
      borderColor: tokens.colors.success,
    },
    completeButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: tokens.colors.primary,
    },
    completeButtonTextActive: {
      color: '#fff',
    },
    bottomSpacer: {
      height: tokens.spacing['2xl'],
    },
    webViewContainer: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    sourceBar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: tokens.spacing.md,
      backgroundColor: tokens.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border + '40',
    },
    sourceUrl: {
      fontSize: 14,
      color: tokens.colors.mutedForeground,
      marginLeft: tokens.spacing.xs,
    },
    webView: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: tokens.colors.background,
    },
    loadingText: {
      fontSize: 16,
      color: tokens.colors.foreground,
      marginTop: tokens.spacing.md,
    },
    interactionBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: tokens.colors.card,
      borderTopWidth: 1,
      borderTopColor: tokens.colors.border + '40',
    },
    interactionBarContent: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: tokens.spacing.md,
    },
    iconButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      backgroundColor: tokens.colors.background,
    },
    completeIconButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.background,
    },
    completeIconText: {
      fontSize: 14,
      fontWeight: '600',
      color: tokens.colors.primary,
    },
    externalArticleCard: {
      marginTop: tokens.spacing.lg,
      backgroundColor: tokens.colors.card,
    },
    externalArticleContent: {
      padding: tokens.spacing.lg,
    },
    externalIconContainer: {
      alignItems: 'center',
      marginBottom: tokens.spacing.md,
    },
    externalArticleTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: tokens.colors.foreground,
      marginBottom: tokens.spacing.md,
    },
    externalArticleDescription: {
      fontSize: 14,
      color: tokens.colors.mutedForeground,
      marginBottom: tokens.spacing.md,
    },
    externalArticleDomain: {
      fontWeight: '600',
    },
    openExternalButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.primary,
    },
    openExternalButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
    },
    externalArticleNote: {
      fontSize: 12,
      color: tokens.colors.mutedForeground,
      marginTop: tokens.spacing.md,
    },
    summarySection: {
      marginTop: tokens.spacing.lg,
    },
    summaryTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: tokens.colors.foreground,
      marginBottom: tokens.spacing.md,
    },
  });