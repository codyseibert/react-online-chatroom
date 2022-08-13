import React, { FC, useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { trpc } from '../../utils/trpc';
import { RtmChannel } from 'agora-rtm-sdk';
import { UsersPanel } from './UsersPanel';
import { useSession } from 'next-auth/react';
import { useGetUsersInRoom } from '../../proxies/useGetUsersInRoom';
import { useGetMessages } from '../../proxies/useGetMessages';
import { useJoinRoom } from '../../proxies/useJoinRoom';
import { useStoreMessage } from '../../proxies/useStoreMessage';
import Image from 'next/image';

type Props = {
  selectedRoom: string
  onConnectionAborted: () => void
  userId: string
}

const APP_ID = process.env.NEXT_PUBLIC_AGORA_ID;

export const ChatPanel: FC<Props> = ({
  selectedRoom,
  userId,
  onConnectionAborted
}) => {
  const session = useSession();
  const { joinRoom } = useJoinRoom();
  const { storeMessage } = useStoreMessage();
  const { usersInRoom, refetchUsersInRoom } = useGetUsersInRoom(selectedRoom);
  const { messages, setMessages, refetchMessages } = useGetMessages(selectedRoom);
  const [text, setText] = useState('');
  const channelRef = useRef<RtmChannel>();

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

  useEffect(() => {
    const connect = async () => {
      if (!APP_ID) {
        throw new Error('APP_ID was expected to be defined, but was not');
      }
      if (!selectedRoom) return;
      await refetchMessages();
      const { token } = await joinRoom({
        name: selectedRoom,
        uid: userId
      });
      await refetchUsersInRoom();
      const { default: AgoraRTM } = await import('agora-rtm-sdk');
      const client = AgoraRTM.createInstance(APP_ID);
      await client.login({
        uid: userId,
        token
      });
      client.on('ConnectionStateChanged', (newState) => {
        if (newState === 'ABORTED') {
          onConnectionAborted();
        }
      });
      const channel = await client.createChannel(selectedRoom);
      await channel.join();
      channel.on('MemberLeft', (memberId) => {
        const userWhoLeft = usersInRoom.find(user => user.uid === memberId);
        setMessages((prevMessages) => [
          ...prevMessages, {
            text: 'has left the room',
            uid: memberId,
            image: userWhoLeft.image,
            name: userWhoLeft.name
          }
        ]);
      });
      channel.on('ChannelMessage', (message, peerId) => {
        const userWhoJoined = usersInRoom.find(user => user.uid === peerId);

        setMessages((prevMessages) => [
          ...prevMessages, {
            text: message.text ?? '',
            uid: peerId,
            image: userWhoJoined.image,
            name: userWhoJoined.name
          }
        ]);
      });
      channelRef.current = channel;
      return {
        client,
        channel
      };
    };

    const clientPromise = connect();

    return () => {
      clientPromise.then(async (context) => {
        if (!context) return;
        const { channel, client } = context;
        await channel.leave();
        await client.logout();
        channelRef.current = undefined;
      });
    };
  }, [selectedRoom]);

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
