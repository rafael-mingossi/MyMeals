import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {InitialScreen, LoginScreen} from '@screens';

export type AuthStackParamsList = {
  LoginScreen: undefined;
  InitialScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamsList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="InitialScreen"
      screenOptions={{headerShown: false, fullScreenGestureEnabled: true}}>
      <Stack.Screen name={'InitialScreen'} component={InitialScreen} />
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
    </Stack.Navigator>
  );
}
