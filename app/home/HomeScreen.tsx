import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, ActivityIndicator } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useFonts } from "expo-font";

export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const [redirected, setRedirected] = useState(false);

  const [fontsLoaded] = useFonts({
    "Safiro-Medium": require("../../assets/fonts/Safiro-Medium.otf"),
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (!fontsLoaded) return;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // redireciona após animação
    const timer = setTimeout(() => {
      if (!redirected && pathname !== "/steps") {
        setRedirected(true);
        router.replace("/steps" as any);
      }
    }, 3500);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontsLoaded, fadeAnim, scaleAnim, redirected, pathname]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/financecoins.webp")}
        style={[
          styles.logo,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      />
      <Animated.Text
        style={[
          styles.title,
          { opacity: fadeAnim, fontFamily: "Safiro-Medium" },
        ]}
      >
        Finance Coins
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313ff",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4f84ff",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: "#fff",
  },
});
