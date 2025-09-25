import { FONTS, SIZES } from "@/constants/theme";
import { useLogout } from "@/hooks/useAuth";
import { useThemeColors } from "@/stores/themeStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type props = {
  style?: ViewStyle;
  showText?: boolean;
};

export function LogoutButton({ style, showText = false }: props) {
  const { isPending: isLoading, mutate } = useLogout();
  const COLORS = useThemeColors();
  const styles = createStyles(COLORS);

  function handleLogout() {
    Alert.alert("Confirm Logout", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => mutate(),
      },
    ]);
  }

  return (
    <TouchableOpacity
      style={[styles.button, style, isLoading && styles.disabled]}
      onPress={handleLogout}
      disabled={isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <>
          <Ionicons name="log-out-outline" size={20} color={COLORS.expense} />
          {showText && <Text style={styles.text}>Logout</Text>}
        </>
      )}
    </TouchableOpacity>
  );
}

const createStyles = (COLORS: any) =>
  StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 20,
      backgroundColor: COLORS.card,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    text: {
      fontSize: SIZES.default,
      fontFamily: FONTS.medium,
      color: COLORS.expense,
      marginLeft: 8,
    },
    disabled: {
      opacity: 0.6,
    },
  });
