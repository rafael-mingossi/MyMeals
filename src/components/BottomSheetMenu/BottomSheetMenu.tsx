import React from 'react';

import {MealsTypes} from '@domain';
import {useNavigation} from '@react-navigation/native';
import {useAppColor} from '@services';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';

import {Box, Icon, Text} from '@components';
import {colours} from '@theme';

export function BottomSheetMenu(props: SheetProps) {
  const appColor = useAppColor();

  const navigation = useNavigation();

  function navigateToMeals(mealType: MealsTypes) {
    SheetManager.hide('bs-menu');
    navigation.navigate('MealsSelectionScreen', {mealType: mealType});
  }

  return (
    <ActionSheet
      {...props}
      closeOnPressBack={true}
      headerAlwaysVisible={true}
      containerStyle={{
        padding: 20,
        backgroundColor:
          appColor === 'dark'
            ? colours.palette.backgroundInnerDark
            : colours.palette.backgroundInnerLight,
      }}
      safeAreaInsets={{top: 0, bottom: 0, left: 0, right: 0}}>
      <Box
        paddingTop={'s32'}
        flexDirection="row"
        justifyContent={'center'}
        columnGap={'s48'}>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Box
            borderWidth={1}
            borderRadius={'s100'}
            padding={'s12'}
            borderColor={'borderGray'}>
            <Icon
              name={'breakfast'}
              size={33}
              onPress={() => navigateToMeals('breakfast')}
            />
          </Box>
          <Text>Breakfast</Text>
        </Box>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Box
            borderWidth={1}
            borderRadius={'s100'}
            padding={'s12'}
            borderColor={'borderGray'}>
            <Icon
              name={'lunch'}
              size={33}
              onPress={() => navigateToMeals('lunch')}
            />
          </Box>
          <Text>Lunch</Text>
        </Box>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Box
            borderWidth={1}
            borderRadius={'s100'}
            padding={'s12'}
            borderColor={'borderGray'}>
            <Icon
              name={'dinner'}
              size={33}
              onPress={() => navigateToMeals('dinner')}
            />
          </Box>
          <Text>Dinner</Text>
        </Box>
      </Box>
      <Box
        paddingTop={'s32'}
        paddingBottom={'s24'}
        flexDirection="row"
        justifyContent={'center'}
        columnGap={'s48'}>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Box
            borderWidth={1}
            borderRadius={'s100'}
            padding={'s12'}
            borderColor={'borderGray'}>
            <Icon
              name={'snack'}
              size={33}
              onPress={() => navigateToMeals('snack')}
            />
          </Box>
          <Text>Snacks</Text>
        </Box>
        <Box alignItems={'center'} justifyContent={'center'}>
          <Box
            borderWidth={1}
            borderRadius={'s100'}
            padding={'s12'}
            borderColor={'borderGray'}>
            <Icon name={'barCode'} size={33} />
          </Box>
          <Text>Bar Code</Text>
        </Box>
      </Box>
    </ActionSheet>
  );
}
