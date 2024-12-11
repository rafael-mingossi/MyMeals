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
    queryKey: [QueryKeys.Recipes, {userId: userId}],
    queryFn: () => recipesService.getRecipesByUser(userId),
  });

  return {
    recipes: recipes ?? [],
    isLoading,
    error,
  };
}
