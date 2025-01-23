import React, {ReactElement, useRef} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import {useAppColor} from '@services';

import {useAppTheme} from '@hooks';

import {Box, BoxProps} from '../Box/Box';
import {Text, $fontFamily, $fontSizes} from '../Text/Text';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  isUnderlinedVersion?: boolean;
  RightComponent?: ReactElement;
  LeftComponent?: ReactElement;
  boxProps?: BoxProps;
  containerProps?: BoxProps;
  fieldUnit?: 'g' | 'cals' | 'mg' | 'cm' | 'm' | 'kg' | '';
}

export function TextInput({
  label,
  errorMessage,
  isUnderlinedVersion = false,
  RightComponent,
  LeftComponent,
  boxProps,
  containerProps,
  fieldUnit = 'g',
  ...rnTextInputProps
}: TextInputProps) {
  const appColor = useAppColor();
  const {colors} = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  const $textInputContainer: BoxProps = {
    borderBottomWidth: errorMessage ? 2 : 1,
    padding: 's16',
    borderTopLeftRadius: 's8',
    borderTopEndRadius: 's8',
    borderColor: errorMessage ? 'error' : 'backgroundContrast',
  };

  const $inputLine: BoxProps = {
    borderBottomWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? 'error' : 'backgroundContrast',
    width: 90,
  };

  return (
    <Box flexShrink={1} {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text preset="paragraphMedium" marginBottom="s4">
            {label}
          </Text>
        )}
        {isUnderlinedVersion ? (
          <Box
            {...$textInputContainer}
            flexDirection="row"
            {...containerProps}
            backgroundColor="backgroundInner">
            {LeftComponent && (
              <Box mr="s16" justifyContent="center" mt="s2">
                {LeftComponent}
              </Box>
            )}
            <RNTextInput
              ref={inputRef}
              placeholderTextColor={colors.gray2}
              autoCapitalize="none"
              style={[
                $textInputStyle,
                {color: appColor === 'dark' ? 'white' : 'black'},
              ]}
              {...rnTextInputProps}
            />
            {RightComponent && (
              <Box ml="s16" justifyContent="center">
                {RightComponent}
              </Box>
            )}
          </Box>
        ) : (
          <Box columnGap={'s8'} flexDirection="row">
            <Box {...$inputLine}>
              <RNTextInput
                ref={inputRef}
                placeholderTextColor={colors.gray2}
                autoCapitalize="none"
                style={[
                  $textInputStyle,
                  {
                    color: appColor === 'dark' ? 'white' : 'black',
                    textAlign: 'right',
                  },
                ]}
                {...rnTextInputProps}
              />
            </Box>
            <Box>
              <Text style={{width: 37}} font="semiBold">
                {fieldUnit}
              </Text>
            </Box>
          </Box>
        )}
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
  fontFamily: $fontFamily.regular,
  ...$fontSizes.paragraphMedium,
};
