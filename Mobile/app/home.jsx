import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

function home() {
  const { signUser } = useSelector((state) => state.auth);

  return (
    <View>
      <Text>Welcome to the Home Screen {signUser?.email}</Text>
    </View>
  );
}

export default home;
