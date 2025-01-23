import {User} from '@domain';
import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {userService} from '../userService.ts';

export function useGetUserById(userId: string) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User, Error>({
    queryKey: [QueryKeys.User, userId],
    queryFn: () => userService.getUserById(userId),
  });

  return {
    user,
    isLoading,
    error,
  };
}
