interface User {
  id: string | null;
  email: string;
  name: string;
  messages: Message[] | null;
}

interface Message {
  id: string;
  content: string;
  createdAt: Date;
  sender: User;
  senderId: string;
}

export { User, Message };
