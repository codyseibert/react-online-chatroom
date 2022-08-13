import { z } from 'zod';
import { createRouter } from '../context';
import { isLoggedInMiddleware } from '../middleware/isLoggedInMiddleware';

export const storeMessage = createRouter()
  .middleware(isLoggedInMiddleware)
  .mutation('storeMessage', {
    input: z
      .object({
        text: z.string(),
        userId: z.string(),
        roomId: z.string()
      }),
    resolve: async ({ ctx, input }) => {
      const message = await ctx.prisma.message.create({
        data: {
          userId: input.userId,
          text: input.text,
          roomId: input.roomId,
          image: ctx.session.user?.image,
          name: ctx.session.user?.name
        }
      });
      return message;
    }
  });