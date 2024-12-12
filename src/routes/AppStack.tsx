import React from 'react';

import {MealsTypes, RecipeItem} from '@domain';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  FoodsSelectionScreen,
  FoodDetailsScreen,
  MealsSelectionScreen,
  RecipeDetailsScreen,
} from '@screens';

import {AppTabBottomTabParamList, AppTabNavigator} from './AppTabNavigator.tsx';

// Base navigation params type
interface BaseNavigationParams {
  id: number;
  createdAt: string;
  userId: string;
  label: string;
  servSize: number;
  servUnit: string;
}

// Food navigation params
export interface FoodNavigationParams extends BaseNavigationParams {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  fibre: number;
  sodium: number;
  foodImg: string;
  categoryId: number | null;
}

// Recipe navigation params
export interface RecipeNavigationParams extends BaseNavigationParams {
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalCalories: number;
  totalFibre: number;
  totalSodium: number;
  image?: string;
  recipeItems?: RecipeItem[];
}

// Generic type for screen props
export type ItemDetailsScreenParams<T extends BaseNavigationParams> = {
  isViewOnly: boolean;
  item: T;
};

export type AppStackParamsList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  FoodsSelectionScreen: undefined;
  FoodDetailsScreen: ItemDetailsScreenParams<FoodNavigationParams>;
  RecipeDetailsScreen: ItemDetailsScreenParams<RecipeNavigationParams>;
  MealsSelectionScreen: {mealType: MealsTypes};
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
    </Stack.Navigator>
  );
}
