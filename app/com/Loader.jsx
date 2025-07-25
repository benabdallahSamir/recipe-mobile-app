import { Text, View } from "react-native";
import tw from "twrnc";
export function Loader() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg font-bold`}>Loading...</Text>
    </View>
  );
}
export default Loader;
