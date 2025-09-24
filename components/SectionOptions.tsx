import { globals } from "@/assets/styles/globals.styles";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { SectionOptions as SectionOptionsTypes } from "@/types/globals";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type props = {
  options: SectionOptionsTypes[];
  title: string;
};

export default function SectionOptions({ options, title }: props) {
  return (
    <View style={globals.card}>
      <Text style={globals.sectionTitle}>{title}</Text>
      {options.map(({ action, iconName, title }, i) => (
        <TouchableOpacity key={i} style={styles.menuItem} onPress={action}>
          <View style={styles.menuItemLeft}>
            <Ionicons name={iconName} size={20} color={COLORS.primary} />
            <Text style={styles.menuItemText}>{title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9A8478" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemText: {
    fontSize: SIZES.default,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginLeft: 12,
  },
});
