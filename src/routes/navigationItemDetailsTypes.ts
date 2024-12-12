import {RecipeItemNavigation} from '@domain';

// Base navigation params type
interface BaseNavigationParams {
  id: number;
  createdAt: string;
  userId: string;
  label: string;
  servSize: number;
  servUnit: string;
}

// Food navigation params
export interface FoodNavigationParams extends BaseNavigationParams {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  fibre: number;
  sodium: number;
  foodImg: string;
  categoryId: number | null;
}

// Recipe navigation params
export interface RecipeNavigationParams extends BaseNavigationParams {
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalCalories: number;
  totalFibre: number;
  totalSodium: number;
  image?: string;
  recipeItems?: RecipeItemNavigation[];
}

// Generic type for screen props
export type ItemDetailsScreenParams<T extends BaseNavigationParams> = {
  isViewOnly: boolean;
  item: T;
};
