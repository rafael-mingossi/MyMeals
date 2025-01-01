import {Favorites, ToggleFavoriteParams} from '@domain';
import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {favouritesService} from '../favouritesService';

export function useToggleFavourite(options?: MutationOptions<Favorites>) {
  const queryClient = useQueryClient();

  const {mutate: toggleFavourite, isPending} = useMutation<
    Favorites,
    unknown,
    ToggleFavoriteParams
  >({
    mutationFn: params => favouritesService.toggleFavorite(params),
    onSuccess: favourite => {
      if (favourite.foodId) {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.FavouriteFoods, favourite.userId],
        });
        if (options?.onSuccess) {
          options.onSuccess(favourite);
        }
      }
      if (favourite.recipeId) {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.FavouriteRecipes, favourite.userId],
        });
        if (options?.onSuccess) {
          options.onSuccess(favourite);
        }
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
    toggleFavourite,
    isPending,
  };
}
