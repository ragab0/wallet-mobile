import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { getThemeColorsAtom } from "@/stores/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { useAtomValue } from "jotai";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => {
  const COLORS = useAtomValue(getThemeColorsAtom);
  const styles = createSettingsStyles(COLORS);
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon as any} size={20} color={COLORS.primary} />
        <View style={styles.settingItemText}>
          <Text style={styles.settingItemTitle}>{title}</Text>
          <Text style={styles.settingItemSubtitle}>{subtitle}</Text>
        </View>
      </View>
      {onPress && (
        <View style={styles.settingItemRight}>
          <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;
