import {foodsAdapter} from './foodsAdapter.ts';
import {foodsApi} from './foodsApi.ts';
import {AddFoodParams, Foods, UpdateFoodParams} from './foodsTypes.ts';

async function getFoodsByUser(userId: string): Promise<Foods[]> {
  const foodsAPI = await foodsApi.getFoodsByUser(userId);
  return foodsAdapter.toFoodsList(foodsAPI);
}

async function addFood(params: AddFoodParams): Promise<Foods> {
  const addFoodAPI = await foodsApi.addFood(params);
  return foodsAdapter.toFood(addFoodAPI);
}

async function updateFood(params: UpdateFoodParams): Promise<Foods> {
  const updateFoodAPI = await foodsApi.updateFood(params);
  return foodsAdapter.toFood(updateFoodAPI);
}

export const foodsService = {
  getFoodsByUser,
  addFood,
  updateFood,
};
