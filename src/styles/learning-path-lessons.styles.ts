import { StyleSheet } from 'react-native';
import { tokens } from '../constants/tokens';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    headerWrapper: {
      backgroundColor: '#F8F9FA',
    },
    headerGradient: {
      paddingTop: 12,
      paddingBottom: 24,
      paddingHorizontal: 24,
    },
    statusBarSpacer: {
      height: 24,
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 16,
      marginBottom: 24,
    },
    backButton: {
      padding: 8,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderRadius: 999,
      marginTop: -4,
    },
    headerContent: {
      flex: 1,
      gap: 8,
    },
    levelBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderWidth: 0,
      borderRadius: 8,
    },
    levelBadgeText: {
      fontSize: 12,
      fontWeight: '400',
      color: '#FFFFFF',
    },
    pathTitle: {
      fontSize: 20,
      fontWeight: '400',
      color: '#FFFFFF',
      lineHeight: 25,
    },
    pathDescription: {
      fontSize: 14,
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 20,
    },
    progressCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 16,
      padding: 16,
      gap: 12,
      marginTop: 24,
    },
    progressStats: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    progressStatItem: {
      gap: 0,
    },
    progressStatItemRight: {
      gap: 0,
      alignItems: 'flex-end',
    },
    progressStatLabel: {
      fontSize: 14,
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 20,
    },
    progressStatLabelRight: {
      fontSize: 14,
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 20,
      textAlign: 'right',
    },
    progressStatValue: {
      fontSize: 24,
      fontWeight: '400',
      color: '#FFFFFF',
      lineHeight: 32,
    },
    progressStatValueRight: {
      fontSize: 20,
      fontWeight: '400',
      color: '#FFFFFF',
      lineHeight: 28,
      textAlign: 'right',
    },
    progressBar: {
      height: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    contentScroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 32,
    },
    modulesContainer: {
      gap: 16,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    moduleCard: {
      overflow: 'hidden',
    },
    moduleCardContent: {
      padding: 20,
      gap: 12,
    },
    moduleHeader: {
      gap: 12,
    },
    moduleHeaderContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    moduleTitle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '400',
      color: tokens.colors.foreground,
      lineHeight: 28,
    },
    moduleBadge: {
      paddingHorizontal: 9,
      paddingVertical: 3,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    moduleBadgeText: {
      fontSize: 12,
      fontWeight: '400',
      color: tokens.colors.foreground,
    },
    expandIcon: {
      alignItems: 'center',
    },
    moduleProgressBar: {
      height: 6,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
    },
    lessonsContainer: {
      marginTop: 8,
      gap: 0,
    },
    lessonItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      backgroundColor: '#F8F9FA',
      borderRadius: 8,
      marginBottom: 8,
    },
    lessonItemCompleted: {
      backgroundColor: '#E8F5E9',
    },
    lessonIcon: {
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    lessonContent: {
      flex: 1,
      gap: 4,
    },
    lessonTitle: {
      fontSize: 14,
      fontWeight: '400',
      color: tokens.colors.foreground,
      lineHeight: 20,
    },
    lessonTitleCompleted: {
      color: '#717182',
    },
    lessonMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    lessonMetaText: {
      fontSize: 12,
      fontWeight: '400',
      color: tokens.colors.mutedForeground,
    },
    lessonMetaDot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: tokens.colors.mutedForeground,
    },
  });
  