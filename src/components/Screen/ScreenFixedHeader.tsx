import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {useAppSafeArea, useAppTheme} from '@hooks';

import {Box, BoxProps} from '../Box/Box.tsx';

import {ScrollViewContainer, ScreenHeader} from './components';

interface FixedHeaderConfig {
  enabled: boolean;
  height?: number;
}

interface FixedTabConfig {
  enabled: boolean;
  height?: number;
}

interface FixedSearchConfig {
  enabled: boolean;
  height?: number;
}

interface ScreenWithFixedProps extends BoxProps {
  children: ReactNode;
  HeaderComponent?: ReactNode;
  canGoBack?: boolean;
  title?: string;
  noPaddingHorizontal?: boolean;
  fixedHeader?: FixedHeaderConfig;
  fixedTabs?: FixedTabConfig;
  fixedSearch?: FixedSearchConfig;
  TopComponent?: ReactNode; // For CustomTabMenu or other fixed components
  SearchComponent?: ReactNode;
}

export function ScreenFixedHeader({
  children,
  HeaderComponent,
  canGoBack = false,
  noPaddingHorizontal = false,
  title,
  fixedHeader = {enabled: false},
  fixedTabs = {enabled: false},
  fixedSearch = {enabled: false},
  TopComponent,
  SearchComponent,
  ...boxProps
}: ScreenWithFixedProps) {
  const {top, bottom} = useAppSafeArea();

  // Calculate fixed heights
  const headerHeight = fixedHeader.enabled
    ? (fixedHeader.height || 60) + top
    : 0;
  const tabsHeight = fixedTabs.enabled ? fixedTabs.height || 50 : 0;
  const searchHeight = fixedSearch.enabled ? fixedSearch.height || 50 : 0;

  const totalFixedHeight = headerHeight + tabsHeight + searchHeight;

  const {colors} = useAppTheme();

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Box flex={1} backgroundColor={'background'}>
        {/* Fixed Header */}
        {fixedHeader.enabled && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            zIndex={2}
            style={{height: headerHeight}}
            backgroundColor="headerInner">
            <Box style={{paddingTop: top}}>
              <ScreenHeader
                paddingHorizontal={noPaddingHorizontal ? undefined : 's16'}
                HeaderComponent={HeaderComponent}
                canGoBack={canGoBack}
                title={title}
              />
            </Box>
          </Box>
        )}

        {/* Fixed Tabs */}
        {fixedTabs.enabled && TopComponent && (
          <Box
            position="absolute"
            top={headerHeight}
            left={0}
            right={0}
            zIndex={2}
            style={{height: tabsHeight}}
            backgroundColor="headerInner">
            {TopComponent}
          </Box>
        )}

        {/* Fixed Search */}
        {fixedSearch.enabled && SearchComponent && (
          <Box
            position="absolute"
            top={headerHeight + tabsHeight}
            left={0}
            right={0}
            zIndex={2}
            style={{height: searchHeight}}
            backgroundColor="headerInner">
            {SearchComponent}
          </Box>
        )}

        {/* Scrollable Content */}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{
            flex: 1,
            marginTop: totalFixedHeight,
            paddingBottom: bottom,
          }}>
          <Box
            flex={1}
            paddingHorizontal={noPaddingHorizontal ? undefined : 's16'}
            {...boxProps}>
            {children}
          </Box>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}
