import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { getUniqueId } from 'react-native-device-info';
import env from '../constants/env';
import { addNotificationToken, removeNotificationToken } from './user';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: env.webClientId,
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  iosClientId: env.iosClientId,
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export const authServices = {
  googleSignIn: async function () {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      showMessage({
        message: 'Signed in!',
        type: 'success',
      });
      this.onLoginSuccess();
    } catch (error) {
      showMessage({
        message: 'Google login failed. Try again',
        type: 'danger',
      });
    }
  },
  emailSignIn: async function (email, password) {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        showMessage({
          message: 'Signed in!',
          type: 'success',
        });
        this.onLoginSuccess();
      })
      .catch(async error => {
        if (error.code === 'auth/user-not-found') {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              this.onLoginSuccess();
            });
        } else if (error.code === 'auth/email-already-in-use') {
          showMessage({
            message: 'That email address is already in use!',
            type: 'danger',
          });
        } else {
          showMessage({
            message: 'Something went wrong. Please try again.',
            type: 'danger',
          });
        }
      });
  },
  onLoginSuccess: async function () {
    const token = await messaging().getToken();
    const deviceId = await getUniqueId();
    addNotificationToken({ token, deviceId });
  },
  logout: async function () {
    await this.logoutCleanup();
    await auth().signOut();
    return null;
  },
  logoutCleanup: async function () {
    const deviceId = await getUniqueId();
    return removeNotificationToken({ deviceId });
  },
};
