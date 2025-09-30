import Logo from "@/assets/images/logo.png";
import { createHomeStyles } from "@/assets/styles/home.styles";
import LoadingSpinner from "@/components/LoadingSpinner";
import { LogoutButton } from "@/components/LogOutBtn";
import TransItem from "@/components/TransItem";
import TransesNotFound from "@/components/TransNotFound";
import { useFadeIn, useFlipCard, useStaggerHeader } from "@/hooks/useAnimation";
import { useAuth } from "@/hooks/useAuth";
import {
  useGetAllTransactionsMine,
  useGetTransactionsSummary,
} from "@/hooks/useTransaction";
import { getSelectedCurrencyAtom } from "@/stores/settingsStore";
import { getThemeColorsAtom } from "@/stores/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import {
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const COLORS = useAtomValue(getThemeColorsAtom);
  const styles = createHomeStyles(COLORS);
  const { symbol = "$" } = useAtomValue(getSelectedCurrencyAtom) || {};
  const { user } = useAuth();
  const { isPending: isLoading, data: transactions } =
    useGetAllTransactionsMine();
  const { data: summary } = useGetTransactionsSummary();
  const headerAnim = useStaggerHeader(0);
  const cardAnim = useFlipCard(500);
  const titleAnim = useFadeIn(300, 700);
  const baseDelay = 1000;

  if (isLoading) return <LoadingSpinner size="large" isFull={true} />;

  return (
    <View style={styles.container}>
      {/* header */}
      <Animated.View
        style={[
          styles.header,
          { opacity: headerAnim.opacity, transform: headerAnim.transform },
        ]}
      >
        {/* header info */}
        <View style={styles.headerInfo}>
          <Image source={Logo} style={styles.headerLogo} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.usernameText}>{user?.fname}</Text>
          </View>
        </View>
        {/* header side */}
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/create")}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color="#FFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          <LogoutButton />
        </View>
      </Animated.View>

      {/* balance card */}
      <Animated.View
        style={[
          styles.balanceCard,
          {
            transform: cardAnim.transform,
          },
        ]}
      >
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
          {symbol}
          {summary?.totalBalance.toFixed(2)}
        </Text>
        <View style={styles.balanceStats}>
          <View style={styles.balanceStatItem}>
            <Text style={styles.balanceStatLabel}>Income</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
              +{symbol}
              {(summary?.totalIncome || 0).toFixed(2)}
            </Text>
          </View>
          <View style={[styles.balanceStatItem, styles.statDivider]} />
          <View style={styles.balanceStatItem}>
            <Text style={styles.balanceStatLabel}>Expenses</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
              -{symbol}
              {Math.abs(summary?.totalExpenses || 0).toFixed(2)}
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* recent trans */}
      <Animated.Text
        style={[
          styles.transesListHeading,
          {
            opacity: titleAnim,
          },
        ]}
      >
        Recent Transactions
      </Animated.Text>
      <FlatList
        contentContainerStyle={styles.transesListContent}
        data={transactions}
        renderItem={({ item, index }) => (
          <TransItem
            item={item}
            symbol={symbol}
            index={index}
            baseDelay={baseDelay}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<TransesNotFound />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
