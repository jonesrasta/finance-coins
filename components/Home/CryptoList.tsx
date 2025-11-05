// components/Home/CryptoList.tsx
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import * as d3shape from "d3-shape";
import axios from "axios";

interface Row {
  symbol: string;
  name: string;
  lastPrice: number;
  changePercent: number;
  spark: number[]; // small sparkline values
}

const LIST = ["BTCUSDT", "USDTBRL", "ETHUSDT", "XRPUSDT", "ADAUSDT"];

export default function CryptoList(): React.JSX.Element {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList();
    const id = setInterval(fetchList, 60000);
    return () => clearInterval(id);
  }, []);

  async function fetchList() {
    try {
      setLoading(true);
      // 24hr tickers
      const tickersRes = await axios.get("https://api.binance.com/api/v3/ticker/24hr");
      const tickers: any[] = tickersRes.data;

      // prepare rows for the subset
      const rows: Row[] = [];
      for (const sym of LIST) {
        const t = tickers.find((x) => x.symbol === sym);
        if (!t) continue;

        // fetch small candle history for sparkline (limit 20)
        let spark: number[] = [];
        try {
          const candles = await axios.get("https://api.binance.com/api/v3/klines", {
            params: { symbol: sym, interval: "1h", limit: 20 },
          });
          spark = candles.data.map((c: any) => parseFloat(c[4])).filter((v: any) => Number.isFinite(v));
        } catch {
          spark = [];
        }

        rows.push({
          symbol: sym,
          name: sym.replace("USDT", ""),
          lastPrice: parseFloat(t.lastPrice),
          changePercent: parseFloat(t.priceChangePercent),
          spark,
        });
      }

      setData(rows);
    } catch (err) {
      console.error("fetchList", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { paddingVertical: 36 }]}>
        <Text style={{ color: "#AAA" }}>Carregando lista...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top daily gainers</Text>

      <FlatList
        data={data}
        keyExtractor={(i) => i.symbol}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => <ListRow item={item} />}
      />
    </View>
  );
}

function ListRow({ item }: { item: Row }) {
  const color = item.changePercent >= 0 ? "#2FE08D" : "#FF6B6B";

  // sparkline path via d3
  const path = useMemo(() => {
    if (!item.spark || item.spark.length < 2) return "";
    const w = 90;
    const h = 28;
    const max = Math.max(...item.spark);
    const min = Math.min(...item.spark);
    const x = (i: number) => (i / (item.spark.length - 1)) * w;
    const y = (v: number) => ((max - v) / (max - min || 1)) * h;
    const shape = d3shape
      .line<number>()
      .x((_, i) => x(i))
      .y((d) => y(d))
      .curve(d3shape.curveMonotoneX);
    return shape(item.spark) ?? "";
  }, [item.spark]);

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.row}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.ticker}>BTCUSD</Text>
        </View>

        <View style={styles.sparkWrap}>
          <Svg width={100} height={30}>
            <Path d={path} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
          </Svg>
        </View>

        <View style={[styles.badge, { backgroundColor: color === "#2FE08D" ? "#083B2B" : "#3A0A0A" }]}>
          <Text style={[styles.badgeText, { color }]}>{item.changePercent.toFixed(2)}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#222222ff", borderRadius: 18, padding: 16 },
  heading: { color: "#FFF", fontSize: 20, fontWeight: "700", marginBottom: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f0f0f52",
    padding: 18,
    borderRadius: 12,
  },
  name: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  ticker: { color: "#9EA39B", fontSize: 11, marginTop: 2 },
  sparkWrap: { flex: 1, alignItems: "center" },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 80,
    alignItems: "center",
  },
  badgeText: { fontWeight: "700" },
});
