import {AuthCredentials} from '@domain';

import {storage} from '../storage';

const AUTH_KEY = '@Auth';

async function set(ac: AuthCredentials): Promise<void> {
  await storage.setItem(AUTH_KEY, ac);
}

async function get(): Promise<AuthCredentials | null> {
  return await storage.getItem<AuthCredentials>(AUTH_KEY);
}

async function remove(): Promise<void> {
  await storage.removeItem(AUTH_KEY);
}

export const authCredentialsStorage = {set, get, remove};
