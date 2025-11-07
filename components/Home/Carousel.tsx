import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import Svg, { Path, Line } from "react-native-svg";
import type { Period } from "./Hero";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const GRAPH_HEIGHT = 128;
const GRAPH_PADDING = 34;

// === ÍCONES DAS CRYPTOS ===
const cryptoIcons: Record<string, any> = {
  BTC: require("../../assets/images/icon/crypto/bitcoin-btc-logo.webp"),
  ETH: require("../../assets/images/icon/crypto/ethereum-eth-logo.webp"),
  SOL: require("../../assets/images/icon/crypto/solana-sol-logo.webp"),
  BNB: require("../../assets/images/icon/crypto/bnb-bnb-logo.webp"),
  XRP: require("../../assets/images/icon/crypto/xrp-xrp-logo.webp"),
  DOT: require("../../assets/images/icon/crypto/polkadot-new-dot-logo.webp"),
  LTC: require("../../assets/images/icon/crypto/litecoin-ltc-logo.webp"),
  ADA: require("../../assets/images/icon/crypto/cardano-ada-logo.webp"),
  DOGE: require("../../assets/images/icon/crypto/dogecoin-doge-logo.webp"),
  AVAX: require("../../assets/images/icon/crypto/avalanche-avax-logo.webp"),
  MATIC: require("../../assets/images/icon/crypto/polygon-matic-logo.webp"),
};

type CryptoItem = {
  symbol: string;
  name: string;
  color: string;
  pair: string;
};

type Props = {
  selectedPeriod: Period;
};

const CRYPTOS: CryptoItem[] = [
  { symbol: "BTC", name: "Bitcoin", color: "#C3FF5A", pair: "BTCUSDT" },
  { symbol: "ETH", name: "Ethereum", color: "#A37CFF", pair: "ETHUSDT" },
  { symbol: "SOL", name: "Solana", color: "#00FFA3", pair: "SOLUSDT" },
  { symbol: "BNB", name: "BNB", color: "#F3BA2F", pair: "BNBUSDT" },
  { symbol: "XRP", name: "Ripple", color: "#00AAFF", pair: "XRPUSDT" },
  { symbol: "DOT", name: "Polkadot", color: "#E6007A", pair: "DOTUSDT" },
  { symbol: "LTC", name: "Litecoin", color: "#B8B8B8", pair: "LTCUSDT" },
  { symbol: "ADA", name: "Cardano", color: "#0033AD", pair: "ADAUSDT" },
  { symbol: "DOGE", name: "Dogecoin", color: "#C2A633", pair: "DOGEUSDT" },
  { symbol: "AVAX", name: "Avalanche", color: "#E84142", pair: "AVAXUSDT" },
  { symbol: "MATIC", name: "Polygon", color: "#8247E5", pair: "MATICUSDT" },
//{ symbol: "LINK", name: "Chainlink", color: "#2A5ADA", pair: "LINKUSDT" },
//{ symbol: "UNI", name: "Uniswap", color: "#FF007A", pair: "UNIUSDT" },
//{ symbol: "ATOM", name: "Cosmos", color: "#5050F5", pair: "ATOMUSDT" },
//{ symbol: "OP", name: "Optimism", color: "#FF0420", pair: "OPUSDT" },
//{ symbol: "ARB", name: "Arbitrum", color: "#28A0F0", pair: "ARBUSDT" },
//{ symbol: "NEAR", name: "Near Protocol", color: "#000000", pair: "NEARUSDT" },
//{ symbol: "APT", name: "Aptos", color: "#FFFFFF", pair: "APTUSDT" },
//{ symbol: "ETC", name: "Ethereum Classic", color: "#34C759", pair: "ETCUSDT" },
];

const INTERVAL_MAP: Record<Period, string> = {
  "24h": "15m",
  Week: "1h",
  Month: "4h",
  "6 Month": "1d",
  "1 Year": "1w",
};

const Carousel = ({ selectedPeriod }: Props) => {
  const [prices, setPrices] = useState<Record<string, number[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const interval = INTERVAL_MAP[selectedPeriod];
        const responses = await Promise.all(
          CRYPTOS.map(async (coin) => {
            const url = `https://api.binance.com/api/v3/klines?symbol=${coin.pair}&interval=${interval}&limit=50`;
            const res = await fetch(url);
            const data = await res.json();
            const closes = data.map((k: any) => parseFloat(k[4]));
            return { [coin.symbol]: closes };
          })
        );

        const merged = Object.assign({}, ...responses);
        setPrices(merged);
      } catch (e) {
        console.error("Erro ao buscar dados Binance:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C3FF5A" />
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {CRYPTOS.map((coin) => {
        const data = prices[coin.symbol] || [];
        if (data.length === 0) return null;

        const maxY = Math.max(...data);
        const minY = Math.min(...data);

        const pathData = data
          .map((y, i) => {
            const x =
              GRAPH_PADDING +
              (i / (data.length - 1)) * (CARD_WIDTH - GRAPH_PADDING * 2);
            const yPos =
              GRAPH_HEIGHT -
              GRAPH_PADDING -
              ((y - minY) / (maxY - minY)) * (GRAPH_HEIGHT - GRAPH_PADDING * 2);
            return `${i === 0 ? "M" : "L"}${x},${yPos}`;
          })
          .join(" ");

        const change = ((data[data.length - 1] - data[0]) / data[0]) * 100;

        return (
          <View style={styles.card} key={coin.symbol}>
            <View style={styles.header}>
              <Image source={cryptoIcons[coin.symbol]} style={styles.icon} />
              <View>
                <Text style={styles.coinSymbol}>{coin.symbol}</Text>
                <Text style={styles.rate}>{coin.name}</Text>
              </View>
            </View>

            <Text style={styles.price}>
              ${data[data.length - 1].toLocaleString()}
            </Text>
            <Text
              style={[
                styles.change,
                { color: change >= 0 ? coin.color : "#FF6B6B" },
              ]}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </Text>

            <Svg height={GRAPH_HEIGHT} width={CARD_WIDTH}>
              <Path
                d={pathData}
                fill="none"
                stroke={coin.color}
                strokeWidth={3}
                strokeLinecap="round"
              />
              <Line
                x1={CARD_WIDTH / 2}
                y1={0}
                x2={CARD_WIDTH / 2}
                y2={GRAPH_HEIGHT}
                stroke={coin.color + "55"}
                strokeDasharray="4"
                strokeWidth={1}
              />
            </Svg>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingLeft: 14,
    paddingRight: 10,
  },
  loadingContainer: {
    padding: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: CARD_WIDTH,
    height: 320,
    backgroundColor: "#121712",
    borderRadius: 26,
    padding: 20,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  coinSymbol: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  rate: {
    color: "#888",
    fontSize: 12,
  },
  price: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 6,
  },
  change: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
});

export default Carousel;
