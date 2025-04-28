import {mealsAdapter} from './mealsAdapter';
import {mealsApi} from './mealsApi';
import {Meal, MealsTypes, CreateMeal} from './mealsTypes';

async function getMealsByUserAndDate(date: string): Promise<Meal[]> {
  const meals = await mealsApi.getMealsByUserAndDate(date);
  return meals.map(item => {
    return mealsAdapter.toMeal(item);
  });
}

async function createMeal(params: CreateMeal): Promise<Meal> {
  const meal = await mealsApi.createMeal(params);
  return mealsAdapter.toMeal(meal);
}

async function deleteMealsByTypeAndDate(
  date: string,
  mealType: MealsTypes,
): Promise<void> {
  return mealsApi.deleteMealsByTypeAndDate(date, mealType);
}

async function deleteMealItem(
  mealItemId: number,
): Promise<{userId: string; dateAdded: string}> {
  return mealsApi.deleteMealItem(mealItemId);
}

export const mealsService = {
  getMealsByUserAndDate,
  createMeal,
  deleteMealsByTypeAndDate,
  deleteMealItem,
};
