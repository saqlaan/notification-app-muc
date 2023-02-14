import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  onInitialNotification,
  onMessageReceived,
  onNotificationOpenedApp,
} from './handler';

async function requestUserPermission() {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
  await messaging().requestPermission();
}

async function setupNotifications() {
  await requestUserPermission();
  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);
  messaging().onNotificationOpenedApp(onNotificationOpenedApp);
  messaging().getInitialNotification().then(onInitialNotification);
  await messaging().registerDeviceForRemoteMessages();
}

export default setupNotifications;
