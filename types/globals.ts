import { Ionicons } from "@expo/vector-icons";

export type IonicIconType = keyof typeof Ionicons.glyphMap;

export interface SectionOptions {
  action: () => void;
  iconName: IonicIconType;
  title: string;
}
