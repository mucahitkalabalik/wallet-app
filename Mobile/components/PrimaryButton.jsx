import { Text, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

let PrimaryButton = ({ onClick, text, btnColor, textColor }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.button, { backgroundColor: btnColor || COLORS.primary }]}
    >
      <Text style={[styles.buttonText, { color: textColor || COLORS.white }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PrimaryButton;
