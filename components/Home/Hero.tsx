import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


export type Period = "24h" | "Week" | "Month" | "6 Month" | "1 Year";

const PERIODS: Period[] = ["24h", "Week", "Month", "6 Month", "1 Year"];

const Hero = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Week");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        All Your Crypto,{"\n"}One Powerful Wallet.
      </Text>

      <View style={styles.periodRow}>
        {PERIODS.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.activeButton,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period && styles.activeText,
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B0F0A",
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 48,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 24,
  },
  periodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  periodButton: {
    backgroundColor: "#1A1F1B",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: "#C3FF5A",
  },
  periodText: {
    color: "#888",
    fontWeight: "600",
    fontSize: 14,
  },
  activeText: {
    color: "#000",
  },
});

export default Hero;
