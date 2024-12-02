export enum QueryKeys {
  FoodCategories = 'FoodCategories',
}

export interface MutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (errorMessage: string) => void;
  errorMessage?: string;
}
