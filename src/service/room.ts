import { Room } from '@/types';
import axios from 'axios';

export async function createRoom(userId: string, roomDetails: Room) {
  return await axios.post(
    '/api/rooms',
    { userId, ...roomDetails },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function deleteRoom(id: string) {
  return await axios.delete(`/api/rooms/${id}`);
}

export async function fetchAllRooms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rooms/list`);
  return await res.json();
}

export async function fetchRoom(roomId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/rooms/${roomId}`
  );
  return await res.json();
}
