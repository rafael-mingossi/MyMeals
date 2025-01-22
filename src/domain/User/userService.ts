import {User} from '@domain';

import {userAdapter} from './userAdapter.ts';
import {userApi} from './userApi.ts';

async function getUserById(userId: string): Promise<User> {
  const userAPI = await userApi.getUserDetailsById(userId);
  return userAdapter.toUser(userAPI);
}

export const userService = {
  getUserById,
};
