// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';
import { isLoggedInMiddleware } from './middleware/isLoggedInMiddleware';
import { joinRoom } from './rooms/joinRoom';
import { createRoom } from './rooms/createRoom';
import { getUsersInRoom } from './rooms/getUsersInRoom';
import { getRooms } from './rooms/getRooms';
import { getMessages } from './rooms/getMessages';
import { storeMessage } from './rooms/storeMessage';

export const appRouter = createRouter()
  .transformer(superjson)
  .middleware(isLoggedInMiddleware)
  .mutation('joinRoom', joinRoom)
  .mutation('createRoom', createRoom)
  .mutation('storeMessage', storeMessage)
  .query('getUsersInRoom', getUsersInRoom)
  .query('getRooms', getRooms)
  .query('getMessages', getMessages);

export type AppRouter = typeof appRouter;
