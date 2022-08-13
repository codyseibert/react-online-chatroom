import { useState } from 'react';
import { trpc } from '../utils/trpc';

export type Message = {
  text: string
  uid: string
  image: string | null | undefined
  name: string | null | undefined
}

export const useGetMessages = (selectedRoom: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { refetch: refetchMessages } = trpc.useQuery(['getMessages', {
    roomId: selectedRoom
  }], {
    enabled: false,
    onSuccess: (data: any) => {
      const initialMessages = data.map((message: any) => ({
        uid: message.userId,
        text: message.text,
        image: message.image,
        name: message.name
      }) as Message);
      setMessages(initialMessages);
    }
  });

  return {
    refetchMessages,
    messages,
    setMessages
  };
};