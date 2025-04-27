import {api} from '@api';

import {RecipesAPI, CreateRecipeParams, UpdateRecipeAPI} from './recipesTypes';

export const RECIPES_PATH = '/recipes';

async function getRecipesByUser(): Promise<RecipesAPI[]> {
  const response = await api.get<RecipesAPI[]>(RECIPES_PATH);

  return response.data;
}

async function getRecipesById(recipeIds: {
  recipeIds: number[];
}): Promise<RecipesAPI[]> {
  const response = await api.post<RecipesAPI[]>(
    `${RECIPES_PATH}/byIds`,
    recipeIds,
  );
  return response.data;
}

async function createRecipe(
  recipeData: CreateRecipeParams,
): Promise<RecipesAPI> {
  const response = await api.post<RecipesAPI>(RECIPES_PATH, recipeData);

  return response.data;
}

async function updateRecipe(
  recipeData: UpdateRecipeAPI,
  recipeId: number,
): Promise<RecipesAPI> {
  const response = await api.put<RecipesAPI>(
    `${RECIPES_PATH}/${recipeId}`,
    recipeData,
  );

  return response.data;
}

async function archiveRecipe(recipeId: number): Promise<RecipesAPI> {
  const response = await api.put<{message: string; recipe: RecipesAPI}>(
    `${RECIPES_PATH}/${recipeId}/archive`,
  );
  return response.data.recipe;
}

export const recipesApi = {
  getRecipesByUser,
  createRecipe,
  updateRecipe,
  archiveRecipe,
  getRecipesById,
};
