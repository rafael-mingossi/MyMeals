import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {userService} from '../userService';

export function useDeleteUser(options?: MutationOptions<string>) {
  const queryClient = useQueryClient();

  const {mutate: deleteUser, isPending} = useMutation<string, Error, string>({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.User],
      });
    },
    onError: error => {
      console.log(error);
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  return {
    deleteUser,
    isPending,
  };
}
