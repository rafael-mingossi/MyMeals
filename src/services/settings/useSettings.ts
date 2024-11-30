import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {MMKVStorage} from '../storage';

import {settingsService} from './settingsService.ts';
import {
  AppColorScheme,
  SettingsStore,
  ThemePreference,
} from './settingsType.ts';

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      showOnboarding: true,
      appColor: 'light',
      themePreference: 'system',
      onSystemChange: color => {
        const updatedAppTheme = settingsService.onSystemChange(
          color,
          get().themePreference,
        );
        if (updatedAppTheme) {
          set({appColor: updatedAppTheme});
        }
      },
      setThemePreference: newThemePreference => {
        const updatedAppTheme =
          settingsService.onChangeThemePreference(newThemePreference);
        set({appColor: updatedAppTheme, themePreference: newThemePreference});
      },
      finishOnboarding: () => {
        set({showOnboarding: false});
      },
    }),
    {
      name: '@Settings',
      storage: createJSONStorage(() => MMKVStorage),
      version: 1,
    },
  ),
);

export function useAppColor(): AppColorScheme {
  return useSettingsStore(state => state.appColor);
}

export function useThemePreference(): ThemePreference {
  return useSettingsStore(state => state.themePreference);
}

export function useShowOnboarding(): boolean {
  return useSettingsStore(state => state.showOnboarding);
}

export function useSettingsService(): Pick<
  SettingsStore,
  'setThemePreference' | 'onSystemChange' | 'finishOnboarding'
> {
  const setThemePreference = useSettingsStore(
    state => state.setThemePreference,
  );
  const onSystemChange = useSettingsStore(state => state.onSystemChange);

  const finishOnboarding = useSettingsStore(state => state.finishOnboarding);

  return {
    setThemePreference,
    onSystemChange,
    finishOnboarding,
  };
}
