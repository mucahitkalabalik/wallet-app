import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SafeScreen from "../components/SafeScreen";
import HeaderSection from "../components/Home/HeaderSection";

function home() {
  const { signUser } = useSelector((state) => state.auth);
  console.log(signUser, "signUser from home screen");
  
  return (
    <SafeScreen>
      <View>
        <HeaderSection user={signUser} />
      </View>
    </SafeScreen>
  );
}

export default home;
