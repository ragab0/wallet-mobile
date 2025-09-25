import { STORAGE_KEYS } from "@/constants/settings";
import { SettingsFormData } from "@/types/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useSettingsStorage() {
  const loadSettings = async (): Promise<SettingsFormData | null> => {
    try {
      const savedSettings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return savedSettings ? JSON.parse(savedSettings) : null;
    } catch (error) {
      console.error("Failed to load settings:", error);
      throw new Error("Failed to load settings");
    }
  };

  const saveSettings = async (settings: SettingsFormData): Promise<void> => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)),
        AsyncStorage.setItem(STORAGE_KEYS.CURRENT_THEME, settings.theme),
      ]);
    } catch (error) {
      console.error("Failed to save settings:", error);
      throw new Error("Failed to save settings");
    }
  };

  const clearSettings = async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.SETTINGS,
        STORAGE_KEYS.CURRENT_THEME,
      ]);
    } catch (error) {
      console.error("Failed to clear settings:", error);
    }
  };

  return { loadSettings, saveSettings, clearSettings };
}
