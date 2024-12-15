import React from 'react';

import {useAppColor} from '@services';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';

import {Box, Icon, Text} from '@components';
import {colours} from '@theme';

export function BottomSheetMenu(props: SheetProps) {
  const appColor = useAppColor();

  return (
    <ActionSheet
      {...props}
      headerAlwaysVisible={true}
      containerStyle={{
        backgroundColor:
          appColor === 'dark'
            ? colours.palette.backgroundInnerDark
            : colours.palette.backgroundInnerLight,
      }}
      safeAreaInsets={{top: 0, bottom: 0, left: 0, right: 0}}>
      <Box padding={'s16'} flexDirection="row" justifyContent={'space-around'}>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Box
            borderWidth={1}
            borderRadius={'s100'}
            padding={'s12'}
            borderColor={'borderGray'}>
            <Icon name={'breakfast'} size={33} />
          </Box>
          <Text>Breakfast</Text>
        </Box>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Box
            borderWidth={1}
            borderRadius={'s100'}
            padding={'s12'}
            borderColor={'borderGray'}>
            <Icon name={'breakfast'} size={33} />
          </Box>
          <Text>Lunch</Text>
        </Box>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Box
            borderWidth={1}
            borderRadius={'s100'}
            padding={'s12'}
            borderColor={'borderGray'}>
            <Icon name={'breakfast'} size={33} />
          </Box>
          <Text>Lunch</Text>
        </Box>
      </Box>
    </ActionSheet>
  );
}
