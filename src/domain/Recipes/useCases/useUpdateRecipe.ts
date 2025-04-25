import {Recipe, UpdateRecipeAPI} from '@domain';
import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {recipesService} from '../recipesService';

export function useUpdateRecipe(options?: MutationOptions<Recipe>) {
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation<Recipe, Error, UpdateRecipeAPI>({
    mutationFn: payload => recipesService.updateRecipe(payload, payload.id),
    retry: false,
    onError: error => {
      console.log(error);
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: recipe => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Recipes, {userId: recipe.userId}],
      });
      if (options?.onSuccess) {
        options.onSuccess(recipe);
      }
    },
  });

  return {
    mutate,
    isPending,
  };
}
