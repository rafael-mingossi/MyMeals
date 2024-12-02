import React from 'react';

import {useCalendar, useCalendarService} from '@services';
import {format} from 'date-fns';

import {Box, Icon, PressableBox, Text} from '@components';

export function CalendarWidget() {
  const {dateSelected} = useCalendar();
  const {goToPreviousDay, goToNextDay, showCalendar} = useCalendarService();
  const dateObj = new Date(dateSelected.dateString);

  return (
    <Box
      flexDirection="row"
      justifyContent="center"
      columnGap="s32"
      paddingTop={'s4'}
      paddingBottom={'s20'}
      alignItems="center">
      <Icon
        name="chevronleft"
        size={26}
        onPress={goToPreviousDay}
        color={'white'}
      />
      <PressableBox
        onPress={showCalendar}
        flexDirection={'row'}
        columnGap="s10"
        alignItems="center">
        <Icon name="calendar" size={20} color={'white'} />
        <Text preset="paragraphLarge" font="bold" color={'white'}>
          {format(dateObj, 'EEE, d MMM')}
        </Text>
      </PressableBox>
      <Icon
        name="chevronright"
        size={26}
        onPress={goToNextDay}
        color={'white'}
      />
    </Box>
  );
}
