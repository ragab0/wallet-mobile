import { COLORS as CLRS, FONTS, SIZES } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const shadows = StyleSheet.create({
  shadowCard: {
    shadowColor: CLRS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export const createGlobalStyles = (COLORS: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: COLORS.background,
    },
    card: {
      backgroundColor: COLORS.white,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      ...shadows.shadowCard,
    },
    sectionTitle: {
      fontSize: SIZES.large,
      fontFamily: FONTS.semiBold,
      color: COLORS.text,
      marginBottom: 16,
    },
    disabledButton: {
      backgroundColor: COLORS.textLight,
      opacity: 0.6,
    },
    groups: {
      gap: 10,
    },
    inputLabel: {
      fontSize: SIZES.default,
      fontFamily: FONTS.medium,
      color: COLORS.text,
      marginBottom: 8,
    },
  });
