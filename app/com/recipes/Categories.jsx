import { Image } from "expo-image";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
const Categories = ({
  categories,
  activeCategoryIndex,
  setActiveCategoryIndex,
}) => {
  return (
    <View
      style={tw`flex-row py-[15] gap-[10] my-[10] justify-around items-center`}
    >
      <FlatList
        data={categories}
        keyExtractor={(category) => category.strCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: category }) => (
          <View
            style={tw`mx-[5] py-[5] px-[5] rounded-lg border border-gray-300 ${
              category.strCategory !== activeCategoryIndex
                ? "bg-gray-300 border-gray-300 "
                : "bg-purple-300 border-purple-700"
            }`}
          >
            <TouchableOpacity
              onPress={() => setActiveCategoryIndex(category.strCategory)}
            >
              <Image
                source={{ uri: category.strCategoryThumb }}
                style={tw`h-[20] w-[30] object-cover `}
              />
              <Text
                style={tw`text-center text-sm font-semibold mt-[5] text-2xl`}
              >
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Categories;
