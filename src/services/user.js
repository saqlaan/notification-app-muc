import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { BASE_URL, FUNCTIONS } from '../constants/cloudFunctions';

export const getAllUsers = async () => {
  return firestore().collection('users').d.get();
};

export const getUser = () => {
  return auth().currentUser;
};

export const addNotificationToken = async ({ token, deviceId }) => {
  try {
    const userId = getUser().uid;
    const userRef = firestore().collection('users').doc(userId);
    const doc = await userRef.get();
    let deviceTokens = [{ token, deviceId }];
    if (doc.exists) {
      deviceTokens = [...doc.data().deviceTokens, ...deviceTokens];
    }
    updateUserData({ deviceTokens });
  } catch (err) {
    console.log(err);
  }
};

export const removeNotificationToken = async ({ deviceId }) => {
  try {
    const userId = getUser().uid;
    const userRef = firestore().collection('users').doc(userId);
    const snapShot = await userRef.get();
    if (snapShot.exists) {
      const data =
        snapShot
          .data()
          ?.deviceTokens.filter(item => item.deviceId !== deviceId) || {};
      return updateUserData({
        deviceTokens: [...data],
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const getUserData = async () => {
  const userId = getUser().uid;
  const userRef = firestore().collection('users').doc(userId);
  const user = await userRef.get();
  if (user.exists) {
    return user.data();
  }
  return {};
};

export const updateUserData = async data => {
  const userId = getUser().uid;
  const userRef = firestore().collection('users').doc(userId);
  const doc = await userRef.get();
  if (doc.exists) {
    return userRef.update({ ...doc.data(), ...data });
  } else {
    userRef.set(data);
  }
};

export const updateNotification = async ({ id, data }) => {
  const userId = getUser().uid;
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('notifications')
      .doc(id)
      .update({ ...data });
  } catch (e) {
    console.log(e);
  }
};

export const notificationsRef = () => {
  const userId = getUser().uid;
  return firestore()
    .collection('users')
    .doc(userId)
    .collection('notifications');
};

export const addDataToNotificationsCollection = () => {
  const userId = getUser().uid;
  return firestore()
    .collection('users')
    .doc(userId)
    .collection('notifications')
    .add({});
};

export const syncUserData = async () => {
  const netsuiteUserData = await getUserDataFromNetsuite();
  if (netsuiteUserData.data) {
    const { email, firstName, lastName, id, mobilePhone, partnerCode } =
      netsuiteUserData.data;
    updateUserData({
      email,
      firstName,
      lastName,
      netsuiteUserId: id,
      mobilePhone,
      partnerCode,
    });
  }
};

export const getUserDataFromNetsuite = async () => {
  const email = getUser().email;
  try {
    const result = await axios.get(
      `${BASE_URL}${FUNCTIONS.GET_NETSUITE_USER}?email=${email}`,
    );
    return result.data;
  } catch (e) {
    return false;
  }
};
