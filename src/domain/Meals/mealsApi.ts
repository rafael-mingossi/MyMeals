import {supabaseClient} from '@api';

import {MealsAPI, MealItemsAPI, CreateMealParams} from './mealsTypes';

async function getMealsByUserAndDate(
  userId: string,
  date: string,
): Promise<{meals: MealsAPI[]; mealItems: MealItemsAPI[]}> {
  const {data: meals, error: mealsError} = await supabaseClient
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .eq('date_added', date)
    .order('created_at', {ascending: true});

  if (mealsError) {
    throw new Error(`Failed to fetch meals: ${mealsError.message}`);
  }

  if (!meals || meals.length === 0) {
    return {meals: [], mealItems: []};
  }

  const mealIds = meals.map(meal => meal.id);
  const {data: mealItems, error: itemsError} = await supabaseClient
    .from('meal_items')
    .select('*')
    .in('meal_id', mealIds);

  if (itemsError) {
    throw new Error(`Failed to fetch meal items: ${itemsError.message}`);
  }

  return {
    meals: meals,
    mealItems: mealItems || [],
  };
}

async function createMeal(mealData: CreateMealParams): Promise<{
  meal: MealsAPI;
  mealItems: MealItemsAPI[];
}> {
  const {items, ...mealParams} = mealData;

  const {data: meal, error: mealError} = await supabaseClient
    .from('meals')
    .insert(mealParams)
    .select('*')
    .single();

  if (mealError || !meal) {
    throw new Error(`Failed to create meal: ${mealError?.message}`);
  }

  const mealItemsData = items.map(item => ({
    meal_id: meal.id,
    food_id: item.foodId || null,
    food_quantity: item.foodQuantity || null,
    recipe_id: item.recipeId || null,
    recipe_quantity: item.recipeQuantity || null,
  }));

  const {data: mealItems, error: itemsError} = await supabaseClient
    .from('meal_items')
    .insert(mealItemsData)
    .select('*');

  if (itemsError || !mealItems) {
    throw new Error(`Failed to create meal items: ${itemsError?.message}`);
  }

  return {meal, mealItems};
}

export const mealsApi = {
  getMealsByUserAndDate,
  createMeal,
};
