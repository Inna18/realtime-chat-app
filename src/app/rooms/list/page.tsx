import React from 'react';
import Button from '@/components/RouteButton';
import Link from 'next/link';

import { fetchAllRooms } from '@/service/room';
import { Room } from '@/types';

const RoomList = async () => {
  const rooms: Room[] = await fetchAllRooms();

  return (
    <div>
      <Button label={'New Room'} url={'/rooms'} />
      <h3>Rooms</h3>
      {rooms.length <= 0 && <div>No rooms yet</div>}
      {rooms.length > 0 && (
        <ul>
          {rooms.map((room: Room) => (
            <li key={room.id}>
              <Link href={`/rooms/${room.id}`}>{room.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomList;
