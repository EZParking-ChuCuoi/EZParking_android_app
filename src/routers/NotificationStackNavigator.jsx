import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {bgDefault, colorDefault, FONTSIZE} from '../assets/styles/styles';
import Notification from '../views/notification/Notification';
import {useGetNotification} from '../hooks/api/useNotification';
import useRQGlobalState from '../hooks/useRQGlobal';
import NotiBookingSuccess from '../views/notification/NotiBookingSuccess';

const NotificationtackNavigators = () => {
  const [userInfo] = useRQGlobalState('user', {});
  const [notices, setNotices] = useRQGlobalState('notice', []);
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();
  const NotificationStack = createNativeStackNavigator();

  return (
    <NotificationStack.Navigator>
      <NotificationStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_left',
        }}>
        <NotificationStack.Screen
          name="notification"
          component={Notification}
        />
      </NotificationStack.Group>
      <NotificationStack.Group
        screenOptions={{
          headerTintColor: COLOR,
          headerStyle: {backgroundColor: BG},
          headerTitleStyle: {fontSize: FONTSIZE.quiteLarge},
        }}>
        <NotificationStack.Screen
          name="notiBookingSuccess"
          component={NotiBookingSuccess}
          options={{title: 'Booking informations'}}
        />
      </NotificationStack.Group>
    </NotificationStack.Navigator>
  );
};

export default NotificationtackNavigators;
