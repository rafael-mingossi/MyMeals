import React, {useState} from 'react';

import {Foods, useArchiveFood, useToggleFavourite} from '@domain';
import {useToastService} from '@services';

import {
  ActivityIndicator,
  AlertDialog,
  Box,
  CustomTabMenu,
  OptionItem,
  ScreenFixedHeader,
} from '@components';
import {AppTabScreenProps} from '@routes';

import {AddFood} from './tabs/AddFood.tsx';
import {FavouriteFoods} from './tabs/FavouriteFoods.tsx';
import {FoodsList} from './tabs/FoodsList.tsx';

enum TabScreens {
  ADD_FOOD = 0,
  MY_FOODS = 1,
  FAVOURITE_FOODS = 2,
}

export function FoodsScreen({navigation}: AppTabScreenProps<'FoodsScreen'>) {
  const [activeTabIndex, setActiveTabIndex] = useState<TabScreens>(
    TabScreens.ADD_FOOD,
  );

  const {showToast} = useToastService();
  const {toggleFavourite, isPending: isLoadingFav} = useToggleFavourite();

  const {archiveFood, isPending} = useArchiveFood({
    onSuccess: () => {
      showToast({message: 'Food archived!', type: 'success'});
    },
    onError: () => {
      showToast({message: 'Failed to archive Food!', type: 'error'});
    },
  });

  const handleArchiveFood = (food: Foods) => {
    AlertDialog({
      title: 'Archive Food',
      message: `Are you sure you want to archive ${food.label}? It will no longer appear in your foods list but will remain available in your existing meals and recipes.`,
      onConfirm: () => archiveFood(food.id),
    });
  };

  const handleToggleFavorite = (userId: string, foodId: number) => {
    if (!userId) {
      return;
    }

    toggleFavourite({
      userId: userId,
      foodId: foodId,
    });
  };

  const foodOptions = (food: Foods): OptionItem[] => {
    return [
      {
        label: 'Edit',
        onPress: () => {
          navigation.navigate('UpdateEntryScreen', {
            isUpdatingItem: true,
            item: food,
            updating: 'food',
          });
        },
      },
      {
        label: 'Archive',
        onPress: () => handleArchiveFood(food),
      },
      {
        label: 'Favourite',
        onPress: () =>
          isLoadingFav ? () => {} : handleToggleFavorite(food.userId, food.id),
      },
    ];
  };

  const renderContent = (): React.ReactElement => {
    switch (activeTabIndex) {
      case TabScreens.ADD_FOOD:
        return <AddFood mode="create" />;
      case TabScreens.MY_FOODS:
        return <FoodsList isEditing createOptions={foodOptions} />;
      case TabScreens.FAVOURITE_FOODS:
        return <FavouriteFoods />;
      default:
        return <AddFood mode="create" />;
    }
  };

  if (isPending) {
    return <ActivityIndicator />;
  }

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
      <Box flex={1} style={{marginHorizontal: -16}}>
        {renderContent()}
      </Box>
    </ScreenFixedHeader>
  );
}
