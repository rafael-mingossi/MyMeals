import React, {useCallback} from 'react';

import {useAppColor, useCalendar, useCalendarService} from '@services';
import {Calendar, DateData} from 'react-native-calendars';
import {DayState} from 'react-native-calendars/src/types';

import {Box, Icon} from '@components';
import {colours} from '@theme';

import {CalendarDay} from './components/CalendarDay';
import {CalendarHeader} from './components/CalendarHeader';

export function CalendarCustom() {
  const appColor = useAppColor();
  const {dateSelected} = useCalendar();
  const {onDayPress} = useCalendarService();

  const handleDayPress = useCallback(
    (day: DateData) => {
      onDayPress(day);
    },
    [onDayPress],
  );

  const renderDayComponent = useCallback(
    ({date, state}: {date?: string & DateData; state?: DayState}) => (
      <CalendarDay
        date={date}
        state={state}
        selectedDate={dateSelected}
        onDayPress={handleDayPress}
      />
    ),
    [dateSelected, handleDayPress],
  );

  return (
    <Box padding="s8" backgroundColor="backgroundInner" borderRadius="s16">
      <Calendar
        current={dateSelected.dateString}
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
          [dateSelected.dateString]: {selected: true},
        }}
        dayComponent={renderDayComponent}
        renderHeader={date => (
          <CalendarHeader month={date?.toString('MMMM yyyy')} />
        )}
      />
    </Box>
  );
}
