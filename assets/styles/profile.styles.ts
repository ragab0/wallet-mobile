import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { globals } from "./globals.styles";

export const styles = StyleSheet.create({
  pictureSection: {
    ...globals.card,
    alignItems: "center",
  },
  pictureContainer: {
    position: "relative",
  },
  largePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.border,
  },
  largeDefaultPicture: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.border,
  },
  pictureEditButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 8,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  pictureHint: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    marginTop: 12,
    textAlign: "center",
  },

  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },

  saveButtonText: {
    fontSize: SIZES.default,
    fontFamily: FONTS.medium,
    color: COLORS.white,
    marginLeft: 8,
  },
  saveHint: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 12,
  },

  statusGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  statusCard: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  statusCardTitle: {
    textAlign: "center",
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    marginTop: 8,
  },
  statusCardValue: {
    textAlign: "center",
    fontSize: SIZES.default,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    marginTop: 4,
  },
});
