import React, {useState, useCallback} from 'react';

import {useAppColor} from '@services';
import {Calendar, DateData} from 'react-native-calendars';
import {DayState} from 'react-native-calendars/src/types';

import {Box, Icon} from '@components';
import {colours} from '@theme';

import {CalendarDay} from './components/CalendarDay';
import {CalendarHeader} from './components/CalendarHeader';

export function CalendarCustom() {
  const appColor = useAppColor();
  const [selectedDate, setSelectedDate] = useState<DateData>(() => {
    const today = new Date();
    return {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      dateString: today.toISOString().split('T')[0],
      timestamp: today.getTime(),
    };
  });

  const handleDayPress = useCallback((day: DateData) => {
    setSelectedDate(day);
  }, []);

  const renderDayComponent = useCallback(
    ({date, state}: {date?: string & DateData; state?: DayState}) => (
      <CalendarDay
        date={date}
        state={state}
        selectedDate={selectedDate}
        onDayPress={handleDayPress}
      />
    ),
    [selectedDate, handleDayPress],
  );

  return (
    <Box
      flex={1}
      padding="s8"
      backgroundColor="backgroundInner"
      borderRadius="s16">
      <Calendar
        current={selectedDate.dateString}
        onDayPress={handleDayPress}
        hideExtraDays
        enableSwipeMonths
        renderArrow={(direction: 'right' | 'left') => (
          <Icon name={`chevron${direction}`} />
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
          [selectedDate.dateString]: {selected: true},
        }}
        dayComponent={renderDayComponent}
        renderHeader={date => (
          <CalendarHeader month={date?.toString('MMMM yyyy')} />
        )}
      />
    </Box>
  );
}
