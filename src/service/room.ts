import axios from 'axios';

export async function createRoom(userId: string, name: string) {
  return await axios.post(
    '/api/rooms',
    { userId, name },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
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
