import { StyleSheet, View } from "react-native";
import { useState } from "react";

// import BitcoinChart from "../../components/Home/BitcoinChart";
// import CryptoList from "../../components/Home/CryptoList";
import Hero from "@/components/Home/Hero";
import Carousel from "../../components/Home/Carousel";

// Tipos de período disponíveis
export type Period = "24h" | "Week" | "Month" | "6 Month" | "1 Year";

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Week");

  return (
    <View style={styles.container}>
      <Hero selectedPeriod={selectedPeriod} onSelectPeriod={setSelectedPeriod} />
      <Carousel selectedPeriod={selectedPeriod} />

      {/* <BitcoinChart />
      <CryptoList /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F0A",
    paddingHorizontal: 8,
    paddingTop: 12,
    gap: 24,
  },
});
