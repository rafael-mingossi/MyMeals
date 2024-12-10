import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import {AuthCredentials} from '@domain';
import {AuthCredentialsService} from '@services';

// import {authService} from '../../../domain/Auth/authService';
import {authCredentialsStorage} from '../authCredentialsStorage.ts';

export const AuthCredentialsContext = createContext<AuthCredentialsService>({
  authCredentials: null,
  isLoading: false,
  userId: null,
  saveCredentials: async () => {},
  removeCredentials: async () => {},
  // updateUser: () => {},
});

export function AuthCredentialsProvider({children}: PropsWithChildren<{}>) {
  const [isLoading, setIsLoading] = useState(true);
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentials | null>(null);

  useEffect(() => {
    startAuthCredentials();
  }, []);

  // useEffect(() => {
  //   const interceptor = registerInterceptor({
  //     authCredentials,
  //     removeCredentials,
  //     saveCredentials,
  //   });
  //
  //   // remove listener when component unmount
  //   return interceptor;
  // }, [authCredentials]);

  async function startAuthCredentials() {
    try {
      // await new Promise(resolve => setTimeout(resolve, 2000, ''));
      const ac = await authCredentialsStorage.get();
      if (ac) {
        // authService.updateToken(ac.token);
        setAuthCredentials(ac);
      }
    } catch (e) {
      console.log('ERROR STARTING CREDENTIALS TOKEN, =>', e);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveCredentials(ac: AuthCredentials): Promise<void> {
    // authService.updateToken(ac.token);
    await authCredentialsStorage.set(ac);
    setAuthCredentials(ac);
  }

  // function updateUser(user: User) {
  //   if (authCredentials) {
  //     saveCredentials({...authCredentials, user});
  //   }
  // }

  async function removeCredentials() {
    // authService.removeToken();
    await authCredentialsStorage.remove();
    setAuthCredentials(null);
  }

  const userId = authCredentials?.user.id || null;

  return (
    <AuthCredentialsContext.Provider
      value={{
        authCredentials,
        isLoading,
        saveCredentials,
        removeCredentials,
        // updateUser,
        userId,
      }}>
      {children}
    </AuthCredentialsContext.Provider>
  );
}
