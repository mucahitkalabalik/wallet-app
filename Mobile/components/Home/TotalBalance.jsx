import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
export default function TotalBalance({ summary }) {
  return (
    <View style={styles.container}>
      <Text style={styles.totalTitle}>Total Balance</Text>
      <Text style={styles.total}>${summary ? summary.balance : ""}</Text>
      <View style={styles.details}>
        <View style={{ marginRight: 100 }}>
          <Text style={styles.totalTitle}> Income</Text>
          <Text style={styles.total}>${summary ? summary.income : ""}</Text>
        </View>
        <View>
          <Text style={styles.totalTitle}> Expense</Text>
          <Text style={styles.total}>${summary ? summary.expense : ""}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    margin: 10,
    alignItems: "start",
    justifyContent: "center",
  },
  totalTitle: {
    fontSize: 12,
    color: COLORS.background,
    opacity: 0.7,
    fontWeight: "bold",
  },
  total: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "start",
    marginTop: 10,
    width: "100%",
  },
});
