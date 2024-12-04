import {foodsAdapter} from './foodsAdapter.ts';
import {foodsApi} from './foodsApi.ts';
import {AddFoodParams, Foods} from './foodsTypes.ts';

async function getFoodsByUser(userId: string): Promise<Foods[]> {
  const foodsAPI = await foodsApi.getFoodsByUser(userId);
  return foodsAdapter.toFoodsList(foodsAPI);
}

async function addFood(params: AddFoodParams): Promise<Foods> {
  const foodAPIData = foodsAdapter.toFoodAPI(params);
  const addFoodAPI = await foodsApi.addFood(foodAPIData);
  return foodsAdapter.toFood(addFoodAPI);
}

export const foodsService = {
  getFoodsByUser,
  addFood,
};
