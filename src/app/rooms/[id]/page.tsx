import React from 'react';
import Chatting from '@/components/Chatting';
import { fetchRoom } from '@/service/room';
import { Room } from '@/types';
import RouteButton from '@/components/RouteButton';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const currentRoom: Room = await fetchRoom(id);

  return (
    <>
      {currentRoom && (
        <div>
          <RouteButton label={'Back to List'} url={'/rooms/list'} />
          <h3>{currentRoom.name}</h3>
          {currentRoom.id && (
            <Chatting
              roomId={currentRoom.id}
              chatMessages={currentRoom.messages}
            />
          )}
        </div>
      )}
    </>
  );
};

export default page;
