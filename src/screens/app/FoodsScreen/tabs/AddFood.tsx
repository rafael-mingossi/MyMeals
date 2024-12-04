import React from 'react';

import {AddFoodParams, useAddFood} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuthCredentials} from '@services';
import {useForm} from 'react-hook-form';

import {
  Box,
  ButtonText,
  CategoryDropdown,
  FormTextInput,
  Separator,
  Text,
} from '@components';

import {addFoodSchema, AddFoodSchema} from './addFoodSchema.ts';

export function AddFood() {
  const {authCredentials} = useAuthCredentials();

  const {control, formState, handleSubmit, setValue, watch, reset} =
    useForm<AddFoodSchema>({
      resolver: zodResolver(addFoodSchema),
      defaultValues: {
        label: '',
        category_id: 1,
        protein: undefined,
        carbs: undefined,
        fat: undefined,
        calories: undefined,
        fibre: undefined,
        sodium: undefined,
        serv_size: undefined,
        serv_unit: '',
      },
      mode: 'onChange',
    });

  const {mutate: addFood, isPending} = useAddFood({
    onSuccess: () => {
      console.log('FOOD WAS ADDED');
      reset();
    },
    onError: error => {
      console.error(error);
    },
  });

  const onSubmit = handleSubmit(data => {
    if (!authCredentials?.session.user.id) {
      return;
    }

    const foodData: AddFoodParams = {
      user_id: authCredentials.session.user.id,
      label: data.label,
      category_id: data.category_id,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
      calories: data.calories,
      fibre: data.fibre ?? 0,
      sodium: data.sodium ?? 0,
      serv_size: data.serv_size,
      serv_unit: data.serv_unit,
      food_img: '',
    };

    addFood(foodData);
  });

  const selectedCategoryId = watch('category_id');

  return (
    <Box paddingVertical="s16">
      <Text preset="paragraphLarge" font="medium">
        General details
      </Text>
      <Box style={{marginHorizontal: -20}}>
        <Separator />
      </Box>
      <Box rowGap="s20" mt={'s20'}>
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
      <Box style={{marginHorizontal: -20}}>
        <Separator />
      </Box>
      <Box padding={'s16'} rowGap={'s10'}>
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
      <Box style={{marginHorizontal: -20}} mt="s24">
        <Separator />
      </Box>
      <Box
        flexDirection="row"
        columnGap="s10"
        paddingTop={'s10'}
        justifyContent={'flex-end'}>
        <ButtonText title={'Reset'} onPress={() => reset()} />
        <ButtonText
          title={'Save'}
          onPress={onSubmit}
          disabled={!formState.isValid || isPending}
        />
      </Box>
    </Box>
  );
}
