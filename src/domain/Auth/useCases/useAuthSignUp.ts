import {MutationOptions} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {AuthCredentials, SignUpData} from '../authTypes';

export function useAuthSignUp(options?: MutationOptions<AuthCredentials>) {
  const mutation = useMutation<void, Error, SignUpData>({
    mutationFn: data => authService.signUp(data),
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess({} as AuthCredentials); // We pass empty credentials since SignUp returns void
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
        console.log('ERROR SIGN UP USE CASE =>', error);
      }
    },
  });

  return {
    isLoading: mutation.isPending,
    signUp: (data: SignUpData) => mutation.mutate(data),
  };
}
