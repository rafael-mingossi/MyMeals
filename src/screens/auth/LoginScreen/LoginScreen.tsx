import React from 'react';

import {useAuthSignIn} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {
  AuthScreensHeader,
  Box,
  Button,
  FormPasswordInput,
  FormTextInput,
  Icon,
  Screen,
} from '@components';
import {AuthScreenProps} from '@routes';

import {loginSchema, LoginSchema} from './loginSchema.ts';

export function LoginScreen({}: AuthScreenProps<'LoginScreen'>) {
  const {control, formState, handleSubmit} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const {isLoading, signIn} = useAuthSignIn({
    onError: () => console.log('ERROR LOGIN SIGN IN SCREEN'),
    onSuccess: () => console.log('DONE IN SIGN IN'),
  });

  // const authCredentialsRES = {
  //   session: {
  //     access_token:
  //       'eyJhbGciOiJIUzI1NiIsImtpZCI6InEyNmpqK2RXKzVoM0d6TGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2x6dmtubWd3bnhsb2p0cGZwcmlkLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkNDdhOTY0Zi04ZGMzLTQ0NzctYWQxMC1mNmJiZTFmZjIxYjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzMyMTg4NDM3LCJpYXQiOjE3MzIxODQ4MzcsImVtYWlsIjoicmFmYWVsbWluZ29zc2lAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6InJhZmFlbG1pbmdvc3NpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiJkNDdhOTY0Zi04ZGMzLTQ0NzctYWQxMC1mNmJiZTFmZjIxYjYifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTczMjE4NDgzN31dLCJzZXNzaW9uX2lkIjoiMjIwNDhjNjAtNDJiYS00Y2ZiLWIzOTktN2YxODQzNDhkOGMzIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.wTGoIaZY7ubMkYz3kiR2HEvKECHjMxXch12BO7VWvMs',
  //     expires_at: 1732188437,
  //     expires_in: 3600,
  //     refresh_token: 'MtDZTm9oTuI3MWfFRNFPNg',
  //     token_type: 'bearer',
  //     user: {
  //       app_metadata: [Object],
  //       aud: 'authenticated',
  //       confirmation_sent_at: '2024-04-20T23:24:34.850801Z',
  //       confirmed_at: '2024-04-20T23:25:02.301107Z',
  //       created_at: '2024-04-20T23:24:34.84205Z',
  //       email: 'rafaelmingossi@gmail.com',
  //       email_confirmed_at: '2024-04-20T23:25:02.301107Z',
  //       id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //       identities: [Array],
  //       is_anonymous: false,
  //       last_sign_in_at: '2024-11-21T10:27:17.929985717Z',
  //       phone: '',
  //       role: 'authenticated',
  //       updated_at: '2024-11-21T10:27:17.967472Z',
  //       user_metadata: [Object],
  //     },
  //   },
  //   user: {
  //     app_metadata: {provider: 'email', providers: [Array]},
  //     aud: 'authenticated',
  //     confirmation_sent_at: '2024-04-20T23:24:34.850801Z',
  //     confirmed_at: '2024-04-20T23:25:02.301107Z',
  //     created_at: '2024-04-20T23:24:34.84205Z',
  //     email: 'rafaelmingossi@gmail.com',
  //     email_confirmed_at: '2024-04-20T23:25:02.301107Z',
  //     id: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //     identities: [[Object]],
  //     is_anonymous: false,
  //     last_sign_in_at: '2024-11-21T10:27:17.929985717Z',
  //     phone: '',
  //     role: 'authenticated',
  //     updated_at: '2024-11-21T10:27:17.967472Z',
  //     user_metadata: {
  //       email: 'rafaelmingossi@gmail.com',
  //       email_verified: false,
  //       phone_verified: false,
  //       sub: 'd47a964f-8dc3-4477-ad10-f6bbe1ff21b6',
  //     },
  //   },
  // };

  function submitForm({email, password}: LoginSchema) {
    signIn({email, password});
  }

  return (
    <Screen canGoBack title={' '} screenScrollType={'scrollViewAuth'}>
      <Box justifyContent="flex-start" mt="s32" flex={1}>
        <AuthScreensHeader title={'Sign in'} />
        <FormTextInput
          isUnderlinedVersion
          placeholder="E-mail"
          boxProps={{marginBottom: 's20'}}
          name="email"
          control={control}
          LeftComponent={<Icon color="grayPrimary" name="envelope" />}
        />
        <FormPasswordInput
          isUnderlinedVersion
          control={control}
          name="password"
          placeholder="Password"
          boxProps={{marginBottom: 's10'}}
          LeftComponent={<Icon color="grayPrimary" name="padlock" />}
        />
        <Button
          title="Sign in"
          mt="s48"
          width="90%"
          alignSelf={'center'}
          disabled={!formState.isValid}
          loading={isLoading}
          onPress={handleSubmit(submitForm)}
        />
      </Box>
    </Screen>
  );
}
