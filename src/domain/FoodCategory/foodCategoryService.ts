import {foodCategoryAdapter} from './foodCategoryAdapter';
import {foodCategoryApi} from './foodCategoryApi';
import {FoodCategory} from './foodCategoryTypes';

async function getAllCategories(): Promise<FoodCategory[]> {
  const foodCategoriesAPI = await foodCategoryApi.getAllCategories();
  return foodCategoryAdapter.toFoodCategoryList(foodCategoriesAPI);
}

export const foodCategoryService = {
  getAllCategories,
};
