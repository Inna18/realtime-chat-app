import React from 'react';
import Chatting from '@/components/Chatting';
import { fetchRoom } from '@/service/room';
import { Room } from '@/types';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const currentRoom: Room = await fetchRoom(id);

  return (
    <>
      {currentRoom && (
        <div>
          <h3>{currentRoom.name}</h3>
          {currentRoom.id && <Chatting roomId={currentRoom.id} />}
        </div>
      )}
    </>
  );
};

export default page;
