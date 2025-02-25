import React from 'react';

import {Foods} from '@domain';
import {
  useFoodSelection,
  useFoodSelectionService,
  useRecipeListService,
} from '@services';

import {Box, ButtonText, Screen, SeparatorBox} from '@components';
import {AppScreenProps} from '@routes';

import {FoodsList} from '../FoodsScreen/tabs/FoodsList';

export function FoodsSelectionScreen({
  navigation,
}: AppScreenProps<'FoodsSelectionScreen'>) {
  const {toggleItem, addSelectedItems, clearSelection} =
    useFoodSelectionService();
  const selectedFoods = useFoodSelection();
  const {addFoodToRecipe} = useRecipeListService();

  const handleAddToRecipe = () => {
    const selectedFoodsList = addSelectedItems();
    selectedFoodsList.forEach(food => addFoodToRecipe(food, 1));
    clearSelection();
    navigation.goBack();
  };

  const navigateToFoodDetails = (item: Foods) => {
    navigation.navigate('FoodDetailsScreen', {
      isViewOnly: false,
      item: item,
    });
  };

  return (
    <Screen canGoBack screenScrollType="viewContainer" flexGrow={1}>
      <FoodsList
        selectedFoods={selectedFoods}
        onToggleCheck={food => toggleItem(food)}
        onIngredientPress={food => navigateToFoodDetails(food)}
        createOptions={() => []}
      />
      <Box>
        <SeparatorBox />
        <Box flexDirection="row" paddingTop={'s14'} justifyContent={'flex-end'}>
          <ButtonText
            title={'Clear'}
            onPress={clearSelection}
            disabled={selectedFoods.size === 0}
          />
          <ButtonText
            title={'Add to recipe'}
            onPress={handleAddToRecipe}
            disabled={selectedFoods.size === 0}
          />
        </Box>
      </Box>
    </Screen>
  );
}
