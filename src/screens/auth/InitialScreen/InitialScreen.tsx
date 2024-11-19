import React from 'react';

import {Box, Button, Screen, Text} from '@components';
import {AuthScreenProps} from '@routes';

import {VideoPlayer} from './components/VideoBackground.tsx';

export function InitialScreen({navigation}: AuthScreenProps<'InitialScreen'>) {
  function navigateToLogin() {
    navigation.navigate('LoginScreen');
  }

  return (
    <Screen flex={1} alignItems={'center'} justifyContent={'space-around'}>
      <VideoPlayer />
      <Box alignItems={'center'}>
        <Text
          style={{zIndex: 1}}
          mb="s8"
          font="semiBold"
          preset="headingLarge"
          color={'white'}>
          Welcome to
        </Text>
        <Text preset="headingExtraLarge" font="extraBold" color="white">
          <Text preset="headingExtraLarge" font="semiBold" color="white">
            My
          </Text>
          Meals
        </Text>
      </Box>
      <Box>
        <Button title="Sign in" onPress={navigateToLogin} />
        <Text color={'white'} mt="s24" mb="s10">
          No account? Register now!
        </Text>
        <Button title="Sign up" preset="white" />
      </Box>
    </Screen>
  );
}
