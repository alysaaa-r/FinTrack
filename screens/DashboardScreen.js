// screens/DashboardScreen.js
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AppContext } from "../App";
import {
  mockBudgets,
  mockExpenses,
  mockGoals,
  mockUsers,
} from "../utils/mockData";
import Modal from "../components/Modal";

export default function DashboardScreen({ navigation }) {
  const { theme, currency, currentUser } = useContext(AppContext);
  const isDark = theme === "dark";

  // --- state ---
  const [budgets, setBudgets] = useState({
    today: { total: 0, spent: 0 },
    week: { total: 0, spent: 0 },
    month: { total: 0, spent: 0 },
  });
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState({
    Food: { budget: 0, spent: 0, color: "#FF6B6B" },
    Transportation: { budget: 0, spent: 0, color: "#4ECDC4" },
    Shopping: { budget: 0, spent: 0, color: "#95E1D3" },
    Bills: { budget: 0, spent: 0, color: "#FFA07A" },
  });

  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState("");

  // --- Load data on login ---
  useEffect(() => {
    if (currentUser) {
      if (mockBudgets[currentUser.id]) setBudgets(mockBudgets[currentUser.id]);
      if (mockExpenses[currentUser.id]) setExpenses(mockExpenses[currentUser.id]);
    }
  }, [currentUser]);

  // --- Functions ---
  const handleSetBudget = () => {
    const amount = parseFloat(budgetAmount);
    if (!amount || amount <= 0) {
      Alert.alert("Invalid", "Please enter a valid amount");
      return;
    }

    const updatedBudgets = { ...budgets };
    updatedBudgets[selectedPeriod].total = amount;
    setBudgets(updatedBudgets);
    mockBudgets[currentUser.id] = updatedBudgets;
    setShowBudgetModal(false);
    setBudgetAmount("");
  };

  const deleteCategory = (name) => {
    Alert.alert("Confirm", `Delete category "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updated = { ...categories };
          delete updated[name];
          setCategories(updated);
        },
      },
    ]);
  };

  const addCategory = () => {
    Alert.alert("Feature In Progress", "Category creation not yet implemented.");
  };

  const getCategoryIcon = (name, color) => {
    switch (name) {
      case "Food":
        return <MaterialCommunityIcons name="food" color={color} size={20} />;
      case "Transportation":
        return <Ionicons name="bus" color={color} size={20} />;
      case "Shopping":
        return <Ionicons name="bag" color={color} size={20} />;
      case "Bills":
        return <Ionicons name="document-text" color={color} size={20} />;
      default:
        return <MaterialCommunityIcons name="wallet" color={color} size={20} />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#f9fafb" },
      ]}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            { backgroundColor: isDark ? "#2563EB" : "#3B82F6" },
          ]}
        >
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{currentUser?.name}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings" color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        {/* Budgets Overview */}
        <View style={styles.budgetContainer}>
          <View style={styles.periodTabs}>
            {["today", "week", "month"].map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setSelectedPeriod(p)}
                style={[
                  styles.periodButton,
                  {
                    backgroundColor:
                      selectedPeriod === p ? "#3B82F6" : "transparent",
                  },
                ]}
              >
                <Text
                  style={{
                    color: selectedPeriod === p ? "#fff" : "#3B82F6",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={[
              styles.budgetCard,
              { backgroundColor: isDark ? "#1f2937" : "#fff" },
            ]}
          >
            <Text
              style={[
                styles.budgetLabel,
                { color: isDark ? "#9ca3af" : "#6b7280" },
              ]}
            >
              Total Budget
            </Text>
            <Text
              style={[
                styles.budgetValue,
                { color: isDark ? "#fff" : "#111" },
              ]}
            >
              {currency} {budgets[selectedPeriod].total.toFixed(2)}
            </Text>

            <Text
              style={[
                styles.budgetLabel,
                { marginTop: 8, color: isDark ? "#9ca3af" : "#6b7280" },
              ]}
            >
              Spent
            </Text>
            <Text style={[styles.spentValue, { color: "#ef4444" }]}>
              -{currency} {budgets[selectedPeriod].spent.toFixed(2)}
            </Text>

            <Text
              style={[
                styles.remainingLabel,
                { color: isDark ? "#9ca3af" : "#6b7280" },
              ]}
            >
              Remaining
            </Text>
            <Text
              style={[
                styles.remainingValue,
                { color: isDark ? "#fff" : "#111" },
              ]}
            >
              {currency}{" "}
              {(budgets[selectedPeriod].total - budgets[selectedPeriod].spent).toFixed(2)}
            </Text>

            <TouchableOpacity
              onPress={() => setShowBudgetModal(true)}
              style={styles.setBudgetButton}
            >
              <Ionicons name="add" color="#fff" size={18} />
              <Text style={styles.setBudgetText}>Set Budget</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDark ? "#fff" : "#111" },
              ]}
            >
              Categories
            </Text>
            <TouchableOpacity style={styles.addButton} onPress={addCategory}>
              <Ionicons name="add" color="#fff" size={18} />
            </TouchableOpacity>
          </View>

          <View style={styles.categoryGrid}>
            {Object.entries(categories).map(([name, data]) => (
              <View
                key={name}
                style={[
                  styles.categoryCard,
                  { backgroundColor: isDark ? "#1f2937" : "#fff" },
                ]}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: data.color + "30" },
                  ]}
                >
                  {getCategoryIcon(name, data.color)}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.categoryName,
                      { color: isDark ? "#fff" : "#111" },
                    ]}
                  >
                    {name}
                  </Text>
                  <Text
                    style={[
                      styles.categorySpent,
                      { color: isDark ? "#9ca3af" : "#6b7280" },
                    ]}
                  >
                    {currency} {data.spent.toFixed(2)} / {currency}{" "}
                    {data.budget.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteCategory(name)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash" color="#ef4444" size={18} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Expenses */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? "#fff" : "#111" },
            ]}
          >
            Recent Expenses
          </Text>
          {expenses.length === 0 ? (
            <Text style={{ color: isDark ? "#9ca3af" : "#6b7280", marginTop: 8 }}>
              No expenses yet
            </Text>
          ) : (
            expenses
              .slice(-5)
              .reverse()
              .map((exp) => (
                <View
                  key={exp.id}
                  style={[
                    styles.expenseCard,
                    { backgroundColor: isDark ? "#1f2937" : "#fff" },
                  ]}
                >
                  <Text
                    style={[
                      styles.expenseCategory,
                      { color: isDark ? "#fff" : "#111" },
                    ]}
                  >
                    {exp.category}
                  </Text>
                  <Text
                    style={[
                      styles.expenseAmount,
                      { color: "#ef4444" },
                    ]}
                  >
                    -{currency} {exp.amount.toFixed(2)}
                  </Text>
                </View>
              ))
          )}
        </View>
      </ScrollView>

      {/* Budget Modal */}
      {showBudgetModal && (
        <Modal title="Set Budget" onClose={() => setShowBudgetModal(false)}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                color: isDark ? "#fff" : "#111",
                fontSize: 16,
                marginBottom: 8,
                fontWeight: "500",
              }}
            >
              Enter new budget for {selectedPeriod}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: isDark ? "#9ca3af" : "#4b5563",
                  fontSize: 16,
                  marginRight: 8,
                }}
              >
                {currency}
              </Text>
              <TouchableOpacity
                onPress={() => setBudgetAmount((prev) => prev + "100")}
              ></TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.modalSaveButton}
            onPress={handleSetBudget}
          >
            <Text style={styles.modalSaveText}>Save Budget</Text>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: { color: "#DBEAFE", fontSize: 14 },
  userName: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  budgetContainer: { padding: 20 },
  periodTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#3B82F6",
  },
  budgetCard: {
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },
  budgetLabel: { fontSize: 14, fontWeight: "500" },
  budgetValue: { fontSize: 22, fontWeight: "700", marginTop: 4 },
  spentValue: { fontSize: 18, fontWeight: "600" },
  remainingLabel: { fontSize: 13, marginTop: 6 },
  remainingValue: { fontSize: 20, fontWeight: "700" },
  setBudgetButton: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginTop: 14,
    gap: 6,
  },
  setBudgetText: { color: "#fff", fontWeight: "600" },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 20, fontWeight: "700" },
  addButton: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 10,
  },
  categoryGrid: { gap: 12 },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  categoryName: { fontSize: 16, fontWeight: "600" },
  categorySpent: { fontSize: 13 },
  deleteButton: { padding: 4 },
  expenseCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  expenseCategory: { fontSize: 15, fontWeight: "500" },
  expenseAmount: { fontSize: 15, fontWeight: "700" },
  modalSaveButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 12,
  },
  modalSaveText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
