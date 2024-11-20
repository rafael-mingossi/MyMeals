import React, {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

import {useAppSafeArea, useAppTheme} from '@hooks';

import {Box, BoxProps} from '../Box/Box';

import {ScrollViewContainer, ViewContainer, ScreenHeader} from './components';

export interface ScreenProps extends BoxProps {
  children: ReactNode;
  HeaderComponent?: ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
  title?: string;
  noPaddingHorizontal?: boolean;
}

export function Screen({
  children,
  HeaderComponent,
  canGoBack = false,
  scrollable = false,
  noPaddingHorizontal = false,
  style,
  title,
  ...boxProps
}: ScreenProps) {
  const {top, bottom} = useAppSafeArea();
  const {colors} = useAppTheme();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container backgroundColor={colors.background}>
        <Box
          style={[{paddingTop: top, paddingBottom: bottom}, style]}
          paddingHorizontal={noPaddingHorizontal ? undefined : 's24'}
          {...boxProps}>
          <ScreenHeader
            paddingHorizontal={noPaddingHorizontal ? 's24' : undefined}
            HeaderComponent={HeaderComponent}
            canGoBack={canGoBack}
            title={title}
          />
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
