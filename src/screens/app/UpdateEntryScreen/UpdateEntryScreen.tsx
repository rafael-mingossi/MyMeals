import React from 'react';

import {Box, Screen} from '@components';
import {AppScreenProps, FoodNavigationParams} from '@routes';

import {AddFood} from '../FoodsScreen/tabs/AddFood.tsx';

export function UpdateEntryScreen({
  route,
}: AppScreenProps<'UpdateEntryScreen'>) {
  const {isUpdatingItem, item, updating} = route.params;

  const renderContent = () => {
    switch (updating) {
      case 'food':
        return (
          <AddFood
            isUpdatingItem={isUpdatingItem}
            foodToUpdate={item as FoodNavigationParams}
          />
        );
      // case 'recipe':
      //   return (
      //     <AddRecipe
      //       isUpdatingItem={isUpdatingItem}
      //       recipeToUpdate={item as RecipeNavigationParams}
      //     />
      //   );
      default:
        return null;
    }
  };

  return (
    <Screen canGoBack>
      <Box style={{paddingHorizontal: -16}}>
        {/*<AddFood isUpdatingItem={isUpdatingItem} foodToUpdate={item} />*/}
        {renderContent()}
      </Box>
    </Screen>
  );
}
