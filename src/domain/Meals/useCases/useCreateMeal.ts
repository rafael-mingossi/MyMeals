import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {mealsService} from '../mealsService';
import {CreateMeal, Meal} from '../mealsTypes';

export function useCreateMeal(options?: MutationOptions<Meal>) {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation<Meal, Error, CreateMeal>({
    mutationFn: params => mealsService.createMeal(params),
    retry: false,
    onError: error => {
      console.log(error);
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: meal => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Meals, 'user', meal.dateAdded],
      });
      if (options?.onSuccess) {
        options.onSuccess(meal);
      }
    },
  });

  return {
    mutate,
    isPending,
  };
}
