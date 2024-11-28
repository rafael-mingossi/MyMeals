import React from 'react';

import {useCalendar, useCalendarService} from '@services';
import {format} from 'date-fns';

import {Box, Icon, Text} from '@components';

export function CalendarWidget() {
  const {dateSelected} = useCalendar();
  const {goToPreviousDay, goToNextDay} = useCalendarService();
  const dateObj = new Date(dateSelected.dateString);

  return (
    <Box
      flexDirection="row"
      justifyContent="center"
      columnGap="s10"
      padding="s8"
      alignItems="center">
      <Icon name="chevronleft" size={26} onPress={goToPreviousDay} />
      <Icon name="calendar" size={20} />
      <Text preset="paragraphLarge" font="bold">
        {format(dateObj, 'EEE, d MMM')}
      </Text>
      <Icon name="chevronright" size={26} onPress={goToNextDay} />
    </Box>
  );
}
