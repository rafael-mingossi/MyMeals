export enum QueryKeys {
  FoodCategories = 'FoodCategories',
  Foods = 'Foods',
  Recipes = 'Recipes',
  Meals = 'Meals',
  FavouriteFoods = 'FavouriteFoods',
  FavouriteRecipes = 'FavouriteRecipes',
  User = 'User',
}

export interface MutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (errorMessage: string) => void;
  errorMessage?: string;
}
