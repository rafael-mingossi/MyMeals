import {api} from '@api';

import {MealsAPI, MealsTypes, CreateMeal} from './mealsTypes';

const MEALS_PATH = '/meals';

async function getMealsByUserAndDate(date: string): Promise<MealsAPI[]> {
  const response = await api.get<MealsAPI[]>(`${MEALS_PATH}/date/${date}`);

  return response.data;
}

async function createMeal(mealData: CreateMeal): Promise<MealsAPI> {
  const response = await api.post<MealsAPI>(MEALS_PATH, mealData);
  return response.data;
}

async function deleteMealsByTypeAndDate(
  date: string,
  mealType: MealsTypes,
): Promise<void> {
  const response = await api.delete(
    `${MEALS_PATH}/type-date?date=${date}&mealType=${mealType}`,
  );
  return response.data;
}

async function deleteMealItem(mealItemId: number): Promise<{
  userId: string;
  dateAdded: string;
}> {
  const response = await api.delete<{
    userId: string;
    dateAdded: string;
  }>(`${MEALS_PATH}/items/${mealItemId}`);
  return response.data;
}

export const mealsApi = {
  getMealsByUserAndDate,
  createMeal,
  deleteMealsByTypeAndDate,
  deleteMealItem,
};
