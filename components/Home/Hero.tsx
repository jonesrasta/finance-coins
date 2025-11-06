import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomText } from "../CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type Period = "24h" | "Week" | "Month" | "6 Month" | "1 Year";

const PERIODS: Period[] = ["24h", "Week", "Month", "6 Month", "1 Year"];

type Props = {
  selectedPeriod: Period;
  onSelectPeriod: (period: Period) => void;
};

const Hero = ({ selectedPeriod, onSelectPeriod }: Props) => {
  return (
    <View style={styles.container}>
      <CustomText weight="Black" style={styles.title}>
        {/* All Your Crypto,{"\n"}One Powerful Wallet. */}
        Everything about crypto in one place.
        <View style={styles.iconOuter}>
          <View style={styles.iconInner}>
            <MaterialCommunityIcons
              name="star-four-points"
              size={28}
              color="#1d1d1dff"
            />
          </View>
        </View>
      </CustomText>

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
    paddingHorizontal: 16,
    paddingTop: 24,
    marginTop: 14,
    marginBottom: 2,
  },
  title: {
    fontSize: 64,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 74,
    marginBottom: 18,
    includeFontPadding: false,
    textAlignVertical: "top",
    marginLeft: 10,
  },
  periodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
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
iconOuter: {
  width: 40,
  height: 40,
  backgroundColor: "#c3ff5a77",
  borderRadius: 80,
  padding: 2,

},

iconInner: {
  width: 40,
  height: 40,
  backgroundColor: "#C3FF5A",
  borderRadius: 80,
  padding: 4,
  justifyContent: "center",
  alignItems: "center",
  top: 4,
   marginHorizontal: 10,

},
});

export default Hero;
