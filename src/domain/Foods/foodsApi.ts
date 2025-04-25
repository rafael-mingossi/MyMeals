import {api} from '@api';

import {AddFoodParams, FoodsAPI, UpdateFoodParams} from './foodsTypes.ts';

export const FOOD_PATH = '/foods';

async function getFoodsByUser(): Promise<FoodsAPI[]> {
  const response = await api.get<FoodsAPI[]>(FOOD_PATH);

  return response.data;
}

async function getFoodsByIds(foodIds: {
  foodIds: number[];
}): Promise<FoodsAPI[]> {
  const response = await api.post<FoodsAPI[]>(`${FOOD_PATH}/byIds`, foodIds);
  return response.data;
}

async function addFood(foodData: AddFoodParams): Promise<FoodsAPI> {
  const response = await api.post<FoodsAPI>(FOOD_PATH, foodData);
  return response.data;
}

async function updateFood(
  foodData: UpdateFoodParams,
  foodId: number,
): Promise<FoodsAPI> {
  const response = await api.put<FoodsAPI>(`${FOOD_PATH}/${foodId}`, foodData);

  return response.data;
}

async function archiveFood(foodId: number): Promise<FoodsAPI> {
  const response = await api.put<{message: string; food: FoodsAPI}>(
    `${FOOD_PATH}/${foodId}/archive`,
  );
  return response.data.food;
}

export const foodsApi = {
  getFoodsByUser,
  addFood,
  updateFood,
  archiveFood,
  getFoodsByIds,
};
