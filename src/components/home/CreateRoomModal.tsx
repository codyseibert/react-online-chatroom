import { Dialog } from '@headlessui/react';
import React, { FC, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SecondaryButton } from '../buttons/SecondaryButton';

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onRoomCreated: () => void
}

export const CreateRoomModal: FC<Props> = ({ isOpen, setIsOpen, onRoomCreated }) => {
  const [name, setName] = useState('');

  const createRoom = trpc.useMutation(
    'rooms.createRoom'
  );

  const handleCreateRoom = async () => {
    await createRoom.mutateAsync({ name });
    setName('');
    setIsOpen(false);
    onRoomCreated();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="flex flex-col gap-4 w-full max-w-sm rounded-xl bg-white p-4">
          <Dialog.Title className="text-4xl font-bold">Create a Room</Dialog.Title>
          <Dialog.Description>
            Enter a name for your room you want to create.  Others will be able to view and join this room.
          </Dialog.Description>

          <label>
            Room Name<br />
            <input
              className="border p-1 border-gray-400"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>

          <div className="flex flex-row justify-end gap-4">
            <SecondaryButton
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={handleCreateRoom}
            >
              Create Room
            </PrimaryButton>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
