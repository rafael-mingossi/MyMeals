import {UpdateUserParams, User} from '@domain';
import {MutationOptions, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {userService} from '../userService.ts';

export function useUpdateUser(options?: MutationOptions<User>) {
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation<User, Error, UpdateUserParams>({
    mutationFn: params => userService.updateUser(params),
    retry: false,
    onError: error => {
      console.log(error);
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: user => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.User, user.id],
      });
      if (options?.onSuccess) {
        options.onSuccess(user);
      }
    },
  });

  return {
    mutate,
    isPending,
  };
}
