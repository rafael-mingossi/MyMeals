import React from 'react';

import {useCalendar} from '@services';

import {Box, Icon, Text} from '@components';

export function CalendarWidget() {
  const {dateSelected} = useCalendar();
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
