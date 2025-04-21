import {Foods, UpdateFoodParams} from '@domain';
import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {foodsService} from '../foodsService.ts';

export function useUpdateFood(options?: MutationOptions<Foods>) {
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation<Foods, Error, UpdateFoodParams>({
    mutationFn: params => foodsService.updateFood(params, params.id),
    retry: false,
    onError: error => {
      console.log(error);
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: food => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Foods, 'user', food.userId],
      });
      if (options?.onSuccess) {
        options.onSuccess(food);
      }
    },
  });

  return {
    mutate,
    isPending,
  };
}
