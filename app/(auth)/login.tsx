import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { CustomText } from "@/components/CustomText";
import { useRouter } from "expo-router";
import BackButton from "@/components/ui/BackButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    // Aqui você pode colocar lógica de autenticação antes, se quiser
    router.push("/home"); // navega para a rota 'home'
  };

  return (
    <LinearGradient
      colors={["#C3FF5A", "#222222", "#242424"]}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <BackButton />
        {/* resto da tela */}
      </View>
      <SafeAreaView>
        <View>
          {/* Logo */}
          <Image
            source={require("../../assets/images/financecoins.webp")} // substitua pelo seu logo
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Título */}
          <CustomText weight="Medium" style={styles.title}>
            Sign in to Your Account
          </CustomText>

          {/* Input Email */}
          <CustomText weight="Medium" style={styles.label}>
            Email Address
          </CustomText>
          <CustomText weight="Regular">
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#7c7c7c9f"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </CustomText>

          {/* Input Senha */}
          <CustomText weight="Medium" style={styles.label}>
            Password
          </CustomText>
          <CustomText weight="Regular">
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#7c7c7c9f"
              style={styles.input}
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />
          </CustomText>
          {/* Remember + Forgot */}
          <View style={styles.options}>
            <View style={styles.rememberContainer}>
              <TouchableOpacity style={styles.checkbox} />
              <CustomText weight="Regular" style={styles.rememberText}>
                Remember
              </CustomText>
            </View>
            <TouchableOpacity>
              <CustomText weight="Regular" style={styles.forgotText}>
                Forgot Password ?
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* Botão Sign In */}
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <CustomText weight="Bold" style={styles.signInText}>
              Sign In
            </CustomText>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <CustomText weight="Medium" style={styles.orText}>
              OR
            </CustomText>
            <View style={styles.dividerLine} />
          </View>

          {/* Botões sociais */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={44} color="#828282" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/images/icon/google.png")}
                style={{ width: 34, height: 34, margin: 5 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Sign up */}
          <CustomText weight="Medium" style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={styles.signUpText}>Sign up</Text>
          </CustomText>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    alignSelf: "center",
  },
  title: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 28,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    color: "#ccc",
    fontSize: 20,
    marginBottom: 6,
    marginLeft: 16,
  },
  input: {
    width: "100%",
    backgroundColor: "#2D2D2D",
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 15,
    color: "#fff",
    borderColor: "#585858ff",
    borderWidth: 0.7,
    fontFamily: "SairaCondensed-Regular",
    fontSize: 18,
  },
  options: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#c3ff5a98",
    marginRight: 6,
  },
  rememberText: {
    color: "#ccc",
    fontSize: 16,
  },
  forgotText: {
    color: "#ccc",
    fontSize: 16,
    marginRight: 16,
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#C3FF5A",
    paddingVertical: 10,
    borderRadius: 30,
    marginVertical: 8,
    alignItems: "center",
    marginBottom: 25,
  },
  signInText: {
    color: "#2e2828ff",
    fontSize: 24,
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 25,
    alignSelf: "center",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#444",
  },
  orText: {
    color: "#ccc",
    marginHorizontal: 14,
    fontSize: 18,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 16,
    borderColor: "#585858ff",
    borderWidth: 0.7,
  },
  footerText: {
    color: "#ccc",
    fontSize: 20,
    textAlign: "center",
  },
  signUpText: {
    color: "#C3FF5A",
    fontWeight: "600",
    fontSize: 20,
  },
});
