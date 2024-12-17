import React from 'react';

import {useAppColor, useMealItems} from '@services';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';

import {Box, ButtonText, Ingredient} from '@components';
import {colours} from '@theme';

export function BottomSheetCart(props: SheetProps) {
  const appColor = useAppColor();

  const {clearMealItems, mealItems} = useMealItems();

  function discardItems() {
    clearMealItems();
    SheetManager.hide('bs-cart');
  }

  const mealItemsArray = Array.from(mealItems.values()).map(mealItem => {
    const item = mealItem.item;

    return {
      id: item.id,
      createdAt: item.createdAt,
      userId: item.userId,
      label: item.label,
      servSize: item.servSize,
      servUnit: item.servUnit,
      calories: 'calories' in item ? item.calories : item.totalCalories,
      categoryId: 'categoryId' in item ? item.categoryId : undefined,
      quantity: mealItem.quantity,
      type: mealItem.type,
    };
  });
  // console.log(mealItemsArray);
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
        {mealItemsArray.map(item => (
          <Ingredient
            item={item}
            key={`${item.type}-${item.id}`}
            quantity={item.quantity}
          />
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
