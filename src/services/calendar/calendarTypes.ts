import {DateData} from 'react-native-calendars';

export interface CalendarService {
  isOpen: boolean;
  showCalendar: () => void;
  hideCalendar: () => void;
  dateSelected: DateData;
  onDayPress: (date: DateData) => void;
  goToNextDay: () => void;
  goToPreviousDay: () => void;
  setDayToday: () => void;
}

export type CalendarStates = Pick<CalendarService, 'dateSelected' | 'isOpen'>;

export type CalendarFunctions = Omit<
  CalendarService,
  'dateSelected' | 'isOpen'
>;
