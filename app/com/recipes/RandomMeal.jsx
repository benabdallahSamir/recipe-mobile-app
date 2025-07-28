import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
const RandomMeal = ({ meal }) => {
  const router = useRouter();
  return (
    <View style={tw`flex-row justify-around items-center`}>
      <TouchableOpacity
        style={tw`w-full relative`}
        onPress={() => router.push(`/meal/${meal?.idMeal}`)}
      >
        <Image
          source={{
            uri: meal?.strMealThumb,
          }}
          style={tw`w-full object-cover h-[60] rounded-[5]`}
        />
      </TouchableOpacity>
      <View style={tw`absolute bottom-[5] left-[5] flex-col`}>
        <Text
          style={tw`text-center text-sm block rounded-md font-semibold mt-[5] text-2xl text-white font-bold`}
        >
          {meal?.strMeal}
        </Text>
        <View style={tw`flex-row items-center gap-[2]`}>
          <Ionicons name="location-outline" size={24} color="white" />
          <Text
            style={tw`text-center text-sm block rounded-md font-semibold text-base text-white`}
          >
            {meal?.strArea || "Unknown"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RandomMeal;
