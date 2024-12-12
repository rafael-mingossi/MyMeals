import React, {useState} from 'react';

import {OnItemPressFoodNavigation, OnItemPressRecipeNavigation} from '@domain';
import {
  useFoodSelection,
  useFoodSelectionService,
  // useRecipeListService,
} from '@services';

import {CustomTabMenu, ScreenFixedHeader} from '@components';
import {AppScreenProps} from '@routes';

import {FoodsList} from '../FoodsScreen/tabs/FoodsList.tsx';
import {RecipesList} from '../RecipesScreen/tabs/RecipesList.tsx';

enum TabScreens {
  FOODS = 0,
  RECIPES = 1,
}

export function MealsSelectionScreen({
  navigation,
}: AppScreenProps<'MealsSelectionScreen'>) {
  const [activeTabIndex, setActiveTabIndex] = useState<TabScreens>(
    TabScreens.FOODS,
  );

  const {toggleFood} = useFoodSelectionService();
  const selectedFoods = useFoodSelection();

  // const {addFoodToRecipe} = useRecipeListService();

  const navigateToFoodDetails = (food: OnItemPressFoodNavigation) => {
    navigation.navigate('FoodDetailsScreen', {
      isViewOnly: false,
      item: food,
    });
  };

  const navigateToRecipeDetails = (recipe: OnItemPressRecipeNavigation) => {
    navigation.navigate('RecipeDetailsScreen', {
      isViewOnly: false,
      item: recipe,
    });
  };

  const renderContent = (): React.ReactElement => {
    switch (activeTabIndex) {
      case TabScreens.FOODS:
        return (
          <FoodsList
            hasHorizontalPadding={false}
            selectedFoods={selectedFoods}
            onToggleCheck={food => toggleFood(food)}
            onIngredientPress={food => navigateToFoodDetails(food)}
          />
        );
      case TabScreens.RECIPES:
        return (
          <RecipesList
            onIngredientPress={recipe => navigateToRecipeDetails(recipe)}
          />
        );
      default:
        return <FoodsList hasHorizontalPadding={false} />;
    }
  };
  return (
    <ScreenFixedHeader
      fixedTabs={{
        enabled: true,
        component: (
          <CustomTabMenu
            tabs={['Foods', 'Recipes']}
            onTabChange={index => setActiveTabIndex(index as TabScreens)}
          />
        ),
      }}>
      {renderContent()}
    </ScreenFixedHeader>
  );
}
