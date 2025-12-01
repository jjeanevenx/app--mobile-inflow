import { Dimensions, StyleSheet } from 'react-native';
import { tokens } from '../constants/tokens';
const { width } = Dimensions.get("window");


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  headerGradient: {
    paddingTop: 48,
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.lg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: tokens.spacing["2xl"],
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#fff",
    lineHeight: 32,
  },
  headerIcons: {
    flexDirection: "row",
    gap: tokens.spacing.md,
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FB2C36",
    borderWidth: 1.333,
    borderColor: "#fff",
  },
  quickAccessContainer: {
    flexDirection: "row",
    gap: tokens.spacing.md,
    justifyContent: "space-between",
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 0,
    alignItems: "center",
    gap: tokens.spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    minHeight: 131,
  },
  quickAccessIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  quickAccessLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.colors.foreground,
    textAlign: "center",
    lineHeight: 17.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: tokens.spacing.xl,
    paddingBottom: tokens.spacing["2xl"],
  },
  section: {
    marginBottom: tokens.spacing["2xl"],
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: tokens.colors.foreground,
    marginBottom: 4,
    lineHeight: 28,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.colors.mutedForeground,
    lineHeight: 20,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.colors.primary,
  },
  horizontalScroll: {
    paddingHorizontal: tokens.spacing.lg,
    gap: tokens.spacing.md,
  },
  continueCard: {
    width: 320,
  },
  continueCardInner: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
  },
  continueCardContent: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
  },
  thumbnailContainer: {
    width: 96,
    height: 128,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  progressBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#F0B100",
    borderWidth: 0,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  continueInfo: {
    flex: 1,
    paddingTop: 4,
    gap: tokens.spacing.sm,
  },
  typeBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.xs,
  },
  typeBadgeText: {
    fontSize: 14,
    fontWeight: "400",
    color: tokens.colors.primary,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: tokens.colors.foreground,
    lineHeight: 20,
  },
  continueAuthor: {
    fontSize: 12,
    fontWeight: "400",
    color: tokens.colors.mutedForeground,
    lineHeight: 16,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    fontWeight: "400",
    color: tokens.colors.mutedForeground,
  },
  progressBarContainer: {
    height: 6,
  },
  progressBar: {
    height: 6,
    borderRadius: 0,
  },
  categoryScroll: {
    paddingHorizontal: tokens.spacing.lg,
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.lg,
  },
  categoryPill: {
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.sm,
    borderRadius: 20,
    backgroundColor: tokens.colors.muted,
  },
  categoryPillActive: {
    backgroundColor: tokens.colors.primary,
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: "500",
    color: tokens.colors.mutedForeground,
  },
  categoryPillTextActive: {
    color: "#fff",
  },
  featuredGrid: {
    flexDirection: "row",
    paddingHorizontal: tokens.spacing.lg,
    gap: tokens.spacing.md,
    flexWrap: "wrap",
  },
  featuredCard: {
    width: (width - tokens.spacing.lg * 2 - tokens.spacing.md) / 2,
  },
  featuredCardInner: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
  },
  featuredImageContainer: {
    width: "100%",
    height: 140,
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  categoryBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: tokens.colors.primary + "90",
    borderWidth: 0,
  },
  featuredInfo: {
    padding: 16,
    gap: 8,
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.foreground,
    lineHeight: 17.5,
    minHeight: 35,
  },
  featuredAuthor: {
    fontSize: 12,
    fontWeight: "400",
    color: tokens.colors.mutedForeground,
    lineHeight: 16,
    marginBottom: 4,
  },
  featuredDuration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  featuredDurationText: {
    fontSize: 12,
    fontWeight: "400",
    color: tokens.colors.mutedForeground,
    lineHeight: 16,
  },
  bottomSpacer: {
    height: tokens.spacing["2xl"],
  },
});