'use client';
import { Room } from '@/types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteRoom } from '@/service/room';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  room: Room;
}

const ChatCard = ({ room }: Props) => {
  const router = useRouter();
  const [cardColor, setCardColor] = useState<string>();

  const handleDelete = async (id: string) => {
    await deleteRoom(id);
    router.refresh();
  };

  useEffect(() => {
    const milliseconds = Date.now() - new Date(room.createdAt!).getTime();
    const hours = milliseconds / 3600000;
    if (hours <= 1) setCardColor('#e8fac4');
    else if (hours > 1 && hours < 24) setCardColor('#FDEBDB');
    else setCardColor('#FACCC2');
  }, []);

  return (
    <li
      key={room.id}
      className="relative group w-[220px] h-[142px] pt-[16px] p-[6px] m-[20px] rounded-[10px]"
      style={{
        boxShadow: '0px 2px 6px 0px #e0e0e0', // light gray shadow
        backgroundColor: cardColor,
      }}
    >
      <div className="absolute bg-[#fff] right-[6px] top-[4px] hidden group-hover:block rounded-t-[4px] cursor-pointer">
        <Image
          src={'/ic-close.svg'}
          alt={'Close icon'}
          width={14}
          height={12}
          onClick={() => handleDelete(room.id!)}
        />
      </div>
      <Link href={`/rooms/${room.id}`}>
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
      <span className="flex justify-center text-[10px] mt-[12px]">
        CREATED{' '}
        {formatDistanceToNow(new Date(room.createdAt!), {
          addSuffix: true,
        }).toUpperCase()}
      </span>
    </li>
  );
};

export default ChatCard;
