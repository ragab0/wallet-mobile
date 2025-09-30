// components/SuccessAlert.tsx
import { useSlideInFromY } from "@/hooks/useAnimation";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface props {
  message?: string;
  onDismis?: () => void;
  autoDismisIn?: number;
}

export default function SuccessAlert({
  message: m,
  onDismis,
  autoDismisIn = 0,
}: props) {
  const [message, setMessage] = useState<string | undefined>(m);
  const successAnim = useSlideInFromY(300, 0, false);

  useEffect(
    function () {
      const a = setTimeout(() => {
        setMessage(undefined);
      }, autoDismisIn * 1000);
      return function () {
        clearTimeout(a);
      };
    },
    [autoDismisIn]
  );

  if (!message) return;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: successAnim.opacity,
          transform: [{ translateY: successAnim.translateY }],
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={24} color="#10B981" />
        <Text style={styles.message}>{message}</Text>
      </View>

      <TouchableOpacity
        style={styles.dismissButton}
        onPress={onDismis ? onDismis : () => setMessage(undefined)}
      >
        <Ionicons name="close" size={20} color="#059669" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
