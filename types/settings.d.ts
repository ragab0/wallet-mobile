export interface SettingsFormData {
  notifications: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  currency: string;
  theme: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface AppTheme {
  key: string;
  name: string;
  description: string;
  primaryColor: string;
}
