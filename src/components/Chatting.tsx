'use client';
import React, { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusherClient';
import { Message } from '@/types';
import { createMessage } from '@/service/message';

interface Props {
  roomId: string;
  chatMessages: Message[];
}

const Chatting = ({ roomId, chatMessages }: Props) => {
  const [messages, setMessages] = useState<Message[]>(chatMessages);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-${roomId}`);
    channel.bind('new-message', (message: Message) => {
      setMessages((prevState: Message[]) => [...prevState, message]);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`chat-${roomId}`);
    };
  }, [roomId]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setMessage(val);
  };

  const handleSend = () => {
    createMessage(message, roomId);
    setMessage('');
  };

  return (
    <>
      <div className="w-[600px] h-[600px] bg-[#808080]">
        {messages &&
          messages.map((message: Message) => (
            <div key={message.id}>
              <div>{message.sender?.name}</div>
              <div>{message.createdAt.toString()}</div>
              <div key={message.id}>{message.content}</div>
            </div>
          ))}
      </div>
      <div>
        <input value={message} onInput={handleInput} />
        <button onClick={handleSend}>Send</button>
      </div>
    </>
  );
};

export default Chatting;
