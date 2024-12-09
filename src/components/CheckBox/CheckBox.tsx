import React from 'react';

import {TouchableOpacityBox, Text, Box} from '@components';

interface CheckBoxProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  label?: string;
}

export function CheckBox({isChecked, onChange, label}: CheckBoxProps) {
  return (
    <TouchableOpacityBox
      flexDirection={'row'}
      alignItems={'center'}
      onPress={() => {
        onChange(!isChecked);
      }}>
      <Box
        width={22}
        height={22}
        backgroundColor={isChecked ? 'bluePrimary' : 'background'}
        borderColor={isChecked ? 'bluePrimary' : 'gray4'}
        borderWidth={2}
        borderRadius={'s2'}
        alignItems={'center'}
        justifyContent={'center'}>
        {isChecked ? (
          <Text
            preset={'paragraphSmall'}
            color={isChecked ? 'background' : 'primary'}>
            ✓
          </Text>
        ) : null}
      </Box>
      <Text font={'semiBold'}>{label}</Text>
    </TouchableOpacityBox>
  );
}
