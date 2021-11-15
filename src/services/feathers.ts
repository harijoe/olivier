import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from 'react-native-config';

// let socket = io(config.API_HOST);
let socket = io('http://dev.amusoire.com/', {
  path: '/api/socket.io',
  transports: ['websocket'],
  // transportOptions: {
  //   polling: {
  //     extraHeaders: {
  //       Authorization: `${config.API_ID}:${config.API_PASSWORD}`,
  //     },
  //   },
  // },
});

const app = feathers();

app.configure(socketio(socket, { timeout: 20 * 1000 }));
app.configure(
  auth({
    storage: AsyncStorage,
  }),
);

export default app;
