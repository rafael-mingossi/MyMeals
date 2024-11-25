import React from 'react';

import {Box, PressableBox} from '../Box/Box';

export type RadioButtonProps = {
  isSelected: boolean;
  onPress: () => void;
};

export function RadioButton({isSelected, onPress}: RadioButtonProps) {
  return (
    <PressableBox
      hitSlop={10}
      onPress={onPress}
      height={20}
      width={20}
      borderRadius="s12"
      borderWidth={isSelected ? 2 : 1}
      borderColor={isSelected ? 'primary' : 'onBackgroundGray2'}
      justifyContent="center"
      alignItems="center">
      <Box
        height={12}
        width={12}
        borderRadius="s12"
        backgroundColor={isSelected ? 'primary' : undefined}
      />
    </PressableBox>
  );
}
