// @/components/SettingItem.tsx
import { styles } from "@/assets/styles/settings.styles";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
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
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon as any} size={20} color={COLORS.primary} />
        <View style={styles.settingItemText}>
          <Text style={styles.settingItemTitle}>{title}</Text>
          <Text style={styles.settingItemSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.settingItemRight}>
        <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;
