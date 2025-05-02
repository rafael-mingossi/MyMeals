import messaging from '@react-native-firebase/messaging';

import {NotificationToNavigate} from './notificationTypes';

async function getToken(): Promise<string> {
  const token = await messaging().getToken();
  return token;
}

async function getInitialNotification(): Promise<NotificationToNavigate | null> {
  const remoteMessage = await messaging().getInitialNotification();
  if (remoteMessage?.data) {
    return getActionFromNotificationData(remoteMessage.data);
  }
  return null;
}

function onNotificationOpenedApp(
  listener: (action: NotificationToNavigate | null) => void,
): () => void {
  const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage.data) {
      // console.log('onNotificationOpenedApp:', remoteMessage.data);
      const action = getActionFromNotificationData(remoteMessage.data);
      listener(action);
    }
  });

  return unsubscribe;
}

function getActionFromNotificationData(data: {
  [key: string]: string | object;
}): NotificationToNavigate | null {
  if (typeof data.navigate === 'string') {
    const navigateProps = JSON.parse(data.navigate);
    if (typeof navigateProps.screen === 'string') {
      const screen = navigateProps.screen;
      const params = navigateProps.params || undefined;

      return {screen, params};
    }
  }

  return null;
}

export const notificationService = {
  getToken,
  getInitialNotification,
  onNotificationOpenedApp,
};
