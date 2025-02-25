import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {foodsService} from '../foodsService.ts';
import {Foods} from '../foodsTypes.ts';

export function useGetFoodsByUser(
  userId: string,
  showArchived: boolean = false,
) {
  const {
    data: foods,
    isLoading,
    error,
  } = useQuery<Foods[], Error>({
    queryKey: [QueryKeys.Foods, {userId, showArchived}],
    queryFn: () => foodsService.getFoodsByUser(userId, showArchived),
  });

  return {
    foods: foods ?? [],
    isLoading,
    error,
  };
}
