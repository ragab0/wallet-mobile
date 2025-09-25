import { AppTheme } from "@/types/theme";
import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();

export const SIZES = {
  small: 9 * fontScale,
  medium: 14 * fontScale,
  default: 16 * fontScale,
  large: 18 * fontScale,
  xLarge: 24 * fontScale,
  x2Large: 32 * fontScale,
};

export const FONTS = {
  main: "SpaceMono",
  bold: "InterBold",
  semiBold: "InterSemiBold",
  medium: "InterMedium",
  regular: "InterRegular",
  light: "InterLight",
};

const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
};

const forestTheme = {
  primary: "#2E7D32",
  background: "#E8F5E9",
  text: "#1B5E20",
  border: "#C8E6C9",
  white: "#FFFFFF",
  textLight: "#66BB6A",
  expense: "#C62828",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const purpleTheme = {
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  border: "#D1C4E9",
  white: "#FFFFFF",
  textLight: "#BA68C8",
  expense: "#D32F2F",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const oceanTheme = {
  primary: "#0277BD",
  background: "#E1F5FE",
  text: "#01579B",
  border: "#B3E5FC",
  white: "#FFFFFF",
  textLight: "#4FC3F7",
  expense: "#EF5350",
  income: "#26A69A",
  card: "#FFFFFF",
  shadow: "#000000",
};

// @/constants/settings.ts

export const AVAILABLE_THEMES: AppTheme[] = [
  {
    key: "coffee",
    name: "Coffee",
    description: "Warm and cozy brown theme",
    primaryColor: "#8B593E",
    colors: coffeeTheme,
  },
  {
    key: "forest",
    name: "Forest",
    description: "Natural green theme",
    primaryColor: "#2E7D32",
    colors: forestTheme,
  },
  {
    key: "purple",
    name: "Purple",
    description: "Modern purple theme",
    primaryColor: "#7B1FA2",
    colors: purpleTheme,
  },
  {
    key: "ocean",
    name: "Ocean",
    description: "Cool blue theme",
    primaryColor: "#0277BD",
    colors: oceanTheme,
  },
];

export const COLORS = coffeeTheme;
