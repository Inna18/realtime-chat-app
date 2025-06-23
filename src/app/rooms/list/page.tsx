import { fetchAllRooms } from '@/service/room';
import { Room } from '@/types';
import React from 'react';

const RoomList = async () => {
  let rooms: Room[];
  rooms = await fetchAllRooms();

  return (
    <div>
      <h3>Rooms</h3>
      <ul>
        {rooms.map((room: Room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
