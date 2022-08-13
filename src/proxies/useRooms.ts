import { trpc } from '../utils/trpc';

export const useRooms = () => {
  const { data: rooms, refetch } = trpc.useQuery(['getRooms']);
  return {
    rooms,
    reloadRooms: refetch
  };
};