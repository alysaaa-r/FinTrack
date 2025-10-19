// components/BottomNav.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Wallet, TrendingUp, Target, Settings } from "lucide-react";

export default function BottomNav({ navigation, active }) {
  const tabs = [
    { name: "Dashboard", icon: Wallet },
    { name: "Expenses", icon: TrendingUp },
    { name: "Budget", icon: Target },
    { name: "Settings", icon: Settings },
  ];

  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            style={styles.tab}
          >
            <Icon color={isActive ? "#3B82F6" : "#888"} size={22} />
            <Text
              style={[
                styles.label,
                { color: isActive ? "#3B82F6" : "#888" },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  tab: {
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },
});
