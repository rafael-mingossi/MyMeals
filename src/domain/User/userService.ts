import {UpdateUserParams, User} from '@domain';

import {userAdapter} from './userAdapter.ts';
import {userApi} from './userApi.ts';

async function getUserById(id: string): Promise<User> {
  const userAPI = await userApi?.getUserDetailsById(id.toString());
  return userAdapter.toUser(userAPI);
}

async function updateUser(userData: UpdateUserParams): Promise<User> {
  const updateUserApi = await userApi.updateUser(userData);

  return userAdapter.toUser(updateUserApi);
}

async function deleteUser(userId: string): Promise<string> {
  const deletedUser = await userApi.deleteUser(userId);
  return deletedUser;
}

export const userService = {
  getUserById,
  updateUser,
  deleteUser,
};
