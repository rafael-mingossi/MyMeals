import React, {useCallback, useMemo} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useMealItems} from '@services';
import {calcRecipeMacros} from '@utils';
import {useForm, useWatch} from 'react-hook-form';

import {
  Box,
  ButtonText,
  Chart,
  FormTextInput,
  ItemHeader,
  ItemServing,
  Screen,
  SeparatorBox,
  Text,
} from '@components';
import {AppScreenProps} from '@routes';

import {
  recipeDetailsSchema,
  RecipeDetailsSchema,
} from './recipeDetailsSchema.ts';

export function RecipeDetailsScreen({
  route,
  navigation,
}: AppScreenProps<'RecipeDetailsScreen'>) {
  const item = route?.params?.item;
  const isEditing = route?.params?.isViewOnly;
  const mealType = route?.params.mealType;

  const {toggleMealItem} = useMealItems();
  const {control, formState, handleSubmit} = useForm<RecipeDetailsSchema>({
    resolver: zodResolver(recipeDetailsSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = useWatch({
    control,
    name: 'quantity',
    defaultValue: 1,
  });

  const calculatedValues = useMemo(
    () => calcRecipeMacros.calculateRecipeMacros(item, quantity),
    [quantity, item],
  );

  const renderNutrientRow = useCallback(
    (label: string, value: number, unit: string) => (
      <Box flexDirection={'row'} justifyContent={'space-between'}>
        <Text font={'semiBold'}>{label}</Text>
        <Text>
          {value.toFixed(0)} {unit}
        </Text>
      </Box>
    ),
    [],
  );

  const onSubmit = handleSubmit(data => {
    // const itemWithCreatedAtString = {
    //   ...item,
    //   createdAt: new Date(),
    //   recipeItems: item.recipeItems?.map(itemRec => ({
    //     ...itemRec,
    //     createdAt: new Date(),
    //   })),
    // };

    if (mealType) {
      toggleMealItem('recipe', item, data.quantity, 'quantity');
      navigation.goBack();
    }
  });

  return (
    <Screen canGoBack>
      <Box marginTop="s14" rowGap={'s14'}>
        <ItemHeader prop={item?.label} selectedCategory={'recipes'} />
        {!isEditing && (
          <Box>
            <SeparatorBox />
            <Text
              font={'semiBold'}
              preset={'paragraphLarge'}
              marginVertical={'s8'}>
              Quantity:
            </Text>
            <FormTextInput
              keyboardType="decimal-pad"
              placeholder="1"
              name="quantity"
              fieldUnit=""
              control={control}
            />
          </Box>
        )}
        <ItemServing
          prop={item?.servUnit}
          calculatedValues={calculatedValues}
        />
        <Box>
          <SeparatorBox />
          <Text
            font={'semiBold'}
            preset={'paragraphLarge'}
            marginVertical={'s8'}>
            Recipe items:
          </Text>
        </Box>
        <Box>
          <SeparatorBox />
          <Text
            font={'semiBold'}
            preset={'paragraphLarge'}
            marginVertical={'s8'}>
            Total macros:
          </Text>
          <Box rowGap={'s10'} mt={'s14'} paddingHorizontal={'s10'}>
            {renderNutrientRow(
              'Protein',
              calculatedValues.totalProtein,
              'grams',
            )}
            {renderNutrientRow('Fat', calculatedValues.totalFat, 'grams')}
            {renderNutrientRow('Carbs', calculatedValues.totalCarbs, 'grams')}
            {renderNutrientRow('Fibre', calculatedValues.totalFibre, 'grams')}
            {renderNutrientRow('Sodium', calculatedValues.totalSodium, 'mgs')}
          </Box>
        </Box>
        <Box>
          <SeparatorBox />
          <Text
            font={'semiBold'}
            preset={'paragraphLarge'}
            marginVertical={'s8'}>
            Macros chart:
          </Text>
          <Chart item={item} quantity={!quantity ? 1 : quantity} />
        </Box>
      </Box>
      {!isEditing && (
        <Box>
          <SeparatorBox />
          <Box mt={'s8'} alignSelf={'flex-end'}>
            <ButtonText
              title={'Add Item'}
              disabled={!formState.isValid}
              onPress={onSubmit}
            />
          </Box>
        </Box>
      )}
    </Screen>
  );
}
