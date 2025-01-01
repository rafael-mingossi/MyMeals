import {supabaseClient} from '@api';

import {ToggleFavoriteParams, FavoritesAPI} from './favouritesTypes';

async function getFavoritesByUser(userId: string): Promise<FavoritesAPI[]> {
  const {data, error} = await supabaseClient
    .from('user_favorites')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Failed to fetch favorites: ${error.message}`);
  }

  return data || [];
}

async function toggleFavorite(
  params: ToggleFavoriteParams,
): Promise<FavoritesAPI> {
  const {userId, foodId, recipeId} = params;

  if (!foodId && !recipeId) {
    throw new Error('Either foodId or recipeId must be provided');
  }

  const query = supabaseClient
    .from('user_favorites')
    .select('*')
    .eq('user_id', userId);

  if (foodId) {
    query.eq('food_id', foodId);
  } else if (recipeId) {
    query.eq('recipe_id', recipeId);
  }

  const {data: existingFavorite} = await query.single();

  if (existingFavorite) {
    const {data, error: deleteError} = await supabaseClient
      .from('user_favorites')
      .delete()
      .eq('id', existingFavorite.id)
      .select('*')
      .single();

    if (deleteError) {
      throw new Error(`Failed to remove favorite: ${deleteError.message}`);
    }

    if (!data) {
      throw new Error('Failed to remove favorite: No data returned');
    }

    return data;
  } else {
    const {data, error: insertError} = await supabaseClient
      .from('user_favorites')
      .insert({
        user_id: userId,
        food_id: foodId || null,
        recipe_id: recipeId || null,
      })
      .select('*')
      .single();

    if (insertError) {
      throw new Error(`Failed to add favorite: ${insertError.message}`);
    }

    if (!data) {
      throw new Error('Failed to add favorite: No data returned');
    }

    return data;
  }
}

async function getFavoriteFoodIds(userId: string): Promise<number[]> {
  const {data, error} = await supabaseClient
    .from('user_favorites')
    .select('food_id')
    .eq('user_id', userId)
    .not('food_id', 'is', null);

  if (error) {
    throw new Error(`Failed to fetch favorite food ids: ${error.message}`);
  }

  return (data || []).map(item => item.food_id!);
}

async function getFavoriteRecipeIds(userId: string): Promise<number[]> {
  const {data, error} = await supabaseClient
    .from('user_favorites')
    .select('recipe_id')
    .eq('user_id', userId)
    .not('recipe_id', 'is', null);

  if (error) {
    throw new Error(`Failed to fetch favorite recipe ids: ${error.message}`);
  }

  return (data || []).map(item => item.recipe_id!);
}

export const favouritesApi = {
  getFavoritesByUser,
  toggleFavorite,
  getFavoriteFoodIds,
  getFavoriteRecipeIds,
};
