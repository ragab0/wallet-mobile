import { useThemeColors } from "@/stores/themeStore";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface props {
  size?: "small" | "large";
  color?: string;
  isFull?: boolean;
}

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

export default function LoadingSpinner({
  size = "large",
  color = coffeeTheme.primary,
  isFull = false,
}: props) {
  const COLORS = useThemeColors();
  const styles = createStyles(COLORS);
  return (
    <View style={[styles.container, isFull && styles.fullContainer]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const createStyles = (COLORS: any) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },

    fullContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.background,
    },
  });
