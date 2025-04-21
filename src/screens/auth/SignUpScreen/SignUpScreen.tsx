import React from 'react';
import {ActivityIndicator} from 'react-native';

import {useAuthSignUp} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useToastService} from '@services';
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
import {useAsyncValidation} from './useAsyncValidation.ts';

export function SignUpScreen({navigation}: AuthScreenProps<'SignUpScreen'>) {
  const {showToast} = useToastService();
  const {control, formState, handleSubmit, reset, getFieldState, watch} =
    useForm<SignUpSchema>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        email: '',
        password: '',
        username: '',
        full_name: '',
      },
      mode: 'onChange',
    });

  const {usernameValidation, emailValidation} = useAsyncValidation({
    watch,
    getFieldState,
  });

  function onSuccessCall() {
    showToast({message: 'Sign up successful!', type: 'success'});
    navigation.navigate('LoginScreen');
    reset();
  }

  const {signUp} = useAuthSignUp({
    onSuccess: () => onSuccessCall(),
    onError: errorMessage => showToast({message: errorMessage, type: 'error'}),
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
          errorMessage={emailValidation.errorMessage}
          name="email"
          control={control}
          LeftComponent={<Icon color="grayPrimary" name="envelope" />}
          RightComponent={
            emailValidation.isFetching ? (
              <ActivityIndicator size="small" />
            ) : undefined
          }
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
          errorMessage={usernameValidation.errorMessage}
          name="username"
          control={control}
          LeftComponent={<Icon color="grayPrimary" name="envelope" />}
          RightComponent={
            usernameValidation.isFetching ? (
              <ActivityIndicator size="small" />
            ) : undefined
          }
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
          disabled={
            !formState.isValid ||
            usernameValidation.notReady ||
            emailValidation.notReady
          }
          onPress={handleSubmit(submitForm)}
        />
      </Box>
    </Screen>
  );
}
