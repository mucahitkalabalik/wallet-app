import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useUser();

  // Redirect signed-in users to the home page
  if (isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  // Render the stack for authentication routes
  return <Stack screenOptions={{ headerShown: true }} />;
}
