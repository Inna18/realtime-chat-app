'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { changeStatus } from '@/service/auth';

const Header = () => {
  const { data: session, status } = useSession();

  const handleSignout = async () => {
    signOut();
    await changeStatus(session.user.id, 'offline');
  };

  return (
    <>
      {status !== 'loading' && status !== 'unauthenticated' && (
        <div className="flex justify-between bg-[#7836FF] h-[68px] p-[10px]">
          <div className="flex items-center">
            {session?.user?.id && (
              <Image
                className="rounded-[50%]"
                src={`/api/upload/${session?.user?.id}`}
                alt={''}
                width={40}
                height={40}
                unoptimized
              />
            )}
            <div className="flex items-center text-[#FFF] mx-[8px]">
              {session?.user?.name}
            </div>
          </div>

          <button
            className="border-none bg-[#7836FF] text-[#FFF] mx-[4px] cursor-pointer"
            onClick={handleSignout}
          >
            SIGN OUT
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
