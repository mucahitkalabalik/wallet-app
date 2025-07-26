import { TouchableOpacity, Text, StyleSheet } from "react-native";
import i18n from "@/i18n";
import COLORS from "../constants/colors";
import { useTranslation } from "react-i18next";

const changeLanguage = () => {
  i18n.changeLanguage(i18n.language === "tr" ? "en" : "tr");
};
const LanguageSwitcher = () => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => changeLanguage()}>
      <Text style={styles.buttonText}>{t("changeLanguage")}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default LanguageSwitcher;
