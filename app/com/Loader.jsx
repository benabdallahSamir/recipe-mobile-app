import loaderImg from "@/assets/images/loading.svg";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import tw from "twrnc";
export function Loader() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Image source={loaderImg} style={tw`w-full h-[59]`} />
      <Text style={tw`mt-[10] text-4xl font-semibold`}>Loading...</Text>
    </View>
  );
}
export default Loader;
