import { styles } from "@/assets/styles/account.styles";
import { globals } from "@/assets/styles/globals";
import LoadingSpinner from "@/components/LoadingSpinner";
import { LogoutButton } from "@/components/LogOutBtn";
import SectionOptions from "@/components/SectionOptions";
import { accountManagmentOptions, InfoOptions } from "@/constants/account";
import { COLORS } from "@/constants/theme";
import { useCurrentUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";

export default function AccountScreen() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <LoadingSpinner isFull={true} />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
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
        <SectionOptions title="Support & Info" options={InfoOptions} />

        {/* Logout Button */}
        <LogoutButton style={globals.card} showText={true} />

        {/* Account Info */}
        <View style={styles.accountInfo}>
          <Text style={styles.memberSinceText}>
            Member since {new Date(user?.createdAt || "").toLocaleDateString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
