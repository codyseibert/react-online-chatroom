import superjson from 'superjson';
import { createRouter } from './context';
import { joinRoom } from './rooms/joinRoom';
import { createRoom } from './rooms/createRoom';
import { getUsersInRoom } from './rooms/getUsersInRoom';
import { getRooms } from './rooms/getRooms';
import { getMessages } from './rooms/getMessages';
import { storeMessage } from './rooms/storeMessage';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('rooms.', joinRoom)
  .merge('rooms.', createRoom)
  .merge('rooms.', storeMessage)
  .merge('rooms.', getUsersInRoom)
  .merge('rooms.', getRooms)
  .merge('rooms.', getMessages);

export type AppRouter = typeof appRouter;
