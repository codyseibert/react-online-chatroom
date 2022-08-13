import { trpc } from '../utils/trpc';

export const useJoinRoom = () => {
  const { mutateAsync } = trpc.useMutation(
    'joinRoom'
  );

  return { joinRoom: mutateAsync };
};