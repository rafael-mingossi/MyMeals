import React, {ReactElement} from 'react';

import {TouchableOpacityBox, TouchableOpacityBoxProps} from '@components';

export interface ButtonFloatProps extends TouchableOpacityBoxProps {
  children: ReactElement;
  disabled?: boolean;
}

export function ButtonFloat({
  children,
  disabled,
  ...touchableOpacityBoxProps
}: ButtonFloatProps) {
  return (
    <TouchableOpacityBox
      style={{position: 'absolute', bottom: 10, right: 20}}
      disabled={disabled}
      padding="s14"
      backgroundColor={'bluePrimary'}
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius="s12"
      {...touchableOpacityBoxProps}>
      {children}
    </TouchableOpacityBox>
  );
}
