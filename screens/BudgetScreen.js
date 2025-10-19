// screens/BudgetScreen.js
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { AppContext } from "../App";
import { mockBudgets } from "../utils/mockData";
import Modal from "../components/Modal";
import { Ionicons } from "@expo/vector-icons";

export default function BudgetScreen() {
  const { theme, currentUser, currency } = useContext(AppContext);
  const isDark = theme === "dark";

  const [budgets, setBudgets] = useState({
    today: { total: 0, spent: 0 },
    week: { total: 0, spent: 0 },
    month: { total: 0, spent: 0 },
  });

  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");

  // Load budget data on mount
  useEffect(() => {
    if (currentUser && mockBudgets[currentUser.id]) {
      setBudgets(mockBudgets[currentUser.id]);
    }
  }, [currentUser]);

  const openEditModal = (period) => {
    setSelectedPeriod(period);
    setAmount(String(budgets[period].total));
    setShowModal(true);
  };

  const saveBudget = () => {
    const newAmount = parseFloat(amount);
    if (isNaN(newAmount) || newAmount <= 0) {
      Alert.alert("Invalid", "Please enter a valid amount");
      return;
    }

    const updated = { ...budgets };
    updated[selectedPeriod].total = newAmount;
    setBudgets(updated);
    mockBudgets[currentUser.id] = updated;

    setShowModal(false);
    setAmount("");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#f9fafb" },
      ]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text
          style={[
            styles.title,
            { color: isDark ? "#fff" : "#111", marginBottom: 20 },
          ]}
        >
          Budgets
        </Text>

        {["today", "week", "month"].map((p) => (
          <View
            key={p}
            style={[
              styles.card,
              { backgroundColor: isDark ? "#1f2937" : "#fff" },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.period,
                  { color: isDark ? "#9ca3af" : "#6b7280" },
                ]}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
              <Text
                style={[
                  styles.amount,
                  { color: isDark ? "#fff" : "#111" },
                ]}
              >
                {currency} {budgets[p].total.toFixed(2)}
              </Text>
              <Text
                style={{
                  color: isDark ? "#9ca3af" : "#6b7280",
                  marginTop: 4,
                }}
              >
                Spent: {currency} {budgets[p].spent.toFixed(2)}
              </Text>
              <Text
                style={{
                  color: isDark ? "#9ca3af" : "#6b7280",
                  marginTop: 2,
                }}
              >
                Remaining: {currency}{" "}
                {(budgets[p].total - budgets[p].spent).toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => openEditModal(p)}
            >
              <Ionicons name="pencil" color="#fff" size={18} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Budget Edit Modal */}
      {showModal && (
        <Modal
          title={`Edit ${selectedPeriod} Budget`}
          onClose={() => setShowModal(false)}
        >
          <Text
            style={{
              color: isDark ? "#fff" : "#111",
              fontSize: 16,
              marginBottom: 10,
              fontWeight: "600",
            }}
          >
            Enter new amount:
          </Text>
          <TextInput
            placeholder="Enter budget amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#1f2937" : "#fff",
                borderColor: isDark ? "#374151" : "#e5e7eb",
                color: isDark ? "#fff" : "#111",
              },
            ]}
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveBudget}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "700" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  period: { fontSize: 15, fontWeight: "500" },
  amount: { fontSize: 20, fontWeight: "700", marginTop: 4 },
  editButton: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 12,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
