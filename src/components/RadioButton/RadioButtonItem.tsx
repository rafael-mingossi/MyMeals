import React from 'react';

import {Box} from '../Box/Box';
import {RadioButton, RadioButtonProps} from '../RadioButton/RadioButton';
import {Text} from '../Text/Text';

export type RadioButtonItemProps = RadioButtonProps & {
  label: string;
  description?: string;
};

export function RadioButtonItem({
  label,
  description,
  ...radioButtonProps
}: RadioButtonItemProps) {
  return (
    <Box paddingVertical="s16">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Text font="semiBold">{label}</Text>
        <RadioButton {...radioButtonProps} />
      </Box>
      {description && (
        <Text style={{width: '85%'}} color={'paragraph'}>
          {description}
        </Text>
      )}
    </Box>
  );
}
