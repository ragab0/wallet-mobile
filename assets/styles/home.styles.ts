import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogo: {
    width: 75,
    height: 75,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  usernameText: {
    fontSize: SIZES.default,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  addButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
  },
  balanceCard: {
    gap: 10,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  balanceTitle: {
    fontSize: SIZES.default,
    color: COLORS.textLight,
  },
  balanceAmount: {
    fontSize: SIZES.x2Large - 2,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  balanceStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceStatItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  balanceStatLabel: {
    fontSize: SIZES.medium,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  balanceStatAmount: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
  },
  transesListHeading: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  transesListContent: {
    paddingBottom: 20,
    gap: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
});
