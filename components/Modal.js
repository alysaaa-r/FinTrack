// components/Modal.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { X } from "lucide-react";
import { AppContext } from "../App";

export default function Modal({ title, onClose, children }) {
  const { theme } = useContext(AppContext);
  const isDark = theme === "dark";

  return (
    <View style={styles.overlay}>
      <View
        style={[
          styles.modal,
          { backgroundColor: isDark ? "#1f2937" : "#fff" },
        ]}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? "#fff" : "#111" }]}>
            {title}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <X color={isDark ? "#bbb" : "#555"} size={24} />
          </TouchableOpacity>
        </View>
        <ScrollView>{children}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
