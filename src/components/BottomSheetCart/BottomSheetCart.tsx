import React from 'react';

import {
  useAppColor,
  useFoodSelection,
  useFoodSelectionService,
  useRecipeSelection,
  useRecipeSelectionService,
} from '@services';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';

import {Box, ButtonText, Ingredient} from '@components';
import {colours} from '@theme';

export function BottomSheetCart(props: SheetProps) {
  const appColor = useAppColor();
  const selectedFoods = useFoodSelection();
  const selectedRecipes = useRecipeSelection();
  const {clearSelection: clearFoods} = useFoodSelectionService();
  const {clearSelection: clearRecipes} = useRecipeSelectionService();

  function discardItems() {
    clearFoods();
    clearRecipes();
    SheetManager.hide('bs-cart');
  }

  const selectedFoodArray = Array.from(selectedFoods.values()).map(food => ({
    id: food.id,
    createdAt: food.createdAt,
    userId: food.userId,
    label: food.label,
    servSize: food.servSize,
    servUnit: food.servUnit,
    calories: food.calories,
    categoryId: food.categoryId,
  }));

  const selectedRecipesArray = Array.from(selectedRecipes.values()).map(
    recipe => ({
      id: recipe.id,
      createdAt: recipe.createdAt,
      userId: recipe.userId,
      label: recipe.label,
      servSize: recipe.servSize,
      servUnit: recipe.servUnit,
      calories: recipe.totalCalories,
    }),
  );

  return (
    <ActionSheet
      {...props}
      closeOnPressBack={true}
      headerAlwaysVisible={true}
      containerStyle={{
        padding: 20,
        backgroundColor:
          appColor === 'dark'
            ? colours.palette.backgroundInnerDark
            : colours.palette.backgroundInnerLight,
      }}
      safeAreaInsets={{top: 0, bottom: 0, left: 0, right: 0}}>
      <Box paddingTop={'s16'} paddingBottom={'s16'}>
        {selectedFoodArray.map(food => (
          <Ingredient item={food} key={food.id} />
        ))}
        {selectedRecipesArray.map(recipe => (
          <Ingredient item={recipe} key={recipe.id} />
        ))}
        <Box
          flexDirection="row"
          justifyContent={'flex-end'}
          columnGap={'s10'}
          mt={'s16'}>
          <ButtonText title="Discard" onPress={discardItems} />
          <ButtonText title="Log" />
        </Box>
      </Box>
    </ActionSheet>
  );
}
