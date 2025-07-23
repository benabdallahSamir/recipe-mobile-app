// If using Expo Router, import your CSS file in the app/_layout.tsx file
import { useAuth } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { View } from "react-native";
import tw from "twrnc";
import "./global.css";
export default function Index() {
  // Check if the user is signed in
  const { isSignedIn } = useAuth();
  if (isSignedIn) return <Redirect href={"/"} />;

  return (
    <View style={tw`h-full  rounded-xl`}>
      <Link

        href="/sign-in"
        style={tw`
          w-[30] m-10
          p-4 bg-blue-500 text-black text-3xl text-center rounded-lg`}
      >
        Sign In
      </Link>
    </View>
  );
}
