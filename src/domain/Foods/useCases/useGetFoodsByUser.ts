import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {foodsService} from '../foodsService.ts';
import {Foods} from '../foodsTypes.ts';

export function useGetFoodsByUser(userId: string) {
  const {
    data: foods,
    isLoading,
    error,
  } = useQuery<Foods[], Error>({
    queryKey: [QueryKeys.Foods, {userId: userId}],
    queryFn: () => foodsService.getFoodsByUser(userId),
  });

  return {
    foods: foods ?? [],
    isLoading,
    error,
  };
}
