import React, {ReactElement} from 'react';
import {ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {Box} from '@components';

import {AppStack} from './AppStack.tsx';
import {AuthStack} from './AuthStack.tsx';
import {Stacks, useRouter} from './useRouter.ts';

function LoadingScreen() {
  return (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      alignItems="center">
      <ActivityIndicator size="large" />
    </Box>
  );
}

const stacks: Record<Stacks, ReactElement> = {
  Loading: <LoadingScreen />,
  Auth: <AuthStack />,
  App: <AppStack />,
  // Onboarding: <OnboardingStack />,
};

export function Router() {
  const stack = useRouter();

  const Stack = stacks[stack];
  return <NavigationContainer>{Stack}</NavigationContainer>;
}
