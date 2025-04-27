import {Foods, FoodsAPI} from '../Foods';
import {Recipe, RecipesAPI} from '../Recipes';

export type MealsTypes = 'breakfast' | 'snack' | 'lunch' | 'dinner';

export interface MealsAPI {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  meal_type: MealsTypes;
  date_added: string;
  t_calories: number;
  t_carbs: number;
  t_fat: number;
  t_protein: number;
  t_fibre: number;
  t_sodium: number;
  items: MealItemsAPI[];
}

export interface MealItemsAPI {
  id: number;
  created_at: string;
  updated_at: string;
  meal_id: number;
  food_id: number | null;
  food_quantity: number | null;
  recipe_id: number | null;
  recipe_quantity: number | null;
  food: FoodsAPI | null;
  recipe: RecipesAPI | null;
}

export interface Meal {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  mealType: MealsTypes;
  dateAdded: string;
  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalProtein: number;
  totalFibre: number;
  totalSodium: number;
  mealItems?: MealItem[];
}

export interface MealItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  mealId: number;
  foodId?: number;
  foodQuantity?: number;
  recipeId?: number;
  recipeQuantity?: number;
  food: Foods | null;
  recipe: Recipe | null;
}

export interface CreateMeal {
  meal_type: MealsTypes;
  date_added: string;
  items: MealItemParams[];
}

export interface MealItemParams {
  food_item?: MealFoodItem;
  recipe_item?: MealRecipeItem;
}

type MealFoodItem = {
  food_id: number | null;
  quantity: number | null;
};

type MealRecipeItem = {
  recipe_id: number | null;
  quantity: number | null;
};
