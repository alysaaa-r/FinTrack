// screens/WelcomeScreen.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Wallet } from "lucide-react";
import { AppContext } from "../App";

export default function WelcomeScreen({ navigation }) {
  const { theme } = useContext(AppContext);
  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#f9fafb" },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Wallet color="#fff" size={48} />
        </View>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#111" }]}>
          FinTrack
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#4b5563" }]}>
          Your Personal Finance Companion
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.primaryText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryButton,
            {
              backgroundColor: isDark ? "#1f2937" : "#fff",
              borderColor: isDark ? "#374151" : "#e5e7eb",
            },
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.secondaryText, { color: isDark ? "#fff" : "#111" }]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 60,
  },
  iconWrapper: {
    backgroundColor: "#3B82F6",
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  buttons: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  primaryText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButton: {
    borderWidth: 2,
    paddingVertical: 16,
    borderRadius: 12,
  },
  secondaryText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
