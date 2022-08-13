import { trpc } from '../utils/trpc';

export const useStoreMessage = () => {
  const { mutateAsync } = trpc.useMutation(
    'storeMessage'
  );
  return { storeMessage: mutateAsync };
};