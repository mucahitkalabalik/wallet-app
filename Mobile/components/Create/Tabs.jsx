import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "@/constants/colors";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";

function Tabs({ activeTab, setActiveTab }) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        onPress={() => setActiveTab("expense")}
        style={
          activeTab === "expense" ? styles.tabButtonActive : styles.tabButton
        }
      >
        <Feather name="arrow-up-circle" size={24} color="white" />
        <Text style={styles.tabText}>expense</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveTab("income")}
        style={
          activeTab === "income" ? styles.tabButtonActive : styles.tabButton
        }
      >
        <Feather name="arrow-down-circle" size={24} color="white" />
        <Text style={styles.tabText}>income</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Tabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  tabButton: {
    padding: 10,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: COLORS.primaryOp,
    flexDirection: "row",
  },
  tabButtonActive: {
    padding: 5,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
  },
  tabText: {
    color: COLORS.white,
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 12,
    textTransform: "uppercase",
  },
});
