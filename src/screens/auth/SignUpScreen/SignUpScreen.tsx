import React from 'react';

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

export function SignUpScreen({}: AuthScreenProps<'SignUpScreen'>) {
  const {control, formState, handleSubmit} = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function submitForm({email, password}: SignUpSchema) {
    console.log({email, password});
  }

  return (
    <Screen canGoBack title={' '} backgroundColor="white" flex={1}>
      <Box justifyContent="flex-start" mt="s32" flex={1}>
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
