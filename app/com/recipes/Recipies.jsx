import Loader from "@/app/com/Loader.jsx";
import RecipesCard from "@/app/com/RecipesCard.jsx";
import { fetchCategoryMeals } from "@/services/meal.js";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import tw from "twrnc";
const Recipies = ({ category }) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const meals = await fetchCategoryMeals(category);
      setMeals(meals);
      // set loading to false
      setIsLoading(false);
    })();
  }, [category]);
  if (isLoading) return <Loader />;
  return (
    <FlatList
      data={meals}
      renderItem={({ item: meal }) => <RecipesCard meal={meal} />}
      keyExtractor={(item) => item.idMeal?.toString()}
      numColumns={2}
      columnWrapperStyle={tw`justify-between`}
      contentContainerStyle={tw`py-[15] gap-x-[10]`}
      showsVerticalScrollIndicator={true}
      ListEmptyComponent={<Text>No meals found</Text>}
    />
  );
};

export default Recipies;
