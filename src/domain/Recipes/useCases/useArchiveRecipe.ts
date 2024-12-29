import {Recipe} from '@domain';
import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {recipesService} from '../recipesService';

export function useArchiveRecipe(options?: MutationOptions<Recipe>) {
  const queryClient = useQueryClient();
  const {mutate: archiveRecipe, isPending} = useMutation({
    mutationFn: recipesService.archiveRecipe,
    onSuccess: recipe => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Recipes, {userId: recipe.userId}],
      });
      if (options?.onSuccess) {
        options.onSuccess(recipe);
      }
    },
    onError: error => {
      console.log(error);
      if (options?.onError) {
        //TODO: ERROR
      }
    },
  });

  return {
    archiveRecipe,
    isPending,
  };
}
