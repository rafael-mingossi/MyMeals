import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {BackHandler, Platform} from 'react-native';

import {OnItemPressFoodNavigation, OnItemPressRecipeNavigation} from '@domain';
import {usePreventRemove} from '@react-navigation/native';
import {
  useFoodSelection,
  useFoodSelectionService,
  useRecipeSelection,
  useRecipeSelectionService,
} from '@services';
import {SheetManager} from 'react-native-actions-sheet';

import {
  Box,
  ButtonFloat,
  ButtonText,
  CustomTabMenu,
  Icon,
  ScreenFixedHeader,
  Text,
} from '@components';
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

  const {toggleItem: toggleRecipes} = useRecipeSelectionService();
  const {toggleItem: toggleFoods} = useFoodSelectionService();
  const selectedFoods = useFoodSelection();
  const selectedRecipes = useRecipeSelection();

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

  const openCart = useCallback(() => {
    SheetManager.show('bs-cart');
  }, []);

  const handleBackPress = useCallback(() => {
    if (selectedFoods.size > 0 || selectedRecipes.size > 0) {
      openCart();
      return true;
    } else {
      navigation.goBack();
    }
    return false;
  }, [selectedFoods.size, selectedRecipes.size, openCart, navigation]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const backSubscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );
      return () => backSubscription.remove();
    }
  }, [handleBackPress, selectedFoods, selectedRecipes]);

  // iOS gesture handler
  usePreventRemove(selectedFoods.size > 0 || selectedRecipes.size > 0, () => {
    openCart();
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackButtonMenuEnabled: false, // Prevents multiple screen pop
      gestureEnabled: !(selectedFoods.size > 0 || selectedRecipes.size > 0),
    });
  }, [navigation, selectedFoods.size, selectedRecipes.size]);

  const renderContent = (): React.ReactElement => {
    switch (activeTabIndex) {
      case TabScreens.FOODS:
        return (
          <FoodsList
            hasHorizontalPadding={false}
            selectedFoods={selectedFoods}
            onToggleCheck={food => toggleFoods(food)}
            onIngredientPress={navigateToFoodDetails}
          />
        );
      case TabScreens.RECIPES:
        return (
          <RecipesList
            onToggleCheck={recipe => toggleRecipes(recipe)}
            selectedRecipes={selectedRecipes}
            onIngredientPress={navigateToRecipeDetails}
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
      {(selectedFoods.size > 0 || selectedRecipes.size > 0) && (
        <ButtonFloat preset="secondary" onPress={openCart}>
          <Box alignItems={'center'} justifyContent={'center'}>
            <Box position={'absolute'} bottom={0} left={8.5}>
              <Text font={'semiBold'}>
                {selectedFoods.size + selectedRecipes.size}
              </Text>
            </Box>
            <Icon name={'bag'} size={27} />
          </Box>
        </ButtonFloat>
      )}
      {(selectedFoods.size > 0 || selectedRecipes.size > 0) && (
        <ButtonFloat>
          <Box flexDirection={'row'} columnGap={'s8'} alignItems={'center'}>
            <Icon name={'check'} size={18} />
            <Text font={'semiBold'}>Log</Text>
          </Box>
        </ButtonFloat>
      )}
      <Box>
        <ButtonText title={'Cancel & Go Back'} onPress={handleBackPress} />
      </Box>
    </ScreenFixedHeader>
  );
}
