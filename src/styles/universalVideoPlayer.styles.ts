import { StyleSheet } from 'react-native';
import { tokens } from '../constants/tokens';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    headerAbsolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing.lg,
      paddingTop: 48,
      paddingBottom: tokens.spacing.md,
      zIndex: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backButton: {
      padding: tokens.spacing.xs,
      marginLeft: -tokens.spacing.xs,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
    },
    sourceIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.xs,
    },
    sourceText: {
      fontSize: 14,
      color: '#fff',
      fontWeight: '600',
    },
    durationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.xs,
    },
    durationText: {
      fontSize: 14,
      color: '#fff',
      fontWeight: '600',
    },
    videoContainer: {
      width: '100%',
      aspectRatio: 16 / 9,
      backgroundColor: '#000',
      position: 'relative',
    },
    videoPoster: {
      width: '100%',
      height: '100%',
    },
    videoOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    playButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(255,255,255,0.95)',
      justifyContent: 'center',
      alignItems: 'center',
      ...tokens.shadow.lg,
    },
    placeholderBadge: {
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderRadius: tokens.radius.md,
      padding: tokens.spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderText: {
      fontSize: 14,
      color: tokens.colors.foreground,
      fontWeight: '600',
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
      marginBottom: tokens.spacing.xl,
    },
    descriptionSection: {
      marginBottom: tokens.spacing.xl,
    },
    descriptionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: tokens.colors.foreground,
      marginBottom: tokens.spacing.sm,
    },
    descriptionText: {
      fontSize: 15,
      lineHeight: 24,
      color: tokens.colors.mutedForeground,
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
  });