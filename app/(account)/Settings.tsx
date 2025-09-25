import { globals } from "@/assets/styles/globals.styles";
import { styles } from "@/assets/styles/settings.styles";
import KeyboardLayout from "@/components/KeyboardLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import PopupModal from "@/components/PopupModal";
import SettingItem from "@/components/SettingItem";
import SettingSwitch from "@/components/Switch";
import { AVAILABLE_CURRENCIES, DEFAULT_SETTINGS } from "@/constants/settings";
import { AVAILABLE_THEMES } from "@/constants/theme";
import { useLogout } from "@/hooks/useAuth";
import { useSettingsStorage } from "@/hooks/useSettingsStorage";
import { useDeleteAccount } from "@/hooks/useUser";
import { Currency, SettingsFormData } from "@/types/settings";
import { AppTheme } from "@/types/theme";
import { settingsSchema } from "@/validations/settings.validation";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { mutate: logout } = useLogout();
  const deleteAccountMutation = useDeleteAccount();
  const { loadSettings, saveSettings, clearSettings } = useSettingsStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<AppTheme | null>(null);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<SettingsFormData>({
    resolver: yupResolver(settingsSchema),
    defaultValues: DEFAULT_SETTINGS,
    mode: "onChange",
  });
  const watchedValues = watch();
  const selectedCurrency = AVAILABLE_CURRENCIES.find(
    (c) => c.code === watchedValues.currency
  );
  const selectedTheme = AVAILABLE_THEMES.find(
    (t) => t.key === watchedValues.theme
  );

  // Load settings on mount
  useEffect(() => {
    initializeSettings();
  }, []);

  // Auto-save with debouncing
  useEffect(() => {
    if (isDirty && !isLoading) {
      const timeoutId = setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [watchedValues, isDirty, isLoading, handleSubmit]);

  async function initializeSettings() {
    try {
      setIsLoading(true);
      const savedSettings = await loadSettings();

      if (savedSettings) {
        reset(savedSettings, { keepDefaultValues: false });
        const theme = AVAILABLE_THEMES.find(
          (t) => t.key === savedSettings.theme
        );
        if (theme) setCurrentTheme(theme);
      } else {
        const defaultTheme = AVAILABLE_THEMES.find(
          (t) => t.key === DEFAULT_SETTINGS.theme
        );
        if (defaultTheme) setCurrentTheme(defaultTheme);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(data: SettingsFormData) {
    try {
      setIsSaving(true);
      await saveSettings(data);
      const theme = AVAILABLE_THEMES.find((t) => t.key === data.theme);
      if (theme && theme.key !== currentTheme?.key) {
        setCurrentTheme(theme);
        // Emit theme change event or update context here
        // themeContext.changeTheme(theme);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCurrencySelect(currency: Currency) {
    setValue("currency", currency.code, { shouldDirty: true });
    setShowCurrencyModal(false);
  }

  function handleThemeSelect(theme: AppTheme) {
    setValue("theme", theme.key, { shouldDirty: true });
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
              await clearSettings();
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

  function supportActions() {
    Alert.alert("Contact Support", "How would you like to contact us?", [
      { text: "Cancel", style: "cancel" },
      { text: "Email", onPress: () => console.log("Open email support") },
      { text: "Phone", onPress: () => console.log("Open phone support") },
    ]);
  }
  function rateApp() {
    Alert.alert(
      "Rate App",
      "Thank you for using GreenWallet! This would redirect to the app store."
    );
  }
  function reportBug() {
    Alert.alert("Report Bug", "This would open the bug report form.");
  }

  if (isLoading) {
    return (
      <View
        style={[
          globals.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <LoadingSpinner size="large" color="#8B593E" />
        <Text style={{ marginTop: 10, color: "#8B593E" }}>
          Loading settings...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardLayout>
      <View style={globals.container}>
        {/* Save Status Indicator */}
        {(isDirty || isSaving) && (
          <View style={styles.formStatus}>
            {isSaving ? (
              <>
                <LoadingSpinner size="small" color="#8B593E" />
                <Text style={[styles.formStatusText, styles.formStatusUnsaved]}>
                  Saving...
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="time-outline" size={16} color="#E74C3C" />
                <Text style={[styles.formStatusText, styles.formStatusUnsaved]}>
                  Unsaved changes
                </Text>
              </>
            )}
          </View>
        )}

        {/* Notifications Section */}
        <View style={globals.card}>
          <Text style={globals.sectionTitle}>Notifications</Text>
          <Controller
            control={control}
            name="pushNotifications"
            render={({ field: { value, onChange } }) => (
              <SettingSwitch
                icon="notifications-outline"
                title="Push Notifications"
                subtitle="Receive notifications for transactions and updates"
                value={value}
                onValueChange={onChange}
                disabled={isSaving}
              />
            )}
          />
          <Controller
            control={control}
            name="emailNotifications"
            render={({ field: { value, onChange } }) => (
              <SettingSwitch
                icon="mail-outline"
                title="Email Notifications"
                subtitle="Receive email updates and summaries"
                value={value}
                onValueChange={onChange}
                disabled={isSaving}
              />
            )}
          />
        </View>

        {/* App Preferences Section */}
        <View style={globals.card}>
          <Text style={globals.sectionTitle}>App Preferences</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setShowThemeModal(true)}
            disabled={isSaving}
          >
            <View style={styles.settingItemLeft}>
              <View
                style={[
                  styles.themeColorPreview,
                  { backgroundColor: selectedTheme?.primaryColor || "#8B593E" },
                ]}
              />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>Theme</Text>
                <Text style={styles.settingItemSubtitle}>
                  {selectedTheme?.name} - {selectedTheme?.description}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9A8478" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setShowCurrencyModal(true)}
            disabled={isSaving}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons name="card-outline" size={20} color="#8B593E" />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>Currency</Text>
                <Text style={styles.settingItemSubtitle}>
                  {selectedCurrency?.name} ({selectedCurrency?.symbol})
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9A8478" />
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
                watchedValues.currency === currency.code &&
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
              {watchedValues.currency === currency.code && (
                <Ionicons name="checkmark" size={20} color="#8B593E" />
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
                watchedValues.theme === theme.key && styles.modalOptionSelected,
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
              {watchedValues.theme === theme.key && (
                <Ionicons name="checkmark" size={20} color="#8B593E" />
              )}
            </TouchableOpacity>
          ))}
        </PopupModal>
      </View>
    </KeyboardLayout>
  );
}
