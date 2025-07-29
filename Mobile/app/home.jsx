import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SafeScreen from "../components/SafeScreen";
function home() {
  const { signUser } = useSelector((state) => state.auth);

  return (
    <SafeScreen>
      <View>
        <Text>Welcome to the Home Screen {signUser?.email}</Text>
      </View>
    </SafeScreen>
  );
}

export default home;
