interface Credentials {
  email: string;
  password: string;
}

interface User {
  id?: string | null;
  email: string;
  password: string;
  name: string;
  avatar?: string;
}

interface Room {
  id?: string | null;
  name: string;
  description: string;
  tags: string;
  messages?: Message[];
  creatorId?: string;
  createdAt?: string;
}

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  sender: User;
  senderId: string;
}

export type { Credentials, User, Room, Message };