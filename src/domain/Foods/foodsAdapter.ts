import {FoodsAPI, Foods, AddFoodParams} from './foodsTypes';

function toFood(foodAPI: FoodsAPI): Foods {
  return {
    id: foodAPI.id,
    createdAt: new Date(foodAPI.created_at),
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
  };
}

function toFoodAPI(food: AddFoodParams): Omit<FoodsAPI, 'id' | 'created_at'> {
  return {
    user_id: food.userId,
    label: food.label,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    calories: food.calories,
    fibre: food.fibre,
    sodium: food.sodium,
    serv_unit: food.servUnit,
    serv_size: food.servSize,
    food_img: food.foodImg,
    category_id: food.categoryId,
  };
}

function toFoodsList(foodsAPI: FoodsAPI[]): Foods[] {
  return foodsAPI.map(toFood);
}

export const foodsAdapter = {
  toFoodsList,
  toFood,
  toFoodAPI,
};
