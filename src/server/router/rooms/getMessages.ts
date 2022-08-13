import { z } from 'zod';

export const getMessages = {
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
};