import { Slot, useRouter, usePathname } from "expo-router";
import { Provider, useSelector } from "react-redux";
import store from "@/store/redux";
import React from "react";

import ToastManager from 'toastify-react-native'

function AuthGate({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
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
  return (
    <Provider store={store}>
      <AuthGate>
        <Slot />
      </AuthGate>
      <ToastManager />
    </Provider>
  );
}
