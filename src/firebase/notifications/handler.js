// Note that an async function or a function that returns a Promise
// is required for both subscribers.
export async function onMessageReceived(notification) {
  console.log('Notification Received:', notification);
}

// When the application is running, but in the background.
export async function onNotificationOpenedApp(notification) {
  console.log('NotificationOpened-AppInBackgroud: ', notification);
}

// When the application is opened from a quit state.
export async function onInitialNotification(notification) {
  console.log('NotificationOpened-AppClosed: ', notification);
}
