import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { globals } from "./globals.styles";

export const styles = StyleSheet.create({
  // header
  profileHeader: {
    ...globals.card,
    flexDirection: "row",
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.border,
  },
  defaultAvatar: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.border,
  },
  userInfo: {
    gap: 4,
  },
  userName: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  userEmail: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: SIZES.small,
    fontFamily: FONTS.medium,
    color: "#10B981",
  },

  // more info
  accountInfo: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  memberSinceText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
  },
});
