import { Room } from '@/types';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  room: Room;
}

const ChatCard = ({ room }: Props) => {
  return (
    <li
      key={room.id}
      className="bg-[#FBE7D7] w-[220px] h-[130px] p-[6px] m-[20px] rounded-[10px]"
      style={{
        boxShadow: '0px 2px 6px 0px #e0e0e0', // light gray shadow
      }}
    >
      <Link href={`/rooms/${room.id}`}>
        <div></div>
        <div className="bg-[#fff] h-[90px] p-[10px] rounded-[10px]">
          <h3 className="text-[#4a4a4a] text-[16px] my-[4px]">{room.name}</h3>
          <p
            className="text-[#a8a8a8] text-[12px] overflow-hidden"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, black 90%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, black 90%, transparent 100%)',
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
            }}
          >
            {room.description}
          </p>
          <ul
            className="flex overflow-hidden"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, black 90%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, black 90%, transparent 100%)',
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
            }}
          >
            {room.tags.split(/\s+/).map((tag: string, index: number) => (
              <li
                className="text-[10px] p-[2px] mt-[8px] mr-[4px] border border-[#e0e0e0] rounded-[10px] uppercase"
                style={{
                  boxShadow: '0px 0px 10px 0px #e0e0e0', // light gray shadow
                }}
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
      <span className="flex justify-center text-[12px] mt-[10px]">
        CREATED 2 DAYS AGO
      </span>
    </li>
  );
};

export default ChatCard;
