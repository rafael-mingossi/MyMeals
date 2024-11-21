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

export function LoginScreen({navigation}: AuthScreenProps<'LoginScreen'>) {
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

  function submitForm({email, password}: LoginSchema) {
    signIn({email, password});
  }

  return (
    <Screen canGoBack title={' '} backgroundColor="white" flex={1}>
      <Box justifyContent="flex-start" mt="s32" flex={1}>
        <AuthScreensHeader title={'Sign in'} />
        <FormTextInput
          isUnderlinedVersion
          placeholder="E-mail"
          label=""
          boxProps={{marginBottom: 's20'}}
          name="email"
          control={control}
          LeftComponent={<Icon color="grayPrimary" name="envelope" />}
        />
        <FormPasswordInput
          isUnderlinedVersion
          control={control}
          name="password"
          label=""
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
