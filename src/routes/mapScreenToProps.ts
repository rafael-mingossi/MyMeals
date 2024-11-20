import {IconProps} from '@components';

import {AppTabBottomTabParamList} from './AppTabNavigator.tsx';

export const mapScreenToProps: Record<
  keyof AppTabBottomTabParamList,
  {
    label: string;
    icon: {
      focused: IconProps['name'];
      unfocused: IconProps['name'];
    };
  }
> = {
  HomeScreen: {
    label: 'Home',
    icon: {
      focused: 'dashboardFill',
      unfocused: 'dashboard',
    },
  },
  FoodsScreen: {
    label: 'Foods',
    icon: {
      focused: 'foodFill',
      unfocused: 'food',
    },
  },
  RecipesScreen: {
    label: 'Recipes',
    icon: {
      focused: 'recipeFill',
      unfocused: 'recipe',
    },
  },
  MeScreen: {
    label: 'Me',
    icon: {
      focused: 'avatarFill',
      unfocused: 'avatar',
    },
  },
};
