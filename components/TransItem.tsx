import { FONTS, SIZES } from "@/constants/theme";
import { CATEGORIES_INDEXED } from "@/constants/trans";
import { useStaggeredItem } from "@/hooks/useAnimation";
import { useDeleteTransaction } from "@/hooks/useTransaction";
import { getThemeColorsAtom } from "@/stores/themeStore";
import { Trans } from "@/types/trans";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { useAtomValue } from "jotai";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  item: Trans;
  symbol: string;
  baseDelay: number;
  index?: number;
};

export default function TransItem({
  item,
  symbol,
  baseDelay = 1000,
  index = 0,
}: Props) {
  const COLORS = useAtomValue(getThemeColorsAtom);
  const styles = createStyles(COLORS);
  const { mutate: deleteTransaction } = useDeleteTransaction();
  const animation = useStaggeredItem(index, baseDelay, 100);

  const isIncome = item.type === "income";
  const { name, icon } = CATEGORIES_INDEXED[item.category];

  function handleDelete(id: string) {
    deleteTransaction(id);
  }

  return (
    <Animated.View style={[styles.transCard, animation]}>
      <TouchableOpacity style={styles.transContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={icon}
            size={22}
            color={isIncome ? COLORS.income : COLORS.expense}
          />
        </View>
        <View style={styles.transLeft}>
          <Text style={styles.transTitle}>{item.title}</Text>
          <Text style={styles.transCategory}>{name}</Text>
        </View>
        <View style={styles.transRight}>
          <Text
            style={[
              styles.transAmount,
              { color: isIncome ? COLORS.income : COLORS.expense },
            ]}
          >
            {isIncome ? "+" : "-"}
            {symbol}
            {Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transDate}>{formatDate(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const createStyles = (COLORS: any) =>
  StyleSheet.create({
    transCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: COLORS.card,
      borderRadius: 12,
      shadowColor: COLORS.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    transContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      padding: 15,
    },
    categoryIconContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#F5F5F5",
    },
    transLeft: {
      flex: 1,
      gap: 3,
    },
    transTitle: {
      fontSize: SIZES.default,
      fontFamily: FONTS.medium,
      color: COLORS.text,
      textTransform: "capitalize",
    },
    transCategory: {
      fontSize: SIZES.medium,
      color: COLORS.textLight,
    },
    transRight: {
      alignItems: "flex-end",
      gap: 3,
    },
    transAmount: {
      fontSize: SIZES.default,
      fontFamily: FONTS.semiBold,
    },
    transDate: {
      fontSize: SIZES.small + 3,
      color: COLORS.textLight,
    },
    deleteButton: {
      padding: 15,
      borderLeftWidth: 1,
      borderLeftColor: COLORS.border,
    },
  });
