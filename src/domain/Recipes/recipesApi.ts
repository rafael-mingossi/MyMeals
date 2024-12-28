import {supabaseClient} from '@api';

import {
  RecipesAPI,
  RecipeItemsAPI,
  CreateRecipeParams,
  UpdateRecipeParams,
} from './recipesTypes';

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

async function updateRecipe(
  recipeId: number,
  recipeData: UpdateRecipeParams,
): Promise<{
  recipe: RecipesAPI;
  recipeItems: RecipeItemsAPI[];
}> {
  // Update recipe
  const {data: recipe, error: recipeError} = await supabaseClient
    .from('recipes')
    .update({
      name: recipeData.name,
      t_calories: recipeData.t_calories,
      t_carbs: recipeData.t_carbs,
      t_fat: recipeData.t_fat,
      t_protein: recipeData.t_protein,
      t_fibre: recipeData.t_fibre,
      t_sodium: recipeData.t_sodium,
      serving: recipeData.serving,
      serv_unit: recipeData.serv_unit,
      img: recipeData.img,
    })
    .eq('id', recipeId)
    .select('*')
    .single();

  if (recipeError || !recipe) {
    throw new Error(`Failed to update recipe: ${recipeError?.message}`);
  }

  // Delete existing recipe items
  const {error: deleteError} = await supabaseClient
    .from('recipe_items')
    .delete()
    .eq('recipe_id', recipeId);

  if (deleteError) {
    throw new Error(`Failed to delete recipe items: ${deleteError.message}`);
  }

  // Insert new recipe items
  const recipeItemsData = recipeData.items?.map(item => ({
    ...item,
    recipe_id: recipeId,
  }));

  if (!recipeItemsData || recipeItemsData.length === 0) {
    return {recipe, recipeItems: []};
  }

  const {data: recipeItems, error: itemsError} = await supabaseClient
    .from('recipe_items')
    .insert(recipeItemsData)
    .select('*');

  if (itemsError || !recipeItems) {
    throw new Error(`Failed to create recipe items: ${itemsError?.message}`);
  }

  return {recipe, recipeItems};
}

export const recipesApi = {
  getRecipesByUser,
  createRecipe,
  updateRecipe, // Add the new method
};
