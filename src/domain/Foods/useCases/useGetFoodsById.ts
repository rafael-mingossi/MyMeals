import {Foods} from '@domain';
import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {foodsService} from '../foodsService.ts';

export function useGetFoodsByIds(foodIds: number[]) {
  const {
    data: foods,
    isLoading,
    error,
  } = useQuery<Foods[], Error>({
    queryKey: [QueryKeys.Foods, {foodIds}],
    queryFn: () => foodsService.getFoodsByIds(foodIds),
    enabled: foodIds.length > 0,
  });

  return {
    foods: foods ?? [],
    isLoading,
    error,
  };
}
