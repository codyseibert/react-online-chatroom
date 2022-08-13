import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { RtmTokenBuilder, RtmRole } from 'agora-access-token';

const AGORA_ID = process.env.AGORA_ID!;
const AGORA_CERTIFICATE = process.env.AGORA_CERTIFICATE!;

export const joinRoom = {
  input: z
    .object({
      name: z.string(),
      uid: z.string()
    }),
  resolve: async ({ ctx, input }) => {
    const room = await ctx.prisma.room.findUnique({
      where: {
        name: input.name
      }
    });
    if (!room) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'invalid room'
      });
    }
    const user = ctx.session.user;

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'you must be logged in to join a room'
      });
    }

    const userId = user.id;

    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    const token: string = RtmTokenBuilder.buildToken(
      AGORA_ID,
      AGORA_CERTIFICATE,
      input.uid,
      RtmRole.Rtm_User,
      privilegeExpiredTs
    );
    await ctx.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        roomName: input.name
      }
    });
    return { token };
  }
};