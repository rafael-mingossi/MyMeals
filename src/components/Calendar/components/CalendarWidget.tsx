import React from 'react';

import {useCalendar} from '@services';

import {Box, Icon, Text} from '@components';

export function CalendarWidget() {
  const {dateSelected} = useCalendar();
  const today = new Date();
  // console.log(dateSelected.dateString);
  console.log(today.toLocaleDateString('en-US', {weekday: 'short'}));
  // console.log(
  //   today.toLocaleDateString('en-US', {month: 'short'}).toUpperCase(),
  // );
  return (
    <Box
      flexDirection="row"
      justifyContent="center"
      columnGap="s10"
      padding="s8"
      alignItems="center">
      <Icon name="chevronleft" size={26} />
      <Icon name="calendar" size={20} />
      <Text preset="paragraphLarge" font="bold">
        {`Mon, ${dateSelected.day} Nov`}
      </Text>
      <Icon name="chevronright" size={26} />
    </Box>
  );
}
