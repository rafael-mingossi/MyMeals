import React from 'react';

import {Text} from '@components';

import {TouchableOpacityBox, TouchableOpacityBoxProps} from '../Box/Box';

export interface ButtonTextProps extends TouchableOpacityBoxProps {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'green' | 'blue';
}

export function ButtonText({
  title,
  disabled,
  loading,
  variant = 'blue',
  ...touchableOpacityBoxProps
}: ButtonTextProps) {
  return (
    <TouchableOpacityBox
      padding={'s10'}
      disabled={disabled || loading}
      {...touchableOpacityBoxProps}>
      <Text
        color={variant === 'blue' ? 'bluePrimary' : 'greenPrimary'}
        font="semiBold"
        letterSpacing={0.6}>
        {title}
      </Text>
    </TouchableOpacityBox>
  );
}
