import React, {useState} from 'react';
import {StyleSheet, Animated, Dimensions} from 'react-native';

import {Box, Text, TouchableOpacityBox} from '@components';
import {colours} from '@theme';

const {width} = Dimensions.get('window');

const activeColor = colours.palette.greenPrimary;

interface CustomTabMenuProps {
  tabs: string[];
  initialTab?: number;
  onTabChange?: (index: number) => void;
}

export function CustomTabMenu({
  tabs,
  initialTab = 0,
  onTabChange,
}: CustomTabMenuProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [indicatorPosition] = useState(new Animated.Value(0));

  const handleTabPress = (index: number): void => {
    Animated.spring(indicatorPosition, {
      toValue: (width / tabs.length) * index,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();

    setActiveTab(index);
    onTabChange?.(index);
  };

  // Set a fixed width for each tab instead of using screen width
  // const tabWidth = Math.min(100, width / tabs.length); // Limit maximum width to 100
  const tabWidth = width / tabs.length; // Limit maximum width to 100

  const renderTwoLineText = (text: string, index: number) => {
    const words = text.split(' ');
    if (words.length !== 2) {
      return text;
    } // Fallback for non-two-word labels

    return (
      <Box alignItems="center">
        <Text
          preset="paragraphSmall"
          color={activeTab === index ? 'greenPrimary' : 'gray4'}
          font="semiBold">
          {words[0]}
        </Text>
        <Text
          preset="paragraphSmall"
          color={activeTab === index ? 'greenPrimary' : 'gray4'}
          font="semiBold">
          {words[1]}
        </Text>
      </Box>
    );
  };

  return (
    <Box backgroundColor="white" marginHorizontal="s16n">
      <Box
        justifyContent="center"
        alignItems="center"
        height={50}
        flexDirection="row">
        {tabs.map((tab, index) => (
          <TouchableOpacityBox
            key={index}
            width={tabWidth}
            onPress={() => handleTabPress(index)}
            activeOpacity={0.7}>
            {renderTwoLineText(tab, index)}
          </TouchableOpacityBox>
        ))}
      </Box>

      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabWidth,
            backgroundColor: activeColor,
            transform: [{translateX: indicatorPosition}],
          },
        ]}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: 3,
    position: 'absolute',
    bottom: 0,
  },
});
