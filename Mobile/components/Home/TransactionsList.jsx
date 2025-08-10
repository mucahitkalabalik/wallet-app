import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../constants/colors";
import { formatDateTR } from "../../utils/dateFormatter";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { deleteTransaction } from "@/store/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import Entypo from "@expo/vector-icons/Entypo";

export default function TransactionsList({ transactions }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.transactions);

  // const deleteTransactionById = (transactionId) => {
  //   dispatch(deleteTransaction(transactionId));
  // };

  return (
    <View style={styles.container}>
      {transactions ? (
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
                <Text>{transaction.category}</Text>
              </View>
              <View>
                <Text style={styles.secondTitle}>{transaction.amount}</Text>
                <Text>{formatDateTR(transaction.created_at)}</Text>
              </View>
            </View>
            <TouchableOpacity>
              {loading ? (
                <Entypo
                  name="dots-three-horizontal"
                  size={16}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              ) : (
                <MaterialIcons name="delete-outline" size={26} color="white" />
              )}
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
});
