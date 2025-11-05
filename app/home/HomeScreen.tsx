import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

export default function HomeScreen() {
  const router = useRouter();

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


    
  }, [fadeAnim, scaleAnim, router, fontsLoaded]);

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
        source={require("../../assets/images/soundchaincolor.png")}
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
        Sound Chain
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
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
    fontSize: 24,
    color: "#fff",
  },
});
