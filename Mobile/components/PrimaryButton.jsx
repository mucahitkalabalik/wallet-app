import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import COLORS from "../constants/colors";

let PrimaryButton = ({ onClick, text, btnColor, textColor, loading = false }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.button,
        { backgroundColor: btnColor || COLORS.primary },
        loading && { pointerEvents: 'none', opacity: 0.6 }, 
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor || COLORS.white} />
      ) : (
        <Text style={[styles.buttonText, { color: textColor || COLORS.white }]}>
          {text}
        </Text>
      )}
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
