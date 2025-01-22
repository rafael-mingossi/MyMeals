import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {foodsService} from '../foodsService';
import {Foods} from '../foodsTypes.ts';

export function useArchiveFood(options?: MutationOptions<Foods>) {
  const queryClient = useQueryClient();

  const {mutate: archiveFood, isPending} = useMutation<Foods, Error, number>({
    mutationFn: foodId => foodsService.archiveFood(foodId),
    onSuccess: food => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Foods, {userId: food.userId, showArchived: false}],
      });
      if (options?.onSuccess) {
        options.onSuccess(food);
      }
    },
    onError: error => {
      console.log(error);
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  return {archiveFood, isPending};
}
