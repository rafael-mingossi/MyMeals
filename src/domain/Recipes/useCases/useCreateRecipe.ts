import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {recipesService} from '../recipesService';
import {CreateRecipeParams, Recipe} from '../recipesTypes';

export function useCreateRecipe(options?: MutationOptions<Recipe>) {
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation<Recipe, unknown, CreateRecipeParams>({
    mutationFn: params => recipesService.createRecipe(params),
    retry: false,
    onError: error => {
      console.log(error);
      if (options?.onError) {
        //TODO: ERROR
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
