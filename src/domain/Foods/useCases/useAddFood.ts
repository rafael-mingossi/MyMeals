import {AddFoodParams, Foods} from '@domain';
import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {foodsService} from '../foodsService.ts';

export function useAddFood(options?: MutationOptions<Foods>) {
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation<Foods, unknown, AddFoodParams>({
    mutationFn: params => foodsService.addFood(params),
    retry: false,
    onError: error => {
      console.log(error);
      if (options?.onError) {
        //TODO: ERROR
      }
    },
    onSuccess: food => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Foods, food.userId],
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
