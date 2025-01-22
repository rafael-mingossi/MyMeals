import {User} from '@domain';

import {userAdapter} from './userAdapter.ts';
import {userApi} from './userApi.ts';

async function getUserById(userId: string): Promise<User> {
  const userAPI = await userApi.getUserDetailsById(userId);
  return userAdapter.toUser(userAPI);
}

async function deleteUser(userId: string): Promise<void> {
  return userApi.deleteUserById(userId);
}

export const userService = {
  getUserById,
  deleteUser,
};
