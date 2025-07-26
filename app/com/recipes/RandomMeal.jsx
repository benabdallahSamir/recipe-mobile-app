import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
const RandomMeal = ({ meal }) => {
  return (
    <View style={tw`flex-row justify-around items-center`}>
      <TouchableOpacity style={tw`w-full relative`}>
        <Image
          source={{
            uri: meal?.strMealThumb,
          }}
          style={tw`w-full object-cover h-[60] rounded-[5]`}
        />
      </TouchableOpacity>
      <Text
        style={tw`text-center text-sm block bg-gray-300/50 px-[3] rounded-md font-semibold mt-[5] text-2xl absolute bottom-[10] left-[5] text-white font-bold`}
      >
        {meal?.strMeal}
      </Text>
    </View>
  );
};

export default RandomMeal;
