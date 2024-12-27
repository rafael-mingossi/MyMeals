import {QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {foodsService} from '../foodsService';

export function useArchiveFood({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
} = {}) {
  const queryClient = useQueryClient();

  const {mutate: archiveFood} = useMutation({
    mutationFn: foodsService.archiveFood,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QueryKeys.Foods]});
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  return {archiveFood};
}
