// App.js
import React, { useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons"; // <-- Updated icons
import WelcomeScreen from "./screens/WelcomeScreen";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ExpensesScreen from "./screens/ExpensesScreen";
import BudgetScreen from "./screens/BudgetScreen.js";
import SettingsScreen from "./screens/SettingsScreen";

// Create global context (for theme, currency, user, etc.)
export const AppContext = createContext();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#ccc",
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Dashboard":
              return <MaterialIcons name="account-balance-wallet" size={size} color={color} />;
            case "Expenses":
              return <Feather name="trending-up" size={size} color={color} />;
            case "Budget":
              return <Ionicons name="md-target" size={size} color={color} />;
            case "Settings":
              return <Ionicons name="settings-outline" size={size} color={color} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#888",
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [currency, setCurrency] = useState("PHP");
  const [currentUser, setCurrentUser] = useState(null);

  const appContextValue = {
    theme,
    setTheme,
    currency,
    setCurrency,
    currentUser,
    setCurrentUser,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
