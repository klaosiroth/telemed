import { io } from 'socket.io-client';
import { SOCKET_API } from 'src/config-global';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : SOCKET_API;

export const socket = io(URL as string, {
  autoConnect: false,
  transports: ['websocket'],
});
