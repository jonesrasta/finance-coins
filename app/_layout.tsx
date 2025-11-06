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

  // controla tempo da animação inicial
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  // enquanto fontes carregam
  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // identifica se estamos na tela splash ou steps
  const currentRoute = segments.join("/");
  const hideNavbar =
    currentRoute.includes("steps") ||
    currentRoute === "" || // tela inicial
    currentRoute.includes("homeScreen") || // se sua splash for /homeScreen
    currentRoute.includes("profile"); // opcional

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* só mostra a navbar se não for splash ou steps */}
        {!hideNavbar && <TopNavbar />}

        <View style={styles.container}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />{" "}
            {/* Splash */}
            <Stack.Screen
              name="steps/index"
              options={{ headerShown: false }}
            />{" "}
            {/* Steps */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />{" "}
            {/* Tabs */}
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
        </View>

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
  container: {
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
