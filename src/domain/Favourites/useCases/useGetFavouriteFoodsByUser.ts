import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {favouritesService} from '../favouritesService.ts';

export function useGetFavouriteFoodsByUser(userId: string) {
  const {
    data: favouriteFoods,
    isLoading,
    error,
  } = useQuery<number[], Error>({
    queryKey: [QueryKeys.FavouriteFoods, userId],
    queryFn: () => favouritesService.getFavoriteFoodIds(userId),
    enabled: !!userId, //prevent unnecessary api calls
  });

  return {
    favouriteFoods: favouriteFoods || [],
    isLoading,
    error,
  };
}
