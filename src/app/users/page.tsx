import React from 'react';
import { User } from '@/types';

const Users = async () => {
  const res = await fetch(`http://localhost:3000/api/users`, {
    method: 'GET',
    cache: 'no-store', // important for SSR freshness
  });

  if (!res.ok) throw new Error('Failed to fetch users');

  const users = await res.json();

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
