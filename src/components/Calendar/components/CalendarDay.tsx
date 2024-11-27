import React from 'react';

import {DateData} from 'react-native-calendars';
import {DayState} from 'react-native-calendars/src/types';

import {Text, TouchableOpacityBox} from '@components';

interface CalendarDayProps {
  date?: string & DateData;
  state?: DayState;
  selectedDate?: DateData;
  onDayPress: (date: DateData) => void;
}

export function CalendarDay({
  date,
  state,
  selectedDate,
  onDayPress,
}: CalendarDayProps) {
  if (!date) {
    return null;
  }

  const isSelected = date.dateString === selectedDate?.dateString;

  return (
    <TouchableOpacityBox
      backgroundColor={isSelected ? 'primary' : undefined}
      width={30}
      height={30}
      alignItems="center"
      justifyContent="center"
      borderRadius="s100"
      borderWidth={state === 'today' ? 1 : undefined}
      borderColor={'greenPrimary'}
      onPress={() => onDayPress(date)}>
      <Text
        font={state === 'today' ? 'semiBold' : undefined}
        preset="paragraphMedium"
        color={
          state === 'today' ? 'paragraph' : isSelected ? 'white' : 'paragraph'
        }>
        {date.day}
      </Text>
    </TouchableOpacityBox>
  );
}
