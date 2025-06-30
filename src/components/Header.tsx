'use client';
import React, { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex">
      <div>{session?.user?.name}</div>
      {status !== 'loading' && status !== 'unauthenticated' && (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
    </div>
  );
};

export default Header;
