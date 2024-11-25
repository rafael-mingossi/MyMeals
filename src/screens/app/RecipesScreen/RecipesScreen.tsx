import React, {useState} from 'react';
import {View, ViewStyle, TextInput} from 'react-native';

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

  // Optional Search Component
  const SearchComponent = (
    <Box padding="s16">
      <TextInput placeholder={'TEST'} style={{backgroundColor: 'blue'}} />
    </Box>
  );

  return (
    <ScreenFixedHeader
      title="Manage Recipes"
      style={$screen}
      fixedHeader={{enabled: true}}
      fixedTabs={{enabled: true}}
      fixedSearch={{enabled: false}}
      TopComponent={
        <CustomTabMenu
          tabs={['Add Recipe', 'Custom Recipes', 'Favourite Recipes']}
          onTabChange={index => setActiveTabIndex(index as TabScreens)}
        />
      }
      // SearchComponent={SearchComponent}
    >
      {renderContent()}
    </ScreenFixedHeader>
  );
}

const $screen: ViewStyle = {
  flexGrow: 1,
};
