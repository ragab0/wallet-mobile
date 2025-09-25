import { styles } from "@/assets/styles/settings.styles";
import { Ionicons } from "@expo/vector-icons";
import { Switch, Text, View } from "react-native";

interface props {
  icon: string;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function SettingSwitch({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
  disabled = false,
}: props) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon as any} size={20} color="#8B593E" />
        <View style={styles.settingItemText}>
          <Text style={styles.settingItemTitle}>{title}</Text>
          <Text style={styles.settingItemSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E5D3B7", true: "#8B593E" }}
        thumbColor={value ? "#FFFFFF" : "#9A8478"}
        disabled={disabled}
      />
    </View>
  );
}
