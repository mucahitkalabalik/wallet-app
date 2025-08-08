import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SafeScreen from "../components/SafeScreen";
import Tabs from "../components/Create/Tabs";
import COLORS from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Foundation from "@expo/vector-icons/Foundation";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useState } from "react";
import { createTransaction } from "@/store/slices/transactionSlice";

function Create() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.transactions);
  const [activeTab, setActiveTab] = useState("expense");
  console.log(activeTab, "activeTab");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");

  const handleAmountChange = (text) => {
    setAmount(text);
  };
  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleSaveTransaction = async () => {
    if (amount && title) {
      let data = {
        category: activeTab,
        title: title,
        amount: parseFloat(amount),
        user_id: signUser.userId,
      };
      await dispatch(createTransaction(data));
      setAmount("");
      setTitle("");
      router.push("/home");
    } else {
      console.log("Please fill in all fields.");
    }
  };

  return (
    <SafeScreen>
      <View>
        <Text style={styles.header}>New Transaction</Text>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <View style={{ marginTop: 20, padding: 10 }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.border,
              padding: 5,
              margin: 10,
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome name="usd" size={20} color="black" />
            <TextInput
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0.00"
              keyboardType="numeric"
              style={{ flex: 1, fontSize: 18, fontWeight: "bold" }}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.border,
              padding: 5,
              margin: 10,
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Foundation name="text-color" size={20} color="black" />
            <TextInput
              value={title}
              onChangeText={handleTitleChange}
              placeholder="Title"
              style={{ flex: 1, fontSize: 18, fontWeight: "bold" }}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              borderRadius: 25,
              alignItems: "center",
              margin: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={handleSaveTransaction}
          >
            {loading ? (
              <Entypo
                name="dots-three-horizontal"
                size={16}
                color="white"
                style={{ marginRight: 10 }}
              />
            ) : (
              <>
                <Text
                  style={{ color: COLORS.white, fontSize: 16, marginRight: 5 }}
                >
                  Save
                </Text>
                <Entypo name="check" size={16} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}

export default Create;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
