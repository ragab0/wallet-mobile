import { DEFAULT_SETTINGS } from "@/constants/settings";
import { Currency } from "@/types/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SettingsState = {
  currency: string;
  pushNotifications: boolean;
  emailNotifications: boolean;
  setCurrency: (currency: string) => void;
  setPushNotifications: (enabled: boolean) => void;
  setEmailNotifications: (enabled: boolean) => void;
  resetSettings: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      setCurrency: (currency) => set({ currency }),
      setPushNotifications: (pushNotifications) => set({ pushNotifications }),
      setEmailNotifications: (emailNotifications) =>
        set({ emailNotifications }),
      resetSettings: () => set({ ...DEFAULT_SETTINGS }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist these fields
      partialize: (state) => ({
        currency: state.currency,
        pushNotifications: state.pushNotifications,
        emailNotifications: state.emailNotifications,
      }),
    }
  )
);

// Hook to get the selected currency object
export const useSelectedCurrency = () => {
  const currencyCode = useSettingsStore((state) => state.currency);
  const { AVAILABLE_CURRENCIES } = require("@/constants/settings");
  return AVAILABLE_CURRENCIES.find((c: Currency) => c.code === currencyCode);
};
