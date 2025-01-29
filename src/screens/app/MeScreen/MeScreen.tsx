import React from 'react';
import {ScrollView} from 'react-native';

import {useAuthSignOut, useDeleteUser, useGetUserById} from '@domain';
import {
  useAuthCredentials,
  useSettingsService,
  useThemePreference,
} from '@services';
import {format} from 'date-fns';

import {
  ActivityIndicator,
  AlertDialog,
  Box,
  Button,
  Icon,
  RadioButtonSelector,
  ScreenFixedHeader,
  Surface,
  Text,
} from '@components';
import {AppTabScreenProps} from '@routes';

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

export function MeScreen({navigation}: AppTabScreenProps<'MeScreen'>) {
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

  function updateUser() {
    if (!user) {
      return;
    }
    navigation.navigate('EditUserScreen', {
      userData: user,
    });
  }

  if (loadingUser) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <ScreenFixedHeader title="Profile" fixedHeader={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          alignItems={'center'}
          justifyContent={'center'}
          marginVertical={'s32'}>
          <Box
            borderWidth={1}
            borderRadius={'s100'}
            padding={'s12'}
            borderColor={'backgroundContrast'}>
            <Icon name={'avatarFill'} size={60} />
          </Box>
          <Text font={'semiBold'} preset={'headingMedium'} marginTop={'s12'}>
            {user?.fullName}
          </Text>
          <Text>{user?.username || 'Username'}</Text>
          <Button
            title={'Edit Profile'}
            onPress={updateUser}
            mt="s20"
            preset={'white'}
          />
        </Box>
        <Box
          borderBottomWidth={1}
          borderColor={'backgroundContrast'}
          marginVertical={'s4'}>
          <Text preset={'headingSmall'} paddingBottom={'s4'}>
            User Details
          </Text>
        </Box>
        <Surface>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Text>Date of Birth:</Text>
            <Text>
              {user?.dob ? format(new Date(user.dob), 'dd-MM-yyyy') : 'N/A'}
            </Text>
          </Box>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Text>Height:</Text>
            <Text>{user?.height || 'N/A'}</Text>
          </Box>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Text>Weight:</Text>
            <Text>{user?.weight || 'N/A'}</Text>
          </Box>
        </Surface>
        <Box
          borderBottomWidth={1}
          borderColor={'backgroundContrast'}
          marginTop={'s24'}
          marginBottom={'s4'}>
          <Text preset={'headingSmall'} paddingBottom={'s4'}>
            User Goals
          </Text>
        </Box>
        <Surface>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Text>Calories:</Text>
            <Text>{user?.calGoal || 'N/A'}</Text>
          </Box>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Text>Protein:</Text>
            <Text>{user?.proteinGoal || 'N/A'}</Text>
          </Box>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Text>Carbs:</Text>
            <Text>{user?.carbsGoal || 'N/A'}</Text>
          </Box>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Text>Fat:</Text>
            <Text>{user?.fatGoal || 'N/A'}</Text>
          </Box>
        </Surface>
        <Box
          borderBottomWidth={1}
          borderColor={'backgroundContrast'}
          marginTop={'s24'}
          marginBottom={'s4'}>
          <Text preset={'headingSmall'} paddingBottom={'s4'}>
            Dark Mode
          </Text>
        </Box>
        <Surface>
          <RadioButtonSelector
            items={items}
            selectedItem={selectedItem}
            onSelect={setSelectedItem}
            labelKey="label"
            valueKey="themePreference"
            descriptionKey="description"
          />
        </Surface>

        <Button
          title={'Log out'}
          disabled={isLoading || isPending}
          onPress={signOut}
          mt="s32"
        />
        <Button
          title={'Delete Account'}
          backgroundColor={'red'}
          disabled={isLoading || isPending}
          onPress={deleteUserDialog}
          mb={'s32'}
          mt="s32"
        />
      </ScrollView>
    </ScreenFixedHeader>
  );
}
