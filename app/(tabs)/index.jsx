// If using Expo Router, import your CSS file in the app/_layout.tsx file
import SignOut from "@/app/com/SignOut.jsx";
import "@/app/global.css";
import { View } from "react-native";
import tw from "twrnc";
export default function Index() {
  return (
    <View style={tw`h-full  rounded-xl`}>
      <SignOut />
    </View>
  );
}
