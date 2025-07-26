import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
const RecipesCard = ({ meal }) => {
  console.log(meal);
  return (
    <View
      style={tw`py-[15] px-[5] bg-gray-100 overflow-hidden w-[49%] rounded-lg my-[10]`}
    >
      <TouchableOpacity>
        <Image
          source={{ uri: meal?.strMealThumb }}
          style={tw`h-[40] w-full rounded-lg`}
        />
        <Text style={tw`text-blue-700 font-semibold mt-[5] text-2xl`}>
          {meal?.strMeal.substring(0, 20) +
            (meal?.strMeal.length > 20 ? "..." : "")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecipesCard;
