// components/Home/Finance.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import axios from "axios";

const { width } = Dimensions.get("window");

interface Ticker {
  symbol: string;
  priceChangePercent: number;
  lastPrice: number;
}

export default function Finance() {
  const [topCryptos, setTopCryptos] = useState<Ticker[]>([]);
  const [gainers, setGainers] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 60000); // atualiza a cada 60s
    return () => clearInterval(id);
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await axios.get("https://api.binance.com/api/v3/ticker/24hr");

      // Convertendo para número logo aqui
      const tickers: Ticker[] = res.data.map((t: any) => ({
        symbol: t.symbol,
        priceChangePercent: parseFloat(t.priceChangePercent),
        lastPrice: parseFloat(t.lastPrice),
      }));

      // principais pares
      const majors = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT"];
      const top = tickers.filter((t) => majors.includes(t.symbol));

      // maiores altas
      const gainersSorted = tickers
        .filter((t) => t.symbol.endsWith("USDT"))
        .sort((a, b) => b.priceChangePercent - a.priceChangePercent)
        .slice(0, 10);

      setTopCryptos(top);
      setGainers(gainersSorted);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C3FF5A" />
        <Text style={{ color: "#999", marginTop: 10 }}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Main market</Text>

      {/* Carrossel horizontal */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topCryptos}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => <CarouselCard item={item} />}
        contentContainerStyle={{ paddingRight: 16 }}
      />

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
        Best investments
      </Text>

      {/* Lista vertical */}
      <FlatList
        data={gainers}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => <GainerRow item={item} />}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </ScrollView>
  );
}

function CarouselCard({ item }: { item: Ticker }) {
  const color = item.priceChangePercent >= 0 ? "#2FE08D" : "#FF6B6B";
  return (
    <View style={styles.carouselCard}>
      <Text style={styles.carouselSymbol}>
        {item.symbol.replace("USDT", "")}
      </Text>
      <Text style={styles.carouselPrice}>${item.lastPrice.toFixed(2)}</Text>
      <Text style={[styles.carouselChange, { color }]}>
        {item.priceChangePercent.toFixed(2)}%
      </Text>
    </View>
  );
}

function GainerRow({ item }: { item: Ticker }) {
  const color = item.priceChangePercent >= 0 ? "#47f0a1ff" : "#FF6B6B";
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{item.symbol.replace("USDT", "")}</Text>
      <Text style={styles.price}>${item.lastPrice.toFixed(3)}</Text>
      <Text style={[styles.percent, { color }]}>
        {item.priceChangePercent.toFixed(2)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#0B0F0A",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    backgroundColor: "#0B0F0A",
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  carouselCard: {
    width: width * 0.38,
    backgroundColor: "#121712",
    borderRadius: 16,
    padding: 14,
    marginRight: 14,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  carouselSymbol: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  carouselPrice: {
    color: "#C3FF5A",
    fontSize: 18,
    marginVertical: 6,
    fontWeight: "600",
  },
  carouselChange: {
    fontWeight: "700",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#121712",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  name: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    width: 90,
  },
  price: {
    color: "#C3FF5A",
    fontSize: 15,
    fontWeight: "500",
  },
  percent: {
    fontWeight: "700",
    fontSize: 15,
  },
});
