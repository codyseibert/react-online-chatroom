import { z } from 'zod';
import { createRouter } from '../context';
import { isLoggedInMiddleware } from '../middleware/isLoggedInMiddleware';

export const createRoom = createRouter()
  .middleware(isLoggedInMiddleware)
  .mutation('createRoom', {
    input: z
      .object({
        name: z.string()
      }),
    resolve: async ({ ctx, input }) => {
      const room = await ctx.prisma.room.create({
        data: {
          name: input.name
        }
      });
      return room;
    }
  });