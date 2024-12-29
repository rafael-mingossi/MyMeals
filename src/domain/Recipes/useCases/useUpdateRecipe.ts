import {Recipe, UpdateRecipePayload} from '@domain';
import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {recipesService} from '../recipesService';

export function useUpdateRecipe(options?: MutationOptions<Recipe>) {
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation<Recipe, Error, UpdateRecipePayload>({
    mutationFn: payload =>
      recipesService.updateRecipe(payload.id, {
        name: payload.name,
        t_calories: payload.t_calories,
        t_carbs: payload.t_carbs,
        t_fat: payload.t_fat,
        t_protein: payload.t_protein,
        t_fibre: payload.t_fibre,
        t_sodium: payload.t_sodium,
        serving: payload.serving,
        serv_unit: payload.serv_unit,
        img: payload.img,
        items: payload.items,
      }),
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
