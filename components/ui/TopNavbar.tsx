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
          <Ionicons name="search-outline" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={30} color="#fff" />
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
    backgroundColor: "#1414140c",
    height: 80,
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
    marginRight: 14,
    backgroundColor: "#353535b6",
    borderRadius: 60,
    padding: 18,
    gap: 4,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 23,
  },
});
