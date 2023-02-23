import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { getUniqueId } from 'react-native-device-info';
import env from '../constants/env';
import { BASE_URL, FUNCTIONS } from '../constants/cloudFunctions';
import {
  addNotificationToken,
  removeNotificationToken,
  syncUserData,
} from './user';
import axios from 'axios';
import { errorMessage, successMessage } from '../utils/functions';

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
      const result = await GoogleSignin.signIn();
      const userExists = await this.userExists(result.user.email);
      if (!userExists) {
        errorMessage('User does not exist');
        return null;
      }
      const googleCredential = auth.GoogleAuthProvider.credential(
        result.idToken,
      );
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
    const userExists = await this.userExists(email);
    if (!userExists) {
      errorMessage('User does not exist');
      return null;
    }
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        successMessage('Signed in!');
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
          errorMessage('That email address is already in use!');
        } else {
          errorMessage('Something went wrong. Please try again.');
        }
      });
  },
  userExists: async function (email) {
    try {
      const result = await axios.get(
        `${BASE_URL}${FUNCTIONS.USER_EXISTS_IN_NETSUITE}?email=${email}`,
      );
      return result.data.userExists;
    } catch (e) {
      return false;
    }
  },
  onLoginSuccess: async function () {
    const token = await messaging().getToken();
    const deviceId = await getUniqueId();
    await addNotificationToken({ token, deviceId });
    await syncUserData();
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
