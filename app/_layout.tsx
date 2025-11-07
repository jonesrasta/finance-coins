import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavbar from "@/components/ui/TopNavbar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useLoadFonts from "@/hooks/useLoadFonts";
import { useState, useEffect } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments() as string[];
  const fontsLoaded = useLoadFonts();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Identifica rotas que não devem exibir a TopNavbar
  const currentRoute = segments.join("/");
  const hideNavbar =
    currentRoute.includes("steps") ||
    currentRoute === "" ||
    currentRoute.includes("homeScreen") ||
    currentRoute.includes("profile") ||
    currentRoute.includes("login");

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {!hideNavbar && <TopNavbar />}

        {/* Stack precisa ser filho direto */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="steps/index" />
          <Stack.Screen name="(tabs)" />
        </Stack>

        <StatusBar style="light" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d0d0d",
  },
});
