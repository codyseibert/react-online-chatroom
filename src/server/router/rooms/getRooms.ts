export const getRooms = {
  resolve: ({ ctx }) =>
    ctx.prisma.room.findMany()
};