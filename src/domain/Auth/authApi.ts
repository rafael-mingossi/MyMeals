import {supabaseClient} from '@api';

import {SignInData, SignUpData} from './authTypes';

async function signIn({email, password}: SignInData) {
  const {data, error} = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function signUp({email, password}: SignUpData) {
  const {data, error} = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function signOut(): Promise<string> {
  const {error} = await supabaseClient.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return 'Logged out API';
}

export const authApi = {
  signIn,
  signUp,
  signOut,
};
