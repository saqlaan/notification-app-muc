import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import env from '../constants/env';

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
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      showMessage({
        message: 'Google login failed. Try again',
        type: 'danger',
      });
    }
  },
  emailSignIn: async function (email, password) {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        showMessage({
          message: 'Signed in!',
          type: 'success',
        });
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          showMessage({
            message: 'That email address is already in use!',
            type: 'danger',
          });
        }
        showMessage({
          message: 'Something went wrong. Please try again.',
          type: 'danger',
        });
      });
  },
  logout: async function () {
    return await auth().signOut();
  },
};
