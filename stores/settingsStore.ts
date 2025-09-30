import { AVAILABLE_CURRENCIES, DEFAULT_SETTINGS } from "@/constants/settings";
import { Currency } from "@/types/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStorage as AS } from "jotai/vanilla/utils/atomWithStorage";
import { Platform } from "react-native";

/* Base atoms with persistence */
const asyncStorageAdapter = createJSONStorage(() =>
  Platform.OS === "web" ? localStorage : AsyncStorage
);

export const currencyAtomCode = atomWithStorage<string>(
  "settings-currency",
  DEFAULT_SETTINGS.currencyCode,
  asyncStorageAdapter as AS<string>,
  { getOnInit: true }
);
export const pushNotificationsAtom = atomWithStorage<boolean>(
  "settings-push-notifications",
  DEFAULT_SETTINGS.pushNotifications,
  asyncStorageAdapter as AS<boolean>,
  { getOnInit: true }
);
export const emailNotificationsAtom = atomWithStorage<boolean>(
  "settings-email-notifications",
  DEFAULT_SETTINGS.emailNotifications,
  asyncStorageAdapter as AS<boolean>,
  { getOnInit: true }
);

export const resetSettingsAtom = atom(null, async (_, set) => {
  await set(currencyAtomCode, DEFAULT_SETTINGS.currencyCode);
  await set(pushNotificationsAtom, DEFAULT_SETTINGS.pushNotifications);
  await set(emailNotificationsAtom, DEFAULT_SETTINGS.emailNotifications);
});

// Derived atom for selected currency
export const getSelectedCurrencyAtom = atom((get) => {
  const currencyCode = get(currencyAtomCode);
  return AVAILABLE_CURRENCIES.find((c: Currency) => c.code === currencyCode);
});
