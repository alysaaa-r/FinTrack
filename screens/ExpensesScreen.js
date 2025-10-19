// screens/ExpensesScreen.js
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { AppContext } from "../App";
import { mockExpenses } from "../utils/mockData";
import Modal from "../components/Modal";
import { Plus, Trash2 } from "lucide-react";

export default function ExpensesScreen() {
  const { theme, currentUser, currency } = useContext(AppContext);
  const isDark = theme === "dark";

  const [expenses, setExpenses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" });

  // Load user's expenses
  useEffect(() => {
    if (currentUser && mockExpenses[currentUser.id]) {
      setExpenses(mockExpenses[currentUser.id]);
    }
  }, [currentUser]);

  const handleAddExpense = () => {
    const { category, amount } = newExpense;
    const parsedAmount = parseFloat(amount);

    if (!category || !amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Invalid", "Please enter valid category and amount.");
      return;
    }

    const expense = {
      id: Date.now(),
      category,
      amount: parsedAmount,
      date: new Date().toLocaleString(),
    };

    const updatedExpenses = [expense, ...expenses];
    setExpenses(updatedExpenses);
    mockExpenses[currentUser.id] = updatedExpenses;

    setShowAddModal(false);
    setNewExpense({ category: "", amount: "" });
  };

  const handleDelete = (id) => {
    Alert.alert("Confirm", "Delete this expense?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updated = expenses.filter((exp) => exp.id !== id);
          setExpenses(updated);
          mockExpenses[currentUser.id] = updated;
        },
      },
    ]);
  };

  const renderExpense = ({ item }) => (
    <View
      style={[
        styles.expenseCard,
        { backgroundColor: isDark ? "#1f2937" : "#fff" },
      ]}
    >
      <View>
        <Text
          style={[
            styles.expenseCategory,
            { color: isDark ? "#fff" : "#111" },
          ]}
        >
          {item.category}
        </Text>
        <Text style={{ color: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}>
          {item.date}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ color: "#ef4444", fontWeight: "700" }}>
          -{currency} {item.amount.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Trash2 color="#ef4444" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#f9fafb" },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#111" }]}>
          Expenses
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      {expenses.length === 0 ? (
        <Text
          style={{
            color: isDark ? "#9ca3af" : "#6b7280",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          No expenses yet. Tap “+” to add one.
        </Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderExpense}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {showAddModal && (
        <Modal title="Add Expense" onClose={() => setShowAddModal(false)}>
          <View>
            <Text
              style={{
                color: isDark ? "#fff" : "#111",
                fontWeight: "600",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Category
            </Text>
            <TextInput
              placeholder="e.g. Food, Transport"
              placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
              value={newExpense.category}
              onChangeText={(val) =>
                setNewExpense((prev) => ({ ...prev, category: val }))
              }
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? "#1f2937" : "#fff",
                  borderColor: isDark ? "#374151" : "#e5e7eb",
                  color: isDark ? "#fff" : "#111",
                },
              ]}
            />

            <Text
              style={{
                color: isDark ? "#fff" : "#111",
                fontWeight: "600",
                fontSize: 16,
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Amount
            </Text>
            <TextInput
              placeholder="Enter amount"
              keyboardType="numeric"
              placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
              value={newExpense.amount}
              onChangeText={(val) =>
                setNewExpense((prev) => ({ ...prev, amount: val }))
              }
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? "#1f2937" : "#fff",
                  borderColor: isDark ? "#374151" : "#e5e7eb",
                  color: isDark ? "#fff" : "#111",
                },
              ]}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddExpense}
            >
              <Text style={styles.saveText}>Save Expense</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "700" },
  addButton: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 10,
  },
  expenseCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  expenseCategory: { fontSize: 16, fontWeight: "600" },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    marginTop: 24,
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
