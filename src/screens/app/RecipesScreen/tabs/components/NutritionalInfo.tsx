import React from 'react';

import {Box, Text} from '@components';

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
