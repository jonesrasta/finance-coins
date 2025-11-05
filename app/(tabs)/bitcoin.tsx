import { StyleSheet, View, ScrollView } from "react-native";
import BitcoinChart from "@/components/Home/BitcoinChart";
import CryptoList from "@/components/Home/CryptoList";

export default function TabTwoScreen() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <BitcoinChart />
        <CryptoList />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#0B0F0A", // fundo igual ao resto do app
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40, // evita que o final fique colado
  },
  container: {
    gap: 24, // espaçamento entre seções
  },
});
