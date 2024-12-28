import {recipesAdapter} from './recipesAdapter';
import {recipesApi} from './recipesApi';
import {Recipe, CreateRecipeParams, UpdateRecipeParams} from './RecipesTypes';

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

// recipesService.ts
async function updateRecipe(
  recipeId: number,
  params: UpdateRecipeParams,
): Promise<Recipe> {
  const {recipe, recipeItems} = await recipesApi.updateRecipe(recipeId, params);
  return recipesAdapter.toRecipe(recipe, recipeItems);
}

export const recipesService = {
  getRecipesByUser,
  createRecipe,
  updateRecipe, // Add the new method
};
