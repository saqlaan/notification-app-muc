import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
      userRef.set({
        deviceTokens: [
          {
            token,
            deviceId,
          },
        ],
      });
      return null;
    }
    const data = snapShot.data();
    if (
      !data.deviceTokens.map(notification => notification.token).includes(token)
    ) {
      updateUserData({
        deviceTokens: [...data.deviceTokens, { token, deviceId }],
      });
    }
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
      const data = snapShot
        .data()
        ?.deviceTokens.filter(item => item.deviceId !== deviceId);
      return updateUserData({
        deviceTokens: [...data],
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateUserData = async data => {
  const userId = getUser().uid;
  const userRef = firestore().collection('users').doc(userId);
  return userRef.update(data);
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
