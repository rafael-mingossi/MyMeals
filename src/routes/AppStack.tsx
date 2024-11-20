import React from 'react';

import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import {
//   SettingsScreen,
//   PostCommentScreen,
//   ProfileScreen,
//   SearchScreen,
//   PublishPostScreen,
//   CameraScreen,
//   DarkModeScreen,
//   EditProfileScreen,
//   EditEmailScreen,
//   EditPasswordScreen,
// } from '@screens';

import {AppTabBottomTabParamList, AppTabNavigator} from './AppTabNavigator.tsx';

export type AppStackParamsList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  // PostCommentScreen: {postId: number; postAuthorId: number; showPost?: boolean};
  // ProfileScreen: {userId: number};
  // PublishPostScreen: {imageUri: string};
  // SearchScreen: undefined;
  // SettingsScreen: undefined;
  // CameraScreen: undefined;
  // DarkModeScreen: undefined;
  // EditProfileScreen: {userId: number};
  // EditEmailScreen: {userId: number};
  // EditPasswordScreen: {userId: number};
};

const Stack = createNativeStackNavigator<AppStackParamsList>();

interface Props {
  initialRouteName?: keyof AppStackParamsList;
}

export function AppStack({initialRouteName = 'AppTabNavigator'}: Props) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false, fullScreenGestureEnabled: true}}>
      <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
    </Stack.Navigator>
  );
}
