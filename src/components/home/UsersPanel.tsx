import { User } from '@prisma/client';
import Image from 'next/image';
import React, { FC } from 'react';

type Props = {
  onUserClicked: (id: string) => void
  usersInRoom: User[] | undefined,
}

export const UsersPanel: FC<Props> = ({
  onUserClicked,
  usersInRoom
}) => {
  return (
    <div
      className='gap-2 flex flex-col w-44'
    >
      <h1 className="text-lg font-bold">Users Online:</h1>
      {usersInRoom?.map(user => <div
        className="flex flex-row gap-4"
        onClick={() => onUserClicked(user.id)}
        key={user.id}
      >
        <Image
          referrerPolicy="no-referrer"
          className="h-8 w-8 rounded-full"
          width="30"
          height="30"
          src={user.image || ''}
          alt=""
        />
        {user.name}
      </div>)}
    </div>
  );
};
