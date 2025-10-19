// screens/SettingsScreen.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  TextInput,
  Alert,
} from "react-native";
import { AppContext } from "../App";
import { MaterialIcons } from "@expo/vector-icons"; // <- Replaced lucide-react

export default function SettingsScreen({ navigation }) {
  const { theme, setTheme, currency, setCurrency, setCurrentUser } =
    useContext(AppContext);
  const isDark = theme === "dark";

  const [newCurrency, setNewCurrency] = useState(currency);

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleCurrencyChange = () => {
    if (!newCurrency.trim()) {
      Alert.alert("Invalid", "Currency symbol cannot be empty.");
      return;
    }
    setCurrency(newCurrency.trim().toUpperCase());
    Alert.alert("Saved", `Currency changed to ${newCurrency.trim().toUpperCase()}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#f9fafb" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#111" }]}>
        Settings
      </Text>

      {/* Theme Toggle */}
      <View
        style={[
          styles.section,
          { backgroundColor: isDark ? "#1f2937" : "#fff" },
        ]}
      >
        <Text style={[styles.label, { color: isDark ? "#fff" : "#111" }]}>
          Dark Mode
        </Text>
        <Switch value={isDark} onValueChange={handleThemeToggle} />
      </View>

      {/* Currency Input */}
      <View
        style={[
          styles.section,
          { backgroundColor: isDark ? "#1f2937" : "#fff" },
        ]}
      >
        <Text style={[styles.label, { color: isDark ? "#fff" : "#111" }]}>
          Currency Symbol
        </Text>
        <View style={styles.currencyRow}>
          <TextInput
            value={newCurrency}
            onChangeText={setNewCurrency}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#374151" : "#f3f4f6",
                color: isDark ? "#fff" : "#111",
              },
            ]}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleCurrencyChange}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" color="#fff" size={20} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24 },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: { fontSize: 16, fontWeight: "600" },
  currencyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 40,
    gap: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
