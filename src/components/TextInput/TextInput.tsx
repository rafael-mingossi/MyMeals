import React, {ReactElement, useRef} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import {useAppTheme} from '@hooks';
import {colours} from '@theme';

import {Box, BoxProps} from '../Box/Box';
import {Text, $fontFamily, $fontSizes} from '../Text/Text';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  RightComponent?: ReactElement;
  LeftComponent?: ReactElement;
  boxProps?: BoxProps;
  containerProps?: BoxProps;
}

export function TextInput({
  label,
  errorMessage,
  RightComponent,
  LeftComponent,
  boxProps,
  containerProps,
  ...rnTextInputProps
}: TextInputProps) {
  const {colors} = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  const $textInputContainer: BoxProps = {
    borderWidth: errorMessage ? 2 : 1,
    padding: 's16',
    borderRadius: 's12',
    borderColor: errorMessage ? 'error' : 'gray4',
  };

  return (
    <Box flexGrow={1} flexShrink={1} {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text preset="paragraphMedium" marginBottom="s4">
            {label}
          </Text>
        )}
        <Box
          {...$textInputContainer}
          flexDirection="row"
          {...containerProps}
          backgroundColor="white">
          {LeftComponent && (
            <Box mr="s16" justifyContent="center">
              {LeftComponent}
            </Box>
          )}
          <RNTextInput
            ref={inputRef}
            placeholderTextColor={colors.gray2}
            autoCapitalize="none"
            style={$textInputStyle}
            {...rnTextInputProps}
          />
          {RightComponent && (
            <Box ml="s16" justifyContent="center">
              {RightComponent}
            </Box>
          )}
        </Box>
        {errorMessage && (
          <Text preset="paragraphSmall" font="bold" color="error">
            {errorMessage}
          </Text>
        )}
      </Pressable>
    </Box>
  );
}

export const $textInputStyle = {
  flexGrow: 1,
  flexShrink: 1,
  padding: 0,
  color: colours.palette.black,
  fontFamily: $fontFamily.regular,
  ...$fontSizes.paragraphMedium,
};
