// ui/BackButton.tsx
import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur"; 

interface BackButtonProps {
  style?: ViewStyle;
}

export default function BackButton({ style }: BackButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style]}
      onPress={() => router.back()}
      activeOpacity={0.8}
    >
      
      <BlurView intensity={60} tint="dark" style={styles.blurView} />

      {/* Ícone acima do blur */}
      <Ionicons name="chevron-back" size={20} color="#f0f0f0b0" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    overflow: "hidden", 
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 2,
    borderColor: "#99999983",
    borderWidth: 0.5,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject, 
  },
});
