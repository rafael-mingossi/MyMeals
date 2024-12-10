import {FoodCategory, FoodCategoryAPI} from './foodCategoryTypes';

function toFoodCategory(foodCategoryAPI: FoodCategoryAPI): FoodCategory {
  return {
    id: foodCategoryAPI.id,
    name: foodCategoryAPI.name,
    iconUrl: foodCategoryAPI.icon_url,
    displayOrder: foodCategoryAPI.display_order,
    createdAt: new Date(foodCategoryAPI.created_at),
    description: foodCategoryAPI.description,
  };
}

function toFoodCategoryList(
  foodCategoriesAPI: FoodCategoryAPI[],
): FoodCategory[] {
  return foodCategoriesAPI.map(toFoodCategory);
}

export const foodCategoryAdapter = {
  toFoodCategoryList,
};
