import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions, getSummary } from "@/store/slices/transactionSlice";
import SafeScreen from "../components/SafeScreen";
import HeaderSection from "../components/Home/HeaderSection";
import TotalBalance from "../components/Home/TotalBalance";
import TransactionsList from "../components/Home/TransactionsList";
function home() {
  const { signUser } = useSelector((state) => state.auth);
  const { transactions, summary } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = signUser?.userId; 
    if (userId) {
      dispatch(getTransactions(userId));
      dispatch(getSummary(userId));
    }
  }, [signUser]);

  return (
    <SafeScreen>
      <View>
        <HeaderSection user={signUser} />
        <TotalBalance user={signUser} summary={summary} />
        <TransactionsList transactions={transactions} />
      </View>
    </SafeScreen>
  );
}

export default home;
