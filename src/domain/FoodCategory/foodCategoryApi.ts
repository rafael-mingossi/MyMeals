import {supabaseClient} from '@api';

import {FoodCategoryAPI} from './foodCategoryTypes';

async function getAll(): Promise<FoodCategoryAPI[]> {
  const {data, error} = await supabaseClient
    .from('food_categories')
    .select('*')
    .order('display_order');

  if (error) {
    throw new Error(`Failed to fetch food categories: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  return data;
}

export const foodCategoryApi = {
  getAll,
};
