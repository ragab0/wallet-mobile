import { Ionicons } from "@expo/vector-icons";
import { RelativePathString } from "expo-router";

export type IonicIconType = keyof typeof Ionicons.glyphMap;

export interface SectionOptions {
  action: () => void;
  iconName: IonicIconType;
  title: string;
}

export interface HttpRedirectResponse {
  message: string;
  redirectTo: RelativePathString;
  payload: Record<string, any>;
}
