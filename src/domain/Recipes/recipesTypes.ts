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
  createdAt: Date;
  userId: string;
  name: string;
  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalProtein: number;
  totalFibre: number;
  totalSodium: number;
  serving: number;
  servingUnit: string;
  image?: string;
  recipeItems?: RecipeItem[];
}

export interface RecipeItem {
  id: number;
  createdAt: Date;
  recipeId: number;
  foodId: number;
  quantity: number;
}

export type AddRecipeParams = Omit<RecipesAPI, 'id' | 'created_at'>;
export type AddRecipeItemParams = Omit<RecipeItemsAPI, 'id' | 'created_at'>;

export interface CreateRecipeParams extends Omit<AddRecipeParams, 'id'> {
  items: Omit<AddRecipeItemParams, 'recipe_id'>[];
}

export interface RecipeNavigationParams extends Omit<Recipe, 'createdAt'> {
  createdAt: string;
}
