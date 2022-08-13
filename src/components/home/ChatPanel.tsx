import React, { FC, useState } from 'react';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { UsersPanel } from './UsersPanel';
import { useSession } from 'next-auth/react';
import { useGetUsersInRoom } from '../../proxies/useGetUsersInRoom';
import { useGetMessages } from '../../proxies/useGetMessages';
import { useStoreMessage } from '../../proxies/useStoreMessage';
import Image from 'next/image';
import { useMessages } from './agora/useMessages';

type Props = {
  selectedRoom: string
  onConnectionAborted: () => void
  userId: string
}

export const ChatPanel: FC<Props> = ({
  selectedRoom,
  userId,
  onConnectionAborted
}) => {
  const session = useSession();
  const { storeMessage } = useStoreMessage();
  const { usersInRoom, refetchUsersInRoom } = useGetUsersInRoom(selectedRoom);
  const { messages, setMessages, refetchMessages } = useGetMessages(selectedRoom);
  const [text, setText] = useState('');

  const { channelRef } = useMessages({
    selectedRoom,
    userId,
    refetchUsersInRoom,
    refetchMessages,
    usersInRoom,
    onConnectionAborted,
    setMessages
  });

  const handleSendMessage = async () => {
    if (!channelRef.current) return;
    channelRef.current.sendMessage({ text });
    storeMessage({
      roomId: selectedRoom,
      userId,
      text
    });
    setMessages([
      ...messages,
      {
        text,
        uid: userId,
        image: session.data?.user?.image,
        name: session.data?.user?.name
      }
    ]);
    setText('');
  };

  return (
    <div className="flex flex-row gap-8 w-full pt-4">
      <div className='flex flex-col flex-grow gap-2'>
        <h1 className="text-2xl font-bold">
          Room: {selectedRoom}
        </h1>

        <div className="flex flex-col gap-4 max-h-30 overflow-auto">
          {messages.map((message, idx) => <div
            key={idx}
            className="flex flex-row gap-2"
          >
            <Image
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full"
              src={message.image || ''}
              width="30"
              height="30"
              alt=""
            /> {message.name}: {message.text}
          </div>)}
        </div>

        <form
          onSubmit={async e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex flex-row h-10"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 w-full"
          />
          <PrimaryButton>Send</PrimaryButton>
        </form>
      </div>

      <UsersPanel
        usersInRoom={usersInRoom}
        onUserClicked={() => undefined}
      />
    </div>
  );
};
