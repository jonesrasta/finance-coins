import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


export type Period = "24h" | "Week" | "Month" | "6 Month" | "1 Year";

const PERIODS: Period[] = ["24h", "Week", "Month", "6 Month", "1 Year"];

type Props = {
  selectedPeriod: Period;
  onSelectPeriod: (period: Period) => void;
};

const Hero = ({ selectedPeriod, onSelectPeriod }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {/* All Your Crypto,{"\n"}One Powerful Wallet. */}
        Everything about crypto in one place.
      </Text>

      <View style={styles.periodRow}>
        {PERIODS.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.activeButton,
            ]}
            onPress={() => onSelectPeriod(period)}
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
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 52,
    marginBottom: 28,
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
