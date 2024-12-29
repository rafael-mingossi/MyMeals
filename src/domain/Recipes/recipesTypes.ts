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
  recipeItems?: RecipeItem[];
  isArchived: boolean;
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

export type AddRecipeParams = Omit<RecipesAPI, 'id' | 'created_at'> & {
  is_archived?: boolean;
};

export type AddRecipeItemParams = Omit<RecipeItemsAPI, 'id' | 'created_at'>;

export interface CreateRecipeParams extends Omit<AddRecipeParams, 'id'> {
  items: Omit<AddRecipeItemParams, 'recipe_id'>[];
}

export type UpdateRecipe = Omit<
  RecipesAPI,
  'created_at' | 'user_id' | 'is_archived'
>;

export type UpdateRecipeItemParams = Omit<
  RecipeItemsAPI,
  'id' | 'created_at' | 'recipe_id'
>;

export interface UpdateRecipePayload extends UpdateRecipe {
  items: UpdateRecipeItemParams[];
}

export type UpdateRecipeParams = Omit<UpdateRecipePayload, 'id'>;
