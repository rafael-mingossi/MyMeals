import {Meal} from '@domain';
import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {mealsService} from '../mealsService';

export function useGetMealsByUserAndDate(userId: string, date: string) {
  const {
    data: meals,
    isLoading,
    error,
  } = useQuery<Meal[], Error>({
    queryKey: [QueryKeys.Meals, userId, date],
    queryFn: () => mealsService.getMealsByUserAndDate(userId, date),
  });

  return {
    meals: meals ?? [],
    isLoading,
    error,
  };
}
