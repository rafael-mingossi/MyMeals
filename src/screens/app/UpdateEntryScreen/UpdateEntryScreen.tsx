import React from 'react';

import {Box, Screen} from '@components';
import {AppScreenProps} from '@routes';

import {AddFood} from '../FoodsScreen/tabs/AddFood.tsx';

export function UpdateEntryScreen({
  route,
}: AppScreenProps<'UpdateEntryScreen'>) {
  return (
    <Screen canGoBack>
      <Box style={{paddingHorizontal: -16}}>
        <AddFood
          isUpdatingItem={route.params.isUpdatingItem}
          foodToUpdate={route.params.food}
        />
      </Box>
    </Screen>
  );
}
