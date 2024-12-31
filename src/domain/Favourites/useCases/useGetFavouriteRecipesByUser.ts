import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {favouritesService} from '../favouritesService';

export function useGetFavouriteRecipesByUser(userId: string) {
  const {
    data: favouriteRecipeIds,
    isLoading,
    error,
  } = useQuery<number[], Error>({
    queryKey: [QueryKeys.FavouriteRecipes, userId],
    queryFn: () => favouritesService.getFavoriteRecipeIds(userId),
    enabled: !!userId, //prevent unnecessary api calls
  });

  return {
    favouriteRecipeIds: favouriteRecipeIds || [],
    isLoading,
    error,
  };
}
