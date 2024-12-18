import React from 'react';
import {Dimensions} from 'react-native';
import {Animated} from 'react-native';

import Svg, {Circle} from 'react-native-svg';

import {Box, Text} from '@components';
import {colours} from '@theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CalorieRingProps {
  currentCalories: number;
  goalCalories: number;
}

const screeWidth = Dimensions.get('screen').width;

export function CalorieRing({currentCalories, goalCalories}: CalorieRingProps) {
  const strokeWidth = 15;
  const size = screeWidth / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const percentage = currentCalories / goalCalories;

    Animated.timing(progressAnimation, {
      toValue: percentage,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [currentCalories, goalCalories, progressAnimation]);

  // Main progress circle dashoffset
  const strokeDashoffset = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  // Rounded cap circle dashoffset
  const roundedCapDashoffset = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <Box
      alignItems={'center'}
      justifyContent={'center'}
      paddingVertical={'s16'}>
      <Box position={'relative'}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colours.palette.gray4}
            strokeWidth={strokeWidth}
            // strokeLinecap="round"
            fill={'none'}
          />

          {/* Main Progress Circle (flat ends) */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colours.palette.greenPrimary}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            fill="none"
            // No strokeLinecap for flat ends
          />

          {/* Rounded Cap Circle */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colours.palette.greenPrimary}
            strokeWidth={strokeWidth}
            strokeDasharray={`1 ${circumference}`}
            strokeDashoffset={Animated.add(roundedCapDashoffset, -1)}
            strokeLinecap="round"
            fill="none"
          />

          <Box
            position={'absolute'}
            top={0}
            left={0}
            alignItems={'center'}
            justifyContent={'center'}
            width={size}
            height={size}>
            <Text
              preset={'headingLarge'}
              font={'semiBold'}
              color={'greenPrimary'}>
              {currentCalories.toLocaleString()}
            </Text>
            <Text mt={'s16'} color={'greenPrimary'}>
              Left
            </Text>
            <Text preset={'headingMedium'} color={'greenPrimary'}>
              {(goalCalories - currentCalories).toLocaleString()}
            </Text>
          </Box>
        </Svg>
      </Box>
    </Box>
  );
}
