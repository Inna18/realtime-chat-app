'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { pusherClient } from '@/lib/pusherClient';
import { Message } from '@/types';
import { createMessage } from '@/service/message';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

interface Props {
  roomId: string;
  chatMessages: Message[];
}

const Chatting = ({ roomId, chatMessages }: Props) => {
  const { data: session, status } = useSession();
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

  const checkUserMessage = (senderId: string) => {
    return checkCurrentUser(senderId)
      ? 'flex flex-row-reverse w-[80%] ml-auto'
      : 'flex w-[80%] mr-auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const checkCurrentUser = (senderId: string) => {
    return session?.user.id === senderId;
  };
  return (
    <>
      <div className="w-full h-[600px] px-[20px] my-[10px] overflow-auto ">
        {messages &&
          messages.map((message: Message) => (
            <div
              className={`w-fit my-[20px] ${
                checkCurrentUser(message.senderId) ? 'ml-auto text-right' : ''
              }`}
              key={message.id}
            >
              <div
                className={`${checkUserMessage(
                  message.senderId
                )} text-[12px] m-[4px] font-[500]`}
              >
                <div
                  className={
                    checkCurrentUser(message.senderId) ? '' : 'mr-[6px]'
                  }
                >
                  {message.sender?.name}
                </div>
                <div
                  className={
                    checkCurrentUser(message.senderId) ? 'mr-[6px]' : ''
                  }
                >
                  {format(message.createdAt, 'yyyy-MM-dd HH:mm')}
                </div>
              </div>
              <div
                className={`${checkUserMessage(
                  message.senderId
                )} bg-[#fff] p-[10px] text-[14px] border-none shadow-[0_5px_10px_rgba(0,0,0,0.1)] rounded-[10px] outline-none`}
                key={message.id}
              >
                <span>{message.content}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="relative bg-[#fff] w-full h-[40px] border-none shadow-[0_5px_10px_rgba(0,0,0,0.1)] rounded-[10px] outline-none">
        <input
          className="w-[94%] h-[40px] p-[10px] border-none rounded-[10px] outline-none"
          value={message}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />

        <Image
          className="absolute right-[16px] top-[10px] cursor-pointer"
          src={'/ic-send.svg'}
          alt={'Send icon'}
          width={20}
          height={20}
          onClick={handleSend}
        />
      </div>
    </>
  );
};

export default Chatting;
