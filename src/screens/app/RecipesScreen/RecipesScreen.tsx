import React, {useState} from 'react';
import {View} from 'react-native';

import {Box, CustomTabMenu, ScreenFixedHeader, Text} from '@components';

enum TabScreens {
  ADD_FOOD = 0,
  MY_FOODS = 1,
  FAVOURITE_FOODS = 2,
}

const AddFood = () => {
  return (
    <Box
      style={{
        height: 1150,
        justifyContent: 'space-between',
      }}>
      <Text>1</Text>
      <Text>1</Text>
    </Box>
  );
};

const MyFoods = () => {
  return <View>{/* My Foods content */}</View>;
};

const FavouriteFoods = () => {
  return <View>{/* Favourite Foods content */}</View>;
};

export function RecipesScreen() {
  const [activeTabIndex, setActiveTabIndex] = useState<TabScreens>(
    TabScreens.ADD_FOOD,
  );

  const renderContent = (): React.ReactElement => {
    switch (activeTabIndex) {
      case TabScreens.ADD_FOOD:
        return <AddFood />;
      case TabScreens.MY_FOODS:
        return <MyFoods />;
      case TabScreens.FAVOURITE_FOODS:
        return <FavouriteFoods />;
      default:
        return <AddFood />;
    }
  };

  return (
    <ScreenFixedHeader
      title="Manage Recipes"
      flexGrow={1}
      fixedHeader={true}
      fixedTabs={{
        enabled: true,
        component: (
          <CustomTabMenu
            tabs={['Add Recipe', 'Custom Recipes', 'Favourite Recipes']}
            onTabChange={index => setActiveTabIndex(index as TabScreens)}
          />
        ),
      }}
      // fixedSearch={{
      //   enabled: true,
      //   component: <SearchComponent onSearch={() => {}} />,
      // }}
    >
      {renderContent()}
    </ScreenFixedHeader>
  );
}
