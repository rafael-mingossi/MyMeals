import {api} from '@api';

import {FoodCategoryAPI} from './foodCategoryTypes';

async function getAllCategories(): Promise<FoodCategoryAPI[]> {
  const response = await api.get<FoodCategoryAPI[]>('/categories');

  return response.data;
}

export const foodCategoryApi = {
  getAllCategories,
};
