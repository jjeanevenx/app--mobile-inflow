import { StyleSheet } from 'react-native';
import { tokens } from '../constants/tokens';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  header: {
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: tokens.colors.primaryForeground,
    lineHeight: 32,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
  },
  trendingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    backgroundColor: tokens.colors.card,
    borderRadius: 8,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: tokens.colors.foreground,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 100,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  categoryTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryEmoji: {
    fontSize: 24,
    lineHeight: 32,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: tokens.colors.foreground,
    lineHeight: 28,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: tokens.colors.primary,
    fontWeight: "400",
  },
  cardsContainer: {
    paddingLeft: 24,
    paddingRight: 12,
    gap: 16,
  },
  contentCard: {
    width: 280,
    backgroundColor: tokens.colors.card,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
  cardImageContainer: {
    width: "100%",
    height: 160,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardImageGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContent: {
    padding: 16,
  },
  cardBadges: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: tokens.colors.primary,
    lineHeight: 16,
  },
  levelBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: tokens.colors.foreground,
    lineHeight: 24,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: tokens.colors.mutedForeground,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardDuration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardDurationText: {
    fontSize: 12,
    color: tokens.colors.mutedForeground,
    lineHeight: 16,
  },
});