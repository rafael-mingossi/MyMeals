import React from 'react';
import {FlatList, ScrollView} from 'react-native';

import {Foods, Recipe} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {useRecipeItems, useRecipeListService} from '@services';
import {macrosCalculations} from '@utils';
import {useForm} from 'react-hook-form';

import {
  Box,
  ButtonText,
  FormTextInput,
  Ingredient,
  OptionItem,
  OptionsDropdown,
  SeparatorBox,
  Text,
} from '@components';

import {useCreateRecipeForm} from '../hooks/useCreateRecipeForm.ts';

import {addRecipeSchema, AddRecipeSchema} from './addRecipeSchema.ts';
import {NutritionalInfo} from './components/NutritionalInfo.tsx';

type AddRecipeProps = {
  isUpdatingItem?: boolean;
  recipeToUpdate?: Recipe;
};

export function AddRecipe({
  isUpdatingItem = false,
  recipeToUpdate,
}: AddRecipeProps) {
  const navigation = useNavigation();
  const recipeItems = useRecipeItems();
  const {removeFoodFromRecipe} = useRecipeListService();
  const {handleCreateRecipe, isPending} = useCreateRecipeForm();

  const {control, formState, handleSubmit, reset} = useForm<AddRecipeSchema>({
    resolver: zodResolver(addRecipeSchema),
    defaultValues: {
      name: isUpdatingItem ? recipeToUpdate?.label : '',
      serving: isUpdatingItem ? recipeToUpdate?.servSize : undefined,
      servingUnit: isUpdatingItem ? recipeToUpdate?.servUnit : '',
    },
  });

  const onSubmit = handleSubmit(formData => {
    handleCreateRecipe(formData);
    reset();
  });

  const createHeaderOptions = (): OptionItem[] => {
    return [
      {
        label: 'Add Ingredient',
        onPress: () => navigation.navigate('FoodsSelectionScreen'),
      },
    ];
  };

  const addRecipeOptions = (id: number): OptionItem[] => {
    return [
      {
        label: 'Remove',
        onPress: () => removeFoodFromRecipe(id),
      },
    ];
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box rowGap="s20">
        <Box rowGap="s20" mt="s8">
          <FormTextInput
            isUnderlinedVersion
            placeholder="Recipe name"
            label="New recipe name"
            name="name"
            control={control}
          />
          <FormTextInput
            isUnderlinedVersion
            placeholder="Serving size"
            label="Serving Size of the portion being logged"
            name="serving"
            keyboardType="number-pad"
            control={control}
          />
          <FormTextInput
            isUnderlinedVersion
            placeholder="Serving unit"
            label="Serving unit, (grams, slice, spoon, etc...)"
            name="servingUnit"
            control={control}
          />
        </Box>

        <Box>
          <SeparatorBox />
          <Box
            mt={'s8'}
            flexDirection="row"
            justifyContent={'space-between'}
            alignItems="center">
            <Text preset="paragraphLarge" font="medium">
              {recipeItems.size} Ingredients
            </Text>
            <OptionsDropdown
              items={createHeaderOptions()}
              onChange={selected => {
                selected.label === 'Add Ingredient' &&
                  navigation.navigate('FoodsSelectionScreen');
              }}
            />
          </Box>
          <FlatList
            contentContainerStyle={{marginTop: 10}}
            scrollEnabled={false}
            data={Array.from(recipeItems.values())}
            renderItem={({item}) => (
              <Ingredient<Foods>
                item={item.food}
                quantity={item.quantity}
                isEditing={true}
                options={addRecipeOptions(item.food.id)}
              />
            )}
          />
        </Box>

        <Box>
          <SeparatorBox />
          <Text preset="paragraphLarge" font="medium" mt={'s8'}>
            Recipe Totals
          </Text>
          <NutritionalInfo
            values={macrosCalculations.recipeTotals(recipeItems)}
          />
        </Box>
      </Box>
      <Box mt={'s24'}>
        <SeparatorBox />
        <Box flexDirection="row" paddingTop={'s14'} justifyContent={'flex-end'}>
          <ButtonText
            title={'Save Recipe'}
            disabled={!formState.isValid || isPending}
            onPress={onSubmit}
          />
        </Box>
      </Box>
    </ScrollView>
  );
}
