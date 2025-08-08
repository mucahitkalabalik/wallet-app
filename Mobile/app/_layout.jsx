import { Slot, useRouter, usePathname } from "expo-router";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Provider, useSelector } from "react-redux";
import store from "@/store/redux";
import React from "react";
import Nav from "@/components/Navigation/Nav";
import ToastManager from "toastify-react-native";
import COLORS from "@/constants/colors";

function AuthGate({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    console.log('change pathname', pathname,isLoggedIn);
    
    if (mounted && !isLoggedIn && pathname !== "/signin") {
      if (pathname === "/register") {
        router.replace("/register");
        return;
      }
      router.replace("/signin");
    }
  }, [isLoggedIn, pathname, mounted]);

  return children;
}

export default function RootLayout() {
  const pathname = usePathname();
  const hideNav = pathname === "/signin" || pathname === "/register";

  return (
    <Provider store={store}>
      <AuthGate>
        <View style={styles.container}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              hideNav && { paddingBottom: 0 },
            ]}
          >
            <Slot />
          </ScrollView>
          {!hideNav && <Nav />}
        </View>
      </AuthGate>
      <ToastManager />
    </Provider>
  );
}

const screenHeight = Dimensions.get("window").height;
const navHeight = screenHeight * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: navHeight,
  },
});
