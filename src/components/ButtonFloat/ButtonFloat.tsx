import React, {ReactElement} from 'react';

import {TouchableOpacityBox, TouchableOpacityBoxProps} from '@components';

import {buttonFloatPresets} from './buttonFloatPresets.ts';

export type ButtonFloatPreset = 'main' | 'secondary';

export interface ButtonFloatProps extends TouchableOpacityBoxProps {
  children: ReactElement;
  disabled?: boolean;
  preset?: ButtonFloatPreset;
}

export function ButtonFloat({
  children,
  disabled,
  preset = 'main',
  ...touchableOpacityBoxProps
}: ButtonFloatProps) {
  const buttonPreset =
    buttonFloatPresets[preset][disabled ? 'disabled' : 'default'];

  return (
    <TouchableOpacityBox
      disabled={disabled}
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius="s12"
      {...buttonPreset.container}
      {...touchableOpacityBoxProps}>
      {children}
    </TouchableOpacityBox>
  );
}
