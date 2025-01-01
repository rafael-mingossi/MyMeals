export interface FavoritesAPI {
  id: number;
  created_at: string;
  user_id: string;
  food_id: number | null;
  recipe_id: number | null;
}

export interface Favorites {
  id: number;
  createdAt: string;
  userId: string;
  foodId: number | null;
  recipeId: number | null;
}

export interface ToggleFavoriteParams {
  userId: string;
  foodId?: number;
  recipeId?: number;
}
