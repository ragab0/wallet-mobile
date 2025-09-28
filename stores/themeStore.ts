import { DEFAULT_SETTINGS } from "@/constants/settings";
import { AVAILABLE_THEMES } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStorage as AS } from "jotai/vanilla/utils/atomWithStorage";

const asyncStorageAdapter = createJSONStorage(() => AsyncStorage);
export const currentThemeKeyAtom = atomWithStorage(
  "theme-storage",
  DEFAULT_SETTINGS.themeName,
  asyncStorageAdapter as AS<string>,
  { getOnInit: true }
);

export const getCurrentThemeAtom = atom((get) => {
  const currentThemeKey = get(currentThemeKeyAtom);
  return AVAILABLE_THEMES.find((theme) => theme.key === currentThemeKey);
});

export const getThemeColorsAtom = atom((get) => {
  const theme = get(getCurrentThemeAtom);
  return theme?.colors || AVAILABLE_THEMES[0].colors;
});
