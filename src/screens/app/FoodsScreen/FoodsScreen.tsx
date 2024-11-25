import React, {useState} from 'react';
import {View, ViewStyle} from 'react-native';

import {Box, CustomTabMenu, Screen, Text} from '@components';

const AddFood = () => {
  return (
    <Box
      style={{
        height: 1150,
        justifyContent: 'space-between',
        backgroundColor: 'red',
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

// You might want to extract this enum to a separate types file
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
        return <MyFoods />;
      case TabScreens.FAVOURITE_FOODS:
        return <FavouriteFoods />;
      default:
        return <AddFood />; // Default case
    }
  };

  return (
    <Screen title="Manage Foods" style={$screen}>
      <CustomTabMenu
        tabs={['Add Food', 'Custom Foods', 'Favourite Foods']}
        onTabChange={index => setActiveTabIndex(index as TabScreens)}
      />
      {renderContent()}
    </Screen>
  );
}

const $screen: ViewStyle = {
  paddingBottom: 0,
  flexGrow: 1,
};
