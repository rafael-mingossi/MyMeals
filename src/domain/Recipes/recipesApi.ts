import {api, supabaseClient} from '@api';

import {RecipesAPI, CreateRecipeParams, UpdateRecipeAPI} from './recipesTypes';

export const RECIPES_PATH = '/recipes';

async function getRecipesByUser(): Promise<RecipesAPI[]> {
  const response = await api.get<RecipesAPI[]>(RECIPES_PATH);

  return response.data;
}

async function getRecipesById(
  recipeIds: number[],
): Promise<{recipes: RecipesAPI[]}> {
  const {data, error} = await supabaseClient
    .from('recipes')
    .select('*')
    .in('id', recipeIds);

  if (error) {
    throw new Error(`Failed to fetch recipes: ${error.message}`);
  }

  return {
    recipes: data || [],
  };
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
  const response = await api.put(`${RECIPES_PATH}/${recipeId}`, recipeData);

  return response.data;
}

async function archiveRecipe(recipeId: number): Promise<RecipesAPI> {
  const {data, error} = await supabaseClient
    .from('recipes')
    .update({is_archived: true})
    .eq('id', recipeId)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to archive recipe: ${error.message}`);
  }

  return data;
}

export const recipesApi = {
  getRecipesByUser,
  createRecipe,
  updateRecipe,
  archiveRecipe,
  getRecipesById,
};
