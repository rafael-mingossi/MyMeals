import {MealsAPI, MealItemsAPI, Meal, MealItem} from './mealsTypes';

function toMealItem(mealItemAPI: MealItemsAPI): MealItem {
  return {
    id: mealItemAPI.id,
    createdAt: mealItemAPI.created_at,
    mealId: mealItemAPI.meal_id,
    foodId: mealItemAPI.food_id || undefined,
    foodQuantity: mealItemAPI.food_quantity || undefined,
    recipeId: mealItemAPI.recipe_id || undefined,
    recipeQuantity: mealItemAPI.recipe_quantity || undefined,
  };
}

function toMeal(mealAPI: MealsAPI, mealItemsAPI?: MealItemsAPI[]): Meal {
  return {
    id: mealAPI.id,
    createdAt: mealAPI.created_at,
    userId: mealAPI.user_id,
    mealType: mealAPI.meal_type,
    dateAdded: mealAPI.date_added,
    // dateAdded: new Date(mealAPI.date_added),
    totalCalories: mealAPI.t_calories,
    totalCarbs: mealAPI.t_carbs,
    totalFat: mealAPI.t_fat,
    totalProtein: mealAPI.t_protein,
    totalFibre: mealAPI.t_fibre,
    totalSodium: mealAPI.t_sodium,
    mealItems: mealItemsAPI?.map(toMealItem),
  };
}

function toMealsList(mealsAPI: MealsAPI[]): Meal[] {
  return mealsAPI.map(meal => toMeal(meal));
}

export const mealsAdapter = {
  toMeal,
  toMealsList,
  toMealItem,
};
