import React, {useState} from 'react';

import {Recipe, useToggleFavourite} from '@domain';
import {useToastService} from '@services';

import {
  AlertDialog,
  CustomTabMenu,
  OptionItem,
  ScreenFixedHeader,
} from '@components';
import {AppTabScreenProps} from '@routes';

import {useArchiveRecipe} from '../../../domain/Recipes/useCases/useArchiveRecipe.ts';

import {AddRecipe} from './tabs/AddRecipe.tsx';
import {FavouriteRecipes} from './tabs/FavouriteRecipes.tsx';
import {RecipesList} from './tabs/RecipesList.tsx';

enum TabScreens {
  ADD_RECIPE = 0,
  MY_RECIPES = 1,
  FAVOURITE_RECIPES = 2,
}

export function RecipesScreen({
  navigation,
}: AppTabScreenProps<'RecipesScreen'>) {
  const [activeTabIndex, setActiveTabIndex] = useState<TabScreens>(
    TabScreens.ADD_RECIPE,
  );

  const {showToast} = useToastService();
  const {toggleFavourite, isPending: isLoadingFav} = useToggleFavourite();
  const {archiveRecipe} = useArchiveRecipe({
    onSuccess: () => {
      showToast({message: 'Recipe archived!', type: 'success'});
    },
    onError: () => {
      showToast({message: 'Failed to archive Recipe!', type: 'error'});
    },
  });

  const handleArchiveRecipe = (recipe: Recipe) => {
    AlertDialog({
      title: 'Archive Food',
      message: `Are you sure you want to archive ${recipe.label}? It will no longer appear in your recipes list but will remain available in your existing meals.`,
      onConfirm: () => archiveRecipe(recipe.id),
    });
  };

  const handleToggleFavorite = (userId: string, recipeId: number) => {
    if (!userId) {
      return;
    }

    toggleFavourite({
      userId: userId,
      recipeId: recipeId,
    });
  };

  const recipeOptions = (recipe: Recipe): OptionItem[] => {
    return [
      {
        label: 'Edit',
        onPress: () => {
          navigation.navigate('UpdateEntryScreen', {
            isUpdatingItem: true,
            item: recipe,
            updating: 'recipe',
          });
        },
      },
      {
        label: 'Archive',
        onPress: () => handleArchiveRecipe(recipe),
      },
      {
        label: 'Favourite',
        onPress: () =>
          isLoadingFav
            ? () => {}
            : handleToggleFavorite(recipe.userId, recipe.id),
      },
    ];
  };

  const renderContent = (): React.ReactElement => {
    switch (activeTabIndex) {
      case TabScreens.ADD_RECIPE:
        return <AddRecipe />;
      case TabScreens.MY_RECIPES:
        return <RecipesList isEditing createOptions={recipeOptions} />;
      case TabScreens.FAVOURITE_RECIPES:
        return <FavouriteRecipes />;
      default:
        return <AddRecipe />;
    }
  };

  return (
    <ScreenFixedHeader
      title="Manage Recipes"
      fixedHeader={true}
      fixedTabs={{
        enabled: true,
        component: (
          <CustomTabMenu
            tabs={['Add Recipe', 'Custom Recipes', 'Favourite Recipes']}
            onTabChange={index => setActiveTabIndex(index as TabScreens)}
          />
        ),
      }}>
      {renderContent()}
    </ScreenFixedHeader>
  );
}
