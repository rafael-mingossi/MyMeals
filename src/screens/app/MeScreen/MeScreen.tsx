import React from 'react';

import {useAuthSignOut, useDeleteUser, useGetUserById} from '@domain';
import {
  useAuthCredentials,
  useSettingsService,
  useThemePreference,
} from '@services';

import {
  ActivityIndicator,
  AlertDialog,
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

  const selectedItem = items.find(
    item => item.themePreference === themePreference,
  );

  function setSelectedItem(item: Option) {
    setThemePreference(item.themePreference);
  }

  const {deleteUser, isPending} = useDeleteUser();
  const {signOut, isLoading} = useAuthSignOut({
    onSuccess: () => console.log('SIGN OUT COMPLETE'),
  });

  const handleDeleteAccount = () => {
    if (authCredentials?.user.id) {
      try {
        deleteUser(authCredentials.user.id);
        signOut();
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  const deleteUserDialog = () => {
    AlertDialog({
      title: 'Delete your account',
      message:
        'This will delete your user permanently, do you want to proceed?',
      onConfirm: () => handleDeleteAccount(),
    });
  };

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
      <Text>{user?.fullName}</Text>

      <Button
        title={'Log out'}
        disabled={isLoading || isPending}
        onPress={signOut}
        mt="s32"
      />
      <Button
        title={'Delete Account'}
        disabled={isLoading || isPending}
        onPress={deleteUserDialog}
        mt="s32"
      />
    </ScreenFixedHeader>
  );
}
