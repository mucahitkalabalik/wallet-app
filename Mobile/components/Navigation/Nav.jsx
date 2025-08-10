import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS, { changeTheme as changeThemeFn } from "@/constants/colors";

import { useDispatch } from "react-redux";
import { resetRegisterState } from "@/store/slices/authSlice";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(resetRegisterState());
    router.replace("/signin");
  };

  const handleThemeChange = () => {
    console.log("Changing theme to coffee");
    const newTheme = changeThemeFn("forest"); 
    console.log("New theme:", newTheme);
    location.reload(); 
  };

  return (
    <View style={styles.nav}>
      <TouchableOpacity
        onPress={() => router.push("/home")}
        style={styles.addButton}
      >
        <Ionicons
          name="home"
          size={30}
          color={pathname === "/home" ? COLORS.primary : COLORS.primaryOp}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/create")}
        style={styles.addButton}
      >
        <AntDesign
          name="plus"
          size={30}
          color={pathname === "/create" ? COLORS.primary : COLORS.primaryOp}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons
          name="color-palette-outline"
          size={30}
          color={COLORS.primaryOp}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={logOut} style={styles.addButton}>
        <AntDesign name="logout" size={30} color={COLORS.primaryOp} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "10%",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: COLORS.primaryOp,
    borderRadius: 20,
    alignItems: "center",
    padding: 10,
  },
});
