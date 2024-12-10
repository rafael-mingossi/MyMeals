import React from 'react';
import {FlatList, ScrollView} from 'react-native';

import {Foods} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {useRecipeItems, useRecipeListService} from '@services';
import {useForm} from 'react-hook-form';

import {
  Box,
  ButtonText,
  FormTextInput,
  Ingredient,
  OptionsDropdown,
  Separator,
  Text,
} from '@components';

import {addRecipeSchema, AddRecipeSchema} from './addRecipeSchema.ts';

interface NutritionalValues {
  weight?: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fibre: number;
  sodium: number;
}

interface NutritionalInfoProps {
  values: NutritionalValues;
}

export function NutritionalInfo({values}: NutritionalInfoProps) {
  const rows = [
    {label: 'Weight', value: values.weight?.toFixed(1) || '0', unit: 'g'},
    {label: 'Calories', value: values.calories.toFixed(1), unit: 'cals'},
    {label: 'Protein', value: values.protein.toFixed(1), unit: 'g'},
    {label: 'Fat', value: values.fat.toFixed(1), unit: 'g'},
    {label: 'Carbs', value: values.carbs.toFixed(1), unit: 'g'},
    {label: 'Fibre', value: values.fibre.toFixed(1), unit: 'g'},
    {label: 'Sodium', value: values.sodium.toFixed(1), unit: 'mg'},
  ];

  return (
    <Box rowGap={'s10'} mt={'s14'} paddingHorizontal={'s10'}>
      {rows.map(({label, value, unit}) => (
        <Box key={label} flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>{label}</Text>
          <Text>
            {value} {unit}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

const list = [{label: 'Add Ingredient'}];

export function AddRecipe() {
  const navigation = useNavigation();
  const recipeItems = useRecipeItems();
  console.log('VALUES =>>>', recipeItems.values());
  const {removeFoodFromRecipe} = useRecipeListService();
  const {control, formState, handleSubmit} = useForm<AddRecipeSchema>({
    resolver: zodResolver(addRecipeSchema),
    defaultValues: {
      label: '',
      serv_unit: '',
      serv_size: undefined,
    },
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  const calculateTotals = (
    items: Map<number, {food: Foods; quantity: number}>,
  ) => {
    return Array.from(items.values()).reduce(
      (acc, {food, quantity}) => ({
        weight: (acc.weight || 0) + food.servSize * quantity,
        calories: acc.calories + food.calories * quantity,
        protein: acc.protein + food.protein * quantity,
        fat: acc.fat + food.fat * quantity,
        carbs: acc.carbs + food.carbs * quantity,
        fibre: acc.fibre + (food.fibre || 0) * quantity,
        sodium: acc.sodium + (food.sodium || 0) * quantity,
      }),
      {
        weight: 0,
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        fibre: 0,
        sodium: 0,
      },
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box rowGap="s20">
        <Box rowGap="s20" mt="s8">
          <FormTextInput
            isUnderlinedVersion
            placeholder="Recipe name"
            label="New recipe name"
            name="label"
            control={control}
          />
          <FormTextInput
            isUnderlinedVersion
            placeholder="Serving size"
            label="Serving Size of the portion being logged"
            name="serv_size"
            keyboardType="number-pad"
            control={control}
          />
          <FormTextInput
            isUnderlinedVersion
            placeholder="Serving unit"
            label="Serving unit, (grams, slice, spoon, etc...)"
            name="serv_unit"
            control={control}
          />
        </Box>

        <Box>
          <Box style={{marginHorizontal: -20}} mb="s8">
            <Separator />
          </Box>
          <Box
            flexDirection="row"
            justifyContent={'space-between'}
            alignItems="center">
            <Text preset="paragraphLarge" font="medium">
              {recipeItems.size} Ingredients
            </Text>
            <OptionsDropdown
              items={list}
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
              <Ingredient
                food={item.food}
                quantity={item.quantity}
                isEditing={true}
                onEdit={() => {
                  /* handle edit */
                }}
                onDelete={() => removeFoodFromRecipe(item.food.id)}
              />
            )}
          />
        </Box>

        <Box>
          <Box style={{marginHorizontal: -20}} mb="s8">
            <Separator />
          </Box>
          <Text preset="paragraphLarge" font="medium">
            Recipe Totals
          </Text>
          <NutritionalInfo values={calculateTotals(recipeItems)} />
        </Box>
      </Box>
      <Box>
        <Box style={{marginHorizontal: -20}} mt="s24">
          <Separator />
        </Box>
        <Box flexDirection="row" paddingTop={'s14'} justifyContent={'flex-end'}>
          <ButtonText
            title={'Save Recipe'}
            disabled={!formState.isValid}
            onPress={onSubmit}
          />
        </Box>
      </Box>
    </ScrollView>
  );
}
