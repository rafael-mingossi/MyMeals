import {CalendarFunctions, CalendarService, CalendarStates} from '@services';
import {DateData} from 'react-native-calendars';
import {create} from 'zustand';

const today = new Date();

const useCalendarStore = create<CalendarService>(set => ({
  isOpen: false,
  showCalendar: () => set({isOpen: true}),
  hideCalendar: () => set({isOpen: false}),
  dateSelected: {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    dateString: today.toISOString().split('T')[0],
    timestamp: today.getTime(),
  },
  onDayPress: (date: DateData) => set({dateSelected: date}),
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

  return {
    showCalendar,
    hideCalendar,
    onDayPress,
  };
}
