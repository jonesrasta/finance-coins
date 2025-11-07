import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.button} onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={34} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderColor: "#c5c3c3ff",
    borderWidth: 0.4,
    backgroundColor: "rgba(105, 105, 105, 0.48)", // fundo leve translúcido
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 2,
  },
});
