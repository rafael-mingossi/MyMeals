import React, {useCallback, useState} from 'react';

import {useAppColor, useCalendar} from '@services';
import {Calendar, DateData} from 'react-native-calendars';
import {DayState} from 'react-native-calendars/src/types';

import {Box, Icon} from '@components';
import {colours} from '@theme';

import {CalendarDay} from './components/CalendarDay';
import {CalendarHeader} from './components/CalendarHeader';

interface CalendarProps {
  onTempDateChange?: (date: DateData) => void;
}

export function CalendarCustom({onTempDateChange}: CalendarProps) {
  const appColor = useAppColor();
  const {dateSelected} = useCalendar();

  const [tempSelectedDate, setTempSelectedDate] =
    useState<DateData>(dateSelected);

  const handleDayPress = useCallback(
    (day: DateData) => {
      setTempSelectedDate(day);
      onTempDateChange?.(day);
    },
    [onTempDateChange],
  );

  const renderDayComponent = useCallback(
    ({date, state}: {date?: string & DateData; state?: DayState}) => (
      <CalendarDay
        date={date}
        state={state}
        selectedDate={tempSelectedDate}
        onDayPress={handleDayPress}
      />
    ),
    [tempSelectedDate, handleDayPress],
  );

  return (
    <Box padding="s8" backgroundColor="backgroundInner" borderRadius="s16">
      <Calendar
        current={tempSelectedDate.dateString}
        onDayPress={handleDayPress}
        hideExtraDays
        enableSwipeMonths
        renderArrow={(direction: 'right' | 'left') => (
          <Icon name={`chevron${direction}`} size={24} />
        )}
        theme={{
          calendarBackground: 'transparent',
          textDayHeaderFontFamily: 'Switzer-Bold',
          textSectionTitleColor:
            appColor === 'light'
              ? colours.lightTheme.paragraph
              : colours.darkTheme.paragraph,
        }}
        markedDates={{
          [tempSelectedDate.dateString]: {selected: true},
        }}
        dayComponent={renderDayComponent}
        renderHeader={date => (
          <CalendarHeader month={date?.toString('MMMM yyyy')} />
        )}
      />
    </Box>
  );
}
