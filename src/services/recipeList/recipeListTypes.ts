import {Foods} from '@domain';

export interface RecipeIngredient {
  food: Foods;
  quantity: number;
}

export type RecipeListTypes = {
  recipeItems: Map<number, RecipeIngredient>;
  addFoodToRecipe: (food: Foods, quantity: number) => void;
  updateIngredient: (foodId: number, quantity: number) => void;
  removeFoodFromRecipe: (foodId: number) => void;
  clearRecipeList: () => void;
};

// You might want to add this type to your domain types
export interface RecipeItemCreate {
  food_id: number;
  quantity: number;
}
