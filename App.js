import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import RootRoute from './src/routers/RootRoute';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {getData} from './src/shared/asyncStorages';
import {LocalNotification} from './src/shared/LocalPushController';
const pusher = Pusher.getInstance();
pusher.init({
  apiKey: 'e3c6c9e141a887ca9466',
  cluster: 'ap1',
});

pusher.connect();
const App = () => {
  useEffect(() => {
    const getPusher = async () => {
      const uid = await getData('EZUid');
      pusher.subscribe({
        channelName: `wishlists.${uid}`,
        onEvent: event => {
          console.log(`Event wishlists ${event.data}`);
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
