export enum QueryKeys {
  FoodCategories = 'FoodCategories',
  Foods = 'Foods',
  Recipes = 'Recipes',
}

export interface MutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (errorMessage: string) => void;
  errorMessage?: string;
}
