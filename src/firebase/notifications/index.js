// import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { PERMISSIONS, request } from 'react-native-permissions';
import {
  onInitialNotification,
  onMessageReceived,
  onNotificationOpenedApp,
} from './handler';

async function requestUserPermission() {
  await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
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
