import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import RootRoute from './src/routers/RootRoute';
import {Pusher} from '@pusher/pusher-websocket-react-native';
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
      console.log('socketId', socketId);
      pusher.subscribe({
        channelName: 'wishlist',
        onEvent: event => {
          console.log(`Event received: ${event}`);
        },
      });
    };
    getPusher();
  }, []);
  return <RootRoute />;
};

export default App;

const styles = StyleSheet.create({});
