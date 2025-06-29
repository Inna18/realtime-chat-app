'use client';
import { createRoom } from '@/service/room';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Rooms = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [roomName, setRoomName] = useState<string>('');

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setRoomName(val);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createRoom(session?.user.id, roomName);
    if (res.status === 200) router.push('/rooms/list');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Room</h3>
      <div>
        <input
          type="text"
          value={roomName}
          placeholder="Enter Room Name"
          onInput={handleInput}
        />
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default Rooms;
