import { StyleSheet } from 'react-native';
import { tokens } from '../constants/tokens';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  headerGradient: {
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  tabsScroll: {
    marginBottom: 8,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  tabsContainer: {
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
  },
  tabInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabTextActive: {
    fontSize: 14,
    fontWeight: '500',
    color: tokens.colors.primary,
  },
  tabTextInactive: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  gridContainer: {
    padding: tokens.spacing.sm,
    paddingBottom: tokens.spacing['2xl'],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.md,
    gap: tokens.spacing.md,
  },
  cardWrapper: {
    width: '48%',
  },
  card: {
    overflow: 'hidden',
  },
  cardContent: {
    padding: 0,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
    backgroundColor: tokens.colors.muted,
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
  },
  imageBadgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  categoryBadge: {
    backgroundColor: tokens.colors.primary,
    borderWidth: 0,
  },
  cardInfo: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: tokens.colors.foreground,
    marginBottom: 4,
    lineHeight: 18,
  },
  cardAuthor: {
    fontSize: 12,
    color: tokens.colors.mutedForeground,
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: tokens.colors.mutedForeground,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 0,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border + '40',
  },
  actionButton: {
    padding: 4,
  },
  actionDivider: {
    width: 1,
    height: 16,
    backgroundColor: tokens.colors.border,
    opacity: 0.4,
  },
  contentScroll: {
    flex: 1,
    paddingBottom: tokens.spacing['2xl'],
  
  },
});