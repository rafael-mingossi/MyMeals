import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {mealsService} from '../mealsService';

interface DeleteMealItemResult {
  userId: string;
  dateAdded: string;
}

export function useDeleteMealItem(
  options?: MutationOptions<DeleteMealItemResult>,
) {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation<DeleteMealItemResult, Error, number>({
    mutationFn: mealItemId => mealsService.deleteMealItem(mealItemId),
    retry: false,
    onError: error => {
      console.log({error});
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: result => {
      console.log('Query invalidation:', {
        queryKey: [QueryKeys.Meals, result.userId, result.dateAdded],
        dateFormat: result.dateAdded, // Should match your dateSelected.dateString format
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Meals, result.userId, result.dateAdded],
      });
      if (options?.onSuccess) {
        options.onSuccess(result);
      }
    },
  });

  return {
    mutate,
    isPending,
  };
}
