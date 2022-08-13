import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useRooms } from '../proxies/useRooms';
import { RoomsPanel } from '../components/home/RoomsPanel';
import { CreateRoomModal } from '../components/home/CreateRoomModal';
import { WelcomePanel } from '../components/home/WelcomePanel';
import { ChatPanel } from '../components/home/ChatPanel';
import Header from '../components/Header';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { withHeader } from '../hoc/withHeader';

const ChatPage: NextPage<{
  userId: string
}> = ({ userId }) => {
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const { rooms, reloadRooms } = useRooms();

  const handleNewRoom = async () => {
    setCreateRoomModalOpen(true);
  };

  const handleJoinRoom = (room: string) => {
    setSelectedRoom(room);
  };

  const handleRoomCreated = async () => {
    reloadRooms();
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta
          name="description"
          content="Generated by create-t3-app"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      {withHeader(
        <main className="mx-auto flex gap-8 flex-grow h-full">
          <RoomsPanel
            onNewRoomClicked={handleNewRoom}
            onRoomClicked={handleJoinRoom}
            rooms={rooms}
          />

          {!selectedRoom ?
            <WelcomePanel /> :
            <ChatPanel
              onConnectionAborted={() => setSelectedRoom('')}
              userId={userId}
              selectedRoom={selectedRoom}
            />
          }
        </main>
      )}

      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        setIsOpen={setCreateRoomModalOpen}
        onRoomCreated={handleRoomCreated}
      />
    </>
  );
};

export default ChatPage;

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  } else {
    return { props: { userId: session.user?.id } };
  }
}