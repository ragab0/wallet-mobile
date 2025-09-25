import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";
import { globals } from "./globals.styles";

const { height: screenHeight } = Dimensions.get("window");

export const styles = StyleSheet.create({
  // Form Status Indicator
  formStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  formStatusText: {
    fontSize: SIZES.small + 1,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  formStatusUnsaved: {
    color: COLORS.expense,
  },
  formStatusSaved: {
    color: COLORS.income,
  },

  // setting item
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingItemLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingItemText: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: SIZES.default,
    fontFamily: FONTS.medium,
    color: COLORS.text,
    marginBottom: 4,
  },
  settingItemSubtitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Theme Preview Styles
  themeColorPreview: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Currency Specific Styles
  currencyInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  currencySymbol: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    width: 32,
    textAlign: "center",
    marginRight: 12,
  },

  // Theme Specific Styles
  themeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  themeColorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.75,
    minHeight: screenHeight * 0.4,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  modalCloseButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 4,
    borderRadius: 12,
    backgroundColor: COLORS.background,
  },
  modalOptionSelected: {
    backgroundColor: "#F0F7F0",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  modalOptionTitle: {
    fontSize: SIZES.default,
    fontFamily: FONTS.medium,
    color: COLORS.text,
    marginBottom: 4,
  },
  modalOptionSubtitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
  },

  // Save Button (if needed for manual save)
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  saveButtonDisabled: {
    backgroundColor: COLORS.textLight,
  },

  saveButtonText: {
    fontSize: SIZES.default,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    marginLeft: 8,
  },

  // Danger Section
  dangerSection: {
    ...globals.card,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },

  dangerSectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.expense,
    marginBottom: 16,
    textAlign: "center",
  },

  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.expense,
  },

  deleteButtonText: {
    fontSize: SIZES.default,
    fontFamily: FONTS.medium,
    color: COLORS.expense,
    marginLeft: 8,
  },

  deleteWarning: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
  },
});
