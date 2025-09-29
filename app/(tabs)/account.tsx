import { createAccountStyles } from "@/assets/styles/account.styles";
import { createGlobalStyles } from "@/assets/styles/globals.styles";
import LoadingSpinner from "@/components/LoadingSpinner";
import { LogoutButton } from "@/components/LogOutBtn";
import SectionOptions from "@/components/SectionOptions";
import { accountManagmentOptions } from "@/constants/account";
import { useCurrentUser } from "@/hooks/useUser";
import { getThemeColorsAtom } from "@/stores/themeStore";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { useAtomValue } from "jotai";
import { Image, ScrollView, Text, View } from "react-native";

export default function AccountScreen() {
  const { data: user, isLoading } = useCurrentUser();
  const COLORS = useAtomValue(getThemeColorsAtom);
  const styles = createAccountStyles(COLORS);
  const globals = createGlobalStyles(COLORS);

  if (isLoading) {
    return <LoadingSpinner size="large" isFull={true} />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={globals.container}>
      {/* header */}
      <View style={styles.profileHeader}>
        {/* header image */}
        {user?.picture ? (
          <Image source={{ uri: user.picture }} style={styles.avatar} />
        ) : (
          <View style={styles.defaultAvatar}>
            <Ionicons name="person" size={40} color={COLORS.primary} />
          </View>
        )}
        {/* header userInfo */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user?.fname} {user?.lname}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: user?.isActive ? "#10B981" : "#EF4444" },
              ]}
            >
              <Text style={styles.statusText}>
                {user?.isActive ? "Active" : "Inactive"}
              </Text>
            </View>
            {user?.isEmailVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Menus */}
      <SectionOptions
        title="Account Management"
        options={accountManagmentOptions}
      />

      {/* Logout Button */}
      <LogoutButton style={globals.card} showText={true} />

      {/* Account Info */}
      <View style={styles.accountInfo}>
        <Text style={styles.memberSinceText}>
          Member since {formatDate(user?.createdAt) || "a long time"}
        </Text>
      </View>
    </ScrollView>
  );
}
