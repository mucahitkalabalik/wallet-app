import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import logo from "@/assets/images/logo.png";
import COLORS from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import XLSX from "xlsx";

async function exportToExcel(data) {
  try {
    // 1. JSON -> Excel dönüştür
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // 2. Excel dosyasını binary olarak yaz
    const excelBinary = XLSX.write(workbook, {
      type: "base64",
      bookType: "xlsx",
    });

    // 3. Kaydedilecek dosya yolu
    const filePath = FileSystem.documentDirectory + "transactions.xlsx";

    // 4. Dosyayı yaz
    await FileSystem.writeAsStringAsync(filePath, excelBinary, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // 5. Paylaş
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(filePath);
    } else {
      alert("Paylaşım bu cihazda desteklenmiyor: " + filePath);
    }
  } catch (error) {
    console.error("Excel export hatası:", error);
  }
}

function HeaderSection({ user }) {
  const { transactions } = useSelector((state) => state.transactions);

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
        onPress={() => exportToExcel(transactions)}
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
