// If using Expo Router, import your CSS file in the app/_layout.tsx file
import "@/app/global.css";
import { Link } from "expo-router";
import { View } from "react-native";
import tw from "twrnc";
export default function Index() {
  return (
    <View style={tw`h-full  rounded-xl`}>
      <Link
        href="/verify-email"
        style={tw`
          w-[30] m-10
          p-4 bg-blue-500 text-black text-3xl text-center rounded-lg`}
      >
        Sign In
      </Link>
    </View>
  );
}
