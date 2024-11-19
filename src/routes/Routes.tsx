import React from 'react';
// import {ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

// import {Box} from '@components';

import {AppStack} from './AppStack.tsx';

// function LoadingScreen() {
//   return (
//     <Box
//       flex={1}
//       backgroundColor="background"
//       justifyContent="center"
//       alignItems="center">
//       <ActivityIndicator size="large" />
//     </Box>
//   );
// }

// const stacks: Record<Stacks, ReactElement> = {
//   Loading: <LoadingScreen />,
//   // Auth: <AuthStack />,
//   App: <AppStack />,
//   // Onboarding: <OnboardingStack />,
// };

export function Router() {
  // const stack = useRouter();

  // const Stack = stacks[stack];
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
