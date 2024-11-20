import React from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {HomeScreen, FoodsScreen, RecipesScreen, MeScreen} from '@screens';

import {AppTabBar} from './AppTabBar.tsx';

export type AppTabBottomTabParamList = {
  FoodsScreen: undefined;
  HomeScreen: undefined;
  MeScreen: undefined;
  RecipesScreen: undefined;
};

const Tab = createBottomTabNavigator<AppTabBottomTabParamList>();

export function AppTabNavigator() {
  function renderTabBar(props: BottomTabBarProps) {
    return <AppTabBar {...props} />;
  }

  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={renderTabBar}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="FoodsScreen" component={FoodsScreen} />
      <Tab.Screen name="RecipesScreen" component={RecipesScreen} />
      <Tab.Screen name="MeScreen" component={MeScreen} />
    </Tab.Navigator>
  );
}
