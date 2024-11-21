import {MutationOptions} from '@infra';
import {useAuthCredentials} from '@services';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {AuthCredentials, SignInData} from '../authTypes';

export function useAuthSignIn(options?: MutationOptions<AuthCredentials>) {
  const {saveCredentials} = useAuthCredentials();
  const mutation = useMutation<AuthCredentials, Error, SignInData>({
    mutationFn: data => authService.signIn(data),
    onSuccess: authCredentials => {
      if (options?.onSuccess) {
        options.onSuccess(authCredentials);
        console.log('authCredentials =>>>', authCredentials);
        saveCredentials(authCredentials);
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
