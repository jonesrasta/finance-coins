import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomText } from "../../components/CustomText";
import BackButton from "@/components/ui/BackButton";

export default function Profile() {
  const user = {
    name: "Jones Lima",
    email: "jones@email.com",
    avatar: require("../../assets/images/avatarj.webp"),
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <LinearGradient
          colors={["#333333ff", "#1d1d1dff", "#000000ff"]}
          style={styles.header}
        >
          <BackButton
            style={{
              position: "absolute",
              top: 16,
              left: 14,
              backgroundColor: "rgba(48, 48, 48, 0.2)",
            }}
          />
          <Image source={user.avatar} style={styles.avatar} />
          <CustomText variant="Safiro" weight="Medium" style={styles.name}>
            {user.name}
          </CustomText>
          <CustomText weight="Regular" style={styles.email}>
            {user.email}
          </CustomText>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <MaterialIcons
                name="notifications-active"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <MaterialCommunityIcons
                name="headphones-settings"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <MaterialCommunityIcons
                name="music-note-plus"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.options}>
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="account-cog"
                size={26}
                color="#ff5e00ff"
              />
            </View>
            <CustomText weight="Bold" style={styles.optionText}>
              Edit Profile
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="location-on" size={26} color="#ff5e00ff" />
            </View>
            <CustomText weight="Bold" style={styles.optionText}>
              Address Management
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="headset-sharp" size={26} color="#ff5e00ff" />
            </View>
            <CustomText weight="Bold" style={styles.optionText}>
              Help & Support
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="settings" size={26} color="#ff5e00ff" />
            </View>
            <CustomText weight="Bold" style={styles.optionText}>
              Setting
            </CustomText>
          </TouchableOpacity>

          {/* Botão de logout */}
          <TouchableOpacity
            style={[styles.optionRow, styles.logoutRow]}
            // função correta aqui
          >
            <View style={[styles.iconCircle, { backgroundColor: "#ff5e00ff" }]}>
              <MaterialIcons name="logout" size={26} color="#fff" />
            </View>
            <CustomText
              weight="Bold"
              style={[styles.optionText, { color: "#ff5e00ff" }]}
            >
              Sair
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { paddingBottom: 40, alignItems: "center", paddingTop: 60 },
  avatar: { width: 120, height: 120, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  email: { fontSize: 14, color: "#eee", marginBottom: 20 },
  quickActions: { flexDirection: "row", justifyContent: "center", gap: 12 },
  actionCard: {
    backgroundColor: "#22222281",
    padding: 24,
    borderRadius: 14,
    alignItems: "center",
    width: 90,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "#838383ff",
    elevation: 8,
  },
  options: { marginTop: 20, paddingHorizontal: 10 },
  optionRow: {
    height: 74,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 16,
    backgroundColor: "#f5f5f5fb",
    borderRadius: 20,
    paddingHorizontal: 8,
    marginBottom: 10,
    shadowColor: "#2e2e2eff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1.65,
  },
  optionText: { fontSize: 16, color: "#303030ff" },
  logoutRow: { marginTop: 2 },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#303030ff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1f1f1fff",
  },
});
