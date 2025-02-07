import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

import Svg, {Rect} from 'react-native-svg';

import {Box, Text} from '@components';
import {colours} from '@theme';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

type AnimatedBarProps = {
  total: number;
  current: number;
  label: string;
};

export function AnimatedBar({total, current, label}: AnimatedBarProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const colorProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const progressPercentage = Math.min((current / total) * 100, 100);
    const isOverLimit = current > total ? 1 : 0;

    // Animate both progress and color
    Animated.parallel([
      Animated.timing(progress, {
        toValue: progressPercentage,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(colorProgress, {
        toValue: isOverLimit,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [current, total, progress, colorProgress]);

  const animatedColor = colorProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [colours.palette.greenPrimary, colours.palette.orangePrimary],
  });

  return (
    <Box width={'100%'} marginVertical={'s10'}>
      <Text font={'semiBold'} preset={'paragraphSmall'} mb={'s4'}>
        {label} {current}g {current > total ? `(over ${current - total}g)` : ''}
      </Text>
      <Box height={8} position={'relative'}>
        <Svg width="100%" height="8">
          {/* Background Bar */}
          <Rect
            width="100%"
            height="8"
            rx="2.5"
            ry="2.5"
            fill={colours.palette.gray4}
          />
          {/* Foreground Bar */}
          <AnimatedRect
            height="8"
            rx="2.5"
            ry="2.5"
            fill={animatedColor}
            width={progress.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            })}
          />
        </Svg>
      </Box>
      <Text
        mt={'s4'}
        color={'gray'}
        style={{alignSelf: 'flex-end'}}
        preset={'paragraphSmall'}>
        {total}g
      </Text>
    </Box>
  );
}
