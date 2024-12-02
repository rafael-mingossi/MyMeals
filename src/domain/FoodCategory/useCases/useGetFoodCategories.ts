import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {foodCategoryService} from '../foodCategoryService';
import {FoodCategory} from '../foodCategoryTypes';

export function useGetFoodCategories() {
  const {
    data: foodCategories,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<FoodCategory[], Error>({
    queryKey: [QueryKeys.FoodCategories],
    queryFn: () => foodCategoryService.getAll(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    foodCategories: foodCategories ?? [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
