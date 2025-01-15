import {supabaseClient} from '@api';

import {
  MealsAPI,
  MealItemsAPI,
  CreateMealParams,
  MealsTypes,
} from './mealsTypes';

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

async function deleteMealsByTypeAndDate(
  userId: string,
  date: string,
  mealType: MealsTypes,
): Promise<void> {
  // Get all meals for this date and mealType
  const {data: meals, error: fetchError} = await supabaseClient
    .from('meals')
    .select('id')
    .eq('user_id', userId)
    .eq('date_added', date)
    .eq('meal_type', mealType);

  if (fetchError) {
    throw new Error(`Failed to fetch meals: ${fetchError.message}`);
  }

  if (!meals || meals.length === 0) {
    return;
  }

  const mealIds = meals.map(meal => meal.id);

  // Delete all related meal items first (foreign key constraint)
  const {error: itemsError} = await supabaseClient
    .from('meal_items')
    .delete()
    .in('meal_id', mealIds);

  if (itemsError) {
    throw new Error(`Failed to delete meal items: ${itemsError.message}`);
  }

  // Then delete the meals
  const {error: mealsError} = await supabaseClient
    .from('meals')
    .delete()
    .in('id', mealIds);

  if (mealsError) {
    throw new Error(`Failed to delete meals: ${mealsError.message}`);
  }
}

async function deleteMealItem(
  mealItemId: number,
): Promise<{userId: string; dateAdded: string}> {
  // First get the meal_id
  const {data: mealItem, error: mealItemError} = await supabaseClient
    .from('meal_items')
    .select('meal_id')
    .eq('id', mealItemId)
    .single();

  if (mealItemError || !mealItem) {
    throw new Error(
      `Failed to fetch meal item: ${mealItemError?.message || 'Item not found'}`,
    );
  }

  // Then get the meal info
  const {data: meal, error: mealError} = await supabaseClient
    .from('meals')
    .select('user_id, date_added')
    .eq('id', mealItem.meal_id)
    .single();

  if (mealError || !meal) {
    throw new Error(
      `Failed to fetch meal: ${mealError?.message || 'Meal not found'}`,
    );
  }

  // Now delete the meal item
  const {error: deleteError} = await supabaseClient
    .from('meal_items')
    .delete()
    .eq('id', mealItemId);

  if (deleteError) {
    throw new Error(`Failed to delete meal item: ${deleteError.message}`);
  }

  return {
    userId: meal.user_id,
    dateAdded: meal.date_added,
  };
}

// Update the mealsApi export
export const mealsApi = {
  getMealsByUserAndDate,
  createMeal,
  deleteMealsByTypeAndDate,
  deleteMealItem,
};
