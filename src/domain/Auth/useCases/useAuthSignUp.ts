import {MutationOptions} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {AuthCredentials, SignUpData} from '../authTypes';

export function useAuthSignUp(options?: MutationOptions<AuthCredentials>) {
  const mutation = useMutation<void, Error, SignUpData>({
    mutationFn: data => authService.signUp(data),
    retry: false,
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess({} as AuthCredentials);
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
        console.log('ERROR SIGN UP USE CASE =>', error);
      }
    },
  });

  function signUp(signUpData: SignUpData) {
    mutation.mutate(signUpData);
  }

  return {
    isLoading: mutation.isPending,
    signUp,
  };
}
