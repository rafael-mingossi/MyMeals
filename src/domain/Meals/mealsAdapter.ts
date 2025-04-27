import {foodsAdapter} from '../Foods/foodsAdapter.ts';
import {recipesAdapter} from '../Recipes/recipesAdapter.ts';

import {MealsAPI, MealItemsAPI, Meal, MealItem} from './mealsTypes';

function toMealItem(mealItemAPI: MealItemsAPI): MealItem {
  return {
    id: mealItemAPI.id,
    createdAt: mealItemAPI.created_at,
    updatedAt: mealItemAPI.updated_at,
    mealId: mealItemAPI.meal_id,
    foodId: mealItemAPI.food_id || undefined,
    foodQuantity: mealItemAPI.food_quantity || undefined,
    recipeId: mealItemAPI.recipe_id || undefined,
    recipeQuantity: mealItemAPI.recipe_quantity || undefined,
    food: foodsAdapter.toFoodMeal(mealItemAPI.food) || null,
    recipe: recipesAdapter.toRecipeMeal(mealItemAPI.recipe) || null,
  };
}

function toMeal(mealAPI: MealsAPI): Meal {
  return {
    id: mealAPI.id,
    createdAt: mealAPI.created_at,
    updatedAt: mealAPI.updated_at,
    userId: mealAPI.user_id,
    mealType: mealAPI.meal_type,
    dateAdded: mealAPI.date_added,
    totalCalories: mealAPI.t_calories,
    totalCarbs: mealAPI.t_carbs,
    totalFat: mealAPI.t_fat,
    totalProtein: mealAPI.t_protein,
    totalFibre: mealAPI.t_fibre,
    totalSodium: mealAPI.t_sodium,
    mealItems: mealAPI?.items.map(toMealItem),
  };
}

export const mealsAdapter = {
  toMeal,
};
