import React, {useState} from 'react';
import {View} from 'react-native';

import {CustomTabMenu, ScreenFixedHeader} from '@components';

import {AddRecipe} from './tabs/AddRecipe.tsx';
import {RecipesList} from './tabs/RecipesList.tsx';

enum TabScreens {
  ADD_RECIPE = 0,
  MY_RECIPES = 1,
  FAVOURITE_RECIPES = 2,
}

const FavouriteFoods = () => {
  return <View>{/* Favourite Foods content */}</View>;
};

export function RecipesScreen() {
  const [activeTabIndex, setActiveTabIndex] = useState<TabScreens>(
    TabScreens.ADD_RECIPE,
  );

  const renderContent = (): React.ReactElement => {
    switch (activeTabIndex) {
      case TabScreens.ADD_RECIPE:
        return <AddRecipe />;
      case TabScreens.MY_RECIPES:
        return <RecipesList />;
      case TabScreens.FAVOURITE_RECIPES:
        return <FavouriteFoods />;
      default:
        return <AddRecipe />;
    }
  };

  return (
    <ScreenFixedHeader
      title="Manage Recipes"
      fixedHeader={true}
      fixedTabs={{
        enabled: true,
        component: (
          <CustomTabMenu
            tabs={['Add Recipe', 'Custom Recipes', 'Favourite Recipes']}
            onTabChange={index => setActiveTabIndex(index as TabScreens)}
          />
        ),
      }}>
      {renderContent()}
    </ScreenFixedHeader>
  );
}
