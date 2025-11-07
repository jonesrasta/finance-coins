import React, { useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { CustomText } from "@/components/CustomText";
import { FontAwesome } from "@expo/vector-icons";

export default function StepsScreen() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (step === 1) setStep(2);
    else router.replace("/(tabs)/home");
  };

  // alterna imagem de fundo conforme o step
  const backgroundImage =
    step === 1
      ? require("../../assets/images/backgroundstep.webp")
      : require("../../assets/images/backgroundstep1.webp");

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {step === 1 ? (
          <>
            <CustomText weight="Black" style={styles.title}>
              Start Your Crypto Journey
            </CustomText>
            <CustomText weight="Regular" style={styles.subtitle}>
              Create your account to explore the world of cryptocurrencies.
            </CustomText>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <CustomText weight="Bold" style={styles.buttonText}>
                Get Started
              </CustomText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <CustomText weight="Bold" style={styles.step}>
              Login or Sign up
            </CustomText>
            <TouchableOpacity
              style={[styles.buttonStep, { backgroundColor: "#e0e0e0ff" }]}
              onPress={() => router.replace("/(tabs)/home")}
            >
              <FontAwesome
                name="apple"
                size={28}
                color="#181818ff"
                style={styles.icon}
              />
              <CustomText weight="Bold" style={styles.buttonTextStep}>
                Continue with Apple
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStep, { backgroundColor: "#e0e0e0ff" }]}
              onPress={() => router.replace("/(tabs)/home")}
            >
              <Image
                source={require("../../assets/images/icon/google.png")}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <CustomText weight="Bold" style={styles.buttonTextStep}>
                Continue with Google
              </CustomText>
            </TouchableOpacity>

            {/* BOTÃO METAMASK */}
            <TouchableOpacity
              style={[
                styles.buttonStep,
                {
                  backgroundColor: "#1E1E1E",
                  borderWidth: 0.3,
                  borderColor: "#585858ff",
                },
              ]}
              onPress={() => router.replace("/(tabs)/home")}
            >
              <Image
                source={require("../../assets/images/icon/metamask.png")}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <CustomText weight="Bold" style={styles.TextStep}>
                Connect with MetaMask
              </CustomText>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.48)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 58,
    lineHeight: 60,
    color: "#fff",
    textAlign: "left",
    marginBottom: 10,
    top: 100,
    padding: 4,
  },
  subtitle: {
    fontSize: 26,
    lineHeight: 30,
    color: "#ddd",
    textAlign: "left",
    marginBottom: 40,
    top: 90,
  },
  button: {
    width: "100%",
    backgroundColor: "#C3FF5A",
    paddingVertical: 10,
    borderRadius: 30,
    marginVertical: 8,
    top: 70,
  },
  buttonText: {
    color: "#2e2828ff",
    fontSize: 24,
    textAlign: "center",
  },
  step: {
    fontSize: 40,
    color: "#fff",
    top: 50,
  },

  buttonStep: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 30,
    top: 60,
    marginVertical: 8,
  },
  icon: {
    marginRight: 14,
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 14,
  },
  buttonTextStep: {
    fontSize: 22,
    color: "#252525ff",
    textAlign: "center",
  },
  TextStep: {
    fontSize: 22,
    color: "#adadadff",
    textAlign: "center",
  },
});
