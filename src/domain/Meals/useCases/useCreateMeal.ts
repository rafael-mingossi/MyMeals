import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {mealsService} from '../mealsService';
import {CreateMealParams, Meal} from '../mealsTypes';

export function useCreateMeal(options?: MutationOptions<Meal>) {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation<Meal, unknown, CreateMealParams>({
    mutationFn: params => mealsService.createMeal(params),
    retry: false,
    onError: error => {
      console.log(error);
      if (options?.onError) {
        // TODO: Handle error
      }
    },
    onSuccess: meal => {
      // Invalidate the query for the specific date when the meal was added
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Meals, meal.userId, meal.dateAdded],
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
