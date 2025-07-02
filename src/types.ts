export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id?: string | null;
  email: string;
  password: string;
  name: string;
  avatar?: string;
}

export interface Room {
  id?: string | null;
  name: string;
  description: string;
  tags: string;
  messages?: Message[];
  creatorId?: string;
  createdAt?: string;
}

export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  sender: User;
  senderId: string;
}
