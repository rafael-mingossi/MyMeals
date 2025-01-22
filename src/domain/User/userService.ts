import {UpdateUserParams, User} from '@domain';

import {userAdapter} from './userAdapter.ts';
import {userApi} from './userApi.ts';

async function getUserById(userId: string): Promise<User> {
  const userAPI = await userApi.getUserDetailsById(userId);
  return userAdapter.toUser(userAPI);
}

async function updateUser(params: UpdateUserParams): Promise<User> {
  const updateUserAPI = await userApi.updateUser(params);
  return userAdapter.toUser(updateUserAPI);
}

async function deleteUser(userId: string): Promise<void> {
  return userApi.deleteUserById(userId);
}

export const userService = {
  getUserById,
  updateUser,
  deleteUser,
};
