import { trpc } from '../utils/trpc';

export const useJoinRoom = () => {
  const { mutateAsync } = trpc.useMutation(
    'rooms.joinRoom'
  );

  return { joinRoom: mutateAsync };
};