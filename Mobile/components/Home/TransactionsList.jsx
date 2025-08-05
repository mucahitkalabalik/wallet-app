import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { formatDateTR } from "../../utils/dateFormatter";

export default function TransactionsList({ transactions }) {
  console.log("Transactions component rendered with data:", transactions);

  return (
    <View style={styles.container}>
      {transactions && transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <Text>icon</Text>
            <View style={styles.transactionDetails}>
              <View>
                <Text style={styles.textWhite}>{transaction.title}</Text>
                <Text style={styles.textWhite}>{transaction.category}</Text>
              </View>
              <View>
                <Text style={styles.textWhite}>{transaction.amount}</Text>
                <Text style={styles.textWhite}>
                  {formatDateTR(transaction.created_at)}
                </Text>
              </View>
            </View>
            <Text>del</Text>
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
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "space-between",
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
});
