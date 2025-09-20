import { COLORS } from "@/constants/theme";
import { useLogout } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export function LogoutButton() {
  const { isPending: isLoading, mutate } = useLogout();

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
      style={[styles.button, isLoading && styles.disabled]}
      onPress={handleLogout}
      disabled={isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Ionicons name="log-out-outline" size={20} color={COLORS.text} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  disabled: {
    opacity: 0.6,
  },
});
