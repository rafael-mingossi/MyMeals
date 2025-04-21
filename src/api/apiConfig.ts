import 'react-native-url-polyfill/auto';
import {AuthCredentials, authService} from '@domain';
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@env';
import {supabaseStorage} from '@services';
import {createClient} from '@supabase/supabase-js';
import axios from 'axios';

type InterceptorProps = {
  authCredentials: AuthCredentials | null;
  saveCredentials: (ac: AuthCredentials) => Promise<void>;
  removeCredentials: () => Promise<void>;
};

export const BASE_URL = 'http://127.0.0.1:3333/api';
export const api = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization:
  //     'Bearer eyJhbGciOiJSUzI1NiJ9.eyJkYXRhIjp7InVzZXJJZCI6ImI0YjBhZDU1LTkzMjUtNDZiZi1iYTA1LTg5Y2Q1NGYxZTNmNyIsInVzZXIiOnsiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn19LCJpYXQiOjE3NDQwNjI4MjksImV4cCI6MTc0NDA2NDYyOX0.KNMBcge-_l0s4Vn1I6oL0GKVir9iaDTxv5rNPuGJ8lTPlk34u_y50lrss0MFMo3BqpdvpP__lNlWAKKOE8ssKd31YHwFKAM5oEWo8qfRvdzvAiC0p87T-LPCdutnF3MHQbmAJAnkdF0fsuJk08AZoqqRoDg1qncjq_I3JymTIFqwXfIC7fb6CEjlPbys7dcXkZfO9zwcQ99vHm5r6a4AYYAGnDcMfXnYrGVnsC7K5MxK8Vf5XQIwcKcE6pLY58iULomNHOUYPyhgQWecYccb4CEHtaF5xWxXctLG14vZZ-MZiW7M--9wn1oYdO6_I45U_ttwKMeABRBqMQGgM1hpRw',
  // },
});

export function registerInterceptor({
  authCredentials,
  removeCredentials,
  saveCredentials,
}: InterceptorProps) {
  const interceptor = api.interceptors.response.use(
    response => response,
    async responseError => {
      const failedRequest = responseError.config;
      const hasNotRefreshToken = !authCredentials?.refreshToken;
      const isRefreshTokenRequest =
        authService.isRefreshTokenRequest(failedRequest);
      if (responseError.response.status === 401) {
        if (hasNotRefreshToken || isRefreshTokenRequest || failedRequest.sent) {
          await removeCredentials();
          return Promise.reject(responseError);
        }

        failedRequest.sent = true;

        const newAuthCredentials = await authService.authenticateByRefreshToken(
          authCredentials?.refreshToken,
        );
        await saveCredentials(newAuthCredentials);

        failedRequest.headers.Authorization = `Bearer ${newAuthCredentials.token}`;

        return api(failedRequest);
      }

      return Promise.reject(responseError);
    },
  );

  return () => api.interceptors.response.eject(interceptor);
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables:', {
    SUPABASE_URL: !!SUPABASE_URL,
    SUPABASE_ANON_KEY: !!SUPABASE_ANON_KEY,
  });
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: supabaseStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Testing ENVs
// console.log('Supabase URL:', SUPABASE_URL?.slice(0, 10) + '...');

