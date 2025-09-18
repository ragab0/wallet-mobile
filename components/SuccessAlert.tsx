// components/SuccessAlert.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SuccessAlertProps {
  message: string;
  onDismiss: () => void;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
  message,
  onDismiss,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={24} color="#10B981" />
        <Text style={styles.message}>{message}</Text>
      </View>

      <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
        <Ionicons name="close" size={20} color="#059669" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    fontWeight: "600",
    color: "#065F46",
    marginLeft: 12,
    flex: 1,
  },
  dismissButton: {
    padding: 4,
    marginLeft: 12,
  },
});
