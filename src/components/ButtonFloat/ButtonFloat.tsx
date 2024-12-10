import React, {ReactElement} from 'react';

import {TouchableOpacityBox, TouchableOpacityBoxProps} from '@components';

export interface ButtonFloatProps extends TouchableOpacityBoxProps {
  content: ReactElement;
  disabled?: boolean;
}

export function ButtonFloat({
  content,
  disabled,
  ...touchableOpacityBoxProps
}: ButtonFloatProps) {
  return (
    <TouchableOpacityBox
      style={{position: 'absolute', bottom: 20, right: 20}}
      disabled={disabled}
      padding="s32"
      backgroundColor={'bluePrimary'}
      alignItems={'center'}
      justifyContent={'center'}
      {...touchableOpacityBoxProps}>
      {content}
    </TouchableOpacityBox>
  );
}
