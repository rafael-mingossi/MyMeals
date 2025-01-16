import React, {ReactNode, useCallback, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  LayoutChangeEvent,
  View,
} from 'react-native';

import {useAppSafeArea} from '@hooks';

import {Box, BoxProps} from '../Box/Box';

import {ScreenHeader} from './components';

interface FixedComponentConfig {
  enabled: boolean;
  component: ReactNode;
}

interface ScreenWithFixedProps extends BoxProps {
  children: ReactNode;
  HeaderComponent?: ReactNode;
  canGoBack?: boolean;
  title?: string;
  noPaddingHorizontal?: boolean;
  fixedHeader?: boolean;
  fixedTabs?: FixedComponentConfig;
  fixedSearch?: FixedComponentConfig;
  fixedCalendar?: FixedComponentConfig;
}

export function ScreenFixedHeader({
  children,
  HeaderComponent,
  canGoBack = false,
  noPaddingHorizontal = false,
  title,
  fixedHeader = true,
  fixedTabs,
  fixedSearch,
  fixedCalendar,
  ...boxProps
}: ScreenWithFixedProps) {
  const {top, bottom} = useAppSafeArea();

  // Refs for measuring component heights
  const headerRef = useRef<View>(null);
  const tabsRef = useRef<View>(null);
  const searchRef = useRef<View>(null);
  const calendarRef = useRef<View>(null);

  // State for component heights
  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabsHeight, setTabsHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [calendarHeight, setCalendarHeight] = useState(0);

  // Handle layout measurements
  const onHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    setHeaderHeight(height);
  }, []);

  const onTabsLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    setTabsHeight(height);
  }, []);

  const onSearchLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    setSearchHeight(height);
  }, []);

  const onCalendarLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    setCalendarHeight(height);
  }, []);

  // Calculate total fixed height
  const totalFixedHeight =
    (fixedHeader ? headerHeight : 0) +
    (fixedTabs?.enabled ? tabsHeight : 0) +
    (fixedSearch?.enabled ? searchHeight : 0) +
    (fixedCalendar?.enabled ? calendarHeight : 0);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Box backgroundColor={'background'} flex={1}>
        {/* Fixed Header */}
        {fixedHeader && (
          <Box
            style={{paddingTop: top}}
            ref={headerRef}
            onLayout={onHeaderLayout}
            position="absolute"
            top={0}
            left={0}
            right={0}
            zIndex={2}
            backgroundColor="headerInner">
            <ScreenHeader
              paddingHorizontal={noPaddingHorizontal ? undefined : 's16'}
              HeaderComponent={HeaderComponent}
              canGoBack={canGoBack}
              title={title}
            />
          </Box>
        )}

        {/* Fixed Tabs */}
        {fixedTabs?.enabled && fixedTabs.component && (
          <Box
            style={{paddingTop: fixedHeader ? undefined : top}}
            ref={tabsRef}
            onLayout={onTabsLayout}
            position="absolute"
            top={fixedHeader ? headerHeight : 0}
            left={0}
            right={0}
            zIndex={2}
            backgroundColor="headerInner">
            {fixedTabs.component}
          </Box>
        )}

        {/* Fixed Search */}
        {fixedSearch?.enabled && fixedSearch.component && (
          <Box
            style={{
              paddingTop: fixedHeader || fixedTabs?.enabled ? undefined : top,
            }}
            ref={searchRef}
            onLayout={onSearchLayout}
            position="absolute"
            top={headerHeight + tabsHeight}
            left={0}
            right={0}
            zIndex={2}
            backgroundColor="headerInner">
            {fixedSearch.component}
          </Box>
        )}

        {/*Fixed Calendar*/}
        {fixedCalendar?.enabled && fixedCalendar.component && (
          <Box
            style={{
              paddingTop:
                fixedHeader || fixedTabs?.enabled || fixedSearch?.enabled
                  ? undefined
                  : top,
            }}
            ref={calendarRef}
            onLayout={onCalendarLayout}
            position="absolute"
            top={headerHeight + tabsHeight + searchHeight}
            left={0}
            right={0}
            zIndex={2}
            backgroundColor="headerInner">
            {fixedCalendar.component}
          </Box>
        )}

        {/* Scrollable Content */}
        <Box
          style={{
            marginTop: totalFixedHeight,
            paddingBottom: bottom,
            flexGrow: 1,
          }}
          // contentContainerStyle={{
          //   flexGrow: 1, // This allows content to grow but still be scrollable
          // }}
        >
          <Box
            flex={1}
            paddingHorizontal={noPaddingHorizontal ? undefined : 's10'}
            {...boxProps}>
            {children}
          </Box>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
}
