import React, {useCallback, useState} from 'react';

import {Box, ButtonText, Screen, Separator} from '@components';

import {FoodsList} from '../FoodsScreen/tabs/FoodsList.tsx';

export function FoodsSelectionScreen() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  console.log({checkedItems});
  const handleToggleCheck = (foodId: string) => {
    setCheckedItems(prevItems => {
      const newItems = new Set(prevItems);
      if (newItems.has(foodId)) {
        newItems.delete(foodId);
      } else {
        newItems.add(foodId);
      }
      return newItems;
    });
  };

  const clearSelection = useCallback(() => {
    setCheckedItems(new Set());
  }, []);

  return (
    <Screen canGoBack screenScrollType="viewContainer" flexGrow={1}>
      <FoodsList
        checkedItems={checkedItems}
        onToggleCheck={handleToggleCheck}
      />
      <Box>
        <Box style={{marginHorizontal: -20}} mt="s24">
          <Separator />
        </Box>
        <Box flexDirection="row" paddingTop={'s14'} justifyContent={'flex-end'}>
          <ButtonText title={'Clear'} onPress={clearSelection} />
          <ButtonText
            title={'Add to recipe'}
            // onPress={onSubmit}
          />
        </Box>
      </Box>
    </Screen>
  );
}
