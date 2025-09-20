import Logo from "@/assets/images/logo.png";
import { styles } from "@/assets/styles/home.styles";
import { LogoutButton } from "@/components/LogOutBtn";
import TransItem from "@/components/TransItem";
import TransesNotFound from "@/components/TransNotFound";
import { summary, transactions, user } from "@/constants/mockApi";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const handleDelete = () => {};

export default function index() {
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        {/* header info */}
        <View style={styles.headerInfo}>
          <Image source={Logo} style={styles.headerLogo} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.usernameText}>{user.fname}</Text>
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
      </View>

      {/* balance card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
          ${parseFloat(summary.balance).toFixed(2)}
        </Text>
        <View style={styles.balanceStats}>
          <View style={styles.balanceStatItem}>
            <Text style={styles.balanceStatLabel}>Income</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
              +${parseFloat(summary.income).toFixed(2)}
            </Text>
          </View>
          <View style={[styles.balanceStatItem, styles.statDivider]} />
          <View style={styles.balanceStatItem}>
            <Text style={styles.balanceStatLabel}>Expenses</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
              -${Math.abs(parseFloat(summary.expenses)).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* recent trans */}
      <Text style={styles.transesListHeading}>Recent Transactions</Text>
      <FlatList
        contentContainerStyle={styles.transesListContent}
        data={transactions}
        renderItem={({ item }) => (
          <TransItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<TransesNotFound />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
