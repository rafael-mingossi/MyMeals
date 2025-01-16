import React from 'react';

import {MealsTypes} from '@domain';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  FoodsSelectionScreen,
  FoodDetailsScreen,
  MealsSelectionScreen,
  RecipeDetailsScreen,
  UpdateEntryScreen,
  UpdateMealsScreen,
} from '@screens';

import {AppTabBottomTabParamList, AppTabNavigator} from './AppTabNavigator.tsx';
import {
  FoodNavigationParams,
  ItemDetailsScreenParams,
  RecipeNavigationParams,
  UpdateEntryScreenParams,
} from './navigationItemDetailsTypes.ts';

export type AppStackParamsList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  FoodsSelectionScreen: undefined;
  FoodDetailsScreen: ItemDetailsScreenParams<FoodNavigationParams>;
  RecipeDetailsScreen: ItemDetailsScreenParams<RecipeNavigationParams>;
  MealsSelectionScreen: {mealType: MealsTypes};
  UpdateEntryScreen: UpdateEntryScreenParams<
    FoodNavigationParams | RecipeNavigationParams
  >;
  UpdateMealsScreen: {mealType: MealsTypes};
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
        name="RecipeDetailsScreen"
        component={RecipeDetailsScreen}
      />
      <Stack.Screen
        name="FoodsSelectionScreen"
        component={FoodsSelectionScreen}
      />
      <Stack.Screen
        name="MealsSelectionScreen"
        component={MealsSelectionScreen}
      />
      <Stack.Screen name="UpdateEntryScreen" component={UpdateEntryScreen} />
      <Stack.Screen name="UpdateMealsScreen" component={UpdateMealsScreen} />
    </Stack.Navigator>
  );
}
