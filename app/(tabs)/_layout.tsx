import { FONTS, SIZES } from "@/constants/theme";
import { getThemeColorsAtom } from "@/stores/themeStore";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useAtomValue } from "jotai";

export default function TabsLayout() {
  const COLORS = useAtomValue(getThemeColorsAtom);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarLabelStyle: {
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium - 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
