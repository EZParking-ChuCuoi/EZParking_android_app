import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';

const pusher = Pusher.getInstance();

await pusher.init({
  apiKey: 'e3c6c9e141a887ca9466',
  cluster: 'ap1',
});

await pusher.connect();
await pusher.subscribe({
  channelName: 'wishlist',
  onEvent: event => {
    console.log(`Event received: ${event}`);
  },
});
