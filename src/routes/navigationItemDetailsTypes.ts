import {MealsTypes, RecipeItemNavigation} from '@domain';

export interface BaseNavigationParams {
  id: number;
  createdAt: string;
  userId: string;
  label: string;
  servSize: number;
  servUnit: string;
}

export interface FoodNavigationParams extends BaseNavigationParams {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  fibre: number;
  sodium: number;
  foodImg: string;
  categoryId: number | null;
  isArchived: boolean;
}

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

// Generic type for Foods/Recipes Details Screen
export type ItemDetailsScreenParams<T extends BaseNavigationParams> = {
  isViewOnly: boolean;
  item: T;
  mealType?: MealsTypes;
};

export type UpdateEntryScreenParams<T extends BaseNavigationParams> = {
  isUpdatingItem: boolean;
  item: T;
  updating: 'food' | 'recipe';
};
