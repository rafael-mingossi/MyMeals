import {supabaseClient} from '@api';

import {RecipesAPI, RecipeItemsAPI, CreateRecipeParams} from './recipesTypes';

async function getRecipesByUser(userId: string): Promise<{
  recipes: RecipesAPI[];
  recipeItems: RecipeItemsAPI[];
}> {
  const recipesPromise = supabaseClient
    .from('recipes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', {ascending: false});

  const recipeItemsPromise = supabaseClient
    .from('recipe_items')
    .select('*')
    .eq('recipe_id', recipesPromise);

  const [recipesResult, recipeItemsResult] = await Promise.all([
    recipesPromise,
    recipeItemsPromise,
  ]);

  if (recipesResult.error) {
    throw new Error(`Failed to fetch recipes: ${recipesResult.error.message}`);
  }

  if (recipeItemsResult.error) {
    throw new Error(
      `Failed to fetch recipe items: ${recipeItemsResult.error.message}`,
    );
  }

  return {
    recipes: recipesResult.data || [],
    recipeItems: recipeItemsResult.data || [],
  };
}

async function createRecipe(recipeData: CreateRecipeParams): Promise<{
  recipe: RecipesAPI;
  recipeItems: RecipeItemsAPI[];
}> {
  const {items, ...recipeParams} = recipeData;

  // Start a Supabase transaction
  const {data: recipe, error: recipeError} = await supabaseClient
    .from('recipes')
    .insert(recipeParams)
    .select('*')
    .single();

  if (recipeError || !recipe) {
    throw new Error(`Failed to create recipe: ${recipeError?.message}`);
  }

  const recipeItemsWithId = items.map(item => ({
    ...item,
    recipe_id: recipe.id,
  }));

  const {data: recipeItems, error: itemsError} = await supabaseClient
    .from('recipe_items')
    .insert(recipeItemsWithId)
    .select('*');

  if (itemsError || !recipeItems) {
    throw new Error(`Failed to create recipe items: ${itemsError?.message}`);
  }

  return {recipe, recipeItems};
}

export const recipesApi = {
  getRecipesByUser,
  createRecipe,
};
