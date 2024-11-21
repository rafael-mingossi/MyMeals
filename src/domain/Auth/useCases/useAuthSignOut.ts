import {MutationOptions} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {AuthCredentials} from '../authTypes.ts';

export function useAuthSignOut(options?: MutationOptions<AuthCredentials>) {
  const mutation = useMutation<string, Error, void>({
    mutationFn: authService.signOut,
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSettled: () => {
      //TODO: remove credentials and clear user from storage
      console.log('LOGGED OUT');
    },
  });

  return {
    isLoading: mutation.isPending,
    signOut: () => mutation.mutate(),
  };
}
