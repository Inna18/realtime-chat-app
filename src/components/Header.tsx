'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();

  console.log(status);
  return (
    <div className="flex">
      <div>{session?.user?.name}</div>
      {status !== 'unauthenticated' && (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
    </div>
  );
};

export default Header;
