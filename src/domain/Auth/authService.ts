import {authApi} from './authApi';
import {SignInData, SignUpData, AuthCredentials} from './authTypes';

async function signIn(signInData: SignInData): Promise<AuthCredentials> {
  try {
    const response = await authApi.signIn(signInData);
    return {
      session: response.session,
      user: response.user,
    };
  } catch (error) {
    throw new Error('Invalid email or password');
  }
}

async function signUp(signUpData: SignUpData): Promise<void> {
  await authApi.signUp(signUpData);
}

async function signOut(): Promise<string> {
  return await authApi.signOut();
}

export const authService = {
  signIn,
  signUp,
  signOut,
};
