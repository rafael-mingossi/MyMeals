export enum QueryKeys {
  FoodCategories = 'FoodCategories',
  Foods = 'Foods',
}

export interface MutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (errorMessage: string) => void;
  errorMessage?: string;
}
