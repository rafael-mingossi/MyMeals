import {CalendarFunctions, CalendarService, CalendarStates} from '@services';
import {addDays, subDays, format} from 'date-fns';
import {DateData} from 'react-native-calendars';
import {create} from 'zustand';

const today = new Date();
//////THIS WAS A FIX FOR UTC WITHOUT FNS LIBRARY
// const dateString =
//   today.getFullYear() +
//   '-' +
//   String(today.getMonth() + 1).padStart(2, '0') +
//   '-' +
//   String(today.getDate()).padStart(2, '0');
const dateString = format(today, 'yyyy-MM-dd');

const useCalendarStore = create<CalendarService>(set => ({
  isOpen: false,
  showCalendar: () => set({isOpen: true}),
  hideCalendar: () => set({isOpen: false}),
  dateSelected: {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    dateString: dateString,
    timestamp: today.getTime(),
  },
  onDayPress: (date: DateData) => set({dateSelected: date}),
  goToNextDay: () =>
    set(state => {
      const currentDate = new Date(state.dateSelected.dateString);
      const nextDate = addDays(currentDate, 1);

      return {
        dateSelected: {
          day: nextDate.getDate(),
          month: nextDate.getMonth() + 1,
          year: nextDate.getFullYear(),
          dateString: format(nextDate, 'yyyy-MM-dd'),
          timestamp: nextDate.getTime(),
        },
      };
    }),

  goToPreviousDay: () =>
    set(state => {
      const currentDate = new Date(state.dateSelected.dateString);
      const prevDate = subDays(currentDate, 1);

      return {
        dateSelected: {
          day: prevDate.getDate(),
          month: prevDate.getMonth() + 1,
          year: prevDate.getFullYear(),
          dateString: format(prevDate, 'yyyy-MM-dd'),
          timestamp: prevDate.getTime(),
        },
      };
    }),
  setDayToday: () => {
    const today = new Date();
    const dateString = format(today, 'yyyy-MM-dd');

    set({
      dateSelected: {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        dateString,
        timestamp: today.getTime(),
      },
    });
    set({isOpen: false});
  },
}));

export function useCalendarStates(): CalendarStates {
  const isOpen = useCalendarStore(state => state.isOpen);
  const dateSelected = useCalendarStore(state => state.dateSelected);

  return {
    isOpen,
    dateSelected,
  };
}

export function useCalendarFunctions(): CalendarFunctions {
  const showCalendar = useCalendarStore(state => state.showCalendar);
  const hideCalendar = useCalendarStore(state => state.hideCalendar);
  const onDayPress = useCalendarStore(state => state.onDayPress);
  const goToNextDay = useCalendarStore(state => state.goToNextDay);
  const goToPreviousDay = useCalendarStore(state => state.goToPreviousDay);
  const setDayToday = useCalendarStore(state => state.setDayToday);

  return {
    showCalendar,
    hideCalendar,
    onDayPress,
    goToNextDay,
    goToPreviousDay,
    setDayToday,
  };
}
