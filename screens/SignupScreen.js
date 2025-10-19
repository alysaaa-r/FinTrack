// screens/SignupScreen.js
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
import { mockUsers } from "../utils/mockData";

export default function SignupScreen({ navigation }) {
  const { theme } = useContext(AppContext);
  const isDark = theme === "dark";

  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleChange = (key, value) => {
    setSignupData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignup = () => {
    if (!signupData.name || !signupData.phone || !signupData.password) {
      setAuthError("All fields are required");
      return;
    }

    if (mockUsers.find((u) => u.phone === signupData.phone)) {
      setAuthError("Phone number already registered");
      return;
    }

    mockUsers.push({ ...signupData, id: Date.now() });
    setAuthError("");
    navigation.navigate("Login");
    setSignupData({ name: "", phone: "", password: "" });
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
          Create Account
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#4b5563" }]}>
          Sign up to start tracking your finances
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: isDark ? "#9ca3af" : "#4b5563" }]}>
              Full Name
            </Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
              value={signupData.name}
              onChangeText={(val) => handleChange("name", val)}
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
              Phone Number
            </Text>
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
              value={signupData.phone}
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
                placeholder="Create a password"
                placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                secureTextEntry={!showPassword}
                value={signupData.password}
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

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupText}>Sign Up</Text>
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
  signupButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  signupText: {
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
