import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Svg, { Path, Line } from "react-native-svg";
import type { Period } from "./Hero";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

type CryptoItem = {
  symbol: string;
  name: string;
  color: string;
  price: number;
  rate: string;
};

type Props = {
  selectedPeriod: Period;
};

const CRYPTOS: CryptoItem[] = [
  { symbol: "BTC", name: "Bitcoin", color: "#C3FF5A", price: 92882.4, rate: "1 BTC = 66k USD" },
  { symbol: "ETH", name: "Ethereum", color: "#A37CFF", price: 4821.5, rate: "1 ETH = 3.4k USD" },
  { symbol: "SOL", name: "Solana", color: "#00FFA3", price: 210.3, rate: "1 SOL = 150 USD" },
];

const generateData = (period: Period): number[] => {
  const points: Record<Period, number[]> = {
    "24h": [40, 70, 50, 80, 65, 85, 90],
    Week: [60, 90, 75, 120, 110, 140, 150],
    Month: [40, 70, 90, 130, 120, 150, 170],
    "6 Month": [60, 100, 120, 180, 200, 160, 190],
    "1 Year": [80, 120, 160, 200, 240, 300, 280],
  };
  return points[period];
};

const Carousel = ({ selectedPeriod }: Props) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {CRYPTOS.map((coin) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const data = useMemo(() => generateData(selectedPeriod), [selectedPeriod]);
        const maxY = Math.max(...data);
        const minY = Math.min(...data);

        const pathData = data
          .map((y, i) => {
            const x = (i / (data.length - 1)) * CARD_WIDTH;
            const yPos = 120 - ((y - minY) / (maxY - minY)) * 100;
            return `${i === 0 ? "M" : "L"}${x},${yPos}`;
          })
          .join(" ");

        const change = ((data[data.length - 1] - data[0]) / data[0]) * 100;

        return (
          <View style={styles.card} key={coin.symbol}>
            <View style={styles.header}>
              <Text style={styles.coinSymbol}>{coin.symbol}</Text>
              <Text style={styles.rate}>{coin.rate}</Text>
            </View>

            <Text style={styles.price}>${coin.price.toLocaleString()}</Text>
            <Text
              style={[
                styles.change,
                { color: change >= 0 ? coin.color : "#FF6B6B" },
              ]}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </Text>

            <Svg height="130" width={CARD_WIDTH}>
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
                y2={130}
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
  card: {
    width: CARD_WIDTH,
    height: 360, 
    backgroundColor: "#121712",
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    marginBottom: 20,
  },
  coinSymbol: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  rate: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
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
