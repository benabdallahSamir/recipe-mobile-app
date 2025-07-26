export const meal_api = "https://www.themealdb.com/api/json/v1/1/";
export const ourCategories = [
  "beef",
  "chicken",
  "lamb",
  "dessert",
  "seafood",
  "vegetarian",
];

export async function fetchCategories() {
  try {
    const response = await fetch(`${meal_api}categories.php`);
    const data = await response.json();
    let categories = data.categories;
    categories = categories.filter((category) =>
      ourCategories.includes(category.strCategory.toLowerCase())
    );
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchRandomMeal() {
  try {
    const response = await fetch(`${meal_api}random.php`);
    const data = await response.json();
    const meal = data.meals.filter((meal) =>
      ourCategories.includes(meal.strCategory.toLowerCase())
    )[0];
    return meal;
  } catch (error) {
    console.error("Error fetching random meal:", error);
    return null;
  }
}

export async function fetchCategoryMeals(category) {
  try {
    const response = await fetch(`${meal_api}filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Error fetching meals for category ${category}:`, error);
    return [];
  }
}
