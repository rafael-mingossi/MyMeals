import {recipesAdapter} from './recipesAdapter';
import {recipesApi} from './recipesApi';
import {Recipe, CreateRecipeParams} from './RecipesTypes';

async function getRecipesByUser(userId: string): Promise<Recipe[]> {
  const {recipes, recipeItems} = await recipesApi.getRecipesByUser(userId);
  return recipes.map(recipe => {
    const recipeItemsList = recipeItems.filter(
      item => item.recipe_id === recipe.id,
    );
    return recipesAdapter.toRecipe(recipe, recipeItemsList);
  });
}

async function createRecipe(params: CreateRecipeParams): Promise<Recipe> {
  const {recipe, recipeItems} = await recipesApi.createRecipe(params);
  return recipesAdapter.toRecipe(recipe, recipeItems);
}

export const recipesService = {
  getRecipesByUser,
  createRecipe,
};
