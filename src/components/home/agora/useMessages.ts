import { User } from '@prisma/client';
import { RtmChannel } from 'agora-rtm-sdk';
import { useEffect, useRef } from 'react';
import { Message } from '../../../proxies/useGetMessages';
import { useJoinRoom } from '../../../proxies/useJoinRoom';

const APP_ID = process.env.NEXT_PUBLIC_AGORA_ID;

type Props = {
  selectedRoom: string
  userId: string
  usersInRoom: User[],
  onConnectionAborted: () => void
  refetchMessages: () => void
  refetchUsersInRoom: () => void
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export const useMessages = ({
  selectedRoom,
  userId,
  refetchUsersInRoom,
  usersInRoom,
  refetchMessages,
  onConnectionAborted,
  setMessages
}: Props) => {

  const channelRef = useRef<RtmChannel>();
  const { joinRoom } = useJoinRoom();

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
        if (!userWhoLeft) return;
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
        if (!userWhoJoined) return;
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


  return { channelRef };
};