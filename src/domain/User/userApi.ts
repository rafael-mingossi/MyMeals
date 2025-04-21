import {api} from '@api';

import {UserAPI, UpdateUserParams} from './userTypes';

export const USER_PATH = '/users';

async function getUserDetailsById(userId: string): Promise<UserAPI> {
  const response = await api.get<UserAPI>(`${USER_PATH}/${userId}`);
  return response.data;
}

async function updateUser(userData: UpdateUserParams): Promise<UserAPI> {
  const response = await api.put<UserAPI>(`${USER_PATH}/edit`, userData);
  return response.data;
}

async function deleteUser(userId: string): Promise<string> {
  const response = await api.delete<string>(`${USER_PATH}/${userId}`);
  return response.data;
}

export const userApi = {
  getUserDetailsById,
  updateUser,
  deleteUser,
};
