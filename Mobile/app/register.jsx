import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/slices/authSlice";
import { Toast } from "toastify-react-native";

import Verification from "@/components/Verification";
import COLORS from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [verificationModal, setVerificationModal] = useState(false);
  let img = require("../assets/images/revenue-i4.png");

  const register = async () => {
    console.log("Registering with email:", email, "and password:", password);
    if (!email || !password) {
      Toast.error("Please fill in all fields.", "top-right");
      return;
    }
    try {
      const res = await dispatch(registerUser({ email, password }));
      console.log("Component Registration response:", res);
      if (res) {
        setVerificationModal(true);
      }
      
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={img}
        contentFit="cover"
        transition={1000}
        style={styles.logo}
      />
      <Text style={styles.title}>{t("register")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("email")}
        placeholderTextColor={COLORS.textLight}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={t("Password")}
        placeholderTextColor={COLORS.textLight}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <PrimaryButton onClick={register} text={t("register")} />
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>{t("alreadyHaveAccount")}</Text>
        <TouchableOpacity onPress={() => router.push("/signin")}>
          <Text style={styles.switchLink}>{t("signIn")}</Text>
        </TouchableOpacity>
      </View>
      {verificationModal && (
        <Verification
          visible={verificationModal}
          onClose={() => setVerificationModal(!verificationModal)}
          email={email}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
  },
  switchText: {
    color: COLORS.textLight,
    marginRight: 4,
  },
  switchLink: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
