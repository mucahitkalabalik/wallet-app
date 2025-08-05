import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../constants/colors";
import { formatDateTR } from "../../utils/dateFormatter";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TransactionsList({ transactions }) {
  console.log("Transactions component rendered with data:", transactions);

  return (
    <View style={styles.container}>
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <FontAwesome5
              name="money-bill-wave"
              size={24}
              color={
                transaction.category === "expense"
                  ? COLORS.expense
                  : COLORS.income
              }
            />
            <View style={styles.transactionDetails}>
              <View>
                <Text style={styles.secondTitle}>{transaction.title}</Text>
                <Text style={styles.textWhite}>{transaction.category}</Text>
              </View>
              <View>
                <Text style={styles.secondTitle}>{transaction.amount}</Text>
                <Text style={styles.textWhite}>
                  {formatDateTR(transaction.created_at)}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="delete-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noTransactionsText}>No transactions found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: COLORS.white,
    borderRadius: 20,
    margin: 10,
  },
  transactionItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.primaryOp,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: COLORS.white,
    paddingRight: 10,
  },
  textWhite: {
    color: COLORS.white,
  },
  secondTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
