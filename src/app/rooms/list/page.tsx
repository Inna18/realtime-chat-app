import React from 'react';
import NavLink from '@/components/NavLink';
import ChatCard from './ChatCard';

import { fetchAllRooms } from '@/service/room';
import { Room } from '@/types';

const RoomList = async () => {
  const rooms: Room[] = await fetchAllRooms();

  return (
    <div className="h-screen bg-[#fff] py-[32px] px-[60px]">
      <div className="flex justify-end">
        <NavLink
          label={'New Room'}
          url={'/rooms'}
          style={'text-[#7836FF] dark:text-[#e0e0e0] text-[16px] font-[500]'}
        />
      </div>
      {rooms.length <= 0 && <div>No rooms yet</div>}
      {rooms.length > 0 && (
        <ul className="flex flex-wrap gap-4">
          {rooms.map((room: Room) => (
            <ChatCard key={room.id} room={room} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomList;
