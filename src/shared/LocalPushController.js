import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
  onNotification: notification => {
    console.log('NOTIFICATION:', notification);
  },

  onAction: notification => {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'channel-id',
    channelName: 'my channel',
    channelDescription: 'A channel for notification',
    playSound: true,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
    vibration: 1000,
  },
  created => console.log('channel created', created),
);

export const LocalNotification = (
  bigText = 'Big text',
  subText = 'Sub text',
  title = 'Title',
  message = 'Message',
) => {
  PushNotification.localNotification({
    channelId: 'channel-id',
    channelName: 'my channel',
    bigText: bigText,
    subText: subText,
    title: title,
    actions: ['Yes', 'No'],
    ticker: 'My Notification Ticker',
    message: message,
    autoCancel: true,
    playSound: true,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
    vibration: 1000,
  });
};
