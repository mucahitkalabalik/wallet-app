import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import COLORS from "../constants/colors";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "@/store/slices/authSlice";
import { Toast } from "toastify-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import LanguageSwitcher from "../components/LanguageSwitcher";
import PrimaryButton from "../components/PrimaryButton";

export default function SignInScreen() {
  const dispatch = useDispatch();
  const { signInLoading } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [email, setEmail] = useState("test@email.com");
  const [password, setPassword] = useState("123123");
  const router = useRouter();
  let img = require("../assets/images/revenue-i2.png");

  const sign = async () => {
    if (!email || !password) {
      Toast.error("Please fill in all fields.", "top-right");
      return;
    }
    try {
      const res = await dispatch(signIn({ email, password }));

      if (res.meta.requestStatus === "fulfilled") {
        router.push("/home");
      } else {
        Toast.error("Sign in failed. Please try again.", "top-right");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Toast.error("Sign in failed. Please try again.", "top-right");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={100}
      enableAutomaticScroll={true}
    >
      <View style={styles.container}>
        <Image
          source={img}
          contentFit="cover"
          transition={1000}
          style={styles.logo}
        />
        <Text style={styles.title}>{t("login")}</Text>
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

        <PrimaryButton
          onClick={sign}
          text={t("login")}
          loading={signInLoading}
        />
        <LanguageSwitcher />

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>{t("dontHaveAccount")}</Text>

          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.switchLink}>{t("register")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 32,
  },
  logo: {
    width: 200,
    height: 200,
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
