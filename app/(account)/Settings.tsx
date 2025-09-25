import { createGlobalStyles } from "@/assets/styles/globals.styles";
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import KeyboardLayout from "@/components/KeyboardLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import PopupModal from "@/components/PopupModal";
import SettingItem from "@/components/SettingItem";
import SettingSwitch from "@/components/Switch";
import { AVAILABLE_CURRENCIES } from "@/constants/settings";
import { AVAILABLE_THEMES } from "@/constants/theme";
import { useLogout } from "@/hooks/useAuth";
import { useDeleteAccount } from "@/hooks/useUser";
import { useSelectedCurrency, useSettingsStore } from "@/stores/settingsStore";
import { useThemeStore } from "@/stores/themeStore";
import { Currency } from "@/types/settings";
import { AppTheme } from "@/types/theme";
import { handleEmail } from "@/utils/handleEmail";
import { openPhone } from "@/utils/handlePhone";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { mutate: logout } = useLogout();
  const deleteAccountMutation = useDeleteAccount();
  const { setTheme, getCurrentTheme } = useThemeStore();
  const currentTheme = getCurrentTheme();
  const styles = createSettingsStyles(currentTheme?.colors);
  const globals = createGlobalStyles(currentTheme?.colors);
  const {
    pushNotifications,
    emailNotifications,
    setCurrency,
    setPushNotifications,
    setEmailNotifications,
  } = useSettingsStore();
  const selectedCurrency = useSelectedCurrency();
  const [showCurrencyModal, setShowCurrencyModal] = React.useState(false);
  const [showThemeModal, setShowThemeModal] = React.useState(false);

  function handleCurrencySelect(currency: Currency) {
    setCurrency(currency.code);
    setShowCurrencyModal(false);
  }

  function handleThemeSelect(theme: AppTheme) {
    setTheme(theme.key);
    setShowThemeModal(false);
  }

  function handleDeleteAccount() {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: confirmDeleteAccount,
        },
      ]
    );
  }

  function confirmDeleteAccount() {
    Alert.alert(
      "Final Confirmation",
      "This will permanently delete your account and all data.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "I understand, delete my account",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccountMutation.mutateAsync();
              logout();
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete account. Please try again."
              );
            }
          },
        },
      ]
    );
  }

  async function openEmail() {
    await handleEmail(
      "GreenWallet Support",
      "Hello GreenWallet Support Team,\n\n",
      "Support email has been copied to your clipboard."
    );
  }

  function supportActions() {
    Alert.alert("Contact Support", "How would you like to contact us?", [
      { text: "Cancel", style: "cancel" },
      { text: "Email", onPress: openEmail },
      { text: "Phone", onPress: openPhone },
    ]);
  }
  async function reportBug() {
    await handleEmail(
      "GreenWallet Bug Report",
      "Hello GreenWallet Team,\n\nI found an issue in the app. Here are the details:\n\n- Description: \n- Steps to reproduce: \n- Expected behavior: \n- Actual behavior: \n- Device: [Your device model]\n- OS Version: [Your OS version]\n- App Version: [Your app version]\n\n",
      "Bug report email has been copied to your clipboard."
    );
  }

  function rateApp() {
    Alert.alert(
      "Rate App",
      // "Thank you for using GreenWallet! This would redirect to the app store."
      "Thank you for using GreenWallet! This app will be available soon the app store."
    );
  }

  return (
    <KeyboardLayout>
      <View style={globals.container}>
        {/* Notifications Section */}
        <View style={globals.card}>
          <Text style={globals.sectionTitle}>Notifications</Text>
          <SettingSwitch
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Receive notifications for transactions and updates"
            value={pushNotifications}
            onValueChange={setPushNotifications}
          />
          <SettingSwitch
            icon="mail-outline"
            title="Email Notifications"
            subtitle="Receive email updates and summaries"
            value={emailNotifications}
            onValueChange={setEmailNotifications}
          />
        </View>

        {/* App Preferences Section */}
        <View style={globals.card}>
          <Text style={globals.sectionTitle}>App Preferences</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setShowThemeModal(true)}
          >
            <View style={styles.settingItemLeft}>
              <View
                style={[
                  styles.themeColorPreview,
                  { backgroundColor: currentTheme?.primaryColor || "#8B593E" },
                ]}
              />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>Theme</Text>
                <Text style={styles.settingItemSubtitle}>
                  {currentTheme?.name} - {currentTheme?.description}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9A8478" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setShowCurrencyModal(true)}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons
                name="card-outline"
                size={20}
                color={currentTheme?.colors.primary}
              />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>Currency</Text>
                <Text style={styles.settingItemSubtitle}>
                  {selectedCurrency?.name} ({selectedCurrency?.symbol})
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={currentTheme?.colors.textLight}
            />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={globals.card}>
          <Text style={globals.sectionTitle}>Support & Feedback</Text>
          <SettingItem
            icon="chatbubble-outline"
            title="Contact Support"
            subtitle="Get help with your account"
            onPress={supportActions}
          />
          <SettingItem
            icon="star-outline"
            title="Rate App"
            subtitle="Help us improve GreenWallet"
            onPress={rateApp}
          />
          <SettingItem
            icon="bug-outline"
            title="Report Bug"
            subtitle="Found an issue? Let us know"
            onPress={reportBug}
          />
        </View>

        {/* App Info Section */}
        <View style={globals.card}>
          <Text style={globals.sectionTitle}>About</Text>
          <SettingItem
            icon="information-circle-outline"
            title="App Version"
            subtitle="1.0.0 (Build 100)"
          />
          <Text style={styles.builtWith}>
            Made With Love By{" "}
            <Link href="https://ragab.vercel.app" style={styles.builtBy}>
              Ragab
            </Link>{" "}
            © 2025
          </Text>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <Text style={styles.dangerSectionTitle}>Danger Zone</Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
            disabled={deleteAccountMutation.isPending}
          >
            {deleteAccountMutation.isPending ? (
              <LoadingSpinner size="small" color="#E74C3C" />
            ) : (
              <>
                <Ionicons name="trash-outline" size={20} color="#E74C3C" />
                <Text style={styles.deleteButtonText}>Delete Account</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.deleteWarning}>
            This action cannot be undone. All your data will be permanently
            removed.
          </Text>
        </View>

        {/* modals */}
        <PopupModal
          visible={showCurrencyModal}
          onClose={() => setShowCurrencyModal(false)}
          title="Select Currency"
        >
          {AVAILABLE_CURRENCIES.map((currency) => (
            <TouchableOpacity
              key={currency.code}
              style={[
                styles.modalOption,
                currency.code === selectedCurrency?.code &&
                  styles.modalOptionSelected,
              ]}
              onPress={() => handleCurrencySelect(currency)}
            >
              <View style={styles.currencyInfo}>
                <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                <View>
                  <Text style={styles.modalOptionTitle}>{currency.name}</Text>
                  <Text style={styles.modalOptionSubtitle}>
                    {currency.code}
                  </Text>
                </View>
              </View>
              {currency.code === selectedCurrency?.code && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={currentTheme?.colors.primary}
                />
              )}
            </TouchableOpacity>
          ))}
        </PopupModal>

        {/* Theme Selection Modal */}
        <PopupModal
          visible={showThemeModal}
          onClose={() => setShowThemeModal(false)}
          title="Select Theme"
        >
          {AVAILABLE_THEMES.map((theme) => (
            <TouchableOpacity
              key={theme.key}
              style={[
                styles.modalOption,
                currentTheme?.key === theme.key && styles.modalOptionSelected,
              ]}
              onPress={() => handleThemeSelect(theme)}
            >
              <View style={styles.themeInfo}>
                <View
                  style={[
                    styles.themeColorCircle,
                    { backgroundColor: theme.primaryColor },
                  ]}
                />
                <View>
                  <Text style={styles.modalOptionTitle}>{theme.name}</Text>
                  <Text style={styles.modalOptionSubtitle}>
                    {theme.description}
                  </Text>
                </View>
              </View>
              {currentTheme?.key === theme.key && (
                <Ionicons name="checkmark" size={20} color="#8B593E" />
              )}
            </TouchableOpacity>
          ))}
        </PopupModal>
      </View>
    </KeyboardLayout>
  );
}
