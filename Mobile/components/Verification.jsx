import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import COLORS from "../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { verifyEmail } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";

const Verification = ({ visible, onClose, email }) => {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const dispatch = useDispatch();

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  function verify() {
    const verificationCode = code.join("");
    console.log("Verification code entered:", verificationCode);
    dispatch(verifyEmail({ email, code: verificationCode }))
      .then((response) => {
        if (response) {
          console.log("in iff");
          Toast.success("Verification successful!", "top-right");
          router.push("/login");
        } else {
          Toast.error("Verification failed. Please try again.", "top-right");
        }
      })
      .catch((error) => {
        console.error("Verification error:", error);
        Toast.error("Verification failed. Please try again.", "top-right");
      });

    onClose();
    setCode(["", "", "", "", "", ""]);

    inputs.current.forEach((input) => input.clear());
  }

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <View style={styles.inputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={verify} style={styles.button}>
            <Text style={styles.buttonText}> Accept </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: 40,
    height: 50,
    marginHorizontal: 5,
    textAlign: "center",
    fontSize: 20,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});
