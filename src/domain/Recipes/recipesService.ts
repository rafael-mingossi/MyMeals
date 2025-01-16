import {Recipe, CreateRecipeParams, UpdateRecipeParams} from '@domain';

import {recipesAdapter} from './recipesAdapter';
import {recipesApi} from './recipesApi';

async function getRecipesByUser(userId: string): Promise<Recipe[]> {
  const {recipes, recipeItems} = await recipesApi.getRecipesByUser(userId);
  return recipes.map(recipe => {
    const recipeItemsList = recipeItems.filter(
      item => item.recipe_id === recipe.id,
    );
    return recipesAdapter.toRecipe(recipe, recipeItemsList);
  });
}

async function getRecipesById(recipeIds: number[]): Promise<Recipe[]> {
  const {recipes} = await recipesApi.getRecipesById(recipeIds);
  return recipes.map(recipe => {
    return recipesAdapter.toRecipe(recipe);
  });
}

async function createRecipe(params: CreateRecipeParams): Promise<Recipe> {
  const {recipe, recipeItems} = await recipesApi.createRecipe(params);
  return recipesAdapter.toRecipe(recipe, recipeItems);
}

async function updateRecipe(
  recipeId: number,
  params: UpdateRecipeParams,
): Promise<Recipe> {
  const {recipe, recipeItems} = await recipesApi.updateRecipe(recipeId, params);
  return recipesAdapter.toRecipe(recipe, recipeItems);
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
