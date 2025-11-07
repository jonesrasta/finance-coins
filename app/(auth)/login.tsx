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
      <SafeAreaView>
        <View>
        {/* Logo */}
        <Image
          source={require("../../assets/images/financecoins.webp")} // substitua pelo seu logo
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Título */}
        <CustomText weight="Medium" style={styles.title}>Sign in to Your Account</CustomText>

        {/* Input Email */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* Input Senha */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        {/* Remember + Forgot */}
        <View style={styles.options}>
          <View style={styles.rememberContainer}>
            <TouchableOpacity style={styles.checkbox} />
            <Text style={styles.rememberText}>Remember</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password ?</Text>
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
          <Text style={styles.orText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Botões sociais */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={50} color="#828282" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/images/icon/google.png")}
              style={{ width: 40, height: 40, margin: 5 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Sign up */}
        <CustomText weight="Medium" style={styles.footerText}>
          Don’t have an account? <Text style={styles.signUpText}>Sign up</Text>
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
    paddingTop: 90,
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
    fontSize: 16,
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
    fontSize: 14,
  },
  forgotText: {
    color: "#ccc",
    fontSize: 14,
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
    marginHorizontal: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: "#333",
    padding: 9,
    borderRadius: 16,
    borderColor: "#585858ff",
    borderWidth: 0.8,
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
