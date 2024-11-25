import React from 'react';

import {useAuthSignOut} from '@domain';
import {useSettingsService, useThemePreference} from '@services';

import {Button, Screen, Text, RadioButtonSelector} from '@components';

type ThemePreference = 'light' | 'dark' | 'system';

type Option = {
  label: string;
  description?: string;
  themePreference: ThemePreference;
};

const items: Option[] = [
  {
    label: 'Activate',
    themePreference: 'dark',
  },
  {
    label: 'Deactivate',
    themePreference: 'light',
  },
  {
    label: 'System default',
    themePreference: 'system',
    description: 'It will follow your phone system default',
  },
];

export function MeScreen() {
  const themePreference = useThemePreference();
  const {setThemePreference} = useSettingsService();

  const selectedItem = items.find(
    item => item.themePreference === themePreference,
  );

  function setSelectedItem(item: Option) {
    setThemePreference(item.themePreference);
  }

  const {isLoading, signOut} = useAuthSignOut({
    onSuccess: () => console.log('SIGN OUT COMPLETE'),
  });

  return (
    <Screen>
      <RadioButtonSelector
        items={items}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
        labelKey="label"
        valueKey="themePreference"
        descriptionKey="description"
      />
      <Button title={'Log out'} disabled={isLoading} onPress={signOut} />
    </Screen>
  );
}
