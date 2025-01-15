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

type ReturnProp = {
  userId: string;
  dateAdded: string;
};

async function deleteMealItem(mealItemId: number): Promise<ReturnProp> {
  // First, get the meal item and its associated meal to have access to user_id and date_added
  const {data: mealItem, error: mealItemError} = await supabaseClient
    .from('meal_items')
    .select(
      `
      *,
      meals (
        user_id,
        date_added
      )
    `,
    )
    .eq('id', mealItemId)
    .single();

  if (mealItemError || !mealItem) {
    throw new Error(`Failed to fetch meal item: ${mealItemError?.message}`);
  }

  // Store user_id and date_added for later use
  const userId = mealItem.meals.user_id;
  const dateAdded = mealItem.meals.date_added;
  const mealId = mealItem.meal_id;

  // Delete the meal item
  const {error: deleteError} = await supabaseClient
    .from('meal_items')
    .delete()
    .eq('id', mealItemId);

  if (deleteError) {
    throw new Error(`Failed to delete meal item: ${deleteError.message}`);
  }

  // Get remaining meal items for this meal
  const {data: remainingItems, error: remainingError} = await supabaseClient
    .from('meal_items')
    .select(
      `
      *,
      foods (
        calories, protein, carbs, fat, fibre, sodium
      ),
      recipes (
        t_calories, t_protein, t_carbs, t_fat, t_fibre, t_sodium
      )
    `,
    )
    .eq('meal_id', mealId);

  if (remainingError) {
    throw new Error(
      `Failed to fetch remaining items: ${remainingError.message}`,
    );
  }

  // If there are no remaining items, delete the meal
  if (!remainingItems || remainingItems.length === 0) {
    const {error: deleteMealError} = await supabaseClient
      .from('meals')
      .delete()
      .eq('id', mealId);

    if (deleteMealError) {
      throw new Error(`Failed to delete meal: ${deleteMealError.message}`);
    }
  } else {
    // Calculate new totals
    const totals = remainingItems.reduce(
      (acc, item) => {
        const quantity = item.food_quantity || item.recipe_quantity || 0;
        const source = item.foods || item.recipes;

        if (!source) {
          return acc;
        }

        // Handle both food and recipe properties
        const calories = source.calories || source.t_calories || 0;
        const protein = source.protein || source.t_protein || 0;
        const carbs = source.carbs || source.t_carbs || 0;
        const fat = source.fat || source.t_fat || 0;
        const fibre = source.fibre || source.t_fibre || 0;
        const sodium = source.sodium || source.t_sodium || 0;

        return {
          t_calories: acc.t_calories + calories * quantity,
          t_protein: acc.t_protein + protein * quantity,
          t_carbs: acc.t_carbs + carbs * quantity,
          t_fat: acc.t_fat + fat * quantity,
          t_fibre: acc.t_fibre + fibre * quantity,
          t_sodium: acc.t_sodium + sodium * quantity,
        };
      },
      {
        t_calories: 0,
        t_protein: 0,
        t_carbs: 0,
        t_fat: 0,
        t_fibre: 0,
        t_sodium: 0,
      },
    );

    // Update meal with new totals
    const {error: updateError} = await supabaseClient
      .from('meals')
      .update(totals)
      .eq('id', mealId);

    if (updateError) {
      throw new Error(`Failed to update meal totals: ${updateError.message}`);
    }
  }

  return {
    userId,
    dateAdded,
  };
}

export const mealsApi = {
  getMealsByUserAndDate,
  createMeal,
  deleteMealsByTypeAndDate,
  deleteMealItem,
};
