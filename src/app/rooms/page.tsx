'use client';
import { createRoom } from '@/service/room';
import { Room } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const DEFAULT_ROOM: Room = {
  name: '',
  description: '',
  tags: '',
};
const Rooms = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [roomDetails, setRoomDetails] = useState<Room>(DEFAULT_ROOM);

  const handleInput = (e: React.FormEvent<HTMLInputElement>, type: string) => {
    const val = e.currentTarget.value;
    let set = null;
    if (type === 'name') {
      set = { name: val };
    } else if (type === 'description') {
      set = { description: val };
    } else if (type === 'tags') {
      set = { tags: val.trim() };
    }
    setRoomDetails((prevState: Room) => ({
      ...prevState,
      ...set,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createRoom(session?.user.id, roomDetails);
    if (res.status === 200) router.push('/rooms/list');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Room</h3>
      <div>
        <input
          type="text"
          value={roomDetails.name}
          placeholder="Enter Room Name"
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            handleInput(e, 'name')
          }
        />
        <input
          type="text"
          value={roomDetails.description}
          placeholder="Enter Room Details"
          maxLength={100}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            handleInput(e, 'description')
          }
        />
        <input
          type="text"
          placeholder="Use space to enter multiple tags"
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            handleInput(e, 'tags')
          }
        />

        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default Rooms;
