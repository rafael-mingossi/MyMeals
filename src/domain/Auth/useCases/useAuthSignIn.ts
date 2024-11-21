import {MutationOptions} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {AuthCredentials, SignInData} from '../authTypes';

export function useAuthSignIn(options?: MutationOptions<AuthCredentials>) {
  const mutation = useMutation<AuthCredentials, Error, SignInData>({
    mutationFn: data => authService.signIn(data),
    onSuccess: data => {
      if (options?.onSuccess) {
        options.onSuccess(data);
        console.log('SUCCESS LOGIN');
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  return {
    isLoading: mutation.isPending,
    signIn: (data: SignInData) => mutation.mutate(data),
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}
