import { z } from 'zod';

export const createRoom = {
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
};