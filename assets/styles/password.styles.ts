import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { globals } from "./globals.styles";

export const styles = StyleSheet.create({
  // Change Password Screen Styles
  passwordHeader: {
    ...globals.card,
    alignItems: "center",
    paddingVertical: 30,
    marginTop: 10,
  },
  passwordTitle: {
    fontSize: SIZES.x2Large,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    marginTop: 16,
    textAlign: "center",
  },
  passwordSubtitle: {
    fontSize: SIZES.default,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  /* password requirement */
  passwordRequirements: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
  },
  requirementsTitle: {
    fontSize: SIZES.default,
    fontFamily: FONTS.medium,
    color: COLORS.text,
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  requirementText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    marginLeft: 8,
  },
  requirementMet: {
    color: "#10B981",
  },

  changePasswordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 30,
  },
  changePasswordButtonText: {
    fontSize: SIZES.default,
    fontFamily: FONTS.medium,
    color: COLORS.white,
    marginLeft: 8,
  },
});
