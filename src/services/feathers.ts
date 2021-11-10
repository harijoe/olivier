import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const app = feathers();
const socket = process.env.REACT_APP_SERVER_URL
  ? io(process.env.REACT_APP_SERVER_URL)
  : io('http://localhost:3130', {
      path: '/api/socket.io',
    });

app.configure(socketio(socket, {timeout: 20 * 1000}));
app.configure(
  auth({
    storage: AsyncStorage,
  }),
);

export default app;
