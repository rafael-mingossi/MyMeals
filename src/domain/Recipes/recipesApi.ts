import {supabaseClient} from '@api';

import {RecipesAPI, RecipeItemsAPI, CreateRecipeParams} from './recipesTypes';

async function getRecipesByUser(userId: string): Promise<{
  recipes: RecipesAPI[];
  recipeItems: RecipeItemsAPI[];
}> {
  // First, fetch recipes
  const {data: recipes, error: recipesError} = await supabaseClient
    .from('recipes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', {ascending: false});

  if (recipesError) {
    throw new Error(`Failed to fetch recipes: ${recipesError.message}`);
  }

  if (!recipes || recipes.length === 0) {
    return {recipes: [], recipeItems: []};
  }

  // Then, fetch recipe items using the recipe IDs
  const recipeIds = recipes.map(recipe => recipe.id);
  const {data: recipeItems, error: itemsError} = await supabaseClient
    .from('recipe_items')
    .select('*')
    .in('recipe_id', recipeIds);

  if (itemsError) {
    throw new Error(`Failed to fetch recipe items: ${itemsError.message}`);
  }

  return {
    recipes: recipes,
    recipeItems: recipeItems || [],
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
