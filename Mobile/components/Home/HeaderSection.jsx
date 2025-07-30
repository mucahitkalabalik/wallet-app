import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import logo from "@/assets/images/logo.png";
import COLORS from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

function HeaderSection({ user }) {
  const router = useRouter();
  return (
    <View style={styles.headerContainer}>
      <Image source={logo} style={{ width: 100, height: 100 }} />
      <View>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.username}>{user?.username}</Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/create")}
        style={styles.addButton}
      >
        <AntDesign name="plus" size={16} color="white" />
        <Text style={{ color: "white", marginLeft: "5" }}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log("Button Pressed")}
        style={styles.exportButton}
      >
        <AntDesign name="export" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 10,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    alignItems: "center",
    padding: 10,
    marginLeft: 50,
  },
  exportButton: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  welcome: {
    fontSize: 12,
    color: COLORS.primary,
  },
});

export default HeaderSection;
