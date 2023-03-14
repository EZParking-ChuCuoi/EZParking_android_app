import PushNotification, {Importance} from 'react-native-push-notification';
import {getCurrentTime, handleDate} from './handleDate';

PushNotification.configure({
  onNotification: notification => {
    console.log('image', notification.picture);
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
  bigText = 'Explore EZParking now!',
  title = 'New notification from EZParking',
  message = 'New message from EZParking',
  picture = undefined,
) => {
  PushNotification.localNotification({
    channelId: 'channel-id',
    channelName: 'my channel',
    bigText: bigText,
    subText: getCurrentTime(),
    title: title,
    ticker: 'My Notification Ticker',
    message: message,
    autoCancel: true,
    playSound: true,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
    vibration: 1000,
    bigPictureUrl: picture,
    picture: picture,
  });
};
