import React from 'react';
import {Image} from 'react-native';

import {images} from '@assets';

import {Box, Text} from '@components';

export function AuthScreensHeader({title}: {title: string}) {
  return (
    <Box>
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mb="s60"
        mt="s60"
        columnGap="s8">
        <Image
          source={images.logo}
          style={{
            width: 60,
            height: 60,
          }}
        />
        <Text
          paddingTop="s16"
          preset="headingAuthTitle"
          font="extraBold"
          color="greenPrimary">
          <Text preset="headingAuthTitle" font="semiBold" color="greenPrimary">
            My
          </Text>
          Meals
        </Text>
      </Box>
      <Text
        preset="headingLarge"
        textAlign="center"
        mt="s32"
        mb="s32"
        font="semiBold">
        {title}
      </Text>
    </Box>
  );
}
