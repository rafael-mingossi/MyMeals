import React, {useCallback, useMemo} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {macrosCalculations} from '@utils';
import {useForm, useWatch} from 'react-hook-form';

import {
  Box,
  ButtonText,
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
}: AppScreenProps<'RecipeDetailsScreen'>) {
  const prop = route?.params?.item;
  const isEditing = route?.params?.isViewOnly;

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
    () => macrosCalculations.calculateRecipeMacros(prop, quantity),
    [quantity, prop],
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
    console.log(data);
  });

  return (
    <Screen canGoBack>
      <Box marginTop="s14" rowGap={'s14'}>
        <ItemHeader prop={prop?.label} selectedCategory={'recipes'} />
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
          prop={prop?.servUnit}
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
