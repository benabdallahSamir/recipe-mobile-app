import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
const RecipesCard = ({ meal }) => {
  const [loading, setLoading] = useState(true);
  const [mealDetails, setMealDetails] = useState(null);
  const router = useRouter();
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const data = await response.json();
        if (data.meals) {
          meal = data.meals[0];
          setMealDetails(meal);
        }
      } catch (error) {
        console.error("Error fetching meal data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null; // or a loading spinner
  return (
    <View
      style={tw`py-[15] px-[5] bg-gray-100 overflow-hidden w-[49%] rounded-lg my-[10]`}
    >
      <TouchableOpacity
        onPress={() => router.push(`/meal/${mealDetails.idMeal}`)}
      >
        <Image
          source={{ uri: mealDetails?.strMealThumb }}
          style={tw`h-[40] w-full rounded-lg`}
        />
        <Text
          style={tw`text-blue-700 font-semibold mt-[5] text-2xl`}
          numberOfLines={2}
        >
          {mealDetails?.strMeal}
        </Text>
        <Text style={tw`text-xl mt-[5]`} numberOfLines={3}>
          {mealDetails?.strInstructions}
        </Text>
        <View style={tw`flex-row gap-2 items-center`}>
          <Ionicons name="location-outline" size={16} color="gray" />
          <Text style={tw`text-gray-500 text-sm`}>
            {mealDetails?.strArea || "Unknown"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RecipesCard;
