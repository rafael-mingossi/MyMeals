import {supabaseClient} from '@api';

import {AddFoodParams, FoodsAPI, UpdateFoodParams} from './foodsTypes.ts';

async function getFoodsByUser(
  userId: string,
  showArchived: boolean = false,
): Promise<FoodsAPI[]> {
  const {data, error} = await supabaseClient
    .from('foods')
    .select('*')
    .eq('user_id', userId)
    .eq('is_archived', showArchived)
    .order('created_at', {ascending: false});

  if (error) {
    throw new Error(`Failed to fetch foods: ${error.message}`);
  }

  return data || [];
}

async function getFoodsByIds(foodIds: number[]): Promise<FoodsAPI[]> {
  const {data, error} = await supabaseClient
    .from('foods')
    .select('*')
    .in('id', foodIds);

  if (error) {
    throw new Error(`Failed to fetch foods: ${error.message}`);
  }

  return data || [];
}

async function addFood(foodData: AddFoodParams): Promise<FoodsAPI> {
  const {data, error} = await supabaseClient
    .from('foods')
    .insert(foodData)
    .select('*') ///// This requests the created record to be returned
    .single(); ////// This ensures a single record is returned

  if (error) {
    throw new Error(`Failed to add food: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to add food: No data returned');
  }

  return data;
}

async function updateFood(foodData: UpdateFoodParams): Promise<FoodsAPI> {
  const {data, error} = await supabaseClient
    .from('foods')
    .update({
      label: foodData.label,
      protein: foodData.protein,
      carbs: foodData.carbs,
      fat: foodData.fat,
      calories: foodData.calories,
      fibre: foodData.fibre,
      sodium: foodData.sodium,
      serv_size: foodData.serv_size,
      serv_unit: foodData.serv_unit,
      food_img: foodData.food_img,
      category_id: foodData.category_id,
    })
    .eq('id', foodData.id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update food: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to update food: No data returned');
  }

  return data;
}

async function archiveFood(foodId: number): Promise<FoodsAPI> {
  const {data, error} = await supabaseClient
    .from('foods')
    .update({is_archived: true})
    .eq('id', foodId)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to archive food: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to archive food: No data returned');
  }

  return data;
}

export const foodsApi = {
  getFoodsByUser,
  addFood,
  updateFood,
  archiveFood,
  getFoodsByIds,
};
