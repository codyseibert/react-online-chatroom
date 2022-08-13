import { Room } from '@prisma/client';
import React, { FC } from 'react';
import { Variant } from '../buttons/Button';
import { RoundedButton } from '../buttons/RoundedButton';

type Props = {
  onRoomClicked: (roomName: string) => void
  onNewRoomClicked: () => void
  rooms: Room[] | undefined,
}

export const RoomsPanel: FC<Props> = ({
  onRoomClicked,
  rooms,
  onNewRoomClicked
}) => {
  return (
    <div className='h-full gap-2 p-2 pt-4 flex flex-col shadow-md bg-gray-200'>
      <RoundedButton
        variant={Variant.Secondary}
        onClick={onNewRoomClicked}
      >+</RoundedButton>
      {rooms?.map(room => <RoundedButton
        onClick={() => onRoomClicked(room.name)}
        key={room.name}
      >
        {room.name[0]}
      </RoundedButton>)}
    </div>
  );
};
