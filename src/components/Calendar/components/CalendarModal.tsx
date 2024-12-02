import React from 'react';

import {useCalendar, useCalendarService} from '@services';

import {Box, ButtonText, CalendarCustom, ModalCustom} from '@components';

export function CalendarModal() {
  const {isOpen} = useCalendar();
  const {hideCalendar, setDayToday} = useCalendarService();

  return (
    <ModalCustom visible={isOpen} onClose={hideCalendar}>
      <Box>
        <CalendarCustom />
        <Box
          flexDirection={'row'}
          columnGap={'s10'}
          mt={'s16'}
          paddingHorizontal={'s16'}
          style={{marginLeft: 'auto'}}>
          <ButtonText title={'Close'} onPress={hideCalendar} />
          <ButtonText title={'Today'} onPress={setDayToday} />
        </Box>
      </Box>
    </ModalCustom>
  );
}
