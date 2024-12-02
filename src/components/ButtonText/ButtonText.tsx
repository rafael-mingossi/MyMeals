import React from 'react';

import {Text} from '@components';

import {TouchableOpacityBox, TouchableOpacityBoxProps} from '../Box/Box';

export interface ButtonTextProps extends TouchableOpacityBoxProps {
  title: string;
  disabled?: boolean;
  variant?: 'green' | 'blue';
}

export function ButtonText({
  title,
  disabled,
  variant = 'blue',
  ...touchableOpacityBoxProps
}: ButtonTextProps) {
  return (
    <TouchableOpacityBox padding={'s10'} {...touchableOpacityBoxProps}>
      <Text
        color={variant === 'blue' ? 'bluePrimary' : 'greenPrimary'}
        font="semiBold"
        letterSpacing={0.6}>
        {title}
      </Text>
    </TouchableOpacityBox>
  );
}
