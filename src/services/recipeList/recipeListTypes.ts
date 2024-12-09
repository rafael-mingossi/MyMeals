import {Foods} from '@domain';

export type RecipeListTypes = {
  recipeList: Foods[];
  addFoodToRecipe: (food: Foods) => void;
  removeFoodFromRecipe: (foodId: Foods['id']) => void;
  clearRecipeList: () => void;
};
