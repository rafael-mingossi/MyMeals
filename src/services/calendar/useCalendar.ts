import {CalendarFunctions, CalendarStates} from './calendarTypes';
import {useCalendarStates, useCalendarFunctions} from './useCalendarZustand.ts';

export function useCalendar(): CalendarStates {
  return useCalendarStates();
}

export function useCalendarService(): CalendarFunctions {
  return useCalendarFunctions();
}
