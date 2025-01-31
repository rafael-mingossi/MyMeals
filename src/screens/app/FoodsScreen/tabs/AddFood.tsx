import React from 'react';
import {ScrollView} from 'react-native';

import {FoodMode, Foods} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {
  Box,
  ButtonText,
  CategoryDropdown,
  FormTextInput,
  SeparatorBox,
  Text,
} from '@components';

import {useFood} from '../hooks/useFood.ts';

import {addFoodSchema} from './addFoodSchema.ts';

type InitialFoodData = {
  label?: string;
  servSize?: string;
  servUnit?: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  calories?: number;
  fibre?: number;
  sodium?: number;
  category_id?: number;
};

type AddFoodProps = {
  mode: FoodMode;
  initialData?: InitialFoodData;
  existingFood?: Foods;
};

export type FormInputValues = {
  label: string;
  category_id: number;
  protein: string;
  carbs: string;
  fat: string;
  calories: string;
  fibre: string;
  sodium: string;
  serv_size: string;
  serv_unit: string;
};

export function AddFood({
  mode = 'create',
  initialData,
  existingFood,
}: AddFoodProps) {
  const {control, formState, handleSubmit, setValue, watch, reset} =
    useForm<FormInputValues>({
      resolver: zodResolver(addFoodSchema),
      defaultValues: {
        label:
          mode === 'update' ? existingFood?.label : (initialData?.label ?? ''),
        category_id:
          mode === 'update'
            ? (existingFood?.categoryId ?? 1)
            : (initialData?.category_id ?? 1),
        protein:
          mode === 'update'
            ? existingFood?.protein?.toFixed(0).toString()
            : (initialData?.protein?.toString() ?? ''),
        carbs:
          mode === 'update'
            ? existingFood?.carbs?.toFixed(0).toString()
            : (initialData?.carbs?.toString() ?? ''),
        fat:
          mode === 'update'
            ? existingFood?.fat?.toFixed(0).toString()
            : (initialData?.fat?.toString() ?? ''),
        calories:
          mode === 'update'
            ? existingFood?.calories?.toFixed(0).toString()
            : (initialData?.calories?.toString() ?? ''),
        fibre:
          mode === 'update'
            ? existingFood?.fibre?.toFixed(0).toString()
            : (initialData?.fibre?.toString() ?? ''),
        sodium:
          mode === 'update'
            ? existingFood?.sodium?.toFixed(0).toString()
            : (initialData?.sodium?.toString() ?? ''),
        serv_size:
          mode === 'update'
            ? existingFood?.servSize.toString()
            : (initialData?.servSize?.toString() ?? ''),
        serv_unit:
          mode === 'update'
            ? existingFood?.servUnit?.toString()
            : (initialData?.servUnit?.toString() ?? ''),
      },
      mode: 'onChange',
    });

  const {isPendingUpdate, isPendingAdd, onSubmit} = useFood(
    existingFood?.id ?? 0,
    mode,
    reset,
  );

  const selectedCategoryId = watch('category_id');

  return (
    <ScrollView
      style={{marginTop: 10, paddingHorizontal: 16}}
      showsVerticalScrollIndicator={false}>
      <Box rowGap="s20">
        <CategoryDropdown
          value={selectedCategoryId}
          onChange={category => setValue('category_id', category.id)}
          error={formState.errors.category_id?.message}
        />
        <FormTextInput
          isUnderlinedVersion
          placeholder="Food name"
          label="New food name"
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
      <Text preset="paragraphLarge" font="medium" mt="s24">
        All Nutrients
      </Text>
      <SeparatorBox />
      <Box padding={'s16'} rowGap={'s10'} mb={'s24'}>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Calories</Text>
          <FormTextInput
            name="calories"
            fieldUnit={'cals'}
            control={control}
            keyboardType="number-pad"
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Protein</Text>
          <FormTextInput
            name="protein"
            fieldUnit={'g'}
            control={control}
            keyboardType="number-pad"
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Carbs</Text>
          <FormTextInput
            name="carbs"
            fieldUnit={'g'}
            control={control}
            keyboardType="number-pad"
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Fat</Text>
          <FormTextInput
            name="fat"
            control={control}
            keyboardType="number-pad"
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Fibre</Text>
          <FormTextInput
            name="fibre"
            fieldUnit={'g'}
            control={control}
            keyboardType="number-pad"
          />
        </Box>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text font={'semiBold'}>Sodium</Text>
          <FormTextInput
            name="sodium"
            fieldUnit={'mg'}
            control={control}
            keyboardType="number-pad"
          />
        </Box>
      </Box>
      <SeparatorBox />
      <Box
        flexDirection="row"
        columnGap="s10"
        paddingVertical={'s14'}
        justifyContent={'flex-end'}>
        <ButtonText title={'Reset'} onPress={() => reset()} />
        <ButtonText
          title={mode === 'update' ? 'Update' : 'Save'}
          onPress={handleSubmit(onSubmit)}
          disabled={!formState.isValid || isPendingAdd || isPendingUpdate}
        />
      </Box>
    </ScrollView>
  );
}
