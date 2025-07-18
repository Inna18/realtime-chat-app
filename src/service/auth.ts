import { User } from '@/types';
import axios from 'axios';

export async function upload(formData: FormData) {
  return await axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function signup(body: User, attachmentId: string | null) {
  return await axios.post(
    '/api/signup',
    { user: body, attachId: attachmentId },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function login(userId: string) {
  return await axios.post(
    '/api/user',
    { userId },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function getParticipants() {
  return await axios.get('/api/user', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


