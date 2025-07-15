'use client';
import { getParticipants } from '@/service/auth';
import { User } from '@/types';
import React, { useEffect, useState } from 'react';

const Participants = () => {
  const [participants, setParticipants] = useState<User[]>([]);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      try {
        const res = await getParticipants();
        const newList = res.data;

        // Optional: prevent unnecessary state updates
        const hasChanged =
          JSON.stringify(newList) !== JSON.stringify(participants);
        if (hasChanged) {
          setParticipants(newList);
        }
      } catch (err) {
        console.error('Failed to fetch participants:', err);
      }
    };
    fetchAndUpdate();

    const interval = setInterval(fetchAndUpdate, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[30%] px-[10px] py-[10px]">
      <h3 className="py-[10px] border-b border-[#a8a8a8]">Participants</h3>
      {participants &&
        participants.map((participant: User) => (
          <div className="m-[16px]" key={participant.id}>
            {participant.name}
          </div>
        ))}
    </div>
  );
};

export default Participants;
