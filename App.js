import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import RootRoute from './src/routers/RootRoute';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {getData} from './src/shared/asyncStorages';
import {LocalNotification} from './src/shared/LocalPushController';
import useRQGlobalState from './src/hooks/useRQGlobal';
import {useGetNotification} from './src/hooks/api/useNotification';
import {AVATAR} from './src/utils/defaultImage';
import {useGetBookingHistory} from './src/hooks/api/getBookingParkingLot';
const pusher = Pusher.getInstance();
pusher.init({
  apiKey: 'e3c6c9e141a887ca9466',
  cluster: 'ap1',
});

pusher.connect();
const App = () => {
  const [notices, setNotices] = useRQGlobalState('notice', []);
  const [histories, setHistories] = useRQGlobalState('history', []);
  const [userInfo, setUserInfo] = useRQGlobalState('user', {
    avatar: AVATAR,
    fullName: '',
    id: '',
    isSpaceOwner: false,
    email: '',
  });
  const mutationGetNotification = useGetNotification();
  const mutationBookingHistory = useGetBookingHistory();

  useEffect(() => {
    if (mutationGetNotification.isSuccess) {
      console.log('NOTICE');
      setNotices(mutationGetNotification.data);
    }
  }, [mutationGetNotification.status]);
  useEffect(() => {
    if (mutationBookingHistory.isSuccess) {
      setHistories(mutationBookingHistory.data?.data);
    }
  }, [mutationBookingHistory.status]);
  useEffect(() => {
    const getPusher = async () => {
      const uid = await getData('EZUid');
      setUserInfo({...userInfo, ['id']: uid});
      pusher.subscribe({
        channelName: `wishlists.${uid}`,
        onEvent: event => {
          console.log(`Event wishlists ${event.data}`);
          mutationGetNotification.mutate(uid);
          LocalNotification(
            JSON.parse(event.data).userId,
            JSON.parse(event.data).title,
            JSON.parse(event.data).message,
            JSON.parse(event.data).avatar,
          );
        },
      });

      pusher.subscribe({
        channelName: `bookings.${uid}`,
        onEvent: event => {
          console.log(`Event booking ${event.data}`);
          mutationGetNotification.mutate(uid);
          mutationBookingHistory.mutate(uid);
          LocalNotification(
            JSON.parse(event.data).userId,
            JSON.parse(event.data).title,
            JSON.parse(event.data).message,
            JSON.parse(event.data).avatar,
          );
        },
      });

      pusher.subscribe({
        channelName: `cancel-bookings.${uid}`,
        onEvent: event => {
          console.log(`Event booking ${event.data}`);
          mutationGetNotification.mutate(uid);
          mutationBookingHistory.mutate(uid);
          LocalNotification(
            JSON.parse(event.data).userId,
            JSON.parse(event.data).title,
            JSON.parse(event.data).message,
            JSON.parse(event.data).avatar,
          );
        },
      });

      pusher.subscribe({
        channelName: `qr-codes.${uid}`,
        onEvent: event => {
          console.log(`Event QRCODE ${event.data}`);
          mutationGetNotification.mutate(uid);
          mutationBookingHistory.mutate(uid);
          LocalNotification(
            JSON.parse(event.data).userId,
            JSON.parse(event.data).title,
            JSON.parse(event.data).message,
            JSON.parse(event.data).avatar,
          );
        },
      });
      pusher.subscribe({
        channelName: `comments.${uid}`,
        onEvent: event => {
          console.log(`Event comment ${event.data}`);
          mutationGetNotification.mutate(uid);
          LocalNotification(
            JSON.parse(event.data).userId,
            JSON.parse(event.data).title,
            JSON.parse(event.data).message,
            JSON.parse(event.data).avatar,
          );
        },
      });

      pusher.subscribe({
        channelName: `time-outs.${uid}`,
        onEvent: event => {
          console.log(`Event timeouts ${event.data}`);
          mutationGetNotification.mutate(uid);
          LocalNotification(
            JSON.parse(event.data).userId,
            JSON.parse(event.data).title,
            JSON.parse(event.data).message,
            JSON.parse(event.data).avatar,
          );
        },
      });
    };
    getPusher();
  }, []);
  return <RootRoute />;
};

export default App;

const styles = StyleSheet.create({});
