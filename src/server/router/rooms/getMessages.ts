import { z } from 'zod';
import { createRouter } from '../context';
import { isLoggedInMiddleware } from '../middleware/isLoggedInMiddleware';

export const getMessages = createRouter()
  .middleware(isLoggedInMiddleware)
  .query('getMessages', {
    input: z
      .object({
        roomId: z.string()
      }),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.message.findMany({
        where: {
          roomId: input.roomId
        },
        orderBy: { 'createdAt': 'asc' }
      });
    }
  });