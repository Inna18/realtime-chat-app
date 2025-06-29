import axios from 'axios';

export async function createMessage(message: string, roomId: string) {
  return await axios.post(
    '/api/messages',
    {
      content: message,
      roomId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
