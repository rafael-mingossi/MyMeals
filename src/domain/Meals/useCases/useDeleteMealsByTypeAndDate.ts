import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {mealsService} from '../mealsService';
import {MealsTypes} from '../mealsTypes';

interface DeleteMealsByTypeAndDateParams {
  userId: string;
  date: string;
  mealType: MealsTypes;
}

export function useDeleteMealsByTypeAndDate(options?: MutationOptions<void>) {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation<
    void,
    Error,
    DeleteMealsByTypeAndDateParams
  >({
    mutationFn: ({userId, date, mealType}) =>
      mealsService.deleteMealsByTypeAndDate(userId, date, mealType),
    retry: false,
    onError: error => {
      console.log(error);
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Meals, variables.userId, variables.date],
      });
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
  });

  return {
    mutate,
    isPending,
  };
}
