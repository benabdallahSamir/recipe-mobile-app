// If using Expo Router, import your CSS file in the app/_layout.tsx file
import Loader from "@/app/com/Loader.jsx";
import { Categories, RandomMeal, Recipies } from "@/app/com/recipes/recipes.js";
import "@/app/global.css";
import { fetchCategories, fetchRandomMeal } from "@/services/meal.js";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import tw from "twrnc";
import chikenImg from "../../assets/images/chicken.png";
import lambImg from "../../assets/images/lamb.png";
export default function Index() {
  const [categories, setCategories] = useState([]);
  const [randomMeal, setRandomMeal] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState("Beef");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  async function load() {
    // get categories
    setIsLoading(true);
    const categories = await fetchCategories();
    setCategories(categories);
    setActiveCategoryIndex(categories[0]?.strCategory || "Beef");
    // get random meal
    const meal = await fetchRandomMeal();
    setRandomMeal(meal);
    // set loading to false
    setIsLoading(false);
    setRefreshing(false);
  }
  useEffect(() => {
    load();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <FlatList
      style={tw`bg-white px-[20]`}
      data={[]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            load();
          }}
        />
      }
      ListHeaderComponent={
        <>
          {/* images*/}
          <ImagesSection />
          {/* random meal */}
          <RandomMeal meal={randomMeal} />
          {/* all categories */}
          <Categories
            categories={categories}
            activeCategoryIndex={activeCategoryIndex}
            setActiveCategoryIndex={setActiveCategoryIndex}
          />
        </>
      }
      ListFooterComponent={
        <>
          <Recipies category={activeCategoryIndex} />
        </>
      }
    />
  );
}
function ImagesSection() {
  return (
    <View style={tw`flex-row py-[15] my-[10] justify-around items-center`}>
      <Image source={chikenImg} style={tw`w-[50] h-[30] w-[20] rounded-full`} />
      <Image source={lambImg} style={tw`w-[50] h-[30] w-[20] rounded-full`} />
    </View>
  );
}
