import {QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {recipesService} from '../recipesService';

export function useArchiveRecipe({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
} = {}) {
  const queryClient = useQueryClient();
  const {mutate: archiveRecipe, isPending} = useMutation({
    mutationFn: recipesService.archiveRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Recipes],
      });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  return {
    archiveRecipe,
    isPending,
  };
}
