import {Favorites, FavoritesAPI} from './favouritesTypes';

function toFavorite(favoriteAPI: FavoritesAPI): Favorites {
  return {
    id: favoriteAPI.id,
    createdAt: favoriteAPI.created_at,
    userId: favoriteAPI.user_id,
    foodId: favoriteAPI.food_id,
    recipeId: favoriteAPI.recipe_id,
  };
}

function toFavoritesList(favoritesAPI: FavoritesAPI[]): Favorites[] {
  return favoritesAPI.map(toFavorite);
}

export const favouritesAdapter = {
  toFavoritesList,
  toFavorite,
};
