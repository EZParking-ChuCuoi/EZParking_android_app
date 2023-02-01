import {ToastAndroid} from 'react-native';

export const androidNotification = message => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};