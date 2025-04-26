import {Recipe, CreateRecipeParams, UpdateRecipeAPI} from '@domain';

import {recipesAdapter} from './recipesAdapter';
import {recipesApi} from './recipesApi';

async function getRecipesByUser(): Promise<Recipe[]> {
  const recipes = await recipesApi.getRecipesByUser();
  return recipes.map(recipe => {
    return recipesAdapter.toRecipe(recipe, recipe.items);
  });
}

async function getRecipesById(recipeIds: {
  recipeIds: number[];
}): Promise<Recipe[]> {
  const recipesAPI = await recipesApi.getRecipesById(recipeIds);
  return recipesAPI.map(recipe => {
    return recipesAdapter.toRecipe(recipe);
  });
}

async function createRecipe(params: CreateRecipeParams): Promise<Recipe> {
  const recipe = await recipesApi.createRecipe(params);
  return recipesAdapter.toRecipe(recipe, recipe.items);
}

async function updateRecipe(
  params: UpdateRecipeAPI,
  recipeId: number,
): Promise<Recipe> {
  const recipe = await recipesApi.updateRecipe(params, recipeId);
  return recipesAdapter.toRecipe(recipe, recipe.items);
}

async function archiveRecipe(recipeId: number): Promise<Recipe> {
  const archiveRecipeAPI = await recipesApi.archiveRecipe(recipeId);
  return recipesAdapter.toRecipe(archiveRecipeAPI);
}

export const recipesService = {
  getRecipesByUser,
  createRecipe,
  updateRecipe,
  archiveRecipe,
  getRecipesById,
};
