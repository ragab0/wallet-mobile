import { Currency, SettingsFormData } from "@/types/settings";

// Storage keys
export const STORAGE_KEYS = {
  SETTINGS: "@app_settings",
  CURRENT_THEME: "@current_theme",
} as const;

// Constants
export const AVAILABLE_CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
];

export const DEFAULT_SETTINGS: SettingsFormData = {
  notifications: true,
  emailNotifications: true,
  pushNotifications: true,
  currencyCode: "USD",
  themeName: "coffee",
};
