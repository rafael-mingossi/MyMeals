import React from 'react';

import {useAuthSignOut, useGetUserById} from '@domain';
import {
  useAuthCredentials,
  useSettingsService,
  useThemePreference,
} from '@services';

import {
  ActivityIndicator,
  Box,
  Button,
  RadioButtonSelector,
  ScreenFixedHeader,
  Text,
} from '@components';

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
  const {authCredentials} = useAuthCredentials();

  const {user, isLoading: loadingUser} = useGetUserById(
    authCredentials?.user.id as string,
  );

  console.log({user});

  const selectedItem = items.find(
    item => item.themePreference === themePreference,
  );

  function setSelectedItem(item: Option) {
    setThemePreference(item.themePreference);
  }

  const {isLoading, signOut} = useAuthSignOut({
    onSuccess: () => console.log('SIGN OUT COMPLETE'),
  });

  if (loadingUser) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <ScreenFixedHeader title="Profile" fixedHeader={true}>
      <RadioButtonSelector
        items={items}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
        labelKey="label"
        valueKey="themePreference"
        descriptionKey="description"
      />
      <Button
        title={'Log out'}
        disabled={isLoading}
        onPress={signOut}
        mt="s32"
      />
      <Text>{user?.carbsGoal}</Text>
    </ScreenFixedHeader>
  );
}
