import {QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {userService} from '../userService';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.User],
      });
    },
  });

  return {
    deleteUser,
    isPending,
    error,
  };
}
