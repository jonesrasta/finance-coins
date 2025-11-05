// components/Home/BitcoinChart.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import * as d3shape from "d3-shape";
import axios from "axios";

const { width: SCREEN_W } = Dimensions.get("window"); 
const CARD_PADDING = 10;
const CHART_WIDTH = SCREEN_W - CARD_PADDING * 4 ;
const CHART_HEIGHT = 220;

type Interval = "1h" | "4h" | "1d" | "1w" | "1M"; // mapping friendly

const intervalToParams: Record<string, { interval: string; limit: number }> = {
  "1D": { interval: "15m", limit: 24 * 4 }, // 24h, 15m candles
  "1W": { interval: "1h", limit: 24 * 7 },
  "1M": { interval: "4h", limit: 24 * 30 / 4 }, // approximate
  "3M": { interval: "12h", limit: 24 * 90 / 12 },
  "YTD": { interval: "1d", limit: 200 },
};

export default function BitcoinChart(): React.JSX.Element {
  const [prices, setPrices] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [period, setPeriod] = useState<"1D" | "1W" | "1M" | "3M" | "YTD">("1D");
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const fadeAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    fetchCandles(period);
    // auto refresh every 60s
    const id = setInterval(() => fetchCandles(period), 60000);
    return () => clearInterval(id);
  }, [period]);

  async function fetchCandles(p: typeof period) {
    try {
      setLoading(true);
      setPrices([]);
      const params = intervalToParams[p];
      // Using Binance klines - BTCUSDT
      const res = await axios.get("https://api.binance.com/api/v3/klines", {
        params: {
          symbol: "BTCUSDT",
          interval: params.interval,
          limit: params.limit,
        },
      });

      const candles = res.data as any[];
      const closing = candles.map((c) => parseFloat(c[4])).filter((v) => Number.isFinite(v));
      setPrices(closing);
      if (closing.length) setLastPrice(closing[closing.length - 1]);

      // labels: sample evenly to 6 labels
      const step = Math.ceil(closing.length / 6) || 1;
      const labs = candles.map((c) =>
        new Date(c[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setLabels(labs.map((l, i) => (i % step === 0 ? l : "")));
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    } catch (err) {
      console.error("fetchCandles", err);
    } finally {
      setLoading(false);
    }
  }

  // Create an SVG path using d3-shape
  const linePath = useMemo(() => {
    if (!prices || prices.length === 0) return "";

    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const padding = 12;
    const w = CHART_WIDTH;
    const h = CHART_HEIGHT;

    // scale function
    const x = (i: number) => (i / (prices.length - 1 || 1)) * (w - padding * 2) + padding;
    const y = (v: number) =>
      ((max - v) / (max - min || 1)) * (h - padding * 2) + padding;

    const shape = d3shape
      .line<number>()
      .x((_, i) => x(i))
      .y((d) => y(d))
      .curve(d3shape.curveMonotoneX);

    return shape(prices) ?? "";
  }, [prices]);

  const gradientId = "gradMain";

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.subTitle}>BTC · Bitstamp</Text>
          <Text style={styles.title}>${lastPrice ? lastPrice.toLocaleString() : "—"}</Text>
        </View>
        <View style={styles.rightHeader}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>+ $1,901</Text>
            <Text style={styles.badgePct}>▲ 0.27%</Text>
          </View>
        </View>
      </View>

      <View
  style={{
    marginTop: 8,
    borderRadius: 20,
    overflow: "hidden",
  }}
>
  {loading ? (
    <ActivityIndicator size="large" color="#e0ff40" />
  ) : (
    <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#e0ff40" stopOpacity="0.28" />
          <Stop offset="60%" stopColor="#2F3A1F" stopOpacity="0.08" />
          <Stop offset="100%" stopColor="#0b0b0b" stopOpacity="0.02" />
        </LinearGradient>
      </Defs>

      {/* background fill */}
      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#${gradientId})`}
      />

      {/* glow (soft) path for neon effect */}
      {linePath ? (
        <>
          <Path
            d={linePath}
            stroke="#e0ff40"
            strokeOpacity={0.12}
            strokeWidth={10}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d={linePath}
            stroke="#e0ff40"
            strokeOpacity={0.28}
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d={linePath}
            stroke="#E6FFB3"
            strokeWidth={2.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : null}
    </Svg>
  )}
</View>
      {/* period buttons */}
      <View style={styles.periodRow}>
        {(["1D", "1W", "1M", "3M", "YTD"] as const).map((p) => {
          const active = p === period;
          return (
            <TouchableOpacity
              key={p}
              style={[styles.periodBtn, active && styles.periodBtnActive]}
              onPress={() => setPeriod(p)}
              activeOpacity={0.8}
            >
              <Text style={[styles.periodBtnText, active && styles.periodBtnTextActive]}>{p}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#222222ff",
    borderRadius: 20,
    padding: CARD_PADDING,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 6,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  rightHeader: { alignItems: "flex-end" },
  subTitle: { color: "#bbbebaff", fontSize: 12, marginBottom: 10, marginLeft: 4 },
  title: { color: "#FFFFFF", fontSize: 36, fontWeight: "700" },
  badge: { backgroundColor: "#112B1A", paddingHorizontal: 8, paddingVertical: 6, borderRadius: 12 },
  badgeText: { color: "#CFFFC2", fontWeight: "700" },
  badgePct: { color: "#9EE0A1", fontSize: 12, marginTop: 2 },
  periodRow: { marginTop: 12, flexDirection: "row", gap: 8 },
  periodBtn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
    marginRight: 8,
  },
  periodBtnActive: {
    backgroundColor: "#e0ff40",
  },
  periodBtnText: { color: "#CFCFCF", fontWeight: "600" },
  periodBtnTextActive: { color: "#000", fontWeight: "700" },
});
