import React, { JSX } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomText } from "@/components/CustomText";

interface Transaction {
  id: string;
  name: string;
  symbol: string;
  amount: string;
  type: "send" | "receive";
  color: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    amount: "$2,950.75",
    type: "send",
    color: "#FFD700",
  },
  {
    id: "2",
    name: "Litecoin",
    symbol: "LTC",
    amount: "$1,983.02",
    type: "send",
    color: "#C0C0C0",
  },
  {
    id: "3",
    name: "Bitcoin",
    symbol: "BTC",
    amount: "R$3.629,41", // alterado para BRL
    type: "send",
    color: "#F8C7CC",
  },
  {
    id: "4",
    name: "Ethereum",
    symbol: "ETH",
    amount: "$5,710.20",
    type: "receive",
    color: "#E6F0B3",
  },
];

// Mapeamento de ícones
const iconMap: Record<string, JSX.Element> = {
  Bitcoin: <FontAwesome5 name="bitcoin" size={20} color="#FFD700" />,
  Ethereum: <FontAwesome5 name="ethereum" size={20} color="#E6F0B3" />,
  Litecoin: <MaterialCommunityIcons name="litecoin" size={22} color="#C0C0C0" />,
};

export default function Wallet() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.balanceCard}>
        <CustomText weight="Medium" style={styles.currency}>USD</CustomText>
        <CustomText weight="Black" style={styles.balance}>194,284</CustomText>
        <CustomText weight="SemiBold" style={styles.subText}>$2,678 • +1.6%</CustomText>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="arrow-down-outline" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="add-outline" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="arrow-up-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Transactions list */}
      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Transactions</Text>
        <Text style={styles.lastDays}>Last 4 days</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.transactionCard,
              { backgroundColor: item.color + "15" },
            ]}
          >
            <View style={styles.transactionLeft}>
              {/* Ícone correto via mapeamento */}
              {iconMap[item.name]}
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.coinName}>{item.name}</Text>
                <Text style={styles.coinSymbol}>{item.symbol}</Text>
              </View>
            </View>

            <View style={styles.transactionRight}>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.type}>
                {item.type === "send" ? "Send" : "Received"}
              </Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    paddingHorizontal: 20,
  },
  balanceCard: {
    backgroundColor: "#C3FF5A",
    borderRadius: 28,
    padding: 30,
    alignItems: "center",
    marginTop: 20,
  },
  currency: {
    color: "#333",
    fontSize: 20,
  },
  balance: {
    color: "#1f1d1dff",
    fontSize: 48,
    marginVertical: 4,
  },
  subText: {
    color: "#333",
    fontSize: 18,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 24,
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  transactionsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  lastDays: {
    color: "#888",
    fontSize: 14,
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#151515",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  coinSymbol: {
    color: "#aaa",
    fontSize: 13,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  amount: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  type: {
    color: "#888",
    fontSize: 13,
  },
});
