import React, {useEffect} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: token => {
        console.log('TOKEN:', token);
      },
      onNotification: notification => {
        console.log('NOTIFICATION:', notification);
      },
      onAction: notification => {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: err => {
        console.error(err.message, err);
      },
      senderID: '529834463738',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  return null;
};

export default RemotePushController;
