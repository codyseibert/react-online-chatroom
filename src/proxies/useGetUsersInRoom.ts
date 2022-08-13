import { trpc } from '../utils/trpc';

export const useGetUsersInRoom = (selectedRoom: string) => {
  const { data: usersInRoom, refetch: refetchUsersInRoom } = trpc.useQuery(['rooms.getUsersInRoom', {
    roomId: selectedRoom
  }]);

  return {
    usersInRoom,
    refetchUsersInRoom
  };
};