import React, {useState} from 'react';

import {Screen} from '@components';

import {FoodsList} from '../FoodsScreen/tabs/FoodsList.tsx';

export function FoodsSelectionScreen() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

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

  return (
    <Screen canGoBack screenScrollType="viewContainer" flexGrow={1}>
      <FoodsList
        checkedItems={checkedItems}
        onToggleCheck={handleToggleCheck}
      />
    </Screen>
  );
}
