import React, {useState} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {Recipe, useGetRecipesByUser} from '@domain';
import {useNavigation} from '@react-navigation/native';
import {useAuthCredentials} from '@services';

import {
  ActivityIndicator,
  Box,
  Icon,
  Ingredient,
  SearchInput,
  Text,
} from '@components';

interface RecipesListProps {
  selectedRecipes?: Map<number, Recipe>;
  onToggleCheck?: (recipe: Recipe) => void;
  isEditing?: boolean;
  onEdit?: (recipe: Recipe) => void;
  onDelete?: (recipe: Recipe) => void;
  onIngredientPress?: (recipe: Recipe) => void;
}

export function RecipesList({
  selectedRecipes = new Map(),
  onEdit,
  onDelete,
  onToggleCheck,
  isEditing = false,
  onIngredientPress,
}: RecipesListProps) {
  const {authCredentials} = useAuthCredentials();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const {recipes, isLoading} = useGetRecipesByUser(
    authCredentials?.session.user.id as string,
  );

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  function renderItem({item}: ListRenderItemInfo<Recipe>) {
    const handlePress = () => {
      //isEditing goes to ItemDetails and user can change quantity to add to a list
      if (isEditing) {
        navigation.navigate('RecipeDetailsScreen', {
          isViewOnly: true,
          item: item,
        });
      } else {
        onIngredientPress && onIngredientPress(item);
      }
    };

    return (
      <Ingredient<Recipe>
        item={item}
        isEditing={isEditing}
        isSelected={selectedRecipes.has(item.id)}
        onSelect={onToggleCheck}
        onIngredientPress={handlePress}
        onDelete={recipe => {
          onDelete && onDelete(recipe);
          console.log('DELETE RECIPE=>', recipe);
        }}
        onEdit={recipe => {
          onEdit && onEdit(recipe);
          console.log('EDIT RECIPE=>', recipe);
        }}
      />
    );
  }

  function renderEmptyItem() {
    return (
      <Box mt={'s16'}>
        <Text>You don't have recipes created!</Text>
      </Box>
    );
  }

  function renderEmptyFilteredItem() {
    return (
      <Box>
        <Text>No recipes entries found!</Text>
      </Box>
    );
  }

  const filteredRecipes = recipes.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box flex={1}>
      {recipes.length > 0 && (
        <SearchInput
          placeholder="Search for a recipe"
          value={search}
          onChangeText={setSearch}
          LeftComponent={<Icon color="gray4" name="search" size={18} />}
        />
      )}
      <FlatList
        data={search.length === 0 ? recipes : filteredRecipes}
        renderItem={renderItem}
        ListEmptyComponent={
          search.length === 0 ? renderEmptyItem : renderEmptyFilteredItem
        }
        keyExtractor={item => item.id.toString()}
      />
    </Box>
  );
}
