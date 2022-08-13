import { createRouter } from '../context';
import { isLoggedInMiddleware } from '../middleware/isLoggedInMiddleware';

export const getRooms = createRouter()
  .middleware(isLoggedInMiddleware)
  .query('getRooms', {
    resolve: ({ ctx }) =>
      ctx.prisma.room.findMany()
  });