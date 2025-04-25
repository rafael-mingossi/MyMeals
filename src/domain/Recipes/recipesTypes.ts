import {Foods} from '../Foods';

export type RecItemsAPI = {
  id: number;
  recipe_id: number;
  food_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  food: Foods;
};

export interface RecipesAPI {
  id: number;
  created_at: string;
  user_id: string;
  name: string;
  t_calories: number;
  t_carbs: number;
  t_fat: number;
  t_protein: number;
  t_fibre: number;
  t_sodium: number;
  serving: number;
  serv_unit: string;
  img?: string;
  is_archived: boolean;
  items: RecItemsAPI[];
}

export interface RecipeItemsAPI {
  id: number;
  created_at: string;
  recipe_id: number;
  food_id: number;
  quantity: number;
}

export interface Recipe {
  id: number;
  createdAt: string;
  userId: string;
  label: string;
  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalProtein: number;
  totalFibre: number;
  totalSodium: number;
  servSize: number;
  servUnit: string;
  image?: string;
  isArchived: boolean;
  recipeItems?: RecipeItem[];
}

export interface RecipeItem {
  id: number;
  createdAt: string;
  recipeId: number;
  foodId: number;
  quantity: number;
}

export interface RecipeItemNavigation extends Omit<RecipeItem, 'createdAt'> {
  createdAt: string;
}

export type AddRecipeParams = Omit<
  RecipesAPI,
  | 'id'
  | 'created_at'
  | 'items'
  | 't_calories'
  | 't_carbs'
  | 't_fat'
  | 't_fibre'
  | 't_protein'
  | 't_sodium'
>;

export type AddRecipeItemParams = Omit<
  RecItemsAPI,
  'id' | 'created_at' | 'updated_at' | 'recipe_id' | 'food'
>;

export type CreateRecipeParams = {
  items: AddRecipeItemParams[];
} & AddRecipeParams;

export type UpdateRecipeParams = Omit<
  RecipesAPI,
  | 'created_at'
  | 'is_archived'
  | 't_calories'
  | 't_carbs'
  | 't_fat'
  | 't_fibre'
  | 't_protein'
  | 't_sodium'
  | 'items'
>;

export type UpdateRecipeAPI = {
  items: AddRecipeItemParams[];
} & UpdateRecipeParams;
