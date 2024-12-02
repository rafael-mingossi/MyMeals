import {foodCategoryAdapter} from './foodCategoryAdapter';
import {foodCategoryApi} from './foodCategoryApi';
import {FoodCategory} from './foodCategoryTypes';

async function getAll(): Promise<FoodCategory[]> {
  const foodCategoriesAPI = await foodCategoryApi.getAll();
  return foodCategoryAdapter.toFoodCategoryList(foodCategoriesAPI);
}

export const foodCategoryService = {
  getAll,
};
