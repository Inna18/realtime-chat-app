'use client';
import React, { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusherClient';
import { Message } from '@/types';
import { createMessage } from '@/service/message';

interface Props {
  roomId: string;
}

const Chatting = ({ roomId }: Props) => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-${roomId}`);
    channel.bind('new-message', (message: Message) => {
      // Append message to UI
      console.log(message);
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

  return (
    <>
      <div className="w-[600px] h-[600px] bg-[#808080]">
        [Chat Messages will be here]
      </div>
      <div>
        <input value={message} onInput={handleInput} />
        <button onClick={() => createMessage(message, roomId)}>Send</button>
      </div>
    </>
  );
};

export default Chatting;
