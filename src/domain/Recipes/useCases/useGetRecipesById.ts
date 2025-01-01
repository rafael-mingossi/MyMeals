import {Recipe} from '@domain';
import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {recipesService} from '../recipesService.ts';

export function useGetRecipesById(recipeIds: number[]) {
  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery<Recipe[], Error>({
    queryKey: [QueryKeys.Recipes, {recipeIds}],
    queryFn: () => recipesService.getRecipesById(recipeIds),
    enabled: recipeIds.length > 0,
  });

  return {
    recipes: recipes ?? [],
    isLoading,
    error,
  };
}
