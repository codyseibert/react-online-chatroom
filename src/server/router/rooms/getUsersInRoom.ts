import { z } from 'zod';

export const getUsersInRoom = {
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
};