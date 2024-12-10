import React from 'react';

import {FoodNavigationParams} from '@domain';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {FoodsSelectionScreen, FoodDetailsScreen} from '@screens';

import {AppTabBottomTabParamList, AppTabNavigator} from './AppTabNavigator.tsx';

export type AppStackParamsList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  FoodsSelectionScreen: undefined;
  FoodDetailsScreen: {isViewOnly: boolean; food: FoodNavigationParams};
};

const Stack = createNativeStackNavigator<AppStackParamsList>();

interface Props {
  initialRouteName?: keyof AppStackParamsList;
}

export function AppStack({initialRouteName = 'AppTabNavigator'}: Props) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
      <Stack.Screen name="FoodDetailsScreen" component={FoodDetailsScreen} />
      <Stack.Screen
        name="FoodsSelectionScreen"
        component={FoodsSelectionScreen}
      />
    </Stack.Navigator>
  );
}
