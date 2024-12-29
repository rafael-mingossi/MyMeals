import {FoodsAPI, Foods} from './foodsTypes';

function toFood(foodAPI: FoodsAPI): Foods {
  return {
    id: foodAPI.id,
    createdAt: foodAPI.created_at,
    userId: foodAPI.user_id,
    label: foodAPI.label,
    protein: foodAPI.protein,
    carbs: foodAPI.carbs,
    fat: foodAPI.fat,
    calories: foodAPI.calories,
    fibre: foodAPI.fibre,
    sodium: foodAPI.sodium,
    servUnit: foodAPI.serv_unit,
    servSize: foodAPI.serv_size,
    foodImg: foodAPI.food_img,
    categoryId: foodAPI.category_id,
    isArchived: foodAPI.is_archived,
  };
}

function toFoodsList(foodsAPI: FoodsAPI[]): Foods[] {
  return foodsAPI.map(toFood);
}

export const foodsAdapter = {
  toFoodsList,
  toFood,
};
