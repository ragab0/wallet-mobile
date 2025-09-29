import AuthProvider from "@/components/AuthProviders";
import LoadingSpinner from "@/components/LoadingSpinner";
import { queryClient } from "@/configs/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAtomValue } from "jotai";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { getThemeColorsAtom } from "../stores/themeStore";

export default function RootLayout() {
  const COLORS = useAtomValue(getThemeColorsAtom);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
    InterLight: require("../assets/fonts/Inter-Light.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!loaded) return <LoadingSpinner size="large" isFull={true} />;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <StatusBar style="dark" />
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            {/* default - first accessable screen (child) */}
          </Stack>
        </AuthProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
