import {AddFoodParams, Foods} from '@domain';
import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {foodsService} from '../foodsService.ts';

export function useAddFood(options?: MutationOptions<Foods>) {
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation<Foods, Error, AddFoodParams>({
    mutationFn: params => foodsService.addFood(params),
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
