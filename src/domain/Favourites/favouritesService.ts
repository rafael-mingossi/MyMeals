import {favouritesAdapter} from './favouritesAdapter';
import {favouritesApi} from './favouritesApi';
import {ToggleFavoriteParams, Favorites} from './favouritesTypes';

async function getFavoritesByUser(userId: string): Promise<Favorites[]> {
  const favoritesAPI = await favouritesApi.getFavoritesByUser(userId);
  return favouritesAdapter.toFavoritesList(favoritesAPI);
}

async function toggleFavorite(
  params: ToggleFavoriteParams,
): Promise<Favorites> {
  const favoriteAPI = await favouritesApi.toggleFavorite(params);
  return favouritesAdapter.toFavorite(favoriteAPI);
}

async function getFavoriteFoodIds(userId: string): Promise<number[]> {
  return favouritesApi.getFavoriteFoodIds(userId);
}

async function getFavoriteRecipeIds(userId: string): Promise<number[]> {
  return favouritesApi.getFavoriteRecipeIds(userId);
}

export const favouritesService = {
  getFavoritesByUser,
  toggleFavorite,
  getFavoriteFoodIds,
  getFavoriteRecipeIds,
};
