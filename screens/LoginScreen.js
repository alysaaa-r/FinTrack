// screens/LoginScreen.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../App";
import { mockUsers, mockBudgets, mockExpenses, mockGoals } from "../utils/mockData";

export default function LoginScreen({ navigation }) {
  const { theme, setCurrentUser } = useContext(AppContext);
  const isDark = theme === "dark";

  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleChange = (key, value) => {
    setLoginData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = () => {
    const user = mockUsers.find(
      (u) => u.phone === loginData.phone && u.password === loginData.password
    );

    if (!user) {
      setAuthError("Phone number or password isn't correct");
      return;
    }

    // Create user-specific storage if not already existing
    if (!mockBudgets[user.id]) {
      mockBudgets[user.id] = {
        today: { total: 0, spent: 0 },
        week: { total: 0, spent: 0 },
        month: { total: 0, spent: 0 },
      };
      mockExpenses[user.id] = [];
      mockGoals[user.id] = [];
    }

    setCurrentUser(user);
    setAuthError("");
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }], // navigate to Dashboard tabs
    });
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#f9fafb" },
      ]}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Ionicons name="arrow-back" color={isDark ? "#fff" : "#111"} size={26} />
      </TouchableOpacity>

      <View style={styles.inner}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#111" }]}>
          Welcome Back
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#4b5563" }]}>
          Login to continue tracking
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: isDark ? "#9ca3af" : "#4b5563" }]}>
              Phone Number
            </Text>
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
              value={loginData.phone}
              onChangeText={(val) => handleChange("phone", val)}
              keyboardType="phone-pad"
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? "#1f2937" : "#fff",
                  color: isDark ? "#fff" : "#111",
                  borderColor: isDark ? "#374151" : "#e5e7eb",
                },
              ]}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: isDark ? "#9ca3af" : "#4b5563" }]}>
              Password
            </Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                secureTextEntry={!showPassword}
                value={loginData.password}
                onChangeText={(val) => handleChange("password", val)}
                style={[
                  styles.input,
                  {
                    flex: 1,
                    backgroundColor: isDark ? "#1f2937" : "#fff",
                    color: isDark ? "#fff" : "#111",
                    borderColor: isDark ? "#374151" : "#e5e7eb",
                    paddingRight: 40,
                  },
                ]}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <Ionicons name="eye-off" color={isDark ? "#9ca3af" : "#6b7280"} size={22} />
                ) : (
                  <Ionicons name="eye" color={isDark ? "#9ca3af" : "#6b7280"} size={22} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {authError ? (
            <Text style={styles.error}>{authError}</Text>
          ) : null}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  inner: {
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  form: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  loginButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  error: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 4,
  },
});
