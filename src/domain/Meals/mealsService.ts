import {mealsAdapter} from './mealsAdapter';
import {mealsApi} from './mealsApi';
import {Meal, CreateMealParams, MealsTypes} from './mealsTypes';

async function getMealsByUserAndDate(
  userId: string,
  date: string,
): Promise<Meal[]> {
  const {meals, mealItems} = await mealsApi.getMealsByUserAndDate(userId, date);
  return meals.map(meal => {
    const mealItemsList = mealItems.filter(item => item.meal_id === meal.id);
    return mealsAdapter.toMeal(meal, mealItemsList);
  });
}

async function createMeal(params: CreateMealParams): Promise<Meal> {
  const {meal, mealItems} = await mealsApi.createMeal(params);
  return mealsAdapter.toMeal(meal, mealItems);
}

async function deleteMealsByTypeAndDate(
  userId: string,
  date: string,
  mealType: MealsTypes,
): Promise<void> {
  return mealsApi.deleteMealsByTypeAndDate(userId, date, mealType);
}

async function deleteMealItem(
  mealItemId: number,
): Promise<{userId: string; dateAdded: string}> {
  return mealsApi.deleteMealItem(mealItemId);
}

// Update the mealsService export
export const mealsService = {
  getMealsByUserAndDate,
  createMeal,
  deleteMealsByTypeAndDate,
  deleteMealItem,
};
