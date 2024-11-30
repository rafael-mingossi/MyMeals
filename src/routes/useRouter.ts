// import {useEffect} from 'react';

// import {useAuthCredentials, useShowOnboarding} from '@services';
import {useAuthCredentials} from '@services';

// import {settingsService} from '../services/settings/settingsService.ts';

export type Stacks = 'Loading' | 'Auth' | 'App';

export function useRouter(): Stacks {
  // const showOnboarding = useShowOnboarding();
  const {authCredentials, isLoading} = useAuthCredentials();

  // useEffect(() => {
  //   if (!isLoading) {
  //     settingsService.hideSplashScreen();
  //   }
  // }, [isLoading]);

  if (isLoading) {
    return 'Loading';
  }

  // if (showOnboarding) {
  //   return 'Onboarding';
  // }

  if (authCredentials) {
    return 'App';
  }

  return 'Auth';
}
