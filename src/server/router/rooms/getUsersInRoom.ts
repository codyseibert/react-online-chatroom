import { z } from 'zod';
import { createRouter } from '../context';
import { isLoggedInMiddleware } from '../middleware/isLoggedInMiddleware';

export const getUsersInRoom = createRouter()
  .middleware(isLoggedInMiddleware)
  .query('getUsersInRoom', {
    input: z
      .object({
        roomId: z.string()
      }),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        where: {
          roomName: input.roomId
        }
      });
    }
  });