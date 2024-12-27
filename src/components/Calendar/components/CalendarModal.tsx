import React, {useState} from 'react';

import {useCalendar, useCalendarService} from '@services';
import {DateData} from 'react-native-calendars';

import {Box, ButtonText, CalendarCustom, ModalCustom} from '@components';

export function CalendarModal() {
  const {isOpen} = useCalendar();
  const {hideCalendar, setDayToday, onDayPress} = useCalendarService();

  const [tempSelectedDate, setTempSelectedDate] = useState<DateData | null>(
    null,
  );

  const handleTempDateChange = (date: DateData) => {
    setTempSelectedDate(date);
  };

  const handleConfirm = () => {
    if (tempSelectedDate) {
      onDayPress(tempSelectedDate);
    }
    hideCalendar();
  };

  return (
    <ModalCustom visible={isOpen} onClose={hideCalendar}>
      <Box>
        <CalendarCustom onTempDateChange={handleTempDateChange} />
        <Box
          flexDirection={'row'}
          columnGap={'s10'}
          mt={'s16'}
          paddingHorizontal={'s16'}
          style={{marginLeft: 'auto'}}>
          <ButtonText title={'Close'} onPress={hideCalendar} />
          <ButtonText title={'Today'} onPress={setDayToday} />
          <ButtonText title={'Show'} onPress={handleConfirm} />
        </Box>
      </Box>
    </ModalCustom>
  );
}
