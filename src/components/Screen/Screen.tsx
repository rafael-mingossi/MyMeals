import React, {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

import {useAppSafeArea, useAppTheme} from '@hooks';

import {Box, BoxProps} from '../Box/Box';

import {
  ScrollViewContainer,
  ViewContainer,
  ScreenHeader,
  ScrollAuthViewContainer,
} from './components';

export interface ScreenProps extends BoxProps {
  children: ReactNode;
  HeaderComponent?: ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
  screenScrollType?: 'scrollView' | 'scrollViewAuth' | 'viewContainer';
  title?: string;
  noPaddingHorizontal?: boolean;
}

export function Screen({
  children,
  HeaderComponent,
  canGoBack = false,
  scrollable = false,
  screenScrollType = 'viewContainer',
  noPaddingHorizontal = false,
  style,
  title,
  ...boxProps
}: ScreenProps) {
  const {top, bottom} = useAppSafeArea();
  const {colors} = useAppTheme();

  // const Container = scrollable ? ScrollViewContainer : ViewContainer;

  let Container;

  const scrollTypeCondition = `${screenScrollType}-${scrollable}`;

  switch (scrollTypeCondition) {
    case 'scrollViewAuth-true':
      Container = ScrollAuthViewContainer;
      break;
    case 'scrollView-true':
      Container = ScrollViewContainer;
      break;
    case 'viewContainer-false':
      Container = ViewContainer;
      break;
    default:
      Container = ViewContainer;
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container
        backgroundColor={
          scrollTypeCondition === 'scrollViewAuth-true'
            ? colors.backgroundScreen
            : colors.background
        }>
        <Box
          style={[{paddingBottom: bottom}, style]}
          paddingHorizontal={noPaddingHorizontal ? undefined : 's16'}
          {...boxProps}>
          <Box
            {...$boxWrapper}
            style={{paddingTop: top}}
            marginHorizontal={noPaddingHorizontal ? undefined : 's16n'}>
            <ScreenHeader
              paddingHorizontal={noPaddingHorizontal ? undefined : 's16'}
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

const $boxWrapper: BoxProps = {
  backgroundColor: 'headerInner',
};
