import {foodsAdapter} from './foodsAdapter.ts';
import {foodsApi} from './foodsApi.ts';
import {AddFoodParams, Foods, UpdateFoodParams} from './foodsTypes.ts';

async function getFoodsByUser(
  userId: string,
  showArchived: boolean = false,
): Promise<Foods[]> {
  const foodsAPI = await foodsApi.getFoodsByUser(userId, showArchived);
  return foodsAdapter.toFoodsList(foodsAPI);
}

async function getFoodsByIds(foodIds: number[]): Promise<Foods[]> {
  const foodsAPI = await foodsApi.getFoodsByIds(foodIds);
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

async function archiveFood(foodId: number): Promise<void> {
  return foodsApi.archiveFood(foodId);
}

export const foodsService = {
  getFoodsByUser,
  addFood,
  updateFood,
  archiveFood,
  getFoodsByIds,
};
