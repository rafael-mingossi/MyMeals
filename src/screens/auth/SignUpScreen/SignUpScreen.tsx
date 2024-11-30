import React from 'react';

import {useAuthSignUp} from '@domain';
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

import {signUpSchema, SignUpSchema} from './signUpSchema.ts';

export function SignUpScreen({navigation}: AuthScreenProps<'SignUpScreen'>) {
  const {control, formState, handleSubmit, reset} = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      full_name: '',
    },
    mode: 'onChange',
  });

  function onSuccessCall() {
    navigation.navigate('LoginScreen');
    reset();
  }

  const {signUp} = useAuthSignUp({
    onSuccess: () => onSuccessCall(),
    onError: errorMessage =>
      console.log('ERROR IN SIGN UP SCREEN', errorMessage),
  });

  function submitForm({email, password, full_name, username}: SignUpSchema) {
    signUp({email, password, full_name, username});
  }

  return (
    <Screen canGoBack title={' '} screenScrollType={'scrollViewAuth'}>
      <Box justifyContent="flex-start" flex={1}>
        <AuthScreensHeader title={'Sign up'} />
        <FormTextInput
          isUnderlinedVersion
          placeholder="E-mail"
          label=""
          boxProps={{marginBottom: 's20'}}
          name="email"
          control={control}
          LeftComponent={<Icon color="grayPrimary" name="envelope" />}
        />
        <FormTextInput
          isUnderlinedVersion
          placeholder="Name"
          label=""
          boxProps={{marginBottom: 's20'}}
          name="full_name"
          control={control}
          LeftComponent={<Icon color="grayPrimary" name="envelope" />}
        />
        <FormTextInput
          isUnderlinedVersion
          placeholder="Username"
          label=""
          boxProps={{marginBottom: 's20'}}
          name="username"
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
          title="Sign up"
          mt="s48"
          width="90%"
          alignSelf={'center'}
          disabled={!formState.isValid}
          onPress={handleSubmit(submitForm)}
        />
      </Box>
    </Screen>
  );
}
