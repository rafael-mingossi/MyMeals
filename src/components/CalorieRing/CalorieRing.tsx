import React from 'react';
import {Dimensions} from 'react-native';

import Animated, {
  useAnimatedProps,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';

import {Box, Text} from '@components';
import {colours} from '@theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CalorieRingProps {
  currentCalories: number;
  goalCalories: number;
  strokeWidth: number;
}

const screeWidth = Dimensions.get('screen').width;

export function CalorieRing({
  currentCalories,
  goalCalories,
  strokeWidth,
}: CalorieRingProps) {
  const size = screeWidth / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  console.log({screeWidth});
  const progress = useSharedValue(0);

  React.useEffect(() => {
    const percentage = currentCalories / goalCalories;
    progress.value = withTiming(percentage, {
      duration: 1500,
    });
  }, [currentCalories, goalCalories, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

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

          {/* First AnimatedCircle with flat ends */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colours.palette.greenPrimary}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            fill={'none'}
            // No strokeLinecap here - will be flat
          />

          {/* Second AnimatedCircle just for the rounded end */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colours.palette.greenPrimary}
            strokeWidth={strokeWidth}
            strokeDasharray={`0 ${circumference}`}
            animatedProps={useAnimatedProps(() => ({
              strokeDasharray: `1 ${circumference}`,
              strokeDashoffset: circumference * (1 - progress.value) - 1,
            }))}
            strokeLinecap="round"
            fill={'none'}
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
