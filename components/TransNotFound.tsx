import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TransesNotFound() {
  const router = useRouter();

  return (
    <View style={styles.emptyCard}>
      <Ionicons name="receipt-outline" size={60} color={COLORS.textLight} />
      <View>
        <Text style={styles.emptyTitle}>No transactions yet</Text>
        <Text style={styles.emptyText}>
          Start tracking your finances by adding your first transaction
        </Text>
      </View>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => router.push("/create")}
      >
        <Ionicons name="add-circle" size={18} color={COLORS.white} />
        <Text style={styles.emptyButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 30,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyTitle: {
    textAlign: "center",
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: SIZES.medium,
    textAlign: "center",
    lineHeight: 20,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    marginLeft: 6,
  },
});
