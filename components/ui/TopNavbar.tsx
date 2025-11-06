// ui/TopNavbar.tsx
import { Ionicons } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function TopNavbar() {
  return (
    <View style={styles.container}>
      {/* Ícones à esquerda */}
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Avatar à direita */}
      <TouchableOpacity style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/avatarj.webp")}
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2e2e2e0c",
    height: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 2 ,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
        width: 50,
    height: 50,
    marginRight: 16,
    backgroundColor: "#35353581",
    borderRadius: 80,
    padding: 8,
    alignItems: "center"
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 23,
  },
});
