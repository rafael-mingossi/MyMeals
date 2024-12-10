import React, {useState} from 'react';

import {Box, CustomTabMenu, ScreenFixedHeader} from '@components';

import {AddFood} from './tabs/AddFood.tsx';
import {FoodsList} from './tabs/FoodsList.tsx';

const FavouriteFoods = () => {
  return <></>;
};

enum TabScreens {
  ADD_FOOD = 0,
  MY_FOODS = 1,
  FAVOURITE_FOODS = 2,
}

export function FoodsScreen() {
  const [activeTabIndex, setActiveTabIndex] = useState<TabScreens>(
    TabScreens.ADD_FOOD,
  );

  const renderContent = (): React.ReactElement => {
    switch (activeTabIndex) {
      case TabScreens.ADD_FOOD:
        return <AddFood />;
      case TabScreens.MY_FOODS:
        return <FoodsList isEditing />;
      case TabScreens.FAVOURITE_FOODS:
        return <FavouriteFoods />;
      default:
        return <AddFood />;
    }
  };

  return (
    <ScreenFixedHeader
      title="Manage Foods"
      fixedHeader={true}
      fixedTabs={{
        enabled: true,
        component: (
          <CustomTabMenu
            tabs={['Add Food', 'Custom Foods', 'Favourite Foods']}
            onTabChange={index => setActiveTabIndex(index as TabScreens)}
          />
        ),
      }}>
      <Box style={{marginHorizontal: -16}}>{renderContent()}</Box>
    </ScreenFixedHeader>
  );
}
