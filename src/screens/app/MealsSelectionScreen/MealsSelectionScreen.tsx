import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {BackHandler, Platform} from 'react-native';

import {
  Foods,
  OnItemPressFoodNavigation,
  OnItemPressRecipeNavigation,
  Recipe,
  useCreateMeal,
} from '@domain';
import {usePreventRemove} from '@react-navigation/native';
import {useMealItems, useCalendar, useAuthCredentials} from '@services';
import {macrosCalculations} from '@utils';
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
  route,
}: AppScreenProps<'MealsSelectionScreen'>) {
  const [activeTabIndex, setActiveTabIndex] = useState<TabScreens>(
    TabScreens.FOODS,
  );

  const {toggleMealItem, mealItems, clearMealItems, getMealItems} =
    useMealItems();
  const {dateSelected} = useCalendar();
  const {authCredentials} = useAuthCredentials();
  const {mutate: createMeal, isPending} = useCreateMeal({
    onSuccess: () => {
      SheetManager.hide('bs-cart');
      clearMealItems();
      navigation.navigate('AppTabNavigator', {screen: 'HomeScreen'});
    },
    onError: error => {
      // Handle error - show toast/alert
      console.error('Failed to create meal:', error);
    },
  });

  const handleCreateMeal = useCallback(() => {
    const selectedItems = getMealItems();
    const totals = macrosCalculations.calculateTotals(selectedItems);

    if (!authCredentials) {
      return;
    }

    const mealItemsProps = selectedItems.map(item => ({
      foodId: item.type === 'food' ? item.id : undefined,
      foodQuantity: item.type === 'food' ? item.quantity : undefined,
      recipeId: item.type === 'recipe' ? item.id : undefined,
      recipeQuantity: item.type === 'recipe' ? item.quantity : undefined,
    }));

    createMeal({
      user_id: authCredentials?.user.id, // You'll need to get this from your auth context
      meal_type: route.params.mealType,
      date_added: dateSelected.dateString,
      t_calories: totals.calories,
      t_carbs: totals.carbs,
      t_fat: totals.fat,
      t_protein: totals.protein,
      t_fibre: totals.fibre,
      t_sodium: totals.sodium,
      items: mealItemsProps,
    });
  }, [
    getMealItems,
    authCredentials,
    createMeal,
    route.params.mealType,
    dateSelected.dateString,
  ]);

  const handleFoodToggle = (food: Foods) => {
    toggleMealItem('food', food, 1, 'checkbox');
  };

  const handleRecipeToggle = (recipe: Recipe) => {
    toggleMealItem('recipe', recipe, 1, 'checkbox');
  };

  const navigateToFoodDetails = (food: OnItemPressFoodNavigation) => {
    navigation.navigate('FoodDetailsScreen', {
      isViewOnly: false,
      item: food,
      mealType: route?.params.mealType,
    });
  };

  const navigateToRecipeDetails = (recipe: OnItemPressRecipeNavigation) => {
    navigation.navigate('RecipeDetailsScreen', {
      isViewOnly: false,
      item: recipe,
      mealType: route?.params.mealType,
    });
  };

  const openCart = useCallback(() => {
    SheetManager.show('bs-cart');
  }, []);

  const handleBackPress = useCallback(() => {
    if (mealItems.size > 0) {
      openCart();
      return true;
    } else {
      navigation.goBack();
    }
    return false;
  }, [mealItems.size, openCart, navigation]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const backSubscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );
      return () => backSubscription.remove();
    }
  }, [handleBackPress, mealItems]);

  // iOS gesture handler
  usePreventRemove(mealItems.size > 0, () => {
    openCart();
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackButtonMenuEnabled: false, // Prevents multiple screen pop
      gestureEnabled: !(mealItems.size > 0),
    });
  }, [mealItems.size, navigation]);

  const renderContent = (): React.ReactElement => {
    switch (activeTabIndex) {
      case TabScreens.FOODS:
        return (
          <FoodsList
            hasHorizontalPadding={false}
            selectedFoods={
              new Map(
                Array.from(mealItems.entries())
                  .filter(([key]) => key.startsWith('food-'))
                  .map(([_, value]) => [value.id, value.item as Foods]),
              )
            }
            onToggleCheck={handleFoodToggle}
            onIngredientPress={navigateToFoodDetails}
          />
        );
      case TabScreens.RECIPES:
        return (
          <RecipesList
            selectedRecipes={
              new Map(
                Array.from(mealItems.entries())
                  .filter(([key]) => key.startsWith('recipe-'))
                  .map(([_, value]) => [value.id, value.item as Recipe]),
              )
            }
            onToggleCheck={handleRecipeToggle}
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
      {mealItems.size > 0 && (
        <ButtonFloat preset="secondary" onPress={openCart}>
          <Box alignItems={'center'} justifyContent={'center'}>
            <Box position={'absolute'} bottom={0} left={8.5}>
              <Text font={'semiBold'}>{mealItems.size}</Text>
            </Box>
            <Icon name={'bag'} size={27} />
          </Box>
        </ButtonFloat>
      )}
      {mealItems.size > 0 && (
        <ButtonFloat onPress={handleCreateMeal}>
          <Box flexDirection={'row'} columnGap={'s8'} alignItems={'center'}>
            <Icon name={'check'} size={18} />
            <Text font={'semiBold'}>{isPending ? 'Creating...' : 'Log'}</Text>
          </Box>
        </ButtonFloat>
      )}
      <Box>
        <ButtonText title={'Cancel & Go Back'} onPress={handleBackPress} />
      </Box>
    </ScreenFixedHeader>
  );
}
