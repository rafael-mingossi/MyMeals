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
