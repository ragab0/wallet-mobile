import { AVAILABLE_THEMES } from "@/constants/theme";
import { AppTheme } from "@/types/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeState = {
  currentThemeKey: string;
  setTheme: (themeKey: string) => void;
  getCurrentTheme: () => AppTheme | undefined;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentThemeKey: "coffee", // Default theme
      setTheme: (themeKey: string) => set({ currentThemeKey: themeKey }),
      getCurrentTheme: () => {
        const { currentThemeKey } = get();
        return AVAILABLE_THEMES.find((theme) => theme.key === currentThemeKey);
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Hook to get current theme colors
export const useThemeColors = () => {
  const getCurrentTheme = useThemeStore((state) => state.getCurrentTheme);
  const theme = getCurrentTheme();
  return theme?.colors || AVAILABLE_THEMES[0].colors;
};
