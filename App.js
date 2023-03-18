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
      const socketId = await pusher.getSocketId();
      const uid = await getData('EZUid');
      console.log('socketId', uid);
      pusher.subscribe({
        channelName: `wishlists.${uid}`,
        onEvent: event => {
          console.log(`Event received at ${event.data}: ${event}`);
          LocalNotification(
            'New notification',
            'Next is the event data',
            `${event}`,
            undefined,
            new Date(event.data.time),
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
