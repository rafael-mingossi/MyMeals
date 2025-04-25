import {Recipe} from '@domain';
import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {recipesService} from '../recipesService.ts';

export function useGetRecipesByUser(userId: string) {
  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery<Recipe[], Error>({
    queryKey: [QueryKeys.Recipes, 'user', userId],
    queryFn: () => recipesService.getRecipesByUser(),
  });

  return {
    recipes: recipes ?? [],
    isLoading,
    error,
  };
}
