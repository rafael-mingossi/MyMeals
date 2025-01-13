import React, {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

import {useAppSafeArea, useAppTheme} from '@hooks';

import {Box, BoxProps} from '../Box/Box';

import {ScrollViewContainer, ScreenHeader, ViewContainer} from './components';

export interface ScreenProps extends BoxProps {
  children: ReactNode;
  HeaderComponent?: ReactNode;
  canGoBack?: boolean;
  screenScrollType?: 'scrollView' | 'scrollViewAuth' | 'viewContainer';
  title?: string;
  noPaddingHorizontal?: boolean;
}

export function Screen({
  children,
  HeaderComponent,
  canGoBack = false,
  screenScrollType = 'scrollView',
  noPaddingHorizontal = false,
  style,
  title,
  ...boxProps
}: ScreenProps) {
  const {top, bottom} = useAppSafeArea();
  const {colors} = useAppTheme();

  const $boxWrapper: BoxProps = {
    backgroundColor:
      screenScrollType === 'scrollViewAuth'
        ? 'backgroundScreen'
        : 'headerInner',
  };

  const Container =
    screenScrollType === 'viewContainer' ? ViewContainer : ScrollViewContainer;

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container
        backgroundColor={
          screenScrollType === 'scrollViewAuth'
            ? colors.backgroundScreen
            : colors.background
        }>
        <Box
          style={[{paddingBottom: bottom}, style]}
          paddingHorizontal={noPaddingHorizontal ? undefined : 's10'}
          {...boxProps}>
          <Box
            {...$boxWrapper}
            style={{paddingTop: top}}
            marginHorizontal={noPaddingHorizontal ? undefined : 's10n'}>
            <ScreenHeader
              paddingHorizontal={noPaddingHorizontal ? undefined : 's10'}
              HeaderComponent={HeaderComponent}
              canGoBack={canGoBack}
              title={title}
            />
          </Box>
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
