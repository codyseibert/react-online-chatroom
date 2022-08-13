import { trpc } from '../utils/trpc';

export const useRooms = () => {
  const { data: rooms, refetch } = trpc.useQuery(['rooms.getRooms']);
  return {
    rooms,
    reloadRooms: refetch
  };
};