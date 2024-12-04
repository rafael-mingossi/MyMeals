import {supabaseClient} from '@api';

import {AddFoodParams, FoodsAPI} from './foodsTypes.ts';

async function getFoodsByUser(userId: string): Promise<FoodsAPI[]> {
  const {data, error} = await supabaseClient
    .from('foods')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', {ascending: false});

  if (error) {
    throw new Error(`Failed to fetch foods: ${error.message}`);
  }

  return data || [];
}

async function addFood(foodData: AddFoodParams): Promise<FoodsAPI> {
  const {data, error} = await supabaseClient
    .from('foods')
    .insert(foodData)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to add food: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to add food: No data returned');
  }

  return data;
}

export const foodsApi = {
  getFoodsByUser,
  addFood,
};
