import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import RootRoute from './src/routers/RootRoute';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {getData} from './src/shared/asyncStorages';
import {LocalNotification} from './src/shared/LocalPushController';
const App = () => {
  return <RootRoute />;
};

export default App;

const styles = StyleSheet.create({});
