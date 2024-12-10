import React, {ReactElement, useRef} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import {useAppTheme} from '@hooks';
import {colours} from '@theme';

import {Box, BoxProps} from '../Box/Box';
import {$fontFamily, $fontSizes} from '../Text/Text';

export interface SearchInputProps extends RNTextInputProps {
  errorMessage?: string;
  containerProps?: BoxProps;
  LeftComponent?: ReactElement;
}

export function SearchInput({
  errorMessage,
  containerProps,
  LeftComponent,
  ...rnTextInputProps
}: SearchInputProps) {
  const {colors} = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  const $textInputContainer: BoxProps = {
    borderWidth: errorMessage ? 2 : 1,
    padding: 's14',
    borderRadius: 's12',
    borderColor: errorMessage ? 'error' : 'gray4',
  };

  return (
    <Box marginVertical="s14">
      <Pressable onPress={focusInput}>
        <Box
          {...$textInputContainer}
          flexDirection="row"
          {...containerProps}
          backgroundColor="backgroundInner">
          {LeftComponent && (
            <Box mr="s16" justifyContent="center">
              {LeftComponent}
            </Box>
          )}
          <RNTextInput
            ref={inputRef}
            placeholderTextColor={colors.gray2}
            autoCapitalize="none"
            style={$searchInputStyle}
            {...rnTextInputProps}
          />
        </Box>
      </Pressable>
    </Box>
  );
}

const $searchInputStyle = {
  flexGrow: 1,
  flexShrink: 1,
  padding: 0,
  color: colours.palette.black,
  fontFamily: $fontFamily.regular,
  ...$fontSizes.paragraphMedium,
};
