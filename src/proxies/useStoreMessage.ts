import { trpc } from '../utils/trpc';

export const useStoreMessage = () => {
  const { mutateAsync } = trpc.useMutation(
    'rooms.storeMessage'
  );
  return { storeMessage: mutateAsync };
};