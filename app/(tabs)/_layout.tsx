import React, { useRef } from "react";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet, Platform, Animated, Pressable, View } from "react-native";
import {
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

function AnimatedTabButton({ children, onPress, style }: any) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.85,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, { flex: 1 }]}
    >
      <Animated.View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale }],
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <View style={{ flex: 1, justifyContent:"center"}}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarButton: (props) => <AnimatedTabButton {...props} />,
          tabBarBackground: () =>
            Platform.OS === "ios" ? (
              <BlurView
                intensity={40}
                tint="default"
                style={[
                  StyleSheet.absoluteFill,
                  { borderRadius: 0, overflow: "hidden" },
                ]}
              />
            ) : (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: "rgba(29, 29, 29, 0.84)",
                    borderRadius: 30,
                  },
                ]}
              />
            ),
          tabBarStyle: {
            position: "absolute",
            bottom: Platform.OS === "ios" ? 0 : 18,
            left: 20,
            right: 20,
            height: 76,
            // borderRadius: 50,
            paddingBottom: 0,
            paddingTop: 2,
            paddingHorizontal: 20,
            borderCurve: "continuous",
            backgroundColor:
              Platform.OS === "ios"
                ? "rgba(65, 65, 65, 0.11)"
                : "rgba(29, 29, 29, 0.86)",
            borderWidth: 0.5,
            borderColor:
              Platform.OS === "ios"
                ? "rgba(255, 255, 255, 0.07)"
                : "rgba(255, 255, 255, 0.14)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 10,
            overflow: "hidden",
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#aaa",
          tabBarLabelStyle: {
            fontSize: 11,
            marginBottom: 24,
            marginTop: 1,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Octicons name="home-fill" color={color} size={24} />
              ) : (
                <Octicons name="home" color={color} size={24} />
              ),
          }}
        />
        <Tabs.Screen
          name="finance"
          options={{
            title: "Finance",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="finance"
                  size={24}
                  color={color}
                />
              ) : (
                <MaterialCommunityIcons
                  name="finance"
                  size={24}
                  color={color}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="bitcoin"
          options={{
            title: "Bitcoin",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="bitcoin"
                  size={26}
                  color={color}
                />
              ) : (
                <Foundation name="bitcoin" size={26} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: "Wallet",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Ionicons
                  name="wallet"
                  color={color}
                  size={24}
                />
              ) : (
                <Ionicons
                  name="wallet-outline"
                  color={color}
                  size={24}
                />
              ),
          }}
        />
      </Tabs>
    </View>
  );
}
