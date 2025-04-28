import {Meal} from '@domain';
import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {mealsService} from '../mealsService';

export function useGetMealsByUserAndDate(date: string) {
  const {
    data: meals,
    isLoading,
    error,
  } = useQuery<Meal[], Error>({
    queryKey: [QueryKeys.Meals, 'user', date],
    queryFn: () => mealsService.getMealsByUserAndDate(date),
  });

  return {
    meals: meals ?? [],
    isLoading,
    error,
  };
}
