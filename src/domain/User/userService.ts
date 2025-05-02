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
  return await userApi.deleteUser(userId);
}

async function addNotificationToken(token: string): Promise<string> {
  return userApi.addNotificationToken(token);
}

async function deleteNotificationToken(): Promise<string> {
  return userApi.deleteNotificationToken();
}

export const userService = {
  getUserById,
  updateUser,
  deleteUser,
  addNotificationToken,
  deleteNotificationToken,
};
